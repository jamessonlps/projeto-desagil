import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

function DocumentsList() {

    const [loading, setLoading] = useState(false);

    function DocumentPost() {
        return (
            <>
                <View style={styles.documentPost}>
                    <Text>Planta baixa D. R. Bias</Text>
                    <Button title="Visualizar" />
                    <Button title="Detalhes" />
                </View>
            </>
        );
    };

    return (
        DocumentPost()
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
        flexDirection: 'col',
        height: '5rem',
        width: '100%',
    },
});

export default DocumentsList;
