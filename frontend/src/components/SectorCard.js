import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Next from '../icons/next';
import { LinearGradient } from 'expo-linear-gradient';

export default function SectorCard(props) {
    return (
        <LinearGradient 
            colors={[ "#2D2A9B", "#2385A2"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cardContainer}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>{props.titulo}</Text>
                    {/* <Text style={styles.cardDescription}>Responsável: {props.responsavel}</Text> */}
                </View>

                <View style={styles.cardIconContainer}>
                    <Next width={12} height={12} color='#FFFFFF' />
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        // backgroundColor: '#2D2A9B',
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
        width: '96%'
    },
    cardIconContainer: {
        width: '4%',
        alignSelf: 'center'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
    cardDescription: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#F1F2F2'
    }
});
