import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    boxWelcome: {
        justifyContent: "center", 
        maxWidth: 500,
        flex: 1 
    },
    textTitle:{
        justifyContent: "center",
        marginBottom: 28,
        color: "#8435de",
        fontSize: 24
    },
    textBody: {
        justifyContent: "center",
        color: "#ffffff",
        marginBottom: 20,
        fontSize: 16
    },
    buttonWelcome: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(132, 53, 222, 1)',
        borderRadius: 50,
        borderWidth: 0,
        borderColor: 'transparent',
        width: 10
      },
      imageWelcome: {
        maxWidth: '100%',
        resizeMode: 'contain',
        paddingTop: 100
      }
});

export default styles