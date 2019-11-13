import React, { useEffect } from 'react';
import { HomeRoutes } from './routes'
import {useDispatch, useSelector} from "react-redux";
import SpendingCreate from './SpendingCreate';
import {BackHandler} from "react-native";
import { SpendingForm } from "@/store";
import { deepRoute } from "@/utils";

export default deepRoute(HomeRoutes, ({ navigation }) => {

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
})
