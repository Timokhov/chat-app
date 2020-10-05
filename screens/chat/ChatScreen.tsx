import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableNativeFeedback,
    FlatList, ListRenderItemInfo, ViewStyle, Keyboard
} from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { ChatNavigatorParams } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import { Action, Dispatch } from 'redux';
import * as UserActions from '../../store/user/user.actions';
import { COLORS } from '../../constants/colors';
import CustomTextInput from '../../components/ui/CustomTextInput';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../../models/message';
import ChatMessage from '../../components/chat/ChatMessage';
import { v4 as uuid } from 'uuid';
import * as ChatActions from '../../store/chat/chat.actions';

type ChatScreenStackNavigationProp = StackNavigationProp<ChatNavigatorParams, 'Chat'>;
type ChatScreenRouteProp = RouteProp<ChatNavigatorParams, 'Chat'>;
type ChatScreenProps = {
    navigation: ChatScreenStackNavigationProp,
    route: ChatScreenRouteProp
};
const ChatScreen = (props: ChatScreenProps) => {

    const [messageText, setMessageText] = useState('');

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );
    const messages: Message[] = useSelector(
        (state: RootState) => state.chatState.messages
    );

    const dispatch: Dispatch<Action> = useDispatch();
    const dispatchClearUser = useCallback(() => {
        dispatch(UserActions.clearUser());
    }, [dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: `Chatting as ${user?.name}`,
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                        <Item title='Leave'
                              iconName='ios-exit'
                              onPress={ dispatchClearUser }/>
                    </HeaderButtons>
                );
            }
        });
    }, []);

    const onMessageTextChange = (newText: string) => {
        setMessageText(newText);
    };

    const renderMessage = (itemInfo: ListRenderItemInfo<Message>): React.ReactElement => {
        const message: Message = itemInfo.item
        const userMessage: boolean = message.user?.id === user?.id;
        const previousMessage: Nullable<Message> = itemInfo.index > 0 ? messages[itemInfo.index - 1] : null;
        const previousMessageFromSameUser: boolean = previousMessage?.user.id === message.user.id;
        const messageContainerStyle: ViewStyle = {
            ...styles.messageContainer,
            alignSelf:  userMessage ? 'flex-end' : 'flex-start',
            marginTop: previousMessageFromSameUser ? 0 : 25,
            padding: 0
        };
        return (
            <View style={ messageContainerStyle }>
                <ChatMessage message={ itemInfo.item }
                             userMessage={ userMessage }
                             showSender={ !previousMessageFromSameUser }/>
            </View>
        )
    };

    const publishMessage = () => {
        if (user) {
            const message = new Message(
                uuid(),
                user,
                messageText,
                new Date()
            );
            dispatch(ChatActions.publishMessage(message));
        }
        Keyboard.dismiss();
        setMessageText('');
    };

    return (
        <View style={ styles.screen }>
            <FlatList data={ messages } renderItem={ renderMessage }/>
            <View style={ styles.footer }>
                <CustomTextInput style={ styles.input }
                                 placeholder="Type message"
                                 multiline
                                 value={ messageText }
                                 onChangeText={ onMessageTextChange }/>
                <TouchableNativeFeedback onPress={ publishMessage } useForeground>
                    <View style={ styles.sendButton }>
                        <Ionicons name="ios-send" size={ 40 } color={ COLORS.primary }/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    messageContainer: {
        width: '80%',
        marginBottom: 5
    },
    footer: {
        borderTopWidth: 1,
        borderColor: COLORS.common,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
})

export const chatScreenNavigationOptions = (props: ChatScreenProps): StackNavigationOptions => {
    return {}
}

export default ChatScreen;
