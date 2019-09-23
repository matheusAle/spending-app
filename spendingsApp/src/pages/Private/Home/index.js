import React, { useEffect } from 'react';
import { HomeRoutes } from './Routes'
import {useDispatch, useSelector} from "react-redux";
import SpendingCreate from './SpendingCreate';
import {BackHandler} from "react-native";
import { SpendingForm, App } from "@store";


const Homepage = ({ navigation }) => {

    const dispatch = useDispatch();
    const showForm  = useSelector(s => s.SpendingForm.show, console.tron.log);

    useEffect(() => {

        return BackHandler
            .addEventListener('hardwareBackPress', function() {
                if (showForm) {
                    dispatch(SpendingForm.show(false));
                    return true;
                }
            })
            .remove
    });

    return (
        <>
            <HomeRoutes navigation={navigation}/>
            <SpendingCreate show={showForm}/>
        </>
    )
};

Homepage.router = {
    ...HomeRoutes.router,
    getStateForAction: (action, lastState) => {
        // check for custom actions and return a different navigation state.
        return HomeRoutes.router.getStateForAction(action, lastState);
    },
};

export default Homepage;
