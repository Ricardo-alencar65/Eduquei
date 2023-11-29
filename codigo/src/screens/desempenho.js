import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerformanceScreen({navigation}) {
    const [desempenhos, setDesempenhos] = useState({});

    useEffect(() => {
        const fetchDesempenho = async () => {
         
          const userId = await AsyncStorage.getItem('userId');
          console.log('ID do usuário (AsyncStorage):', userId);
      
          if (userId) {
            try {
              const db = getFirestore();
              const q = query(collection(db, "desempenho"), where("usuarioId", "==", userId));
              const querySnapshot = await getDocs(q);
              
              const desempenhoData = {};
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                const areaId = data.areaId;
                const areaName = mapearAreaIdParaNome(areaId);
                const acertos = data.facil.acertos + data.medio.acertos + data.dificil.acertos;
                const total = data.facil.total + data.medio.total + data.dificil.total;
      
                
                console.log(`Área: ${areaName}, Questões respondidas faceis: ${data.facil.total}, Acertos faceis: ${data.facil.acertos},  
                Questões respondidas medio: ${data.medio.total}, Acertos faceis: ${data.medio.acertos},  
                Questões respondidas dificil: ${data.dificil.total}, Acertos faceis: ${data.dificil.acertos}`);
      
                desempenhoData[areaName] = calcularPorcentagem(data.facil.acertos, data.medio.acertos, data.dificil.acertos, data.facil.total, data.medio.total, data.dificil.total);
              });
              
              console.log('Desempenho calculado:', desempenhoData);
              setDesempenhos(desempenhoData);
            } catch (error) {
              console.error('Erro ao buscar desempenho:', error);
            }
          } else {
            console.log('Nenhum usuário logado.');
          }
        };
      
        fetchDesempenho();
      }, []);

  const calcularPorcentagem = (acertosF, acertosM, acertosD, totalF, totalM, totalD) => {
    return (((acertosF * 5) + (acertosM * 3) + (acertosD * 1)) / ((totalF * 5) + (totalM * 3) + (totalD * 1)) * 100).toFixed(0) + '%';
  };

  const mapearAreaIdParaNome = (areaId) => {
    const areas = {
      '01': 'Entretenimento',
      '02': 'Esportes',
      '03': 'Ciências e Tecnologia',
      '04': 'Atualidades',
      '05': 'História'
    };
    return areas[areaId] || 'Área Desconhecida';
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Desempenho</Text>
        {Object.entries(desempenhos).map(([area, percentual], index) => (
            <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{area}:</Text>
                <Text style={styles.cardContent}>{percentual}</Text>
            </View>
        ))}
        <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('Welcome'); }}>
            <Text style={styles.buttonTextWelcome}>Início</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 30,
    },
    card: {
        backgroundColor: 'rgba(132, 53, 222, 0.8)',
        width: '80%',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContent: {
        color: '#fff',
        fontSize: 18,
        marginTop: 5,
    },
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

});