const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv')
const postRouter = require('./routes/post');
const userRouter = require('./routes/user')
const passportConfig = require('./passport');
const db = require('./models');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })  
  .catch(console.error);

passportConfig();

app.use(cors({
  origin: 'http://localhost:3060',
  credentials: true,
}));


// 프론트에서 보내준 데이터를 req.body 안에 넣어 주는 역할
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // form submit 할때 urlencoded 필요
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키 설정
// 세션 설정
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

// cors 설정

app.get('/', (req,res) => {
  res.send('hello express');
});


app.use('/post', postRouter);
app.use('/user', userRouter);



app.listen(3065,() => {
  console.log('3065 포트 서버 실행 중...!!');
});