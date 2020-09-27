import React from 'react';
import { FormProvider } from 'react-hook-form';

export default (props) => {

    return (
      <FormProvider { ...props.form }>
          {props.children}
      </FormProvider>
    );
};

export * from './useForm';
export * from './Field';
export * from './Toggle';
export * from './DatePicker';
export * from './Select';
export * from './PasswordField';
export * from './ToggleKeyword';
export * from './styles';
export * from './FormBuilder';
