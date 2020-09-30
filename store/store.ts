import { createStore, combineReducers, Reducer, CombinedState, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer, { UserState } from './user/user.reducer';

export interface RootState {
    userState: UserState
}

const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        userState: userReducer
    }
);

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
