import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { ChatMessage, ChatMessageType } from '../../../models/message';
import SystemChatMessageComponent from './SystemChatMessageComponent';
import { Text } from 'react-native';

describe('<SystemChatMessageComponent/>', () => {
    it('has <Text/> with correct message', () => {
        const message: ChatMessage = {
            id: '1',
            date: '18.11.2020',
            type: ChatMessageType.SYSTEM,
            user: {
                id: '2',
                name: 'Test'
            },
            text: 'Message text'
        };

        const renderAPI: RenderAPI = render(<SystemChatMessageComponent message={ message }/>);

        expect(renderAPI.getByText(message.text).type).toBe(Text);
    });
});
