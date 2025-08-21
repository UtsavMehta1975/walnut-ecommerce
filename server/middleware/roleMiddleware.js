/**
 * Middleware factory to enforce role-based access control.
 *
 * @function
 * @name roleMiddleware
 * @param {string} requiredRole - Role required to access the route (e.g., 'admin')
 * @returns {Function} Express middleware function
 *
 * @description
 * Checks if `req.user.role` matches the required role.
 * Assumes `req.user` is already populated by a JWT-auth middleware.
 * Responds with 403 if role is missing or insufficient.
 *
 * @example
 * // Protect route for admin only
 * router.put('/admin-action', authMiddleware, roleMiddleware('admin'), handler);
 */
module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};
