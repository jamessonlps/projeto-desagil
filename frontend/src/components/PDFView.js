import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';

import { useNavigation } from '@react-navigation/native';

export default function PDFView({ route }) {
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    navigation.setOptions({
        title: `${route.params?.titulo}` || "Visualizador de PDF"
    });

    if (!loading) {
        return (
            <View style={styles.loadingContainer} >
                <ActivityIndicator size={50} color="#0000ff"/>
            </View>
        );
    } else {
        return <PDFReader source={{uri: route.params?.url}} withPinchZoom={true}/>;
    }
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
