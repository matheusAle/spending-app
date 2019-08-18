

import React from 'react';

import { HomeRoutes } from './Routes'
import { useDispatch } from "react-redux";
import { App } from "../../../store";
export default ({ navigation }) => {

    const dispatch = useDispatch();

    const onNavigation = (prevState, currentState) => {
        dispatch(App.nav({ prevState, currentState }))
    };

    return (
        <HomeRoutes onNavigationStateChange={onNavigation}/>
    )

};