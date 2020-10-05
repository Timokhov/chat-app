import { Action } from 'redux';
import { Message } from '../../models/message';

export enum ChatActionType {
    PUBLISH_MESSAGE = 'PUBLISH_MESSAGE'
}

export interface ChatAction extends Action<ChatActionType> {}

export interface PublishMessageAction extends ChatAction {
    message: Message
}

export const publishMessage = (message: Message): PublishMessageAction => {
    return {
        type: ChatActionType.PUBLISH_MESSAGE,
        message: message
    }
}
