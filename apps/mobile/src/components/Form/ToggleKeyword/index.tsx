import { Text } from 'react-native-ui-kitten';
import React from 'react';
import { InputContainerInline } from '../styles';
import { WorldContainer } from './styles';
import { TouchableWithoutFeedback } from 'react-native';
import { useFormContext } from 'react-hook-form';

export interface ToggleKeywordProps {
  name: string;
  value: string;
  key: string;
  label: string;
}

export const ToggleKeyword: React.FunctionComponent<ToggleKeywordProps> = props => {
  const form = useFormContext();

  const [checked, setChecked] = React.useState(form.getValues()[props.name]);

  React.useEffect(() => {
    form.register({ name: props.name });
    setChecked(form.getValues()[props.name] === props.value);
    return () => form.unregister(props.name);
  }, []);

  // React.useEffect(() => {
  //   setChecked(form.getValues()[props.name] === props.value);
  // }, [form.getValues()[props.name]]);

  return (
    <TouchableWithoutFeedback
      onPress={_ => {
        setChecked(!checked);
        form.setValue(props.name, props.value);
        form.triggerValidation(props.name);
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
};
