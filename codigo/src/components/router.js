import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Welcome/index';
import EscolhaArea from '../screens/escolhaArea';
import Questoes from '../screens/questoes'

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer >
      <Stack.Navigator  initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: styles.container,
        }} >
        <Stack.Screen name="WelcomeScreen" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="EscolhaAreaScreen" component={EscolhaArea} options={{ headerShown: false }} />
        <Stack.Screen name="Questoes" component={Questoes} options={{ headerShown: false }} />
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
