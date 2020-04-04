import * as React from 'react';
import {
  useNavigationBuilder,
  TabRouter,
} from '@react-navigation/native';
import { ScrollView } from "react-native";
import BottomBar from './BottomBar';

export default function CustomTabNavigator(props) {
  const { state, descriptors } = useNavigationBuilder(TabRouter, props);

  return (
    <React.Fragment>
        <ScrollView style={[{ flex: 1, height: 100 }]}>
          {descriptors[state.routes[state.index].key].render()}
        </ScrollView>
      <BottomBar />
    </React.Fragment>
  );
}
