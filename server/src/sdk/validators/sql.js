/**
 * SQL Validators
 * 
 * Validation for SQL queries and database operations.
 * 
 * @module sdk/validators/sql
 */

/**
 * Validate SQL query is safe
 * @param {string} query - SQL query
 * @returns {Object} { valid, error, warnings }
 */
function validateSQLQuery(query) {
    const errors = [];
    const warnings = [];

    // Must be SELECT only
    const trimmed = query.trim().toUpperCase();
    if (!trimmed.startsWith('SELECT')) {
        errors.push('Only SELECT queries are allowed');
    }

    // Check for dangerous patterns
    const dangerous = [
        { pattern: /DROP\s+/i, message: 'DROP statement not allowed' },
        { pattern: /DELETE\s+/i, message: 'DELETE statement not allowed' },
        { pattern: /UPDATE\s+/i, message: 'UPDATE statement not allowed' },
        { pattern: /INSERT\s+/i, message: 'INSERT statement not allowed' },
        { pattern: /ALTER\s+/i, message: 'ALTER statement not allowed' },
        { pattern: /TRUNCATE\s+/i, message: 'TRUNCATE statement not allowed' },
        { pattern: /;.*SELECT/i, message: 'Multiple statements not allowed' }
    ];

    dangerous.forEach(({ pattern, message }) => {
        if (pattern.test(query)) {
            errors.push(message);
        }
    });

    // Warn if no tenant scoping
    if (!query.toLowerCase().includes('organizationid')) {
        warnings.push('Query may not be tenant-scoped (missing organizationId filter)');
    }

    return {
        valid: errors.length === 0,
        error: errors.length > 0 ? errors.join('; ') : null,
        warnings: warnings.length > 0 ? warnings : null
    };
}

/**
 * Validate table/column name
 * @param {string} name - Name to validate
 * @returns {Object} { valid, error }
 */
function validateIdentifier(name) {
    // Only allow alphanumeric, underscore, max 63 chars
    if (!/^[a-zA-Z_][a-zA-Z0-9_]{0,62}$/.test(name)) {
        return {
            valid: false,
            error: 'Invalid identifier: must start with letter/underscore, contain only alphanumeric/underscore, max 63 chars'
        };
    }

    return { valid: true };
}

module.exports = {
    validateSQLQuery,
    validateIdentifier
};
