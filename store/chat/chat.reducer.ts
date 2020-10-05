import { Message } from '../../models/message';
import { ChatAction, ChatActionType, PublishMessageAction } from './chat.actions';

export interface ChatState {
    messages: Message[];
}

const initialState: ChatState = {
    messages: []
};

const onPublishMessage = (state: ChatState, action: PublishMessageAction): ChatState => {
    return {
        messages: state.messages.concat(action.message)
    };
};

const chatReducer = (state: ChatState = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionType.PUBLISH_MESSAGE:
            return onPublishMessage(state, action as PublishMessageAction);
        default:
            return state;
    }
};

export default chatReducer;
