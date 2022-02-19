import { Button, Card, Popover } from "antd";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons/lib/icons";
import Avatar from 'antd/lib/avatar/avatar';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';

const StyleCardWrpper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me && state.user.me.id);
  const [liked, setLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const onToggleComment = useCallback(() => {
    setIsCommentOpen((prev) => !prev);
  }, []);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <StyleCardWrpper>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
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
        // extract
      >
        <Card.Meta 
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {isCommentOpen && <></>}
    </StyleCardWrpper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
