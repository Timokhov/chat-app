import { Action } from 'redux';
import { ChatMessage } from '../../models/message';
import { User } from '../../models/user';

export enum ChatActionType {
    SUBSCRIBE_TO_CHAT_TOPIC = 'SUBSCRIBE_TO_CHAT_TOPIC',
    SUBSCRIBE_TO_CHAT_TOPIC_START = 'SUBSCRIBE_TO_CHAT_TOPIC_START',
    SUBSCRIBE_TO_CHAT_TOPIC_FINISH = 'SUBSCRIBE_TO_CHAT_TOPIC_FINISH',
    UNSUBSCRIBE_FROM_CHAT_TOPIC = 'UNSUBSCRIBE_FROM_CHAT_TOPIC',
    UNSUBSCRIBE_FROM_CHAT_TOPIC_FINISH = 'UNSUBSCRIBE_FROM_CHAT_TOPIC_FINISH',

    SUBSCRIBE_TO_TYPING_TOPIC = 'SUBSCRIBE_TO_TYPING_TOPIC',
    UNSUBSCRIBE_FROM_TYPING_TOPIC = 'UNSUBSCRIBE_FROM_TYPING_TOPIC',
    SET_TYPING_NOTIFICATION = 'SET_TYPING_NOTIFICATION',

    CHAT_SCROLLED = 'CHAT_SCROLLED',
    READ_MESSAGES = 'READ_MESSAGES',

    RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE'
}

export interface ChatAction extends Action<ChatActionType> {}

export interface SubscribeToTopicAction extends ChatAction {
    user: User
}

export interface SetTypingNotificationAction extends ChatAction {
    notification: string
}

export interface ReceiveChatMessageAction extends ChatAction {
    message: ChatMessage
}

export interface ChatScrolledAction extends ChatAction {
    isScrollAtBottom: boolean
}

export interface ReadMessagesAction extends ChatAction {
    idList: string[]
}

export const subscribeToChatTopic = (user: User): SubscribeToTopicAction => {
    return {
        type: ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC,
        user: user
    };
};

export const subscribeToChatTopicStart = (): ChatAction => {
    return {
        type: ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC_START,
    };
};

export const subscribeToChatTopicFinish = (): ChatAction => {
    return {
        type: ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC_FINISH,
    };
};

export const unsubscribeFromChatTopic = (): ChatAction => {
    return {
        type: ChatActionType.UNSUBSCRIBE_FROM_CHAT_TOPIC,
    };
};

export const unsubscribeToChatTopicFinish = (): ChatAction => {
    return {
        type: ChatActionType.UNSUBSCRIBE_FROM_CHAT_TOPIC_FINISH,
    };
};

export const subscribeToTypingTopic = (user: User): SubscribeToTopicAction => {
    return {
        type: ChatActionType.SUBSCRIBE_TO_TYPING_TOPIC,
        user: user
    };
};

export const unsubscribeFromTypingTopic = (): ChatAction => {
    return {
        type: ChatActionType.UNSUBSCRIBE_FROM_TYPING_TOPIC
    };
};

export const setTypingNotification = (notification: string): SetTypingNotificationAction => {
    return {
        type: ChatActionType.SET_TYPING_NOTIFICATION,
        notification: notification
    };
};

export const chatScrolled = (isScrollAtBottom: boolean): ChatScrolledAction => {
    return {
        type: ChatActionType.CHAT_SCROLLED,
        isScrollAtBottom: isScrollAtBottom
    };
};

export const readMessages = (idList: string[]): ReadMessagesAction => {
    return {
        type: ChatActionType.READ_MESSAGES,
        idList: idList
    };
};

export const receiveChatMessage = (message: ChatMessage): ReceiveChatMessageAction => {
    return {
        type: ChatActionType.RECEIVE_CHAT_MESSAGE,
        message: message
    };
};
