import React from 'react';
import { Provider } from 'react-redux';

import Main from './src/Main';

import { store } from './store';

export default function App() {
    if (store) {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    } else {
        return (
            <Main/>
        );
    }
};
