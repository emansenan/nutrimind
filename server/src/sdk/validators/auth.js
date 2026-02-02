/**
 * Authentication Validators
 * 
 * Validation functions for authentication-related fields.
 * 
 * @module sdk/validators/auth
 */

const { isValidEmail, validateLength, validateRequired } = require('./common');

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { valid: boolean, error: string, strength: string }
 */
function validatePassword(password) {
    const requiredCheck = validateRequired(password, 'Password');
    if (!requiredCheck.valid) return requiredCheck;

    const lengthCheck = validateLength(password, 8, 128);
    if (!lengthCheck.valid) return lengthCheck;

    // Check password strength
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 'weak';
    const checks = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial];
    const passedChecks = checks.filter(Boolean).length;

    if (passedChecks >= 4) strength = 'strong';
    else if (passedChecks >= 3) strength = 'medium';

    if (passedChecks < 3) {
        return {
            valid: false,
            error: 'Password must contain uppercase, lowercase, and numbers',
            strength
        };
    }

    return { valid: true, strength };
}

/**
 * Validate login credentials
 * @param {Object} credentials - { email, password }
 * @returns {Object} { valid: boolean, errors: Object }
 */
function validateLoginCredentials(credentials) {
    const errors = {};

    if (!isValidEmail(credentials.email)) {
        errors.email = 'Invalid email address';
    }

    if (!credentials.password || credentials.password.length < 1) {
        errors.password = 'Password is required';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : null
    };
}

/**
 * Validate registration data
 * @param {Object} data - { email, password, name }
 * @returns {Object} { valid: boolean, errors: Object }
 */
function validateRegistrationData(data) {
    const errors = {};

    // Email
    if (!isValidEmail(data.email)) {
        errors.email = 'Invalid email address';
    }

    // Password
    const passwordCheck = validatePassword(data.password);
    if (!passwordCheck.valid) {
        errors.password = passwordCheck.error;
    }

    // Name
    const nameCheck = validateLength(data.name, 2, 100);
    if (!nameCheck.valid) {
        errors.name = nameCheck.error;
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : null
    };
}

module.exports = {
    validatePassword,
    validateLoginCredentials,
    validateRegistrationData
};
