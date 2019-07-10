import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

if (__DEV__) {
    const tron = Reactotron.configure({ host: '192.168.1.9', name: 'spendingsApp' })
      .useReactNative()
      .use(reactotronRedux())
      .connect();

    console.tron = tron;

    tron.clear();
}
