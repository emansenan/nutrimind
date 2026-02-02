/**
 * Error Response Formatters & Custom Error Classes
 * 
 * Provides standardized error responses and custom error classes
 * for consistent error handling across all API endpoints.
 * 
 * @module sdk/responses/error
 */

/**
 * Base API Error Class
 */
class APIError extends Error {
    constructor(message, statusCode = 500, errors = null) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Bad Request Error (400)
 */
class BadRequestError extends APIError {
    constructor(message = 'Bad Request', errors = null) {
        super(message, 400, errors);
    }
}

/**
 * Unauthorized Error (401)
 */
class UnauthorizedError extends APIError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

/**
 * Forbidden Error (403)
 */
class ForbiddenError extends APIError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}

/**
 * Not Found Error (404)
 */
class NotFoundError extends APIError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

/**
 * Conflict Error (409)
 */
class ConflictError extends APIError {
    constructor(message = 'Resource already exists') {
        super(message, 409);
    }
}

/**
 * Validation Error (422)
 */
class ValidationError extends APIError {
    constructor(message = 'Validation failed', errors = null) {
        super(message, 422, errors);
    }
}

/**
 * Too Many Requests Error (429)
 */
class TooManyRequestsError extends APIError {
    constructor(message = 'Too many requests') {
        super(message, 429);
    }
}

/**
 * Internal Server Error (500)
 */
class InternalServerError extends APIError {
    constructor(message = 'Internal server error') {
        super(message, 500);
    }
}

/**
 * Generic error response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {*} errors - Validation errors or additional details
 */
function error(res, message = 'An error occurred', statusCode = 500, errors = null) {
    const response = {
        success: false,
        message,
        timestamp: new Date().toISOString()
    };

    if (errors) {
        response.errors = errors;
    }

    // Include stack trace in development
    if (process.env.NODE_ENV === 'development' && errors && errors.stack) {
        response.stack = errors.stack;
    }

    return res.status(statusCode).json(response);
}

/**
 * Bad Request response (400)
 */
function badRequest(res, message = 'Bad Request', errors = null) {
    return error(res, message, 400, errors);
}

/**
 * Unauthorized response (401)
 */
function unauthorized(res, message = 'Unauthorized') {
    return error(res, message, 401);
}

/**
 * Forbidden response (403)
 */
function forbidden(res, message = 'Forbidden') {
    return error(res, message, 403);
}

/**
 * Not Found response (404)
 */
function notFound(res, message = 'Resource not found') {
    return error(res, message, 404);
}

/**
 * Conflict response (409)
 */
function conflict(res, message = 'Resource already exists') {
    return error(res, message, 409);
}

/**
 * Validation Error response (422)
 */
function validationError(res, message = 'Validation failed', errors = null) {
    return error(res, message, 422, errors);
}

/**
 * Too Many Requests response (429)
 */
function tooManyRequests(res, message = 'Too many requests') {
    return error(res, message, 429);
}

/**
 * Internal Server Error response (500)
 */
function serverError(res, message = 'Internal server error', err = null) {
    return error(res, message, 500, err);
}

module.exports = {
    // Error Classes
    APIError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    ValidationError,
    TooManyRequestsError,
    InternalServerError,

    // Error Response Functions
    error,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    validationError,
    tooManyRequests,
    serverError
};
