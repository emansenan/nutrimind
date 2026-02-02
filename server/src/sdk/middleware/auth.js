/**
 * Authentication Middleware
 * 
 * JWT verification and user authentication.
 * 
 * @module sdk/middleware/auth
 */

const jwt = require('jsonwebtoken');
const { unauthorized } = require('../responses/error');

/**
 * Verify JWT token and attach user to request
 * 
 * Usage:
 * ```javascript
 * router.get('/protected', authenticateJWT, (req, res) => {
 *   // req.user is available
 * });
 * ```
 */
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return unauthorized(res, 'No token provided');
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        req.user = decoded;
        req.userId = decoded.id;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return unauthorized(res, 'Token expired');
        }
        if (error.name === 'JsonWebTokenError') {
            return unauthorized(res, 'Invalid token');
        }
        return unauthorized(res, 'Authentication failed');
    }
}

/**
 * Optional authentication - doesn't fail if no token
 * Useful for endpoints that work both authenticated and non-authenticated
 */
function optionalAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // No token - continue without user
            req.user = null;
            req.userId = null;
            return next();
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        req.userId = decoded.id;

        next();
    } catch (error) {
        // Invalid token - continue without user
        req.user = null;
        req.userId = null;
        next();
    }
}

module.exports = {
    authenticateJWT,
    optionalAuth
};
