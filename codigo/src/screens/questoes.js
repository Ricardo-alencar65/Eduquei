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
            const areaId = route.params?.areaId; // Pega o areaId passado pelos parâmetros da navegação
            const questoesRef = collection(db, "questoes");
            const q = areaId ? query(questoesRef, where("areaId", "==", areaId)) : questoesRef; // Filtra as questões pela área se areaId estiver definido
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
            // Documento não existe, criar um novo
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
            // Documento existe, pegar sua referência
            docRef = querySnapshot.docs[0].ref;
        }
    
        // Atualizar as contagens com base na dificuldade da questão
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
            
            // Essa checagem deve ser feita antes de tentar acessar areaId da questão atual.
            if (!usuarioId) {
                console.error("O usuário não está logado.");
                return;
            }
            
            if (currentQuestionIndex < questoes.length - 1) {
                const acertou = selectedAnswer === questoes[currentQuestionIndex].correct;
                const areaId = questoes[currentQuestionIndex].areaId; // Utiliza o areaId diretamente da questão
                
                // A checagem de typeof areaId === 'undefined' é desnecessária aqui,
                // pois você já está garantindo que ele está definido ao carregar as questões.
                await atualizarDesempenhoDoUsuario(areaId, questoes[currentQuestionIndex].dificuldade, acertou);
    
                // Atualiza o índice para a próxima questão
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null); // Reseta a resposta selecionada
                setShowResults(false); // Oculta os resultados
            } else {
                // Se não houver mais questões, mostra os resultados
                setShowResults(true);
            }
            // Essa linha deve ser removida, pois você já resetou selectedAnswer acima.
            // setSelectedAnswer(null); 
        } catch (error) {
            console.error("Erro ao atualizar desempenho:", error);
        }
    };
    const buttonStyle = (answer) => {
        let style = {
            ...styles.buttonLong,
            marginTop: answer === currentQuestion?.options[0] ? 20 : 10,
        };
        if (selectedAnswer === answer) {
            style.backgroundColor = answer === currentQuestion.correct ? 'green' : 'red';
        }
        return style;
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
    buttonWelcome: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 20,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '60%', // Define uma largura para o botão
        alignSelf: 'center', // Centraliza o botão no container
    },
    buttonTextWelcome: {
        color: 'rgba(132, 53, 222, 1)', // Cor roxa para combinar com o tema
        fontSize: 18,
        fontWeight: 'bold',
    },
    quizTitle: {
        color: "#ffffff",
        paddingTop: 40, 
        paddingBottom: 20, 
        fontSize: 32,
        textAlign: 'center',
    },
    questionTitle: {
        color: "#fff",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20, 
    },
    buttonLong: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 25, 
        width: '80%', 
        marginHorizontal: 10,
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#34eb40', 
        borderRadius: 25,
        width: '80%',
        marginVertical: 20,
    },
    nextButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultsButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#eb4034', 
        borderRadius: 25,
        width: '80%',
        marginVertical: 20,
    },
    resultsButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageWelcome: {
        maxWidth: '90%',
        resizeMode: 'contain',
        paddingTop: 50,
    },
    boxWelcome: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start", 
    },
});
