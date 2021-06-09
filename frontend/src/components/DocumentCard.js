import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Next from '../icons/next';

export default function DocumentCard(props) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{props.titulo}</Text>
                <Text numberOfLines={2} style={styles.cardDescription}>{props.descricao}</Text>
                <Text style={styles.cardDate}>08/06/2021 - 12:34 {props.dataCriacao}</Text>
            </View>

            <View style={styles.cardIconContainer}>
                <Next />
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
        width: '93%'
    },
    cardIconContainer: {
        width: '7%',
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#2D2A9B"
    },
    cardDescription: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'gray'
    },
    cardDate: {
        fontSize: 13,
        fontStyle: 'italic',
        color: 'gray',
        marginTop: 5
    }
});
