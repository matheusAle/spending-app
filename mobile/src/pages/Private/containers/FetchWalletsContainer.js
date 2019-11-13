import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { Wallet } from "@/graphql/wallet";
import { Wallet as WalletStore } from "@/store";

export default props => {

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
