import React, { useState } from 'react';
import { Field } from "./Field";

export const PasswordField = (props) => {
    return (
        <Field {...props} secureTextEntry={true}/>
    )
};

export * from './Field';
export * from './Toggle';
export * from './DatePicker';
export * from './styles';
