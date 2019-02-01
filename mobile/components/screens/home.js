import React, { Component } from 'react';
import { View, Text, Button, Image} from 'react-native';
import styles from '../style'

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>This is the Home Screen</Text>
            </View>
        )
    }
};

export default Home;