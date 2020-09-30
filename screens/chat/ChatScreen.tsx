import React, { useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
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

    return (
        <View>
            <Text>Chat Screen</Text>
        </View>
    );
};

export const chatScreenNavigationOptions = (props: ChatScreenProps): StackNavigationOptions => {
    return {}
}

export default ChatScreen;
