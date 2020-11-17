import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native'
import CountBadge, { CountBadgeProps } from './CountBadge';
import { ReactTestInstance } from 'react-test-renderer';
import { Text, ViewProps } from 'react-native';
import { Nullable } from '../../../models/nullable';

describe('<CountBadge/>', () => {
    let CountBadgeRenderAPI: RenderAPI;
    let props: CountBadgeProps;
    beforeEach(() => {
        props = {
            count: 1,
            style: {
                width: 30,
                height: 30
            }
        };
        CountBadgeRenderAPI = render(<CountBadge { ...props }/>);
    });

    it('has <Text/> with correct count value', () => {
        const countText: ReactTestInstance = CountBadgeRenderAPI.getByText(props.count.toString());
        expect(countText?.type).toBe(Text);
    });

    it('has style from props', () => {
        const countBadgeViewProps: Nullable<ViewProps> = CountBadgeRenderAPI.toJSON()?.props;
        expect(countBadgeViewProps?.style).toContain(props.style);
    });
});
