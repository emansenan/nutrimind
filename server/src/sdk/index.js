/**
 * MicroMind Backend SDK
 * 
 * Production-ready utilities, services, and patterns for the SAAS template.
 * 
 * @module sdk
 * @version 1.0.0
 */

// Response formatters
const responses = require('./responses');

// Services
const services = require('./services');

// Validators
const validators = require('./validators');

// Utilities
const stringHelpers = require('./utils/stringHelpers');
const dateHelpers = require('./utils/dateHelpers');
const encryption = require('./utils/encryption');
const permissions = require('./utils/permissions');
const subscriptionPlans = require('./utils/subscriptionPlans');

// Middleware
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { authenticateJWT, optionalAuth } = require('./middleware/auth');
const { requireRole, requireOwner, requireAdmin } = require('./middleware/roleGuard');
const { validateBody, validateQuery, validateParams } = require('./middleware/validate');
const { rateLimit, strictRateLimit, apiRateLimit, authRateLimit } = require('./middleware/rateLimit');
const tenantContext = require('./middleware/tenantContext');
const quotaCheck = require('./middleware/quotaCheck');
const auditMiddleware = require('./middleware/audit');

// Controllers
const TenantController = require('./controllers/TenantController');
const AuthController = require('./controllers/AuthController');
const BaseController = require('./controllers/BaseController');

// Database helpers
const database = require('./database');

module.exports = {
    // === RESPONSES ===
    ...responses,

    // === SERVICES ===
    services,

    // === VALIDATORS ===
    validators,

    // === UTILITIES ===
    stringHelpers,
    dateHelpers,
    encryption,
    permissions,
    subscriptionPlans,

    // === MIDDLEWARE ===
    // Error handling
    errorHandler,
    notFoundHandler,

    // Authentication
    authenticateJWT,
    optionalAuth,

    // Authorization
    requireRole,
    requireOwner,
    requireAdmin,

    // Validation
    validateBody,
    validateQuery,
    validateParams,

    // Rate limiting
    rateLimit,
    strictRateLimit,
    apiRateLimit,
    authRateLimit,

    // Multi-tenancy
    tenantContext,
    quotaCheck,

    // Audit
    auditMiddleware,

    // === CONTROLLERS ===
    TenantController,
    AuthController,
    BaseController,

    // === DATABASE ===
    database
};
