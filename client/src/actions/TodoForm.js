import * as types from './Types';

export const todoFormUpdate = ( {prop, value} ) => {
  return {
    type: types.TODO_FORM_UPDATE,
    payload: { prop, value }
  };
};
