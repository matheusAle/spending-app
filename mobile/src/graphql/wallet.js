import gql from "graphql-tag";


export const Wallet = {
  fragments: {
    wallet: gql `
        fragment Wallet on Wallet {
            _id
            name
            isCard
            isDebit
            isCredit
            availableAmount
            creditLimit
            invoiceClosesOn
            availableCreditLimit
        }
    `
  }
};

Wallet.all = gql `
    query listWallets {
        wallets {
            ...Wallet
        }
    }
    ${Wallet.fragments.wallet}
`;

Wallet.create = gql `
    mutation createWallet($wallet: WalletInput!) {
        createWallet(wallet: $wallet) {
            ...Wallet
        }
    }
    ${Wallet.fragments.wallet}
`;

Wallet.update = gql `
    mutation updateWallet($id: String!, $wallet: WalletInput!) {
        updateWallet(_id: $id, wallet: $wallet) {
            ...Wallet
        }
    }
    ${Wallet.fragments.wallet}
`;

Wallet.delete = gql `
    mutation deleteWallet($id: String!) {
        deleteWallet(_id: $id)
    }
`;


Wallet.get = gql `
    query getWallet($id: String!) {
        wallet(_id: $id) {
            ...Wallet
        }
    }
    ${Wallet.fragments.wallet}
`;
