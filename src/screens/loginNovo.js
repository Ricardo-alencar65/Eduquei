import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginNovo({ navigation }) {
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
                setEmail('');
                setSenha('');
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
      
        <View style={styles.overlapGroupWrapper}>
                <View style={styles.overlapGroup}>
                    <View style={styles.overlap}>
                        <Text style={styles.textWrapper}>QUIZ</Text>
                        <Text style={styles.div}>Eduquei</Text>
                    </View>

                    <View style={styles.inputsContainer}>
                        <TextInput 
                            style={erroLogin ? styles.inputError : styles.input} 
                            placeholder="Email" 
                            placeholderTextColor="#aaa"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(val) => setEmail(val)}
                        />
                        <TextInput 
                            style={erroLogin ? styles.inputError : styles.input} 
                            placeholder="Senha" 
                            placeholderTextColor="#aaa"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(val) => setSenha(val)}
                        />
                        {erroLogin && <Text style={styles.errorMessage}>E-mail ou senha incorretos</Text>}
                    </View>


                    <TouchableOpacity style={styles.overlap2} onPress={handleLogin}>
                        <Text style={styles.textWrapper4}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cadastroButton} onPress={() => navigation.navigate('CadstroNovo')}>
                    <Text style={styles.cadastroButtonText}>Cadastro</Text>
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
          justifyContent: 'space-between',
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
          top: 173,
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
            width: '80%',
            alignItems: 'center',
        },
        input: {
            top:350,
            left: 50,
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
            top:350,
            left: 50,
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
            top: 350,
            left: 60
          },
        overlap2: {
          backgroundColor: '#f8c660',
          borderRadius: 20,
          height: 59,
          left: 23,
          position: 'absolute',
          top: 622,
          width: 383,
        },
        textWrapper4: {
          color: '#ffffff',
          fontSize: 24,
          fontWeight: '600',
          left: 164,
          position: 'absolute',
          top: 10,
        },
        cadastroButton: {
        position: 'absolute',
        top: 700, 
        left: 175,
    },
    cadastroButtonText: {
      fontSize: 20,
      color: '#f8c660', 
  }
      });
      