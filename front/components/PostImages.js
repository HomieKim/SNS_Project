import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImageContainer = styled.div`

`

const PostImages = ({images})=>{
  //const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(()=> {
    //setShowImagesZoom(true);
  },[]);

  if(images.length === 1) {
    return (
      <>
        <img style={{ maxHeight : 750}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
      </>
    )
  }
  return (
    <div>이미지 구현 중</div>
  )
}

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;