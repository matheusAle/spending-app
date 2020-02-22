import { createStackNavigator } from "react-navigation-stack";
import HomePage from "./pages/Home";
import UserPage from "./pages/User/routes";

export const Routes = createStackNavigator({
  Home: HomePage,
  User: UserPage,
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
});
