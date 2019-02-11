import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from '../screens/home/home';
import Register from '../screens/home/register';
import Beacon from '../screens/coupons/beacons';

// Screen within Tabs
const homeStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Register: {
      screen: Register
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const couponStack = createStackNavigator(
  {
    Promotions: {
      screen: Beacon
    }
  },
  {
    headerMode: 'none'
  }
);

// Tab menu at bottom of the screen
const AppNavigator = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: homeStack,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={20} color={tintColor} />
          )
        })
      },
      Promotions: {
        screen: couponStack,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name="shopping-bag"
              type="font-awesome"
              size={20}
              color={tintColor}
            />
          )
        })
      }
    },
    {
      swipeEnabled: false,
      tabBarOptions: {
        activeTintColor: 'red',
      }
    }
  )
);

export default AppNavigator;
