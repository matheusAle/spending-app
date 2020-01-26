import React from 'react';
import { View } from 'react-native';
import { useQuery } from "@/hooks/useQuery";
import { LIST_SPENDING } from "@/graphql/spending";
import Spending from './Spending';

export default () => {

  const { data: { spendingList } = {} } = useQuery(LIST_SPENDING);

  return (
    <View style={{
      backgroundColor: '#E5E5E5',
      flex: 1,
      paddingBottom: 100,
      flexDirection: 'column',
      position: 'relative'
    }}>

      {spendingList && spendingList.map((spending => (
        <Spending spending={spending} />
      )))}
    </View>
  )
};
