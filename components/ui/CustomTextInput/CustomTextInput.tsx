import React, { useState } from 'react';
import {
    TextInput,
    TextInputProps,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    TextStyle, StyleProp
} from 'react-native';
import { COLORS } from '../../../constants/colors';
import { styles } from './CustomTextImput.styles';

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

export default CustomTextInput;
