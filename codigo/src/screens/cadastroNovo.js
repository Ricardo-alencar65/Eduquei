import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CadstroNovo({ navigation }) {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

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
            await AsyncStorage.setItem('userName', nome);
navigation.navigate('LoginNovo');
            navigation.navigate('LoginNovo');
        } catch (error) {
            console.error('Erro ao cadastrar usuário: ', error);
        }
    };
    return (
        
        <View style={styles.overlapGroupWrapper}>
                <View style={styles.overlapGroup}>
                    <View style={styles.overlap}>
                        <Text style={styles.textWrapper}>QUIZ</Text>
                        <Text style={styles.div}>Khelo</Text>
                    </View>

            <View style={styles.inputsContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nome" 
                    placeholderTextColor="#aaa"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Sobrenome" 
                    placeholderTextColor="#aaa"
                    value={sobrenome}
                    onChangeText={setSobrenome}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Senha" 
                    placeholderTextColor="#aaa"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />
            </View>

            <TouchableOpacity style={styles.overlap2} onPress={cadastrarUsuario}>
                <Text style={styles.textWrapper4}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginNovo')}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    loginScreen: {
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    overlapGroupWrapper: {
      height: 932,
      width: 430,
  },
  overlapGroup: {
      backgroundColor: '#004643b2',
      height: 932,
      width: 430,
      position: 'relative',
  },
    overlap: {
      backgroundColor: '#ffffff',
      borderRadius: 80,
      height: 160,
      left: 135,
      position: 'absolute',
      top: 90,
      width: 160,
    },
    textWrapper: {
      color: '#004643',
      fontSize: 40,
      fontWeight: '600',
      left: 36,
      position: 'absolute',
      top: 47,
    },
    div: {
      color: '#f8c660',
      fontSize: 20,
      fontWeight: '600',
      left: 74,
      position: 'absolute',
      top: 85,
    },
    textWrapper2: {
      color: '#eeeff2',
      fontSize: 18,
      fontWeight: '600',
      left: 23,
      position: 'absolute',
      top: 452,
    },
    divWrapper: {
      borderColor: '#eeeff2',
      borderRadius: 20,
      borderWidth: 1,
      height: 53,
      left: 23,
      position: 'absolute',
      top: 492,
      width: 383,
    },
    textWrapper3: {
      color: '#e9eaed',
      fontSize: 12,
      fontWeight: '500',
      left: 19,
      position: 'absolute',
      top: 15,
    },
    inputsContainer: {
      top: 265,
      left: 50,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: 300,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        fontSize: 16,
        color: '#000',
        alignSelf: 'center',
      },
      inputError: {
        width: 300,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        fontSize: 16,
        color: '#000',
        borderColor: 'red',
        borderWidth: 2,
        alignSelf: 'center',
      },
      errorMessage: {
        color: 'red',
        marginBottom: 15,
        alignSelf: 'center',
      },
      overlap2: {
        backgroundColor: '#f8c660',
        borderRadius: 20,
        height: 59,
        left: 23,
        position: 'absolute',
        top: 622,
        width: 383,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textWrapper4: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
    loginButton: {
      position: 'absolute',
      top: 700,
      left: 185,
  },
  loginButtonText: {
    fontSize: 20,
    color: '#f8c660', 
}
  });
  