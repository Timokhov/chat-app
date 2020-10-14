import React from 'react';
import { ChatMessage } from '../../models/message';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface SystemMessageProps {
    message: ChatMessage
}

const SystemChatMessageComponent = (props: SystemMessageProps) => {
    return (
        <Text style={ styles.systemMessage }>
            { props.message.text }
        </Text>
    );
};

const styles = StyleSheet.create({
    systemMessage: {
        fontSize: 16,
        color: COLORS.common
    }
});

export default SystemChatMessageComponent;
