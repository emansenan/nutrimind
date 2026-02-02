/**
 * MicroMind Backend SDK
 * 
 * Production-ready utilities, services, and patterns for the SAAS template.
 * 
 * @module sdk
 */

// Response formatters
const responses = require('./responses');

// Validators
const validators = require('./validators/common');

// Utilities
const stringHelpers = require('./utils/stringHelpers');
const dateHelpers = require('./utils/dateHelpers');

// Middleware
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

module.exports = {
    // Responses
    ...responses,

    // Validators
    validators,

    // String helpers
    stringHelpers,

    // Date helpers
    dateHelpers,

    // Middleware
    errorHandler,
    notFoundHandler
};
