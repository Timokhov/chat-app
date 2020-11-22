import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// @ts-ignore
import { TypingAnimation } from 'react-native-typing-animation';
import { COLORS } from '../../../constants/colors';
import { styles } from './TypingNotification.styles';

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

export default TypingNotification;
