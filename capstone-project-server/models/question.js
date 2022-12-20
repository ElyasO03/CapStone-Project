'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Question.hasMany(models.Answer, {as: 'answers', foreignKey: 'questionId'})
      models.Question.belongsTo(models.User, {foreignKey: 'UserID'})
    }
  }
  Question.init({
    Questions: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};