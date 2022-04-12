import { Button, Card, Comment, List, Popover } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons/lib/icons';
import Avatar from 'antd/lib/avatar/avatar';
import Link from 'next/link';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import {
  LIKE_POST_REQUEST,
  removePost,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';

const StyleCardWrpper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  // const id = useSelector((state) => state.user.me && state.user.me.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const id = me && me.id;
  const liked = post.Likers.find((v) => v.id === id);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    return dispatch(removePost(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <StyleCardWrpper>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar>{post.User.nickname[0]}</Avatar>
            <div style={{ marginLeft: '20px' }}>
              {post.RetweetId && post.Retweet
                ? post.User.nickname
                : `${post.User.nickname} 님이 Retweet`}
            </div>
          </div>
        }
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnlike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      loading={removePostLoading}
                      onClick={onRemovePost}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={me ? <FollowButton post={post} /> : ''}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                <div style={{ marginLeft: '20px' }}>
                  {post.Retweet.User.nickname}
                </div>
              </div>
            }
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              description={<PostCardContent postData={post.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            // avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            // title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {isCommentOpen && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link
                      href={{ pathname: '/user', query: { id: item.User.id } }}
                      as={`/user/${item.User.id}`}
                    >
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </StyleCardWrpper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
