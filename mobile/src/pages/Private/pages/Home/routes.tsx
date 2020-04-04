import React from 'react';
import SpendingList, { SpendingListRouteProps } from "./pages/SpendingList";
import Search, { SearchRouteProps } from "./pages/Search";
import Reports, { ReportsRouteProps } from "./pages/Reports";
import CustomTabNavigator from './components/CustomTabNavigator';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { PagesStackParamList } from "@/pages";

export type HomeStackParamList = {
  SpendingList: SpendingListRouteProps;
  Search: SearchRouteProps;
  Reports: ReportsRouteProps
}

export type HomeNavigationProps = CompositeNavigationProp<
  StackNavigationProp<PagesStackParamList, 'Private'>,
  StackNavigationProp<HomeStackParamList>
>;

const { Screen } = createBottomTabNavigator<HomeStackParamList>();

export const HomeRoutes = () => (
  <CustomTabNavigator
    initialRouteName="SpendingList"
  >
    <Screen
      name="SpendingList"
      component={SpendingList}
    />
    <Screen
      name="Search"
      component={Search}
    />
    <Screen
      name="Reports"
      component={Reports}
    />
  </CustomTabNavigator>
);
