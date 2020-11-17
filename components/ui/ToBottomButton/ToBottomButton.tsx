import React from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';

interface ToBottomButtonProps {
    onPress: () => void
}

const ToBottomButton = (props: ToBottomButtonProps) => {
    return (
        <TouchableNativeFeedback onPress={ props.onPress } useForeground>
            <View style={ styles.toBottomButton }>
                <Ionicons name='ios-arrow-down'
                          size={ 30 }
                          color="white" />
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    toBottomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.textHighlight,
        overflow: 'hidden'
    }
})

export default ToBottomButton;
