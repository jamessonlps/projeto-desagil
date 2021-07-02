import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import { useGlobal } from '../../store';

export default function QRCodeScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [readingType, setReadingType] = useState('');
    const [target, setTarget] = useState('');
    const localhost = useGlobal('localhost');
    const address = localhost.address;

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
        else if (readingType == 'pavimento') {
            path = "GeneralView";
        } else if (readingType == 'setor') {
            path = "SectorView";
        }
        client.get(`${address}/${readingType}?key=${target}`, (body) => {
            Alert.alert(
                `${body.titulo}`,
                `Responsável: ${body.responsavel || "Não especificado"}`,
                [
                    {text: "Cancelar", style: "cancel", onPress: () => {
                        setScanned(false);
                        setTarget(null);
                    }}, 
                    {text: "Ver mais", onPress: () => {
                        navigation.navigate(path, {...body, tipoObra: readingType, keyRef: target});
                        setScanned(false);
                        setTarget(null);
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
            `${address}/tag?key=${data}`,
            (body) => {
                setReadingType(body.tipo);
                setTarget(body.alvo);
            },
            (message) => setResponse(message),
            () => {
                setLoading(false);
            },
            () => {
                setLoading(false);
            }
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
                {scanned && 
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        setScanned(false);
                        setTarget(null);
                    }}>
                    <Text style={{color: '#fff', fontSize: 22}}>Escanear novamente</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "#2385A2",
        padding: 15,
        borderRadius: 25,
        marginBottom: 30
    },
});
