import React from "react";
import { RefreshControl, ScrollView } from 'react-native';
import { List } from './styles';


export default ({ children, refresh, loading }) => {

  const [refreshing, setRefreshing] = React.useState(loading);
  React.useEffect(() => setRefreshing(loading), [loading]);

  return (
    <List
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {children}
    </List>
  )

}
