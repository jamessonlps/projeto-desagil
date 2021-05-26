import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Asset } from 'expo-asset';
import PDFReader from 'rn-pdf-reader-js';

import client from '../../client';

function stringify(body) {
    return JSON.stringify(body, null, 2);
}

export default function Main(props) {
    const DEFAULT_BODY = {
        "codigo": 0,
        "titulo": "0",
        "planta": "0"
    };

    const [url, setURL] = useState('http://10.0.2.2:8080/pavimento?codigo=1313');
    const [body, setBody] = useState(stringify(DEFAULT_BODY));
    const [response, setResponse] = useState('');

    const [loading, setLoading] = useState(true);

    const [viewDocument, setViewDocument] = useState(false);
    const [pdf, setPdf] = useState('');


    return(
        <>
            {viewDocument ? <PDFReader style={{paddingTop: 30}} source={{uri: pdf}}/>
            :
            <SafeAreaView style={styles.documentPost}>
                <Text>Planta baixa D. R. Bias</Text>
                <View style={styles.buttonsContainer}>
                    <Button 
                        title="Visualizar" 
                        onPress={() => {
                            client.get(
                                "http://192.168.1.111:8080/pavimento?codigo=1313",
                                (body) => {
                                    setPdf(body.planta);
                                    setResponse(stringify(body));
                                    setViewDocument(true);
                                },
                                (message) => setResponse(message),
                                () => setLoading(false),
                                () => setLoading(false)
                            );
                        }}
                    />
                    <Button title=" Detalhes " />
                </View>

                <Text>{response}</Text>
                <Text>{pdf}</Text>

            </SafeAreaView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    documentPost: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});
