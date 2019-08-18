import {combineReducers} from "redux";
import { AuthReducer } from "./Auth";
import { AppReducer } from "./App";

export const rootReducer = combineReducers({
    Auth: AuthReducer,
    App: AppReducer
});

export * from './Auth'
export * from './App'
