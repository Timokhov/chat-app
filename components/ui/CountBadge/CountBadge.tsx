import React from 'react';
import { Text, View, ViewStyle, StyleSheet } from 'react-native';
import { styles } from './CountBadge.styles';

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

export default CountBadge;
