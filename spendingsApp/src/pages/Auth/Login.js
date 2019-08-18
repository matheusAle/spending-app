import React, { useState } from "react";
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Input, Text } from 'react-native-ui-kitten'
import { Auth } from 'store'
import { TextField, PasswordField, ValidatorBuilder, Validators } from 'components/inputs';

export const Login = ({ navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const Form = new ValidatorBuilder({
        email: [() => email, Validators.required, Validators.email],
        password: [() => password, Validators.required]
    });

    function gotoRegister() {
        dispatch(Auth.Login.setCredentials(email, password));
        navigation.push('Register');
    }


    function submit() {
        if (!Form.isValid()) return;
        dispatch(Auth.Login.Creators.authenticate(email, password));

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
                  onPress={() => submit()}>
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

