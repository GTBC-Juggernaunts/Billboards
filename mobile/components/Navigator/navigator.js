import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home/home'
import Beacon from '../screens/coupons/beacons'

// Tabs on screen
const navStack = createBottomTabNavigator({
    Home: {
        screen: Home,
    },
    Coupons: {
        screen: Beacon,
    }
},
{
    tabBarOptions: {
        activeBackgroundColor: "black",
    }
});

// Screen within Tabs
const homeStack = createStackNavigator({
    Home: {
        screen: Home
    }
}, {
    initialRouteName: 'Home',
    headerMode: "none",
});

const couponStack = createStackNavigator({
    Coupons: {
        screen: Beacon
    }
}, {
    headerMode: "none"
});

const AppNavigator = createAppContainer(createBottomTabNavigator({
    Home: homeStack,
    Coupons: couponStack,
},
{
    tabBarOptions: {
        activeTintColor: 'red'
    }
}));

export default AppNavigator;