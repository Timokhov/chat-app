import { eventChannel } from 'redux-saga';
import { put, take, takeEvery, call } from 'redux-saga/effects';
import * as WebSocketService from '../../services/web-socket.service';
import { WebSocketActionType } from './web-socket.actions';
import * as WebSocketActions from './web-socket.actions';

const createWebSocketChannel = () => {
    return eventChannel(emit => {
        emit(WebSocketActions.connectionStart());
        WebSocketService.connectToWebSocket(
            () => {
                emit(WebSocketActions.connectionSuccess());
            },
            () => {
                emit(WebSocketActions.connectionFail());
            },
            () => {
                emit(WebSocketActions.connectionClose());
            }
        );

        return () => WebSocketService.disconnectFromWebSocket();
    });
};

export function* watchWebSocketSaga() {
    while (true) {
        yield take(WebSocketActionType.CONNECT);
        yield call(webSocketConnectSaga);
    }
}

function* webSocketConnectSaga() {
    const channel = yield createWebSocketChannel();

    yield takeEvery(channel, function* (action) {
        yield put(action);
    });

    yield take(WebSocketActionType.DISCONNECT);
    channel.close();
    yield put(WebSocketActions.connectionClose());
}
