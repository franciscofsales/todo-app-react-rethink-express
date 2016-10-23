import {Actions} from 'react-native-router-flux';

import {
  AUTH_STATUS_CHANGE,
  AUTH_EMAIL,
  AUTH_SIGNOUT,
  AUTH_REGISTER_EMAIL,
  AUTH_EMAIL_ERROR,
  AUTH_SIGNOUT_SUCCESS
} from '../actions/Types';

export default (state = {user: null, error: null}, action) => {
  switch (action.type) {
  case AUTH_SIGNOUT:
    return {user: null, error: null};
  case AUTH_SIGNOUT_SUCCESS:
    Actions.auth({type:'reset'});
    return {user: {}, error: null};
  case AUTH_STATUS_CHANGE:
    if (!action.payload ) {
      return {user: {}, error: null};
    }

    return {
      user: {
        email: action.payload.email,
        uid: action.payload.uid
      },
      error: null
    };


  case AUTH_EMAIL_ERROR:
    return {
      user: {},
      error: action.payload
    };

  case AUTH_EMAIL:
    let authErr = null;
    let authUsr = {};
    if (action.error) {
      authErr = action.payload.message;
    }
    else {
      authUsr = {
        email: action.payload.email,
        uid: action.payload.uid
      };
    }
    return {
      user: authUsr,
      error: authErr
    };
  case AUTH_REGISTER_EMAIL:
    alert(JSON.stringify(action.payload));
    let authRegErr = null;
    let authRegUsr = {};
    if (action.error) {
      authRegErr = action.payload.message;
    }
    else {
      authRegUsr = {
        email: action.payload.email,
        uid: action.payload.uid
      };
    }
    return {
      user: authRegUsr,
      error: authRegErr
    };
  default:
    return state;
  }
};
