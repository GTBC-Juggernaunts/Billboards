import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../style'

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>This is the Home Screen</Text>
                <Button onPress={ () => this.props.navigation.navigate('HomeScreen')} title="Home" />
            </View>
        )
    }
};

export default Home;