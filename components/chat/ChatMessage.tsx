import React from 'react';
import { Message } from '../../models/message';
import { View, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface ChatMessageProps {
    message: Message,
    userMessage: boolean,
    showSender: boolean
}

const ChatMessage = (props: ChatMessageProps) => {

    const messageStyles: ViewStyle[] = [
        styles.message,
        props.userMessage
            ? styles.currentUserMessage
            : styles.anotherUserMessage
    ];

    const messageTextStyles: TextStyle[] = [
        styles.text,
        props.userMessage
            ? styles.currentUserText
            : styles.anotherUserText
    ];

    const infoStyle: ViewStyle = {
        ...styles.info,
        justifyContent: props.showSender || props.userMessage
            ? 'space-between'
            : 'flex-end'
    };

    return (
        <View style={ styles.chatMessage }>
            <View style={ infoStyle }>
                {
                    !props.userMessage && props.showSender && (
                        <Text style={ styles.userName }>
                            { props.message.user?.name }
                        </Text>
                    )
                }
                <Text style={ styles.date }>
                    { props.message.dateString() }
                </Text>
            </View>
            <View style={ messageStyles }>
                <Text style={ messageTextStyles }>
                    { props.message.text }
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatMessage: {
        width: '100%',
        paddingHorizontal: 5
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 3
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textHighlight
    },
    date: {
        fontSize: 10,
        color: COLORS.common
    },
    message: {
        flex: 1,
        justifyContent: 'center',
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
        marginLeft: 10,
        backgroundColor: COLORS.common
    },
    text: {

    },
    currentUserText: {
        color: 'white'
    },
    anotherUserText: {

    }
})

export default ChatMessage;
