import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobal } from '../../store';
import client from '../../client';
import LogCard from '../components/LogCard';
import SubHeader from '../components/SubHeader';

import QRCodeIcon from '../icons/qr-code';

export default function InitialPage() {
    const [keyObra, setKeyObra] = useState(null);
    const [dataObra, setDataObra] = useState(null);
    const [loadingObra, setLoadingObra] = useState(true);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const navigation = useNavigation();
    const localhost = useGlobal('localhost');
    const address = localhost.address;

    useEffect(() => {
        getLastObra();
    }, [])

    useEffect(() => {
        client.get(`${address}/obra?key=${keyObra}`, (body) => {
            setDataObra(body);
            setLoadingObra(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }, [keyObra])

    async function getLastObra() {
        return await AsyncStorage
            .getItem('keyObra')
            .then((value) => {
                setKeyObra(value);
            })
            .catch((e) => {null})
    }

    if (!dataObra) {
        return (
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size='large' color="#2385A2" />
            </View>
        )
    }
    else {
        return (
            <>
                <ScrollView style={styles.container}>
                    <SubHeader 
                        responsavel={dataObra.responsavel} 
                        titulo={dataObra.titulo} 
                        endereco={dataObra.endereco} 
                    />
    
                    <Text style={styles.logTitle}>Registros da última obra</Text>
                    <View style={styles.lineStyle} />
                    {
                        loadingObra ? (<ActivityIndicator size='large' color="#2385A2" />)
                        : !loadingObra && dataObra !== null && dataObra !== undefined && keyObra !== null ?
                        dataObra.logs.reverse().map((item, index) => (
                            <View style={{marginHorizontal: 5, paddingHorizontal: 15}} key={index}> 
                                <LogCard content={item}/> 
                            </View>)
                        )
                        : (<Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>)
                    }
                </ScrollView>
                <View style={styles.containerText}>
                    <TouchableOpacity
                        style={styles.qrbutton} 
                        onPress={() => navigation.navigate('QR Code Scanner')}
                    >
                        <QRCodeIcon width={96} height={96} />
                    </TouchableOpacity>
                </View>
    
            </>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    containerText: {
        flex: 1,
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center'
    },
    qrbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    logTitle: {
        color: '#2D2A9B',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingHorizontal: 15
    },
    lineStyle: {
        borderWidth: 0.3,
        borderColor:'#2D2A9B',
        marginBottom: 10,
        marginTop: 5,
        marginHorizontal: 15
    }
})