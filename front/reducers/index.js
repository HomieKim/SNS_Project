import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

// (이전상태, 액션) => 다음상태
const rootReduer = combineReducers({
    // 서버 사이드 렌더링을 위해 HYDRATE 리듀서 추가
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE : ", action);
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReduer;
