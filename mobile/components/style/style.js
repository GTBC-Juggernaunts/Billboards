import {
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    text: {
        width: 250,
        fontSize: 12,
        textAlign: "center",
    },
    welcome: {
        height: 300,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: "#18FFFF",
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    logo:{
        textAlign: "center",
        marginTop: 100,
        marginBottom: 100,
    },
    coupons:{
        flex: .8,
        textAlign: "center",
        height: 50,
        backgroundColor: "#18FFFF",
    },
    header: {
        textAlign: "center",
    },
    input: {
        width: 250,
        height: 75,
        justifyContent: 'center',
    },
    button: {
        width: 250,
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
    },
});

export default styles;