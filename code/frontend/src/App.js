import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { CookiesProvider } from 'react-cookie';
import reducer from './reducers';
import Layout from './components/Layout';


const middleware = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) : applyMiddleware(logger, thunk);
const store = createStore(reducer, middleware);

/**
 * @class
 * Main component wrapping all components with state and cookie providers
 * */
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
