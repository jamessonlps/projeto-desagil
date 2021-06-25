import React, { useState, useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import { useGlobal } from '../../store';
import NavigateButton from '../components/NavigateButton';
import SectionTitle from '../components/SectionTitle';

export default function SectorsList({ route }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [sectors, setSectors] = useState(null);
    const [sectorsLoading, setSectorsLoading] = useState(true);
    const localhost = useGlobal('localhost');
    const address = localhost.address;

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
                sectors.map((item, index) => (
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
