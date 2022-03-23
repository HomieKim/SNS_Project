// passport 설정 파일
const passport = require('passport');
const { User } = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done)=> {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done)=>{
    try{
      await User.findOne({where : {id}});
      done(null, user)
    }catch(error){
      console.error(error);
      done(error);
    }
  });

  local();
};