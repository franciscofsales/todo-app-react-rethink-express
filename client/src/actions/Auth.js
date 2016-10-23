import firebase from 'firebase';
import * as types from './Types';

export function loginWithEmail(email, password) {
  return {
    type: types.AUTH_EMAIL_REQUEST,
    payload: {
      email,
      password
    }
  };
}

export function registerWithEmail(email, password) {
  return {
    type: types.AUTH_REGISTER_EMAIL_REQUEST,
    payload: {
      email,
      password
    }
  };
}

export function signOut() {
  return {
    type: types.AUTH_SIGNOUT
  };
}

export function subscribeAuthStatus() {
  return dispatch => {
    firebase.auth().onAuthStateChanged( user => {
      dispatch({
        type: types.AUTH_STATUS_CHANGE,
        payload: user
      });
    });
  };
}
