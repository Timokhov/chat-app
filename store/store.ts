import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchChatSaga, watchTypingSaga } from './chat/chat.saga';
import userReducer, { UserState } from './user/user.reducer';
import chatReducer, { ChatState } from './chat/chat.reducer';
import { watchUserSaga } from './user/user.saga';
import webSocketReducer, { WebSocketState } from './web-socket/web-socket.reducer';
import { watchWebSocketSaga } from './web-socket/web-socket.saga';

export interface RootState {
    userState: UserState,
    webSocketState: WebSocketState,
    chatState: ChatState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        userState: userReducer,
        webSocketState: webSocketReducer,
        chatState: chatReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchWebSocketSaga);
sagaMiddleware.run(watchUserSaga);
sagaMiddleware.run(watchChatSaga);
sagaMiddleware.run(watchTypingSaga);
