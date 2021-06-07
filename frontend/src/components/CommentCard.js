import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatData } from '../utils/FormatDate';

export default function CommentCard(props) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardDescription}>{props.texto}</Text>
            <Text style={styles.cardDate}>Data de publicação: {formatData(props.dataCriacao)}</Text>
            <Text style={styles.cardDate}>Última modificação: {formatData(props.ultimaModificacao)}</Text>
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
    },
    cardDate: {
        fontStyle: 'italic',
        fontSize: 17
    }
});
