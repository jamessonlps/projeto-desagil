import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import DocumentCard from '../components/DocumentCard';
import CommentCard from '../components/CommentCard';
import SectorCard from '../components/SectorCard';
import AlertCard from '../components/AlertCard';
import { TextInput } from 'react-native-gesture-handler';
import BuildingIcon from '../icons/building2';

import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GeneralView({ route }) {
    const [loading, setLoading] = useState(true);
    const [docsLoading, setDocsLoading] = useState(true);
    const [logLoading, setLogLoading] = useState(true);
    const [sectorLoading, setSectorLoading] = useState(true); // para objetos do tipo pavimento

    const [response, setResponse] = useState(null);
    const [textInput, setTextInput] = useState(null);
    const [refresh, setRefresh] = useState(null);
    const [msg, setMsg] = useState('');
    const navigation = useNavigation();

    const [data, setData] = useState(null);
    const [log, setLog] = useState(null);
    const [sectors, setSectors] = useState(null);  // quando o objeto lido é um pavimento

    // Exibe uma alerta para marcar se é obs. do tipo alerta ou não
    function verifyAlert() {
        if (textInput !== null && textInput !== '' && textInput !== undefined) {
            Alert.alert(
                "Nova observação",
                "Essa observação é uma alerta?",
                [
                    {text: "Cancelar envio", style: "cancel"}, 
                    {text: "Não", onPress: () => {
                        submitNewNote(false);
                    }},
                    {text: "Sim", onPress: () => {
                        submitNewNote(true);
                    }}
                ]
            )
        }
    }

    // Envia observação para o firebase
    function submitNewNote(isAlert) {
        if (isAlert !== null) {
            client.post(
                `http://192.168.1.111:8080/observacao?obra=${route.params?.obra}&${route.params?.tipoObra}=${route.params?.key}`,
                {
                    "alerta": isAlert,
                    "texto": textInput
                },
                (message) => {
                    setResponse(message);
                    setRefresh(true);
                    setTextInput('');
                },
                () => setLoading(false),
                () => setLoading(false)
            );
        } 
    }

    function getDataToRender() {
        setLoading(true);
        client.get(`http://192.168.1.111:8080/documento/list?documentos=${route.params?.documentos}`, (body) => {
            setData(body);
            setDocsLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    
        setLoading(true);
        client.get(`http://192.168.1.111:8080/observacao/list?observacoes=${route.params?.observacoes}`, (body) => {
            setLog(body);
            setLogLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    
        setLoading(true);
        client.get(`http://192.168.1.111:8080/setor/list?setores=${route.params?.setores}`, (body) => {
            setSectors(body);
            setSectorLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    
    }

    useEffect(() => {
        getDataToRender();
        setKeyObra();
    }, []);

    async function setKeyObra() {
        return await AsyncStorage
            .setItem('keyObra', route.params?.obra)
            .then((value) => {
                console.log(value);
            })
            .catch((e) => {
                console.log(e.message);
            })
    }

    // useEffect(() => {
    //     getDataToRender();
    // }, [refresh]);

    return (
        <ScrollView style={styles.outerContainer}>
            <LinearGradient 
            colors={[ "#2D2A9B", "#2385A2"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
                <View style={styles.headerContainer}>
                    <View style={{width: '15%'}}>
                        <BuildingIcon />
                    </View>
                    <View style={{width: '85%'}}>
                        <Text style={styles.headerTitle}>{route.params?.titulo}</Text>
                        <Text style={{fontSize: 14, color: '#F1F2F2'}}>Responsável: {route.params?.responsavel}</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.contentContainer}>
                {/* =============== SETORES ================= */}
                <View style={styles.subTitleContainer}>
                    <Text style={styles.mainTitle}>Setores</Text>
                    <View style={styles.lineStyle} />
                </View>
                {
                    sectorLoading ? (<ActivityIndicator size='large' color="#2385A2" />) 
                    : 
                    sectors.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate("SectorView", item)}>
                            <SectorCard 
                                titulo={item.titulo}
                                // responsavel={item.responsavel}
                                />
                        </TouchableOpacity>
                    ))
                }

                {/* =============== ALERTAS ================= */}
                <View style={styles.subTitleContainer}>
                    <Text style={styles.mainTitle}>Alertas</Text>
                    <View style={styles.lineStyle} />
                </View>
                {
                    logLoading && log !== null ? (<ActivityIndicator size='large' color="#2385A2" />) 
                    : !logLoading && log.length > 0 ?
                    log.map((item, index) => item.alerta ? (
                        <View key={index}>
                            <AlertCard 
                                texto={item.texto}
                                dataCriacao={item.dataCriacao}
                                />
                        </View>
                    ) : null)
                    : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
                }

                {/* =============== DOCUMENTOS ================= */}
                <View style={styles.subTitleContainer}>
                    <Text style={styles.mainTitle}>Documentos</Text>
                    <View style={styles.lineStyle} />
                </View>
                
                <View>
                    {
                        docsLoading && data !== null ? (<ActivityIndicator size='small' color='#2385A2'  />) 
                        : !docsLoading && data.length > 0 ? 
                        data.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('PDFView', item)}>
                                <DocumentCard 
                                    titulo={item.titulo}
                                    descricao={item.descricao}
                                    dataCriacao={item.dataCriacao}
                                    />
                            </TouchableOpacity>
                        ))
                        : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
                    }
                </View>

                {/* =============== OBSERVAÇÕES ================= */}
                <View style={styles.subTitleContainer}>
                    <Text style={styles.mainTitle}>Observações</Text>
                    <View style={styles.lineStyle} />
                </View>
                    {
                        logLoading && log !== null ? (<ActivityIndicator size='large' color="#2385A2" />)
                        : !logLoading && log.length > 0 ? 
                        log.map((item, index) => !item.alerta ? (
                            <View key={index}>
                                <CommentCard 
                                    texto={item.texto}
                                    dataCriacao={item.dataCriacao}
                                    />
                            </View>
                        ) : null)
                        : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
                    }

                {/* =============== INPUT NOVA OBSERVAÇÃO / ALERTA ================= */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle} > Adicionar observação ou alerta</Text>
                    <TextInput 
                        style={styles.inputArea} 
                        placeholder="Clique aqui para inserir um novo comentário..." 
                        selectionColor='#2385A2'
                        onChangeText={(text) => {
                            setTextInput(text)
                        }}
                        value={textInput}
                    />
                    <TouchableOpacity 
                        style={styles.inputButton}
                        onPress={verifyAlert}>
                        <Text style={{color: 'white', fontSize: 18}}>Enviar</Text>
                    </TouchableOpacity>
            </View>



            </View>
                {/* <Text>{msg}</Text> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        // paddingLeft: 15,
        // paddingRight: 15
    },
    contentContainer: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    headerContainer: {
        marginTop: 10,
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#2D2A9B"
    },
    subTitleContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        // minHeight: 100
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        marginBottom: 15,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 5
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: '#d3d3d3',
        marginBottom: 10,
        marginTop: 5
    },
    inputButton: {
        backgroundColor: "#2385A2",
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 25,
        paddingVertical: 6,
        marginTop: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    inputArea: {
        // borderWidth: 1,
        // height: 20,
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#F1F2F2",
        margin: 5
    },
    inputTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: "#2D2A9B",
        alignSelf: 'center',
        fontWeight: 'bold'
    }
});
