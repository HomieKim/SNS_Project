module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // id는 mySQL에서 기본적으로 넣어 줌
    email: {
      type: DataTypes.STRING(30),
      allowNull : false, // 필수 요부
      unique : true, // 고유값 설정
    },
    nickname : {
      type: DataTypes.STRING(30),
      allowNull : false, // 필수 요부
    },
    password : {
      type: DataTypes.STRING(100),
      allowNull : false, // 필수 요부
    },
  },{
    // 한글 저장
    charset : 'utf8',
    collate : 'utf8_general_ci',
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 유저와 포스트는 1:다 관계(사람은 여러개의 포스트를 가질 수 있음)
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {through: 'Like', as: 'Liked'});
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });

  };
  return User;
}