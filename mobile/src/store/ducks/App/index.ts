import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
    setLoading: ['show'],
    setState:['stateName'],
    setUserInfo: ['user'],
    setUserToken: ['token'],
    nav: ['prevScreen', 'currentScreen']
}, {
    prefix: 'App/'
});

const INITIAL_STATE = Immutable({
    loading: false,
    user: {},
    token: '',
    stateName: ''
});

export const AppReducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOADING]: (state, { show }) => state.merge({ loading: show }),
    [Types.SET_STATE]: (state, { stateName }) => state.merge({ stateName }),
    [Types.SET_USER_INFO]: (state, { user }) => state.merge({ user }),
    [Types.SET_USER_TOKEN]: (state, { token }) => state.merge({ token }),
    [Types.NAV]: (state, { currentScreen, prevScreen }) => state.merge({ nav: { currentScreen, prevScreen } }),
});

export const App = Creators;
