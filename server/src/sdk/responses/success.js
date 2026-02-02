/**
 * Success Response Formatters
 * 
 * Provides standardized success response formats for all API endpoints.
 * 
 * @module sdk/responses/success
 */

/**
 * Standard success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 */
function success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
}

/**
 * Resource created response (201)
 * @param {Object} res - Express response object
 * @param {*} data - Created resource data
 * @param {string} message - Success message
 */
function created(res, data, message = 'Resource created successfully') {
    return success(res, data, message, 201);
}

/**
 * Resource updated response (200)
 * @param {Object} res - Express response object
 * @param {*} data - Updated resource data
 * @param {string} message - Success message
 */
function updated(res, data, message = 'Resource updated successfully') {
    return success(res, data, message, 200);
}

/**
 * Resource deleted response (200)
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 */
function deleted(res, message = 'Resource deleted successfully') {
    return success(res, null, message, 200);
}

/**
 * No content response (204)
 * @param {Object} res - Express response object
 */
function noContent(res) {
    return res.status(204).send();
}

module.exports = {
    success,
    created,
    updated,
    deleted,
    noContent
};
