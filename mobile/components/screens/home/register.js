import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import styles from '../../style'

class Home extends Component {

    state = {
        user: {

        }
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.user);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text h3 style={ styles.header }>
                    Billboards Registration
                </Text>
                <Input
                    containerStyle={ styles.input }
                    placeholder='Username'
                    value={ this.state.user.username }
                    onChangeText={ (value) => this.setState.username = value }
                />
                <Input
                    containerStyle={ styles.input }
                    placeholder='Name'
                    value={ this.state.user.name }
                    onChangeText={ (value) => this.setState.name = value }
                />
                <Input
                    containerStyle={ styles.input }
                    placeholder='Email'
                    value={ this.state.user.email }
                    onChangeText={ (value) => this.setState.email = value }
                />
                <Input
                    containerStyle={ styles.input }
                    placeholder='Phone Number'
                    value={ this.state.user.phoneNumber }
                    onChangeText={ (value) => this.setState.phoneNumber = value }
                />
                <Input
                    containerStyle={ styles.input }
                    placeholder='Preference Group'
                    value={ this.state.user.preferenceGroup }
                    onChangeText={ (value) => this.setState.preferenceGroup = value }
                />
                <Text style={ styles.text }>
                    By clicking submit, you are have read our Privacy Policy and agree to the Terms of Service.
                </Text>
                <Button
                    buttonStyle={ styles.button }
                    containerStyle = { styles.buttonContainer }
                    title="Register"
                    onPress={ this._handleSubmit }
                />
            </View>
        )
    }
};

export default Home;