import React, { useState } from 'react';
import { ActivityIndicator, View, Button, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Asset } from 'expo-asset';
import PDFReader from 'rn-pdf-reader-js';

export default function Main(props) {
    const file = require('../files/cad.pdf');

    const [uri, setURI] = useState(null);
    const [loading, setLoading] = useState(true);

    const [viewDocument, setViewDocument] = useState(false);

    Asset.loadAsync(file)
        .then(() => {
            if (loading) {
                const asset = Asset.fromModule(file);
                setURI(asset.localUri);
                setLoading(false);
            }
        });
    
    return(
        <>
            {viewDocument ? <PDFReader style={{paddingTop: 30}} source={{uri: uri}}/>
            :
            <SafeAreaView style={styles.documentPost}>
                <Text>Planta baixa D. R. Bias</Text>
                <View style={styles.buttonsContainer}>
                    <Button 
                        title="Visualizar" 
                        onPress={() => {
                            setViewDocument(true);
                        }}
                    />
                    <Button title=" Detalhes " />
                </View>
            </SafeAreaView>
            }
        </>
    );
};

const styles = StyleSheet.create({
    documentPost: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});
