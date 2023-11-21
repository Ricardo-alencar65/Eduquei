import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PerformanceScreen() {
    const desempenho = {
        natureza: { acertosF: 5, acertosM: 3, acertosD: 2, totalF: 10, totalM: 10, totalD:10  },
        exatas: { acertosF: 3, acertosM: 2, acertosD: 5, totalF: 10, totalM: 10, totalD: 10 },
        humanas: { acertosF: 9, acertosM: 9, acertosD: 6, totalF: 10, totalM: 10, totalD: 10 },
        linguagens: { acertosF: 7, acertosM: 7, acertosD: 10, totalF: 10, totalM: 10, totalD: 10 },
    };

    const calcularPorcentagem = (acertosF, acertosM, acertosD, totalF, totalM, totalD) => {
        
        return (((acertosF * 5) + (acertosM * 3) + (acertosD * 1)) /((totalF * 5) + (totalM * 3) + (totalD * 1)) * 100) .toFixed(0) + '%';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Desempenho</Text>

            {Object.entries(desempenho).map(([area, { acertosF, acertosM, acertosD, totalF, totalM, totalD }], index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{area.charAt(0).toUpperCase() + area.slice(1)}:</Text>
                    <Text style={styles.cardContent}>{calcularPorcentagem(acertosF, acertosM, acertosD, totalF, totalM, totalD)}</Text>
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