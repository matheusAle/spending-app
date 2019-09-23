import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
    setLoading: ['show'],
    nav: ['nav']
}, {
    prefix: 'App/'
});

const INITIAL_STATE = Immutable({
    loading: false,
});

export const AppReducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOADING]: (state, { show }) => state.merge({ loading: show }),
    [Types.NAV]: (state, { nav }) => {

        function getActiveRouteName(navigationState) {
            if (!navigationState) {
                return null;
            }
            const route = navigationState.routes[navigationState.index];
            // dive into nested navigators
            if (route.routes) {
                return getActiveRouteName(route);
            }
            return route.routeName;
        }

        const currentScreen = getActiveRouteName(nav.currentState);
        const prevScreen = getActiveRouteName(nav.prevState);



        return state.merge({ nav: { currentScreen, prevScreen } })
    },
});

export const App = Creators;
