/**
 * Prisma Helper Utilities
 * 
 * Helper functions for common Prisma operations with tenant scoping.
 * 
 * @module sdk/database/prismaHelpers
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Find many records with automatic tenant scoping
 * @param {string} model - Prisma model name
 * @param {string} organizationId - Organization ID
 * @param {Object} where - Additional where conditions
 * @param {Object} options - Prisma query options (include, select, orderBy, etc.)
 * @returns {Promise<Array>} Array of records
 */
async function findManyTenantScoped(model, organizationId, where = {}, options = {}) {
    return prisma[model].findMany({
        where: {
            organizationId,
            ...where
        },
        ...options
    });
}

/**
 * Find first record with automatic tenant scoping
 * @param {string} model - Prisma model name
 * @param {string} organizationId - Organization ID
 * @param {Object} where - Additional where conditions
 * @param {Object} options - Prisma query options
 * @returns {Promise<Object|null>} Record or null
 */
async function findFirstTenantScoped(model, organizationId, where = {}, options = {}) {
    return prisma[model].findFirst({
        where: {
            organizationId,
            ...where
        },
        ...options
    });
}

/**
 * Count records with automatic tenant scoping
 * @param {string} model - Prisma model name
 * @param {string} organizationId - Organization ID
 * @param {Object} where - Additional where conditions
 * @returns {Promise<number>} Count of records
 */
async function countTenantScoped(model, organizationId, where = {}) {
    return prisma[model].count({
        where: {
            organizationId,
            ...where
        }
    });
}

/**
 * Create record with automatic tenant scoping
 * @param {string} model - Prisma model name
 * @param {string} organizationId - Organization ID
 * @param {Object} data - Record data
 * @returns {Promise<Object>} Created record
 */
async function createTenantScoped(model, organizationId, data) {
    return prisma[model].create({
        data: {
            ...data,
            organizationId
        }
    });
}

/**
 * Update record with tenant verification
 * @param {string} model - Prisma model name
 * @param {string} recordId - Record ID
 * @param {string} organizationId - Organization ID
 * @param {Object} data - Update data
 * @returns {Promise<Object|null>} Updated record or null if not found
 */
async function updateTenantScoped(model, recordId, organizationId, data) {
    // First verify the record belongs to the organization
    const existing = await findFirstTenantScoped(model, organizationId, { id: recordId });

    if (!existing) {
        return null;
    }

    return prisma[model].update({
        where: { id: recordId },
        data
    });
}

/**
 * Delete record with tenant verification
 * @param {string} model - Prisma model name
 * @param {string} recordId - Record ID
 * @param {string} organizationId - Organization ID
 * @returns {Promise<Object|null>} Deleted record or null if not found
 */
async function deleteTenantScoped(model, recordId, organizationId) {
    // First verify the record belongs to the organization
    const existing = await findFirstTenantScoped(model, organizationId, { id: recordId });

    if (!existing) {
        return null;
    }

    return prisma[model].delete({
        where: { id: recordId }
    });
}

/**
 * Get paginated results with tenant scoping
 * @param {string} model - Prisma model name
 * @param {string} organizationId - Organization ID
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @param {Object} where - Additional where conditions
 * @param {Object} options - Prisma query options
 * @returns {Promise<Object>} { items, total, page, limit, totalPages }
 */
async function paginateTenantScoped(model, organizationId, page = 1, limit = 10, where = {}, options = {}) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [items, total] = await Promise.all([
        findManyTenantScoped(model, organizationId, where, {
            ...options,
            skip,
            take
        }),
        countTenantScoped(model, organizationId, where)
    ]);

    return {
        items,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
        hasNext: parseInt(page) < Math.ceil(total / parseInt(limit)),
        hasPrev: parseInt(page) > 1
    };
}

/**
 * Execute raw SQL query with automatic organization filter
 * @param {string} query - SQL query (must include $organizationId placeholder)
 * @param {string} organizationId - Organization ID
 * @param {Array} params - Additional query parameters
 * @returns {Promise<Array>} Query results
 */
async function executeRawTenantScoped(query, organizationId, params = []) {
    // Ensure query includes organization filter
    if (!query.toLowerCase().includes('organization') && !query.includes('$1')) {
        console.warn('[Prisma Helper] Query may not be tenant-scoped');
    }

    return prisma.$queryRawUnsafe(query, organizationId, ...params);
}

module.exports = {
    prisma,
    findManyTenantScoped,
    findFirstTenantScoped,
    countTenantScoped,
    createTenantScoped,
    updateTenantScoped,
    deleteTenantScoped,
    paginateTenantScoped,
    executeRawTenantScoped
};
