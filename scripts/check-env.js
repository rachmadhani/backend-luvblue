const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const envVars = [
  'NODE_ENV',
  'DB_HOST_PRODUCTION',
  'DB_USER_PRODUCTION',
  'DB_NAME_PRODUCTION',
  'DB_DIALECT_PRODUCTION'
];

console.log('--- Environment Variable Check ---');
console.log(`Current Working Directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);
console.log('----------------------------------');

envVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    if (varName.includes('PASSWORD')) {
      console.log(`${varName}: [SET] (length: ${value.length})`);
    } else {
      console.log(`${varName}: ${value}`);
    }
  } else {
    console.log(`${varName}: [NOT SET]`);
  }
});

// Also check for DB_PASSWORD_PRODUCTION specifically
if (process.env.DB_PASSWORD_PRODUCTION) {
    console.log('DB_PASSWORD_PRODUCTION: [SET]');
} else {
    console.log('DB_PASSWORD_PRODUCTION: [NOT SET]');
}

console.log('----------------------------------');
