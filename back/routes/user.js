const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {User, Post} = require('../models'); // db.User, db.Post
const router = express.Router();


router.post('/', async (req, res, next)=> { // POST /user/
  try{
    // email 중복 체크
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if(exUser) {
      return res.status(403).send('이미 사용중인 아이디 입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 비밀번호 암호화
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).json(); // res 순서 맞춰주기 위해 비동기로 함수 작성
  }catch(error){
    console.error(error);
    next(error);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info)=> {
    if(err){  // 서버 에러
      console.error(err);
      return next(err);
    }
    if(info){ // 클라이언트 에러
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) =>{ // 여기가 로그인 하는 메서드 login메서드는 passport 로그인을 말함
      if(loginErr){
        // 이 에러는 passport에서 발생하는 로그인 에러
        return next(loginErr)
      }
      // 로그인 에러 발생 안되면 사용자 정보인 user 객체를 프론트로 넘겨 줌
      const UserWithoutPassword = await User.findOne({
        where: {id: user.id},
        attributes: {
          exclude: ['password']
        },
        include:[{
          model: Post,
        },{
          model: User,
          as: 'Followings',
        },{
          model: User,
          as: 'Followers',
        }]
      })
      return res.status(200).json(UserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', (req,res,next)=> {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

module.exports = router;

/*
http 상태 코드
200 성공
300 리다이렉트
400 클라이언트 에러
500 서버에러
*/