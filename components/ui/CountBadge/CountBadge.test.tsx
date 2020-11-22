import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native'
import CountBadge from './CountBadge';
import { Text, ViewStyle } from 'react-native';

describe('<CountBadge/>', () => {

    it('has <Text/> with correct count value', () => {
        const renderAPI: RenderAPI = render(<CountBadge count={ 1 }/>);
        expect(renderAPI.getByText('1').type).toBe(Text);
    });

    it('has style from props', () => {
        const style: ViewStyle = {
            width: 30,
            height: 30
        }
        const renderAPI: RenderAPI = render(<CountBadge count={ 1 } style={ style }/>);
        expect(renderAPI.toJSON()?.props?.style).toContain(style);
    });
});
