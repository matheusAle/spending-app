import React from 'react';
import { InputContainer } from "../styles";
import { useFormContext } from "react-hook-form"
import { Input } from 'react-native-ui-kitten'
import { MaskService } from 'react-native-masked-text'

const masks = {
  'money': v => ['money', v, { unit: 'R$ ', separator: ',', delimiter: '.' }],
};

const toMask = (type, v) => MaskService.toMask(...masks[type](v));
const unMask = (type, v) => MaskService.toRawValue(...masks[type](v));

export const Field = props => {

  const form = useFormContext();
  const [text, setText] = React.useState(form.getValues()[props.name]);

  React.useEffect(() => {
    form.register({ name: props.name});

    if (props.mask) {
      setText(toMask(props.mask, String(form.getValues()[props.name] || '')));
    } else {
      setText(String(form.getValues()[props.name] || ''));
    }

    return () => form.unregister(props.name)
  }, []);

  return (
    <InputContainer>
      <Input
        {...props}
        onBlur={() => {

          if (props.mask) {
            form.setValue(props.name, unMask(props.mask, text), true);
          } else {
            form.setValue(props.name, text, true);
          }

          form.triggerValidation(props.name)
        }}
        value={text}
        onChangeText={v => {
          if (props.mask) {
            setText(toMask(props.mask, v))
          } else {
            setText(v);
          }
        }}
        status={form.formState.touched.includes(props.name) && form.errors[props.name] ? 'danger' : ''}
        caption={form.formState.touched.includes(props.name) && form.errors[props.name] ? form.errors[props.name].message : ''}
        size="small"
      />
    </InputContainer>
  )
};
