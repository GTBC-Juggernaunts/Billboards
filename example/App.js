// Dependencies
import axios from "axios";
import React, { Component } from "react";
import { Text, View, AppRegistry, Button } from "react-native";
import AppNavigator from "./components/Navigator";
import Instructions from "./components/instructions";
import styles from "./components/style";
import * as RNEP from "@estimote/react-native-proximity";

// the IP address of the computer you are running server.js on with the PORT
const localhost = "http://192.168.1.3:4000";
export default class App extends Component {
  // App State
  state = {
    connected: false,
    beacon: [{name:'purple-haze'}]
  };

  // Create a new zone
  zone2 = new RNEP.ProximityZone(1, "DigitalBillboard");

  // Methods to interact with beacons
  enterAction = () => {
    const ESTIMOTE_APP_ID = "digital-billboard-app-026";
    const ESTIMOTE_APP_TOKEN = "d6056fd23e22b958f7d478b2196e2c11";
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
    console.log("zone2", this.zone2);

    // Initialize zones and start listening for beacons
    RNEP.proximityObserver.initialize(credentials, config);
    RNEP.proximityObserver.startObservingZones([this.zone2]);

    // triggers when customer is within range of beacon for the 1st time
    this.zone2.onEnterAction = context => {
      console.log("onEnterAction", context);
      console.log("beaconInfo", context.attachments.beaconInfo);
      if (context.attachments.beaconInfo) {
        axios
          .get(localhost + "/api/promo/?" + context.attachments.beaconInfo)
          .then(res => {
            const data = res.data;
            console.log("coupon retrieved", data);
            this.setState({
              connected: true,
              data: {
                tag: data[0].BeaconTag,
                coupon: data[0].PromotionText
              }
            });
            console.log("state, onEnter", this.state);
          });
      }
    };

    // triggers when customer exits range of beacon
    this.zone2.onExitAction = context => {
      console.log("zone2 onExit", context);
      console.log("beaconInfo", context.attachments.beaconInfo);
      if (context.attachments.beaconInfo) {
        this.setState({ connected: false });
      }
    };
    // if beaconInfo exists in current state then do nothing
    // else
    this.zone2.onChangeAction = contexts => {
      console.log("zone2 onChange", contexts);
      // beacon array to setState
      const beaconArr = [];


      contexts.forEach(beacon => {
        // if user hasn't walked near the beacon then add beacon to state
        // if (!this.state.beacon.includes(beacon.attachments.beaconInfo)) {
        //   console.log(
        //     "This doesn't exist in state",
        //     beacon.attachments.beaconInfo
        //   );
        //   // push beacons to array that don't currently exists in state
        //   beaconArr.push({
        //     name: beacon.attachments.beaconInfo,
        //     timeStamp: Date.now()
        //   });
        //   this.setState({ beacon: beaconArr });
        //   console.log("state, onChange", this.state);
        // }
        // pass in beacon name and beacons are that in state
        const resultObj = this.checkBeacon(beacon.attachments.beaconInfo, this.state.beacon);
        console.log('resObj',resultObj)
        beaconArr.push({name:resultObj});
        console.log('beaconArr', beaconArr);
      });
    };
  };

  checkBeacon = (nameKey, array) => {
    for (let i=0; i < array.length; i++) {
      // if customer has went near beacon
      if (array[i].name === nameKey) {
        console.log(`Matches: ${array[i].name}`)
        return array[i].name
      } else {
        // else customer has not went near beacon
        console.log(`Doesn't Match: ${array[i].name}`)
        return nameKey
      }
    }
  }

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
        <Text>
          {this.state.connected ? this.state.data.tag + ": tag nearby" : ""}
        </Text>
        <Text style={styles.instructions}>{Instructions}</Text>
        <Button onPress={this.enterAction} title="Get Started" />
      </View>
    );
  }
}
