
import {all, fork, take} from 'redux-saga/effects'

function* watchLogIn(){
  yield take('LOG_IN');
}
function* watchLogOut(){
  yield take('LOG_OUT');
}
function* watchAddPost(){
  yield take('ADD_POST');
}

export default function* rootSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}

/*
  all - 배열을 받아서 배열안에 있는 것들을 한번에 실행시켜 줌
  fork - 함수를 실행하는 것 , call과 구분해야 함!
  정리 : all을 배열을 받아서 한번에 실행할 수 있게 하는 거고 fork가 함수 하나하나를 실행 시켜주는 것
  take - 액션을 받아서 해당 함수가 실행 될때 동안 기다림
  call 이랑 fork 차이?
  fork는 비동기 함수 호출
  call은 동기 함수 호출 // 결과값 받아 올 때까지 기다리게 됨
 */