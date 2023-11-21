import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const questions = [
  {
    question: "Qual é o planeta mais próximo do Sol?",
    options: ['Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter'],
    correct: 'Mercúrio',
  },
  {
    question: "Complete: 'Lua de ____'",
    options: ['Sol', 'Cristal', 'Marte', 'Júpiter', 'Mel'],
    correct: 'Mel',
  },
  // ... Add more questions as needed
];

export default function Questoes({ navigation }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handlePress = (answer) => {
        setSelectedAnswer(answer);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null); // Reset the selected answer
            setShowResults(false); // Hide results when moving to the next question
        } else {
            // No more questions, show results
            setShowResults(true);
        }
    };

    const viewPerformance = () => {
        // Logic to view performance can be added here
        // For now, just log to the console
        console.log('View performance');
    };

    const buttonStyle = (answer) => {
        let style = {
            ...styles.buttonLong,
            marginTop: answer === currentQuestion.options[0] ? 20 : 10, // Adjusted margin for the first button
        };
        if (selectedAnswer === answer) {
            style.backgroundColor = answer === currentQuestion.correct ? 'green' : 'red';
        }
        return style;
    };

    return (
        <View style={styles.boxWelcome}>
            <Text style={styles.quizTitle}>Quiz Conhecimentos Gerais</Text>
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
            {selectedAnswer && !showResults && (
                <TouchableOpacity style={styles.nextButton} onPress={goToNextQuestion}>
                    <Text style={styles.nextButtonText}>Próxima Questão</Text>
                </TouchableOpacity>
            )}
            {showResults && (
                <TouchableOpacity style={styles.resultsButton} onPress={viewPerformance}>
                    <Text style={styles.resultsButtonText}>Ver Desempenho</Text>
                </TouchableOpacity>
            )}
            <Image style={styles.imageWelcome} source={require('../../assets/quiz.png')} alt="Imagem da pergunta" />
        </View>
    );
}

const styles = StyleSheet.create({
    quizTitle: {
        color: "#ffffff",
        paddingTop: 40, // Reduced padding
        paddingBottom: 20, // Added some padding at the bottom
        fontSize: 32,
        textAlign: 'center',
    },
    questionTitle: {
        color: "#fff",
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20, // Added margin to separate from the answers
    },
    buttonLong: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 25, // Made the buttons a bit rounder
        width: '80%', // Made buttons a bit wider
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
        backgroundColor: '#34eb40', // A more noticeable color for the next question button
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
        backgroundColor: '#eb4034', // A distinct color for the results button
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
        justifyContent: "flex-start", // Adjusted alignment to flex-start
    },
});
