const express = require('express'); 
const db = require('./models');

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })  
  .catch(console.error);

app.get('/', (req,res) => {
  res.send('hello express');
});


app. post('/api/post', (req, res)=> {
  res.json({
    id: 1,
    content : 'post api test',
  });
});
app.listen(3065,() => {
  console.log('3065 포트 서버 실행 중...');
});