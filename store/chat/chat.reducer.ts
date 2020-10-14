import { ChatMessage, Message } from '../../models/message';
import {
    ChatAction,
    ChatActionType,
    ChatScrolledAction,
    ReadMessagesAction,
    ReceiveChatMessageAction, SetTypingNotificationAction
} from './chat.actions';

export enum SubscriptionStatus {
    SUBSCRIBING = 'SUBSCRIBING',
    SUBSCRIBED = 'SUBSCRIBED',
    UNSUBSCRIBED = 'UNSUBSCRIBED'
}

export interface ChatState {
    chatSubscriptionStatus: SubscriptionStatus;
    chatMessages: ChatMessage[];
    unreadChatMessagesIdList: string[];
    isScrollAtBottom: boolean;
    typingNotification: string;
}

const initialState: ChatState = {
    chatSubscriptionStatus: SubscriptionStatus.UNSUBSCRIBED,
    chatMessages: [],
    unreadChatMessagesIdList: [],
    isScrollAtBottom: true,
    typingNotification: ''
};

const onSubscribeToChatTopicStart = (state: ChatState, action: ChatAction): ChatState => {
    return {
        ...initialState,
        chatSubscriptionStatus: SubscriptionStatus.SUBSCRIBING
    };
};

const onSubscribeToChatTopicFinish = (state: ChatState, action: ChatAction): ChatState => {
    return {
        ...state,
        chatSubscriptionStatus: SubscriptionStatus.SUBSCRIBED
    };
};

const onUnsubscribeFromChatTopicFinish = (state: ChatState, action: ChatAction): ChatState => {
    return {
        ...initialState,
        chatSubscriptionStatus: SubscriptionStatus.UNSUBSCRIBED
    };
};

const onChatScrolled = (state: ChatState, action: ChatScrolledAction): ChatState => {
    return {
        ...state,
        isScrollAtBottom: action.isScrollAtBottom
    };
};

const onReadMessages = (state: ChatState, action: ReadMessagesAction): ChatState => {
    return {
        ...state,
        unreadChatMessagesIdList: state.unreadChatMessagesIdList.filter(id => !action.idList.includes(id))
    }
}

const onReceiveMessage = (state: ChatState, action: ReceiveChatMessageAction): ChatState => {
    const messages: ChatMessage[] = [ ...state.chatMessages ];
    messages.unshift(action.message);

    return {
        ...state,
        chatSubscriptionStatus: SubscriptionStatus.SUBSCRIBED,
        chatMessages: messages,
        unreadChatMessagesIdList: state.isScrollAtBottom
            ? state.unreadChatMessagesIdList
            : state.unreadChatMessagesIdList.concat(action.message.id)
    };
};

const onSetTypingNotification = (state: ChatState, action: SetTypingNotificationAction): ChatState => {
    return {
        ...state,
        typingNotification: action.notification
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
        case ChatActionType.CHAT_SCROLLED:
            return onChatScrolled(state, action as ChatScrolledAction);
        case ChatActionType.READ_MESSAGES:
            return onReadMessages(state, action as ReadMessagesAction);
        case ChatActionType.RECEIVE_CHAT_MESSAGE:
            return onReceiveMessage(state, action as ReceiveChatMessageAction);
        case ChatActionType.SET_TYPING_NOTIFICATION:
            return onSetTypingNotification(state, action as SetTypingNotificationAction);
        default:
            return state;
    }
};

export default chatReducer;
