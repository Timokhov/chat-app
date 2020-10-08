import { Action } from 'redux';

export enum WebSocketActionType {
    CONNECT = 'CONNECT',
    DISCONNECT = 'DISCONNECT',
    CONNECTION_START = 'CONNECTION_START',
    CONNECTION_SUCCESS = 'CONNECTION_SUCCESS',
    CONNECTION_FAIL = 'CONNECTION_SUCCESS',
    CONNECTION_CLOSE = 'CONNECTION_CLOSE'
}

export interface WebSocketAction extends Action<WebSocketActionType> {

}

export const connectToWebSocket = (): WebSocketAction => {
    return {
        type: WebSocketActionType.CONNECT
    };
};

export const disconnectFromWebSocket = (): WebSocketAction => {
    return {
        type: WebSocketActionType.DISCONNECT
    };
};

export const connectionStart = (): WebSocketAction => {
    return {
        type: WebSocketActionType.CONNECTION_START
    };
};

export const connectionSuccess = (): WebSocketAction => {
    return {
        type: WebSocketActionType.CONNECTION_SUCCESS
    };
};

export const connectionFail = (): WebSocketAction => {
    return {
        type: WebSocketActionType.CONNECTION_FAIL
    };
};

export const connectionClose = (): WebSocketAction => {
    return {
        type: WebSocketActionType.CONNECTION_CLOSE
    };
};
