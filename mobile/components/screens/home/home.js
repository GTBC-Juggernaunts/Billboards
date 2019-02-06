import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import styles from '../../style'

class Home extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text h3
                    style={ styles.logo }>
                    Welcome to Billboards
                </Text>
                <Button
                    buttonStyle={ styles.button }
                    title={'Login'}
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    buttonStyle={ styles.button }
                    title={'Register'}
                    onPress={() => this.props.navigation.navigate('Register') }
                />
            </View>
        )
    }
};

export default Home;