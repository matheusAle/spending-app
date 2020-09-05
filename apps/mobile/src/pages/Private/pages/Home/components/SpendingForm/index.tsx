import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-ui-kitten';
import Form, {
  Field,
  Select,
  ToggleKeyword,
  FormBuilder,
  Validator,
  useForm,
  DatePicker,
  InputGroupInline,
} from '@/components/Form';
import Overlay from './Overlay';
import { useMutation } from '@/hooks';
import { CREATE_SPENDING } from '@/graphql/spending';
import { SpendingForm } from '@/store';
import WalletSelect from './WalletSelect';
import ValueInput from './ValueInput';

const formDeffs = new FormBuilder({
  name: ['', Validator.string().required()],
  wallet: [undefined, Validator.object().required()],
  value: [
    undefined,
    Validator
      .number()
      .min(0)
      .required()
      .when(['payment', 'wallet'], (payment, wallet, schema) => {
        if (!wallet || !payment) {
          return schema;
        }

        if (payment === 'CREDIT') {
          return schema.max(wallet.availableCreditLimit);
        }

        if (payment === 'DEBIT') {
          return schema.max(wallet.availableAmount);
        }
      }),
  ],
  date: [undefined, Validator.date().required()],
  payment: [undefined, Validator.string().required()],
});

export default () => {

  const form = useForm(formDeffs);
  const formValues = form.watch();
  const dispatch = useDispatch();

  const [createSpending, createSpendingState] = useMutation(CREATE_SPENDING, { refetchQueries: ['listWallets'] });

  const submit = form.handleSubmit(async () => {
    const data = form.getValues();
    createSpending({ variables: { spending: { ...data, wallet: data.wallet._id }}});
  });

  useEffect(() => {
    if (!createSpendingState.data || createSpendingState.error) { return; }
    dispatch(SpendingForm.show(false));
  }, [createSpendingState.data]);

  return (
    <Overlay>
      <Form form={form}>
        <Field
          label='Nome: *'
          name='name'
        />

        <WalletSelect />

        <ValueInput />

        <DatePicker
          label='Date: *'
          name='date'
          mode='datetime'
        />
      </Form>

      <Button onPress={submit} status='success'>Save</Button>
    </Overlay>
  );
};
