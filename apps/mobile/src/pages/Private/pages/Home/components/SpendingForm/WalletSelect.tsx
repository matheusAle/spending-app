import { InputGroupInline, ToggleKeyword } from '@/components/Form';
import { SpendingForm } from '@/pages/Private/pages/Home/components/SpendingForm/index';
import { IWallet, SpendingPaymentType } from '@spending-app/core-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default () => {

  const form = useFormContext<SpendingForm>();
  const selectedWallet: IWallet = form.watch('wallet');
  const selectedPayment: SpendingPaymentType = form.watch('payment');

  const wallets: IWallet[] = useSelector(state => state.Wallet.list);

  React.useEffect(() => {
    if (selectedPayment === SpendingPaymentType.MONEY) {
      form.setValue('wallet', undefined, { shouldValidate: true, shouldDirty: true });
    }
  }, [selectedPayment]);

  React.useEffect(() => {
    console.log(selectedWallet);
    if (selectedWallet) {
      form.setValue('payment', undefined, { shouldValidate: true, shouldDirty: true });
    }
  }, [selectedWallet]);

  return (
    <>
      <InputGroupInline>
        <ToggleKeyword<SpendingPaymentType>
          name='payment'
          value={SpendingPaymentType.MONEY}
          label='Dinheiro'
          style={{ marginRight: 8 }}
        />
        {wallets.map(wallet => (
          <ToggleKeyword<IWallet>
            name='wallet'
            value={wallet}
            label={wallet.name}
            key={wallet._id}
            style={{ marginRight: 8 }}
          />
        ))}
      </InputGroupInline>

      {(selectedWallet && selectedWallet.isCard) && (
        <InputGroupInline>
          <ToggleKeyword<SpendingPaymentType>
            name='payment'
            value={SpendingPaymentType.DEBIT}
            label='Débito'
            style={{ marginRight: 8 }}
          />
          <ToggleKeyword<SpendingPaymentType>
            name='payment'
            value={SpendingPaymentType.CREDIT}
            label='Crédito'
          />
        </InputGroupInline>
      )}
    </>
  );
};
