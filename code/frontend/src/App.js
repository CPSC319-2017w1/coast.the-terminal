import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { CookiesProvider } from 'react-cookie';
import reducer from './reducers';
import Layout from './components/Layout';


const middleware = applyMiddleware(logger, thunk);
const store = createStore(reducer, middleware);

export default class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <Layout />
        </Provider>
      </CookiesProvider>
    );
  }
}
