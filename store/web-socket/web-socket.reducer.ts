import { WebSocketAction, WebSocketActionType } from './web-socket.actions';

export enum WebSocketStatus {
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    FAILED = 'FAILED',
    DISCONNECTED = 'DISCONNECTED'
}

export interface WebSocketState {
    status: WebSocketStatus
}

const initialState: WebSocketState = {
    status: WebSocketStatus.DISCONNECTED
};

const onConnectionStart = (): WebSocketState => {
    return {
        status: WebSocketStatus.CONNECTING
    };
};

const onConnectionSuccess = (): WebSocketState => {
    return {
        status: WebSocketStatus.CONNECTED
    };
};

const onConnectionFail = (): WebSocketState => {
    return {
        status: WebSocketStatus.FAILED
    };
};

const onConnectionClose = (): WebSocketState => {
    return {
        status: WebSocketStatus.DISCONNECTED
    };
};

const webSocketReducer = (state: WebSocketState = initialState, action: WebSocketAction): WebSocketState => {
    switch (action.type) {
        case WebSocketActionType.CONNECTION_START:
            return onConnectionStart();
        case WebSocketActionType.CONNECTION_SUCCESS:
            return onConnectionSuccess();
        case WebSocketActionType.CONNECTION_FAIL:
            return onConnectionFail();
        case WebSocketActionType.CONNECTION_CLOSE:
            return onConnectionClose();
        default:
            return state;
    }
};

export default webSocketReducer;
