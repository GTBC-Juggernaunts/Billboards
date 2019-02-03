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
                    Welcome to Billboards
                </Text>
                <Button
                    buttonStyle={ styles.button }
                    title={'Login'}
                />
                <Button
                    buttonStyle={ styles.button }
                    title={'Register'}
                />
            </View>
        )
    }
};

export default Home;