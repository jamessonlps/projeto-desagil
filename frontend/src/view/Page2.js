import React from 'react';
import { View, Button, StatusBar, Text, StyleSheet } from 'react-native';

export default function Page2(props) {
    return (
        <View style={styles.container}>
            <Text>
                Página 2
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 30,
    },
})