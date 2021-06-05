import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DocumentCard(props) {
    return (
        <View 
            style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{props.titulo}</Text>
            <Text style={styles.cardDescription}>{props.tipo}</Text>
            <Text style={styles.cardDescription}>{props.dataCriacao}</Text>
            <Text style={styles.cardDescription}>{props.ultimaModificacao}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        margin: 10,
        borderWidth: 3,
        borderRadius: 15,
        borderColor: '#0000ff'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: 18,
        fontWeight: 'normal'
    }
});
