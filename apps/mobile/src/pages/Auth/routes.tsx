import React from 'react';
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import LoginPage, { LoginRouteParams } from "./Login";
import RegisterPage, { RegisterRouteParams } from "./Register";
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { PagesStackParamList } from "@/pages";

export type AuthStackParamList = {
  Login: LoginRouteParams;
  Register: RegisterRouteParams;
}

export type LoginNavigationProps = CompositeNavigationProp<
  StackNavigationProp<PagesStackParamList, 'Auth'>,
  StackNavigationProp<AuthStackParamList>
>;

// const nav = useNavigation<LoginNavigationProps>();
//
// nav.navigate('Private');


const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

export const AuthRoutes = () => (
  <Navigator
    initialRouteName="Login"
    headerMode="none"
  >
    <Screen
      name="Login"
      component={LoginPage}
    />
    <Screen
      name="Register"
      component={RegisterPage}
    />
  </Navigator>
);
