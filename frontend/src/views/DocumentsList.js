import React, { useState, useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import client from '../../client';
import { useGlobal } from '../../store';
import NavigateButton from '../components/NavigateButton';
import SectionTitle from '../components/SectionTitle';
import { formatData } from '../utils/FormatDate';

export default function DocumentsList({ route }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [docs, setDocs] = useState(null);
    const [docsLoading, setDocsLoading] = useState(true);
    const localhost = useGlobal('localhost');
    const address = localhost.address;

    useEffect(() => {
        setLoading(true);
        client.get(`${address}/documento/list?documentos=${route.params?.documentos}`, (body) => {
            setDocs(body);
            setDocsLoading(false);
        },
        (message) => setResponse(message), 
        () => setLoading(false), 
        () => setLoading(false)
        );
    }, []);

    return (
        <ScrollView style={{paddingHorizontal: 10}} >
            <SectionTitle titleSection="Documentos" />
            {
                docsLoading && docs !== null ? (<ActivityIndicator size='large' color="#2385A2" />)
                : !docsLoading && docs !== null ? 
                docs.map((item, index) => (
                    <NavigateButton 
                        key={index}
                        destino={"PDFView"}
                        dados={item}
                        titulo={item.titulo}
                        detalhes={item.descricao}
                        dataCriacao={formatData(item.dataCriacao)}
                    />
                ))
                : <Text style={{alignSelf: 'center', color: 'gray'}}>Não há conteúdo a ser exibido</Text>
            }
        </ScrollView>
    );
}
