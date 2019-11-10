import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./ducks";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import Reactotron from '../config/reactotron';

const store = createStore(rootReducer, {}, compose(
    applyMiddleware(thunk, promise, multi),
    Reactotron.createEnhancer(),
));

export default store;

export * from './ducks'
