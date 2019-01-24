import React, { Component } from 'react'
import { View, Text, Button, Image} from 'react-native';
import styles from '../style'

class Test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>This is the Home Screen</Text>
                <Button onPress={ () => this.props.navigation.navigate('HomeScreen')} title="Home Screen" />
                <Button onPress={ () => this.props.navigation.navigate('BeaconScreen')} title="Beacon Screen" />
            </View>
        )
    }
};

export default Test;