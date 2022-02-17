import { Button, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import propTypes from 'prop-types';
import React, { useCallback } from 'react';

const UserProfile = ({setIsLogedin})=> {

    const onLogOut = useCallback(()=> {
        setIsLogedin(false);
    },[]);
    
    return (
        <Card
            actions={[
                <div key="twit">tiwt <br /> 0</div>,
                <div key="followings">팔로잉 <br /> 0</div>,
                <div key="followers">팔로워 <br /> 0</div>,
            ]}
        >
            <Card.Meta
                avatar={<Avatar>HM</Avatar>}
                title='homie'
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
};

UserProfile.propTypes = {
    setIsLogedin: propTypes.func.isRequired,
}

export default UserProfile;