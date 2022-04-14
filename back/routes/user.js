const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {User, Post} = require('../models'); // db.User, db.Post
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();

router.get('/', async (req, res, next)=>{
  console.log(req.headers);
  try{ 
    if(req.user){
      const UserWithoutPassword = await User.findOne({
        where: {id: req.user.id},
        attributes: {
          exclude: ['password']
        },
        include:[{
          model: Post,
          attributes: ['id'],
        },{
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },{
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(UserWithoutPassword);
    }else{
      res.status(200).json(null);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/',isNotLoggedIn, async (req, res, next)=> { // POST /user/
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

router.get('/:userId', async (req,res,next)=>{
  try{ 
    const fullUserWithoutPassword = await User.findOne({
      where: {id: req.params.userId},
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    if(fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; 
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  }catch(error){
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
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
          attributes: ['id'],
        },{
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },{
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(UserWithoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req,res,next)=> {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

// 닉네임 수정
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try{
    await User.update({
      nickname: req.body.nickname,
    },{
      where: {id : req.user.id},
    });
    res.status(200).json({nickname: req.body.nickname});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.patch('/:userId/follow', isLoggedIn, async(req, res, next) => {
  try{
    const user = await User.findOne({where: {id: req.params.userId}});
    if(!user){
      res.status(403).send('존재하지 않는 유저 입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({UserId : parseInt(req.params.userId, 10)});
  }catch(err){
    console.error(err);
    next(err);
  }
});
router.delete('/:userId/follow', isLoggedIn, async(req, res, next) => {
  try{
    const user = await User.findOne({where: {id: req.params.userId}});
    if(!user){
      res.status(403).send('존재하지 않는 유저 입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({UserId : parseInt(req.params.userId, 10)});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/followers',isLoggedIn, async(req,res,next)=>{
  try{  
    const user = await User.findOne({where: {id: req.user.id}});
    if(!user){
      res.status(403).send('존재하지 않는 유저 입니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.get('/followings',isLoggedIn, async(req,res,next)=>{
  try{  
    const user = await User.findOne({where: {id: req.user.id}});
    if(!user){
      res.status(403).send('존재하지 않는 유저 입니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  }catch(err){
    console.error(err);
    next(err);
  }
});
router.delete('/follower/:userId', isLoggedIn, async(req, res, next)=> {
  try{
    const user = await User.findOne({ where: { id: req.params.userId }});
    if (!user) {
      res.status(403).send('없는 사람을 차단하려고 하시네요?');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  }catch(error){
    console.error(error);
    next(error);
  }
});
module.exports = router;

/*
http 상태 코드
200 성공
300 리다이렉트
400 클라이언트 에러
500 서버에러
*/