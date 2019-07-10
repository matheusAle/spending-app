import {combineReducers} from "redux";
import { LoginReducer } from "./Login";

export const rootReducer = combineReducers({
    Login: LoginReducer
});

import { Types, Creators } from './Login'

export const Auth = {
    Login: { Types, Creators }
};
