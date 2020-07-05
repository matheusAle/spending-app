import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import Form, { InputGroupInline, Select, ToggleKeyword } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { IWallet } from '@spending-app/core-types'
import { Text } from "react-native";

export default () => {

  const form = useFormContext();
  const formValues = form.watch('wallet');

  const wallets: IWallet[] = useSelector(state => state.Wallet.list);
  const walletOptions = useMemo(() => {
    return wallets.map(w => ({ text: w.name, key: w._id, value: w }))
  }, [wallets]);

  return (
    <>
      <InputGroupInline>
        {wallets.map(wallet => (
          <ToggleKeyword
            name="wallet"
            value={wallet}
            label={wallet.name}
            key={wallet._id}
            style={{ marginRight: 10 }}

          />
        ))}
      </InputGroupInline>

      <Text>{ JSON.stringify(formValues) }</Text>

      {(formValues && formValues.wallet.isCard) && (
        <InputGroupInline>
          <ToggleKeyword
            name="payment"
            value="DEBIT"
            label="Débito"
            style={{ marginRight: 10 }}
          />
          <ToggleKeyword
            name="payment"
            value="CREDIT"
            label="Crédito"
          />
        </InputGroupInline>
      )}
    </>
  )
}
