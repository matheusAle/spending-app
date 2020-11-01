import { IWallet } from '@spending-app/core-types';
import React, { useEffect } from 'react';
import { Divider, Icon, Layout, List, ListItem, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@/hooks';
import { Wallet } from '@/graphql/wallet';
import { Wallet as WalletStore } from '@/store';
import { useNavigation } from '@react-navigation/native';


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const AddIcon = (props) => (
  <Icon {...props} name='plus-outline' />
);

export default ({ navigation }) => {
  const wallets = useSelector(store => store.Wallet.list);

  const navigateBack = () => {
    navigation.goBack();
  };

  const openForm = (wallet?: IWallet) => {
    navigation.navigate('WalletForm', { wallet });
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const AddAction = () => (
    <TopNavigationAction icon={AddIcon} onPress={() => openForm()}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Carteiras' accessoryLeft={BackAction} accessoryRight={AddAction}/>
      <Divider/>
      <Layout style={{ flex: 1 }}>
        <List
          data={wallets}
          renderItem={({ item }) => (
            <ListItem
              title={evaProps => (
                <Text {...evaProps} category={'h2'}>{item.name}</Text>
              )}
              onPress={() => openForm(item)}
            />
          )}
        />
      </Layout>
    </SafeAreaView>
  );
};
