import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native'
import { Field, InputGroupInline, Toggle, InputContainer } from '@/components/Form';
import Form, { Validator, useForm, FormBuilder } from '@/components/Form';
import { useMutation } from "@apollo/react-hooks";
import { Wallet } from "@/graphql/wallet";
import { App, Wallet as WalletStore } from "@/store";
import { useDispatch } from "react-redux";
import { withNavigation } from 'react-navigation';
import {
    Button,
} from 'react-native-ui-kitten';


const formDefs = new FormBuilder({
    name: ['', Validator.string().required().min(3)],
    isCard: [true, Validator.bool()],
    isDebit: [false, Validator.bool()],
    isCredit: [false, Validator.bool()],
    availableAmount: [undefined, Validator.number().required().min(0)],
    creditLimit: [undefined, Validator.number().min(0).integer()],
    invoiceClosesOn: [undefined, Validator.number().min(1).max(31)],
});

export default withNavigation(({ navigation }) => {

    const form = useForm(formDefs, navigation.getParam('wallet'));

    const dispatch = useDispatch();

    const [createWalletFn, createWalletState] = useMutation(Wallet.create);
    const [updateWalletFn, updateWalletState] = useMutation(Wallet.update);
    const [deleteWalletFn, deleteWalletState] = useMutation(Wallet.delete);

    const onSave = form.handleSubmit(async (data) => {

        let w = navigation.getParam('wallet', {});

        const wallet = {
            name: w.name,
            isCard: w.isCard,
            isDebit: w.isDebit,
            isCredit: w.isCredit,
            availableAmount: w.availableAmount,
            creditLimit: w.creditLimit,
            invoiceClosesOn: w.invoiceClosesOn,
            ...data
        };

        if (navigation.getParam('wallet', false)) {
            await updateWalletFn({ variables: { id: w._id, wallet }});

        } else {
            await createWalletFn({ variables: { wallet }});
        }
    });

    useEffect(() => {
        dispatch(App.setLoading(createWalletState.loading));
    }, [createWalletState.loading]);

    useEffect(() => {
        dispatch(App.setLoading(createWalletState.loading));
    }, [updateWalletState.loading]);

    useEffect(() => {
        dispatch(App.setLoading(deleteWalletFn.loading));
    }, [deleteWalletState.loading]);

    useEffect(() => {
        if (!createWalletState.data || createWalletState.error) return;
        dispatch(WalletStore.addWallet(createWalletState.data.createWallet));
        navigation.goBack()
    }, [createWalletState.data]);

    useEffect(() => {
        if (!updateWalletState.data || updateWalletState.error) return;
        dispatch(WalletStore.updateWallet(updateWalletState.data.updateWallet));
        navigation.goBack()
    }, [updateWalletState.data]);

    useEffect(() => {
        if (!deleteWalletState.data || deleteWalletState.error) return;
        dispatch(WalletStore.deleteWallet(navigation.getParam('wallet')));
        navigation.goBack()
    }, [deleteWalletState.data]);

    useEffect(() => {
        navigation.setParams({ pageTitle: 'Wallet', pageOnSave: onSave });
    }, []);

    return (
      <Form form={form}>
          <ScrollView style={{ padding: 20 }}>
              <Field
                label='Nome'
                name="name"
              />

              <Field
                label='Montante disponível'
                name="availableAmount"
                mask="money"
                keyboardType={'numeric'}
              />

              <InputContainer>
                  <Toggle
                    label='Conta bancaria'
                    name="isCard"
                  />
              </InputContainer>

              { form.getValues().isCard && (
                <InputGroupInline>
                    <Toggle
                      label='Cartão de débito'
                      name="isDebit"
                    />
                    <Toggle
                      label='Cartão de crédito'
                      name="isCredit"
                    />
                </InputGroupInline>
              )}

              { (form.getValues().isCard && form.getValues().isCredit) && (
                <>
                    <Field
                      label='Limite de crédito'
                      name="creditLimit"
                      mask="money"
                      keyboardType={'numeric'}
                    />
                    <Field
                      label="Dia do vencimento da fatura"
                      name="invoiceClosesOn"
                      keyboardType={'numeric'}
                    />
                </>
              )}

              { (navigation.getParam('wallet', {})._id) && (
                <Button
                  appearance='ghost'
                  status='danger'
                  onPress={() => deleteWalletFn({ variables: { id: navigation.getParam('wallet')._id } })}
                >
                    Deletar
                </Button>
              )}

          </ScrollView>
      </Form>
    )
})
