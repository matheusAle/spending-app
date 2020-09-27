import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@ui-kitten/components';
import Form, { DatePicker, Field, FormBuilder, useForm, Validator } from '@/components/Form';
import { useMutation } from '@/hooks';
import { CREATE_SPENDING } from '@/graphql/spending';
import { SpendingForm } from '@/store';
import WalletSelect from './WalletSelect';
import ValueInput from './ValueInput';
import { IWallet, SpendingPaymentType } from '@spending-app/core-types';

export interface SpendingForm {
  name: string;
  wallet: IWallet;
  value: number;
  date: Date | string;
  payment: SpendingPaymentType;
}

const formDeffs = new FormBuilder<SpendingForm>({
  name: ['', Validator.string().required()],
  wallet: [undefined, Validator.object().required()],
  value: [
    undefined,
    Validator
      .number()
      .min(0)
      .required()
      .when(['payment', 'wallet'], (paymentMethod: SpendingPaymentType, wallet, schema) => {
        if (!wallet || !SpendingPaymentType) {
          return schema;
        }
        if (paymentMethod === SpendingPaymentType.CREDIT) {
          return schema.max(wallet.availableCreditLimit);
        }
        if (paymentMethod === SpendingPaymentType.DEBIT) {
          return schema.max(wallet.availableAmount);
        }
      }),
  ],
  date: [undefined, Validator.date().required()],
  payment: [undefined, Validator.string().required()],
});

export default () => {

  const form = useForm<SpendingForm>(formDeffs);
  const dispatch = useDispatch();

  const [createSpending, createSpendingState] = useMutation(CREATE_SPENDING, { refetchQueries: ['listWallets'] });

  const submit = form.handleSubmit(async () => {
    const data = form.getValues();
    await createSpending({ variables: { spending: { ...data, wallet: data.wallet._id }}});
  });

  useEffect(() => {
    if (!createSpendingState.data || createSpendingState.error) { return; }
    dispatch(SpendingForm.show(false));
  }, [createSpendingState.data]);

  return (
    <>
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
    </>
  );
};
