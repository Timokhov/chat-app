import { User } from './user';
import moment from 'moment';
import { MessageType } from './message-type';
import { Nullable } from './nullable';

export class Message {
    constructor(
        public id: string,
        public type: MessageType,
        public user: Nullable<User>,
        public text: string,
        public date: Date
    ) {}

    public dateString(): string {
        return moment(this.date).format('MMM Do, hh:mm')
    }
}
