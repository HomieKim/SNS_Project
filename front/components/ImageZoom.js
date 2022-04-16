import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

const StyledBackground = styled.div`
  position: fixed;
  z-index: 300;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
`;

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.85);
  padding: 12px 0;
`;
const ImageWrapper = styled.div`
  width: 500px;
  height: 650px;

  @media screen and (max-width: 1280px) {
    width: 400px;
    height: 450px;
  }
`;

const StyleHeader = styled.div`
  padding: 8px 4px;
  background-color: white;
  text-align: center;
  & span {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Open Sans';
  }
`;
const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
  color: #e1341e;
`;
const ImageZoom = ({ image, onClose }) => {
  const closeHandler = useCallback((e) => {
    if (e.target.localName === 'img') {
      return;
    }
    onClose();
  }, []);
  return (
    <StyledBackground>
      <StyleHeader>
        <span>Image Zoom</span>
        <CloseBtn onClick={onClose} />
      </StyleHeader>
      <StyleWrapper onClick={closeHandler}>
        <ImageWrapper>
          <img
            style={{ width: '100%', height: '100%' }}
            src={image}
            alt="Zoomed_image"
          />
        </ImageWrapper>
      </StyleWrapper>
    </StyledBackground>
  );
};

ImageZoom.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageZoom;
