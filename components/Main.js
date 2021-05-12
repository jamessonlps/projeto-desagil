import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Main(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Main</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
    },
    title: {
        padding: 10,
        color: '#ffffff',
        backgroundColor: '#000000',
        textAlign: 'center',
    },
});
