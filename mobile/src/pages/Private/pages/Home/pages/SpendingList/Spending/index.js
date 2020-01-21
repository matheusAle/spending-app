import React from 'react';
import {View, Text} from 'react-native';
import { Container, Title, Details } from './styles';
import Value from './Value';

export default ({ spending }) => {

  return (
    <Container>
      <Details>
        <Value spending={spending} />
      </Details>
      <Title>{spending.name}</Title>
    </Container>
  )
}
