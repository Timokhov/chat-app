import { Action } from 'redux';
import { User } from '../../models/user';

export enum UserActionType {
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER'
}

export interface UserAction extends Action<UserActionType> {}

export interface SetUserAction extends UserAction {
    user: User
}

export const setUser = (user: User): SetUserAction => {
    return {
        type: UserActionType.SET_USER,
        user: user
    };
};

export const clearUser = (): UserAction => {
    return {
        type: UserActionType.CLEAR_USER
    };
};

