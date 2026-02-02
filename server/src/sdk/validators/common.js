/**
 * Common Field Validators
 * 
 * Reusable validation functions for common field types.
 * 
 * @module sdk/validators/common
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Validate UUID v4
 * @param {string} uuid - UUID to validate
 * @returns {boolean} True if valid
 */
function isValidUUID(uuid) {
    if (!uuid || typeof uuid !== 'string') return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
function isValidURL(url) {
    if (!url || typeof url !== 'string') return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number  to validate
 * @returns {boolean} True if valid
 */
function isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate string length
 * @param {string} str - String to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length
 * @returns {Object} { valid: boolean, error: string }
 */
function validateLength(str, min = 0, max = Infinity) {
    if (typeof str !== 'string') {
        return { valid: false, error: 'Must be a string' };
    }

    const length = str.length;

    if (length < min) {
        return { valid: false, error: `Must be at least ${min} characters` };
    }

    if (length > max) {
        return { valid: false, error: `Must not exceed ${max} characters` };
    }

    return { valid: true };
}

/**
 * Validate required field
 * @param {*} value - Value to check
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { valid: boolean, error: string }
 */
function validateRequired(value, fieldName = 'Field') {
    if (value === undefined || value === null || value === '') {
        return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
}

/**
 * Validate enum value
 * @param {*} value - Value to check
 * @param {Array} allowedValues - Array of allowed values
 * @param {string} fieldName - Field name for error message
 * @returns {Object} { valid: boolean, error: string }
 */
function validateEnum(value, allowedValues, fieldName = 'Field') {
    if (!allowedValues.includes(value)) {
        return {
            valid: false,
            error: `${fieldName} must be one of: ${allowedValues.join(', ')}`
        };
    }
    return { valid: true };
}

/**
 * Validate number range
 * @param {number} value - Number to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {Object} { valid: boolean, error: string }
 */
function validateRange(value, min = -Infinity, max = Infinity) {
    const num = Number(value);

    if (isNaN(num)) {
        return { valid: false, error: 'Must be a number' };
    }

    if (num < min) {
        return { valid: false, error: `Must be at least ${min}` };
    }

    if (num > max) {
        return { valid: false, error: `Must not exceed ${max}` };
    }

    return { valid: true };
}

/**
 * Validate date string
 * @param {string} dateStr - Date string to validate
 * @returns {Object} { valid: boolean, error: string, date: Date }
 */
function validateDate(dateStr) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        return { valid: false, error: 'Invalid date format' };
    }

    return { valid: true, date };
}

/**
 * Sanitize string (remove HTML, scripts, etc.)
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeString(str) {
    if (typeof str !== 'string') return '';

    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
}

module.exports = {
    isValidEmail,
    isValidUUID,
    isValidURL,
    isValidPhone,
    validateLength,
    validateRequired,
    validateEnum,
    validateRange,
    validateDate,
    sanitizeString
};
