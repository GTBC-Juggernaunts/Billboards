import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';

const beaconComponent = (props) => {
  return (
    <View>
      <Text>{props.tags}</Text>
    </View>
  )
};

export default beaconComponent