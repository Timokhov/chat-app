import { Message } from '../../models/message';
import {
    ChatAction,
    ChatActionType,
    ChatScrolledAction,
    ReadMessagesAction,
    ReceiveChatMessageAction
} from './chat.actions';

export enum ChatTopicSubscriptionStatus {
    SUBSCRIBING = 'SUBSCRIBING',
    SUBSCRIBED = 'SUBSCRIBED',
    UNSUBSCRIBED = 'UNSUBSCRIBED'
}

export interface ChatState {
    subscriptionStatus: ChatTopicSubscriptionStatus,
    isScrollAtBottom: boolean,
    messages: Message[];
    unreadMessagesIdList: string[];
}

const initialState: ChatState = {
    subscriptionStatus: ChatTopicSubscriptionStatus.UNSUBSCRIBED,
    isScrollAtBottom: true,
    messages: [],
    unreadMessagesIdList: []
};

const onSubscribeToChatTopicStart = (state: ChatState, action: ChatAction): ChatState => {
    return {
        subscriptionStatus: ChatTopicSubscriptionStatus.SUBSCRIBING,
        isScrollAtBottom: true,
        messages: [],
        unreadMessagesIdList: []
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
        isScrollAtBottom: true,
        messages: [],
        unreadMessagesIdList: []
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
        unreadMessagesIdList: state.unreadMessagesIdList.filter(id => !action.idList.includes(id))
    }
}

const onReceiveMessage = (state: ChatState, action: ReceiveChatMessageAction): ChatState => {
    const messages: Message[] = [ ...state.messages ];
    messages.unshift(action.message);

    return {
        ...state,
        subscriptionStatus: ChatTopicSubscriptionStatus.SUBSCRIBED,
        messages: messages,
        unreadMessagesIdList: state.isScrollAtBottom
            ? state.unreadMessagesIdList
            : state.unreadMessagesIdList.concat(action.message.id)
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
            return onReadMessages(state, action as ReadMessagesAction);1
        case ChatActionType.RECEIVE_CHAT_MESSAGE:
            return onReceiveMessage(state, action as ReceiveChatMessageAction);
        default:
            return state;
    }
};

export default chatReducer;
