import React from 'react';
import { useFormContext } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input } from 'react-native-ui-kitten'
import { fieldStatus, fieldValidationMessage } from "@/components/Form/utils";
const { zonedTimeToUtc } = require('date-fns-tz');
import { parseFromTimeZone, formatToTimeZone } from 'date-fns-timezone';
import * as RNLocalize from "react-native-localize";
import format from 'date-fns/format';
import { InputContainer } from "@/components/inputs";
import { Text } from "react-native";
export const DatePicker = props => {

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const form = useFormContext();
  const [text, setText] = React.useState(form.getValues()[props.name]);

  React.useEffect(() => {
    form.register({ name: props.name });
    form.register({ name: 'timezone' });
    setText(form.getValues()[props.name]);

    return () => {
      form.unregister(props.name);
      form.unregister('timezone');
    }
  }, []);

  const handleConfirm = date => {
    setText(format(date, 'dd/MM/yyyy HH:mm'));

    form.setValue(props.name, date.toISOString());
    form.setValue('timezone', RNLocalize.getTimeZone());
    form.triggerValidation(props.name);
  };

  return (
    <InputContainer>
      <Input
        value={text}
        label={props.label}
        onFocus={showDatePicker}
        status={fieldStatus(form, props.name)}
        caption={fieldValidationMessage(form, props.name)}
        size="small"
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text>{ RNLocalize.getTimeZone() }</Text>
    </InputContainer>
  );
};
