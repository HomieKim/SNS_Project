import { Button, Checkbox, Form, Input } from 'antd';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_DONE, SIGN_UP_REQUEST } from '../reducers/user';

const StyleError = styled.div`
  color: red;
`;

const StyleButton = styled(Button)`
  margin-top: 10px;
`;

const Signup = () => {
  // input값을 받아서 input값이 change 될때 마다 onChange하는 로직이 반복되므로 useInput으로 custom 해줌
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checkError, setCheckError] = useState(false);

  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
      dispatch({
        type: SIGN_UP_DONE,
      });
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
      // console.log('비밀번호 체크');
    },
    [passwordCheck],
  );
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      // console.log('password : ', password);
      // console.log('passwordCheck : ', passwordCheck);
      return setPasswordError(true);
    }
    if (!isChecked) {
      // console.log('에러체크')
      return setCheckError(true);
    }
    // console.log('회원가입 성공');
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, isChecked]);

  const onChangeChecked = useCallback((e) => {
    setCheckError(false);
    setIsChecked(e.target.checked);
  }, []);

  useEffect(() => {
    if (passwordCheck !== '' && password === passwordCheck) {
      setPasswordError(false);
    }
  }, [password]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label> <br />
          <Input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-id">닉네임</label> <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label> <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 체크</label> <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <StyleError>비밀번호가 일치하지 않습니다.</StyleError>
          )}
        </div>
        <div>
          <Checkbox
            name="user-check"
            checked={isChecked}
            onChange={onChangeChecked}
          >
            가입 동의 합니다.
          </Checkbox>
          {checkError && <StyleError>약관에 동의하셔야 합니다.</StyleError>}
        </div>
        <StyleButton type="primary" htmlType="submit" loading={signUpLoading}>
          가입하기
        </StyleButton>
      </Form>
    </AppLayout>
  );
};

export default Signup;
