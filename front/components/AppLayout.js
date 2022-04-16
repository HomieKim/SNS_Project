import React, { useCallback } from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import useInput from '../hooks/useInput';

const StyleSearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const StyleContainer = styled.div`
  max-width: 1280px;
  margin: auto;
  //display : flex;
`;

const ContentsContainer = styled.div`
  max-width: 1280px;
  margin: auto;
`;
const AppLayout = ({ children }) => {
  const [searchInput, onChangeSerachInput] = useInput();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <div
        style={{ width: '100%', borderBottom: '1px solid rgb(230,230,230)' }}
      >
        <StyleContainer>
          <Menu mode="horizontal" selectedKeys={[router.pathname]}>
            <Menu.Item key="/">
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
              <StyleSearchInput
                enterButton
                value={searchInput}
                onChange={onChangeSerachInput}
                onSearch={onSearch}
              />
            </Menu.Item>
          </Menu>
        </StyleContainer>
      </div>
      <ContentsContainer>
        <Row gutter={8}>
          <Col xs={24} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href="https://github.com/HomieKim"
              target="_blank"
              rel="noreferrer noopener"
            >
              github
            </a>
          </Col>
        </Row>
      </ContentsContainer>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
