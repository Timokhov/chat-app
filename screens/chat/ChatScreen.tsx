import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    TouchableNativeFeedback,
    View,
    ViewStyle
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
import { MessageType } from '../../models/message-type';
import SystemMessage from '../../components/chat/SystemMessage';

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

    const flatListRef = useRef<FlatList>(null);

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

        const enterMessage = new Message(uuid(), MessageType.SYSTEM, null, `${ user?.name } has entered the chat`, new Date());
        dispatch(ChatActions.publishMessage(enterMessage));

        return () => {
            const enterMessage = new Message(uuid(), MessageType.SYSTEM, null, `${ user?.name } has left the chat`, new Date());
            dispatch(ChatActions.publishMessage(enterMessage));
        }
    }, []);

    const onMessageTextChange = (newText: string) => {
        setMessageText(newText);
    };

    const renderMessage = (itemInfo: ListRenderItemInfo<Message>): React.ReactElement => {
        const message: Message = itemInfo.item;
        if (MessageType.CHAT === message.type) {
            return renderChatMessage(message, itemInfo.index);
        } else {
            return renderSystemMessage(message);
        }
    };

    const renderChatMessage = (message: Message, index: number): React.ReactElement => {
        const userMessage: boolean = message.user?.id === user?.id;
        const previousMessage: Nullable<Message> = index < messages.length ? messages[index + 1] : null;
        const previousMessageFromSameUser: boolean = previousMessage?.user?.id === message.user?.id;
        const previousMessageSystem: boolean = MessageType.SYSTEM === previousMessage?.type;
        const messageContainerStyle: ViewStyle = {
            ...styles.chatMessageContainer,
            alignSelf:  userMessage ? 'flex-end' : 'flex-start',
            alignItems: userMessage ? 'flex-end' : 'flex-start',
            marginTop: previousMessageFromSameUser || previousMessageSystem ? 0 : 25,
            marginBottom: index === 0 ? 25 : 5,
            paddingHorizontal: 10
        };
        return (
            <View style={ messageContainerStyle }>
                <ChatMessage message={ message }
                             userMessage={ userMessage }
                             showSender={ !previousMessageFromSameUser || previousMessageSystem }/>
            </View>
        );
    };

    const renderSystemMessage = (message: Message): React.ReactElement => {
        return (
            <View style={ styles.systemMessageContainer }>
                <SystemMessage message={ message }/>
            </View>
        );
    };

    const publishMessage = () => {
        if (user) {
            const message = new Message(uuid(), MessageType.CHAT, user, messageText, new Date());
            dispatch(ChatActions.publishMessage(message));
        }
        setMessageText('');
        if (messages.length > 0) {
            flatListRef.current?.scrollToIndex({
                animated: true,
                index: 0
            });
        }
    };

    return (
        <View style={ styles.screen }>
            <FlatList ref={ flatListRef } contentContainerStyle={ styles.messagesList }
                      data={ messages }
                      renderItem={ renderMessage }
                      inverted/>
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
    messagesList: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    chatMessageContainer: {
        maxWidth: '80%'
    },
    systemMessageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginVertical: 15
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
});

export const chatScreenNavigationOptions = (props: ChatScreenProps): StackNavigationOptions => {
    return {}
};

export default ChatScreen;
