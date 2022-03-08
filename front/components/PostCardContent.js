import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';

const PostCardContent = ({postData}) =>{
  return (
    <div>
      {
        postData.split(/(#[^\s#]+)/g).map((v, idx) => {
          if(v.match(/(#[^\s#]+)/)) {
            return <Link href={'/profile'} key={idx}><a>{v}</a></Link> // 해시태그 누르면 해당 해시태그 게시물 검색하게 href아직 벡엔드에서 구현안함 구현하면 /hashtage/${v.slice(1)} 이런식으로 고쳐야 함
          }
          return v;
        })
      }
    </div>
  )
}

PostCardContent.propTypes = {
  postData : PropTypes.string.isRequired
}
export default PostCardContent;