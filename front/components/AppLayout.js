import React, { useState } from "react";
import propTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';

const StyleSearchInput = styled(Input.Search)`
  vertical-align : middle;
`;


const AppLayout = ({ children }) => {
  const [isLogedin, setIsLogedin] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <StyleSearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLogedin ? <UserProfile setIsLogedin={setIsLogedin} /> : <LoginForm setIsLogedin={setIsLogedin}/>}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href='https://github.com/HomieKim' target="_blank" rel="noreferrer noopener">github</a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
