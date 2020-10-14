import { put, takeEvery } from 'redux-saga/effects';
import * as ChatActions from '../chat/chat.actions';
import { EnterChatAction, UserActionType } from './user.actions';
import * as UserActions from './user.actions';

export function* watchUserSaga() {
    yield takeEvery(UserActionType.ENTER_CHAT, enterChatSaga);
    yield takeEvery(UserActionType.LEAVE_CHAT, leaveChatSaga);
}

function* enterChatSaga(action: EnterChatAction) {
    yield put(UserActions.setUser(action.user));
    yield put(ChatActions.subscribeToChatTopic(action.user));
    yield put(ChatActions.subscribeToTypingTopic(action.user));
}

function* leaveChatSaga() {
    yield put(UserActions.clearUser());
    yield put(ChatActions.unsubscribeFromChatTopic());
    yield put(ChatActions.unsubscribeFromTypingTopic());
}
