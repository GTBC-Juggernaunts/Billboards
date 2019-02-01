import {
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home'
import Beacon from '../screens/beacons'

const navStack = createBottomTabNavigator({
    HomeScreen: {
        screen: Home,
    },
    BeaconScreen: {
        screen: Beacon,
    }
},
{
    headerMode: "none"
});

const AppNavigator = createAppContainer(navStack);

export default AppNavigator;