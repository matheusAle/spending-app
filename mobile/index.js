if (__DEV__) {
    import('./src/config/reactotron').then(() => console.tron.log('Started!'));
    require('react-devtools-core').connectToDevTools({
        host: '192.168.0.5'
    });
}

console.disableYellowBox = true;


import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
