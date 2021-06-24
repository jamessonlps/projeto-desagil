import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import ConnectLogo from '../icons/connectdata-logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [name, setName] = useState(null);
    const [role, setRole] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigation = useNavigation();

    async function handleLogin() {
        setMessage(null);
        setLoading(true);
        if (!!name && !!role && !!password) {
            await AsyncStorage
                .setItem('userName', name)
                .then(async() => {
                    await AsyncStorage
                        .setItem('userOccupation', role)
                        .then(() => {
                            navigation.navigate('InitialPage');
                            setLoading(false);
                        })
                        .catch((e) => {
                            setLoading(false);
                            setMessage("Ocorreu algum erro. Por favor, tente novamente");
                        })
                })
                .catch((e) => {
                    setLoading(false);
                    setMessage("Ocorreu algum erro. Por favor, tente novamente")
                })
        }
        else {
            setMessage("Você deve preencher todos os campos");
            setLoading(false);
        }
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.logoContainer} >
                <ConnectLogo width={353} height={98} />
            </View>
            <View style={styles.inputsContainer}>
                <TextInput 
                    placeholder="Digite seu nome" 
                    style={styles.textInput} 
                    onChangeText={(text) => setName(text)} />
                <TextInput 
                    placeholder="Digite seu cargo" 
                    style={styles.textInput} 
                    onChangeText={(text) => setRole(text)} />
                <TextInput 
                    secureTextEntry={true} 
                    placeholder="Digite sua senha" 
                    style={styles.textInput} 
                    onChangeText={(text) => setPassword(text)} />
            </View>
            {
                message ? 
                (<View style={{marginTop: 5}}><Text style={{fontSize: 16, color: 'red', alignSelf: 'center'}}>{message}</Text></View>)
                :
                null
            }
            <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleLogin}>
                {
                    loading ? <Text style={styles.submitButtonText}>Carregando...</Text>
                    :
                    <Text style={styles.submitButtonText}>Entrar</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    logoContainer: {
        alignSelf: 'center',
        paddingBottom: 25
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    textInput: {
        backgroundColor: "#f1f2f2",
        borderRadius: 10,
        marginVertical: 10,
        fontSize: 20,
        padding: 10
    },
    submitButton: {
        backgroundColor: "#2385A2",
        marginTop: 30,
        marginHorizontal: 15,
        alignSelf: 'center',
        // paddingHorizontal: 25,
        paddingVertical: 15,
        width: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 10
    },
    submitButtonText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center'
    }
});
