import { Action } from 'redux';
import { Message } from '../../models/message';

export enum ChatActionType {
    SUBSCRIBE_TO_CHAT_TOPIC = 'SUBSCRIBE_TO_CHAT_TOPIC',
    SUBSCRIBE_TO_CHAT_TOPIC_START = 'SUBSCRIBE_TO_CHAT_TOPIC_START',
    SUBSCRIBE_TO_CHAT_TOPIC_FINISH = 'SUBSCRIBE_TO_CHAT_TOPIC_FINISH',
    UNSUBSCRIBE_FROM_CHAT_TOPIC = 'UNSUBSCRIBE_FROM_CHAT_TOPIC',
    UNSUBSCRIBE_FROM_CHAT_TOPIC_FINISH = 'UNSUBSCRIBE_FROM_CHAT_TOPIC_FINISH',

    RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE'
}

export interface ChatAction extends Action<ChatActionType> {}

export interface SubscribeToChatTopicAction extends ChatAction {
    url: string
}

export interface ReceiveChatMessageAction extends ChatAction {
    message: Message
}

export const subscribeToChatTopic = (url: string): SubscribeToChatTopicAction => {
    return {
        type: ChatActionType.SUBSCRIBE_TO_CHAT_TOPIC,
        url: url
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

export const receiveChatMessage = (message: Message): ReceiveChatMessageAction => {
    return {
        type: ChatActionType.RECEIVE_CHAT_MESSAGE,
        message: message
    };
};
