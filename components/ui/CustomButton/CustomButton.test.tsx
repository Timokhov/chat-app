import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native'
import CustomButton from './CustomButton';
import { Text } from 'react-native';
import { COLORS } from '../../../constants/colors';

describe('<CustommButton/>', () => {
    it('has <Text/> with label', () => {
        const label: string = 'Custom_Button_Label'
        const renderAPI: RenderAPI = render(<CustomButton label={ label }/>);
        expect(renderAPI.getByText(label).type).toBe(Text);
    });

    it('has <View/> container with correct background color', () => {
        const renderAPI: RenderAPI = render(<CustomButton label="" disabled={ false }/>);
        expect(renderAPI.getByTestId('CustomButtonContainerView').props.style.backgroundColor)
            .toBe(COLORS.primary);

        renderAPI.rerender(<CustomButton label="" disabled={ true }/>);
        expect(renderAPI.getByTestId('CustomButtonContainerView').props.style.backgroundColor)
            .toBe(COLORS.common);
    });
})
