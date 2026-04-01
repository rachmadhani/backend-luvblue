const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const config = require('./config');

// Load .env using absolute path to ensure it's found even if started from a different directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect || 'mysql',
    logging: dbConfig.logging,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL connection has been established successfully in [${env}] mode.`);
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

module.exports = { sequelize, testConnection };

