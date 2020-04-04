import React from 'react';
import { FormContext } from "react-hook-form";

export default (props) => {

    return (
      <FormContext { ...props.form }>
          {props.children}
      </FormContext>
    )
}

export * from './useForm'
export * from './Field';
export * from './Toggle';
export * from './DatePicker';
export * from './Select';
export * from './PasswordField';
export * from './ToggleKeyword';
export * from './styles';
export * from './FormBuilder'
