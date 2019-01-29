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

      // loop through all beacons that are in the context array from the onChangeAction
      contexts.forEach(nearbyBeacons => {
        // pass in beacons within range and beacon array in current state
        // TODO: need to add logic to handle an empty array being passed into checkBeacon()
        const resultObj = this.checkBeacon(nearbyBeacons.attachments.beaconInfo,this.state.beacon);
        console.log("resultObj", resultObj);
        // push beacons to the beaconArr
        // beaconArr.push(resultObj);
        // beaconArr.push(resultObj);        
        beaconArr = resultObj;        
        console.log("beaconArr", beaconArr);
      });
      // setState the beaconArr
      this.setState({ beacon: beaconArr });
      console.log(`state onChange`);
      console.log(this.state);
    };
  };
  // if it's more than 10 min that's when you 
  checkBeacon = (beaconName, array) => {
    // check for empty array 
    // if its empty than return the new beacon

    // current time in milliseconds
    const currentTime = +new Date();
    console.log("beaconName", beaconName)
    console.log("ARRAY", array)
    

    if (array === undefined || array.length == 0) {
      console.log('array is undefined', { name: beaconName, timestamp: currentTime })
      const newArr = []
      newArr.push({ name: beaconName, timestamp: currentTime });
          console.log('undefined block, newArr', newArr);
          return newArr; 
    } else {
      // loop through beacons to see if they've been discovered within 10 minutes
      for (let i = 0; i < array.length; i++) {
        // time difference from current time and last time the beacon was triggered
        let timeDifference = currentTime - array[i].timestamp;
        console.log(`timeDifference: ${array[i].name}, ${timeDifference}`);
        // beacon has already been triggered & timestamp > 10 min
        if (array[i].name === beaconName && timeDifference > 600000) {
          console.log(`Beacon Triggered: ${array[i].name} timestamp > 10 min: ${array[i].timestamp}`);
          // TODO: send request to server to check for new promos since 10 minutes have passed
          // TODO: need to find the beacon that has expired and update its timestamp to currentTime
          let newArr = array.push({ name: array[i].name, timestamp: currentTime });
          console.log('newArr', newArr);
          return newArr; 
          // beacon has been triggered & timestamp < 10 min return the beacon without altering its time
        } else if (array[i].name === beaconName && timeDifference < 600000) {
          // return the current state 
          console.log(`beacon has been less than 10 minutes ago array: ${array[i].name}... BeaconName ${beaconName}`)
          console.log('else if', array)
          return array;          
          // return { name: beaconName, timestamp: array[i].timestamp };
        } else {
          // push it to the array then return 
          // beacon has not been triggered yet; return beacon with the current time
          console.log(`beacon hasn't been triggered: ${beaconName} currentTime: ${currentTime}`);
          // TODO: send request to server to check for new promos
          // TODO: need to find a way to remove the existing beacon from array 
          
          console.log('ARRAYYY', array)
          let newArr = array;
          // const filterArr = newArr.filter(duplicateBeacon => duplicateBeacon.name != beaconName)
          newArr.push({ name: beaconName, timestamp: currentTime });
          console.log('newArr', newArr);
          return newArr; 
          // return { name: beaconName, timestamp: currentTime };
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
