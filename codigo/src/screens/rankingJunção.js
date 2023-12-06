import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

export default function RankingJuncao({ navigation }) {
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
        <View style={styles.leaderboardScreen}>
            <ScrollView>
                <View style={styles.overlapGroupWrapper}>
                    <View style={styles.overlapGroup}>
                        <Image style={styles.rectangle} source={require('../../assets/Rectangle1.png')} />
                        
                        {/* Exibição do cabeçalho do ranking */}
                        <Image style={styles.img} source={require('../../assets/Rectangle2.png')} />
                        <Text style={styles.textWrapper}>Leaderboard</Text>

                        {/* Itere sobre cada usuário no ranking */}
                        {rankings.map((usuario, index) => (
                            <View key={index} style={styles.rankItem}>
                                {/* Avatar do usuário */}
                                <Image style={styles.userAvatar} source={require('../../assets/iconeAnonimo.jpeg')} />

                                {/* Nome e posição do usuário */}
                                <Text style={styles.userName}>{usuario.nomeCompleto}</Text>
                                <Text style={styles.userPosition}>{index + 1}</Text>

                                {/* Desempenho do usuário */}
                                <Text style={styles.userScore}>{usuario.desempenho.toFixed(0)}%</Text>
                            </View>
                        ))}

                        {/* Adicione outros elementos estáticos conforme necessário */}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    leaderboardScreen: {
        flex: 1,
        backgroundColor: '#eff0f3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlapGroupWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlapGroup: {
        width: '90%',
        maxWidth: 500,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rectangle: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 15,
        marginVertical: 10,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 10,
    },
    textWrapper: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginVertical: 10,
    },
    rankItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 15,
    },
    userPosition: {
        fontSize: 14,
        color: '#000000',
        marginRight: 15,
    },
    userScore: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004643',
    },
    group: {
        width: 26,
        height: 21,
        marginVertical: 10,
    },
    ellipse: {
        width: 84,
        height: 84,
        borderRadius: 42,
    },
    textWrapperRanking: {
        fontWeight: '600',
        color: '#000000',
        fontSize: 20,
    },
    textWrapperName: {
        fontWeight: '500',
        color: '#000000',
        fontSize: 14,
    },
    textWrapperScore: {
        fontWeight: '500',
        color: '#000000',
        fontSize: 14,
    },
    maskGroup: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    
        leaderboardScreen: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        },
        overlapGroupWrapper: {
          width: 430,
          height: 932,
          // Nota: React Native não suporta background images da mesma forma que o CSS
          // Você terá que usar um componente ImageBackground para isso
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
        },
        ellipse2: {
          position: 'absolute',
          width: 84,
          height: 84,
          top: 165,
          left: 53,
          // objectFit: 'cover', // objectFit não é suportado em React Native
        },
        ellipse3: {
          position: 'absolute',
          width: 84,
          height: 84,
          top: 165,
          left: 293,
        },
        textWrapper: {
          position: 'absolute',
          top: 19,
          left: 153,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 22,
        },
        materialSymbols: {
          position: 'absolute',
          width: 44,
          height: 44,
          top: 15,
          left: 23,
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
