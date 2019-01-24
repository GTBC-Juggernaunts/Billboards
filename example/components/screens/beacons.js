import React, { Component } from 'react';
import { View, Text, Button, } from 'react-native';
import styles from '../style'
import Instructions from '../instructions'

// Beacon library
import * as RNEP from "@estimote/react-native-proximity";

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
                <Text style={styles.welcome}>Exclusive Promotions Coming Your Way!</Text>
                <Text style={styles.welcome}>
                    {this.state.connected ? this.state.data.coupon : "No Deals Near"}
                </Text>
                <Text style={styles.instructions}>{Instructions}</Text>
                <Button onPress={this.enterAction} title="Get Started" />
            </View> 
        )
    }
};