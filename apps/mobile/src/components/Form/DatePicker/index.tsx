import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Input } from '@ui-kitten/components';
import { fieldStatus, fieldValidationMessage } from '@/components/Form/utils';
import { format, parseISO } from 'date-fns';
import { InputContainer } from '@/components/inputs';

export const DatePicker = props => {

  const form = useFormContext();
  const watchField = form.watch(props.name);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState(form.getValues()[props.name]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    form.register({ name: props.name });
    setText(form.getValues()[props.name]);

    return () => form.unregister(props.name);
  }, []);

  useEffect(() => {
    if (watchField) {
      setText(format(parseISO(watchField), 'dd/MM/yyyy HH:mm'));
    }
  }, [watchField]);

  useEffect(() => {
    form.setValue(props.name, (selectedDate || new Date()).toISOString());
    // form.triggerValidation(props.name);
  }, [selectedDate]);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = date => {
    hideDatePicker();
    setSelectedDate(date);
  };

  return (
    <InputContainer>
      <Input
        value={text}
        label={props.label}
        onFocus={showDatePicker}
        status={fieldStatus(form, props.name)}
        caption={fieldValidationMessage(form, props.name)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={props.mode}
        value={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </InputContainer>
  );
};
