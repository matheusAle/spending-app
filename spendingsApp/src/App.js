import React, {Component} from 'react';
import {light, mapping} from '@eva-design/eva';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { ApplicationProvider as KittenProvider} from 'react-native-ui-kitten';
import { ApolloProvider } from 'react-apollo';
import { client } from 'services/client';
import Loading from 'components/loader';

if (__DEV__) {
    import('./config/reactotron').then(() => console.tron.log('Started!'))
}

import store from './store'
import { Routes } from './Routes'


export default () => {

    return (
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <KittenProvider mapping={mapping} theme={light}>
                    <Routes/>
                    <Loading />
                </KittenProvider>
            </ReduxProvider>
        </ApolloProvider>
    )
}
