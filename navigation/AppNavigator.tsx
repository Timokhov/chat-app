import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { COLORS } from '../constants/colors';
import UserScreen, { userScreenNavigationOptions } from '../screens/user/UserScreen';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen, { chatScreenNavigationOptions } from '../screens/chat/ChatScreen';
import { Nullable } from '../models/nullable';
import { User } from '../models/user';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const defaultNavOptions: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: COLORS.primary
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center'
};

export type ChatNavigatorParams = {
    Chat: undefined
}
const ChatStackNavigator = createStackNavigator<ChatNavigatorParams>();
const ChatNavigator = () => {
    return (
        <ChatStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <ChatStackNavigator.Screen
                name="Chat"
                component={ ChatScreen }
                options={ chatScreenNavigationOptions }
            />
        </ChatStackNavigator.Navigator>
    );
};

export type UserNavigatorParams = {
    User: undefined
}
const UserStackNavigator = createStackNavigator<UserNavigatorParams>();
const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator screenOptions={ defaultNavOptions }>
            <UserStackNavigator.Screen
                name="User"
                component={ UserScreen }
                options={ userScreenNavigationOptions }
            />
        </UserStackNavigator.Navigator>
    );
};

const AppNavigator = () => {

    const user: Nullable<User> = useSelector(
        (state: RootState) => state.userState.user
    );

    return (
        <NavigationContainer>
            { user
                ? <ChatNavigator/>
                : <UserNavigator/>
            }
        </NavigationContainer>
    );
};

export default AppNavigator;
