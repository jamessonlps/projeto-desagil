import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import client from '../../client';
import LogCard from '../components/LogCard';

import { useFonts } from '@expo-google-fonts/open-sans';
import QRCodeIcon from '../icons/qr-code';

export default function InitialPage() {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({ 'Open Sans': require('../assets/fonts/OpenSans-Bold.ttf') });

    if (!fontsLoaded) {
        return (<AppLoading />)
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.logTitle}>Registros</Text>
                <View style={styles.lineStyle} />
                <LogCard />
                <LogCard />
                <LogCard />
                <LogCard />
                <LogCard />
                <View style={styles.containerText}>
                    <TouchableOpacity
                        style={styles.qrbutton} 
                        onPress={() => navigation.navigate('QR Code Scanner')}
                    >
                        <QRCodeIcon width={96} height={96} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 15
    },
    containerText: {
        flex: 1,
        // alignContent: 'center',
        // justifyContent: 'center',
        position: 'absolute',
        bottom: '5%',
        alignSelf: 'center'
    },
    qrbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // borderColor: 'red',
        width: 70,
        height: 70,
        // borderWidth: 3,
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
        fontSize: 20,
        // fontWeight: 'bold',
        fontFamily: 'Open Sans'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor:'gray',
        marginBottom: 10,
        marginTop: 5
    }
})