import React from 'react';
import {View, Text} from 'react-native';
import { Container, Title, Details, Date } from './styles';
import Value from './Value';
import { parseISO, format } from 'date-fns';

export default ({ spending }) => {

  return (
    <Container>
      <Details>
        <Value spending={spending} />
        <View>
          <Date>{spending.date && format(parseISO(spending.date), 'dd/MM/yyyy \'ás\' HH:mm') }</Date>
        </View>
      </Details>
      <Title>{spending.name}</Title>
    </Container>
  )
}
