import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Action, Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { COLORS } from '../constants/colors';
import * as WebSocketActions from '../store/web-socket/web-socket.actions';

const StartupScreen = () => {

    const dispatch: Dispatch<Action> = useDispatch();
    useEffect(() => {
        dispatch(WebSocketActions.connectToWebSocket());
    }, []);

    return (
        <View style={ styles.screen }>
            <ActivityIndicator size="large" color={ COLORS.primary }/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
