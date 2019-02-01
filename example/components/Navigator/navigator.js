import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import Home from '../screens/home'

const navStack = createStackNavigator({
    HomeScreen: {
        screen: Home,
    },
},
{
    headerMode: "none"
});

const AppNavigator = createAppContainer(navStack);

export default AppNavigator;