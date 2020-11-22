import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import TypingNotification from './TypingNotification';
import { Text } from 'react-native';

describe('<TypingNotification/>', () => {
    it('has <Text/> with correct notification message', () => {
        const notificationMessage: string = 'NotificationMessage';
        const renderAPI: RenderAPI = render(<TypingNotification notification={ notificationMessage }/>);

        expect(renderAPI.getByText(notificationMessage).type).toBe(Text);
    });
});
