const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  isProduction ? process.env.DB_NAME_PRODUCTION : (process.env.DB_NAME || 'luvblue_db'),
  isProduction ? process.env.DB_USER_PRODUCTION : (process.env.DB_USER || 'root'),
  isProduction ? process.env.DB_PASSWORD_PRODUCTION : (process.env.DB_PASSWORD || ''),
  {
    host: isProduction ? process.env.DB_HOST_PRODUCTION : (process.env.DB_HOST || 'localhost'),
    dialect: isProduction ? (process.env.DB_DIALECT_PRODUCTION || 'mysql') : (process.env.DB_DIALECT || 'mysql'),
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testConnection };
