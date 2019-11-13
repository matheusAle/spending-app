import React from 'react';
import { InputContainer } from "../styles";
import { useFormContext } from "react-hook-form"
import { Input } from 'react-native-ui-kitten'

export const Field = props => {

  const form = useFormContext();

  const [text, setText] = React.useState(form.getValues()[props.name]);

  React.useEffect(() => {
    form.register({ name: props.name});

    setText(String(form.getValues()[props.name] || ''));

    return () => form.unregister(props.name)
  }, []);

  return (
    <InputContainer>
      <Input
        {...props}
        onBlur={() => {
          form.setValue(props.name, text, true);
          form.triggerValidation(props.name)
        }}
        value={text}
        onChangeText={v => setText(v)}
        status={form.formState.touched.includes(props.name) && form.errors[props.name] ? 'danger' : ''}
        caption={form.formState.touched.includes(props.name) && form.errors[props.name] ? form.errors[props.name].message : ''}
        size="small"
      />
    </InputContainer>
  )
};
