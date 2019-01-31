import React, { Component } from 'react';
import { View, Text, Button, } from 'react-native';
import styles from '../style'
import Instructions from '../instructions'
import { CardList } from 'react-native-card-list'

// Beacon library
import * as RNEP from "@estimote/react-native-proximity";

// Coupon information for cards
const cards = [
    {
        id: 0,
        title: 'Deal #1',
        picture: require('../../assets/product.jpg'),
        content: <Text> Deal #1 QR Code goes here</Text>
    },
    {
        id: 0,
        title: 'Deal #2',
        picture: require('../../assets/product.jpg'),
        content: <Text> Deal #2 QR Code goes here</Text>
    },
    {
        id: 0,
        title: 'Deal #3',
        picture: require('../../assets/product.jpg'),
        content: <Text> Deal #3 QR Code goes here </Text>
    },
]
export default class beacons extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        connected: false
    }
    
    // Create a new zone 
    zone2 = new RNEP.ProximityZone(1, "DigitalBillboard");
    
    enterAction = () => {

        RNEP.locationPermission.request().then(permission => {
            
            // Check permission status
            if (permission !== RNEP.locationPermission.DENIED) {
                const ESTIMOTE_APP_ID = "billboards-o72";
                const ESTIMOTE_APP_TOKEN = "563764b6a5ebe4d450cacda2f9438257";
                const credentials = new RNEP.CloudCredentials(
                  ESTIMOTE_APP_ID,
                  ESTIMOTE_APP_TOKEN
                );
            
                // Notification
                const config = {
                    notification: {
                        title: "Exploration mode is on",
                        text: "We will notify you when you are next to something interesting.",
                        channel: {
                            id: "exploration-mode",
                            name: "Exploration Mode"
                        }
                    }
                };
    
                RNEP.proximityObserver.initialize(credentials, config);
                RNEP.proximityObserver.startObservingZones([this.zone2]);
            }
        });
    };

    render() {
        return (   
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Digital Billboards!</Text>
                <CardList style={styles.coupons} cards={cards}/>
                <Button onPress={this.enterAction} title="Get Started" />
            </View> 
        )
    }
};