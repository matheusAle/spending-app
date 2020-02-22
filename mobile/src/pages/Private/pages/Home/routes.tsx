import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import SpendingList from './pages/SpendingList';
import Search from './pages/Search';
import Reports from './pages/Reports';
import BottomBar  from './components/BottomBar';

export const HomeRoutes = createBottomTabNavigator({
        SpendingList: {
            screen: SpendingList,
            path: 'home/spending/list',
        },
        Search: {
            screen: Search,
            path: 'home/search',
        },
        Reports: {
            screen: Reports,
            path: 'home/reports',
        },
    }, {
        headerMode: 'none',
        initialRouteKey: 'SpendingList',
        tabBarComponent: BottomBar,
    }
);
