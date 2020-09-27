console.disableYellowBox = true;
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const RNAsyncStorageFlipper = require('rn-async-storage-flipper')
  RNAsyncStorageFlipper.default(AsyncStorage);
}

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from '@/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
