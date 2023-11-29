import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './Welcome/index';
import EscolhaArea from '../screens/escolhaArea';
import Questoes from '../screens/questoes';
import Login from '../screens/login';
import CadastroTemp from '../screens/cadastroTemp';
import Desempenho from '../screens/desempenho';
import Cadastro from '../screens/cadastro';
import Ranking from '../screens/ranking';

const Stack = createStackNavigator();

function Router() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem('userEmail');
      console.log("Email recuperado do AsyncStorage:", userEmail);
      setIsUserLoggedIn(!!userEmail);
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserLoggedIn ? "Welcome" : "LoginScreen"}
        screenOptions={{
          headerShown: false,
          cardStyle: styles.container,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="EscolhaAreaScreen" component={EscolhaArea} options={{ headerShown: false }} />
        <Stack.Screen name="Questoes" component={Questoes} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroTemp" component={CadastroTemp} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Desempenho" component={Desempenho} options={{ headerShown: false }} />
        <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#1c1c1c"
    },
    spinnerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#1c1c1c"
    },
    title: {
      color: "#ffffff",
      paddingTop: 100,
      marginBottom: 20,
      fontSize: 32
    }
});

export default Router;
