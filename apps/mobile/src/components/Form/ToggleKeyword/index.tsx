import React, { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleProp, TouchableWithoutFeedback } from 'react-native';
import { propsAndStyles } from 'react-native-svg/lib/typescript/lib/extract/extractProps';
import { Text } from 'react-native-ui-kitten';
import { InputContainerInline } from '../styles';
import { WorldContainer } from './styles';

export interface ToggleKeywordProps<V> {
  name: string;
  value: V;
  label: string;
  key?: string;
  style?: StyleProp<any>;
}

export function ToggleKeyword<V>(props: PropsWithChildren<ToggleKeywordProps<V>>) {
  const form = useFormContext();
  const fieldValue = form.watch(props.name);

  const [checked, setChecked] = React.useState<boolean>(fieldValue === props.value);

  React.useEffect(() => {
    return form.register({ name: props.name });
    // return () => form.unregister(props.name);
  }, []);

  React.useEffect(() => {
    setChecked(fieldValue === props.value);
  }, [fieldValue]);

  return (
    <TouchableWithoutFeedback
      onPress={_ => {
        setChecked(!checked);
        form.setValue(props.name, props.value, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }}
    >
      <InputContainerInline
        style={props.style}
      >
        <WorldContainer checked={checked}>
          <Text category='label'>{props.label}</Text>
        </WorldContainer>
      </InputContainerInline>
    </TouchableWithoutFeedback>
  );
}
