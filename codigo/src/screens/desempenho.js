import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PerformanceScreen() {
    // Dados fictícios para demonstração
    const desempenho = {
        natureza: { acertos: 7, total: 15 },
        exatas: { acertos: 10, total: 15 },
        humanas: { acertos: 7, total: 15 },
        linguagens: { acertos: 9, total: 15 },
    };

    // Função para calcular a porcentagem de acertos
    const calcularPorcentagem = (acertos, total) => {
        return ((acertos / total) * 100).toFixed(0) + '%';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Desempenho</Text>

            {Object.entries(desempenho).map(([area, { acertos, total }], index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{area.charAt(0).toUpperCase() + area.slice(1)}:</Text>
                    <Text style={styles.cardContent}>{acertos}/{total} - {calcularPorcentagem(acertos, total)}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 30,
    },
    card: {
        backgroundColor: 'rgba(132, 53, 222, 0.8)',
        width: '80%',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContent: {
        color: '#fff',
        fontSize: 18,
        marginTop: 5,
    },
});