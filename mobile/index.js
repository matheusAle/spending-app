if (__DEV__) {
    import('@/config/reactotron').then(() => console.tron.log('Started!'));
    require('react-devtools-core').connectToDevTools({
        host: '192.168.0.8'
    });
}

console.disableYellowBox = true;


import {AppRegistry} from 'react-native';
import App from '@/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
