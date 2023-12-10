import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Image 
              style={styles.backIcon} 
              source={require('../../assets/left.png')} 
              resizeMode="contain" 
            />
            <Text style={styles.backButtonText}>Anterior</Text>
        </TouchableOpacity>       
        <Text style={styles.title}>Desempenho</Text>
          {Object.entries(desempenhos).map(([area, percentual], index) => (
              <View key={index} style={styles.card}>
                  <Text style={styles.cardTitle}>{area}:</Text>
                  <PerformanceBar percentual={parseInt(percentual)} />
              </View>
          ))}
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
    backgroundColor: "#eff0f3", // Cor de fundo
    paddingTop: 40, // Espaço no topo
    alignItems: 'center',
    justifyContent: 'flex-start',
},
backButton: {
    position: 'absolute',
    top: 30, // Ajuste conforme necessário para descer o botão
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
},
backIcon: {
    width: 20, 
    height: 20, 
    tintColor: '#004643', // Cor da seta
    marginRight: 10,
},
backButtonText: {
    color: '#004643', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
},
title: {
    fontSize: 32, 
    color: '#004643', // Cor do título
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
},
card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
},
cardTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
},

performanceBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Alinha a barra à esquerda
    width: '100%', 
    backgroundColor: '#abd1c6', 
    borderRadius: 10,
    overflow: 'hidden', 
    marginLeft: '3%', // Ajuste para mover a barra mais para a esquerda
    marginRight: '5%',
},
performanceBar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#004643', // Cor da barra
    maxWidth: '100%', // Limita a largura máxima a 100%
},
performanceText: {
    color: '#004643',
    fontWeight: 'bold',
    position: 'absolute', // Posiciona o texto sobre a barra
    right: 10, // Posiciona o texto à direita
},
buttonWelcome: {
    backgroundColor: '#004643',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
    shadowColor: '#004643',
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
});