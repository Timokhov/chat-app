import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { COLORS } from '../../constants/colors';
import { Message } from '../../models/message';
import { MessageType } from '../../models/message-type';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import * as DateService from '../../services/date.service';
import { RootState } from '../../store/store';
import CustomTextInput from '../ui/CustomTextInput';

interface ChatMessageInputProps {
    onSend: (message: Message) => void
}

const ChatMessageInput = (props: ChatMessageInputProps) => {

    const [messageText, setMessageText] = useState('');

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );

    const onSend = () => {
        if (messageText) {
            const message: Message = {
                id: uuid(),
                type: MessageType.CHAT,
                user: user,
                text: messageText,
                date: DateService.dateToString(new Date())
            };
            props.onSend(message);
            setMessageText('');
        }
    };

    return (
        <View style={ styles.chatMessageInput }>
            <CustomTextInput style={ styles.input }
                             placeholder="Type message"
                             multiline
                             value={ messageText }
                             onChangeText={ setMessageText }/>
            <TouchableNativeFeedback onPress={ onSend } useForeground>
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
