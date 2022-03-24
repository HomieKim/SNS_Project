import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

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
      <div ref={hasMorePosts && !loadPostLoading ? ref : undefined} />
    </AppLayout>
  );
};

export default Home;
