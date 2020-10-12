import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Root from './Root';
import store from './store';

test('renders learn react link', () => {
    const { getByAltText } = render(
        <Provider store={store}>
            <Root />
        </Provider>,
    );
    const submitButton = getByAltText(/logo/i);
    expect(submitButton).toBeInTheDocument();
});
