import { Input, Form, Button } from 'antd';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
    margin-top : 10px;
`;

const StyleLogInForm = styled(Form)`
    padding : 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch() 
    const {logInLoading} = useSelector((state) => state.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChageEmail = useCallback((e)=> {
        setEmail(e.target.value);
    },[]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    const onSubmitForm = useCallback(()=> {
        console.log({email, password});
        dispatch(loginRequestAction({email, password}));
    },[email, password]);

    return (
        // antd에서 제공하는 Form의 onFinish는 자동으로 preventDefault 적용되어있음
        <StyleLogInForm onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-email'>이메일</label>
                <br/>
                <Input name='user-email' type="email" value={email} onChange={onChageEmail} required/>
            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label> <br/>
                <Input name='user-password'value={password} onChange={onChangePassword} type='password' required />
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </StyleLogInForm>
    );
};


export default LoginForm;

/*
로그인 버튼 누르면 logInRequest가 실행 됨
그러면 미들웨어인 saga에 yield takeLatest(LOG_IN_REQUEST, logIn)에 걸리게 됨 
logIn 함수 실행 되면서 비동기 요청
리듀서의 LOG_IN_REQUEST랑도 동시에 실행 됨
saga에서 비동기 요청이 실행 되면 LOG_IN_SUCCESS 실행
*/