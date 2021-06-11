import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatData } from '../utils/FormatDate';

import Warning from '../icons/warning';

export default function AlertCard(props) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardAlertIconContainer}>
                <Warning />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardDescription}>{props.texto}</Text>
                <Text style={styles.cardDate}>{formatData(props.dataCriacao)}</Text>
            </View>
        </View>
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
        width: '90%',
        paddingLeft: 5
    },
    cardAlertIconContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '10%'
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
