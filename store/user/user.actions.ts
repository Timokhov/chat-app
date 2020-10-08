import { Action } from 'redux';
import { User } from '../../models/user';

export enum UserActionType {
    ENTER_CHAT = 'ENTER_CHAT',
    LEAVE_CHAT = 'LEAVE_CHAT',
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER'
}

export interface UserAction extends Action<UserActionType> {}

export interface EnterChatAction extends UserAction {
    user: User
}

export interface SetUserAction extends UserAction {
    user: User
}

export const enterChat = (user: User): EnterChatAction => {
    return {
        type: UserActionType.ENTER_CHAT,
        user: user
    };
};

export const leaveChat = (): UserAction => {
    return {
        type: UserActionType.LEAVE_CHAT
    };
};

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

