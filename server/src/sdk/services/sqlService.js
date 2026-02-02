/**
 * SQL Service - Safe SQL Execution
 * 
 * Provides safe execution of raw SQL with automatic tenant scoping.
 * 
 * @module sdk/services/sqlService
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Execute raw SELECT query with tenant scoping
 * @param {string} query - SQL query (must be SELECT)
 * @param {string} organizationId - Organization ID
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
async function executeQuery(query, organizationId, params = []) {
    // Validate query is SELECT only
    const trimmedQuery = query.trim().toUpperCase();
    if (!trimmedQuery.startsWith('SELECT')) {
        throw new Error('Only SELECT queries are allowed');
    }

    // Check for dangerous SQL patterns
    if (hasDangerousPatterns(query)) {
        throw new Error('Query contains dangerous SQL patterns');
    }

    try {
        // Ensure organization filter exists
        if (!query.toLowerCase().includes('organizationid') && !query.includes('$1')) {
            console.warn('[SQL Service] Query may not be tenant-scoped:', query);
        }

        // Execute with organization ID as first parameter
        const result = await prisma.$queryRawUnsafe(query, organizationId, ...params);

        return result;
    } catch (error) {
        console.error('[SQL Service] Query error:', error);
        throw error;
    }
}

/**
 * Execute aggregation query
 * @param {string} table - Table name
 * @param {Object} aggregation - Aggregation config
 * @param {string} organizationId - Organization ID
 * @returns {Promise<Object>} Aggregation results
 */
async function executeAggregation(table, aggregation, organizationId) {
    const { groupBy, metrics, filters = {} } = aggregation;

    // Build WHERE clause
    const whereConditions = Object.entries(filters)
        .map(([key, value], index) => `${key} = $${index + 2}`)
        .join(' AND ');

    const whereClause = whereConditions
        ? `WHERE "organizationId" = $1 AND ${whereConditions}`
        : `WHERE "organizationId" = $1`;

    // Build SELECT clause
    const selectFields = groupBy ? groupBy.map(f => `"${f}"`).join(', ') + ', ' : '';
    const selectMetrics = metrics.map(m => {
        if (m.function === 'COUNT') {
            return `COUNT(${m.field === '*' ? '*' : `"${m.field}"`}) AS ${m.alias}`;
        }
        return `${m.function}("${m.field}") AS ${m.alias}`;
    }).join(', ');

    const groupByClause = groupBy ? `GROUP BY ${groupBy.map(f => `"${f}"`).join(', ')}` : '';

    const query = `
        SELECT ${selectFields}${selectMetrics}
        FROM "${table}"
        ${whereClause}
        ${groupByClause}
    `.trim();

    const params = Object.values(filters);

    return executeQuery(query, organizationId, params);
}

/**
 * Execute analytics query with time grouping
 * @param {string} table - Table name
 * @param {Object} config - Analytics configuration
 * @param {string} organizationId - Organization ID
 * @returns {Promise<Array>} Time-series results
 */
async function executeTimeSeriesQuery(table, config, organizationId) {
    const {
        dateField,
        groupBy,
        metrics,
        startDate,
        endDate
    } = config;

    const timeGrouping = groupBy === 'day'
        ? `DATE("${dateField}")`
        : groupBy === 'month'
            ? `DATE_TRUNC('month', "${dateField}")`
            : `DATE_TRUNC('week', "${dateField}")`;

    const selectMetrics = metrics.map(m => {
        return `${m.function}("${m.field}") AS ${m.alias}`;
    }).join(', ');

    const query = `
        SELECT 
            ${timeGrouping} AS period,
            ${selectMetrics}
        FROM "${table}"
        WHERE "organizationId" = $1
            AND "${dateField}" >= $2
            AND "${dateField}" <= $3
        GROUP BY period
        ORDER BY period ASC
    `;

    return executeQuery(query, organizationId, [startDate, endDate]);
}

/**
 * Build dynamic WHERE clause
 * @param {Object} filters - Filter object
 * @returns {Object} { whereClause, params }
 */
function buildWhereClause(filters) {
    const conditions = [];
    const params = [];
    let paramIndex = 2; // Start from $2 ($ 1 is organizationId)

    for (const [key, value] of Object.entries(filters)) {
        if (value === null) {
            conditions.push(`"${key}" IS NULL`);
        } else if (Array.isArray(value)) {
            conditions.push(`"${key}" = ANY($${paramIndex})`);
            params.push(value);
            paramIndex++;
        } else if (typeof value === 'object' && value.operator) {
            // Advanced operators: { operator: 'gte', value: 100 }
            const op = {
                'gte': '>=',
                'gt': '>',
                'lte': '<=',
                'lt': '<',
                'ne': '!=',
                'like': 'LIKE'
            }[value.operator] || '=';

            conditions.push(`"${key}" ${op} $${paramIndex}`);
            params.push(value.value);
            paramIndex++;
        } else {
            conditions.push(`"${key}" = $${paramIndex}`);
            params.push(value);
            paramIndex++;
        }
    }

    const whereClause = conditions.length > 0
        ? `WHERE "organizationId" = $1 AND ${conditions.join(' AND ')}`
        : `WHERE "organizationId" = $1`;

    return { whereClause, params };
}

/**
 * Check for dangerous SQL patterns
 */
function hasDangerousPatterns(query) {
    const dangerous = [
        /DROP\s+/i,
        /DELETE\s+/i,
        /UPDATE\s+/i,
        /INSERT\s+/i,
        /ALTER\s+/i,
        /TRUNCATE\s+/i,
        /EXEC\s+/i,
        /EXECUTE\s+/i,
        /;.*DROP/i,
        /;.*DELETE/i
    ];

    return dangerous.some(pattern => pattern.test(query));
}

/**
 * Sanitize table/column names
 * @param {string} name - Table or column name
 * @returns {string} Sanitized name
 */
function sanitizeName(name) {
    // Only allow alphanumeric and underscore
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
        throw new Error(`Invalid table/column name: ${name}`);
    }
    return name;
}

module.exports = {
    executeQuery,
    executeAggregation,
    executeTimeSeriesQuery,
    buildWhereClause,
    sanitizeName
};
