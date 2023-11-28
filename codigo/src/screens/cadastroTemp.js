import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../src/services/firebaseConfig"

export default function CadastroTemp({ navigation }) {
    

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        
        const handleLogin = () => {
            createUserWithEmailAndPassword (auth, email, password)
                .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                console.log("Cadastrado")
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                
                console.log(errorMessage)
            });
        };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

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