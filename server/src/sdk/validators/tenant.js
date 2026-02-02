/**
 * Tenant Validation Utilities
 * 
 * Validation functions specific to organization/tenant data.
 * 
 * @module sdk/validators/tenant
 */

const { isValidUUID, validateLength, validateRequired, sanitizeString } = require('./common');
const { slugify } = require('../utils/stringHelpers');

/**
 * Validate organization name
 * @param {string} name - Organization name
 * @returns {Object} { valid: boolean, error: string, sanitized: string }
 */
function validateOrganizationName(name) {
    const requiredCheck = validateRequired(name, 'Organization name');
    if (!requiredCheck.valid) return requiredCheck;

    const sanitized = sanitizeString(name);
    const lengthCheck = validateLength(sanitized, 2, 100);

    if (!lengthCheck.valid) return lengthCheck;

    return { valid: true, sanitized };
}

/**
 * Validate organization slug
 * @param {string} slug - Organization slug
 * @returns {Object} { valid: boolean, error: string, sanitized: string }
 */
function validateOrganizationSlug(slug) {
    const requiredCheck = validateRequired(slug, 'Organization slug');
    if (!requiredCheck.valid) return requiredCheck;

    const sanitized = slugify(slug);

    if (sanitized.length < 2 || sanitized.length > 50) {
        return { valid: false, error: 'Slug must be between 2 and 50 characters' };
    }

    // Slug can only contain lowercase letters, numbers, and hyphens
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(sanitized)) {
        return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };
    }

    return { valid: true, sanitized };
}

/**
 * Validate organization ID (UUID)
 * @param {string} organizationId - Organization ID
 * @returns {Object} { valid: boolean, error: string }
 */
function validateOrganizationId(organizationId) {
    const requiredCheck = validateRequired(organizationId, 'Organization ID');
    if (!requiredCheck.valid) return requiredCheck;

    if (!isValidUUID(organizationId)) {
        return { valid: false, error: 'Invalid organization ID format' };
    }

    return { valid: true };
}

/**
 * Validate organization member role
 * @param {string} role - Role to validate
 * @returns {Object} { valid: boolean, error: string }
 */
function validateOrganizationRole(role) {
    const validRoles = ['OWNER', 'ADMIN', 'MEMBER'];

    if (!validRoles.includes(role)) {
        return {
            valid: false,
            error: `Role must be one of: ${validRoles.join(', ')}`
        };
    }

    return { valid: true };
}

/**
 * Validate organization settings
 * @param {Object} settings - Settings object
 * @returns {Object} { valid: boolean, errors: Array }
 */
function validateOrganizationSettings(settings) {
    const errors = [];

    if (settings && typeof settings !== 'object') {
        errors.push('Settings must be an object');
    }

    // Validate specific settings if present
    if (settings?.theme && !['light', 'dark'].includes(settings.theme)) {
        errors.push('Theme must be either "light" or "dark"');
    }

    if (settings?.language && typeof settings.language !== 'string') {
        errors.push('Language must be a string');
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : null
    };
}

/**
 * Validate complete organization data for creation
 * @param {Object} data - Organization data
 * @returns {Object} { valid: boolean, errors: Object, sanitized: Object }
 */
function validateOrganizationData(data) {
    const errors = {};
    const sanitized = {};

    // Validate name
    const nameCheck = validateOrganizationName(data.name);
    if (!nameCheck.valid) {
        errors.name = nameCheck.error;
    } else {
        sanitized.name = nameCheck.sanitized;
    }

    // Validate slug (if provided, otherwise generate from name)
    if (data.slug) {
        const slugCheck = validateOrganizationSlug(data.slug);
        if (!slugCheck.valid) {
            errors.slug = slugCheck.error;
        } else {
            sanitized.slug = slugCheck.sanitized;
        }
    } else if (sanitized.name) {
        sanitized.slug = slugify(sanitized.name);
    }

    // Validate settings (optional)
    if (data.settings) {
        const settingsCheck = validateOrganizationSettings(data.settings);
        if (!settingsCheck.valid) {
            errors.settings = settingsCheck.errors;
        } else {
            sanitized.settings = data.settings;
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : null,
        sanitized
    };
}

module.exports = {
    validateOrganizationName,
    validateOrganizationSlug,
    validateOrganizationId,
    validateOrganizationRole,
    validateOrganizationSettings,
    validateOrganizationData
};
