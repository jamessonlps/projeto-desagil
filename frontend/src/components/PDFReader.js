import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';

export default function PDFReader(props) {
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <ActivityIndicator color="#0000ff"/>;
    } else {
        return <PDFReader source={{uri: props.url}}/>;
    }
};