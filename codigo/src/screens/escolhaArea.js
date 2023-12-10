import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";

export default function EscolhaArea({ navigation }) {
    const goToQuestionsForArea = (areaId) => {
        navigation.navigate('TelaQuestao', { areaId });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image style={styles.backIcon} source={require('../../assets/left.png')} />
                <Text style={styles.backButtonText}>Anterior</Text>
            </TouchableOpacity>
            <View style={styles.boxWelcome}>
                <Text style={styles.quizTitle}>Quiz Conhecimentos Gerais</Text>
                <Text style={styles.textTitle}>Escolha uma categoria</Text>
                <Text style={styles.textBody}>As perguntas serão referentes a uma das áreas</Text>

                <View style={styles.gridContainer}>
                    {/* Primeira Linha */}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('01')}>
                            <Text style={styles.buttonText}>Entretenimento</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('02')}>
                            <Text style={styles.buttonText}>Esportes</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Segunda Linha */}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('03')}>
                            <Text style={styles.buttonText}>Ciência e Tecnologia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('04')}>
                            <Text style={styles.buttonText}>Atualidades</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Terceira Linha para História */}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => goToQuestionsForArea('05')}>
                            <Text style={styles.buttonText}>História</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#004643b2',
        padding: 20,
    },
    gridContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 15,
    },
    button: {
        width: '45%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f8c660',
        borderRadius: 20,
        margin: 15,
        width: '45%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#004643',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    boxWelcome: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 30,
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
        marginBottom: 30,
        textAlign: 'center',
    },
    textBody: {
        color: '#ffffff',
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center', 
    },
    backIcon: {
        width: 30, 
        height: 30, 
        tintColor: '#ffffff',
    },
    backButtonText: {
        color: '#ffffff',
        marginLeft: 10,
        fontSize: 16,
    },
    buttonTextPrevious: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});