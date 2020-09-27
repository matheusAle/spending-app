import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomePage from './pages/Home';
import { LoginRouteParams } from '@/pages/Auth/Login';
import { RegisterRouteParams } from '@/pages/Auth/Register';
import { CompositeNavigationProp } from '@react-navigation/core';
import { PagesStackParamList } from '@/pages';
import UserPage, { UserStackParamsList } from './pages/User/routes';
import { HomeStackParamList } from './pages/Home/routes';

export interface PrivateStackParamList {
  Home: HomeStackParamList;
  User: UserStackParamsList;
}

export type HomeNavigationProps = CompositeNavigationProp<
  StackNavigationProp<PagesStackParamList, 'Private'>,
  StackNavigationProp<PrivateStackParamList>
>;

const { Navigator, Screen } = createStackNavigator<PrivateStackParamList>();

export const PrivateRoutes = () => (
  <Navigator
    initialRouteName='Home'
    headerMode='none'
  >
    <Screen
      name='Home'
      component={HomePage}
    />
    <Screen
      name='User'
      component={UserPage}
    />
  </Navigator>
);
