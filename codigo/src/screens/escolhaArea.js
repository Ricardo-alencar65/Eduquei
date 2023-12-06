import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

export default function EscolhaArea({ navigation }) {
    const goToQuestionsForArea = (areaId) => {
        navigation.navigate('TelaQuestao', { areaId });
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
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c', // Mantendo o fundo consistente com a tela anterior
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        backgroundColor: '#8453DE', // Cor roxa padrão, como na tela anterior
        borderRadius: 25,
        margin: 10,
        minWidth: '45%',
        shadowColor: "#8453DE",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    boxWelcome: {
        alignItems: 'center',
        maxWidth: 500,
        paddingVertical: 50,
    },
    quizTitle: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    textTitle: {
        color: '#ffffff',
        fontSize: 24,
        marginBottom: 18,
        textAlign: 'center',
    },
    textBody: {
        color: '#ffffff',
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonWelcome: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#FF3B30', // Botão de retorno
        borderRadius: 20,
        marginVertical: 20,
        width: '60%',
        alignSelf: 'center',
        shadowColor: "#FF3B30",
        shadowOffset: {
            width: 0,
            height: 4,
        },
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
    imageWelcome: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        marginTop: 40,
    },
});