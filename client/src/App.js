/* @flow */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import firebase from 'firebase';

import reducers from './reducers';
import Router from './Router';
import rootSaga from './sagas/todos';

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ReduxThunk,
  ReduxPromise,
  sagaMiddleware
]
const store = createStore(reducers, {}, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAID3vyEG1ph4sLfvRMjQVJYbG7NnahRPo",
      authDomain: "todoapp-8e5b9.firebaseapp.com",
      databaseURL: "https://todoapp-8e5b9.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "475809158457"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
