const express = require('express');
const { Post, Comment , Image, User} = require('../models');
const { isLoggedIn } = require('./middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

try{
  fs.accessSync('uploads')
}catch (error){
  console.log('upload 폴더가 없으므로 생성 합니다.');
  fs.mkdirSync('uploads')
}
// form 마다 전송 되는 양식이 다름(이미지 올릴 수도 있고 안올릴 수 도 있고)
// 그래서 app에 multer use 하지 않고 개별 라우터 마다 세팅 해줌
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext);
      done(null, basename+ '_' +new Date().getTime() + ext);
    }
  }),
  limits: {fileSize: 20* 1024 * 1024},
});

router.post('/', isLoggedIn, upload.none(), async (req, res)=> {
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // req.user는 passport deserializeUser 할 때 생성 됨
    });
    if(req.body.image){
      if(Array.isArray(req.body.image)){  // 이미지 여러장일 때는 배열로 들어옴
        const images = await Promise.all(req.body.image.map((img) => Image.create({ src:img })));
        await post.addImages(images);
      }else{
        const image = await Image.create({src : req.body.image});
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id : post.id},
      include:[
        {
          model: Image,
        },
        {
          model: Comment,
          include: [{
            model: User, // 댓글 쓴 사람
            attributes: ['id', 'nickname'],
          }],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        }
      ]
    })
    res.status(201).json(fullPost);
  }catch(error){
    console.error(error);
  }
});

router.post('/:postId/comment', isLoggedIn,async (req, res, next) => {
  try{
    // post가 존재하는 지 검사
    const exPost= await Post.findOne({
      where: { id: req.params.postId }
    });
    if(!exPost){
      return res.status(403).send('존재하지 않는 게시글 입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    })
    const fullComment = await Comment.findOne({
      where: {id : comment.id},
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    })
    res.status(201).json(fullComment);
  }catch(error){
    console.error(error);
  }
});

router.patch('/:id/like', isLoggedIn ,async(res, req,next) =>{
  try{
    const post = await Post.findOne({where : {id: req.params.postId}});
    if(!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({PostId : post.id, UserId: req.user.id});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/:id/like', isLoggedIn, async(res, req, next) => {
  try{
    const post = await Post.findOne({ where : {id : req.params.postId}});
    if(!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({PostId : post.id, UserId: req.user.id});
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.delete('/:postId', isLoggedIn ,async(res, req, next) => {
  try{
    await Post.destroy({ // destroy 는 시퀄라이즈에서 제공하는 삭제하는 함수
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  }catch(err){
    console.error(err);
    next(err);
  }
});
// 이미지 처리 하는 라우터

router.post('/images', isLoggedIn, upload.array('image'), async(req, res, next)=> {
  try{
    console.log(req.files);
    res.json(req.files.map((v)=> v.filename)); // 이미지 업로드 후 filename만 리턴
  }catch(error){
    console.error(error);
    next(error);
  }
});
module.exports = router;