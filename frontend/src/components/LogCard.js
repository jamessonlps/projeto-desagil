import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogIcon from '../icons/log';

export default function LogCard(props) {
    return (
        <View style={styles.outerContainer}>
            <View style={styles.cardIconContainer}>
                <LogIcon />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.description}>{props.content || "07/06/2021 - 23:24 - Uma observação foi adicionada ao Pavimento 04"}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        paddingLeft: 5,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5
    },
    description: {
        color: '#484444',
        fontSize: 16
    },
    cardTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%'
    },
    cardIconContainer: {
        width: '10%',
        alignSelf: 'center'
    }
});
