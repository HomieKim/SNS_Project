import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Slider from 'react-slick';


const ImgWrapper = styled.div`
  padding: 16px;
  text-align: center;
  
  & img {
    margin: 0 auto;
    max-height: 750px;
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
`
const SlideWrapper = styled.div`
  max-height : 800px;
  overflow : hidden;
`;
const PostImages = ({images})=>{
  //const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(()=> {
    //setShowImagesZoom(true);
  },[]);

  const settings = {
    dots: true,
    infinite : true,
    speed: 500,
    slideToShow : 1,
    slideToScroll : 1
  }

  if(images.length === 1) {
    return (
      <>
        <img style={{ maxHeight : 750}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
      </>
    )
  }

  return (
    <div>
      <Global />
      <SlideWrapper>
        <Slider {...settings}>
          {
            images.map((item) => (
              <ImgWrapper key={item.src} >
                <img   src={item.src} alt={item.src} />
              </ImgWrapper>
            ))
          }
        </Slider>
      </SlideWrapper>
    </div>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;