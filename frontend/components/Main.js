import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
import PDFReader from 'rn-pdf-reader-js';

export default function Main(props) {
    const file = require('../files/cad.pdf');

    const [uri, setURI] = useState(null);
    const [loading, setLoading] = useState(true);

    Asset.loadAsync(file)
        .then(() => {
            if (loading) {
                const asset = Asset.fromModule(file);
                setURI(asset.localUri);
                setLoading(false);
            }
        });

    if (loading) {
        return <ActivityIndicator color="#0000ff"/>;
    } else {
        return <PDFReader source={{uri: uri}}/>;
    }
};
