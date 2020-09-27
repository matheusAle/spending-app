import {Text, Toggle as ToggleBase} from "react-native-ui-kitten";
import React from "react";
import { InputContainerInline } from '../styles';
import { TouchableWithoutFeedback } from 'react-native';
import { useFormContext } from "react-hook-form"

export const Toggle = props => {
    const form = useFormContext();

    const [checked, setChecked] = React.useState(form.getValues()[props.name]);

    React.useEffect(() => {
      form.register({ name: props.name });

      setChecked(form.getValues()[props.name]);

      return () => form.unregister(props.name)
    }, []);

    React.useEffect(() => {
      form.setValue(props.name, checked);
      // form.triggerValidation(props.name);
    }, [ checked ]);

    return (
        <TouchableWithoutFeedback>
            <InputContainerInline>
                <ToggleBase
                  {...props}
                  text={props.label}
                  checked={checked}
                  onChange={v => setChecked(v)}
                />
            </InputContainerInline>
        </TouchableWithoutFeedback>
    )
};
