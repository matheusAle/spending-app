import Form, {
  Field,
  FormBuilder,
  InputContainer,
  InputGroupInline,
  Toggle,
  useForm,
  Validator
} from '@/components/Form';
import { Wallet } from '@/graphql/wallet';
import { useMutation } from '@/hooks';
import { UserNavigationProps, UserStackParamsList } from '@/pages/Private/pages/User/routes';
import { Wallet as WalletStore } from '@/store';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { IWallet } from '@spending-app/core-types';
import { Button, Divider, Icon, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';

export interface WalletFormRouteParams {
  wallet: IWallet;
}

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const SaveIcon = (props) => (
  <Icon {...props} name='checkmark-outline' />
);


const formDefs = new FormBuilder({
  name: ['', Validator.string().required().min(3)],
  isCard: [true, Validator.bool()],
  isDebit: [false, Validator.bool()],
  isCredit: [false, Validator.bool()],
  availableAmount: [undefined, Validator.number().required().min(0)],
  availableCreditLimit: [undefined, Validator.number().required().min(0)],
  creditLimit: [undefined, Validator.number().min(0).integer()],
  invoiceClosesOn: [undefined, Validator.number().min(1).max(31)],
});

export default () => {
  const navigation = useNavigation<UserNavigationProps>();
  const route = useRoute<RouteProp<UserStackParamsList, 'WalletForm'>>();
  const form = useForm(formDefs, route.params.wallet);

  const dispatch = useDispatch();

  const [createWalletFn, createWalletState] = useMutation(Wallet.create);
  const [updateWalletFn, updateWalletState] = useMutation(Wallet.update);
  const [deleteWalletFn, deleteWalletState] = useMutation(Wallet.delete);

  const onSave = form.handleSubmit(async (data) => {
    const w: any = route.params.wallet || {};

    const wallet = {
      name: w.name,
      isCard: w.isCard,
      isDebit: w.isDebit,
      isCredit: w.isCredit,
      availableAmount: w.availableAmount,
      creditLimit: w.creditLimit,
      invoiceClosesOn: w.invoiceClosesOn,
      ...data,
    };

    if (route.params.wallet) {
      await updateWalletFn({ variables: { id: w._id, wallet }});

    } else {
      await createWalletFn({ variables: { wallet }});
    }
  });


  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const AddAction = () => (
    <TopNavigationAction icon={SaveIcon} onPress={() => onSave()}/>
  );

  useEffect(() => {
    if (!createWalletState.data || createWalletState.error) { return; }
    dispatch(WalletStore.addWallet(createWalletState.data.createWallet));
    navigation.goBack();
  }, [createWalletState.data]);

  useEffect(() => {
    if (!updateWalletState.data || updateWalletState.error) { return; }
    dispatch(WalletStore.updateWallet(updateWalletState.data.updateWallet));
    navigation.goBack();
  }, [updateWalletState.data]);

  useEffect(() => {
    if (!deleteWalletState.data || deleteWalletState.error) { return; }
    dispatch(WalletStore.deleteWallet(route.params.wallet));
    navigation.goBack();
  }, [deleteWalletState.data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Carteira' accessoryLeft={BackAction} accessoryRight={AddAction}/>
      <Divider />
      <Layout style={{ flex: 1 }}>
      <Form form={form}>
        <ScrollView style={{ padding: 20 }}>
          <Field
            label='Nome'
            name='name'
          />

          <Field
            label='Montante disponível'
            name='availableAmount'
            mask='money'
            keyboardType={'numeric'}
          />

          <InputContainer>
            <Toggle
              label='Conta bancaria'
              name='isCard'
            />
          </InputContainer>

          { form.getValues().isCard && (
            <InputGroupInline>
              <Toggle
                label='Cartão de débito'
                name='isDebit'
              />
              <Toggle
                label='Cartão de crédito'
                name='isCredit'
              />
            </InputGroupInline>
          )}

          { (form.getValues().isCard && form.getValues().isCredit) && (
            <>
              <Field
                label='Limite de crédito'
                name='creditLimit'
                mask='money'
                keyboardType={'numeric'}
              />
              <Field
                label='Limite de crédito Disponivel'
                name='availableCreditLimit'
                mask='money'
                keyboardType={'numeric'}
              />
              <Field
                label='Dia do vencimento da fatura'
                name='invoiceClosesOn'
                keyboardType={'numeric'}
              />
            </>
          )}

          { route.params.wallet && route.params.wallet._id && (
            <Button
              appearance='ghost'
              status='danger'
              onPress={() => deleteWalletFn({ variables: { id: route.params.wallet._id } })}
            >
              Deletar
            </Button>
          )}

        </ScrollView>
      </Form>
    </Layout>
    </SafeAreaView>
  );
};
