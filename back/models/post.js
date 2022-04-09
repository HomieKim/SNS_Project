module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define( 'Post', {
    content: {
      type : DataTypes.TEXT,
      allowNull: false,
    },
  },{
    // 한글 저장
    charset : 'utf8mb4',
    collate : 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    /* 관계 형성시 관계 메소드 사용가능 */
    db.Post.belongsTo(db.User); // 포스트와 유저는 다:1 관계, 게시글은 특정 유저한테 속해있다. post.addUser (belongsTo 는 단수)
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'}); // post.addHashTags
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, {as: 'Retweet'}); // post.addRetweet
  };
  return  Post;
}