import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Welcome({ navigation }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const db = getFirestore();
            const userId = await AsyncStorage.getItem('userId');
            
            if (userId) {
                const userRef = doc(db, 'usuario', userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUser(userSnap.data());
                } else {
                    console.log('Usuário não encontrado');
                }
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userId');
        navigation.navigate('LoginNovo');
    };

    if (!user) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.boxWelcome}>
            <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                <Image style={styles.backIcon} source={require('../../../assets/left.png')} />
                <Text style={styles.buttonTextLogout}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.textWelcome}>Olá, {user.nome}!</Text>
            <Text style={styles.textDescription}>Explore e aprimore seus conhecimentos</Text>
            
            <TouchableOpacity style={styles.buttonWelcome} onPress={() => navigation.navigate('EscolhaAreaScreen')}>
                <Text style={styles.buttonText}>Iniciar Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWelcome} onPress={() => navigation.navigate('Desempenho')}>
                <Text style={styles.buttonText}>Meu Desempenho</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonWelcome} onPress={() => navigation.navigate('RankingNovo')}>
                <Text style={styles.buttonText}>Ranking Global</Text>
            </TouchableOpacity>


        </View>
    );
}
const styles = StyleSheet.create({
    boxWelcome: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start", // Changed from "center" to "flex-start" to move content upwards
        backgroundColor: "#004643b2",
        paddingTop: StatusBar.currentHeight || 0,
        paddingHorizontal: 0, // Ensure there's no horizontal padding
        margin: 0, // Ensure there's no margin
    },
    textWelcome: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 120, // Reduced space above the text
        marginBottom: 5, // Reduced space below the text
        textAlign: 'center',
    },
    textDescription: {
        color: "#ffffff",
        fontSize: 20,
        marginBottom: 20, // Adjust as needed
        textAlign: 'center',
    },
    textBody: {
        color: "#ffffff",
        fontSize: 22,
        marginBottom: 25,
        textAlign: 'center',
    },
    buttonWelcome: {
        paddingVertical: 18,
        paddingHorizontal: 45,
        backgroundColor: '#f8c660', // Consider changing to a brighter color
        borderRadius: 30,
        marginVertical: 12,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#004643',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonLogout: {
        position: 'absolute',
        top: 40, // Posicionamento
        left: 0,
        flexDirection: 'row', // Ícone e texto na mesma linha
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonTextLogout: {
        color: '#ffffff', // Cor do texto
        fontSize: 16, // Tamanho da fonte
        fontWeight: 'bold',
        marginLeft: 10, // Espaçamento entre o ícone e o texto
    },
    backIcon: {
        width: 30, // Tamanho do ícone
        height: 30, // Tamanho do ícone
        tintColor: '#ffffff', // Cor do ícone
    },
});

