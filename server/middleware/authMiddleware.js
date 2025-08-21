const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from Authorization header.
 *
 * @function
 * @name authMiddleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 *
 * @description
 * Checks for a Bearer token in the Authorization header.
 * If valid, attaches decoded user info to `req.user`.
 * If missing or invalid, responds with 401 or 403.
 *
 * @example
 * // Usage in route
 * router.get('/protected', authMiddleware, (req, res) => {
 *   res.json({ user: req.user });
 * });
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-here');
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
