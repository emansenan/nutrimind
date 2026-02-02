/**
 * Paginated Response Formatter
 * 
 * Provides standardized pagination response format with metadata.
 * 
 * @module sdk/responses/pagination
 */

/**
 * Paginated response formatter
 * @param {Object} res - Express response object
 * @param {Array} items - Array of data items
 * @param {number} page - Current page number (1-indexed)
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @param {Object} meta - Additional metadata
 */
function paginated(res, items, page, limit, total, meta = {}) {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return res.status(200).json({
        success: true,
        data: items,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: parseInt(total),
            totalPages,
            hasNext,
            hasPrev,
            ...meta
        },
        timestamp: new Date().toISOString()
    });
}

/**
 * Calculate pagination offset
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {number} Offset for database query
 */
function calculateOffset(page, limit) {
    return (parseInt(page) - 1) * parseInt(limit);
}

/**
 * Validate pagination parameters
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {number} maxLimit - Maximum allowed limit
 * @returns {Object} Validated page and limit
 */
function validatePagination(page = 1, limit = 10, maxLimit = 100) {
    const validatedPage = Math.max(1, parseInt(page) || 1);
    const validatedLimit = Math.min(maxLimit, Math.max(1, parseInt(limit) || 10));

    return {
        page: validatedPage,
        limit: validatedLimit
    };
}

module.exports = {
    paginated,
    calculateOffset,
    validatePagination
};
