import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native'
import CustomButton from './CustomButton';
import { ReactTestInstance } from 'react-test-renderer';
import { Text } from 'react-native';
import { COLORS } from '../../../constants/colors';

describe('<CustommButton/>', () => {
    it('has <Text/> with label', () => {
        const label: string = 'Custom_Button_Label'
        const CustomButtonRenderApi: RenderAPI = render(<CustomButton label={ label }/>);
        const labelText: ReactTestInstance = CustomButtonRenderApi.getByText(label);
        expect(labelText?.type).toBe(Text);
    });

    it('has <View/> container with correct background color', () => {
        const CustomButtonRenderApi: RenderAPI = render(<CustomButton label="" disabled={ false }/>);
        const customButtonViewContainer: ReactTestInstance = CustomButtonRenderApi.getByTestId('CustomButtonViewContainer');
        expect(customButtonViewContainer.props.style.backgroundColor).toBe(COLORS.primary);

        CustomButtonRenderApi.rerender(<CustomButton label="" disabled={ true }/>);
        expect(customButtonViewContainer.props.style.backgroundColor).toBe(COLORS.common);
    });
})
