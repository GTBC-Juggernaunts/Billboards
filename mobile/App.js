// Dependencies
import React, { Component } from "react";
import AppNavigator from './components/Navigator'

export default class App extends Component {
  // // App State
  // state = {
  //   testState: "State is Working",
  //   connected: false,
  //   tags:[],
  // };


  // // Create a new zone 
  // zone2 = new RNEP.ProximityZone(1, "DigitalBillboard");

  // // Methods to interact with beacons
  // enterAction = () => {
  //   const ESTIMOTE_APP_ID = "digital-billboard-8gj";
  //   const ESTIMOTE_APP_TOKEN = "9dff6faa96af5162dd8b20ec44e49ea5";
  //   const credentials = new RNEP.CloudCredentials(
  //     ESTIMOTE_APP_ID,
  //     ESTIMOTE_APP_TOKEN
  //   );

  //   // Notification
  //   const config = {
  //     notification: {
  //       title: "Exploration mode is on",
  //       text: "We will notify you when you are next to something interesting.",
  //       channel: {
  //         id: "exploration-mode",
  //         name: "Exploration Mode"
  //       }
  //     }
  //   };
  //   console.log("zone2", this.zone2);
  //   RNEP.proximityObserver.initialize(credentials, config);
  //   RNEP.proximityObserver.startObservingZones([this.zone2]);

  //   this.zone2.onEnterAction = context => {
  //     console.log("onEnterAction", context);
  //     console.log("beaconInfo", context.attachments.beaconInfo);
  //     if (context.attachments.beaconInfo) {
  //       axios.get(localhost + "/api/promo/?" + context.attachments.beaconInfo)
  //         .then(res=> {
  //           const data = res.data;
  //           console.log("coupon retrieved", data);
  //           this.setState({
  //             connected: true,
  //             data: {
  //               tag: data[0].BeaconTag,
  //               coupon: data[0].PromotionText
  //             }
  //           })
  //         })
  //     }
  //   };
  //   this.zone2.onExitAction = context => {
  //     console.log("zone2 onExit", context);
  //     console.log("beaconInfo", context.attachments.beaconInfo);
  //     if (context.attachments.beaconInfo) {
  //       this.setState({connected: false})
  //     }
  //   };
  //   this.zone2.onChangeAction = contexts => {
  //     console.log("zone2 onChange", contexts);
  //     // console.log(contexts[0].attachments);
  //   };
  // };

  render() {
    return (
      <AppNavigator/>
    );
  }
};