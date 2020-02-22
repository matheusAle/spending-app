import { createStackNavigator } from 'react-navigation-stack';
import WalletList from './pages/WalletList';
import WalletForm from './pages/WalletForm';
import TagList from './pages/TagList';
import User from './index';
import { TouchableNativeFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";


const formsNavigationOptions = ({ navigation }) => ({
    title: navigation.getParam('pageTitle'),
    headerRight: (
      <TouchableNativeFeedback
        onPress={navigation.getParam('pageOnSave')}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
          <View style={{ padding: 16, borderRadius: 50 }}>
              <Icon name="check" color="black" size={24} />
          </View>
      </TouchableNativeFeedback>
    )
});

const listsNavigationOptions = ({ navigation }) => ({
    title: navigation.getParam('pageTitle'),
    headerRight: navigation.getParam('rightRedirectTo') ? (
      <TouchableNativeFeedback
        onPress={() => navigation.push(navigation.getParam('rightRedirectTo'))}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
          <View style={{ padding: 16, borderRadius: 50 }}>
              <Icon name="add" color="black" size={24} />
          </View>
      </TouchableNativeFeedback>
    ) : undefined
});


export default createStackNavigator({
    WalletForm: {
        screen: WalletForm,
        navigationOptions: formsNavigationOptions
    },
    WalletList: {
        screen: WalletList,
        navigationOptions: listsNavigationOptions
    },
    User: {
        screen: User,
        navigationOptions: listsNavigationOptions
    }
}, {
    headerMode: 'screen',
    initialRouteName: 'User',
})
