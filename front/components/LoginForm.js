import { Input, Form, Button } from 'antd';
import Link from 'next/link';
import propTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    margin-top : 10px;
`;

const StyleLogInForm = styled(Form)`
    padding : 10px;
`;

const LoginForm = ({setIsLogedin}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const onChageId = useCallback((e)=> {
        setId(e.target.value);
    },[]);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    },[]);

    const onSubmitForm = useCallback(()=> {
        console.log({id, password});
        setIsLogedin(true);
    },[id, password]);

    return (
        // antd에서 제공하는 Form의 onFinish는 자동으로 preventDefault 적용되어있음
        <StyleLogInForm onFinish={onSubmitForm}>
            <div>
                <label htmlFor='user-id'>아이디</label>
                <br/>
                <Input name='user-id' value={id} onChange={onChageId} required/>
            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label> <br/>
                <Input name='user-password'value={password} onChange={onChangePassword} type='password' required />
            </div>
            <ButtonWrapper>
                <Button type='primary' htmlType='submit' loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </StyleLogInForm>
    );
};

LoginForm.propTypes = {
    setIsLogedin: propTypes.func.isRequired,
};

export default LoginForm;