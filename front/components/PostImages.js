/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Slider from 'react-slick';
import ImageZoom from './ImageZoom';

const ImgWrapper = styled.div`
  padding: 16px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 750px;
    max-width: 100%;
    cursor: pointer;
  }
`;
const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
    width : 100%;
  }
  .ant-card-cover {
    transform: none !important;
  }
  .slick-dots {
    position : static;
  }
  
  .slick-prev {
    z-index : 100;
    left :3px;
    :before {
      color : grey;
    }
  }
  
  .slick-next {
    right : 3px;
    :before {
      color : grey;
    }
  }
`;
const SlideWrapper = styled.div`
  max-height: 700px;
  overflow: hidden;
`;
const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const [clickedImg, setClickedImg] = useState('');
  const onZoom = useCallback((e) => {
    // console.log(e.target.currentSrc);
    setClickedImg(e.target.currentSrc);
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
  };

  if (images.length === 1) {
    return (
      <ImgWrapper>
        <img
          style={{ maxHeight: 750, cursor: 'pointer' }}
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImageZoom image={clickedImg} onClose={onClose} />}
      </ImgWrapper>
    );
  }

  return (
    <div>
      <Global />
      <SlideWrapper>
        <Slider {...settings}>
          {images.map((item) => (
            <ImgWrapper key={item.src}>
              <img
                src={`http://localhost:3065/${item.src}`}
                alt={item.src}
                onClick={onZoom}
              />
            </ImgWrapper>
          ))}
        </Slider>
      </SlideWrapper>
      {showImagesZoom && <ImageZoom image={clickedImg} onClose={onClose} />}
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default PostImages;
