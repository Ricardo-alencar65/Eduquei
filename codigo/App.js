import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from "./src/components/Welcome/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EscolhaArea from './src/screens/escolhaArea';
import Router from './src/components/router';
import Login from './src/screens/login' 
import Cadastro from './src/screens/cadastro';
import Desempenho from './src/screens/desempenho'
import Questao from './src/screens/questoes'
import Questoes from './src/screens/questoes';
import CadastroQuestoes from './src/screens/cadastrarQuest';
import RankingScreen from './src/screens/ranking';
import TelaQuestao from './src/screens/telaQuestao';
import LoginNovo from './src/screens/loginNovo';
import CadstroNovo from './src/screens/cadastroNovo';
import RankingNovo from './src/screens/rankingNovo';
import RankingJuncao from './src/screens/rankingJunção';
import TelaQuestaot from './src/screens/telaquestaot';
const Stack = createStackNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <RankingJuncao></RankingJuncao>
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
