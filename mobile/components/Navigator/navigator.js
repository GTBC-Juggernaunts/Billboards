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
    Promotions: {
        screen: Beacon,
    }
},
{
    tabBarOptions: {
        activeBackgroundColor: "pink",
    }
});

const AppNavigator = createAppContainer(navStack);

export default AppNavigator;