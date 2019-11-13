import React from 'react';
import { useFormContext } from "react-hook-form"
import { Select as BaseSelect } from 'react-native-ui-kitten'
import { InputContainer } from "../styles";

export const Select = props => {

  const form = useFormContext();

  const [value, setValue] = React.useState(form.getValues()[props.name]);

  React.useEffect(() => {
    form.register({ name: props.name});

    setValue(String(form.getValues()[props.name] || ''));

    return () => form.unregister(props.name)
  }, []);

  return (
    <InputContainer>
      <BaseSelect
        {...props}
        onSelect={(selectedOption) => {
          form.setValue(props.name, selectedOption, true);
          form.triggerValidation(props.name)
        }}
        selectedOption={value}
        onChangeText={v => setValue(v)}
        status={form.formState.touched.includes(props.name) && form.errors[props.name] ? 'danger' : ''}
        caption={form.formState.touched.includes(props.name) && form.errors[props.name] ? form.errors[props.name].message : ''}
        size="small"
      />
    </InputContainer>
  )
};
