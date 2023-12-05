import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PerformanceBar = ({ percentual }) => {
  let backgroundColor;
  if (percentual > 70) {
      backgroundColor = 'green';
  } else if (percentual > 50) {
      backgroundColor = 'orange';
  } else {
      backgroundColor = 'red';
  }

  return (
      <View style={styles.performanceBarContainer}>
          <View style={{...styles.performanceBar, width: `${percentual}%`, backgroundColor}} />
          <Text style={styles.performanceText}>{percentual}%</Text>
      </View>
  );
};

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
                  <PerformanceBar percentual={parseInt(percentual)} />
              </View>
          ))}
          <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('Welcome'); }}>
              <Text style={styles.buttonTextWelcome}>Início</Text>
          </TouchableOpacity>
      </View>
  );
  }

  const styles = StyleSheet.create({
    performanceBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
  },
  performanceBar: {
      height: 20,
      borderRadius: 10,
  },
  performanceText: {
      marginLeft: 10,
      color: '#fff',
  },
    container: {
        flex: 1,
        backgroundColor: "#1c1c1c",
        paddingTop: 40,
    },
    title: {
        fontSize: 34,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tab: {
        backgroundColor: '#8453DE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
        shadowColor: '#8453DE',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    tabText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#6C5B7B',
        width: '90%',
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        alignSelf: 'center',
        shadowColor: '#6C5B7B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 6,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardContent: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 5,
    },
    buttonWelcome: {
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 20,
        width: '60%',
        alignSelf: 'center',
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonTextWelcome: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
      backgroundColor: '#6C5B7B',
      width: '90%',
      borderRadius: 20,
      padding: 20,
      marginVertical: 10,
      alignSelf: 'center',
      shadowColor: '#6C5B7B',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 6,
      flexDirection: 'row',
      alignItems: 'center',
  },
  cardIcon: {
      width: 40,
      height: 40,
      marginRight: 10,
      // Inserir uma imagem representativa para cada área aqui
  },
  cardContent: {
      flex: 1,
  },
  cardTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  performanceBar: {
      height: 20,
      borderRadius: 10,
      // A cor da barra de desempenho será definida dinamicamente com base na porcentagem
  },
  performanceText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
  },
  });
