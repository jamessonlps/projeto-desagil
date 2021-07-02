import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatData } from '../utils/FormatDate';
import { useNavigation } from '@react-navigation/native';
import Next from '../icons/next';
import { useFonts } from 'expo-font';

export default function CommentCard(props) {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        'Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
        'Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
        'ExtraBold': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
        'Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
        'Light': require('../../assets/fonts/OpenSans-Light.ttf'),
    });

    return (
        <>
            <TouchableOpacity 
                style={styles.cardContainer}
                onPress={() => navigation.navigate(props.destino, props.dados)}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={{...styles.cardDescription, color: props.color || '#000'}}>{props.assunto}</Text>
                        <Text style={styles.cardDate}>{formatData(props.dataCriacao)}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Next width={12} height={12} color='gray' />
                    </View>
            </TouchableOpacity>
            <View style={{borderWidth: 0.15, borderColor: "#000000", marginHorizontal: 10}} />
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    cardDescription: {
        fontSize: 16,
        fontFamily: 'Regular',
        color: '#000'
    },
    cardDate: {
        fontFamily: 'Italic',
        fontSize: 14,
        color: 'gray'
    },
    textContainer: {
        width: '96%',
        paddingRight: 10
    },
    iconContainer: {
        alignSelf: 'center',
        width: '4%'
    }
});
