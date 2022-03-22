const express = require('express');
const bcrypt = require('bcrypt');
const {User} = require('../models'); // db.User
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

module.exports = router;

/*
http 상태 코드
200 성공
300 리다이렉트
400 클라이언트 에러
500 서버에러
*/