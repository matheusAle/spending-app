import React, { useState } from "react";
import { View } from 'react-native';
import { connect } from 'react-redux';
import {Button, Input, Text} from 'react-native-ui-kitten'
import { Auth } from '../../store'


const mapState = state => ({
    login: state.Auth.Login
});

export const Login = connect(mapState)(({ login, dispatch, navigation }) => {
    const [email, setEmail] = useState(login.email);
    const [password, setPassword] = useState(login.password);

    function gotoRegister() {
        dispatch(Auth.Login.Creators.setCredentials(email, password));
        navigation.push('Register');
    }

    return (
      <View style={{ justifyContent: 'center', alignContent: 'center', padding: 40, height: '100%' }}>
          <View style={{ marginBottom: 15, width: '100%' }}>
              <Input value={email}
                     label="E-mail:"
                     onChangeText={v => setEmail(v)} size="small"/>
          </View>

          <View style={{ marginBottom: 15, width: '100%' }}>
              <Input value={password}
                     label="Senha:"
                     secureTextEntry={true}
                     onChangeText={v => setPassword(v)} size="small"/>
          </View>

          <Button style={{ width: '100%' }}
                  size="large"
                  onPress={() => dispatch(Auth.Login.Creators.authenticate(email, password))}>
            Entrar
          </Button>

          <View style={{ marginTop: 35 }}>
              <Text style={{ textAlign: 'center' }} onPress={() => gotoRegister()}>
                  Fazer cadastro
              </Text>
          </View>
      </View>
    )
});

