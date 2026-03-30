const app = require('./app');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`👉 http://localhost:${PORT}/api/health`);
});
