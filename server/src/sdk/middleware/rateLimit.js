/**
 * Rate Limiting Middleware
 * 
 * Prevents abuse by limiting request rate per IP or user.
 * 
 * @module sdk/middleware/rateLimit
 */

const { tooManyRequests } = require('../responses/error');

// In-memory store (use Redis in production)
const requestCounts = new Map();

/**
 * Rate limiter middleware
 * 
 * Usage:
 * ```javascript
 * router.post('/api/heavy', rateLimit({ windowMs: 60000, max: 10 }), ...);
 * ```
 * 
 * @param {Object} options - Rate limit options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.max - Maximum requests per window
 * @param {string} options.keyGenerator - Function to generate limit key (default: IP address)
 * @returns {Function} Middleware function
 */
function rateLimit(options = {}) {
    const {
        windowMs = 60000, // 1 minute
        max = 100, // 100 requests per minute
        keyGenerator = (req) => req.ip || req.connection.remoteAddress,
        message = 'Too many requests, please try again later'
    } = options;

    return (req, res, next) => {
        const key = keyGenerator(req);
        const now = Date.now();

        // Get or create request record
        let record = requestCounts.get(key);

        if (!record) {
            record = {
                count: 0,
                resetTime: now + windowMs
            };
            requestCounts.set(key, record);
        }

        // Reset if window expired
        if (now > record.resetTime) {
            record.count = 0;
            record.resetTime = now + windowMs;
        }

        // Increment count
        record.count++;

        // Set rate limit headers
        res.setHeader('X-RateLimit-Limit', max);
        res.setHeader('X-RateLimit-Remaining', Math.max(0, max - record.count));
        res.setHeader('X-RateLimit-Reset', new Date(record.resetTime).toISOString());

        // Check if limit exceeded
        if (record.count > max) {
            return tooManyRequests(res, message);
        }

        next();
    };
}

/**
 * Strict rate limit for sensitive endpoints
 * 10 requests per minute
 */
function strictRateLimit() {
    return rateLimit({
        windowMs: 60000,
        max: 10,
        message: 'Too many requests to this endpoint'
    });
}

/**
 * API rate limit
 * 100 requests per minute
 */
function apiRateLimit() {
    return rateLimit({
        windowMs: 60000,
        max: 100
    });
}

/**
 * Auth rate limit (for login/register)
 * 5 attempts per 15 minutes
 */
function authRateLimit() {
    return rateLimit({
        windowMs: 900000, // 15 minutes
        max: 5,
        message: 'Too many authentication attempts, please try again later'
    });
}

/**
 * Clean up old entries periodically
 */
setInterval(() => {
    const now = Date.now();
    for (const [key, record] of requestCounts.entries()) {
        if (now > record.resetTime) {
            requestCounts.delete(key);
        }
    }
}, 60000); // Clean every minute

module.exports = {
    rateLimit,
    strictRateLimit,
    apiRateLimit,
    authRateLimit
};
