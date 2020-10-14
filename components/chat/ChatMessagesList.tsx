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
import { ChatMessage, ChatMessageType } from '../../models/message';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import { RootState } from '../../store/store';
import ChatMessageComponent from './ChatMessageComponent';
import SystemChatMessageComponent from './SystemChatMessageComponent';
import * as ChatActions from '../../store/chat/chat.actions';
import ToBottomButton from '../ui/ToBottomButton';
import CountBadge from '../ui/CountBadge';
import TypingNotification from './TypingNotification';

interface ViewableItemsChangedInfo {
    viewableItems: Array<ViewToken>;
    changed: Array<ViewToken>
}

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
    const chatMessages: ChatMessage[] = useSelector(
        (state: RootState) => state.chatState.chatMessages
    );
    const unreadChatMessagesIdList: string[] = useSelector(
        (state: RootState) => state.chatState.unreadChatMessagesIdList
    );
    const typingNotification: string = useSelector(
        (state: RootState) => state.chatState.typingNotification
    )

    const dispatch: Dispatch<Action> = useDispatch();

    const flatListRef = useRef<FlatList>(null);

    const onViewableItemsChangedRef = useRef((info: ViewableItemsChangedInfo) => {
        const readMessagesIdList: string[] = info.changed.map(token => token.key);
        dispatch(ChatActions.readMessages(readMessagesIdList));
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 10 });

    const scrollToBottom = useCallback(() => {
        if (chatMessages.length > 0) {
            flatListRef.current?.scrollToOffset({
                animated: true,
                offset: 0
            });
        }
    }, [chatMessages]);

    useImperativeHandle<ChatMessagesListRef, ChatMessagesListRef>(
        ref,
        () => ({
            scrollToBottom: scrollToBottom
        }),
        [scrollToBottom]
    );

    const renderMessage = (itemInfo: ListRenderItemInfo<ChatMessage>): React.ReactElement => {
        const message: ChatMessage = itemInfo.item;
        if (ChatMessageType.CHAT === message.type) {
            return renderChatMessage(message, itemInfo.index);
        } else {
            return renderSystemMessage(message);
        }
    };

    const renderChatMessage = (message: ChatMessage, index: number): React.ReactElement => {
        const isUserMessage: boolean = message.user?.id === user?.id;
        const previousMessage: Nullable<ChatMessage> = index < chatMessages.length ? chatMessages[index + 1] : null;
        const isPreviousMessageFromSameUser: boolean = previousMessage?.user?.id === message.user?.id;
        const isPreviousMessageSystem: boolean = ChatMessageType.SYSTEM === previousMessage?.type;
        const messageContainerStyle: ViewStyle = {
            ...styles.chatMessageContainer,
            alignSelf:  isUserMessage ? 'flex-end' : 'flex-start',
            alignItems: isUserMessage ? 'flex-end' : 'flex-start',
            marginTop: isPreviousMessageFromSameUser || isPreviousMessageSystem ? 0 : 25,
            marginBottom: index === 0 ? 10 : 5,
            paddingHorizontal: 10
        };
        return (
            <View style={ messageContainerStyle }>
                <ChatMessageComponent message={ message }
                             userMessage={ isUserMessage }
                             showSender={ !isPreviousMessageFromSameUser || isPreviousMessageSystem }/>
            </View>
        );
    };

    const renderSystemMessage = (message: ChatMessage): React.ReactElement => {
        return (
            <View style={ styles.systemMessageContainer }>
                <SystemChatMessageComponent message={ message }/>
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
                      data={ chatMessages }
                      renderItem={ renderMessage }
                      onScroll={ onScroll }
                      viewabilityConfig={ viewConfigRef.current }
                      onViewableItemsChanged={ onViewableItemsChangedRef.current }
                      ListHeaderComponent={ typingNotification
                          ?  <TypingNotification notification={typingNotification}/>
                          : null
                      }
                      ListFooterComponentStyle={{ padding: 0, margin: 0 }}
                      inverted/>
            {
                !isScrollAtBottom && (
                    <View style={ styles.toBottomButtonContainer }>
                        <ToBottomButton onPress={ scrollToBottom }/>
                        {
                            unreadChatMessagesIdList.length > 0 && <CountBadge style={ styles.unreadMessagesCountBadge }
                                                                       count={ unreadChatMessagesIdList.length }/>
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
