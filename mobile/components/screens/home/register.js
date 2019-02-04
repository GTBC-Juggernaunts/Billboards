import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import styles from '../../style'

class Home extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text h3 style={ styles.header }>
                    Billboards Registration
                </Text>
                <Input
                    containerStyle={ styles.input }
                    placeholder='Username'
                />
                <Input
                    containerStyle={ styles.input }
                    placeholder='Password'
                />
                <Text style={ styles.text }>
                    By clicking submit, you are have read our Privacy Policy and agree to the Terms of Service.
                </Text>
                <Button
                    buttonStyle={ styles.button }
                    containerStyle = { styles.buttonContainer }
                    title="Register"
                    onPress={ () => console.log(`button clicked`)}
                />
            </View>
        )
    }
};

export default Home;