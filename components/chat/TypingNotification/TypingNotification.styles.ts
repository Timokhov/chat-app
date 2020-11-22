import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    typingNotification: {
        flexDirection: 'row',
        padding: 10
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.common,
        alignSelf: 'flex-end'
    },
    animation: {
        top: 7
    }
});
