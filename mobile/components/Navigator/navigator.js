import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import { Icon } from 'react-native-elements'
import Home from '../screens/home/home'
import Register from '../screens/home/register'
import Beacon from '../screens/coupons/beacons'


// Screen within Tabs
const homeStack = createStackNavigator({
    Home: {
        screen: Home,
    },
    Register: {
        screen: Register,
    },
}, {
    initialRouteName: 'Home',
    headerMode: "none",
});

const couponStack = createStackNavigator({
    Coupons: {
        screen: Beacon,
        navigationOptions: () => ({
            tabBarIcon: () => {
                <Icon name="shopping-bag" size={20} />
            }
        })
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
                showIcon: true,
                activeTintColor: 'red',
            },
        }
    )
);

export default AppNavigator;