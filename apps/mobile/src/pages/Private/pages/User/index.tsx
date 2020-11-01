import React from 'react';
import {
  Button,
  Divider, Icon,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export default ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='User' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1 }}>
        <List
          data={[
            { name: 'Carteiras', route: 'WalletList' },
          ]}
          renderItem={({ item }) => (
            <ListItem
              title={evaProps => (
                <Text {...evaProps} category={'h2'}>{item.name}</Text>
              )}
              onPress={() => {
                navigation.navigate(item.route);
              }}
            />
          )}
        />
      </Layout>
    </SafeAreaView>
  );
};
