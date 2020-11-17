import React from 'react';
import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import CustomTextInput from './CustomTextInput';
import { TextInputProps, TextStyle } from 'react-native';
import { Nullable } from '../../../models/nullable';
import { ReactTestInstance } from 'react-test-renderer';
import { COLORS } from '../../../constants/colors';

describe('<CustomTextInput/>', () => {

   it('has correct style', () => {
       const style: TextStyle = {
           height: 160,
       }
       const CustomTextInputRenderApi: RenderAPI = render(<CustomTextInput style={ style }/>);
       const innerTextInput: ReactTestInstance = CustomTextInputRenderApi.getByTestId("InnerTextInput");
       expect(innerTextInput.props.style).toContain(style);

       fireEvent(innerTextInput, 'focus');
       expect(innerTextInput.props.style.length).toBe(3);
       expect(innerTextInput.props.style[2].borderColor).toBe(COLORS.primary);

       fireEvent(innerTextInput, 'blur');
       expect(innerTextInput.props.style.length).toBe(2);
   });
});
