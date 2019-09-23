import React from 'react';
import {
    createSwitchNavigator,
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import HomePage from "./pages/Private/Home";
import UserPage from "./pages/Private/User";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

export const Routes = createAppContainer(
  createSwitchNavigator({
    Auth: createStackNavigator({
            Login: {
                path: 'Auth/Login',
                screen: LoginPage,
            },
            Register: {
                path: 'Auth/Register',
                screen: RegisterPage
            }
        }, {
            headerMode: 'none',
        }
    ),
    Private: createStackNavigator({
        Home: {
            path: 'Private/Home',
            screen: HomePage
        },
        User: {
            path: 'Private/User',
            screen: UserPage
        },
    }, {
        headerMode: 'none',
        initialRouteName: 'Home'
    })
  }, {
      initialRouteName: 'Private',
  })
);
