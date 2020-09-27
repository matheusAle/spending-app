import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import { Container, Title, Details, Date } from './styles';
import Value from './Value';
import { parseISO, format } from 'date-fns';

export default ({ spending }) => {

  return (
    <Container>
      <Details>
        <Value spending={spending} />
        <View>
          <Text category={'c2'}>{spending.date && format(parseISO(spending.date), 'dd/MM/yyyy \'ás\' HH:mm') }</Text>
        </View>
      </Details>
      <Text category={'h5'}>{spending.name}</Text>
    </Container>
  )
}
