'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlueNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlueNote.init({
    note_image_url: DataTypes.STRING,
    note_title: DataTypes.STRING,
    note_brief_title: DataTypes.STRING,
    note_brief_description: DataTypes.STRING,
    note_instagram_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BlueNote',
    tableName: 'blue_notes'
  });
  return BlueNote;
};
