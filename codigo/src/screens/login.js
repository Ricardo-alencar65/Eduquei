import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const db = getFirestore();
            const usuarioRef = collection(db, 'usuario');
            const q = query(usuarioRef, where('email', '==', email), where('senha', '==', password));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("E-mail ou senha incorretos");
                // Aqui você pode retornar ou mostrar uma mensagem ao usuário
                return;
            }

            querySnapshot.forEach(async (doc) => {
                const userData = doc.data();
                const userId = doc.id; // ID do documento do usuário
                await AsyncStorage.setItem('userId', userId);
                await AsyncStorage.setItem('userEmail', userData.email);
                console.log("Logado com ID:", userId);
                navigation.navigate('Welcome');
            });
        } catch (error) {
            console.error('Erro ao fazer login: ', error);
        }
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput 
                style={styles.input} 
                placeholder="Email" 
                placeholderTextColor="#aaa" 
                keyboardType="email-address"
                onChangeText={(val) => {
                    setEmail(val)
                }}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Senha" 
                placeholderTextColor="#aaa" 
                secureTextEntry={true}
                onChangeText={(val) => {
                    setPassword(val)
                }}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={styles.forgotPassword}>Cadastro</Text>
            </TouchableOpacity>
            <Image style={styles.logo} source={require('../../assets/quiz.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 30,
    },
    input: {
        width: 300,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontSize: 16,
        color: '#000',
    },
    button: {
        width: 300,
        padding: 15,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    forgotPassword: {
        color: '#fff',
        marginTop: 15,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 30,
    },
});