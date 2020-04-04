import { NavigationState, PartialState } from '@react-navigation/core'

export function getActiveRouteName(state: NavigationState | PartialState<any>) {
    const route = state.routes[state.index];

    if (route.state) {
        return getActiveRouteName(route.state);
    }

    return route.name;
}
