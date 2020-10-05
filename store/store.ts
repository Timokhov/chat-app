import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer, { UserState } from './user/user.reducer';
import chatReducer, { ChatState } from './chat/chat.reducer';

export interface RootState {
    userState: UserState,
    chatState: ChatState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        userState: userReducer,
        chatState: chatReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
