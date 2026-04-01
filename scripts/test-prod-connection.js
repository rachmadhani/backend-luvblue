const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Load .env
dotenv.config();

const config = {
  username: process.env.DB_USER_PRODUCTION,
  password: process.env.DB_PASSWORD_PRODUCTION,
  database: process.env.DB_NAME_PRODUCTION,
  host: process.env.DB_HOST_PRODUCTION,
  dialect: process.env.DB_DIALECT_PRODUCTION || 'mysql',
};

console.log('--- Production Database Configuration ---');
console.log(`Host: ${config.host}`);
console.log(`Database: ${config.database}`);
console.log(`User: ${config.username}`);
console.log('-----------------------------------------');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: console.log,
});

async function testConnection() {
  try {
    console.log('Attempting to connect to production database...');
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
    
    // Check if we can see tables
    const [results] = await sequelize.query('SHOW TABLES');
    console.log('Current Tables:', results);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    if (error.original && error.original.code === 'ECONNREFUSED') {
      console.error('Hint: Make sure the database server is running and accessible.');
    }
    process.exit(1);
  }
}

testConnection();
