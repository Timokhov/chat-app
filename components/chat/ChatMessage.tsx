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
        styles.chatMessage,
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

    const dateStyles: TextStyle[] = [
        styles.date,
        props.userMessage
            ? styles.currentUserDate
            : styles.anotherUserDate
    ];

    return (
        <View style={ messageStyles }>
            {
                !props.userMessage && props.showSender && (
                    <Text style={ styles.userName }>
                        { props.message.user?.name }
                    </Text>
                )
            }
            <Text style={ messageTextStyles }>
                { props.message.text }
            </Text>
            <Text style={ dateStyles }>
                { props.message.date }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default ChatMessage;
