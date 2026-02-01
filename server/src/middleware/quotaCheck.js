const { checkQuota } = require('../utils/subscriptionPlans');

/**
 * Quota Check Middleware
 * Verifies organization hasn't exceeded subscription limits
 */
const checkResourceQuota = (resource, count = 1) => {
    return async (req, res, next) => {
        try {
            if (!req.organizationId) {
                return res.status(403).json({ error: 'No organization selected' });
            }

            const { PrismaClient } = require('@prisma/client');
            const prisma = new PrismaClient();

            const quotaCheck = await checkQuota(prisma, req.organizationId, resource, count);

            if (!quotaCheck.allowed) {
                return res.status(403).json({
                    error: 'Quota exceeded',
                    resource,
                    limit: quotaCheck.limit,
                    current: quotaCheck.current,
                    planName: quotaCheck.planName,
                    message: `Your ${quotaCheck.planName} plan allows ${quotaCheck.limit} ${resource}. You currently have ${quotaCheck.current}.`,
                    upgrade: true
                });
            }

            // Attach quota info to request for logging
            req.quotaCheck = quotaCheck;
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {
    checkResourceQuota
};
