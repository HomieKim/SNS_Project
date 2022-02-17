import Head from 'next/head';
import React from "react";
import AppLayout from "../components/AppLayout";
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const profile = () => {
    const followerList = [{nickname : 'user1'}, {nickname : 'user2'}, {nickname : 'user3'}];
    const followingList = [{nickname : 'user1'}, {nickname : 'user2'}, {nickname : 'user3'}];
  return (
    <>
      <Head>
          <title>내 프로필</title>
      </Head>
      <AppLayout>
        <NicknameEditForm/>
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList}/>
      </AppLayout>
    </>
  );
};

export default profile;
