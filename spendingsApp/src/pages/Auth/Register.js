import React, {Component, useState} from "react";
import { View } from 'react-native';
import {Button, Input, Text} from 'react-native-ui-kitten'
import {Auth} from "../../store/ducks/Auth/index";
import { connect } from "react-redux";

const mapState = state => ({
    login: state.Auth.Login
});

export const Register = connect(mapState)(({ login }) => {

    const [email, setEmail] = useState(login.email || '');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState(login.password || '');

    return (
      <View style={{ justifyContent: 'center', alignContent: 'center', padding: 40, height: '100%' }}>


          <View style={{ marginBottom: 15, width: '100%' }}>
              <Input value={fullName}
                     label="Nome completo:"
                     onChangeText={v => setFullName(v)} size="small"/>
          </View>

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
                  size="large">
              Criar conta
          </Button>
      </View>
    )
});

