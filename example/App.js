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
    beacon: [
      // { name: "purple-haze", timestamp: 9999999999999 },
      // { name: "mint-leaf", timestamp: 9999999999999 }
    ]
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
      // console.log("beaconInfo", context.attachments.beaconInfo);
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
    // onChange event gives you granular data about which exact beacons are in range
    this.zone2.onChangeAction = contexts => {
      console.log("zone2 onChange", contexts);
      // beacon array to setState
      let beaconArr = [];

      // TODO: need to add logic to handle if onChangeAction method triggers empty beacon
      console.log("contexts length", contexts.length);
      if (contexts.length !== 0) {
        // loop through all beacons that are in the context array from the onChangeAction
        contexts.forEach(nearbyBeacons => {
          // pass in beacons within range and beacon array in current state
          const resultObj = this.triggeredBeaconHandler(
            nearbyBeacons.attachments.beaconInfo,
            this.state.beacon
          );
          console.log("resultObj", resultObj);
          // set result of triggeredBeaconHandler to beaconArr to setState
          beaconArr = resultObj;
          console.log("beaconArr", beaconArr);
        });
        // setState the beaconArr
        this.setState({ beacon: beaconArr });
        console.log(`state onChange`);
        console.log(this.state);
      } else {
        // don't do anything since either a beacon most likely went out of range
        console.log(
          "no beacons in onChangeAction... current state:",
          this.state.beacon
        );
      }
    };
  };
  // method to handle the state management of triggered beacons
  triggeredBeaconHandler = (beaconName, array) => {
    // current time in milliseconds
    const currentTime = +new Date();
    console.log("beaconName argument: beacon within range", beaconName);
    console.log("array argument: this.state.beacon arr", array);

    // temp array to handle pushing triggered beacons into
    let tempArr = [];

    // return array of just beacon names from current state
    const mapBeaconArr = array.map(beacon => beacon.name);
    console.log("mapBeaconArr", mapBeaconArr);

    // handler for when this.state.beacon array is empty
    if (array === undefined || array.length === 0) {
      console.log("tempArr: undefined block BEFORE push method", tempArr);
      tempArr.push({ name: beaconName, timestamp: currentTime });
      console.log("tempArr: undefined block AFTER push method...return tempArr...API CALL", tempArr);
      // TODO: API call here because no beacons have been triggered yet
      return tempArr;
    } else if (!mapBeaconArr.includes(beaconName)) {
      // if triggered beacon doesn't exist in current state
      console.log("include method", mapBeaconArr.includes(beaconName));
      // push the beacon into the array and return
      tempArr = array;
      tempArr.push({ name: beaconName, timestamp: currentTime });
      console.log("tempArr", tempArr);
      // TODO: send request to server since beacon hasn't been triggered
      return tempArr;
    } else {
      // loop through beacons to see if they've been discovered within 10 minutes
      for (let i = 0; i < array.length; i++) {
        // time difference from current time and last time the beacon was triggered
        let timeDifference = currentTime - array[i].timestamp;
        console.log(
          `timeDifference: array.name:${
            array[i].name
          }, beaconName: ${beaconName} timeDifference${timeDifference}`
        );
        // beacon has already been triggered & timestamp > 10 min
        if (array[i].name === beaconName && timeDifference > 600000) {
          // TODO: send request to server to check for new promos since 10 minutes have passed
          tempArr = array.push({
            name: array[i].name,
            timestamp: currentTime
          });
          console.log(
            "beacon triggered more than 10 minutes ago: return tempArr...API CALL",
            tempArr
          );
          return tempArr;
        } else {
          // beacon has been triggered & timestamp < 10 min return this.state.beacon array
          console.log(
            "beacon has been triggered within 10 minutes: return array... NO API CALL",
            array
          );
          return array;
        }
      }
    }
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
        <Text>
          {this.state.connected ? this.state.data.tag + ": tag nearby" : ""}
        </Text>
        <Text style={styles.instructions}>{Instructions}</Text>
        <Button onPress={this.enterAction} title="Get Started" />
      </View>
    );
  }
}
