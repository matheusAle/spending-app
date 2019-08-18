import React from 'react';

import { Routes } from './Routes'
import { useDispatch } from "react-redux";
import { App } from "../../store";
export default () => {

    const dispatch = useDispatch();

    const onNavigation = (prevState, currentState) => {
        dispatch(App.nav({ prevState, currentState }))
    };

    return (
        <Routes onNavigationStateChange={onNavigation}/>
    )

};