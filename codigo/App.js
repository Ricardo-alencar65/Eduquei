import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from "./src/components/Welcome/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EscolhaArea from './src/screens/escolhaArea';
import Router from './src/components/router';
import Desempenho from './src/screens/desempenho'
import CadastroQuestoes from './src/screens/cadastrarQuest';
import TelaQuestao from './src/screens/telaQuestao';
import LoginNovo from './src/screens/loginNovo';
import CadstroNovo from './src/screens/cadastroNovo';
import RankingNovo from './src/screens/rankingNovo';
const Stack = createStackNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <CadastroQuestoes></CadastroQuestoes>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#1c1c1c"
  },
  title: {
    color: "#ffffff",
    paddingTop: 100,
    marginBottom: 20,
    fontSize: 32
  }
});
