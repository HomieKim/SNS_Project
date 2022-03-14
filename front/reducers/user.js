/* eslint-disable default-param-last */
export const initialState = {
  // 로그인 상태
  logInLoading: false,
  logInDone: false,
  logInError: null,
  // 로그아웃 상태
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  // 회원가입 상태
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  // 팔로우 상태
  followLoading: false,
  followDone: false,
  followError: null,
  // 언팔로우 상태
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  // 닉네임 변경 상태
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

/* 액션 타입 정의 */
// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
// 팔로우
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
// 언팔로우
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';
// 언팔로우
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';
// post 시 user가 가지고 있는 post 상태도 바꿔줘야함, post saga에서 이 액션을 호출해줌
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

// success나 failure 액션은 사가에서 put으로 호출하기 때문에 reducer에서는 따로 정의 안해도 됨 요청 액션 생성함수만 정의
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const signUpReqeustAction = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};

// 더미 데이터
const dummyUser = (data) => ({
  ...data,
  nickname: 'homie',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: '부기초' },
    { nickname: 'Chanho Lee' },
    { nickname: 'neue zeal' },
  ],
  Followers: [
    { nickname: '부기초' },
    { nickname: 'Chanho Lee' },
    { nickname: 'neue zeal' },
  ],
});
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
        logInError: false,
        logInDone: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        me: dummyUser(action.data),
        logInDone: true,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutError: false,
        logOutDone: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        me: null,
        logOutDone: true,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.err,
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
        followDone: false,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
        me: state.me.Followings.push({ id: action.data }),
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        followLoading: false,
        followError: action.err,
      };
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        unfollowLoading: true,
        unfollowDone: false,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        unfollowLoading: false,
        unfollowDone: true,
        me: state.me.Followings.filter((v) => v.id !== action.data),
      };
    case UNFOLLOW_FAILURE:
      return {
        ...state,
        unfollowLoading: false,
        unfollowError: action.err,
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.err,
      };
    case ADD_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    case REMOVE_POST_TO_ME:
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };
    default:
      return state;
  }
};

export default reducer;
