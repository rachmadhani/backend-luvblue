const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware to verify JWT token and attach user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn(`[AUTH] No token provided for ${req.method} ${req.originalUrl}`);
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.warn(`[AUTH] User not found for ID: ${decoded.id}`);
      return res.status(401).json({
        success: false,
        message: 'Token is invalid or user no longer exists'
      });
    }

    // Attach user to request object
    req.user = user;
    console.log(`[AUTH] User authenticated: ${user.email} (${user.role}) for ${req.method} ${req.originalUrl}`);
    next();
  } catch (error) {
    console.error(`[AUTH ERROR] JWT verification failed:`, error.message);
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired'
    });
  }
};

/**
 * Middleware to check for specific roles
 * @param {Array} roles - Allowed roles
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.warn(`[AUTH] User ${req.user.email} (role: ${req.user.role}) denied access to ${req.method} ${req.originalUrl}. Required roles: ${roles.join(', ')}`);
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not have the required role'
      });
    }
    console.log(`[AUTH] User ${req.user.email} authorized for ${req.method} ${req.originalUrl}`);
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};
