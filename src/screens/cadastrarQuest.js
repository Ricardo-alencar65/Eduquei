import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker'

export default function CadastroQuestoes() {
    const [pergunta, setPergunta] = useState('');
    const [alternativa1, setAlternativa1] = useState('');
    const [alternativa2, setAlternativa2] = useState('');
    const [alternativa3, setAlternativa3] = useState('');
    const [alternativa4, setAlternativa4] = useState('');
    const [alternativa5, setAlternativa5] = useState('');
    const [respCorreta, setRespCorreta] = useState('');
    const [dificuldade, setDificuldade] = useState('');

    const [areaSelecionada, setAreaSelecionada] = useState('01');

    const areas = {
        '01': 'Entretenimento',
        '02': 'Esportes',
        '03': 'Ciências e Tecnologia',
        '04': 'Atualidades',
        '05': 'História'
    };

    const cadastrarQuestao = async () => {
        const db = getFirestore();
        const questao = {
            pergunta,
            alternativa1,
            alternativa2,
            alternativa3,
            alternativa4,
            alternativa5,
            respCorreta,
            dificuldade: Number(dificuldade),
            areaId: areaSelecionada
        };
    

        try {
            await addDoc(collection(db, 'questoes'), questao);
            alert('Questão cadastrada com sucesso!');
            setPergunta('');
            setAlternativa1('');
            setAlternativa2('');
            setAlternativa3('');
            setAlternativa4('');
            setAlternativa5('');
            setRespCorreta('');
            setDificuldade('');
            setAreaSelecionada('01');
        } catch (error) {
            alert('Erro ao cadastrar questão: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Questões</Text>
            <TextInput style={styles.input} placeholder="Pergunta" value={pergunta} onChangeText={setPergunta} />
            <TextInput style={styles.input} placeholder="Alternativa 1" value={alternativa1} onChangeText={setAlternativa1} />
            <TextInput style={styles.input} placeholder="Alternativa 2" value={alternativa2} onChangeText={setAlternativa2} />
            <TextInput style={styles.input} placeholder="Alternativa 3" value={alternativa3} onChangeText={setAlternativa3} />
            <TextInput style={styles.input} placeholder="Alternativa 4" value={alternativa4} onChangeText={setAlternativa4} />
            <TextInput style={styles.input} placeholder="Alternativa 5" value={alternativa5} onChangeText={setAlternativa5} />
            <TextInput style={styles.input} placeholder="Resposta Correta" value={respCorreta} onChangeText={setRespCorreta} />
            <TextInput 
                style={styles.input} 
                placeholder="Dificuldade" 
                value={dificuldade} 
                onChangeText={text => setDificuldade(text)}
                keyboardType="numeric"
            />
            <Picker
                selectedValue={areaSelecionada}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setAreaSelecionada(itemValue)}
            >
                {Object.entries(areas).map(([id, nome]) => (
                    <Picker.Item key={id} label={nome} value={id} />
                ))}
            </Picker>
            <TouchableOpacity style={styles.button} onPress={cadastrarQuestao}>
                <Text style={styles.buttonText}>Cadastrar Questão</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '90%',
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    picker: {
        width: '90%',
    },
});
