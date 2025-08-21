const jwt = require('jsonwebtoken');

module.exports = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};
