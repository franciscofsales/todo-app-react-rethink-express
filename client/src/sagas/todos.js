import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import * as types from '../actions/Types';
import * as Api from '../api';



function* addTodo(action) {
   try {
      const result = yield call(Api.addTodo, action.payload);
      yield put({type: types.TODOS_ADD_SUCCESS});
   }
   catch (e) {
      yield put({type: types.TODOS_ADD_ERROR, payload: e});
   }
}

function* removeTodo(action) {
   try {
      const result = yield call(Api.removeTodo, action.payload);
      yield put({type: types.TODOS_REMOVE_SUCCESS, payload: action.payload});
   }
   catch (e) {
      yield put({type: types.TODOS_REMOVE_ERROR, payload: e});
   }
}


function* login(action){
  try {
     const result = yield call(Api.login, action.payload);
  }
  catch (e) {
     yield put({type: types.AUTH_EMAIL_ERROR, payload: e});
  }
}

function* register(action){
  try {
     const result = yield call(Api.register, action.payload);
  }
  catch (e) {
     yield put({type: types.AUTH_EMAIL_ERROR, payload: e});
  }
}

function* logout(){
  try {
    const result = yield call(Api.logout);
    yield put({type: types.AUTH_SIGNOUT_SUCCESS});
  }
  catch (e){
    yield put({type: types.AUTH_EMAIL_ERROR, payload: e});
  }
}



export default function* root() {
  yield takeEvery(types.TODOS_ADD_REQUEST, addTodo);
  yield takeEvery(types.TODOS_REMOVE_REQUEST, removeTodo);
  yield takeLatest(types.AUTH_EMAIL_REQUEST, login);
  yield takeLatest(types.AUTH_REGISTER_EMAIL_REQUEST, register);
  yield takeLatest(types.AUTH_SIGNOUT, logout);
}
