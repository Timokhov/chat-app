import React, { useCallback, useEffect, useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { UserNavigatorParams } from '../../navigation/AppNavigator';
import {
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    EmitterSubscription, ImageStyle, LayoutAnimation
} from 'react-native';
import { Action, Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import * as UserActions from '../../store/user/user.actions';
import CustomTextInput from '../../components/ui/CustomTextInput';
import CustomButton from '../../components/ui/CustomButton';

type UserScreenStackNavigationProp = StackNavigationProp<UserNavigatorParams, 'User'>;
type UserScreenRouteProp = RouteProp<UserNavigatorParams, 'User'>;
type UserScreenProps = {
    navigation: UserScreenStackNavigationProp,
    route: UserScreenRouteProp
};
const UserScreen = (props: UserScreenProps) => {

    const [logoStyle, setLogoStyle] = useState<ImageStyle>(styles.logo);
    const [name, setName] = useState('');

    const dispatch: Dispatch<Action> = useDispatch();

    useEffect(() => {
        const keyboardWillShowSub: EmitterSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardWillShow);
        const keyboardWillHideSub: EmitterSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardWillHide);

        return () => {
            keyboardWillShowSub.remove();
            keyboardWillHideSub.remove();
        }
    }, []);

    const onKeyboardWillShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setLogoStyle(styles.logoSmall);
    };

    const onKeyboardWillHide = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setLogoStyle(styles.logo);
    };

    const onNameInputChange = (newName: string) => {
        setName(newName);
    };

    const onEnterChat = () => {
        dispatch(UserActions.enterChat({ id: uuid(), name: name }));
    };

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
            <KeyboardAvoidingView style={ styles.screen }>
                <Image style={{ ...logoStyle }}
                       source={require('../../assets/chat.png')}/>
                <View style={ styles.formContainer }>
                    <CustomTextInput placeholder="Please Enter Your Name"
                                     onChangeText={ onNameInputChange }/>
                    <View style={ styles.buttonContainer }>
                        <CustomButton onPress={ onEnterChat } disabled={ !name }/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 70
    },
    logoSmall: {
        width: 200,
        height: 200,
        marginBottom: 50
    },
    formContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20
    }
});

export const userScreenNavigationOptions = (props: UserScreenProps): StackNavigationOptions => {
    return {}
};

export default UserScreen;
