import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home/home'
import Register from '../screens/home/register'
import Beacon from '../screens/coupons/beacons'
import { Icon } from 'react-native-vector-icons/FontAwesome';


// Screen within Tabs
const homeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            tabBarIcon: () => {
                <Icon name="home" size={20} />
            }
        })
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
                showLabel: false,
                activeTintColor: 'red',
            },
        }
    )
);

export default AppNavigator;