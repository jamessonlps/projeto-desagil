import React from 'react';
import { View, Button, StatusBar, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import client from '../../client';
import LogCard from '../components/LogCard';

export default function InitialPage() {
    const navigation = useNavigation();

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
                    <Image resizeMode='center' source={require('../icons/qr-code-whitebg(2).png')} width={64} height={64} />
                </TouchableOpacity>
            </View>
        </View>
    );
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
        alignContent: 'center',
        justifyContent: 'center'
    },
    qrbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        // borderColor: 'red',
        width: 128,
        height: 128,
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
        fontWeight: 'bold'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor:'gray',
        marginBottom: 10,
        marginTop: 5
    }
})