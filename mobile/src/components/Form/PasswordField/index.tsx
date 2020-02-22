import React from 'react';
import { Field } from "../Field";

export const PasswordField = (props) => {
  return (
    <Field {...props} secureTextEntry={true}/>
  )
};
