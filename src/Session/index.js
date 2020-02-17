import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import NavigationMenu from './NavigationMenu';

import DebugView from '../Shared/DebugView';
import DraftView from '../Shared/DraftView';

import Home from '../Home';
import ProfileView from './ProfileView';
import AboutView from './AboutView';

const extra = process.env.NODE_ENV === 'development'
  ? {
    '/debug': { screen: DebugView },
    '/draft': { screen: DraftView },
  }
  : {};

const MainStack = createDrawerNavigator(
  {
    ...extra,
    '/home': { screen: Home },
    '/profile': { screen: ProfileView },
    '/about': { screen: AboutView },
  },
  {
    contentComponent: NavigationMenu,
    initialRouteName: '/home',
  },
);

const RootStack = createStackNavigator(
  {
    '/main': { screen: MainStack },
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
