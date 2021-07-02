import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogIcon from '../icons/log';
import AlertIcon from '../icons/warning';
import { useFonts } from 'expo-font';

export default function LogCard(props) {
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
        'Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });

    return (
        <View style={styles.outerContainer}>
            <View style={styles.cardIconContainer}>
                {
                    props.type == "alerta" ? (<AlertIcon width={30} height={30} />)
                    : (<LogIcon />)
                }
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.description}>{props.content}</Text>
                <Text style={styles.date}>{props.date}</Text>
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
        fontSize: 16,
        fontFamily: 'Regular'
    },
    cardTextContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        paddingLeft: 5
    },
    cardIconContainer: {
        width: '10%',
        alignSelf: 'center'
    },
    date: {
        fontSize: 13,
        color: 'gray',
        fontFamily: 'Italic'
    }
});
