import { createStackNavigator } from 'react-navigation-stack';

import HomeView from './HomeView';

export default createStackNavigator(
  {
    '/home/main': { screen: HomeView },
  },
  {
    headerMode: 'none',
    initialRouteName: '/home/main',
  },
);
