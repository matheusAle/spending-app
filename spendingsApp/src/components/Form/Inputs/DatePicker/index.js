import React from 'react';
import { Datepicker } from 'react-native-ui-kitten';
import {connect, getIn} from "formik";
export const DatePicker = connect(props => {

    const error = getIn(props.formik.errors, props.name);
    const value = getIn(props.formik.values, props.name);
    const touch = getIn(props.formik.touched, props.name);

    const onSelect = (value) => {
        props.formik.setFieldTouched(props.name, true);
        props.formik.validateField(props.name);
        props.formik.setFieldValue(props.name, value);
    };
    return (
        <Datepicker
            date={value}
            state={error ? 'danger' : ''}
            onSelect={onSelect}
            caption={touch && error ? error : null}
        />
    );
});
