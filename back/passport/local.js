const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports = () =>{
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },async (email, password, done)=>{
    try{
      const user = await User.findOne({
        where: {email}
      });
      if(!user){
        return done(null, false, {reason: '존재하지 않는 이메일 입니다.'})
      }
      const result = await bcrypt.compare(password, user.password);
      if(result){
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.'})
    }catch(error){
      console.error(error);
      return done(error);
    }
  }));
}


/*
done 함수
첫 번재 인자 : 서버 에러
두번째 인자 : 로그인 성공 여부
세번째 인자 : 실패 시 리턴할 객체

이때 이 done 함수가 콜백 처럼 동작하여 
전략 실행 시 authenticate 함수의 인자로 전달 됨

ex)
router.post('/login', passport.authenticate('local', (err, user, info)=> {

}));
*/