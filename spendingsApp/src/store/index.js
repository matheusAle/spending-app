import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./ducks";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import { composeWithDevTools } from 'remote-redux-devtools';
import Reactotron from '../config/reactotron';


const composeEnhancers = composeWithDevTools({
    realtime: true,
    hostname: '192.168.1.9',
    port: 8000
});


const store = createStore(rootReducer, {}, composeEnhancers(
    Reactotron.createEnhancer(),
    applyMiddleware(thunk, promise, multi),
));

export default store;

export * from './ducks'
