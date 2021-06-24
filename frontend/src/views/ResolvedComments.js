import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function CommentsView({ route }) {
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
                    route.params?.comentarios.length > 0 ?
                    route.params?.comentarios.map((item, index) => (
                        <Text key={index}>{item}</Text>
                    ))
                    :
                    <Text>Nenhuma resposta foi adicionada a essa observação</Text>
                }
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