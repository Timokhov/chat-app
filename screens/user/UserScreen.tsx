import React, { useCallback } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { UserNavigatorParams } from '../../navigation/AppNavigator';
import { View, Text, Button } from 'react-native';
import { Action, Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import * as UserActions from '../../store/user/user.actions';
import { COLORS } from '../../constants/colors';

type UserScreenStackNavigationProp = StackNavigationProp<UserNavigatorParams, 'User'>;
type UserScreenRouteProp = RouteProp<UserNavigatorParams, 'User'>;
type UserScreenProps = {
    navigation: UserScreenStackNavigationProp,
    route: UserScreenRouteProp
};
const UserScreen = (props: UserScreenProps) => {

    const dispatch: Dispatch<Action> = useDispatch();
    const dispatchSetUser = useCallback(() => {
        dispatch(UserActions.setUser({ id: '123', name: 'test' }));
    }, [dispatch]);

    return (
       <View>
           <Text>User Screen</Text>
           <Button title='Enter Chat' onPress={ dispatchSetUser } color={ COLORS.primary }/>
       </View>
    );
};

export const userScreenNavigationOptions = (props: UserScreenProps): StackNavigationOptions => {
    return {
        headerTitle: 'Create User'
    }
}

export default UserScreen;
