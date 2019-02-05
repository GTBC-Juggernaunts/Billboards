import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../style';
import { CardList } from '../../cardlist';
import DropdownAlert from 'react-native-dropdownalert';

import API from '../../../Utils/API/api';

// Beacon library
import * as RNEP from '@estimote/react-native-proximity';

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
      // TODO: function to render promo cards
      // 2 ways to get the promos tab
      //    1- 'get started' button on home tab switches screens on press then creates proximity sensor
      // if user is close to beacon it will render promos
      // else it won't do anything
      //    2- if user directly presses the coupons tab it will create the proximity senor
      // if user is close to beacon it will render promos
      // else it won't do anything
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  // Create a new zone
  zone2 = new RNEP.ProximityZone(1, 'DigitalBillboard');

  enterAction = () => {
    console.log('Starting a enterAction');

    RNEP.locationPermission.request().then(permission => {
      // Check permission status
      if (permission !== RNEP.locationPermission.DENIED) {
        const ESTIMOTE_APP_ID = 'digital-billboard-app-026';
        const ESTIMOTE_APP_TOKEN = 'd6056fd23e22b958f7d478b2196e2c11';
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
      console.log('beaconInfo', context.attachments.beaconInfo);
      if (context.attachments.beaconInfo) {
        axios
          .get(localhost + 'api/promos?' + context.attachments.beaconInfo)
          .then(res => {
            const data = res.data;
            console.log('coupon retrieved', data);
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

    // onChange event gives you granular data about which exact beacons are in range
    this.zone2.onChangeAction = contexts => {
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
        // retrieve matching promos from db
        loadPromoCards();
      } else {
        // don't do anything since either a beacon most likely went out of range
        console.log(
          'no beacons in onChangeAction... current state:',
          this.state.beacon
        );
      }
    };

    // redeem promo button on cards
    redeemPromo = (promoId, userId, promoDescription) => {
      const promotion = { PromotionId: promoId, UserId: userId };
      API.redeemPromotion(promotion)
        .then(res => {
          console.log('redeemPromotion response', res);
          // alert(`${promoDescription} Has Been Redeemed`);
          this.dropdown.alertWithType(
            'success',
            'Promotion Successfully Redeemed',
            `${promoDescription}`
          );
        })
        .catch(err => console.log('err', err));
    };

    // load cards with promos
    loadPromoCards = () => {
      API.getPromotions()
        .then(res => {
          let promoCard = [];
          res.data.forEach(promo => {
            // get correct promo card image
            let promoCardImage = this.chooseCardImage(promo.PreferenceGroup);
            console.log('promoCardImage', promoCardImage);
            promoCard.push({
              id: promo._id,
              title: promo.PromotionText,
              picture: require(promoCardImage),
              content: (
                <Button
                  buttonStyle={styles.button}
                  title={'Redeem'}
                  onPress={() =>
                    redeemPromo(
                      promo._id,
                      '5c58e0a81fd72e002a0d8f43',
                      promo.PromotionText
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

    // choose stock promo card image
    // TODO: figure out why this image switch case is not rendering correct image locally
    chooseCardImage = category => {
      switch (category) {
        case 'footwear':
          return '../../../assets/product.jpg';
        case 'food':
          return '../../../assets/food.jpeg';
        // default:
        //   return '../../../assets/goals.jpg';
      }
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
      if (array === undefined || array.length === 0) {
        console.log('tempArr: undefined block BEFORE push method', tempArr);
        tempArr.push({ name: beaconName, timestamp: currentTime });
        console.log(
          'tempArr: undefined block AFTER push method...return tempArr...API CALL',
          tempArr
        );
        // TODO: API call here because no beacons have been triggered yet
        return tempArr;
      } else if (!mapBeaconArr.includes(beaconName)) {
        // if triggered beacon doesn't exist in current state
        console.log('include method', mapBeaconArr.includes(beaconName));
        // push the beacon into the array and return
        tempArr = array;
        tempArr.push({ name: beaconName, timestamp: currentTime });
        console.log('tempArr', tempArr);
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
              'beacon triggered more than 10 minutes ago: return tempArr...API CALL',
              tempArr
            );
            return tempArr;
          } else {
            // beacon has been triggered & timestamp < 10 min return this.state.beacon array
            console.log(
              'beacon has been triggered within 10 minutes: return array... NO API CALL',
              array
            );
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
