import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { Message } from '../../models/message';
import { MessageType } from '../../models/message-type';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';

import { RootState } from '../../store/store';
import ChatMessage from './ChatMessage';
import SystemMessage from './SystemMessage';

interface ChatMessagesListProps {}

export interface ChatMessagesListRef {
    scrollToBottom: () => void
}

const ChatMessagesList = forwardRef<ChatMessagesListRef>((props: ChatMessagesListProps, ref) => {

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );
    const messages: Message[] = useSelector(
        (state: RootState) => state.chatState.messages
    );

    const flatListRef = useRef<FlatList>(null);

    useImperativeHandle<ChatMessagesListRef, ChatMessagesListRef>(
        ref,
        () => ({
            scrollToBottom: () => {
                if (messages.length > 0) {
                    flatListRef.current?.scrollToIndex({
                        animated: true,
                        index: 0
                    });
                }
            }
        }),
        [messages]
    );

    const renderMessage = (itemInfo: ListRenderItemInfo<Message>): React.ReactElement => {
        const message: Message = itemInfo.item;
        if (MessageType.CHAT === message.type) {
            return renderChatMessage(message, itemInfo.index);
        } else {
            return renderSystemMessage(message);
        }
    };

    const renderChatMessage = (message: Message, index: number): React.ReactElement => {
        const isUserMessage: boolean = message.user?.id === user?.id;
        const previousMessage: Nullable<Message> = index < messages.length ? messages[index + 1] : null;
        const isPreviousMessageFromSameUser: boolean = previousMessage?.user?.id === message.user?.id;
        const isPreviousMessageSystem: boolean = MessageType.SYSTEM === previousMessage?.type;
        const messageContainerStyle: ViewStyle = {
            ...styles.chatMessageContainer,
            alignSelf:  isUserMessage ? 'flex-end' : 'flex-start',
            alignItems: isUserMessage ? 'flex-end' : 'flex-start',
            marginTop: isPreviousMessageFromSameUser || isPreviousMessageSystem ? 0 : 25,
            marginBottom: index === 0 ? 25 : 5,
            paddingHorizontal: 10
        };
        return (
            <View style={ messageContainerStyle }>
                <ChatMessage message={ message }
                             userMessage={ isUserMessage }
                             showSender={ !isPreviousMessageFromSameUser || isPreviousMessageSystem }/>
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

    return <FlatList ref={ flatListRef }
                     contentContainerStyle={ styles.chatMessagesList }
                     data={ messages }
                     renderItem={ renderMessage }
                     inverted/>

});

const styles = StyleSheet.create({
    chatMessagesList: {
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
    }
});

export default ChatMessagesList;
