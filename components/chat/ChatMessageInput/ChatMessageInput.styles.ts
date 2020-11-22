import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    chatMessageInput: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        backgroundColor: 'white',
        marginRight: 10
    },
    sendButton: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden'
    }
});
