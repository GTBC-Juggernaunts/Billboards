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
    "Shake or press menu button for dev menu",
});

// the IP address of the computer you are running server.js on with the PORT
const localhost = "http://192.168.0.3:4000";

type Props = {};
export default class App extends Component<Props> {
  zone2 = new RNEP.ProximityZone(1, "Green");
  enterAction = () => {
    // zone2 = new RNEP.ProximityZone(10, "mint-leaf");
    const ESTIMOTE_APP_ID = "digital-billboard-8gj";
    const ESTIMOTE_APP_TOKEN = "9dff6faa96af5162dd8b20ec44e49ea5";
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
      console.log("inThisBitch", context.attachments.inThisBitch);
      if (context.attachments.inThisBitch) {
        axios.get(localhost + "/api/coupons")
          .then(res=> {
            const coupon = res.data.coupon;
            console.log("coupon retrieved", coupon);
            this.setState({inThisBitch: true, coupon})
        })
      }
    };
    this.zone2.onExitAction = context => {
      console.log("zone2 onExit", context);
      console.log("inThisBitch", context.attachments.inThisBitch);
      if (context.attachments.inThisBitch) {
        this.setState({inThisBitch: false})
      }
    };
    this.zone2.onChangeAction = contexts => {
      console.log("zone2 onChange", contexts);
      // console.log(contexts[0].attachments);
    };
  };

  state = {
    testState: "State is Working",
    inThisBitch: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Digital Billboards!</Text>
        <Text style={styles.welcome}>
          Exclusive Promotions Coming Your Way!
        </Text>
        <Text style={styles.welcome}>
          {this.state.inThisBitch ? this.state.coupon : "No Deals Near"}
        </Text>
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
