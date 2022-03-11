import axios from 'axios';
import {all, fork, takeLatest, put, delay} from 'redux-saga/effects'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS } from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function logOutAPI(){
  return axios.post('api/logout');
}


function* logIn(action){
  try{
    console.log('saga LogIn');
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data : action.data,
    })
  }catch(err){
    console.log(err);
    yield put({
      type: LOG_IN_FAILURE,
      error : err.response.data,
    })
  }
}

function* logOut(){
  try{
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  }catch (err){
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn(){
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
      fork(watchLogIn),
      fork(watchLogOut)
  ]); 
}