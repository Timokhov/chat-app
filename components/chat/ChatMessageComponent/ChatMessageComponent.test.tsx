import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Text } from 'react-native';
import ChatMessageComponent from './ChatMessageComponent';
import { ChatMessage, ChatMessageType } from '../../../models/message';
import { styles } from './ChatMessageComponent.styles';
import { User } from '../../../models/user';

describe('<ChatMessageComponent/>', () => {
    const user: User = {
        id: '1',
        name: 'Test'
    };
    const message: ChatMessage = {
        id: '1',
        date: '18.11.2020',
        type: ChatMessageType.CHAT,
        user: user,
        text: 'Message text'
    };

    it('has 3 <Text/> components: sender name, message text and message date (currentUserMessage = false, showSender = true)', () => {
        const renderAPI: RenderAPI = render(<ChatMessageComponent message={ message }
                                                                  currentUserMessage={ false }
                                                                  showSender={ true }/>);

        expect(renderAPI.getByTestId('ContainerView').children.length).toBe(3);
        expect(renderAPI.getByText(user.name).type).toBe(Text);
        expect(renderAPI.getByText(message.text).type).toBe(Text);
        expect(renderAPI.getByText(message.date).type).toBe(Text);
    });

    it('has 2 <Text/> components: message text and message date (currentUserMessage = false, showSender = false)', () => {
        const renderAPI: RenderAPI = render(<ChatMessageComponent message={ message }
                                                                  currentUserMessage={ false }
                                                                  showSender={ false }/>);

        expect(renderAPI.getByTestId('ContainerView').children.length).toBe(2);
        expect(renderAPI.getByText(message.text).type).toBe(Text);
        expect(renderAPI.getByText(message.date).type).toBe(Text);
    });

    it('has 2 <Text/> components: message text and message date (currentUserMessage = false, showSender = false)', () => {
        const renderAPI: RenderAPI = render(<ChatMessageComponent message={ message }
                                                                  currentUserMessage={ true }
                                                                  showSender={ true }/>);

        expect(renderAPI.getByTestId('ContainerView').children.length).toBe(2);
        expect(renderAPI.getByText(message.text).type).toBe(Text);
        expect(renderAPI.getByText(message.date).type).toBe(Text);
    });

    it('has 2 <Text/> components: message text and message date (currentUserMessage = true, showSender = false)', () => {
        const renderAPI: RenderAPI = render(<ChatMessageComponent message={ message }
                                                                  currentUserMessage={ true }
                                                                  showSender={ false }/>);

        expect(renderAPI.getByTestId('ContainerView').children.length).toBe(2);
        expect(renderAPI.getByText(message.text).type).toBe(Text);
        expect(renderAPI.getByText(message.date).type).toBe(Text);
    });

    it('has styles for another user', () => {
        const renderAPI: RenderAPI = render(<ChatMessageComponent message={ message }
                                                                  currentUserMessage={ false }
                                                                  showSender={ true }/>);

        expect(renderAPI.getByTestId('ContainerView').props.style).toContain(styles.anotherUserMessage);
        expect(renderAPI.getByText(message.text).props.style).toContain(styles.anotherUserText);
        expect(renderAPI.getByText(message.date).props.style).toContain(styles.anotherUserDate);
    });

    it('has styles for current user', () => {
        const renderAPI: RenderAPI = render(<ChatMessageComponent message={ message }
                                                                  currentUserMessage={ true }
                                                                  showSender={ true }/>);

        expect(renderAPI.getByTestId('ContainerView').props.style).toContain(styles.currentUserMessage);
        expect(renderAPI.getByText(message.text).props.style).toContain(styles.currentUserText);
        expect(renderAPI.getByText(message.date).props.style).toContain(styles.currentUserDate);
    });
});
