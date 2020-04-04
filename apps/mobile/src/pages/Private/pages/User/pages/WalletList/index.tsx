import React, { useEffect } from "react";
import { List, ListItem } from 'react-native-ui-kitten';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@/hooks";
import { Wallet } from "@/graphql/wallet";
import { Wallet as WalletStore } from "@/store";
import { useNavigation } from '@react-navigation/native';

export const WalletListProvider = (props) => {

    const dispatch = useDispatch();
    const { data: { wallets } = {}} = useQuery(Wallet.all);

    useEffect(() => {
        if (!wallets) {
            return;
        }
        dispatch(WalletStore.setWallets(wallets));
    }, [wallets]);

    return props.children
};

export default props => {
    const navigation = useNavigation();
    const wallets = useSelector(store => store.Wallet.list);

    useEffect(() => {
        props.navigation.setParams({
            pageTitle: 'Carteiras',
            rightRedirectTo: 'WalletForm'
        });
    }, []);

    return (
      <List
        data={wallets}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            onPress={(i) => {
                navigation.navigate('WalletForm', {
                    wallet: item
                })
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
