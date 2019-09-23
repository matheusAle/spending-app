import {combineReducers} from "redux";
import { AuthReducer } from "./Auth";
import { AppReducer } from "./App";
import { SpendingFormReducer } from "./SpendingCreate";

export const rootReducer = combineReducers({
    Auth: AuthReducer,
    App: AppReducer,
    SpendingForm: SpendingFormReducer
});

export * from './Auth'
export * from './App'
export * from './SpendingCreate'
