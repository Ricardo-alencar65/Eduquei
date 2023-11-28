import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

export default function EscolhaArea({ navigation }) {
    // Função para navegar para a tela de questões com o ID da área selecionada
    const goToQuestionsForArea = (areaId) => {
        navigation.navigate('Questoes', { areaId });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.boxWelcome}>
                <Text style={styles.quizTitle}>Quiz Conhecimentos Gerais</Text>
                <Text style={styles.textTitle}>Escolha uma categoria</Text>
                <Text style={styles.textBody}>As perguntas serão referentes a uma das áreas</Text>

                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('01')}>
                        <Text style={styles.buttonText}>Entretenimento</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('02')}>
                        <Text style={styles.buttonText}>Esportes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('03')}>
                        <Text style={styles.buttonText}>Ciência e Tecnologia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('04')}>
                        <Text style={styles.buttonText}>Atualidades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('05')}>
                        <Text style={styles.buttonText}>História</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('Welcome'); }}>
                    <Text style={styles.buttonTextWelcome}>Início</Text>
                </TouchableOpacity>

                <Image style={styles.imageWelcome} source={require('../../assets/quiz.png')} alt="Início do Quiz" />
            </View>
        </ScrollView>
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
        width: '60%', 
        alignSelf: 'center', 
    },
    buttonTextWelcome: {
        color: 'rgba(132, 53, 222, 1)', 
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 10,
        margin: 5,
        minWidth: '45%', 
        textAlign: 'center',
        alignItems: 'center', 
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    boxWelcome: {
        alignItems: 'center',
        maxWidth: 500,
        paddingVertical: 50, // Added padding to replace the StatusBar height
    },
    quizTitle: {
        color: '#ffffff',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textTitle: {
        color: '#ffffff',
        fontSize: 24,
        marginBottom: 18,
    },
    textBody: {
        color: '#ffffff',
        marginBottom: 30,
        fontSize: 16,
        textAlign: 'center',
    },
    imageWelcome: {
        maxWidth: '100%',
        resizeMode: 'contain',
        marginTop: 30,
    },
});
