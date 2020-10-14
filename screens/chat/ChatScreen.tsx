import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import ChatMessageInput from '../../components/chat/ChatMessageInput';
import ChatMessagesList, { ChatMessagesListRef } from '../../components/chat/ChatMessagesList';
import ScreenLoader from '../../components/ui/ScreenLoader';
import { ChatNavigatorParams } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionStatus } from '../../store/chat/chat.reducer';
import { RootState } from '../../store/store';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/ui/CustomHeaderButton';
import { Action, Dispatch } from 'redux';
import * as UserActions from '../../store/user/user.actions';
import { COLORS } from '../../constants/colors';

type ChatScreenStackNavigationProp = StackNavigationProp<ChatNavigatorParams, 'Chat'>;
type ChatScreenRouteProp = RouteProp<ChatNavigatorParams, 'Chat'>;
type ChatScreenProps = {
    navigation: ChatScreenStackNavigationProp,
    route: ChatScreenRouteProp
};
const ChatScreen = (props: ChatScreenProps) => {

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );
    const chatTopicSubscriptionStatus = useSelector(
        (state: RootState) => state.chatState.chatSubscriptionStatus
    );

    const dispatch: Dispatch<Action> = useDispatch();

    const chatMessageListRef = useRef<ChatMessagesListRef>(null);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: `Chatting as ${user?.name}`,
            headerLeft: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={ CustomHeaderButton }>
                        <Item title='Leave'
                              iconName='ios-exit'
                              onPress={ () => dispatch(UserActions.leaveChat()) }/>
                    </HeaderButtons>
                );
            }
        });

        return () => {
            dispatch(UserActions.leaveChat());
        }
    }, []);

    const afterPublishChatMessage = () => {
        chatMessageListRef.current?.scrollToBottom();
    };

    let content: React.ReactElement = <ScreenLoader/>;
    if (SubscriptionStatus.SUBSCRIBED === chatTopicSubscriptionStatus) {
        content = (
            <View style={ styles.screen }>
                <ChatMessagesList ref={ chatMessageListRef }/>
                <View style={ styles.footer }>
                    <ChatMessageInput afterPublishChatMessage={ afterPublishChatMessage }/>
                </View>
            </View>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    footer: {
        borderTopWidth: 1,
        borderColor: COLORS.common,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    }
});

export const chatScreenNavigationOptions = (props: ChatScreenProps): StackNavigationOptions => {
    return {}
};

export default ChatScreen;
