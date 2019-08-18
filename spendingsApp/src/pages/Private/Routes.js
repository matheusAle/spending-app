import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './Home';

export const Routes = createAppContainer(
    createStackNavigator({
        Home
    }, {
        headerMode: 'none'
    }
));
