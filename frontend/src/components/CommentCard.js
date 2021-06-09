import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatData } from '../utils/FormatDate';

export default function CommentCard(props) {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardDescription}>{props.texto}</Text>
            <Text style={styles.cardDate}>{formatData(props.dataCriacao)}</Text>
            <View style={{borderWidth: 0.15, borderColor: "#000000", marginTop: 20}} />
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 15,
        paddingLeft: 15
    },
    cardDescription: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#000'
    },
    cardDate: {
        fontStyle: 'italic',
        fontSize: 14,
        color: 'gray'
    }
});
