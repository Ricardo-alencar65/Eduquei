import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

export default function RankingScreen({ navigation }) {
    const [rankings, setRankings] = useState([]);

    useEffect(() => {
        const fetchRankings = async () => {
            const db = getFirestore();
            const desempenhoRef = collection(db, 'desempenho');
            const desempenhoSnapshot = await getDocs(desempenhoRef);
            const usuariosRef = collection(db, 'usuario');
            const usuariosSnapshot = await getDocs(usuariosRef);
    
            let desempenhos = [];
            let usuarios = {};
    
            usuariosSnapshot.forEach((doc) => {
                usuarios[doc.id] = doc.data();
            });
    
            let usuarioDesempenho = {};
    
            desempenhoSnapshot.forEach((doc) => {
                const data = doc.data();
                const usuarioId = data.usuarioId;
    
                usuarioDesempenho[usuarioId] = usuarioDesempenho[usuarioId] || {
                    acertosF: 0,
                    totalF: 0,
                    acertosM: 0,
                    totalM: 0,
                    acertosD: 0,
                    totalD: 0
                };
    
                usuarioDesempenho[usuarioId].acertosF += data.facil.acertos;
                usuarioDesempenho[usuarioId].totalF += data.facil.total;
                usuarioDesempenho[usuarioId].acertosM += data.medio.acertos;
                usuarioDesempenho[usuarioId].totalM += data.medio.total;
                usuarioDesempenho[usuarioId].acertosD += data.dificil.acertos;
                usuarioDesempenho[usuarioId].totalD += data.dificil.total;
            });
    
            for (const usuarioId in usuarioDesempenho) {
                const { acertosF, totalF, acertosM, totalM, acertosD, totalD } = usuarioDesempenho[usuarioId];
                const totalQuestoes = totalF + totalM + totalD;
    
                if (totalQuestoes >= 10) {
                    const desempenhoTotal = calcularDesempenho(acertosF, acertosM, acertosD, totalF, totalM, totalD);
    
                    console.log(`Usuário: ${usuarioId}, Total Fácil: ${totalF}, Acertos Fácil: ${acertosF}, Total Médio: ${totalM}, Acertos Médio: ${acertosM}, Total Difícil: ${totalD}, Acertos Difícil: ${acertosD}`);
    
                    desempenhos.push({
                        usuarioId: usuarioId,
                        desempenho: desempenhoTotal,
                        nomeCompleto: `${usuarios[usuarioId].nome} ${usuarios[usuarioId].sobrenome}`,
                        totalQuestoes: totalQuestoes
                    });
                }
            }
    
            desempenhos.sort((a, b) => b.desempenho - a.desempenho);
            setRankings(desempenhos);

        };
    
        fetchRankings();
    }, []);

    const calcularDesempenho = (acertosF, acertosM, acertosD, totalF, totalM, totalD) => {
        return ((acertosF * 5) + (acertosM * 3) + (acertosD * 1)) / ((totalF * 5) + (totalM * 3) + (totalD * 1)) * 100;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>Ranking de Usuários</Text>
                {rankings.map((usuario, index) => (
                <View key={index} style={styles.usuarioContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.nomeCompleto}>{usuario.nomeCompleto}</Text>
                        <Text style={styles.totalQuestoes}>Questões Feitas: {usuario.totalQuestoes}</Text>
                    </View>
                    <Text style={styles.desempenho}>{usuario.desempenho.toFixed(0)}%</Text>
                    
                </View>
                
            ))}
            <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('Welcome'); }}>
                <Text style={styles.buttonTextWelcome}>Início</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonWelcome: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        alignSelf: 'center', 
    },
    buttonTextWelcome: {
        color: 'rgba(132, 53, 222, 1)',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#342E37', 
    },
    title: {
        fontSize: 32,
        color: '#F7F7FF',
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    usuarioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(132, 53, 222, 0.8)',
        borderRadius: 10, 
        padding: 15,
        marginVertical: 8,
        width: '90%', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    nomeCompleto: {
        fontSize: 20,
        color: '#F7F7FF',
        fontWeight: 'bold',
    },
    totalQuestoes: {
        fontSize: 16,
        color: '#CFCFCF',
        marginTop: 4,
    },
    desempenho: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#76E880', 
    },
});

