import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {app} from '../services/firebaseConfig'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignupScreen({ navigation }) {

    const db = getFirestore(app);

    const cadastrarUsuario = async () => {
        try {
            await addDoc(collection(db, 'usuario'), {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha,
            });
            console.log('Usuário cadastrado com sucesso!');
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error('Erro ao cadastrar usuário: ', error);
        }
    };



    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#aaa" value = {nome} onChangeText={setNome} />
            <TextInput style={styles.input} placeholder="Sobrenome" placeholderTextColor="#aaa" value = {sobrenome} onChangeText={setSobrenome} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#aaa" keyboardType="email-address" value = {email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#aaa" secureTextEntry={true} value = {senha} onChangeText={setSenha} />

            <TouchableOpacity style={styles.button} onPress={cadastrarUsuario}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.forgotPassword}>Login</Text>
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
        backgroundColor: "#1c1c1c", // Mesmo fundo da tela de login
    },
    title: {
        fontSize: 36,
        color: '#fff',
        marginBottom: 40,
        fontWeight: 'bold',
    },
    input: {
        width: 300,
        padding: 15,
        marginVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
        fontSize: 16,
        color: '#000',
        // Adicionar ícones aos campos de entrada é opcional
    },
    button: {
        width: 300,
        padding: 15,
        backgroundColor: '#8453DE', // Cor vibrante
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: '#fff',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    logo: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
        marginTop: 30,
    },
});
