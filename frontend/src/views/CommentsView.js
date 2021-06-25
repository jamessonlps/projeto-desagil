import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import client from '../../client';
import { useGlobal } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { formatData } from '../utils/FormatDate';
import SendIcon from '../icons/send-arrow';
import QRCode from '../icons/qr-code-header';

export default function CommentsView({ route }) {
    const [commentInput, setCommentInput] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sendLoading, setSendLoading] = useState(false);
    const [resolveLoading, setResolveLoading] = useState(false);
    const [userName, setUserName] = useState(null);
    const [listComments, setListComments] = useState([]);
    const [dataNavigation, setDataNavigation] = useState(null);
    const [userOccupation, setUserOccupation] = useState(null);
    const localhost = useGlobal('localhost');
    const address = localhost.address;
    const navigation = useNavigation();

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
        getUserSetup();
        setListComments(route.params?.comentarios);
    }, [])
    
    async function getUserSetup() {
        await AsyncStorage
            .multiGet(['userName', 'userOccupation'])
            .then((result) => {
                setUserName(result[0][1]);
                setUserOccupation(result[1][1]);
            })
            .catch((e) => null);
    }

    function sendComment() {
        if (commentInput !== '' && commentInput !== undefined) {
            setSendLoading(true);
            let now = getDate();
            let newComment = now + ` || ${userName} || ${userOccupation} || ${commentInput}`
            let comments = [];
            if (listComments) {
                comments = [...listComments, newComment];
            } else {
                comments = [newComment];
            }
            let body = {
    
                "alerta": route.params?.alerta,
                "assunto": route.params?.assunto,
                "autor": route.params?.autor,
                "cargo": route.params?.cargo,
                "comentarios": comments,
                "resolvido": route.params?.resolvido,
                "key": route.params?.key
            };
            client.put(
                `${address}/observacao?key=${route.params?.key}&${route.params?.tipoObra}=${route.params?.keyRef}&addComment=true&resolve=false`,
                body,
                (message) => {
                    setListComments(comments);
                    setCommentInput('');
                    setSendLoading(false);
                },
                () => {
                    setLoading(false);
                    setCommentInput('');
                    setSendLoading(false);
                },
                () => {
                    setLoading(false);
                }
            );
        }
    }

    function resolveComment() {
        setResolveLoading(true);
        client.put(
            `${address}/observacao?key=${route.params?.key}&${route.params?.tipoObra}=${route.params?.keyRef}&addComment=false&resolve=true`,
            {
                "alerta": route.params?.alerta,
                "assunto": route.params?.assunto,
                "autor": route.params?.autor,
                "cargo": route.params?.cargo,
                "comentarios": listComments,
                "resolvido": true,
                "key": route.params?.key
            },
            (message) => {
                setResolveLoading(false);
                redirect();
            },
            () => {
                setLoading(false);
                setResolveLoading(false);
            },
            () => setLoading(false)
        );
    }

    function redirect() {
        let navigateTarget;
        if (route.params?.tipoObra == "pavimento") {
            navigateTarget = "GeneralView";
        } else {
            navigateTarget = "SectorView";
        }
        navigation.navigate(navigateTarget, {"tipoObra": route.params?.tipoObra, "keyRef": route.params?.keyRef})
    }

    function getDate() {
        let now = new Date();
        let day = String(now.getDate()).padStart(2, '0');
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let year = String(now.getFullYear()).padStart(2, '0');
        let hour = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hour}:${minutes}`;
    }


    function formatCommentCard(text) {
        let date = text.split(" || ")[0];
        let author = text.split(" || ")[1];
        let cargo = text.split(" || ")[2];
        let content = text.split(" || ")[3];
        return [`${content}`, `${date} - ${author}, ${cargo}`]
    }

    return (
        <>
        <ScrollView style={styles.outerContainer}>
            <View style={styles.mainCommentContainer}>
                <Text style={styles.textTitulo}>{route.params?.titulo}</Text>
                <Text style={styles.textAutor}>Aberta por: {route.params?.autor}, {route.params?.cargo}</Text>
                <Text style={styles.textDate}>Criado em: {formatData(route.params?.dataCriacao)}</Text>
                <View style={{marginLeft: 10}}>
                    <Text style={styles.textStatus}>Status: {route.params?.resolvido ? "Resolvido" : "Pendente"}</Text>
                    <Text style={styles.textStatus}>Relevância: {route.params?.alerta ? "Alta" : "Baixa"}</Text>
                </View>
                <Text style={styles.textAssunto}>{route.params?.assunto}</Text>
            </View>

            <View>
                {
                    listComments !== undefined && listComments !== null && listComments.length > 0 ?
                    listComments.map((item, index) => (
                        <View style={styles.commentCard} key={index}>
                            <Text style={styles.commentCardText}>{formatCommentCard(item)[0]}</Text>
                            <Text style={styles.commentTextBottom}>{formatCommentCard(item)[1]}</Text>
                        </View>
                    ))
                    :
                    <Text style={{alignSelf: 'center'}}>Ainda não há respostas a essa observação</Text>
                }
            </View>

            <View style={styles.resolvedButton}>
                {
                    resolveLoading ? (<ActivityIndicator size='large' color='#2385A2' />)
                    : (
                        <TouchableOpacity 
                            style={styles.buttonSubmit} 
                            onPress={resolveComment}>
                            <Text style={styles.textResolvedButton}>Marcar como resolvido</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </ScrollView>

        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.inputArea} 
                placeholder="Digite aqui seu comentário..." 
                selectionColor='#2385A2'
                onChangeText={(text) => {
                    setCommentInput(text)
                }}
                value={commentInput}
            />
            {
                sendLoading ? (<ActivityIndicator size='large' color='#2385A2' />)
                : (
                    <TouchableOpacity 
                        style={styles.inputButton}
                        onPress={() => sendComment()}>
                        <SendIcon width={40} height={40} />
                    </TouchableOpacity>
                )
            }
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#F1F2F2',
        display: 'flex',
        flexDirection: 'column'
    },
    mainCommentContainer: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
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
    textTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2D2A9B',
        paddingVertical: 2
    },
    textAssunto: {
        fontSize: 18,
        marginTop: 10,
        color: '#000',
        paddingVertical: 1
    },
    textAutor: {
        fontSize: 17,
        color: '#5c5c5c',
        paddingVertical: 1
    },
    textDate: {
        fontSize: 17,
        color: '#5c5c5c',
        paddingVertical: 1
    },
    textStatus: {
        color: '#2385A2',
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 1
    },
    commentCard: {
        padding: 10,
        backgroundColor: '#18EEAB4C',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        width: '85%',
        display: 'flex',
        flexDirection: 'column'
    },
    commentCardText: {
        color: 'black',
        fontSize: 16
    },
    commentTextBottom: {
        alignSelf: 'flex-end',
        color: 'gray',
        fontSize: 13,
        fontStyle: 'italic'
    },
    resolvedButton: {
        alignSelf: 'center',
        marginTop: 15
    },
    buttonSubmit: {
        backgroundColor: '#2385A2',
        alignSelf: 'center',
        paddingVertical: 10,
        margin: 3,
        width: 240,
        alignContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textResolvedButton: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputText: {
        backgroundColor: '#fff',
        paddingVertical: 5
    },
    // ESTILIZAÇÃO DO INPUT DE COMENTÁRIO
    inputTitle: {
        fontSize: 18,
        paddingTop: 15,
        color: "#2D2A9B",
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff'
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
    }
})