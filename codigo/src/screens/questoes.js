import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getFirestore, doc, setDoc, updateDoc, collection, query, where, getDocs, increment } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Questoes({ route, navigation }) {
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
        <View style={styles.boxWelcome}>
            <Text style={styles.quizTitle}>Quiz Conhecimentos Gerais</Text>
            {currentQuestion && (
                <>
                    <Text style={styles.questionTitle}>{currentQuestion.question}</Text>
                    {currentQuestion.options.map((answer, index) => (
    <TouchableOpacity
        key={index}
        style={buttonStyle(answer)}
        onPress={() => handlePress(answer)}
        disabled={selectedAnswer !== null}
    >
        <Text style={styles.buttonText}>{answer}</Text>
    </TouchableOpacity>
))}
                </>
            )}
            {selectedAnswer && !showResults && (
                <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
                    <Text style={styles.nextButtonText}>Próxima Questão</Text>
                </TouchableOpacity>
            )}
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
            <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('EscolhaAreaScreen'); }}>
                <Text style={styles.buttonTextWelcome}>Escolher outra area</Text>
            </TouchableOpacity>
            
            <Image style={styles.imageWelcome} source={require('../../assets/quiz.png')} alt="Imagem da pergunta" />
        </View>
    );
}

const styles = StyleSheet.create({
    boxWelcome: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#1c1c1c", // Fundo escuro
    },
    quizTitle: {
        color: "#ffffff",
        paddingTop: 40,
        paddingBottom: 20,
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    questionTitle: {
        color: "#ffffff",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },
    buttonLong: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: '#8453DE',
        borderRadius: 25,
        width: '80%',
        marginVertical: 10,
        textAlign: 'center',
        shadowColor: '#8453DE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButton: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        backgroundColor: '#34eb40',
        borderRadius: 25,
        width: '80%',
        marginVertical: 20,
        shadowColor: '#34eb40',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    nextButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultsButton: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        backgroundColor: '#eb4034',
        borderRadius: 25,
        width: '80%',
        marginVertical: 20,
        shadowColor: '#eb4034',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    resultsButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageWelcome: {
        width: 250,
        height: 130,
        resizeMode: 'contain',
        marginTop: 10,
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
});
