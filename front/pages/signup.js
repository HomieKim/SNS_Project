import { Button, Checkbox, Form, Input } from 'antd';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const Style_Error = styled.div`
    color : red;
`;

const Style_Button = styled(Button)`
    margin-top : 10px;
`;

const Signup = ()=>{
    // input값을 받아서 input값이 change 될때 마다 onChange하는 로직이 반복되므로 useInput으로 custom 해줌
    const [id,onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');


    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [checkError, setCheckError] = useState(false);

    const onChangePasswordCheck = useCallback((e)=> {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
        console.log('호출');

    },[passwordCheck]);
    const onSubmit = useCallback(()=> {
        if(password !== passwordCheck){
            console.log('password : ', password);
            console.log('passwordCheck : ', passwordCheck);
            return setPasswordError(true);
        }
        if(!isChecked){
            console.log('에러체크')
            return setCheckError(true);
        }
        console.log('회원가입 성공');
    },[password, passwordCheck, isChecked]);
    
    const onChangeChecked = useCallback((e) => {
        setCheckError(false);
        setIsChecked(e.target.checked);
    },[]);
    
    useEffect(()=> {
        if(passwordCheck !== '' && password == passwordCheck){
            setPasswordError(false);
        }
    },[password]);
    
    return (
        <AppLayout>
            <Head>
                <title>회원가입</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-id'>아이디</label> <br />
                    <Input name='user-id' value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor='user-id'>닉네임</label> <br />
                    <Input name='user-nickname' value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor='user-password'>비밀번호</label> <br />
                    <Input name='user-password' type='password' value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor='user-password-check'>비밀번호 체크</label> <br />
                    <Input name='user-password-check' type='password' value={passwordCheck} required onChange={onChangePasswordCheck} />
                    {passwordError && <Style_Error>비밀번호가 일치하지 않습니다.</Style_Error>}
                </div>
                <div>
                    <Checkbox name="user-check" checked={isChecked} onChange={onChangeChecked}>가입 동의 합니다.</Checkbox>
                    {checkError && <Style_Error>약관에 동의하셔야 합니다.</Style_Error>}
                </div>
                <Style_Button type='primary' htmlType='submit'>가입하기</Style_Button>
            </Form>
        </AppLayout>
    )
};

export default Signup;