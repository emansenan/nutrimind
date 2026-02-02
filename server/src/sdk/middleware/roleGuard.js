/**
 * Role-Based Access Control Middleware
 * 
 * Enforces role-based permissions for organization members.
 * 
 * @module sdk/middleware/roleGuard
 */

const { forbidden } = require('../responses/error');

/**
 * Require specific organization role
 * 
 * Usage:
 * ```javascript
 * router.post('/settings', tenantContext, requireRole(['OWNER', 'ADMIN']), ...);
 * ```
 * 
 * @param {Array<string>} allowedRoles - Array of allowed roles
 * @returns {Function} Middleware function
 */
function requireRole(allowedRoles) {
    return (req, res, next) => {
        const { orgRole } = req;

        if (!orgRole) {
            return forbidden(res, 'Organization role not found');
        }

        if (!allowedRoles.includes(orgRole)) {
            return forbidden(
                res,
                `Access denied. Required role: ${allowedRoles.join(' or ')}`
            );
        }

        next();
    };
}

/**
 * Require organization owner role
 */
function requireOwner(req, res, next) {
    return requireRole(['OWNER'])(req, res, next);
}

/**
 * Require admin or owner role
 */
function requireAdmin(req, res, next) {
    return requireRole(['OWNER', 'ADMIN'])(req, res, next);
}

/**
 * Check if user has specific permission
 * More granular than role-based access
 * 
 * @param {string} permission - Permission to check
 * @returns {Function} Middleware function
 */
function requirePermission(permission) {
    return (req, res, next) => {
        const { user } = req;

        if (!user || !user.permissions) {
            return forbidden(res, 'Insufficient permissions');
        }

        if (!user.permissions.includes(permission)) {
            return forbidden(res, `Permission denied: ${permission}`);
        }

        next();
    };
}

module.exports = {
    requireRole,
    requireOwner,
    requireAdmin,
    requirePermission
};
