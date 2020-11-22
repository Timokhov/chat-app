import React from 'react';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { RootState } from '../../../store/store';
import { CombinedState, combineReducers, Reducer } from 'redux';
import userReducer from '../../../store/user/user.reducer';
import webSocketReducer, { WebSocketStatus } from '../../../store/web-socket/web-socket.reducer';
import chatReducer, { SubscriptionStatus } from '../../../store/chat/chat.reducer';
import { Store, AnyAction } from 'redux';
import ChatMessagesList from './ChatMessagesList';
import { ChatMessageType } from '../../../models/message';
import { ReactTestInstance } from 'react-test-renderer';
import { ChatActionType } from '../../../store/chat/chat.actions';
import { Text } from 'react-native';

const mockStore: MockStoreCreator = configureMockStore([]);
const rootReducer: Reducer<CombinedState<RootState>> = combineReducers(
    {
        userState: userReducer,
        webSocketState: webSocketReducer,
        chatState: chatReducer
    }
);
const mockState = (initialState: RootState) => {
    return (actions: AnyAction[]) => {
        return actions.reduce(rootReducer, initialState);
    };
};

describe('<ChatMessagesList/>', () => {
    let store: Store;
    beforeEach(() => {
        const initialState: RootState = {
            userState: {
                user: {
                    id: '1',
                    name: 'Test'
                }
            },
            webSocketState: {
                status: WebSocketStatus.CONNECTED
            },
            chatState: {
                chatSubscriptionStatus: SubscriptionStatus.SUBSCRIBED,
                chatMessages: [
                    {
                        id: '1',
                        date: '18.11.2020',
                        type: ChatMessageType.CHAT,
                        user: {
                            id: '2',
                            name: 'Test'
                        },
                        text: 'Message text'
                    },
                    {
                        id: '2',
                        date: '18.11.2020',
                        type: ChatMessageType.CHAT,
                        user: {
                            id: '2',
                            name: 'Test'
                        },
                        text: 'Message text'
                    },
                    {
                        id: '3',
                        date: '18.11.2020',
                        type: ChatMessageType.CHAT,
                        user: {
                            id: '2',
                            name: 'Test'
                        },
                        text: 'Message text'
                    }
                ],
                unreadChatMessagesIdList: [],
                isScrollAtBottom: true,
                typingNotification: ''
            }
        };
        store = mockStore(mockState(initialState));
    });

    it('has to show toBottom button correctly on scroll event', () => {
        const renderAPI: RenderAPI = render(
            <Provider store={ store }>
                <ChatMessagesList/>
            </Provider>
        );
        const containerView: ReactTestInstance = renderAPI.getByTestId('ChatMessagesListContainerView');
        const messagesList: ReactTestInstance = renderAPI.getByTestId('MessagesFlatList');

        // only FlatList is shown
        expect(containerView.children.length).toBe(1);

        fireEvent(messagesList, 'scroll', {
            nativeEvent: {
                contentOffset: { y: 100 },
                layoutMeasurement: { width: 300, height: 600 },
                contentSize: { width: 300, height: 1600 }
            }
        });

        // now button is shown
        expect(containerView.children.length).toBe(2);
        // button does not contain unread messages count
        expect(renderAPI.getByTestId('ScrollToBottomButtonView').children.length).toBe(1);

        store.dispatch({
            type: ChatActionType.RECEIVE_CHAT_MESSAGE,
            message: {
                id: '4',
                date: '18.11.2020',
                type: ChatMessageType.CHAT,
                user: {
                    id: '2',
                    name: 'Test'
                },
                text: 'Message text'
            }
        });

        // unread messages count is shown inside button
        expect(renderAPI.getByTestId('ScrollToBottomButtonView').children.length).toBe(2);
        expect(renderAPI.getByText(store.getState().chatState.unreadChatMessagesIdList.length.toString())?.type).toBe(Text);

        fireEvent(messagesList, 'scroll', {
            nativeEvent: {
                contentOffset: { y: 0 },
                layoutMeasurement: { width: 300, height: 600 },
                contentSize: { width: 300, height: 1600 }
            }
        });

        // button is hidden
        expect(containerView.children.length).toBe(1);
    });
});
