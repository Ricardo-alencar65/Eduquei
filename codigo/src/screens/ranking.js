import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function RankingNovo({ navigation }) {
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
                desempenhos.push({
                    usuarioId: usuarioId,
                    desempenho: desempenhoTotal,
                    nomeCompleto: `${usuarios[usuarioId]?.nome || ''} ${usuarios[usuarioId]?.sobrenome || ''}`,
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
        <View style={styles.container}>
            <Text style={styles.title}>Ranking de Usuários</Text>

            <ScrollView style={styles.scrollView}>
                {rankings.map((usuario, index) => (
                    <View key={index} style={styles.usuarioContainer}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.nomeCompleto}>{usuario.nomeCompleto}</Text>
                            <Text style={styles.totalQuestoes}>Questões Feitas: {usuario.totalQuestoes}</Text>
                        </View>
                        <Text style={styles.desempenho}>{usuario.desempenho.toFixed(0)}%</Text>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.buttonWelcome} onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.buttonTextWelcome}>Início</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWelcome: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        marginVertical: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        alignSelf: 'center', 
    },
    buttonTextWelcome: {
        color: 'rgba(132, 53, 222, 1)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', // Ajuste para alinhar ao topo
        backgroundColor: '#342E37',
    },
    scrollView: {
        width: '100%', // Ajuste para ocupar a largura total
    },
    title: {
        fontSize: 35,
        color: '#F7F7FF',
        marginBottom: 35,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    usuarioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(132, 53, 222, 0.8)',
        borderRadius: 15, 
        padding: 20,
        marginVertical: 10,
        width: '95%', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
        infoContainer: {
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
        },
        nomeCompleto: {
            fontSize: 24,
            color: '#FFFFFF',
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10
        },
        totalQuestoes: {
            fontSize: 20,
            color: '#A9A9A9',
            marginTop: 10,
        },
        desempenho: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#32CD32',
        },
    })