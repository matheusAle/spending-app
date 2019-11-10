import { combineReducers } from "redux";
import { AuthReducer } from "./Auth";
import { AppReducer } from "./App";
import { SpendingFormReducer } from "./SpendingCreate";
import { WalletReducer } from "@/store/ducks/Wallet";

export const rootReducer = combineReducers({
    Auth: AuthReducer,
    App: AppReducer,
    Wallet: WalletReducer,
    SpendingForm: SpendingFormReducer
});

export * from './Auth'
export * from './App'
export * from './SpendingCreate'
export * from './Wallet'
