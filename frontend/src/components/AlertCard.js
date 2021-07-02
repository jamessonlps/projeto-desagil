import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatData } from '../utils/FormatDate';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import Warning from '../icons/warning';
import Next from '../icons/next';

export default function AlertCard(props) {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'ExtraBold': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
        'Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate(props.destino, props.dados)}
            style={styles.cardContainer}>
            <View style={styles.pseudoCardContainer}>
                <View style={styles.cardAlertIconContainer}>
                    <Warning />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text numberOfLines={1} style={styles.cardDescription}>{props.assunto}</Text>
                    <Text style={styles.cardDate}>{formatData(props.dataCriacao)}</Text>
                </View>
                <View style={styles.cardArrowContainer}>
                    <Next width={12} height={12} color='#2385A2' />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        margin: 5,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 5
    },
    pseudoCardContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '86%',
        paddingHorizontal: 10
    },
    cardAlertIconContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '10%'
    },
    cardArrowContainer: {
        width: '4%',
        alignSelf: 'center'
    },
    cardDescription: {
        fontSize: 16,
        fontFamily: 'Regular',
        color: "#000000"
    },
    cardDate: {
        fontFamily: 'Italic',
        fontSize: 13
    }
});
