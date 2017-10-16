import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './reducers';
import Layout from './components/Layout';

const reducer = combineReducers(reducers);
const middleware = applyMiddleware(logger, thunk);
const store = createStore(reducer, middleware);

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Layout />
        </Provider>
      </div>
    );
  }
}
