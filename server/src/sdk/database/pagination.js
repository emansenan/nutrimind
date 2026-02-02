/**
 * Database Pagination Helpers
 * 
 * Utilities for building paginated queries.
 * 
 * @module sdk/database/pagination
 */

/**
 * Build pagination params
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Object} { skip, take }
 */
function buildPaginationParams(page = 1, limit = 10) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    return { skip, take };
}

/**
 * Build pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} Pagination metadata
 */
function buildPaginationMeta(page, limit, total) {
    const totalPages = Math.ceil(total / limit);

    return {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
    };
}

module.exports = {
    buildPaginationParams,
    buildPaginationMeta
};
