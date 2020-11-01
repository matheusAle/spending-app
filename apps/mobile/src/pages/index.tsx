import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import PrivatePage from './Private';
import AuthPage from './Auth';

// tslint:disable-next-line:interface-over-type-literal
export type PagesStackParamList = {
  Auth: undefined;
  Private: undefined;
};

const { Navigator, Screen } = createStackNavigator<PagesStackParamList>();

export default () => (
  <Navigator
    initialRouteName='Auth'
    headerMode='none'
  >
    <Screen
      name='Auth'
      component={AuthPage}
    />
    <Screen
      name='Private'
      component={PrivatePage}
    />
  </Navigator>
);
