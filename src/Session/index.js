import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import NavigationMenu from './NavigationMenu';

import DebugView from '../Shared/DebugView';
import DraftView from '../Shared/DraftView';

import Home from '../Home';
import SettingsView from './SettingsView';
import AboutView from './AboutView';

const extra = process.env.NODE_ENV === 'development'
  ? {
    '/debug': { screen: DebugView },
    '/draft': { screen: DraftView },
  }
  : {};

const MainStack = createBottomTabNavigator(
  {
    '/home': { screen: Home,
     navigationOptions: ({ screenProps }) => ({
        tabBarLabel: "News"
      })},
    '/profile': { screen: SettingsView,
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: "settings"
      })},
  },
  {
    initialRouteName: '/home',
  },
);

const RootStack = createStackNavigator(
  {
    '/main': { screen: MainStack },
    '/about': { screen: AboutView },
    '/modal': {
      screen: (props) => {
        return props.navigation.state.params.render ? props.navigation.state.params.render(props) : null;
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: '/main',
    transparentCard: true,
  },
);

export default createAppContainer(RootStack);
