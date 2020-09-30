import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import { SetUserAction, UserAction, UserActionType } from './user.actions';

export interface UserState {
    user: Nullable<User>
}

const initialState: UserState = {
    user: null
}

const onSetUser = (state: UserState, action: SetUserAction): UserState => {
    return {
        user: action.user
    };
};

const onClearUser = (state: UserState, action: UserAction): UserState => {
    return initialState;
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionType.SET_USER:
            return onSetUser(state, action as SetUserAction);
        case UserActionType.CLEAR_USER:
            return onClearUser(state, action);
        default:
            return state;
    }
};

export default userReducer;
