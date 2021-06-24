import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import client from '../../client';
import { useGlobal } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CommentsView({ route }) {
    const [commentInput, setCommentInput] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(null);
    const [dataNavigation, setDataNavigation] = useState(null);
    const [userOccupation, setUserOccupation] = useState(null);
    const localhost = useGlobal('localhost');
    const address = localhost.address;
    const navigation = useNavigation();

    useEffect(() => {
        getUserSetup();
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
        let now = getDate();
        let newComment = now + ` || ${userName} || ${userOccupation} || ${commentInput}`
        let comments = [... route.params?.comentarios, newComment];
        client.put(
            `${address}/observacao?key=${route.params?.key}&${route.params?.tipoObra}=${route.params?.keyRef}&addComment=true&resolve=false`,
            {
                "alerta": route.params?.alerta,
                "assunto": route.params?.assunto,
                "autor": route.params?.autor,
                "cargo": route.params?.cargo,
                "comentarios": comments,
                "resolvido": route.params?.resolvido,
                "key": route.params?.key
            },
            (message) => {
                console.log(message);
                redirect();
            },
            () => setLoading(false),
            () => setLoading(false)
        );
    }

    function resolveComment() {
        client.put(
            `${address}/observacao?key=${route.params?.key}&${route.params?.tipoObra}=${route.params?.keyRef}&addComment=false&resolve=true`,
            {
                "alerta": route.params?.alerta,
                "assunto": route.params?.assunto,
                "autor": route.params?.autor,
                "cargo": route.params?.cargo,
                "comentarios": route.params?.comentarios,
                "resolvido": true,
                "key": route.params?.key
            },
            (message) => {
                console.log(message);
                redirect();
            },
            () => setLoading(false),
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
    
        // client.get(`${address}/${route.params?.tipoObra}?key=${route.params?.keyRef}`, 
        // (body) => {
        //     setDataNavigation({...body, "tipoObra": route.params?.tipoObra});
        // }, 
        // (message) => console.log(message), 
        // () => setLoading(false), 
        // () => setLoading(false)
        // );
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

    return (
        <View style={styles.outerContainer}>
            <View>
                <Text>{route.params?.assunto}</Text>
                <Text>Autor(a): {route.params?.autor}</Text>
                <Text>Função: {route.params?.cargo}</Text>
                <Text>Criado em: {route.params?.dataCriacao}</Text>
            </View>

            <View>
                {
                    route.params.comentarios !== undefined && route.params.comentarios !== null && route.params?.comentarios.length > 0 ?
                    route.params?.comentarios.map((item, index) => (
                        <Text key={index}>{item}</Text>
                    ))
                    :
                    <Text>Ainda não há respostas a essa observação</Text>
                }
            </View>

            <View>
                <TouchableOpacity 
                    style={styles.buttonSubmit} 
                    onPress={resolveComment}>
                    <Text>Marcar como resolvido</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>Adicionar comentário</Text>
                <TextInput 
                    onChangeText={(text) => setCommentInput(text)} 
                    style={styles.inputText} 
                />
                <TouchableOpacity 
                    style={styles.buttonSubmit} 
                    onPress={() => sendComment()}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputText: {
        backgroundColor: '#f1f2f2',
        paddingVertical: 5
    },
    buttonSubmit: {
        backgroundColor: 'orange',
        alignSelf: 'center',
        paddingVertical: 10,
        width: 200
    }
})