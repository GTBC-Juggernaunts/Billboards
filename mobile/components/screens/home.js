import React, { Component } from 'react';
import { View, Text, Button, Image} from 'react-native';
import styles from '../style'

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text 
                    style={styles.logo}>
                    Welcome to Billboards
                </Text>
                <Button 
                    style={styles.logo} 
                    title="Get Started" 
                    onPress={ () => this.props.navigation.navigate('Coupons') }>
                    Get Started
                </Button>
            </View>
        )
    }
};

export default Home;