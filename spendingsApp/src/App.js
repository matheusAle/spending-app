import React, {Component} from 'react';
import {light, mapping} from '@eva-design/eva';
import { Provider as ReduxProvider } from 'react-redux';
import { ApplicationProvider as KittenProvider} from 'react-native-ui-kitten';

import './config/reactotron';
import store from './store'
import { Routes } from './Routes'

export default class App extends Component {

    render() {
        return (
          <ReduxProvider store={store}>
              <KittenProvider mapping={mapping} theme={light}>
                  <Routes />
              </KittenProvider>
          </ReduxProvider>
        )
    }
}
