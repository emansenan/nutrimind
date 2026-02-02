/**
 * Middleware - Main Export
 * 
 * @module sdk/middleware
 */

const { errorHandler, notFoundHandler } = require('./errorHandler');
const tenantContext = require('./tenantContext');
const quotaCheck = require('./quotaCheck');

module.exports = {
    errorHandler,
    notFoundHandler,
    tenantContext,
    quotaCheck
};
