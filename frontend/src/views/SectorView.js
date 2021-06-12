import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import CommentCard from '../components/CommentCard';
import AlertCard from '../components/AlertCard';
import { TextInput } from 'react-native-gesture-handler';
import { useGlobal } from '../../store';
import NavigateButton from '../components/NavigateButton';
import SubHeader from '../components/SubHeader';
import SectionTitle from '../components/SectionTitle';

export default function GeneralView({ route }) {
    const [loading, setLoading] = useState(true);
    const [logLoading, setLogLoading] = useState(true);

    const [response, setResponse] = useState(null);
    const [textInput, setTextInput] = useState(null);
    const [refresh, setRefresh] = useState(null);
    const [msg, setMsg] = useState('');
    const navigation = useNavigation();
    const localhost = useGlobal('localhost');
    const address = localhost.address;
    const [log, setLog] = useState(null);

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
                `${address}/observacao?obra=${route.params?.obra}&setor=${route.params?.key}`,
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
        client.get(`${address}/observacao/list?observacoes=${route.params?.observacoes}`, (body) => {
            setLog(body);
            setLogLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }

    useEffect(() => {
        getDataToRender();
    }, []);

    return (
        <ScrollView style={styles.outerContainer}>
            <SubHeader
                titulo={route.params?.titulo}
                responsavel={route.params?.responsavel} 
            />

            <View style={styles.contentContainer}>

                {/* =============== DOCUMENTOS ================= */}
                <View>
                    <NavigateButton 
                        destino={"DocumentsList"}
                        dados={{documentos: route.params?.documentos, obra: route.params?.obra}}
                        titulo={"Ver documentos"}
                    />
                </View>

                {/* =============== ALERTAS ================= */}
                <SectionTitle titleSection="Alertas" />
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


                {/* =============== OBSERVAÇÕES ================= */}
                <SectionTitle titleSection="Observações" />
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

            </View>

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
        </ScrollView>
    );
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
