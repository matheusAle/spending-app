import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import { NativeModules } from "react-native";
import url from "url";
import sagaPlugin from "reactotron-redux-saga";

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);


const tron = Reactotron.configure({ host: hostname, name: 'spendingsApp' })
  .useReactNative({  })
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();

console.tron = tron;

tron.clear();

export default tron
