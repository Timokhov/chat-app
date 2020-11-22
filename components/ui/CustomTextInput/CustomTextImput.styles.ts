import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
    textInput: {
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: COLORS.common,
        paddingHorizontal: 20,
        fontSize: 16
    },
    focused: {
        borderColor: COLORS.primary,
    }
});
