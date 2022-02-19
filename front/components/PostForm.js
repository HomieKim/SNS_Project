import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state) => state.post);
  const [text, setText] = useState("");
  const imageInput = useRef();
  
  const onClickImageUpload = useCallback(()=> {
    imageInput.current.click();
  },[imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText('');
  }, []);
  
  const onChageText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <Form
      style={{ margin: "10px 0 20x" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChageText}
        maxLength={140}
        placeholder="What's New?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{float : 'right'}} htmlType='submit'>tiwt!</Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img
                src={"http://localhost:3065/" + v}
                style={{ width: "200px" }}
                alt={v}
              />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
