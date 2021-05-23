import React from 'react';
import { Provider } from 'react-redux';

/** PÁGINAS */
import Main from './components/Main';
import DocumentsList from './components/DocumentsList';

import { store } from './store';

export default function App() {
    if (store) {
        return (
            <Provider store={store}>
                <DocumentsList/>
            </Provider>
        );
    } else {
        return (
            <DocumentsList/>
        );
    }
};
