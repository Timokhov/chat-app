import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export interface CustomButtonProps extends TouchableOpacityProps {
    label: string
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <TouchableOpacity { ...props } activeOpacity={ 0.7 }>
            <View style={{ ...styles.customButton, backgroundColor: props.disabled ? COLORS.common : COLORS.primary }}
                  testID="CustomButtonViewContainer">
                <Text style={ styles.label }>
                    { props.label }
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    customButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
    },
    label: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        textTransform: 'uppercase'
    }
});

export default CustomButton
