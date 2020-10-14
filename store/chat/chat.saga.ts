import { StompSubscription } from '@stomp/stompjs';
import { eventChannel } from 'redux-saga';
import { put, take, takeEvery, call } from 'redux-saga/effects';
import { ChatMessage, TypingMessage } from '../../models/message';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import * as WebSocketService from '../../services/web-socket.service';
import { ChatActionType, SubscribeToTopicAction } from './chat.actions';
import * as ChatActions from './chat.actions';

const createChatTopicChannel = (user: User) => {
    return eventChannel(emit => {
        const subscription: Nullable<StompSubscription> = WebSocketService.subscribeToTopic<ChatMessage>(
            '/topic/chat/messages',
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

const createTypingTopicChannel = (user: User) => {
    return eventChannel(emit => {
        const subscription: Nullable<StompSubscription> = WebSocketService.subscribeToTopic<TypingMessage>(
            '/topic/chat/typing',
            (message) => {
                const typingUsers: User[] = message.typingUsers.filter(u => u.id !== user.id);
                let notification: string = '';
                if (typingUsers.length > 0) {
                    notification = typingUsers.length === 1
                        ? `${typingUsers[0].name} is typing`
                        : 'Several users are typing'
                }
                emit(ChatActions.setTypingNotification(notification));
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
        const chatTopicAction = yield take(ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC);
        yield call(subscribeToChatTopicSaga, chatTopicAction);
    }
}

export function* watchTypingSaga() {
    while (true) {
        const typingTopicAction = yield take(ChatActionType.SUBSCRIBE_TO_TYPING_TOPIC);
        yield call(subscribeToTypingTopicSaga, typingTopicAction);
    }
}

function* subscribeToChatTopicSaga(action: SubscribeToTopicAction) {
    yield put(ChatActions.subscribeToChatTopicStart());
    const channel = yield createChatTopicChannel(action.user);

    yield takeEvery(channel, function* (a) {
        yield put(a);
    });

    yield put(ChatActions.subscribeToChatTopicFinish());

    yield take(ChatActionType.UNSUBSCRIBE_FROM_CHAT_TOPIC);
    channel.close();
    yield put(ChatActions.unsubscribeToChatTopicFinish());
}

function* subscribeToTypingTopicSaga(action: SubscribeToTopicAction) {
    const channel = yield createTypingTopicChannel(action.user);

    yield takeEvery(channel, function* (a) {
        yield put(a);
    });

    yield take(ChatActionType.UNSUBSCRIBE_FROM_TYPING_TOPIC);
    channel.close();
}
