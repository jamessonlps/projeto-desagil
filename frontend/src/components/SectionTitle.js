import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function SectionTitle(props) {
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'ExtraBold': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
        'Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });
    return (
        <View style={styles.subTitleContainer}>
            <Text style={styles.mainTitle}>{props.titleSection}</Text>
            <View style={styles.lineStyle} />
        </View>
    );
}

const styles = StyleSheet.create({
    subTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
    },
    mainTitle: {
        fontSize: 22,
        fontFamily: 'Bold',
        color: "#2D2A9B"
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#d3d3d3',
        marginBottom: 10,
        marginTop: 5
    }
});