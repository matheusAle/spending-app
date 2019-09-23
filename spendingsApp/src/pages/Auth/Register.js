import React, { useState } from "react";
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-ui-kitten'
import { useSelector, useDispatch } from "react-redux";
import { TextField, PasswordField, Validators, ValidatorBuilder } from 'components/inputs'
import { Mutation } from "react-apollo";
import { REGISTER_USER } from 'services/Auth';
import { App, Auth } from 'store';

export default ({ navigation }) => {
    const login = useSelector(s => s.Auth.Login);
    const dispatch = useDispatch();
    const [email, setEmail] = useState(login.email || '');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState(login.password || '');

    const Form = new ValidatorBuilder({
        email: [() => email, Validators.required, Validators.email],
        fullName: [() => fullName, Validators.required],
        password: [() => password, Validators.required, Validators.minLength(6)]
    });

    const submit = () => {
        Form.validate();
    };

    return (
        <Mutation mutation={REGISTER_USER}>
            {(registerUser, { loading, error }) => (
                <View style={{ justifyContent: 'center', alignContent: 'center', padding: 40, height: '100%' }}>

                    <TextField value={fullName}
                               label="Nome completo:"
                               validator={Form.fullName}
                               onChangeText={v => setFullName(v)} />

                    <TextField value={email}
                               label="E-mail:"
                               validator={Form.email}
                               onChangeText={v => setEmail(v)}/>

                    <PasswordField value={password}
                               label="Senha:"
                               validator={Form.password}
                               onChangeText={v => setPassword(v)}/>

                    <Button style={{ width: '100%' }}
                            onPress={() => {
                                if (!Form.isValid()) return;

                                dispatch(App.setLoading(true));

                                registerUser({ variables: { user: { fullName, email, password } } })
                                    .then((data) => {

                                        dispatch(App.setLoading(false));
                                        dispatch(Auth.Login.setCredentials(email, password));

                                        Alert.alert('Sucesso!', 'Sua conta foi criada!', [
                                            {text: 'OK', onPress: () => navigation.goBack()},
                                        ]);
                                    })
                                    .catch((err) => {
                                        dispatch(App.setLoading(false));
                                        Alert.alert('Ops...', 'Não é possível criar uma conta neste momento!');
                                    })
                            }}
                            size="large">
                        Criar conta
                    </Button>
                </View>
            )}
        </Mutation>
    )
};
