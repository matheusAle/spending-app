import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-native-ui-kitten';
import { View } from 'react-native';
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
import { useMutation } from "@/hooks";
import { CREATE_SPENDING } from "@/graphql/spending";
import { SpendingForm } from "@/store";

const formDeffs = new FormBuilder({
  name: ['', Validator.string().required()],
  wallet: [undefined, Validator.string().required()],
  value: [undefined, Validator.number().min(0).required()],
  payment: [undefined, Validator.string().required()]
});

export default () => {

  const wallets = useSelector(state => state.Wallet.list);
  const form = useForm(formDeffs);
  const dispatch = useDispatch();

  const [createSpending, createSpendingState] = useMutation(CREATE_SPENDING);

  const submit = form.handleSubmit(async () => {
    const data = form.getValues();
    createSpending({ variables: { spending: { ...data, wallet: data.wallet._id }}})
  });

  useEffect(() => {
    if (!createSpendingState.data || createSpendingState.error) return;
    dispatch(SpendingForm.show(false));
  }, [createSpendingState.data]);

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

      <Button onPress={submit} status="success">Save</Button>
    </Overlay>
  )
}
