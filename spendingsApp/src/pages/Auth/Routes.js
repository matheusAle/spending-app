

import { createStackNavigator } from 'react-navigation';

import { Login } from './Login'
import { Register } from './Register'

export const Routes = createStackNavigator({
    Login,
    Register
  }, {
    headerMode: 'none'
  }
);
