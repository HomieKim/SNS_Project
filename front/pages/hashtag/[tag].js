import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import {
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_POST_REQUEST,
} from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const HashTag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state) => state.post,
  );
  const [ref, inView] = useInView();
  useEffect(() => {
    if (
      inView &&
      hasMorePosts &&
      !loadPostLoading &&
      window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
    ) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: LOAD_POST_REQUEST,
        lastId,
        data: tag,
      });
    }
  }, [inView, hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
      <div ref={hasMorePosts && !loadPostLoading ? ref : undefined} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: params.tag,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    },
);

export default HashTag;
