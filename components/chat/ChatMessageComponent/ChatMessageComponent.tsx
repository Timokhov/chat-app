import React from 'react';
import { ChatMessage } from '../../../models/message';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './ChatMessageComponent.styles';

interface ChatMessageProps {
    message: ChatMessage,
    currentUserMessage: boolean,
    showSender: boolean
}

const ChatMessageComponent = (props: ChatMessageProps) => {

    const messageStyles: ViewStyle[] = [
        styles.chatMessage,
        props.currentUserMessage
            ? styles.currentUserMessage
            : styles.anotherUserMessage
    ];

    const messageTextStyles: TextStyle[] = [
        styles.text,
        props.currentUserMessage
            ? styles.currentUserText
            : styles.anotherUserText
    ];

    const dateStyles: TextStyle[] = [
        styles.date,
        props.currentUserMessage
            ? styles.currentUserDate
            : styles.anotherUserDate
    ];

    return (
        <View style={ messageStyles } testID="ContainerView">
            {
                !props.currentUserMessage && props.showSender && (
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

export default ChatMessageComponent;
