import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
    setCredentials: ["email", "password"],
    authenticate: ["emails", "password"]
}, {
    prefix: 'Auth/'
});

const INITIAL_STATE = Immutable({
    email: '',
    password: ''
});

export const LoginReducer = createReducer(INITIAL_STATE, {
    [Types.SET_CREDENTIALS]: (state, { email, password }) => state.merge({ email, password }),
    [Types.AUTHENTICATE]: (state, { email, password }) => {

        // TODO: auth flux

        return state.merge({ email, password });
    },
});

