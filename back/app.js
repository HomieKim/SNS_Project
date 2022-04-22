const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user')
const hashtageRouter = require('./routes/hashtag');
const passportConfig = require('./passport');
const db = require('./models');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const app = express();
dotenv.config();

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })  
  .catch(console.error);

passportConfig();

// 배포 모드 일때
if(process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  // 보안에 도움 되는 패키지
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(cors({
  origin: ['http://localhost:3060', 'nodebird.com'],
  credentials: true,
}));


app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // 프론트에서 보내준 데이터를 req.body 안에 넣어 주는 역할
app.use(express.urlencoded({ extended: true })); // form submit 으로 넘어온 데이터 받을 때 urlencoded 필요
// form에서 넘어온 이미지는 multer 사용
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
app.use('/posts',postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtageRouter);


  
app.listen(3065,() => {
  console.log('3065 포트 서버 실행 중...!!');
});