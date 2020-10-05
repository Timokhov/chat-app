import { User } from './user';
import moment from 'moment';

export class Message {
    constructor(
        public id: string,
        public user: User,
        public text: string,
        public date: Date
    ) {}

    public dateString(): string {
        return moment(this.date).format('MMM Do, hh:mm')
    }
}
