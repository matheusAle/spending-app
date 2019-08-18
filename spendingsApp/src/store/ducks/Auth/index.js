import {combineReducers} from "redux";
import { LoginReducer } from "./Login";

export const AuthReducer = combineReducers({
    Login: LoginReducer
});

import { Creators } from './Login'

export const Auth = {
    Login: { ...Creators }
};
