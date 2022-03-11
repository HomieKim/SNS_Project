export const initialState = {
    //로그인 상태
    logInLoading : false,
    logInDone : false,
    logInError : null,
    // 로그아웃 상태
    logOutLoading : false,
    logOutDeon : false,
    logOutError : null,
    
    me: null,
    signUpData: {},
    loginData :{},
};
// 액션 타입 정의
// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그아웃
export const LOG_OUT_REQUEST = 'LOG_IN_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_IN_FAILURE';

export const loginRequestAction = (data) => {
    return {
        type : LOG_IN_REQUEST,
        data,
    }
};

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN_REQUEST :
            return {
                ...state,
                logInLoading : true,
                logInError : false,
                logInDone : false
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                logInLoading : false,
                me : action.data,
                logInDone : true
            }
        case LOG_IN_FAILURE :
            return {
                ...state,
                logInLoading : false,
                logInError : action.error
            }
        case LOG_OUT_REQUEST :
            return {
                ...state,
                logOutLoading : true,
                logOutError : false,
                logOutDone : false
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logOutLoading : false,
                me : null,
                logOutDone : true
            }
        case LOG_OUT_FAILURE :
            return {
                ...state,
                logOutLoading : false,
                logOutError : action.error
            }
        default : 
            return state;
    }
};

export default reducer;