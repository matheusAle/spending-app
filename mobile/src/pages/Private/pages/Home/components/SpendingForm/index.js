import React from 'react';
import { useSelector } from "react-redux";
import Form, {
  Field,
  Select,
  ToggleKeyword,
  FormBuilder,
  Validator,
  useForm,
  InputGroupInline
} from "@/components/Form";
import Overlay from "./Overlay";

const formDeffs = new FormBuilder({
  name: ['', Validator.string().required()],
  wallet: [undefined, Validator.string().required()],
  value: [undefined, Validator.number().min(0).required()],
  payment: [undefined, Validator.string().required()]
});

export default () => {

  const wallets = useSelector(state => state.Wallet.list);
  const form = useForm(formDeffs);

  console.tron.log(form.getValues());

  return (
    <Overlay>
      <Form form={form}>
        <Field
          label="Nome: *"
          name="name"
        />

        <Field
          label="Valor: *"
          name="value"
          mask="money"
        />

        <Select
          label="Pagamento"
          name="wallet"
          data={wallets.map(w => ({ text: w.name, key: w._id, value: w }))}
        />

        {(form.getValues().wallet && form.getValues().wallet.isCard) && (
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
      </Form>
    </Overlay>
  )
}
