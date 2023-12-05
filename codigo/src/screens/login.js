import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState(false);


    const handleLogin = async () => {
        try {
            const db = getFirestore();
            const usuarioRef = collection(db, 'usuario');
            const q = query(usuarioRef, where('email', '==', email), where('senha', '==', password));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setErroLogin(true);
                setEmail(''); // Resetar o email
                setSenha(''); // Resetar a senha
                return;
            }
            querySnapshot.forEach(async (doc) => {
                const userData = doc.data();
                const userId = doc.id; 
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
                style={erroLogin ? styles.inputError : styles.input} 
                placeholder="Email" 
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={email}
                onChangeText={(val) => {
                    setEmail(val);
                    setErroLogin(false);
                }}
            />
            <TextInput 
                style={erroLogin ? styles.inputError : styles.input} 
                placeholder="Senha" 
                placeholderTextColor="#aaa"
                secureTextEntry={true}
                value={password}
                onChangeText={(val) => {
                    setSenha(val);
                    setErroLogin(false);
                }}
            />
            {erroLogin && <Text style={styles.errorMessage}>E-mail ou senha incorretos</Text>}

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
        backgroundColor: "#1c1c1c", // Mantém o fundo escuro
    },
    inputError: {
        // Estilo para campos quando há erro
        width: 300,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontSize: 16,
        color: '#000',
        borderColor: 'red',
        borderWidth: 2, // Aumento da largura da borda
    },
    errorMessage: {
        color: 'red',
        marginBottom: 15,
    },
    title: {
        fontSize: 36, // Tamanho maior para destaque
        color: '#fff',
        marginBottom: 40, // Aumenta o espaço abaixo do título
        fontWeight: 'bold', // Deixa o título mais destacado
    },
    input: {
        width: 300,
        padding: 15,
        marginVertical: 15, // Aumenta o espaçamento vertical
        backgroundColor: '#fff',
        borderRadius: 25, // Cantos mais arredondados
        fontSize: 16,
        color: '#000',
    },
    button: {
        width: 300,
        padding: 15,
        backgroundColor: '#8453DE', // Cor vibrante
        borderRadius: 25, // Cantos mais arredondados
        alignItems: 'center',
        marginTop: 25, // Aumenta o espaçamento acima do botão
        shadowColor: '#000', // Sombra para o botão (opcional)
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold', // Texto do botão mais ousado
    },
    forgotPassword: {
        color: '#fff',
        marginTop: 20, // Aumenta o espaço acima do texto
        textDecorationLine: 'underline', // Sublinha o texto (opcional)
    },
    logo: {
        width: 300, // Aumenta a largura
        height: 200, // Aumenta a altura
        resizeMode: 'contain',
        marginTop: 30, // Ajusta o espaço acima da logo se necessário
    },
});