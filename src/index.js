const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app = require('./app');
const { testConnection } = require('./config/database');


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`👉 http://localhost:${PORT}/api/health`);
});
