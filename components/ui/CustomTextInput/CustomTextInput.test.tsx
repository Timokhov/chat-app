import React from 'react';
import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import CustomTextInput from './CustomTextInput';
import { TextStyle } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';
import { styles } from './CustomTextImput.styles';

describe('<CustomTextInput/>', () => {

   it('has correct style', () => {
       const style: TextStyle = {
           height: 160,
       }
       const renderAPI: RenderAPI = render(<CustomTextInput style={ style }/>);
       const innerTextInput: ReactTestInstance = renderAPI.getByTestId('InnerTextInput');
       expect(innerTextInput.props.style).toContain(style);

       fireEvent(innerTextInput, 'focus');
       expect(innerTextInput.props.style.length).toBe(3);
       expect(innerTextInput.props.style).toContain(styles.focused);

       fireEvent(innerTextInput, 'blur');
       expect(innerTextInput.props.style.length).toBe(2);
   });
});
