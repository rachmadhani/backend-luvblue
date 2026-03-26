exports.getHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend API is healthy and running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
};
