import React from "react";
import Form, { Field } from "@/components/Form";
import { useFormContext } from "react-hook-form";
import { toMask } from "@/utils/mask";

export default () => {

  const form = useFormContext();
  const wallet = form.watch('wallet');
  const payment = form.watch('payment');

  const [hint, setHint] = React.useState('');

  React.useEffect(() => {
    if (!wallet || !payment) {
      return;
    }

    if (payment === 'CREDIT') {
      setHint(`${wallet.name} have ${toMask('money', wallet.availableCreditLimit)} available credit limit.`)
    }

    if (payment === 'DEBIT') {
      setHint(`${wallet.name} have ${toMask('money', wallet.availableAmount)} available amount.`)
    }

  }, [wallet, payment]);

  return (
    <>
      <Field
        label="Valor: *"
        name="value"
        mask="money"
        keyboardType="decimal-pad"
        caption={hint}
      />
    </>
  );
}
