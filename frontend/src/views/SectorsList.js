import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import { useGlobal } from '../../store';
import NavigateButton from '../components/NavigateButton';
import SectionTitle from '../components/SectionTitle';
import QRCode from '../icons/qr-code-header';

export default function SectorsList({ route }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [sectors, setSectors] = useState(null);
    const [sectorsLoading, setSectorsLoading] = useState(true);
    const localhost = useGlobal('localhost');
    const address = localhost.address;

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
        setLoading(true);
        client.get(`${address}/setor/list?setores=${route.params?.setores}`, (body) => {
            setSectors(body);
            setSectorsLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }, []);

    return (
        <ScrollView style={{paddingHorizontal: 10}} >
            <SectionTitle titleSection="Setores do pavimento" />
            {
                sectorsLoading && sectors !== null ? (<ActivityIndicator size='large' color="#2385A2" />)
                : !sectorsLoading && sectors !== null ? 
                sectors.reverse().map((item, index) => (
                    <NavigateButton 
                        key={index}
                        destino={"SectorView"}
                        dados={{...item, keyRef: item.key}}
                        titulo={item.titulo}
                        detalhes={item.descricao}
                        dataCriacao={item.dataCriacao}
                    />
                ))
                : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
            }
        </ScrollView>
    );
}
