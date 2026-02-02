/**
 * Request Validation Middleware
 * 
 * Validates request body/query/params against schema.
 * 
 * @module sdk/middleware/validate
 */

const { validationError } = require('../responses/error');
const validators = require('../validators/common');

/**
 * Validate request body
 * 
 * Usage:
 * ```javascript
 * router.post('/users', validate({
 *   email: { type: 'email', required: true },
 *   name: { type: 'string', minLength: 2, maxLength: 100 }
 * }), ...);
 * ```
 * 
 * @param {Object} schema - Validation schema
 * @param {string} source - Request source ('body', 'query', 'params')
 * @returns {Function} Middleware function
 */
function validate(schema, source = 'body') {
    return (req, res, next) => {
        const data = req[source];
        const errors = {};

        for (const [field, rules] of Object.entries(schema)) {
            const value = data[field];

            // Check required
            if (rules.required) {
                const requiredCheck = validators.validateRequired(value, field);
                if (!requiredCheck.valid) {
                    errors[field] = requiredCheck.error;
                    continue;
                }
            }

            // Skip further validation if not required and empty
            if (!rules.required && (value === undefined || value === null || value === '')) {
                continue;
            }

            // Type validation
            if (rules.type) {
                let typeCheck;

                switch (rules.type) {
                    case 'email':
                        if (!validators.isValidEmail(value)) {
                            errors[field] = 'Invalid email address';
                        }
                        break;

                    case 'uuid':
                        if (!validators.isValidUUID(value)) {
                            errors[field] = 'Invalid UUID format';
                        }
                        break;

                    case 'url':
                        if (!validators.isValidURL(value)) {
                            errors[field] = 'Invalid URL format';
                        }
                        break;

                    case 'string':
                        if (typeof value !== 'string') {
                            errors[field] = 'Must be a string';
                        } else {
                            // Check length
                            const lengthCheck = validators.validateLength(
                                value,
                                rules.minLength,
                                rules.maxLength
                            );
                            if (!lengthCheck.valid) {
                                errors[field] = lengthCheck.error;
                            }
                        }
                        break;

                    case 'number':
                        const rangeCheck = validators.validateRange(
                            value,
                            rules.min,
                            rules.max
                        );
                        if (!rangeCheck.valid) {
                            errors[field] = rangeCheck.error;
                        }
                        break;

                    case 'date':
                        const dateCheck = validators.validateDate(value);
                        if (!dateCheck.valid) {
                            errors[field] = dateCheck.error;
                        }
                        break;

                    case 'enum':
                        const enumCheck = validators.validateEnum(value, rules.values, field);
                        if (!enumCheck.valid) {
                            errors[field] = enumCheck.error;
                        }
                        break;
                }
            }

            // Custom validator
            if (rules.custom && typeof rules.custom === 'function') {
                const customCheck = rules.custom(value);
                if (!customCheck.valid) {
                    errors[field] = customCheck.error;
                }
            }
        }

        // Return errors if any
        if (Object.keys(errors).length > 0) {
            return validationError(res, 'Validation failed', errors);
        }

        next();
    };
}

/**
 * Validate body
 */
function validateBody(schema) {
    return validate(schema, 'body');
}

/**
 * Validate query parameters
 */
function validateQuery(schema) {
    return validate(schema, 'query');
}

/**
 * Validate URL parameters
 */
function validateParams(schema) {
    return validate(schema, 'params');
}

module.exports = {
    validate,
    validateBody,
    validateQuery,
    validateParams
};
