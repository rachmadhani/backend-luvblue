'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diary_contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diary_image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diary_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diary_brief_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diary_brief_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diary_instagram_link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DiaryContents');
  }
};