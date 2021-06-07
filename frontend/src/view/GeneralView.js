import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import DocumentCard from '../components/DocumentCard';
import CommentCard from '../components/CommentCard';

import PDFIcon from '../icons/pdf';
import Warning from '../icons/warning';
import LogIcon from '../icons/log';

export default function GeneralView({ route }) {
    const [loading, setLoading] = useState(true);
    const [docsLoading, setDocsLoading] = useState(true);
    const [logLoading, setLogLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const navigation = useNavigation();

    const [data, setData] = useState(null);
    const [log, setLog] = useState(null);

    useEffect(() => {
        setLoading(true);
        client.get(`http://192.168.1.106:8080/documento/list?documentos=${route.params?.documentos}`, (body) => {
            setData(body);
            setDocsLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );

        setLoading(true);
        client.get(`http://192.168.1.106:8080/observacao/list?observacoes=${route.params?.observacoes}`, (body) => {
            setLog(body);
            setLogLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );

    }, []);

    return (
        <ScrollView style={styles.outerContainer}>
            <View>
                <Text style={styles.mainTitle}>{route.params?.titulo}</Text>
                <Text>Responsável pela obra: {route.params?.responsavel}</Text>
            </View>

            <View>
                <View style={styles.subTitleContainer}>
                    <PDFIcon />
                    <Text style={styles.mainTitle}>Documentos</Text>
                </View>
                <View>
                    {
                        docsLoading ? (<ActivityIndicator size={50} />) 
                        :
                        data.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('PDFView', item)}>
                                <DocumentCard 
                                    titulo={item.titulo}
                                    tipo={item.tipo}
                                    dataCriacao={item.dataCriacao}
                                    ultimaModificacao={item.ultimaModificacao}
                                />
                            </TouchableOpacity>
                        ))
                    }

                </View>
            </View>

            <View>
                <View style={styles.subTitleContainer}>
                    <Warning />
                    <Text style={styles.mainTitle}>Alertas</Text>
                </View>
                    {
                        logLoading ? (<ActivityIndicator size={50} />) 
                        :
                        log.map((item, index) => item.alerta ? (
                            <View key={index}>
                                <CommentCard 
                                    texto={item.texto}
                                    dataCriacao={item.dataCriacao}
                                    ultimaModificacao={item.ultimaModificacao}
                                />
                            </View>
                        ) : null)
                    }
            </View>

            <View>
                <View style={styles.subTitleContainer}>
                    <LogIcon />
                    <Text style={styles.mainTitle}>Comentários</Text>
                </View>
                    {
                        logLoading ? (<ActivityIndicator size={50} />) 
                        :
                        log.map((item, index) => !item.alerta ? (
                            <View key={index}>
                                <CommentCard 
                                    texto={item.texto}
                                    dataCriacao={item.dataCriacao}
                                    ultimaModificacao={item.ultimaModificacao}
                                />
                            </View>
                        ) : null)
                    }

                <View style={styles.inputContainer}>
                    <TextInput style={styles.boxInput} placeholder="Digite aqui suas observações..."/>
                    <Button title="Adicionar comentário" disabled={true} />
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    subTitleContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    inputContainer: {
        paddingTop: 15,
        paddingBottom: 30
    },
    boxInput: {
        borderWidth: 3,
        borderColor: 'black'
    }
});
