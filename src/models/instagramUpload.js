'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class InstagramUpload extends Model {
        static associate(models) {
            // define association here
        }
    }
    InstagramUpload.init({
        image_url: DataTypes.STRING,
        instagram_users: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'InstagramUpload',
        tableName: 'instagram_uploads',
    });
    return InstagramUpload;
}