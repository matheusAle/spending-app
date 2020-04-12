import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./ducks";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';

const middlewares = [thunk, promise, multi];

if (__DEV__) { // eslint-disable-line
  const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;
  middlewares.push(createFlipperMiddleware())
}

const store = createStore(rootReducer, {}, compose(
    applyMiddleware(...middlewares),
));

export default store;

export * from './ducks'
