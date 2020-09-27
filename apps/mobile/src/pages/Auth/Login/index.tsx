import Form, { Field, FormBuilder, useForm, Validator } from '@/components/Form';
import { useMutation } from '@/hooks';
import React, { useState, useEffect } from 'react';
import {Alert, AppState, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from 'react-native-ui-kitten';
import {App, Auth} from '@/store';
import {USER_LOGIN} from '@/graphql/auth';
import {AuthService} from '@/services/Auth';
import {async} from '@/utils';
import { useNavigation } from '@react-navigation/native';

export type LoginRouteParams = undefined;

export interface LoginForm {
  email: string;
  password: string;
}

const formDefs = new FormBuilder<LoginForm>({
  email: ['', Validator.string().required().email()],
  password: ['', Validator.string().required()],
});

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const form = useForm<LoginForm>(formDefs);
  const values = form.getValues();

  const [performLogin, { data, loading, error }] = useMutation(USER_LOGIN);

  const onSubmit = form.handleSubmit(async () => {
    await performLogin({ variables: values });
  });

  // useEffect(async(async () => {
  //   await AuthService.setToken(null);
  //   await AuthService.setCurrentUser(null);
  //
  //   dispatch(App.setUserInfo(null));
  //   dispatch(App.setUserToken(null));
  // }), []);

  useEffect(() => {
    dispatch(App.setLoading(loading));
  }, [loading]);

  const gotoSpending = () => navigation.navigate('Private', {
    screen: 'Home',
    params: {
      screen: 'SpendingList',
    },
  });

  useEffect(async(async () => {
    if (await AuthService.hasUser()) {
      dispatch(App.setUserInfo(await AuthService.getCurrentUser()));
      dispatch(App.setUserToken(await AuthService.getToken()));
      gotoSpending();
    }
  }), []);

  useEffect(async(async () => {
    if (!data || !data.loginUser) { return; }

    await AuthService.setCurrentUser(data.loginUser.user);
    await AuthService.setToken(data.loginUser.token);

    dispatch(App.setUserToken(data.loginUser.token));
    dispatch(App.setUserInfo(data.loginUser.user));

    gotoSpending();
  }), [data]);

  useEffect(async(async () => {
    if (!error) { return; }
    Alert.alert('Ops...', 'Não e possível fazer login neste momento. Tente Novanente mas tarde.');
  }), [error]);

  function gotoRegister() {
    dispatch(Auth.Login.setCredentials(values.email, values.password));
    navigation.navigate('Auth', { screen: 'Register' });
  }

  return (
    <Form form={form}>
      <View style={{ justifyContent: 'center', alignContent: 'center', padding: 40, height: '100%' }}>
        <Field name='email' label='Email:' />
        <Field name='password' label='Senha:' />

        <Button style={{ width: '100%' }} size='large' onPress={onSubmit}>
          Entrar
        </Button>

        <View style={{ marginTop: 35 }}>
          <Text style={{ textAlign: 'center' }} onPress={() => gotoRegister()}>
            Fazer cadastro
          </Text>
        </View>
      </View>
    </Form>
  );
};
