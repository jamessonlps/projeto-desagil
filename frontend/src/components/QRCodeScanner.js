import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';

export default function QRCodeScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const [readingType, setReadingType] = useState('');
    const [target, setTarget] = useState('');

    const navigation = useNavigation();

    let path;

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Abre popup após ler QR Code e pegar target do código
    useEffect(() => {
        if (readingType == 'documento') {
            path = "PDFView"; 
        }
        else {
            path = "GeneralView";
        }
        client.get(`http://192.168.1.106:8080/${readingType}?codigo=${target}`, (body) => {
            Alert.alert(
                `${body.titulo}`,
                `${body.responsavel}`,
                [
                    {text: "Cancelar", style: "cancel"}, 
                    {text: "Ver mais", onPress: () => {
                        navigation.navigate(path, {...body, tipoObra: readingType});
                    }}
                ]
            )
        }, 
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }, [target])


    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        client.get(
            `http://192.168.1.106:8080/tag?id=${data}`,
            (body) => {
                setReadingType(body.tipo);
                setTarget(body.alvo);
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
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && <Button title={'Escanear novamente'} onPress={() => {
                    setScanned(false)
                    setTarget(null);
                }} />}
            </View>
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
