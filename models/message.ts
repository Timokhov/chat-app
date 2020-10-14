import { User } from './user';
import { Nullable } from './nullable';

export interface Message {
    id: string;
    date: string;
}

export enum ChatMessageType {
    CHAT = 'CHAT',
    SYSTEM = 'SYSTEM'
}

export interface ChatMessage extends Message {
    type: ChatMessageType;
    user: Nullable<User>;
    text: string;
}

export interface TypingMessage extends Message {
    typingUsers: User[];
}
