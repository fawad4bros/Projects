'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {
      // define association here
      this.hasMany(Post,{foreignKey: 'userId', as : 'posts'})
    }
    //toJson will execute When we return api response as a json
    //This function decides which fields to return
    toJSON(){
      return {...this.get(), id: undefined}
    }
  };
  //First we pass the fields and second we pass the options
  User.init({
    // fields
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg:'User must have a Name'},
        notEmpty: {msg: 'Name must not be empty'},
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg:'User must have a email'},
        notEmpty: {msg: 'email must not be empty'},
        isEmail: {msg: 'Must be valid Email'},
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg:'User must have a Role'},
        notEmpty: {msg: 'Role must not be empty'},
      }
    }
  }, {
    // options
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};