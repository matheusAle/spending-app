import React, { useEffect } from 'react';
import { FormBuilder } from "./FormBuilder";
import useFormHook, { FormContext } from "react-hook-form";

export default (props) => {

    return (
        <FormContext { ...props.form }>
            {props.children}
        </FormContext>
    )
}

export * from './FormBuilder'

export const useForm = (defs, defaultValues) => {

    return useFormHook({
        validationSchema: defs.schema,
        defaultValues: defaultValues || defs.values
    });
};
