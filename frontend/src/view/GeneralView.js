import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, VirtualizedList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import DocumentCard from '../components/DocumentCard';

export default function GeneralView({ route }) {
    const [loading, setLoading] = useState(true);
    const [docsLoading, setDocsLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const navigation = useNavigation();

    const listDocumentsIds = Array.from(route.params?.documentos);
    const [data, setData] = useState(null);
    let documentsData = [];

    useEffect(() => {
        setLoading(true);
        client.get(`http://192.168.1.106:8080/documento?codigo=5566`, (body) => {
            setData(body);
            setDocsLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }, []);
    
    navigation.setOptions({
        title: `${route.params?.tipoObra.toUpperCase()}`
    });

    return (
        <View style={styles.outerContainer}>
            <View>
                <Text style={styles.mainTitle}>{route.params?.titulo}</Text>
                <Text>Responsável pela obra: {route.params?.responsavel}</Text>
            </View>

            <View>
                <Text style={styles.mainTitle}>Documentos</Text>
                
                <View>
                    {
                        docsLoading ? (<ActivityIndicator />) : (
                            <TouchableOpacity onPress={() => navigation.navigate('PDFView', data)}>
                                <DocumentCard
                                    titulo={data.titulo}
                                    dataCriacao={data.dataCriacao}
                                    ultimaModificacao={data.ultimaModificacao} 
                                />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        paddingRight: 30
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});
