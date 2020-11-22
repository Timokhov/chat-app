import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { styles } from './CustomButton.styles';

export interface CustomButtonProps extends TouchableOpacityProps {
    label: string
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <TouchableOpacity { ...props } activeOpacity={ 0.7 }>
            <View style={{ ...styles.customButton, backgroundColor: props.disabled ? COLORS.common : COLORS.primary }}
                  testID="CustomButtonContainerView">
                <Text style={ styles.label }>
                    { props.label }
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton
