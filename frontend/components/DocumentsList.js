import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, SafeAreaView } from 'react-native';

function DocumentsList() {

    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView style={styles.documentPost}>
            <Text>Planta baixa D. R. Bias</Text>
            <View >
                <Button title="Visualizar" />
                <Button title="Detalhes" />
            </View>
        </SafeAreaView>
    );


};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#ffffff",
        minHeight: '100%',
        marginTop: '2rem',
    },
    documentPost: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
});

export default DocumentsList;
