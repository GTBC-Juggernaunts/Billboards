import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home/home'
import Register from '../screens/home/register'
import Beacon from '../screens/coupons/beacons'


// Screen within Tabs
const homeStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    // Login: {
    //     screen: Login
    // },
    Register: {
        screen: Register,
    },
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

// Tab menu at bottom of the screen
const AppNavigator = createAppContainer(createBottomTabNavigator({
        Home: homeStack,
        Coupons: couponStack,
    },
        {
            swipeEnabled: false, 
            tabBarOptions: {
                activeTintColor: 'red',
            },
        }
    )
);

export default AppNavigator;