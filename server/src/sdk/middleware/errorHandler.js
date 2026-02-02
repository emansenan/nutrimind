/**
 * Central Error Handler Middleware
 * 
 * Catches all errors and formats them consistently.
 * 
 * @module sdk/middleware/errorHandler
 */

const { APIError } = require('../responses/error');

/**
 * Central error handling middleware
 * Place this as the LAST middleware in your Express app
 */
function errorHandler(err, req, res, next) {
    // Log error for debugging
    console.error('[Error Handler]', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });

    // Handle known API errors
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }

    // Handle Prisma errors
    if (err.code && err.code.startsWith('P')) {
        return handlePrismaError(err, res);
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors: err.errors || err.message,
            timestamp: new Date().toISOString()
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            timestamp: new Date().toISOString()
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired',
            timestamp: new Date().toISOString()
        });
    }

    // Handle unknown errors (500)
    return res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

/**
 * Handle Prisma-specific errors
 */
function handlePrismaError(err, res) {
    const prismaErrors = {
        'P2002': { status: 409, message: 'A record with this value already exists' },
        'P2003': { status: 400, message: 'Foreign key constraint failed' },
        'P2025': { status: 404, message: 'Record not found' },
        'P2014': { status: 400, message: 'Invalid relation data' },
        'P2001': { status: 404, message: 'Record does not exist' }
    };

    const error = prismaErrors[err.code] || {
        status: 500,
        message: 'Database error'
    };

    return res.status(error.status).json({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && {
            code: err.code,
            details: err.message
        })
    });
}

/**
 * Not found handler (404)
 * Use this before errorHandler for undefined routes
 */
function notFoundHandler(req, res) {
    return res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString()
    });
}

module.exports = {
    errorHandler,
    notFoundHandler
};
