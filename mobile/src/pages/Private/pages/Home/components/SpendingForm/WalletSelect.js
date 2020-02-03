import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import Form, { InputGroupInline, Select, ToggleKeyword } from "@/components/Form";
import { useFormContext } from "react-hook-form";

export default () => {

  const form = useFormContext();
  const formValues = form.watch();

  const wallets = useSelector(state => state.Wallet.list);
  const walletOptions = useMemo(() => {
    return wallets.map(w => ({ text: w.name, key: w._id, value: w }))
  }, [wallets]);

  return (
    <>
      <Select
        label="Pagamento"
        name="wallet"
        data={walletOptions}
      />

      {(formValues && formValues.wallet && formValues.wallet.isCard) && (
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
