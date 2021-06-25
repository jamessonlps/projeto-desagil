import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import ConnectLogo from '../icons/connectdata-logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        async function setKeyObra() {
            await AsyncStorage
                .setItem('keyObra', 'QM6XcByNOFbHhnYShhgd')
                .then(() => null)
                .catch(() => null);
        }
        setKeyObra();
    }, [])

    async function handleLogin() {
        setMessage(null);
        setLoading(true);
        if (email == 'hashimoto@connectdata.com' && password == 'insper2021') {
            await AsyncStorage
                .setItem('userName', 'Marcelo Hashimoto')
                .then(async() => {
                    await AsyncStorage
                        .setItem('userOccupation', 'Empreiteiro')
                        .then(() => {
                            setEmail('');
                            setPassword('');
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
        else if (email == '' || password == '') {
            setMessage("Você deve preencher todos os campos");
            setLoading(false);
        }
        else {
            setMessage("Dados incorretos. Verifique suas informações e tente novamente.");
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
                    placeholder="Digite seu email" 
                    style={styles.textInput} 
                    onChangeText={(text) => setEmail(text)} 
                    value={email} />
                <TextInput 
                    secureTextEntry={true} 
                    placeholder="Digite sua senha" 
                    style={styles.textInput} 
                    onChangeText={(text) => setPassword(text)} 
                    value={password} />
            </View>
            {
                message ? 
                (<View style={{marginTop: 5}}><Text style={{fontSize: 16, color: 'red', alignSelf: 'center', textAlign: 'center'}}>{message}</Text></View>)
                :
                null
            }
            {
                loading ? (<ActivityIndicator style={{alignSelf: 'center'}} size='large' color='#2385A2' />)
                : (
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleLogin}>
                            <Text style={styles.submitButtonText}>Entrar</Text>
                    </TouchableOpacity>
                )
            }
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
