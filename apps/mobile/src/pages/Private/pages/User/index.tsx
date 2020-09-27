import React from 'react';
import { List, ListItem, Text } from '@ui-kitten/components';

export default props => {

    return (
      <List
        data={[
          { name: 'Carteiras', route: 'WalletList' },
        ]}
        renderItem={({ item }) => (
          <ListItem
            title={evaProps => (
              <Text {...evaProps} style={{ fontSize: 16, marginVertical: 5, }}>{item.name}</Text>
            )}
            onPress={() => {
              props.navigation.navigate(item.route);
            }}
          />
        )}
      />
    );
};
