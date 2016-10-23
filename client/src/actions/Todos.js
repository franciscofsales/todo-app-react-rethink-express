import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import * as types from './Types';

export const addTodo = ( payload ) => {
  return {
    type: types.TODOS_ADD_REQUEST,
    payload
  };
};

export const removeTodo = ( payload ) => {
  return {
    type: types.TODOS_REMOVE_REQUEST,
    payload
  };
};

export const fetchTodos = () => {
  const { currentUser } = firebase.auth();
  if (!currentUser) {
    Actions.auth({type:'reset'});
    return {
      type: 'FAKE_ACTION'
    };
  }
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/todos/`)
      .on('value', snapshot => {
        dispatch({
          type: 'TODOS_FETCH_SUCCESS',
          payload: snapshot.val()
        });
      });

  }
};
