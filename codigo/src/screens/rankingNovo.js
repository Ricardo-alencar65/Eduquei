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
        <View style={styles.leaderboardScreen}>
                      <ScrollView style={styles.scrollViewStyle}>

            <View style={styles.overlapGroupWrapper}>
                <View style={styles.overlapGroup}>
                    <Image style={styles.rectangle} source={require('../../assets/Rectangle1.png')} />
                    <Image style={styles.imgCoroa} source={require('../../assets/coroa.png')} />

                    <Image style={styles.img} source={require('../../assets/Rectangle2.png')} />
                    <Image style={styles.ellipse} source={require('../../assets/iconeAnonimo.jpeg')} />
                    <Image style={styles.ellipse2} source={require('../../assets/iconeAnonimo.jpeg')} />
                    <Image style={styles.ellipse3} source={require('../../assets/iconeAnonimo.jpeg')} />
                    <Text style={styles.textWrapper}>Ranking</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={styles.materialSymbols} source={require('../../assets/left.png')} />
                </TouchableOpacity>
                    {rankings.map((ranking, index) => {
                        if (index < 3) {
                            let nomeStyle = {};
                            let porcentagemStyle = {};
                            const ellipseWidth = 96;
                            const textWidth = 150;

                            if (index === 0) {
                                const leftPosition = 167 + (ellipseWidth / 2) - (textWidth / 2);
                                nomeStyle = { ...styles.nameText, top: 208, left: leftPosition, width: textWidth, textAlign: 'center' };
                                porcentagemStyle = { ...styles.porcentagemText, top: 228, left: leftPosition, width: textWidth, textAlign: 'center' };
                            } else if (index === 1) {
                                const leftPosition = 290 + (ellipseWidth / 2) - (textWidth / 2);
                                nomeStyle = { ...styles.nameText, top: 255, left: leftPosition, width: textWidth, textAlign: 'center' };
                                porcentagemStyle = { ...styles.porcentagemText, top: 270, left: leftPosition, width: textWidth, textAlign: 'center' };
                            } else if (index === 2) {
                                const leftPosition = 50 + (ellipseWidth / 2) - (textWidth / 2);
                                nomeStyle = { ...styles.nameText, top: 255, left: leftPosition, width: textWidth, textAlign: 'center' };
                                porcentagemStyle = { ...styles.porcentagemText, top: 270, left: leftPosition, width: textWidth, textAlign: 'center' };
                            }

                            return (
                                <React.Fragment key={ranking.usuarioId}>
                                    <Text style={nomeStyle}>
                                        {ranking.nomeCompleto}
                                    </Text>
                                    <Text style={porcentagemStyle}>
                                        {`${ranking.desempenho.toFixed(2)}%`}
                                    </Text>
                                </React.Fragment>
                            );
                        } else {
                            // Ajustes para os rankings a partir do 4º lugar
                            const topPositionRectangle = 400 + (index - 3) * (64 + 30); // Posicionamento do retângulo

                            return (
                              <View key={ranking.usuarioId} style={{...styles.rectangleStyle, top: topPositionRectangle}}>
                                  <Text style={styles.rankInsideRectangle}>
                                      {index + 1}
                                  </Text>
                                  <Text style={styles.nameInsideRectangle}>
                                      {ranking.nomeCompleto}
                                  </Text>
                                  <Text style={styles.percentInsideRectangle}>
                                      {`${ranking.desempenho.toFixed(2)}%`}
                                  </Text>
                              </View>
                          );
                      }
                  })}
                </View>
            </View>
            </ScrollView>

        </View>
    );
};
    const styles = StyleSheet.create({
      scrollViewStyle: {
        width: '100%',
    },
    imgCoroa: {
      position: 'absolute',
      width: 26, // Largura da coroa
      height: 20.795, // Altura da coroa
      top: 107 - (20.795 / 2) - 15,// Posiciona acima do círculo do primeiro lugar
      left: 167 + (96 / 2) - (26 / 2), // Centraliza em relação ao círculo
      zIndex: 1, // Garante que a coroa fique acima do círculo
      flexShrink: 0, // Impede o redimensionamento automático da imagem
  },
        leaderboardScreen: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        },
        nameText: {
          position: 'absolute',
          color: '#ffffff',
          fontWeight: 'bold',
      },
      porcentagemText: {
          position: 'absolute',
          color: '#ffffff',
      },
      rankInsideRectangle: {
        position: 'relative',
        color: '#000',
        fontSize:17,
        fontWeight: 'bold',
        top: 21, // Ajuste a posição conforme necessário
        left: 20, // Ajuste a posição conforme necessário
        // Outros estilos para o índice de classificação
    },
  
      // Estilos para os demais rankings
      rectangleStyle: {
        position: 'absolute',
        left: 23,
        width: 383,
        height: 64,
        borderRadius: 20,
        backgroundColor: '#FFF',
        flexShrink: 0,
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        padding: 10, // Espaçamento interno
    },
    nameInsideRectangle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 17,
        left: 85,
        top:0, // Ajuste conforme necessário
        // Outros estilos para o nome
    },
    percentInsideRectangle: {
        color: '#000',
        left: 300, // Ajuste conforme necessário
        bottom:20 // Espaço acima da porcentagem para separá-la do nome
        // Outros estilos para a porcentagem
    },
      ellipse1: { top: 208, left: 167 },
      ellipse2: { bottom: 400, left: 74 }, // Ajuste esses valores conforme necessário
      ellipse3: { top: 254, left: 70 }, // Ajuste esses valores conforme necessário
        overlapGroupWrapper: {
          width: 430,
          height: 932,

        },
        overlapGroup: {
          position: 'relative',
          height: 932,
        },
        rectangle: {
          position: 'absolute',
          width: 430,
          height: 603,
          top: 329,
          left: 0,
        },
        div: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 423,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle2: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 517,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle3: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 611,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle4: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 705,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle5: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 799,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        img: {
          position: 'absolute',
          width: 430,
          height: 384,
          top: 0,
          left: 0,
        },
        ellipse: {
          position: 'absolute',
          width: 96,
          height: 96,
          top: 107,
          left: 167,
          borderWidth: 5, // Largura da borda
          borderColor: 'gold', // Cor da borda para o primeiro lugar (amarelo ouro)
          borderRadius: 60, // Metade da largura/altura do círculo para torná-lo redondo
        },
        ellipse2: {
          position: 'absolute',
          width: 84,
          height: 84,
          top: 165,
          left: 53,
          borderWidth: 5, // Largura da borda
          borderColor: '#cd7f32', // Cor da borda para o segundo lugar (prata)
          borderRadius: 60, // Metade da largura/altura do círculo para torná-lo redondo
      },
        ellipse3: {
          position: 'absolute',
          width: 84,
          height: 84,
          top: 165,
          left: 293,
          borderWidth: 5, // Largura da borda
          borderColor: 'silver', // Cor da borda para o terceiro lugar (bronze)
          borderRadius: 60, // Metade da largura/altura do círculo para torná-lo redondo
        },
        textWrapper: {
          position: 'absolute',
          top: 40,
          left: 170,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 24,
        },
        materialSymbols: {
          position: 'absolute',
          width: 44,
          height: 44,
          top: 30,
          left: 15,
          tintColor: '#ffffff',

        },
        textWrapper2: {
          position: 'absolute',
          top: 207,
          left: 183,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 12,
        },
        textWrapper3: {
          position: 'absolute',
          top: 226,
          left: 205,
          color: '#ffffff',
          fontSize: 10,
        },
        textWrapper4: {
          position: 'absolute',
          top: 253,
          left: 70,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 12,
        },
        textWrapper5: {
          position: 'absolute',
          top: 253,
          left: 314,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 12,
        },
        textWrapper6: {
          position: 'absolute',
          top: 272,
          left: 84,
          color: '#ffffff',
          fontSize: 10,
        },
        textWrapper7: {
          position: 'absolute',
          top: 272,
          left: 325,
          color: '#ffffff',
          fontSize: 10,
        },
        ellipse4: {
          position: 'absolute',
          width: 14,
          height: 14,
          top: 193,
          left: 208,
          backgroundColor: '#ffd912',
          borderRadius: 7,
        },
        ellipse5: {
          position: 'absolute',
          width: 14,
          height: 14,
          top: 240,
          left: 328,
          backgroundColor: '#004643',
          borderRadius: 7,
        },
        textWrapper8: {
          position: 'absolute',
          top: 238,
          left: 332,
          fontWeight: '500',
          color: '#ffffff',
          fontSize: 10,
        },
        ellipse6: {
          position: 'absolute',
          width: 14,
          height: 14,
          top: 240,
          left: 88,
          backgroundColor: '#004643',
          borderRadius: 7,
        },
        textWrapper9: {
          position: 'absolute',
          top: 238,
          left: 93,
          color: '#ffffff',
          fontSize: 10,
        },
        textWrapper10: {
          position: 'absolute',
          top: 191,
          left: 213,
          color: '#ffffff',
          fontSize: 10,
        },
        group: {
          position: 'absolute',
          width: 26,
          height: 21,
          top: 86,
          left: 202,
        },
        textWrapper11: {
            position: 'absolute',
            top: 438,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper12: {
            position: 'absolute',
            top: 532,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper13: {
            position: 'absolute',
            top: 626,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper14: {
            position: 'absolute',
            top: 720,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper15: {
            position: 'absolute',
            top: 814,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper16: {
            position: 'absolute',
            top: 443,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper17: {
            position: 'absolute',
            top: 537,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper18: {
            position: 'absolute',
            top: 631,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper19: {
            position: 'absolute',
            top: 725,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper20: {
            position: 'absolute',
            top: 819,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper21: {
            position: 'absolute',
            top: 443,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper22: {
            position: 'absolute',
            top: 537,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper23: {
            position: 'absolute',
            top: 631,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper24: {
            position: 'absolute',
            top: 725,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper25: {
            position: 'absolute',
            top: 819,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          maskGroup: {
            position: 'absolute',
            width: 40,
            height: 40,
            top: 435,
            left: 60,
          },
          maskGroup2: {
            position: 'absolute',
            top: 529,
            left: 60,
            width: 40,
            height: 40,
          },
          maskGroup3: {
            position: 'absolute',
            top: 623,
            left: 60,
            width: 40,
            height: 40,
          },
          maskGroup4: {
            position: 'absolute',
            top: 717,
            left: 60,
            width: 40,
            height: 40,
          },
          maskGroup5: {
            position: 'absolute',
            top: 811,
            left: 60,
            width: 40,
            height: 40,
          },
      });
      