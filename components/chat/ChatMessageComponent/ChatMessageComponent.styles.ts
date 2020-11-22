import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    chatMessage: {
        width: '100%',
        minHeight: 60,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    currentUserMessage: {
        borderTopLeftRadius: 10,
        backgroundColor: COLORS.primary,
    },
    anotherUserMessage: {
        borderTopRightRadius: 10,
        backgroundColor: COLORS.common
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    text: {

    },
    currentUserText: {
        color: 'white'
    },
    anotherUserText: {

    },
    date: {
        alignSelf: 'flex-end',
        fontSize: 10,
        marginTop: 3
    },
    currentUserDate: {
        color: COLORS.common
    },
    anotherUserDate: {
        color: COLORS.textHighlight
    }
});
