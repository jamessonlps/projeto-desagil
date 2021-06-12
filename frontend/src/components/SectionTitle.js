import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function SectionTitle(props) {
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
        fontSize: 24,
        fontWeight: 'bold',
        color: "#2D2A9B"
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#d3d3d3',
        marginBottom: 10,
        marginTop: 5
    }
});