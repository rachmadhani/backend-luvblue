'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blue_notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      note_image_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note_brief_title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note_brief_description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note_instagram_link: {
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
    await queryInterface.dropTable('blue_notes');
  }
};
