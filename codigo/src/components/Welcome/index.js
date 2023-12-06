import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome({ navigation }) {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userId');
        navigation.navigate('LoginNovo');
    };

    return (
        <View style={styles.boxWelcome}>
            <Text style={{ color: "#ffffff", paddingTop: 100, marginBottom: 20, fontSize: 32 }}>Quiz conhecimentos gerais</Text>
            <Text style={styles.textTitle}>Seja bem vindo</Text>
            <Text style={styles.textBody}>Pronto para aprender?</Text>
            <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('EscolhaAreaScreen'); }}>
                <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('Desempenho'); }}>
                <Text style={styles.buttonText}>Ver desempenho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWelcome} onPress={() => { navigation.navigate('Ranking'); }}>
                <Text style={styles.buttonText}>Ranking de usuarios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    boxWelcome: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1c1c1c", // Mantendo o fundo escuro
        paddingTop: StatusBar.currentHeight || 0,
        backgroundImage: 'linear-gradient(180deg, #1c1c1c 0%, #42275a 100%)', // Degrade sutil
    },
    textTitle: {
        color: "#ffffff",
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10
    },
    textBody: {
        color: "#ffffff",
        fontSize: 20,
        marginBottom: 30,
    },
    buttonWelcome: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: '#8453DE', // Cor roxa padrão
        borderRadius: 30,
        marginVertical: 10,
        width: '70%',
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
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonLogout: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: '#FF3B30', // Botão de logout
        borderRadius: 30,
        marginVertical: 15,
        width: '70%',
        shadowColor: "#FF3B30",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    imageWelcome: {
        width: 250,
        height: 300,
        resizeMode: 'contain',
        marginTop: 40,
    }
});
