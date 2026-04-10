const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const config = require('./config');

// Load .env using absolute path to ensure it's found even if started from a different directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const env = (process.env.NODE_ENV || 'development').split('#')[0].trim();
const dbConfig = config[env];

console.log(`[DATABASE] Configuring connection for [${env}] environment...`);
console.log(`[DATABASE] Host: ${dbConfig.host}:${dbConfig.port || 3306}`);
console.log(`[DATABASE] Database: ${dbConfig.database}`);
console.log(`[DATABASE] User: ${dbConfig.username}`);

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    ...dbConfig,
    logging: dbConfig.logging === true ? console.log : false,
  }
);

const testConnection = async () => {
  try {
    console.log(`[DATABASE] Attempting to connect to the database...`);
    await sequelize.authenticate();
    console.log(`[DATABASE] SUCCESS: Connection has been established successfully in [${env}] mode.`);
  } catch (error) {
    console.error(`[DATABASE] ERROR: Unable to connect to the database [${env}]:`, error.message);
    if (error.original) {
      console.error(`[DATABASE] DEBUG INFO:`, error.original.code, error.original.syscall);
    }
  }
};

module.exports = { sequelize, testConnection };

