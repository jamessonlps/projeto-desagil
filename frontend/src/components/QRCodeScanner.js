import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PDFReader from 'rn-pdf-reader-js';

import client from '../../client';

export default function QRCodeScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState(null);
    const [pdfLink, setPdfLink] = useState('');
    const [viewDocument, setViewDocument] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        client.get(
            `http://192.168.1.111:8080/pavimento?codigo=${data}`,
            (body) => {
                Alert.alert(
                    `${body.titulo}`,
                    `${body.responsavel}`,
                    [
                        {
                          text: "Cancelar",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "Abrir documento", onPress: () => {
                            setPdfLink(body.planta);
                            setViewDocument(true);
                        } }
                    ]
                )
            },
            (message) => setResponse(message),
            () => setLoading(false),
            () => setLoading(false)
        );
    };

    if (hasPermission === null) {
        return <Text>Solicitando permissão para câmera</Text>;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à câmera</Text>;
    }

    return (
        <>
        {
            viewDocument ? <PDFReader source={{uri: pdfLink}} />
            :
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title={'Escanear novamente'} onPress={() => setScanned(false)} />}
            </View>
        }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
