import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Platform, UIManager } from 'react-native';
import * as WebSocketActions from './store/web-socket/web-socket.actions';
import * as encoding from 'text-encoding';

const encoder = new encoding.TextEncoder();

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {

    useEffect(() => {
        store.dispatch(WebSocketActions.connectToWebSocket());
    }, []);

    return (
        <Provider store={ store }>
            <AppNavigator/>
        </Provider>
    );
};

export default App;
