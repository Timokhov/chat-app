import React from 'react';
import { ChatMessage } from '../../../models/message';
import { Text } from 'react-native';
import { styles } from './SystemChatMessageComponent.styles';

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

export default SystemChatMessageComponent;
