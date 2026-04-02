const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const routes = require('./routes');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use((req, res, next) => {
  const origin = req.headers.origin || 'no-origin';
  console.log(`[DEBUG] Incoming Request: ${req.method} ${req.url} from Origin: ${origin}`);
  next();
});

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(origin => origin.trim()).filter(Boolean);
const corsOptions = {
  origin: (origin, callback) => {
    // If no origin (like mobile apps or curl requests) allow it
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.warn(`[CORS REJECT] Origin: ${origin} is not in ALLOWED_ORIGINS:`, allowedOrigins, `| Request: ${req.method} ${req.url}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
app.use(express.static('public'));

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
