import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome({ navigation }) {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userId');
        navigation.navigate('LoginScreen');
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
            <Image style={styles.imageWelcome} source={require('../../../assets/quiz.png')} alt="Início do Quiz" />
        </View>
    );
}

const styles = StyleSheet.create({
    boxWelcome: {
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
        flex: 1,
        marginTop: 100,
    },
    textTitle: {
        justifyContent: "center",
        marginBottom: 28,
        color: "#fff",
        fontSize: 24
    },
    textBody: {
        justifyContent: "center",
        color: "#8435de",
        marginBottom: 20,
        fontSize: 16
    },
    buttonWelcome: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 20,
        marginVertical: 10,
        width: '60%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    buttonText: {
        color: 'rgba(132, 53, 222, 1)', 
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonLogout: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(255, 59, 48, 0.8)', 
        borderRadius: 20,
        marginVertical: 10,
        width: '60%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    imageWelcome: {
        maxWidth: '100%',
        resizeMode: 'contain',
        paddingTop: 100
    }
});
