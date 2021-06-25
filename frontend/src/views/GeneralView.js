import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import CommentCard from '../components/CommentCard';
import AlertCard from '../components/AlertCard';
import { TextInput } from 'react-native-gesture-handler';
import { useGlobal } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigateButton from '../components/NavigateButton';
import SubHeader from '../components/SubHeader';
import SectionTitle from '../components/SectionTitle';
import SendIcon from '../icons/send-arrow';
import QRCode from '../icons/qr-code-header';

export default function GeneralView({ route }) {
    const [loading, setLoading] = useState(true);
    const [logLoading, setLogLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    const [obraTitle, setObraTitle] = useState(null);
    const [obraAddress, setObraAddress] = useState(null);
    const [response, setResponse] = useState(null);
    const [textInput, setTextInput] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userOccupation, setUserOccupation] = useState(null);
    const [fullData, setFullData] = useState(null);
    const [sendLoading, setSendLoading] = useState(false);
    const navigation = useNavigation();
    const localhost = useGlobal('localhost');
    const address = localhost.address;
    const [log, setLog] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('QR Code Scanner')}
                    style={{paddingRight: 15}}>
                    <QRCode width={30} height={30} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    
    useEffect(() => {
        navigation.addListener('focus', () => {
            getDataToRender();
            setKeyObra();
            getUserInfo();
        })
    }, [navigation]);
    
    useEffect(() => {
        getDataToRender();
        setKeyObra();
        getUserInfo();
    }, []);


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
            setSendLoading(true);
            let newNote = {
                "alerta": isAlert,
                "assunto": textInput,
                "autor": userName,
                "cargo": userOccupation
            }
        client.post(
            `${address}/observacao?obra=${route.params?.obra}&${route.params?.tipoObra}=${route.params?.key}`,
            newNote,
            (message) => {
                newNote = {...newNote, dataCriacao: message.date, key: message.key}
                if (log) {
                    setLog([...log, newNote]);
                }
                else {
                    setLog([newNote]);
                }
                setLogLoading(false);
                setLoading(false);
                setTextInput('');
                setSendLoading(false);
            },
            () => {
                setLoading(false);
                setSendLoading(false);
            },
            () => setLoading(false)
        );
    }



    function getDataToRender() {
        setLoading(true);
        client.get(`${address}/pavimento?key=${route.params?.keyRef}`, (body) => {
            setFullData(body);
            setDataLoading(false);
            renderPage(body);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }

    

    function renderPage(data) {
        setLoading(true);
        client.get(`${address}/observacao/list?observacoes=${data.observacoes}`, 
        (body) => {
            setLog(body);
            setLogLoading(false);
        },
        (message) => {null}, 
        () => setLoading(false), 
        () => setLoading(false)
        );
    
        setLoading(true);
        client.get(`${address}/obra?key=${data.obra}`, (body) => {
            setObraTitle(body.titulo);
            setObraAddress(body.endereco);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }



    async function getUserInfo() {
        await AsyncStorage
            .multiGet(['userName', 'userOccupation'])
            .then((result) => {
                setUserName(result[0][1]);
                setUserOccupation(result[1][1]);
            })
            .catch((e) => null)
    }



    async function setKeyObra() {
        return await AsyncStorage
            .setItem('keyObra', route.params?.obra || fullData.obra)
            .then((value) => {null})
            .catch((e) => {null})
    }


    if (dataLoading) {
        return (<ActivityIndicator />)
    } else {

    return (
        <ScrollView style={styles.outerContainer}>
            <SubHeader 
                titulo={fullData.titulo}
                responsavel={fullData.responsavel} 
                endereco={obraAddress}
                obra={obraTitle}
            />

            <View style={styles.contentContainer}>
                {/* =============== DOCUMENTOS ================= */}
                <View>
                    <NavigateButton 
                        destino={"DocumentsList"}
                        dados={{documentos: fullData.documentos, obra: fullData.obra}}
                        titulo={"Ver documentos"}
                    />
                </View>


                {/* ================= SETORES ================== */}
                <View >
                    <NavigateButton 
                        destino={"SectorsList"}
                        dados={{setores: fullData.setores, obra: fullData.obra}}
                        titulo={"Ver setores"}
                    />
                </View>

                {/* ================= ALERTAS ================== */}
                <SectionTitle titleSection="Alertas" />
                {
                    logLoading && log !== null ? (<ActivityIndicator size='large' color="#2385A2" />) 
                    : !logLoading && log !== null ?
                    log.map((item, index) => item.alerta && !item.resolvido ? (
                        <View key={index}>
                            <AlertCard 
                                assunto={item.assunto}
                                dataCriacao={item.dataCriacao}
                                dados={{...item, "tipoObra": route.params?.tipoObra, "keyRef": fullData.key, "titulo": fullData.titulo}}
                                destino={"CommentsView"}
                                />
                        </View>
                    ) : null)
                    : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
                }


                {/* =============== OBSERVAÇÕES ================= */}
                <SectionTitle titleSection="Observações" />
                <View style={styles.obsContainer}>
                    {
                        logLoading && log !== null ? (<ActivityIndicator size='large' color="#2385A2" />)
                        : !logLoading && log !== null ? 
                        log.map((item, index) => !item.alerta && !item.resolvido ? (
                            <View style={{marginHorizontal: 10}} key={index}>
                                <CommentCard 
                                    assunto={item.assunto}
                                    dataCriacao={item.dataCriacao}
                                    dados={{...item, "tipoObra": route.params?.tipoObra, "keyRef": fullData.key, "titulo": fullData.titulo}}
                                    destino={"CommentsView"}
                                    />
                            </View>
                        ) : null)
                        : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
                    }
                    {/* =============== INPUT NOVA OBSERVAÇÃO / ALERTA ================= */}
                    <Text style={styles.inputTitle} > Adicionar observação ou alerta</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.inputArea} 
                            placeholder="Digite aqui sua observação..." 
                            selectionColor='#2385A2'
                            onChangeText={(text) => {
                                setTextInput(text)
                            }}
                            value={textInput}
                        />
                        {
                            sendLoading ? (<ActivityIndicator size='large' color='#2385A2' />)
                            : (
                                <TouchableOpacity 
                                    style={styles.inputButton}
                                    onPress={verifyAlert}>
                                    <SendIcon width={40} height={40} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>


                {/* =============== OBSERVAÇÕES RESOLVIDAS ================= */}
                <SectionTitle titleSection="Observações resolvidas" />
                {
                    logLoading && log !== null ? (<ActivityIndicator size='large' color="#2385A2" />)
                    : !logLoading && log !== null ? 
                    log.map((item, index) => item.resolvido ? (
                        <View key={index}>
                            <CommentCard 
                                assunto={item.assunto}
                                dataCriacao={item.dataCriacao}
                                dados={{...item, "tipoObra": route.params?.tipoObra, "keyRef": fullData.key, "titulo": fullData.titulo}}
                                destino={"ResolvedComments"}
                                color={"gray"}
                            />
                        </View>
                    ) : null)
                    : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
                }

            </View>
        </ScrollView>
    );

    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    contentContainer: {
        paddingRight: 15,
        paddingLeft: 15,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    inputButton: {
        // backgroundColor: "#2385A2",
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 25,
        // paddingVertical: 6,
        // marginTop: 10,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        // width: '10%'
    },
    inputArea: {
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#f1f2f2",
        // margin: 5,
        width: '87%',
        height: 40,
        fontSize: 16
    },
    inputTitle: {
        fontSize: 18,
        paddingTop: 15,
        color: "#2D2A9B",
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    obsContainer: {
        backgroundColor: '#fff', 
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        paddingTop: 10,
        marginHorizontal: 5
    }
});
