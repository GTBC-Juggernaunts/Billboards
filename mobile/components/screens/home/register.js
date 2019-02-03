import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../style'

class Home extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text 
                    style={ styles.logo }>
                    Register as a new user
                </Text>
                <Button
                    buttonStyle={ styles.button }
                    title={'Login'}
                />
                <Button
                    buttonStyle={ styles.button }
                    title={'Register with a new page'}
                />
            </View>
        )
    }
};

export default Home;