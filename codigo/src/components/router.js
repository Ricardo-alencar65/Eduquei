import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Welcome/index';
import EscolhaArea from '../screens/escolhaArea';
import Questoes from '../screens/questoes';
import Login from '../screens/login';
import CadastroTemp from '../screens/cadastroTemp';
import Desempenho from '../screens/desempenho'

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: styles.container,
        }}>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="EscolhaAreaScreen" component={EscolhaArea} options={{ headerShown: false }} />
        <Stack.Screen name="Questoes" component={Questoes} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroTemp" component={CadastroTemp} options={{ headerShown: false }} />
        <Stack.Screen name="Desempenho" component={Desempenho} options={{ headerShown: false }} />
        
        
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
    title: {
      color: "#ffffff",
      paddingTop: 100,
      marginBottom: 20,
      fontSize: 32
    }
  });

export default Router;
