import React from 'react';
import { Field } from '@/components/Form';
import { useFormContext } from 'react-hook-form';
import { toMask } from '@/utils/mask';
import { SpendingForm } from '@/pages/Private/pages/Home/components/SpendingForm/index';
import { IWallet, SpendingPaymentType } from '@spending-app/core-types';

export default () => {

  const form = useFormContext<SpendingForm>();
  const wallet: IWallet = form.watch('wallet');
  const spendingPayment: SpendingPaymentType = form.watch('payment');

  const [hint, setHint] = React.useState('');

  React.useEffect(() => {
    if (!wallet || !spendingPayment) {
      return;
    }

    if (spendingPayment === SpendingPaymentType.CREDIT) {
      setHint(`${wallet.name} have ${toMask('money', wallet.availableCreditLimit)} available credit limit.`);
    }

    if (spendingPayment === SpendingPaymentType.DEBIT) {
      setHint(`${wallet.name} have ${toMask('money', wallet.availableAmount)} available amount.`);
    }

  }, [wallet, spendingPayment]);

  return (
    <>
      <Field
        label='Valor: *'
        name='value'
        mask='money'
        keyboardType='decimal-pad'
        caption={hint}
      />
    </>
  );
};
