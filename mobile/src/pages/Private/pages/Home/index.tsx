import React, { useEffect } from 'react';
import { HomeRoutes } from './routes'
import {useDispatch, useSelector} from "react-redux";
import SpendingCreate from './components/SpendingForm';
import {BackHandler} from "react-native";
import { SpendingForm } from "@/store";

export default () => {

    const dispatch = useDispatch();
    const showForm  = useSelector(s => s.SpendingForm.show);

    useEffect(() => {

        return BackHandler
            .addEventListener('hardwareBackPress', function() {
                if (showForm) {
                    dispatch(SpendingForm.show(false));
                    return true;
                }
            })
            .remove
    }, []);

    return (
        <>
            <HomeRoutes />
            <SpendingCreate />
        </>
    )
};
