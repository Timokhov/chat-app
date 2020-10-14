import SockJS from 'sockjs-client';
import { Client, IMessage, StompHeaders } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs/esm5/stomp-subscription';
import { Nullable } from '../models/nullable';

let client: Nullable<Client> = null;

export const connectToWebSocket = (
    onConnect: () => void,
    onError: () => void,
    onDisconnect: () => void) =>
{
    disconnectFromWebSocket();

    client = new Client({
        webSocketFactory: () => {
            return new SockJS('https://localhost:8088/chat-service/socket/chat-service-socket');
        },
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
        reconnectDelay: 5000,
        debug: (str) => {
            console.log(str);
        }
    });

    client.onConnect = () => {
        onConnect();
    };

    client.onStompError = () => {
        onError();
    };

    client.onWebSocketError = (evt: Event) => {
        console.log(evt);
        onError();
    };

    client.onDisconnect = () => {
        onDisconnect();
    };

    client.onWebSocketClose = () => {
        onDisconnect();
    };

    client.activate();
};

export const disconnectFromWebSocket = () => {
    if (client) {
        client.deactivate();
        client = null;
    }
};

export const subscribeToTopic = <T>(url: string, handleData: (data: T) => void, headers?: StompHeaders): Nullable<StompSubscription> => {
    if (client) {
        const onMessageReceive = (message: IMessage) => {
            if (message.body) {
                const data: T = JSON.parse(message.body);
                handleData(data);
            }
        };

        return client.subscribe(url, onMessageReceive, headers);
    } else {
        return null;
    }
};

export const publish = <T>(topicUrl: string, message: T, headers?: StompHeaders) => {
    if (client) {
        client.publish({ destination: topicUrl, body: JSON.stringify(message), headers: headers })
    }
};
