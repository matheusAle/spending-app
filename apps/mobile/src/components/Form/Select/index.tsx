import React from 'react';
import { useFormContext } from "react-hook-form"
import { Input, Select as BaseSelect } from "react-native-ui-kitten";
import { InputContainer } from "../styles";
import { fieldStatus, fieldValidationMessage } from "@/components/Form/utils";

export const Select = props => {

  const form = useFormContext();
  const [selectedOption, setSelectedOption] = React.useState(null);

  React.useEffect(() => {
    form.register({ name: props.name});

    const value = form.getValues()[props.name];
    if (value) {
      setSelectedOption(props.data.find(d => d === value))
    }
    return () => form.unregister(props.name)
  }, []);

  return (
    <InputContainer>
      <BaseSelect
        {...props}
        onSelect={(selectedOption) => {
          setSelectedOption(selectedOption);
          form.setValue(props.name, selectedOption.value, true);
          // form.triggerValidation(props.name)
        }}
        selectedOption={selectedOption}
        status={fieldStatus(form, props.name)}
        caption={fieldValidationMessage(form, props.name)}
        size="small"
      />
    </InputContainer>
  )
};
