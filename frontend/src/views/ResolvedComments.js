import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { formatData } from '../utils/FormatDate';
import QRCode from '../icons/qr-code-header';
import { useNavigation } from '@react-navigation/native';

export default function CommentsView({ route }) {
    const [listComments, setListComments] = useState(null);
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
        setListComments(route.params?.comentarios);
    }, [])

    function formatCommentCard(text) {
        let date = text.split(" || ")[0];
        let author = text.split(" || ")[1];
        let cargo = text.split(" || ")[2];
        let content = text.split(" || ")[3];

        return [`${content}`, `${date} - ${author}, ${cargo}`]
    }

    return (
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
        </ScrollView>
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
        color: '#2D2A9B'
    },
    textAssunto: {
        fontSize: 18,
        marginTop: 10,
        color: '#000'
    },
    textAutor: {
        fontSize: 17,
        color: '#5c5c5c'
    },
    textDate: {
        fontSize: 17,
        color: '#5c5c5c'
    },
    textStatus: {
        color: '#2385A2',
        fontWeight: 'bold',
        fontSize: 16
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