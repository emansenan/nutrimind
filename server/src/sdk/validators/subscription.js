/**
 * Subscription Validation Utilities
 * 
 * Validation functions for subscription plans and billing.
 * 
 * @module sdk/validators/subscription
 */

const { validateRequired, validateEnum } = require('./common');

/**
 * Valid subscription plans
 */
const SUBSCRIPTION_PLANS = ['FREE', 'STARTER', 'PRO', 'ENTERPRISE'];

/**
 * Valid subscription statuses
 */
const SUBSCRIPTION_STATUSES = ['ACTIVE', 'CANCELED', 'EXPIRED', 'TRIAL'];

/**
 * Validate subscription plan
 * @param {string} plan - Subscription plan
 * @returns {Object} { valid: boolean, error: string }
 */
function validateSubscriptionPlan(plan) {
    const requiredCheck = validateRequired(plan, 'Subscription plan');
    if (!requiredCheck.valid) return requiredCheck;

    return validateEnum(plan, SUBSCRIPTION_PLANS, 'Subscription plan');
}

/**
 * Validate subscription status
 * @param {string} status - Subscription status
 * @returns {Object} { valid: boolean, error: string }
 */
function validateSubscriptionStatus(status) {
    const requiredCheck = validateRequired(status, 'Subscription status');
    if (!requiredCheck.valid) return requiredCheck;

    return validateEnum(status, SUBSCRIPTION_STATUSES, 'Subscription status');
}

/**
 * Validate subscription dates
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date (optional)
 * @returns {Object} { valid: boolean, errors: Array }
 */
function validateSubscriptionDates(startDate, endDate) {
    const errors = [];

    if (!startDate) {
        errors.push('Start date is required');
    } else {
        const start = new Date(startDate);
        if (isNaN(start.getTime())) {
            errors.push('Invalid start date');
        }

        if (endDate) {
            const end = new Date(endDate);
            if (isNaN(end.getTime())) {
                errors.push('Invalid end date');
            } else if (end <= start) {
                errors.push('End date must be after start date');
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : null
    };
}

/**
 * Validate quota usage against limit
 * @param {number} usage - Current usage
 * @param {number} limit - Quota limit
 * @param {string} resourceName - Resource name for error message
 * @returns {Object} { valid: boolean, error: string, available: number }
 */
function validateQuota(usage, limit, resourceName = 'Resource') {
    const currentUsage = parseInt(usage) || 0;
    const quotaLimit = parseInt(limit);

    if (isNaN(quotaLimit) || quotaLimit < 0) {
        return {
            valid: false,
            error: 'Invalid quota limit'
        };
    }

    const available = quotaLimit - currentUsage;

    if (available <= 0) {
        return {
            valid: false,
            error: `${resourceName} quota exceeded. Limit: ${quotaLimit}, Current: ${currentUsage}`,
            available: 0
        };
    }

    return {
        valid: true,
        available
    };
}

/**
 * Validate complete subscription data
 * @param {Object} data - Subscription data
 * @returns {Object} { valid: boolean, errors: Object }
 */
function validateSubscriptionData(data) {
    const errors = {};

    // Validate plan
    const planCheck = validateSubscriptionPlan(data.plan);
    if (!planCheck.valid) {
        errors.plan = planCheck.error;
    }

    // Validate status (if provided)
    if (data.status) {
        const statusCheck = validateSubscriptionStatus(data.status);
        if (!statusCheck.valid) {
            errors.status = statusCheck.error;
        }
    }

    // Validate dates
    if (data.startDate || data.endDate) {
        const datesCheck = validateSubscriptionDates(data.startDate, data.endDate);
        if (!datesCheck.valid) {
            errors.dates = datesCheck.errors;
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : null
    };
}

module.exports = {
    SUBSCRIPTION_PLANS,
    SUBSCRIPTION_STATUSES,
    validateSubscriptionPlan,
    validateSubscriptionStatus,
    validateSubscriptionDates,
    validateQuota,
    validateSubscriptionData
};
