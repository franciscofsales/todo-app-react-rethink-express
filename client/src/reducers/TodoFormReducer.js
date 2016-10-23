import * as types from '../actions/Types';

const initialState = {
  title: '',
  text: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.TODO_FORM_UPDATE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };
    case types.TODOS_ADD_SUCCESS:
      return initialState;
    default :
      return state
  }
}
