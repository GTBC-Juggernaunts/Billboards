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
    welcome: {
        height: 300,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: "#18FFFF",
        height: 20
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    logo:{
        flex: 3,
        textAlign: "center",
        marginTop: 100,
    },
    coupons:{
        flex: .8,
        textAlign: "center",
        height: 50,
        backgroundColor: "#18FFFF",
    }
});

export default styles;