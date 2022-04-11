import { StopOutlined } from '@ant-design/icons/lib/icons';
import { Button, Card, List } from 'antd';
import propTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowList = ({ header, data }) => {
  // 스타일 객체 리렌더링 안되게
  const StyleList = useMemo(
    () => ({
      marginBottom: '20px',
    }),
    [],
  );

  const StyleListItem = useMemo(
    () => ({
      marginTop: '20px',
    }),
    [],
  );

  const StyleLoadMore = useMemo(
    () => ({
      textAlign: 'center',
      margin: '10px 0',
    }),
    [],
  );

  const StyleGrid = useMemo(
    () => ({
      gutter: 4,
      xs: 2,
      sm: 3,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 4,
    }),
    [],
  );
  // 상태 관리 로직
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };
  return (
    <List
      style={StyleList}
      header={<div>{header}</div>}
      grid={StyleGrid}
      size="small"
      loadMore={
        <div style={StyleLoadMore}>
          <Button>더보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={StyleListItem}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: propTypes.string.isRequired,
  data: propTypes.array.isRequired,
};

export default FollowList;
