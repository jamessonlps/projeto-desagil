import React, { useState } from 'react';
import { StyleSheet, Button, Text, StatusBar, View } from 'react-native';

import client from '../../client';
import PDFReader from 'rn-pdf-reader-js';

export default function DocumentSummary(props) {
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState('');
    const [viewDocument, setViewDocument] = useState(false);
    
    return (
        <>
        {
            viewDocument ? <PDFReader source={{uri: props.url}} />
            :
            <View style={styles.container}>
                <Text>{props.title}</Text>
                <Text>{props.responsible}</Text>
                <Button
                    title="Visualizar"
                    onPress={() => {
                        setViewDocument(true);
                    }}
                />
            </View>
        }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 30,
        display: 'flex',
        flexDirection: 'column',
    },
})