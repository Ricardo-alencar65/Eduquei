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
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 30,
    },
    input: {
        width: '80%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        fontSize: 16,
        color: '#000',
    },
    button: {
        width: '80%',
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
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 30,
    },
    forgotPassword: {
        color: '#fff',
        marginTop: 15,
    },
});