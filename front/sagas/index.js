import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

/*
  all - 배열을 받아서 배열안에 있는 것들을 한번에 실행시켜 줌
  fork - 함수를 실행하는 것 , call과 구분해야 함!
  정리 : all을 배열을 받아서 한번에 실행할 수 있게 하는 거고 fork가 함수 하나하나를 실행 시켜주는 것
  take - 액션을 받아서 해당 함수가 실행 될때 동안 기다림
  call 이랑 fork 차이?
  fork는 비동기 함수 호출
  call은 동기 함수 호출 // 결과값 받아 올 때까지 기다리게 됨
  takeEvery - while문 처럼 사용
  takeLatest - 클릭을 실수로 두번했을 때(마지막 것만 인식하게 해줌, 단 앞에 완료된 처리는 취소 되지x, 동시에 로딩 중인 것만 앞에 것을 취소)
  throttle - 초 단위로 실행할 요청을 제한, takeLatest는 요청을 취소하는 게 아니기 때문에
 */
