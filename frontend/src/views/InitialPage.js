import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobal } from '../../store';
import client from '../../client';
import LogCard from '../components/LogCard';
import SubHeader from '../components/SubHeader';
import { useFonts } from 'expo-font';
import StatusBarStyle from '../components/StatusBarStyle';

import QRCodeIcon from '../icons/qr-code';

export default function InitialPage() {
    const [keyObra, setKeyObra] = useState(null);
    const [dataObra, setDataObra] = useState(null);
    const [loadingAlert, setLoadingAlert] = useState(true);
    const [loadingOthers, setLoadingOthers] = useState(true);
    const [alert, setAlert] = useState([]);
    const [others, setOthers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const localhost = useGlobal('localhost');
    const address = localhost.address;
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
        'Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });

    useEffect(() => {
        getLastObra();
    }, []);

    useEffect(() => {
        client.get(`${address}/obra?key=${keyObra}`, 
        (body) => {
            setDataObra(body);
            var alertas = [];
            var outros = [];
            for (item of body.logs) {
                if (formatString(item)[2] == 'alerta') {
                    alertas.push(item);
                } else {
                    outros.push(item);
                }
            }
            setAlert(alertas);
            setOthers(outros);
            setLoadingAlert(false);
            setLoadingOthers(false);
        },
        (message) => {
            setLoadingAlert(false);
            setLoadingOthers(false);
        }, 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }, [keyObra]);

    async function getLastObra() {
        return await AsyncStorage
            .getItem('keyObra')
            .then((value) => {
                setKeyObra(value);
            })
            .catch((e) => {null})
    }

    function formatString(text) {
        let date = text.split(" || ")[0];
        let content = text.split(" || ")[1];
        let type;
        try {
            type = content.split(" ")[1];
        }
        catch {
            type = "observação"
        }
        return [date, content, type]
    }

    if (loadingAlert || loadingOthers || !fontsLoaded) {
        return (
            <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size='large' color="#2385A2" />
            </View>
        )
    }
    else if (!loadingAlert && !loadingOthers && dataObra) {
        return (
            <>
                <ScrollView style={styles.container}>
                    <StatusBarStyle />
                    <SubHeader 
                        responsavel={dataObra.responsavel} 
                        titulo={dataObra.titulo} 
                        endereco={dataObra.endereco}
                    />

                    <Text style={styles.logTitle}>Últimos alertas adicionados</Text>
                    <View style={styles.lineStyle} />
                    {
                        loadingAlert ? (<ActivityIndicator size='large' color="#2385A2" />)
                        : !loadingAlert && alert.length > 0 ? 
                        alert.reverse().map((item, index) => (
                            <View style={{marginHorizontal: 5, paddingHorizontal: 15}} key={index}> 
                                <LogCard 
                                    type={formatString(item)[2]} 
                                    content={formatString(item)[1]} 
                                    date={formatString(item)[0]} 
                                /> 
                            </View>)
                        )
                        : (<Text style={{alignSelf: 'center', color: 'gray', fontFamily: 'SemiBold'}}>Não há conteúdo a ser exibido</Text>)
                    } 
    
                    <Text style={styles.logTitle}>Outros registros</Text>
                    <View style={styles.lineStyle} />
                    {
                        loadingOthers ? (<ActivityIndicator size='large' color="#2385A2" />)
                        : !loadingOthers && others.length > 0 ?
                        others.reverse().map((item, index) => (
                            <View style={{marginHorizontal: 5, paddingHorizontal: 15}} key={index}> 
                                <LogCard 
                                    type={formatString(item)[2]} 
                                    content={formatString(item)[1]} 
                                    date={formatString(item)[0]} 
                                /> 
                            </View>)
                        )
                        : (<Text style={{alignSelf: 'center', color: 'gray', fontFamily: 'SemiBold'}}>Não há conteúdo a ser exibido</Text>)
                    }
                    <View style={{height: 200}} />
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
    else {
        return (
            <>
                <ScrollView style={styles.container}>
                    <Text style={{alignSelf: 'center', color: 'gray', justifyContent: 'center', fontFamily: 'SemiBold'}}>Não há conteúdo a ser exibido</Text>
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
        fontFamily: 'Bold',
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