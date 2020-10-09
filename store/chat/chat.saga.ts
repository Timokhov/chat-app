import { StompSubscription } from '@stomp/stompjs';
import { eventChannel } from 'redux-saga';
import { put, take, takeEvery, call } from 'redux-saga/effects';
import { Message } from '../../models/message';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import * as WebSocketService from '../../services/web-socket.service';
import { ChatActionType, SubscribeToChatTopicAction } from './chat.actions';
import * as ChatActions from './chat.actions';

const createChatTopicChannel = (url: string, user: User) => {
    return eventChannel(emit => {
        const subscription: Nullable<StompSubscription> = WebSocketService.subscribeToTopic<Message>(
            url,
            (message) => {
                emit(ChatActions.receiveChatMessage(message));
            },
            {
                ['user_name']: user.name
            }
        );

        return () => subscription && subscription.unsubscribe()
    });
};

export function* watchChatSaga() {
    while (true) {
        const action = yield take(ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC);
        yield call(subscribeToChatTopicSaga, action);
    }
}

function* subscribeToChatTopicSaga(action: SubscribeToChatTopicAction) {
    yield put(ChatActions.subscribeToChatTopicStart());
    const channel = yield createChatTopicChannel(action.url, action.user);

    yield takeEvery(channel, function* (a) {
        yield put(a);
    });

    yield put(ChatActions.subscribeToChatTopicFinish());

    yield take(ChatActionType.UNSUBSCRIBE_FROM_CHAT_TOPIC);
    channel.close();
    yield put(ChatActions.unsubscribeToChatTopicFinish());
}
