import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
    setWallets: ['list'],
    updateWallet: ['wallet'],
    addWallet: ['wallet'],
    deleteWallet: ['wallet']
}, {
    prefix: 'Wallet/'
});

const INITIAL_STATE = Immutable({
    list: [],
});

export const WalletReducer = createReducer(INITIAL_STATE, {
    [Types.SET_WALLETS]: (state, { list }) => state.merge({ list }),
    [Types.UPDATE_WALLET]: (state, { wallet }) => state.merge({
        list: state.list.map(w => w._id === wallet._id ? wallet : w)
    }),
    [Types.DELETE_WALLET]: (state, { wallet }) => state.merge({
        list: state.list.filter(w => w._id !== wallet._id )
    }),
    [Types.ADD_WALLET]: (state, { wallet }) => state.merge({
        list: [...state.list, wallet]
    }),
});

export const Wallet = Creators;
