import { Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import WalletList from './pages/WalletList';
import WalletForm, { WalletFormRouteParams } from './pages/WalletForm';
import User from './index';
import { TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { createStackNavigator, StackNavigationProp, StackHeaderProps } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/core';
import { PagesStackParamList } from '@/pages';

export interface UserStackParamsList {
  WalletForm: WalletFormRouteParams;
  WalletList: undefined;
  User: undefined;
}

export type UserNavigationProps = CompositeNavigationProp<
  StackNavigationProp<PagesStackParamList, 'Private'>,
  StackNavigationProp<UserStackParamsList>
  >;

const { Navigator, Screen } = createStackNavigator<UserStackParamsList>();

const formsNavigationOptions: any = ({ navigation, scene }: StackHeaderProps) => ({
    // title: scene.route.params.pageTitle,
    // headerRight: (
    //   <TouchableNativeFeedback
    //     onPress={scene.route.params.pageOnSave}
    //     background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    //   >
    //       <View style={{ padding: 16, borderRadius: 50 }}>
    //           <Icon name="check" color="black" size={24} />
    //       </View>
    //   </TouchableNativeFeedback>
    // )
});

const listsNavigationOptions: any = ({ navigation, scene }: StackHeaderProps) => ({
    // title: scene.route.params.pageTitle,
    // headerRight: scene.route.params.rightRedirectTo ? (
    //   <TouchableNativeFeedback
    //     onPress={() => navigation.push(navigation.getParam('rightRedirectTo'))}
    //     background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    //   >
    //       <View style={{ padding: 16, borderRadius: 50 }}>
    //           <Icon name="add" color="black" size={24} />
    //       </View>
    //   </TouchableNativeFeedback>
    // ) : undefined
});

export default () => (
  <Navigator
    headerMode='none'
    initialRouteName='User'
  >
    <Screen
        name='WalletForm'
        component={WalletForm}
        // options={{ header: formsNavigationOptions }}
    />
    <Screen
        name='WalletList'
        component={WalletList}
        // options={{ header: listsNavigationOptions }}
    />
    <Screen
        name='User'
        component={User}
        // options={{ header: listsNavigationOptions }}
    />
  </Navigator>
);
