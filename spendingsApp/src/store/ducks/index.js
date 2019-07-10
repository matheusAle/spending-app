import {combineReducers} from "redux";
import { rootReducer as authReducer } from "./Auth";

export const rootReducer = combineReducers({
    Auth: authReducer
});

export * from './Auth'
