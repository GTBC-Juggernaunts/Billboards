/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import axios from 'axios';
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  Button
} from "react-native";
import * as RNEP from "@estimote/react-native-proximity";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

// the IP address of the computer you are running server.js on with the PORT
const localhost = "http://192.168.1.3:4000";

type Props = {};
export default class App extends Component<Props> {
  zone2 = new RNEP.ProximityZone(1, "DigitalBillboard");
  enterAction = () => {
    const ESTIMOTE_APP_ID = "digital-billboard-app-026";
    const ESTIMOTE_APP_TOKEN = "d6056fd23e22b958f7d478b2196e2c11";
    const credentials = new RNEP.CloudCredentials(
      ESTIMOTE_APP_ID,
      ESTIMOTE_APP_TOKEN
    );

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
    console.log("zone2", this.zone2);
    RNEP.proximityObserver.initialize(credentials, config);
    RNEP.proximityObserver.startObservingZones([this.zone2]);

    this.zone2.onEnterAction = context => {
      console.log("onEnterAction", context);
      console.log("beaconInfo", context.attachments.beaconInfo);
      if (context.attachments.beaconInfo) {
        axios.get(localhost + "/api/coupons/" + context.attachments.beaconInfo)
          .then(res=> {
            const data = res.data;
            console.log("coupon retrieved", data);   
            this.setState({connected: true, data})
        })
      }
    };
    this.zone2.onExitAction = context => {
      console.log("zone2 onExit", context);
      console.log("beaconInfo", context.attachments.beaconInfo);
      if (context.attachments.beaconInfo) {
        this.setState({connected: false})
      }
    };
    this.zone2.onChangeAction = contexts => {
      console.log("zone2 onChange", contexts);
      // console.log(contexts[0].attachments);
    };
  };

  state = {
    testState: "State is Working",
    connected: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Digital Billboards!</Text>
        <Text style={styles.welcome}>
          Exclusive Promotions Coming Your Way!
        </Text>
        <Text style={styles.welcome}>
          {this.state.connected ? this.state.data.coupon : "No Deals Near"}
        </Text>
        <Text>{this.state.connected ? this.state.data.tag + ": tag nearby" : ""}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button onPress={this.enterAction} title="Get Started" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
