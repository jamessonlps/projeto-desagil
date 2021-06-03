import React from 'react';
import { Provider } from 'react-redux';

import Main from './src/Main';
import QRCodeScanner from './src/components/QRCodeScanner';
import DocumentsList from './src/components/DocumentsList';

import { store } from './store';

export default function App() {
    if (store) {
        return (
            <Provider store={store}>
                <QRCodeScanner/>
            </Provider>
        );
    } else {
        return (
            <QRCodeScanner/>
        );
    }
};
