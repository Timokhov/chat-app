import moment from 'moment';

export const dateToString = (date: Date): string => {
    return moment(date).format('MMM Do, HH:mm');
};
