
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Auth from './pages/Auth'

export const Routes = createAppContainer(
  createSwitchNavigator({
    Auth
  }),
  {
    headerMode: 'none'
  }
);
