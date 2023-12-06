import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function TelaQuestao({ navigation }) {
    return (
        <View style={styles.quizScreen}>
            <View style={styles.div}>
                <View style={styles.overlapGroup}>
                    <View style={styles.rectangle}></View>
                    <View style={styles.ellipse}></View>
                    <Image style={styles.img} source={require('../../assets/Ellipse2.png')} />
                    <Text style={styles.textWrapper}>30</Text>
                    <Text style={styles.questionText}>
                        In what year did the United States host the FIFA World Cup for the first time?
                    </Text>
                </View>
                <View style={styles.overlap}>
                    <View style={styles.rectangle2}></View>
                    <Text style={styles.textWrapper2}>1986</Text>
                    <View style={styles.ellipse2}></View>
                </View>
                <View style={styles.overlap2}>
                    <Text style={styles.textWrapper3}>1994</Text>
                    <View style={styles.overlap3}>
                        <View style={styles.ellipse3}></View>
                        <Image style={styles.materialSymbols} source={require('../../assets/small.png')} />
                    </View>
                </View>
                <View style={styles.overlap4}>
                    <Text style={styles.textWrapper2}>2002</Text>
                    <View style={styles.ellipse2}></View>
                </View>
                <View style={styles.overlap5}>
                    <Text style={styles.textWrapper2}>2010</Text>
                    <View style={styles.ellipse2}></View>
                </View>
                <TouchableOpacity style={styles.divWrapper}>
                    <Text style={styles.textWrapper4}>Next</Text>
                </TouchableOpacity>
                <Text style={styles.textWrapper5}>7/10</Text>
                <TouchableOpacity style={styles.group}>
                    <Text style={styles.textWrapper6}>Previous</Text>
                    <Image style={styles.materialSymbols} source={require('../../assets/left.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    quizScreen: {
        backgroundColor: '#eff0f3',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    div: {
        backgroundColor: '#eff0f3',
        width: 430,
        height: 932,
        position: 'relative',
    },
    overlapGroup: {
        position: 'absolute',
        width: 383,
        height: 286,
        top: 80,
        left: 23,
    },
    rectangle: {
        height: 229,
        top: 57,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.26,
        shadowRadius: 50,
        position: 'absolute',
        width: 383,
        left: 0,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    ellipse: {
        position: 'absolute',
        width: 86,
        height: 86,
        top: 0,
        left: 149,
        backgroundColor: '#ffffff',
        borderRadius: 43,
        borderWidth: 8,
        borderColor: '#abd1c6',
    },
    img: {
        position: 'absolute',
        width: 43,
        height: 86,
        top: 0,
        left: 192,
    },
    textWrapper: {
        top: 17,
        left: 174,
        fontSize: 32,
        position: 'absolute',
        fontWeight: '600',
        color: '#004643',
    },
    inWhatYearDidThe: {
        position: 'absolute',
        top: 127,
        left: 24,
        fontWeight: '600',
        color: '#000000',
        fontSize: 18,
    },
    overlap: {
        position: 'absolute',
        width: 383,
        height: 53,
        top: 436,
        left: 23,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    rectangle2: {
        height: 53,
        top: 0,
        position: 'absolute',
        width: 383,
        left: 0,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    textWrapper2: {
        position: 'absolute',
        top: 10,
        left: 30,
        fontWeight: '600',
        color: '#000000',
        fontSize: 20,
    },
    ellipse2: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 17,
        left: 328,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
    overlap2: {
        position: 'absolute',
        width: 383,
        height: 53,
        top: 514,
        left: 23,
        backgroundColor: '#abd1c6',
        borderRadius: 20,
    },
    textWrapper3: {
        top: 10,
        left: 30,
        fontSize: 20,
        position: 'absolute',
        fontWeight: '600',
        color: '#004643',
    },
    overlap3: {
        position: 'absolute',
        width: 24,
        height: 24,
        top: 15,
        left: 326,
    },
    ellipse3: {
        position: 'absolute',
        width: 20,
        height: 20,
        top: 2,
        left: 2,
        backgroundColor: '#004643',
        borderRadius: 10,
    },
    materialSymbols: {
        position: 'absolute',
        width: 24,
        height: 24,
        top: 0,
        left: 0,
    },
    overlap4: {
        position: 'absolute',
        width: 383,
        height: 53,
        top: 592,
        left: 23,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    overlap5: {
        position: 'absolute',
        width: 383,
        height: 53,
        top: 670,
        left: 23,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    divWrapper: {
        position: 'absolute',
        width: 383,
        height: 59,
        top: 812,
        left: 23,
        backgroundColor: '#004643',
        borderRadius: 20,
    },
    textWrapper4: {
        position: 'absolute',
        top: 10,
        left: 166,
        fontWeight: '600',
        color: '#ffffff',
        fontSize: 24,
    },
    textWrapper5: {
        position: 'absolute',
        top: 19,
        left: 199,
        fontWeight: '600',
        color: '#000000',
        fontSize: 18,
    },
    group: {
        position: 'absolute',
        width: 73,
        height: 24,
        top: 20,
        left: 23,
    },
    textWrapper6: {
        position: 'absolute',
        top: 3,
        left: 24,
        fontWeight: '600',
        color: '#004643',
        fontSize: 12,
    },
});
  