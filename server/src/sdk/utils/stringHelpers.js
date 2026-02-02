/**
 * String Helper Utilities
 * 
 * Common string manipulation functions.
 * 
 * @module sdk/utils/stringHelpers
 */

/**
 * Convert string to URL-safe slug
 * @param {string} str - String to slugify
 * @returns {string} Slugified string
 */
function slugify(str) {
    if (!str || typeof str !== 'string') return '';

    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')  // Remove special chars
        .replace(/[\s_-]+/g, '-')   // Replace spaces/underscores with hyphens
        .replace(/^-+|-+$/g, '');   // Trim hyphens from start/end
}

/**
 * Capitalize first letter of each word
 * @param {string} str - String to title case
 * @returns {string} Title cased string
 */
function titleCase(str) {
    if (!str || typeof str !== 'string') return '';

    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
function truncate(str, maxLength, suffix = '...') {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= maxLength) return str;

    return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate random string
 * @param {number} length - Length of string
 * @param {string} chars - Characters to use
 * @returns {string} Random string
 */
function randomString(length = 32, chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789') {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Mask sensitive data (email, phone, etc.)
 * @param {string} str - String to mask
 * @param {number} visibleStart - Visible characters at start
 * @param {number} visibleEnd - Visible characters at end
 * @param {string} maskChar - Character to use for masking
 * @returns {string} Masked string
 */
function maskString(str, visibleStart = 2, visibleEnd = 2, maskChar = '*') {
    if (!str || typeof str !== 'string') return '';
    if (str.length <= visibleStart + visibleEnd) return str;

    const start = str.substring(0, visibleStart);
    const end = str.substring(str.length - visibleEnd);
    const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);

    return start + masked + end;
}

/**
 * Extract initials from name
 * @param {string} name - Full name
 * @param {number} maxInitials - Maximum number of initials
 * @returns {string} Initials (uppercase)
 */
function getInitials(name, maxInitials = 2) {
    if (!name || typeof name !== 'string') return '';

    const words = name.trim().split(/\s+/);
    const initials = words
        .slice(0, maxInitials)
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    return initials;
}

/**
 * Convert bytes to human-readable format
 * @param {number} bytes - Number of bytes
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted string (e.g., "1.5 MB")
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Format number with thousands separator
 * @param {number} num - Number to format
 * @param {string} separator - Thousands separator
 * @returns {string} Formatted number
 */
function formatNumber(num, separator = ',') {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * Parse query string to object
 * @param {string} queryString - Query string (e.g., "?page=1&limit=10")
 * @returns {Object} Parsed object
 */
function parseQueryString(queryString) {
    if (!queryString) return {};

    const params = new URLSearchParams(queryString);
    const result = {};

    for (const [key, value] of params) {
        result[key] = value;
    }

    return result;
}

module.exports = {
    slugify,
    titleCase,
    truncate,
    randomString,
    maskString,
    getInitials,
    formatBytes,
    formatNumber,
    parseQueryString
};
