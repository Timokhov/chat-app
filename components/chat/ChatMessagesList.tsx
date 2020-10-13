import React, { useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import {
    FlatList,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
    ViewStyle, ViewToken
} from 'react-native';
import { Action, Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../../models/message';
import { MessageType } from '../../models/message-type';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import { RootState } from '../../store/store';
import ChatMessage from './ChatMessage';
import SystemMessage from './SystemMessage';
import * as ChatActions from '../../store/chat/chat.actions';
import ToBottomButton from '../ui/ToBottomButton';
import CountBadge from '../ui/CountBadge';

interface ChatMessagesListProps {}

export interface ChatMessagesListRef {
    scrollToBottom: () => void
}

const ChatMessagesList = forwardRef<ChatMessagesListRef>((props: ChatMessagesListProps, ref) => {

    //const [scrollPosition, setScrollPosition] = useState(0);
    //const [contentHeight, setContentHeight] = useState(0);

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );
    const isScrollAtBottom: boolean = useSelector(
        (state: RootState) => state.chatState.isScrollAtBottom
    );
    const messages: Message[] = useSelector(
        (state: RootState) => state.chatState.messages
    );
    const unreadMessagesIdList: string[] = useSelector(
        (state: RootState) => state.chatState.unreadMessagesIdList
    );

    const dispatch: Dispatch<Action> = useDispatch();

    const flatListRef = useRef<FlatList>(null);
    const onViewableItemsChangedRef = useRef((info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
        const readMessagesIdList: string[] = info.changed.map(token => token.key);
        dispatch(ChatActions.readMessages(readMessagesIdList));
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 10 });

    const scrollToBottom = useCallback(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToIndex({
                animated: true,
                index: 0
            });
        }
    }, [messages]);

    useImperativeHandle<ChatMessagesListRef, ChatMessagesListRef>(
        ref,
        () => ({
            scrollToBottom: scrollToBottom
        }),
        [scrollToBottom]
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

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const yOffset: number = event.nativeEvent.contentOffset.y;
        if (!isScrollAtBottom &&  yOffset < 20) {
            dispatch(ChatActions.chatScrolled(true));
        }

        if (isScrollAtBottom && yOffset > 20) {
            dispatch(ChatActions.chatScrolled(false));
        }
        //setScrollPosition(yOffset);
    }

    //todo maintein scroll position on new message https://github.com/facebook/react-native/issues/25239
    /*const onContentSizeChanged = (w: number, h: number) => {
        if (!isScrollAtBottom) {
            const newScrollPosition: number = scrollPosition + (h - contentHeight);
            flatListRef.current?.scrollToOffset({ animated: false, offset: newScrollPosition });
        }
        setContentHeight(h);
    }*/

    return (
        <View style={{ flex: 1 }}>
            <FlatList ref={ flatListRef }
                      contentContainerStyle={ styles.chatMessagesList }
                      data={ messages }
                      renderItem={ renderMessage }
                      onScroll={ onScroll }
                      viewabilityConfig={ viewConfigRef.current }
                      onViewableItemsChanged={ onViewableItemsChangedRef.current }
                      inverted/>
            {
                !isScrollAtBottom && (
                    <View style={ styles.toBottomButtonContainer }>
                        <ToBottomButton onPress={ scrollToBottom }/>
                        {
                            unreadMessagesIdList.length > 0 && <CountBadge style={ styles.unreadMessagesCountBadge }
                                                                       count={ unreadMessagesIdList.length }/>
                        }
                    </View>
                )
            }
        </View>
    );
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
    },
    toBottomButtonContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        right: 10
    },
    unreadMessagesCountBadge: {
        position: 'absolute',
        top: -10
    }
});

export default ChatMessagesList;
