import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform } from 'react-native';

import MainTabNavigator from './MainTabNavigator';

import ArticlesScreen from '../screens/ArticlesScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ArticlesStack = createStackNavigator(
  {
    Articles: ArticlesScreen,
  },
  config
);

ArticlesStack.path = '';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Articles: ArticlesStack
  })
);
