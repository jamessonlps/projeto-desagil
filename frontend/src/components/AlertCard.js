import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatData } from '../utils/FormatDate';
import { useNavigation } from '@react-navigation/native';

import Warning from '../icons/warning';
import Next from '../icons/next';

export default function AlertCard(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate(props.destino, props.dados)}>
            <View style={styles.cardContainer}>
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
    cardTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '86%',
        paddingLeft: 5
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
        fontWeight: 'normal',
        color: "#000000"
    },
    cardDate: {
        fontStyle: 'italic',
        fontSize: 13
    }
});
