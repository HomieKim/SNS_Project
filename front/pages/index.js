import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading, retweeError } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    if (retweeError) {
      alert(retweeError);
    }
  }, [retweeError]);

  // useEffect(() => {
  //   if (!me) {
  //     dispatch({
  //       type: LOAD_MY_INFO_REQUEST,
  //     });
  //   }
  //   if (hasMorePosts) {
  //     dispatch({
  //       type: LOAD_POST_REQUEST,
  //     });
  //   }
  // }, []);

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
      });
    }
  }, [inView, hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {mainPosts.length !== 0 ? (
        <div ref={hasMorePosts && !loadPostLoading ? ref : undefined} />
      ) : (
        ''
      )}
    </AppLayout>
  );
};

// eslint-disable-next-line prettier/prettier
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
      // Home 보다 먼저 실행 됨
      console.log('store! : ', store);
      console.log('req! : ', req);
      console.log('getServerSideProps start');
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
      });
      store.dispatch(END);
      console.log('getServerSideProps end');
      await store.sagaTask.toPromise();
    },
);

export default Home;
