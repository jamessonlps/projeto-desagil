import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Next from '../icons/next';

export default function DocumentCard(props) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(props.destino, props.dados)}>
            <View style={styles.cardContainer}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{props.titulo || "Título temporário"}</Text>
                    {
                        props.detalhes ? <Text numberOfLines={2} style={styles.cardDescription}>{props.detalhes}</Text>
                        : null
                    }
                    {
                        props.responsavel ? <Text style={styles.cardDescription}>Responsável: {props.responsavel}</Text>
                        : null
                    }
                    {
                        props.dataCriacao ? <Text style={styles.cardDate}>{props.dataCriacao}</Text>
                        : null
                    }
                </View>

                <View style={styles.cardIconContainer}>
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
        paddingRight: 10,
        paddingLeft: 10,
        paddingVertical: 15,
        marginHorizontal: 5,
        marginVertical: 5,
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
        width: '95%'
    },
    cardIconContainer: {
        width: '5%',
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#2D2A9B"
    },
    cardDescription: {
        fontSize: 14,
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


// ============ PADRÃO DE USO =============
// <NavigateButton 
//     destino={}
//     dados={}
//     titulo={}
//     detalhes={}
//     responsavel={}
//     dataCriacao={} 
// />