import { Message } from '../../models/message';
import { ChatAction, ChatActionType, ReceiveChatMessageAction } from './chat.actions';

export enum ChatTopicSubscriptionStatus {
    SUBSCRIBING = 'SUBSCRIBING',
    SUBSCRIBED = 'SUBSCRIBED',
    UNSUBSCRIBED = 'UNSUBSCRIBED'
}

export interface ChatState {
    subscriptionStatus: ChatTopicSubscriptionStatus,
    messages: Message[];
}

const initialState: ChatState = {
    subscriptionStatus: ChatTopicSubscriptionStatus.UNSUBSCRIBED,
    messages: []
};

const onSubscribeToChatTopicStart = (state: ChatState, action: ChatAction): ChatState => {
    return {
        subscriptionStatus: ChatTopicSubscriptionStatus.SUBSCRIBING,
        messages: []
    };
};

const onSubscribeToChatTopicFinish = (state: ChatState, action: ChatAction): ChatState => {
    return {
        ...state,
        subscriptionStatus: ChatTopicSubscriptionStatus.SUBSCRIBED
    };
};

const onUnsubscribeFromChatTopicFinish = (state: ChatState, action: ChatAction): ChatState => {
    return {
        subscriptionStatus: ChatTopicSubscriptionStatus.UNSUBSCRIBED,
        messages: []
    };
};

const onReceiveMessage = (state: ChatState, action: ReceiveChatMessageAction): ChatState => {
    const changedMessaged: Message[] = [ ...state.messages ];
    changedMessaged.unshift(action.message);
    return {
        subscriptionStatus: ChatTopicSubscriptionStatus.SUBSCRIBED,
        messages: changedMessaged
    };
};

const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC_START:
            return onSubscribeToChatTopicStart(state, action);
        case ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC_FINISH:
            return onSubscribeToChatTopicFinish(state, action);
        case ChatActionType.UNSUBSCRIBE_FROM_CHAT_TOPIC_FINISH:
            return onUnsubscribeFromChatTopicFinish(state, action);
        case ChatActionType.RECEIVE_CHAT_MESSAGE:
            return onReceiveMessage(state, action as ReceiveChatMessageAction);
        default:
            return state;
    }
};

export default chatReducer;
