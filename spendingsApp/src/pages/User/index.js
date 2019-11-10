import React from 'react';
import { List, ListItem } from "react-native-ui-kitten";

export default props => {

    return (
      <List
        data={[
          { name: 'Carteiras', route: 'WalletList' }
        ]}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            onPress={(i) => {
              props.navigation.navigate(item.route)
            }}
            titleStyle={{
              fontSize: 16,
              marginVertical: 5
            }}
          />
        )}
      />
    )
}
