require('dotenv').config();

const cleanEnv = (key, defaultValue = null) => {
  const value = process.env[key];
  if (!value) return defaultValue;
  // Remove trailing comments and whitespace
  return value.split('#')[0].trim();
};

module.exports = {
  development: {
    username: cleanEnv('DB_USER', 'root'),
    password: cleanEnv('DB_PASSWORD', null),
    database: cleanEnv('DB_NAME', 'luvblue_db'),
    host: cleanEnv('DB_HOST', '127.0.0.1'),
    dialect: cleanEnv('DB_DIALECT', 'mysql'),
    logging: false,
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME_TEST || 'luvblue_test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  },
  production: {
    username: cleanEnv('DB_USER_PRODUCTION'),
    password: cleanEnv('DB_PASSWORD_PRODUCTION'),
    database: cleanEnv('DB_NAME_PRODUCTION'),
    host: cleanEnv('DB_HOST_PRODUCTION'),
    port: Number(cleanEnv('DB_PORT_PRODUCTION', '3306')),
    dialect: cleanEnv('DB_DIALECT_PRODUCTION', 'mysql'),
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 60000,
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
};
