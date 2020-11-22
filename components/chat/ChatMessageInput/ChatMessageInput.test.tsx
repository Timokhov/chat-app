import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import ChatMessageInput from './ChatMessageInput';
import { ReactTestInstance } from 'react-test-renderer';
import * as redux from 'react-redux'
import * as WebSocketService from '../../../services/web-socket.service';
import { User } from '../../../models/user';
import { ChatMessageType } from '../../../models/message';

describe('<ChatMessageInput/>', () => {
    const user: User = {
        id: '1',
        name: 'Test'
    };

    let publishMock: jest.SpyInstance;
    let afterPublishChatMessageMock: jest.Mock;
    beforeEach(() => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(user);
        publishMock = jest.spyOn(WebSocketService, 'publish');
        afterPublishChatMessageMock = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('has not published empty message', () => {
        const renderAPI: RenderAPI = render(<ChatMessageInput afterPublishChatMessage={ afterPublishChatMessageMock }/>);
        const sendMessageTouchable: ReactTestInstance = renderAPI.getByTestId('SendMessageTouchable');

        fireEvent(sendMessageTouchable, 'press');
        expect(afterPublishChatMessageMock).not.toHaveBeenCalled();
        expect(publishMock).not.toHaveBeenCalled();
    })

    it('has published not empty message and called afterPublishChatMessage callback', () => {
        const renderAPI: RenderAPI = render(<ChatMessageInput afterPublishChatMessage={ afterPublishChatMessageMock }/>);
        const messageTextInput: ReactTestInstance = renderAPI.getByPlaceholderText('Type message');
        const sendMessageTouchable: ReactTestInstance = renderAPI.getByTestId('SendMessageTouchable');


        const messageText: string = 'MessageText';
        fireEvent(messageTextInput, 'changeText', messageText);
        fireEvent(sendMessageTouchable, 'press');
        expect(afterPublishChatMessageMock).toHaveBeenCalled();
        expect(publishMock).toHaveBeenCalled();

        const lastPublishCall = publishMock.mock.calls[publishMock.mock.calls.length - 1];
        expect(lastPublishCall[0]).toBe('/topic/chat/publish/message');
        expect(lastPublishCall[1]).toMatchObject({
            type: ChatMessageType.CHAT,
            user: user,
            text: messageText
        });
    });

    it('has published typing events correctly', () => {
        const renderAPI: RenderAPI = render(<ChatMessageInput/>);
        const messageTextInput: ReactTestInstance = renderAPI.getByPlaceholderText('Type message');

        fireEvent(messageTextInput, 'focus');
        expect(publishMock).toHaveBeenLastCalledWith('/topic/chat/publish/start-typing', user);

        fireEvent(messageTextInput, 'blur');
        expect(publishMock).toHaveBeenLastCalledWith('/topic/chat/publish/stop-typing', null);
    });
});
