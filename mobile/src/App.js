import React, { useEffect } from 'react';
import {light, mapping} from '@eva-design/eva';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { ApplicationProvider as KittenProvider} from 'react-native-ui-kitten';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '@/services/client';
import Loading from '@/components/loader';

import store, { App } from './store'
import { Routes } from './routes'
import { AppState } from "react-native";
import {async, getActiveRouteName} from "@/utils";

const AppContainer = () => {
    const dispatch = useDispatch();
    const app = useSelector(store => store.App);

    const stateChange = nextState => {
        if (app.state.match(/inactive|background/) && nextState === 'active') {
            dispatch(App.setState(nextState))
        }
    };

    useEffect(async(async () => {
       dispatch(App.setState(AppState.currentState));
    }));

    useEffect(() => {
        AppState.addListener('change', stateChange);
        return () => AppState.removeEventListener('change', stateChange)
    });

    return (
        <>
            <Routes onNavigationStateChange={(prevState, currentState) => {

                const currentScreen = getActiveRouteName(currentState);
                const prevScreen = getActiveRouteName(prevState);

                if (prevScreen !== currentScreen) {
                    dispatch(App.nav(prevScreen, currentScreen))
                }
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
