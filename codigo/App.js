import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from "./src/components/Welcome/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EscolhaArea from './src/screens/escolhaArea';
import Router from './src/components/router';
import Questoes from './src/screens/questoes'

const Stack = createStackNavigator();

export default function App() {
  return (
  <EscolhaArea></EscolhaArea>
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
