import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { COLORS } from '../../constants/colors';
import { ChatMessage, ChatMessageType } from '../../models/message';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import * as DateService from '../../services/date.service';
import { RootState } from '../../store/store';
import CustomTextInput from '../ui/CustomTextInput';
import * as WebSocketService from '../../services/web-socket.service';

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
        if (user) {
            WebSocketService.publish('/topic/chat/publish/start-typing', user);
        }
    }

    const onTypingStop = () => {
        if (user) {
            WebSocketService.publish('/topic/chat/publish/stop-typing', null);
        }
    }

    return (
        <View style={ styles.chatMessageInput }>
            <CustomTextInput style={ styles.input }
                             placeholder="Type message"
                             multiline
                             value={ messageText }
                             onChangeText={ setMessageText }
                             onFocus={ onTypingStart }
                             onBlur={ onTypingStop }/>
            <TouchableNativeFeedback onPress={ onPublishChatMessage } useForeground>
                <View style={ styles.sendButton }>
                    <Ionicons name="ios-send" size={ 40 } color={ COLORS.primary }/>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default ChatMessageInput;
