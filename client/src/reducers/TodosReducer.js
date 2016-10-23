import { Actions } from 'react-native-router-flux';
import {map} from 'lodash';
import * as types from '../actions/Types';

const initialState = [
  // {text:'testing the hell out of this stuff wokfasodfksaodfsa', title:"my note"},
  // {text:'some text just fo test the ui', title:"my steesd"},
  // {text:'i have no idea so lorem ipsum', title:"a note!"}
];

export default function  (state = initialState, action) {
  switch (action.type) {
    case types.TODOS_ADD_SUCCESS:
      Actions.pop();
      return state;
    case types.TODOS_REMOVE_SUCCESS:
      return [
        ...state.slice(0, state.indexOf(action.payload)),
        ...state.slice(state.indexOf(action.payload)+1)
      ]
    case types.TODOS_FETCH_SUCCESS:
      return map(action.payload, (val, uid) => {
        return {...val, uid};
      });

    case types.TODOS_FETCH_ERROR:
      alert(JSON.stringify(action));
      return state;
    case types.TODOS_ADD_ERROR:
      alert(JSON.stringify(action));
      return state;
    case types.TODOS_REMOVE_ERROR:
      alert(JSON.stringify(action));
      return state;
    default :
      return state
  }
}
