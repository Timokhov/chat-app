import React from 'react';
import { Text, View, ViewStyle, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export interface CountBadgeProps {
    count: number,
    style?: ViewStyle
}

const CountBadge = (props: CountBadgeProps) => {
    return (
        <View style={[ styles.countBadge, props.style ]}>
            <Text style={ styles.countBadgeText }>
                { props.count }
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    countBadge: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.danger,
    },
    countBadgeText: {
        fontSize: 10,
        color: 'white'
    }
})

export default CountBadge;
