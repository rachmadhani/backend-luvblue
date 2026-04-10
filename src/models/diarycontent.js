'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DiaryContent.init({
    diary_image_url: DataTypes.STRING,
    diary_title: DataTypes.STRING,
    diary_brief_title: DataTypes.STRING,
    diary_brief_description: DataTypes.STRING,
    diary_instagram_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DiaryContent',
    tableName: 'diary_contents'
  });
  return DiaryContent;
};