import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import DocumentCard from '../components/DocumentCard';
import CommentCard from '../components/CommentCard';
import AlertCard from '../components/AlertCard';

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
                <Text style={{fontSize: 18}}>Responsável pela obra: {route.params?.responsavel}</Text>
            </View>

            <View>
                <View style={styles.subTitleContainer}>
                    <Text style={styles.mainTitle}>Documentos</Text>
                    <View style={styles.lineStyle} />
                </View>
                <View>
                    {
                        docsLoading ? (<ActivityIndicator size={50} />) 
                        :
                        data.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('PDFView', item)}>
                                <DocumentCard 
                                    titulo={item.titulo}
                                    descricao={item.descricao}
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
                    <Text style={styles.mainTitle}>Alertas</Text>
                    <View style={styles.lineStyle} />
                </View>
                    {
                        logLoading ? (<ActivityIndicator size={50} />) 
                        :
                        log.map((item, index) => item.alerta ? (
                            <View key={index}>
                                <AlertCard 
                                    texto={item.texto}
                                    dataCriacao={item.dataCriacao}
                                />
                            </View>
                        ) : null)
                    }
            </View>

            <View>
                <View style={styles.subTitleContainer}>
                    <Text style={styles.mainTitle}>Observações</Text>
                    <View style={styles.lineStyle} />
                </View>
                    {
                        logLoading ? (<ActivityIndicator size={50} />) 
                        :
                        log.map((item, index) => !item.alerta ? (
                            <View key={index}>
                                <CommentCard 
                                    texto={item.texto}
                                    dataCriacao={item.dataCriacao}
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
        paddingLeft: 15,
        paddingRight: 15,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#2D2A9B"
    },
    subTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10
    },
    inputContainer: {
        paddingTop: 15,
        paddingBottom: 30
    },
    boxInput: {
        borderWidth: 3,
        borderColor: 'black'
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor:'gray',
        marginBottom: 10,
        marginTop: 5
    }
});
