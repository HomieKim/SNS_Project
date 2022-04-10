const express = require('express');
const { Post, Comment , Image, User} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn,async (req, res)=> {
  try{
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id, // req.user는 passport deserializeUser 할 때 생성 됨
    });
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

module.exports = router;