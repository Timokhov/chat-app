import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Platform, UIManager } from 'react-native';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
    return (
        <Provider store={ store }>
            <AppNavigator/>
        </Provider>
    );
};

export default App;
