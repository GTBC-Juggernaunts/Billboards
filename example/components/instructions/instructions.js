import {
    Platform
} from 'react-native';

const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android: "This is the Android version\n" +
        "Shake or press menu button for dev menu"
});

export default instructions;