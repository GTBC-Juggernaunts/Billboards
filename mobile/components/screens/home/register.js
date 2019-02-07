import React, { Component } from 'react';
import { KeyboardAvoidingView } from 'react-native'
import { Input, Text, Button } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import styles from '../../style'
import api from '../../../Utils/API/api';

class Home extends Component {

    state = {
        Email: '',
        Name: 'Test Account',
        Phone: '3105552121',
        PreferenceGroup: 'shoes',
        Username: '',
    };

    _handleSubmit = (event) => {
        event.preventDefault();
        let user = this.state
        console.log(user);
        api.createUser(user)
        .then(res => {
            if (res.status === 200) {
                this.dropdown.alertWithType(
                    'success',
                    'User Successfully Created',
                    'Please begin to look for promotions'
                );
                console.log(res);
                console.log(res.data);
            }
        })
        .catch(err => {
            console.log(`Error`, err);
        })
    }

    render() {
        return (
            <KeyboardAvoidingView 
                style={ styles.container }
                behavior={"padding"}
            >
                    <Text h3 style={ styles.header }>
                        Billboards Registration
                    </Text>
                    <Input
                        containerStyle={ styles.input }
                        placeholder='Username'
                        onChangeText={ (value) => this.setState({ Username: value}) }
                        value={ this.state.username }
                    />
                    <Input
                        containerStyle={ styles.input }
                        placeholder='Email'
                        onChangeText={ (value) => this.setState({ Email: value}) }
                        value={ this.state.email }
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
            <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </KeyboardAvoidingView>
        )
    }
};

export default Home;