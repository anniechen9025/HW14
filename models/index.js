const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'gallery_id',
});

Post.belongsTo(User, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Post };
