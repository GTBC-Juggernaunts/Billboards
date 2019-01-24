import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home'
import Test from '../screens/test'
import Beacon from '../screens/beacons'

const navStack = createStackNavigator({
    HomeScreen: {
        screen: Home,
    },
    TestScreen: {
        screen: Test,
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