import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BuildingIcon from '../icons/building2';
import { useFonts } from 'expo-font';

export default function SubHeader(props) {
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
    });

    return (
        <LinearGradient 
            colors={[ "#2D2A9B", "#2385A2"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View style={styles.headerContainer}>
                <View style={{width: '15%'}}>
                    <BuildingIcon />
                </View>
                <View style={{width: '85%'}}>
                    <Text numberOfLines={1} style={styles.headerTitle}>{props.titulo}</Text>
                    <Text numberOfLines={1} style={styles.headerSubTitle}>{props.obra}</Text>
                </View>
            </View>
            <View style={styles.subTitleHeader}>
                <Text numberOfLines={1} style={styles.headerResponsavel}>Endereço: {props.endereco}</Text>
                <Text numberOfLines={1} style={styles.headerResponsavel}>Responsável: {props.responsavel}</Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Bold'
    },
    subTitleHeader: {
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#fff',
        fontSize: 21,
        fontFamily: 'Bold'
    },
    headerSubTitle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Bold'
    },
    headerResponsavel: {
        fontSize: 14, 
        color: '#F1F2F2',
        fontFamily: 'Regular'
    }
})
