/* @flow */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Router from './Router';



export default class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware());

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
