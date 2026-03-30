const authService = require('../services/authService');

/**
 * Handle user login
 */
const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

module.exports = {
  login
};
