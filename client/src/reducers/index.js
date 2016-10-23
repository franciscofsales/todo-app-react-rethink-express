import { combineReducers } from 'redux';
import TodoFormReducer from './TodoFormReducer';
import TodosReducer from './TodosReducer';
import AuthReducer from './Auth';

export default combineReducers({
  todos: TodosReducer,
  todoForm: TodoFormReducer,
  auth: AuthReducer
});
