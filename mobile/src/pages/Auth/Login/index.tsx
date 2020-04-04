import React, { useState, useEffect } from "react";
import {Alert, AppState, View} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from 'react-native-ui-kitten'
import {App, Auth} from '@/store'
import { TextField, PasswordField, ValidatorBuilder, Validators } from '@/components/inputs';
import { useMutation } from "@apollo/react-hooks";
import {USER_LOGIN} from "@/graphql/auth";
import {AuthService} from "@/services/Auth";
import {async} from "@/utils";
import { useNavigation } from '@react-navigation/native';

export type LoginRouteParams = undefined

// TODO: Usar novos componentes de formulario!
export default () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('matheus@teste.com');
    const [password, setPassword] = useState('123456');

    const [performLogin, { data, loading, error }] = useMutation(USER_LOGIN);

    useEffect(() => {
        dispatch(App.setLoading(loading));
    }, [loading]);

    const gotoSpending = () => navigation.navigate('Private', {
        screen: 'Home',
        params: {
            screen: 'SpendingList'
        }
    });

    useEffect(async(async () => {
        if (await AuthService.hasUser()) {
            dispatch(App.setUserInfo(await AuthService.getCurrentUser()));
            dispatch(App.setUserToken(await AuthService.getToken()));
            gotoSpending()
        }
    }), []);

    useEffect(async(async () => {
        if (!data || !data.loginUser) return;

        await AuthService.setCurrentUser(data.loginUser.user);
        await AuthService.setToken(data.loginUser.token);

        dispatch(App.setUserToken(data.loginUser.token));
        dispatch(App.setUserInfo(data.loginUser.user));

        gotoSpending()
    }), [data]);

    useEffect(async(async () => {
        if (!error) return;
        Alert.alert('Ops...', 'Não e possível fazer login neste momento. Tente Novanente mas tarde.')
    }), [error]);

    const Form = new ValidatorBuilder({
        email: [() => email, Validators.required, Validators.email],
        password: [() => password, Validators.required]
    });

    function gotoRegister() {
        dispatch(Auth.Login.setCredentials(email, password));
        navigation.navigate('Auth', { screen: 'Register' });
    }

    return (
        <View style={{ justifyContent: 'center', alignContent: 'center', padding: 40, height: '100%' }}>
            <TextField value={email}
                       label="E-mail:"
                       validator={Form.email}
                       onChangeText={v => setEmail(v)} />

            <PasswordField value={password}
                           label="Senha:"
                           validator={Form.password}
                           onChangeText={v => setPassword(v)} />

            <Button style={{ width: '100%' }}
                    size="large"
                    onPress={() => {
                        if (!Form.isValid()) return;
                        performLogin({ variables: { email, password }})
                    }}>
                Entrar
            </Button>

            <View style={{ marginTop: 35 }}>
                <Text style={{ textAlign: 'center' }} onPress={() => gotoRegister()}>
                    Fazer cadastro
                </Text>
            </View>
        </View>
    )
};

