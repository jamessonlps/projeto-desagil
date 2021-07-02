import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import CommentCard from '../components/CommentCard';
import AlertCard from '../components/AlertCard';
import { TextInput } from 'react-native-gesture-handler';
import { useGlobal } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import StatusBarStyle from '../components/StatusBarStyle';

import NavigateButton from '../components/NavigateButton';
import SubHeader from '../components/SubHeader';
import SectionTitle from '../components/SectionTitle';
import SendIcon from '../icons/send-arrow';
import QRCode from '../icons/qr-code-header';

export default function GeneralView({ route }) {
    const [loading, setLoading] = useState(true);
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
    const [alerts, setAlerts] = useState([]);
    const [obs, setObs] = useState([]);
    const [obsResolved, setObsResolved] = useState([]);
    const [alertsLoading, setAlertsLoading] = useState(true);
    const [obsLoading, setObsLoading] = useState(true);
    const [obsResolvedLoading, setObsResolvedLoading] = useState(true);
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'ExtraBold': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
        'Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });

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
                if (isAlert) {
                    setAlerts([...alerts, newNote]);
                }
                else {
                    setObs([...obs, newNote]);
                }
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
            filterObservations(body);
        },
        (message) => {
            setAlertsLoading(false);
            setObsLoading(false);
            setObsResolvedLoading(false);
        }, 
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
    
    
    function filterObservations(data) {
        var alerts = [];
        var observations = [];
        var observationsResolved = [];
        data.forEach((item) => {
            if (item.alerta && !item.resolvido) {
                alerts.push(item);
            }
            else if (!item.alerta && !item.resolvido) {
                observations.push(item);
            }
            else {
                observationsResolved.push(item);
            }
        });
        setAlerts(alerts);
        setObs(observations);
        setObsResolved(observationsResolved);
        setAlertsLoading(false);
        setObsLoading(false);
        setObsResolvedLoading(false);
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


    if (alertsLoading && obsLoading && obsResolvedLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size='large' color="#2385A2" />
            </View>
        )
    } else {

    return (
        <ScrollView style={styles.outerContainer}>
            <StatusBarStyle />
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
                    alertsLoading ? (<ActivityIndicator size='large' color="#2385A2" />) 
                    : !alertsLoading && alerts.length > 0 ?
                    alerts.map((item, index) => item.alerta && !item.resolvido ? (
                        <View key={index}>
                            <AlertCard 
                                assunto={item.assunto}
                                dataCriacao={item.dataCriacao}
                                dados={{...item, "tipoObra": route.params?.tipoObra, "keyRef": fullData.key, "titulo": fullData.titulo}}
                                destino={"CommentsView"}
                                />
                        </View>
                    ) : null)
                    : <Text style={{alignSelf: 'center', color: 'gray', fontFamily: 'SemiBold'}}>Não há conteúdo a ser exibido</Text>
                }


                {/* =============== OBSERVAÇÕES ================= */}
                <SectionTitle titleSection="Observações" />
                <View style={styles.obsContainer}>
                    {
                        obsLoading ? (<ActivityIndicator size='large' color="#2385A2" />)
                        : !obsLoading && obs.length > 0 ? 
                        obs.map((item, index) => !item.alerta && !item.resolvido ? (
                            <View style={{marginHorizontal: 10}} key={index}>
                                <CommentCard 
                                    assunto={item.assunto}
                                    dataCriacao={item.dataCriacao}
                                    dados={{...item, "tipoObra": route.params?.tipoObra, "keyRef": fullData.key, "titulo": fullData.titulo}}
                                    destino={"CommentsView"}
                                    />
                            </View>
                        ) : null)
                        : <Text style={{alignSelf: 'center', color: 'gray', fontFamily: 'SemiBold'}}>Não há conteúdo a ser exibido</Text>
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
                    obsResolvedLoading ? (<ActivityIndicator size='large' color="#2385A2" />)
                    : !obsResolvedLoading && obsResolved.length > 0 ? 
                    obsResolved.map((item, index) => item.resolvido ? (
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
                    : <Text style={{alignSelf: 'center', color: 'gray', fontFamily: 'SemiBold'}}>Não há conteúdo a ser exibido</Text>
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
        paddingHorizontal: 15,
        paddingTop: 10
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    inputButton: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,
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
        borderRadius: 5,
        padding: 5,
        backgroundColor: "#f1f2f2",
        width: '87%',
        height: 40,
        fontSize: 16,
        fontFamily: 'Regular'
    },
    inputTitle: {
        fontSize: 18,
        paddingTop: 15,
        color: "#2D2A9B",
        alignSelf: 'center',
        fontFamily: 'Bold'
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
