import React from "react"
import{ View, Text, TouchableOpacity, Image, StyleSheet, StatusBar} from "react-native"



export default function escolhaArea({navigation}){
    return(
        <View style={styles.boxWelcome}>
            <Text style={{color: "#ffffff", paddingTop: 100, marginBottom: 20, fontSize: 32}}>Quiz conhecimentos gerais</Text>
            <Text style={styles.textTitle}>Escolha uma categoria</Text>
            <Text style={styles.textBody}>As perguntas serão referentes a uma das áreas</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Questoes'); }}>
                    <Text style={styles.buttonText}>Natureza</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Questoes'); }}>
                    <Text style={styles.buttonText}>Exatas</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonLong} onPress={() => { navigation.navigate('Questoes'); }}>
                <Text style={styles.buttonText}>Humanas</Text>
            </TouchableOpacity>
            <Image style={styles.imageWelcome} source={require('../../assets/quiz.png')} alt="Início do Quiz" />

        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        width: '70%',  // Ajuste conforme necessário
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 50,
        marginHorizontal: 10,
    },
    buttonLong: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 50,
        width: '70%',  // Ajuste conforme necessário
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    boxWelcome: {
        alignItems: "center",
        justifyContent: "center", 
        maxWidth: 500,
        flex: 1,
        marginTop: 100,
    },
    textTitle:{
        justifyContent: "center",
        marginBottom: 18,
        color: "#fff",
        fontSize: 24
    },
    textBody: {
        justifyContent: "center",
        color: "#8435de",
        marginBottom: 30,
        fontSize: 16
    },
    buttonWelcome: {
        
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 50,
        borderWidth: 0,
        borderColor: 'transparent',
        width: 100,
        height: 48
      },
      buttonWelcome1: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 50,
        borderWidth: 0,
        borderColor: 'transparent',
        width: 200,
        height: 48,
      },
      imageWelcome: {
        maxWidth: '100%',
        resizeMode: 'contain',
        paddingTop: 100
      }
});