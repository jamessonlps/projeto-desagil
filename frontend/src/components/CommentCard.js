import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatData } from '../utils/FormatDate';
import { useNavigation } from '@react-navigation/native';
import Next from '../icons/next';

export default function CommentCard(props) {
    const navigation = useNavigation();

    return (
        <>
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => navigation.navigate(props.destino, props.dados)}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={{...styles.cardDescription, color: props.color || '#000'}}>{props.assunto}</Text>
                        <Text style={styles.cardDate}>{formatData(props.dataCriacao)}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Next width={12} height={12} color='gray' />
                    </View>
            </TouchableOpacity>
            <View style={{borderWidth: 0.15, borderColor: "#000000", marginHorizontal: 10}} />
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    cardDescription: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000'
    },
    cardDate: {
        fontStyle: 'italic',
        fontSize: 14,
        color: 'gray'
    },
    textContainer: {
        width: '96%'
    },
    iconContainer: {
        alignSelf: 'center',
        width: '4%'
    }
});
