

import { createStackNavigator } from 'react-navigation';

import { Login } from './Login'
import { Register } from './Register'

export const Routes = createStackNavigator({
    Login: {
        path: 'Auth/Login',
        screen: Login,
    },
    Register: {
        path: 'Auth/Register',
        screen: Register
    }
  }, {
    headerMode: 'none'
  }
);
