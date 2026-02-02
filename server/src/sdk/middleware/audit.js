/**
 * Audit Middleware
 * 
 * Automatically logs API requests and changes.
 * 
 * @module sdk/middleware/audit
 */

const { logAction } = require('../services/auditService');

/**
 * Audit all requests
 * 
 * Usage:
 * ```javascript
 * app.use(auditMiddleware);
 * ```
 */
function auditMiddleware(req, res, next) {
    // Skip for health checks and static assets
    if (req.path === '/health' || req.path.startsWith('/static')) {
        return next();
    }

    const startTime = Date.now();

    // Capture response
    const originalJson = res.json;
    res.json = function (data) {
        const duration = Date.now() - startTime;

        // Log async (non-blocking)
        logAction({
            userId: req.userId || null,
            organizationId: req.organizationId || null,
            action: `API_${req.method}`,
            resource: req.path,
            resourceId: req.params.id || null,
            details: {
                method: req.method,
                path: req.path,
                query: req.query,
                statusCode: res.statusCode,
                duration
            },
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent')
        }).catch(err => {
            console.error('[Audit Middleware] Failed to log:', err);
        });

        return originalJson.call(this, data);
    };

    next();
}

module.exports = auditMiddleware;
