import { Button, Form, Input } from 'antd';
import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
//import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const Style_Button = styled(Button)`
  position: absolute;
  right:0;
  bottom: -40px;
  z-index : 1;
`;



const CommentForm = ({post})=>{
 //const id = useSelector((state)=> state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    console.log(post.id,commentText);
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Style_Button type="primary"  htmlType="submit">댓글쓰기</Style_Button>
      </Form.Item>
    </Form>
  );
}

CommentForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default CommentForm;