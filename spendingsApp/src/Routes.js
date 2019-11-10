import React from 'react';
import {
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomePage from "./pages/Home";
import UserPage from "./pages/User/Routes";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

export const Routes = createAppContainer(
    createSwitchNavigator({
        Auth: createStackNavigator({
                Login: LoginPage,
                Register: RegisterPage
            }, {
                headerMode: 'none',
                initialRouteName: 'Login'
            }
        ),
        Private: createStackNavigator({
            Home: HomePage,
            User: UserPage,
        }, {
            headerMode: 'none',
            initialRouteName: 'Home'
        })
    }, {
        initialRouteName: 'Auth',
    })
);
