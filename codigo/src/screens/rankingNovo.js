import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function RankingNovo({ navigation }) {
    return (
        <View style={styles.leaderboardScreen}>
          <View style={styles.overlapGroupWrapper}>
            <View style={styles.overlapGroup}>
              <Image style={styles.rectangle} source={require('../../assets/Rectangle1.png')} />
              <View style={styles.div}></View>
              <View style={styles.rectangle2}></View>
              <View style={styles.rectangle3}></View>
              <View style={styles.rectangle4}></View>
              <View style={styles.rectangle5}></View>
              <Image style={styles.img} source={require('../../assets/Rectangle2.png')} />
              <Image style={styles.ellipse} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Image style={styles.ellipse2} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Image style={styles.ellipse3} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Text style={styles.textWrapper}>Leaderboard</Text>
              <Image style={styles.materialSymbols} source={require('../../assets/left.png')} />
              <Text style={styles.textWrapper2}>David James</Text>
              <Text style={styles.textWrapper3}>9/10</Text>
              <Text style={styles.textWrapper4}>John Deh</Text>
              <Text style={styles.textWrapper5}>Michael</Text>
              <Text style={styles.textWrapper6}>8/10</Text>
              <Text style={styles.textWrapper7}>7/10</Text>
              <View style={styles.ellipse4}></View>
              <View style={styles.ellipse5}></View>
              <Text style={styles.textWrapper8}>3</Text>
              <View style={styles.ellipse6}></View>
              <Text style={styles.textWrapper9}>3</Text>
              <Text style={styles.textWrapper10}>1</Text>
              <Image style={styles.group} source={require('../../assets/coroa.png')} />
              <Text style={styles.textWrapper11}>4</Text>
              <Text style={styles.textWrapper12}>5</Text>
              <Text style={styles.textWrapper13}>6</Text>
              <Text style={styles.textWrapper14}>7</Text>
              <Text style={styles.textWrapper15}>8</Text>
              <Text style={styles.textWrapper16}>Smith Carol</Text>
              <Text style={styles.textWrapper17}>Harry</Text>
              <Text style={styles.textWrapper18}>Jon</Text>
              <Text style={styles.textWrapper19}>Ken</Text>
              <Text style={styles.textWrapper20}>Petter</Text>
              <Text style={styles.textWrapper21}>6/10</Text>
              <Text style={styles.textWrapper22}>5/10</Text>
              <Text style={styles.textWrapper23}>4/10</Text>
              <Text style={styles.textWrapper24}>3/10</Text>
              <Text style={styles.textWrapper25}>2/10</Text>
              <Image style={styles.maskGroup} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Image style={styles.maskGroup2} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Image style={styles.maskGroup3} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Image style={styles.maskGroup4} source={require('../../assets/iconeAnonimo.jpeg')} />
              <Image style={styles.maskGroup5} source={require('../../assets/iconeAnonimo.jpeg')} />
            </View>
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        leaderboardScreen: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        },
        overlapGroupWrapper: {
          width: 430,
          height: 932,
          // Nota: React Native não suporta background images da mesma forma que o CSS
          // Você terá que usar um componente ImageBackground para isso
        },
        overlapGroup: {
          position: 'relative',
          height: 932,
        },
        rectangle: {
          position: 'absolute',
          width: 430,
          height: 603,
          top: 329,
          left: 0,
        },
        div: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 423,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle2: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 517,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle3: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 611,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle4: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 705,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        rectangle5: {
          position: 'absolute',
          width: 383,
          height: 64,
          top: 799,
          left: 23,
          backgroundColor: '#ffffff',
          borderRadius: 20,
        },
        img: {
          position: 'absolute',
          width: 430,
          height: 384,
          top: 0,
          left: 0,
        },
        ellipse: {
          position: 'absolute',
          width: 96,
          height: 96,
          top: 107,
          left: 167,
        },
        ellipse2: {
          position: 'absolute',
          width: 84,
          height: 84,
          top: 165,
          left: 53,
          // objectFit: 'cover', // objectFit não é suportado em React Native
        },
        ellipse3: {
          position: 'absolute',
          width: 84,
          height: 84,
          top: 165,
          left: 293,
        },
        textWrapper: {
          position: 'absolute',
          top: 19,
          left: 153,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 22,
        },
        materialSymbols: {
          position: 'absolute',
          width: 44,
          height: 44,
          top: 15,
          left: 23,
        },
        textWrapper2: {
          position: 'absolute',
          top: 207,
          left: 183,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 12,
        },
        textWrapper3: {
          position: 'absolute',
          top: 226,
          left: 205,
          color: '#ffffff',
          fontSize: 10,
        },
        textWrapper4: {
          position: 'absolute',
          top: 253,
          left: 70,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 12,
        },
        textWrapper5: {
          position: 'absolute',
          top: 253,
          left: 314,
          fontWeight: '600',
          color: '#ffffff',
          fontSize: 12,
        },
        textWrapper6: {
          position: 'absolute',
          top: 272,
          left: 84,
          color: '#ffffff',
          fontSize: 10,
        },
        textWrapper7: {
          position: 'absolute',
          top: 272,
          left: 325,
          color: '#ffffff',
          fontSize: 10,
        },
        ellipse4: {
          position: 'absolute',
          width: 14,
          height: 14,
          top: 193,
          left: 208,
          backgroundColor: '#ffd912',
          borderRadius: 7,
        },
        ellipse5: {
          position: 'absolute',
          width: 14,
          height: 14,
          top: 240,
          left: 328,
          backgroundColor: '#004643',
          borderRadius: 7,
        },
        textWrapper8: {
          position: 'absolute',
          top: 238,
          left: 332,
          fontWeight: '500',
          color: '#ffffff',
          fontSize: 10,
        },
        ellipse6: {
          position: 'absolute',
          width: 14,
          height: 14,
          top: 240,
          left: 88,
          backgroundColor: '#004643',
          borderRadius: 7,
        },
        textWrapper9: {
          position: 'absolute',
          top: 238,
          left: 93,
          color: '#ffffff',
          fontSize: 10,
        },
        textWrapper10: {
          position: 'absolute',
          top: 191,
          left: 213,
          color: '#ffffff',
          fontSize: 10,
        },
        group: {
          position: 'absolute',
          width: 26,
          height: 21,
          top: 86,
          left: 202,
        },
        textWrapper11: {
            position: 'absolute',
            top: 438,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper12: {
            position: 'absolute',
            top: 532,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper13: {
            position: 'absolute',
            top: 626,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper14: {
            position: 'absolute',
            top: 720,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper15: {
            position: 'absolute',
            top: 814,
            left: 38,
            color: '#000000',
            fontSize: 20,
            fontWeight: '500',
          },
          textWrapper16: {
            position: 'absolute',
            top: 443,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper17: {
            position: 'absolute',
            top: 537,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper18: {
            position: 'absolute',
            top: 631,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper19: {
            position: 'absolute',
            top: 725,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper20: {
            position: 'absolute',
            top: 819,
            left: 110,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper21: {
            position: 'absolute',
            top: 443,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper22: {
            position: 'absolute',
            top: 537,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper23: {
            position: 'absolute',
            top: 631,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper24: {
            position: 'absolute',
            top: 725,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          textWrapper25: {
            position: 'absolute',
            top: 819,
            left: 364,
            color: '#000000',
            fontSize: 14,
            fontWeight: '500',
          },
          maskGroup: {
            position: 'absolute',
            width: 40,
            height: 40,
            top: 435,
            left: 60,
          },
          maskGroup2: {
            position: 'absolute',
            top: 529,
            left: 60,
            width: 40,
            height: 40,
          },
          maskGroup3: {
            position: 'absolute',
            top: 623,
            left: 60,
            width: 40,
            height: 40,
          },
          maskGroup4: {
            position: 'absolute',
            top: 717,
            left: 60,
            width: 40,
            height: 40,
          },
          maskGroup5: {
            position: 'absolute',
            top: 811,
            left: 60,
            width: 40,
            height: 40,
          },
      });
      