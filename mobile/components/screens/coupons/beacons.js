import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../style';
import { CardList } from '../../cardlist';
import DropdownAlert from 'react-native-dropdownalert';

import API from '../../../Utils/API/api';

// Beacon library
import * as RNEP from '@estimote/react-native-proximity';

require('dotenv').config();

export default class beacons extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    connected: false,
    beacon: [],
    cards: []
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      console.log('We are listening');
      this.enterAction();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  // Create a new zone
  zone2 = new RNEP.ProximityZone(1, 'DigitalBillboard');

  enterAction = () => {
    console.log('Starting a enterAction');
    console.log('State', this.state);

    RNEP.locationPermission.request().then(permission => {
      // Check permission status
      if (permission !== RNEP.locationPermission.DENIED) {
        const ESTIMOTE_APP_ID = REACT_APP_ESTIMOTE_ACCOUNT;
        const ESTIMOTE_APP_TOKEN = REACT_APP_ESTIMOTE_KEY;
        const credentials = new RNEP.CloudCredentials(
          ESTIMOTE_APP_ID,
          ESTIMOTE_APP_TOKEN
        );

        // Notification
        const config = {
          notification: {
            title: 'Exploration mode is on',
            text:
              'We will notify you when you are next to something interesting.',
            channel: {
              id: 'exploration-mode',
              name: 'Exploration Mode'
            }
          }
        };

        RNEP.proximityObserver.initialize(credentials, config);
        RNEP.proximityObserver.startObservingZones([this.zone2]);
      }
    });

    // Entering the beacons zone
    this.zone2.onEnterActon = context => {
      console.log('context: onEnterAction', context);
      console.log('beaconInfo onEnterAction', context.attachments.beaconInfo);
    };

    // onChange event gives you granular data about which exact beacons are in range
    this.zone2.onChangeAction = contexts => {
      console.log('Onchange State', this.state);
      console.log('zone2 onChange', contexts);
      // beacon array to setState
      let beaconArr = [];

      console.log('contexts length', contexts.length);
      if (contexts.length !== 0) {
        // loop through all beacons that are in the context array from the onChangeAction
        contexts.forEach(nearbyBeacons => {
          // pass in beacons within range and beacon array in current state
          const resultObj = triggeredBeaconHandler(
            nearbyBeacons.attachments.beaconInfo,
            this.state.beacon
          );
          console.log('resultObj', resultObj);
          // set result of triggeredBeaconHandler to beaconArr to setState
          beaconArr = resultObj;
          console.log('beaconArr', beaconArr);
        });
        // setState the beaconArr
        this.setState({ beacon: beaconArr });
        console.log(`state onChange`);
        console.log(this.state);
        // array of beacon tags
        if (this.state.beacon != undefined || this.state.beacon.length !== 0) {
          const beaconTagArr = this.state.beacon.map(beacon => beacon.name);
          // retrieve matching promos from db
          // TODO: hard coded user here -- peter's user: 5c58e0a81fd72e002a0d8f43
          // TODO: hard coded user here -- Leebron's user: 5c5933aae536be002ac710d4
          loadPromoCards('5c58e0a81fd72e002a0d8f43', beaconTagArr);
        }
      } else {
        // don't do anything since either a beacon most likely went out of range
        console.log(
          'no beacons in onChangeAction... current state:',
          this.state.beacon
        );
      }
    };

    // redeem promo button on cards
    redeemPromo = (promoId, userId, promoDescription, beaconTag) => {
      const promotion = { PromotionId: promoId, UserId: userId };
      API.redeemPromotion(promotion)
        .then(res => {
          console.log('redeemPromotion response', res);
          this.dropdown.alertWithType(
            'success',
            'Promotion Successfully Redeemed',
            `${promoDescription}`
          );
          // re-render cards after redemption
          loadPromoCards(userId, beaconTag);
        })
        .catch(err => console.log('err', err));
    };

    // load cards with promos
    loadPromoCards = (userId, beaconTag) => {
      const promotion = { UserId: userId, BeaconTag: beaconTag };
      API.getPromotionsByUser(promotion)
        .then(res => {
          let promoCard = [];
          res.data.forEach(promo => {
            promoCard.push({
              id: promo._id,
              title: promo.PromotionText,
              picture: require('../../../assets/sale.png'),
              // picture: require(promoCardImage),
              content: (
                <Button
                  buttonStyle={styles.button}
                  title={'Redeem'}
                  onPress={() =>
                    redeemPromo(
                      promo._id,
                      // TODO: pass correct user id 
                      '5c58e0a81fd72e002a0d8f43',
                      promo.PromotionText,
                      beaconTag
                    )
                  }
                />
              )
            });
          });
          // setState promo data into cards
          this.setState({
            cards: promoCard
          });
        })
        .catch(err => console.log('err getPromos', err));
    };

    // method to handle the state management of triggered beacons
    triggeredBeaconHandler = (beaconName, array) => {
      // current time in milliseconds
      const currentTime = +new Date();
      console.log('beaconName argument: beacon within range', beaconName);
      console.log('array argument: this.state.beacon arr', array);

      // temp array to handle pushing triggered beacons into
      let tempArr = [];

      // return array of just beacon names from current state
      const mapBeaconArr = array.map(beacon => beacon.name);
      console.log('mapBeaconArr', mapBeaconArr);

      // handler for when this.state.beacon array is empty
      if (array == undefined || array.length === 0) {
        tempArr.push({ name: beaconName, timestamp: currentTime });
        return tempArr;
      } else if (!mapBeaconArr.includes(beaconName)) {
        // if triggered beacon doesn't exist in current state
        // push the beacon into the array and return
        tempArr = array;
        tempArr.push({ name: beaconName, timestamp: currentTime });
        console.log('tempArr', tempArr);
        return tempArr;
      } else {
        // loop through beacons to see if they've been discovered within 10 minutes
        for (let i = 0; i < array.length; i++) {
          // time difference from current time and last time the beacon was triggered
          let timeDifference = currentTime - array[i].timestamp;
          // beacon has already been triggered & timestamp > 10 min
          if (array[i].name === beaconName && timeDifference > 600000) {
            tempArr = array.push({
              name: array[i].name,
              timestamp: currentTime
            });
            return tempArr;
          } else {
            // beacon has been triggered & timestamp < 10 min return this.state.beacon array
            return array;
          }
        }
      }
    };

    // Exit beacon range
    this.zone2.onExitAction = context => {
      console.log('zone2 onExit', context);
      console.log('beaconInfo', context.attachments.beaconInfo);
      if (context.attachments.beaconInfo) {
        this.setState({ connected: false });
      }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <CardList style={styles.coupons} cards={this.state.cards} />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}
