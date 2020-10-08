import { User } from './user';
import { MessageType } from './message-type';
import { Nullable } from './nullable';

export interface Message {
    id: string,
    type: MessageType,
    user: Nullable<User>,
    text: string,
    date: string
}
