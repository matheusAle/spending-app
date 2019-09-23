import React, { useState, useEffect } from 'react';
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
import { SpendingForm, App } from "@store";

const AppContainer = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Routes onNavigationStateChange={(prevState, currentState) => {
                dispatch(App.nav({ prevState, currentState }))
            }}/>
            <Loading />
        </>
    )
};

export default () => {

    return (
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <KittenProvider mapping={mapping} theme={light}>
                    <AppContainer />
                </KittenProvider>
            </ReduxProvider>
        </ApolloProvider>
    )
}
