import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { formatData } from '../utils/FormatDate';
import QRCode from '../icons/qr-code-header';
import { useNavigation } from '@react-navigation/native';
import StatusBarStyle from '../components/StatusBarStyle';
import { useFonts } from 'expo-font';

export default function CommentsView({ route }) {
    const [listComments, setListComments] = useState(null);
    const navigation = useNavigation();
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
            <StatusBarStyle />
            <View style={styles.mainCommentContainer}>
                <Text style={styles.textTitulo}>{route.params?.titulo}</Text>
                <Text style={styles.textAutor}>Aberta por: {route.params?.autor}, {route.params?.cargo}</Text>
                <Text style={styles.textDate}>Criado em: {formatData(route.params?.dataCriacao)}</Text>
                <View style={{marginLeft: 10}}>
                    <Text style={styles.textStatus}>Status: {route.params?.resolvido ? "Resolvido" : "Pendente"}</Text>
                    <Text style={styles.textStatus}>Relevância: {route.params?.alerta ? "Alta" : "Baixa"}</Text>
                </View>
                <View style={{borderWidth: 0.3, borderColor: 'gray', marginTop: 10}} />
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
                    <Text style={{alignSelf: 'center', fontFamily: 'Bold'}}>Ainda não há respostas a essa observação</Text>
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
        fontFamily: 'Bold',
        color: '#2D2A9B'
    },
    textAssunto: {
        fontSize: 18,
        marginTop: 10,
        color: '#000',
        fontFamily: 'Light'
    },
    textAutor: {
        fontSize: 17,
        color: '#5c5c5c',
        fontFamily: 'SemiBold'
    },
    textDate: {
        fontSize: 17,
        color: '#5c5c5c',
        fontFamily: 'SemiBold'
    },
    textStatus: {
        color: '#2385A2',
        fontFamily: 'Bold',
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
        fontSize: 16,
        fontFamily: 'Regular'
    },
    commentTextBottom: {
        alignSelf: 'flex-end',
        color: 'gray',
        fontSize: 13,
        fontFamily: 'Italic',
        paddingTop: 5
    }
})