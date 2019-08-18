
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Auth from './pages/Auth'
import Private from './pages/Private'



export const Routes = createAppContainer(
  createSwitchNavigator({
    Auth,
    Private
  }, {
      initialRouteName: 'Private',
  })
);
