import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    chatMessagesList: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    chatMessageContainer: {
        maxWidth: '80%'
    },
    systemMessageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginVertical: 15
    },
    toBottomButtonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        right: 10
    },
    unreadMessagesCountBadge: {
        position: 'absolute',
        top: -10
    }
});
