import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import Next from '../icons/next';

export default function DocumentCard(props) {
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
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{props.titulo}</Text>
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
                    <Next width={12} height={12} color='#fff' />
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
        backgroundColor: '#2385A2',
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
        width: '95%'
    },
    cardIconContainer: {
        width: '5%',
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: 'Bold',
        color: "#fff"
    },
    cardDescription: {
        fontSize: 14,
        fontFamily: 'Regular',
        color: 'white'
    },
    cardDate: {
        fontSize: 13,
        fontFamily: 'Italic',
        color: 'white',
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