import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { COLORS } from '../../../constants/colors';
import { ChatMessage, ChatMessageType } from '../../../models/message';
import { Nullable } from '../../../models/nullable';
import { User } from '../../../models/user';
import * as DateService from '../../../services/date.service';
import { RootState } from '../../../store/store';
import CustomTextInput from '../../ui/CustomTextInput/CustomTextInput';
import * as WebSocketService from '../../../services/web-socket.service';
import { styles } from './ChatMessageInput.styles';

interface ChatMessageInputProps {
    afterPublishChatMessage?: () => void;
}

const ChatMessageInput = (props: ChatMessageInputProps) => {

    const [messageText, setMessageText] = useState('');

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );

    const onPublishChatMessage = () => {
        if (messageText) {
            const message: ChatMessage = {
                id: uuid(),
                type: ChatMessageType.CHAT,
                user: user,
                text: messageText,
                date: DateService.dateToString(new Date())
            };

            WebSocketService.publish('/topic/chat/publish/message', message);
            props.afterPublishChatMessage && props.afterPublishChatMessage();
            setMessageText('');
        }
    };

    const onTypingStart = () => {
        WebSocketService.publish('/topic/chat/publish/start-typing', user);
    };

    const onTypingStop = () => {
        WebSocketService.publish('/topic/chat/publish/stop-typing', null);
    };

    return (
        <View style={ styles.chatMessageInput }>
            <CustomTextInput style={ styles.input }
                             placeholder="Type message"
                             multiline
                             value={ messageText }
                             onChangeText={ setMessageText }
                             onFocus={ onTypingStart }
                             onBlur={ onTypingStop }/>
            <TouchableNativeFeedback onPress={ onPublishChatMessage } useForeground testID="SendMessageTouchable">
                <View style={ styles.sendButton }>
                    <Ionicons name="ios-send" size={ 40 } color={ COLORS.primary }/>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

export default ChatMessageInput;
