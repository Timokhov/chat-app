import React, { useState } from 'react';
import {
    TextInput,
    StyleSheet,
    TextInputProps,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextStyle, StyleProp
} from 'react-native';
import { COLORS } from '../../../constants/colors';

const CustomTextInput = (props: TextInputProps) => {

    const [isFocused, setFocused] = useState(false);

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) =>{
        setFocused(true);
        props.onFocus && props.onFocus(e);
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false);
        props.onBlur && props.onBlur(e);
    };

    const textInputStyle: StyleProp<TextStyle> = [
        styles.textInput, props.style
    ];

    if (isFocused) {
        textInputStyle.push(styles.focused);
    }

    return (
        <TextInput {...props}
                   style={ textInputStyle }
                   selectionColor={ COLORS.primary }
                   onFocus={ onFocus }
                   onBlur={ onBlur }
                   testID="InnerTextInput"/>
    );
};

const styles = StyleSheet.create({
    textInput: {
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: COLORS.common,
        paddingHorizontal: 20,
        fontSize: 16
    },
    focused: {
        borderColor: COLORS.primary,
    }
});

export default CustomTextInput;
