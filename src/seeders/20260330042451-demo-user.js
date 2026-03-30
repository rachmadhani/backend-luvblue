'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('testpasswordadmin', 10);
    await queryInterface.bulkInsert('Users', [{
      username: 'Ashley',
      email: 'ashley32@gmail.com',
      password: hashedPassword,
      role: 'admin',
      auth_provider: 'email',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
