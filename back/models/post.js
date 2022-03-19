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
    db.Post.belongsTo(db.User); // 포스트와 유저는 다:1 관계, 게시글은 특정 유저한테 속해있다.
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.belongsTo(db.Post, {as: 'Retweet'});
  };
  return  Post;
}