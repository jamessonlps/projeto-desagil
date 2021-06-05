import React from 'react';
import { View, Button, StatusBar, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Page1() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <TouchableOpacity
                    style={styles.qrbutton} 
                    onPress={() => navigation.navigate('QR Code Scanner')}
                >
                    <Text style={styles.buttonText}>Ler QR Code</Text>
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
    },
    containerText: {
        fontSize: 20,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    qrbutton: {
        color: 'white',
        backgroundColor: '#00ffff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        alignSelf: 'center',
        borderRadius: 15
    },
    buttonText: {
        fontSize: 24
    }
})