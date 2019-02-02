import {
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home'
import Beacon from '../screens/beacons'

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

const AppNavigator = createAppContainer(navStack);

export default AppNavigator;