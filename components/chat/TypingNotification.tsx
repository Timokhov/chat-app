import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// @ts-ignore
import { TypingAnimation } from 'react-native-typing-animation';
import { COLORS } from '../../constants/colors';

interface TypingNotificationProps {
    notification: string
}

const TypingNotification = (props: TypingNotificationProps) => {
    return (
        <View style={ styles.typingNotification }>
            <Text style={ styles.text }>
                { props.notification }
            </Text>
            <TypingAnimation style={ styles.animation }
                             dotColor={ COLORS.common }
                             dotMargin={ 5 }
                             dotAmplitude={ 1.5 }
                             dotSpeed={ 0.15 }
                             dotRadius={ 2 }
                             dotX={ 12 }
                             dotY={ 6 }/>
        </View>
    );
};

const styles = StyleSheet.create({
    typingNotification: {
        flexDirection: 'row',
        padding: 10
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.common,
        alignSelf: 'flex-end'
    },
    animation: {
        top: 7
    }
});

export default TypingNotification;
