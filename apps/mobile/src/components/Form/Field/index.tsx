import React from 'react';
import { InputContainer } from '../styles';
import { useFormContext } from 'react-hook-form';
import { Input } from 'react-native-ui-kitten';
import { fieldStatus, fieldValidationMessage } from '@/components/Form/utils';
import { toMask, unMask } from '@/utils/mask';

export const Field = props => {

  const form = useFormContext();
  const [text, setText] = React.useState(form.getValues()[props.name]);

  React.useEffect(() => {

    if (!props.name) {
      return;
    }

    form.register({ name: props.name});

    if (props.mask) {
      setText(toMask(props.mask, String(form.getValues()[props.name] || '')));
    } else {
      setText(String(form.getValues()[props.name] || ''));
    }

    return () => form.unregister(props.name);
  }, [props.name]);

  React.useEffect(() => {
    if (!text) {
      return;
    }
    if (props.mask) {
      form.setValue(props.name, unMask(props.mask, text), {shouldDirty: true, shouldValidate: true });
    } else {
      form.setValue(props.name, text, {shouldDirty: true, shouldValidate: true });
    }
  }, [text]);

  return (
    <InputContainer>
      <Input
        {...props}
        value={text}
        onChangeText={v => {
          if (props.mask) {
            setText(toMask(props.mask, v));
          } else {
            setText(v);
          }
        }}
        status={fieldStatus(form, props.name)}
        caption={fieldValidationMessage(form, props.name) || props.caption}
        size='small'
      />
    </InputContainer>
  );
};
