import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getFirestore, doc, setDoc, updateDoc, collection, query, where, getDocs, increment } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaQuestao({ route, navigation }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [questoes, setQuestoes] = useState([]);
    const [usuarioId, setUsuarioId] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsuarioId(user.uid);
            } else {
                setUsuarioId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchQuestionsAndUser = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setUsuarioId(userId);

            const db = getFirestore();
            const areaId = route.params?.areaId; 
            const questoesRef = collection(db, "questoes");
            const q = areaId ? query(questoesRef, where("areaId", "==", areaId)) : questoesRef; 
            const querySnapshot = await getDocs(q);
            const questoesArray = [];

            querySnapshot.forEach((doc) => {
                const questaoData = doc.data();
                questoesArray.push({
                    question: questaoData.pergunta,
                    options: [
                        questaoData.alternativa1,
                        questaoData.alternativa2,
                        questaoData.alternativa3,
                        questaoData.alternativa4,
                        questaoData.alternativa5
                    ],
                    correct: questaoData.respCorreta,
                    areaId: questaoData.areaId,
                    dificuldade: questaoData.dificuldade
                });
            });
            setQuestoes(questoesArray);
        };

        fetchQuestionsAndUser();
    }, [route.params?.areaId]);

    

    const atualizarDesempenhoDoUsuario = async (areaId, dificuldade, acertou) => {
        console.log("usuarioId:", usuarioId);
    console.log("areaId:", areaId);
        if (!usuarioId) return;
    
        const db = getFirestore();
        const desempenhoRef = collection(db, 'desempenho');
        const q = query(desempenhoRef, where('usuarioId', '==', usuarioId), where('areaId', '==', areaId));
        const querySnapshot = await getDocs(q);
    
        let docRef;
        if (querySnapshot.empty) {
            
            docRef = doc(collection(db, 'desempenho'));
            const novoDesempenho = {
                usuarioId,
                areaId,
                facil: { acertos: 0, total: 0 },
                medio: { acertos: 0, total: 0 },
                dificil: { acertos: 0, total: 0 }
            };
            await setDoc(docRef, novoDesempenho);
        } else {
            
            docRef = querySnapshot.docs[0].ref;
        }
    
        
        const nivelDificuldade = dificuldade === 1 ? 'facil' : dificuldade === 2 ? 'medio' : 'dificil';
        const atualizacoes = { [`${nivelDificuldade}.total`]: increment(1) };
        if (acertou) {
            atualizacoes[`${nivelDificuldade}.acertos`] = increment(1);
        }
    
        await updateDoc(docRef, atualizacoes);
    };

    const handlePress = (answer) => {
        console.log("Resposta selecionada:", answer);
        setSelectedAnswer(answer);
    };

    const goToNextQuestion = async () => {
        try {
            console.log("Indo para a próxima questão, índice atual:", currentQuestionIndex);
            
            
            if (!usuarioId) {
                console.error("O usuário não está logado.");
                return;
            }
            
            if (currentQuestionIndex < questoes.length - 1) {
                const acertou = selectedAnswer === questoes[currentQuestionIndex].correct;
                const areaId = questoes[currentQuestionIndex].areaId; 
                
                
                await atualizarDesempenhoDoUsuario(areaId, questoes[currentQuestionIndex].dificuldade, acertou);
    
                
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null); 
                setShowResults(false); 
            } else {
                setShowResults(true);
            }
        } catch (error) {
            console.error("Erro ao atualizar desempenho:", error);
        }
    };
    const buttonStyle = (answer) => {
        const isCorrectAnswer = answer === currentQuestion.correct;
        const isSelectedAnswer = answer === selectedAnswer;
        let backgroundColor;
    
        if (selectedAnswer) {
            if (isSelectedAnswer && isCorrectAnswer) {
                backgroundColor = 'green'; // Resposta correta
            } else if (isSelectedAnswer && !isCorrectAnswer) {
                backgroundColor = 'red'; // Resposta errada
            } else if (!isSelectedAnswer && isCorrectAnswer) {
                backgroundColor = 'green'; // Mostrar a resposta correta
            } else {
                backgroundColor = '#8453DE'; // Cor padrão para as outras opções
            }
        } else {
            backgroundColor = '#8453DE'; // Cor padrão antes de selecionar uma resposta
        }
    
        return {
            ...styles.buttonLong,
            backgroundColor,
            marginTop: answer === currentQuestion?.options[0] ? 20 : 10,
        };
    };

    const mapearCategoriaParaAreaId = (categoria) => {
        const mapeamento = {
            'entretenimento': '01',
            'esportes': '02',
            'ciencia e tecnologia': '03',
            'atualidades': '04',
            'historia': '05',
            
        };
        return mapeamento[categoria];
    };

    const currentQuestion = questoes[currentQuestionIndex];

    return (
        <View style={styles.quizScreen}>
            <View style={styles.div}>
                {/* Exibição da pergunta atual */}
                {currentQuestion && (
                    <View style={styles.overlapGroup}>
                        <View style={styles.rectangle}></View>
                        <View style={styles.ellipse}></View>
                        <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    </View>
                )}
    
                {/* Opções de resposta */}
                {currentQuestion && currentQuestion.options.map((answer, index) => (
                    <TouchableOpacity
                        key={index}
                        style={selectedAnswer === answer ? styles.selectedOption : styles.option}
                        onPress={() => handlePress(answer)}
                        disabled={selectedAnswer !== null}
                    >
                        <Text style={styles.optionText}>{answer}</Text>
                    </TouchableOpacity>
                ))}
    
                {/* Botão para a próxima questão */}
                {selectedAnswer && !showResults && (
                    <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
                        <Text style={styles.nextButtonText}>Próxima</Text>
                    </TouchableOpacity>
                )}
    
                {/* Exibição dos resultados */}
                {showResults && (
                    <TouchableOpacity
                        style={styles.resultsButton}
                        onPress={() => {
                            console.log('Navegando para Desempenho');
                            navigation.navigate('Desempenho');
                        }}
                    >
                        <Text style={styles.resultsButtonText}>Ver Desempenho</Text>
                    </TouchableOpacity>
                )}
    
                {/* Botão para escolher outra área */}
                <TouchableOpacity style={styles.anotherAreaButton} onPress={() => { navigation.navigate('EscolhaAreaScreen'); }}>
                    <Text style={styles.anotherAreaButtonText}>Escolher outra área</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    quizScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eff0f3',
    },
    div: {
        width: '90%',
        maxWidth: 500,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    overlapGroup: {
        width: '100%',
        marginBottom: 20,
    },
    rectangle: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 15,
    },
    ellipse: {
        width: 70,
        height: 70,
        backgroundColor: '#abd1c6',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -35,
        left: '50%',
        marginLeft: -35,
        borderWidth: 3,
        borderColor: '#ffffff',
    },
    questionText: {
        fontSize: 18,
        color: '#004643',
        textAlign: 'center',
        marginVertical: 20,
    },
    option: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
        width: '100%',
    },
    selectedOption: {
        backgroundColor: '#abd1c6',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
        width: '100%',
    },
    optionText: {
        fontSize: 16,
        color: '#004643',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#004643',
        padding: 15,
        borderRadius: 20,
        marginTop: 20,
        width: '100%',
    },
    nextButtonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    resultsButton: {
        backgroundColor: '#eb4034',
        padding: 15,
        borderRadius: 20,
        marginTop: 10,
        width: '100%',
    },
    resultsButtonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    anotherAreaButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 20,
        marginTop: 20,
        width: '60%',
    },
    anotherAreaButtonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
});