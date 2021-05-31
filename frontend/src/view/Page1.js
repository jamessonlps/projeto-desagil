import React from 'react';
import { View, Button, StatusBar, Text, StyleSheet } from 'react-native';

export default function Page1(props) {
    return (
        <View style={styles.container}>
            <Text>
                Página 1
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 30,
    },
    containerText: {
        fontSize: 20,
        alignContent: 'center',
        justifyContent: 'center',
    },
})