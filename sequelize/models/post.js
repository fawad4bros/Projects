'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      // default behavior will look for model_name + primary_key = User + id
      // overriding the default behavior by adding {foreignKey: 'userId'}
      this.belongsTo(User,{foreignKey: 'userId', as : 'user'})
      // Making an alies as user
    }
    toJSON(){
      return {...this.get(), id: undefined, userId: undefined}
    }
  };
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};