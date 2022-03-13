import { Form, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyleNickNameEditForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  return (
    <StyleNickNameEditForm>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </StyleNickNameEditForm>
  );
};

export default NicknameEditForm;
