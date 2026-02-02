/**
 * Audit Service - Compliance & Activity Logging
 * 
 * Tracks user actions, data changes, and system events for compliance.
 * 
 * @module sdk/services/auditService
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Log user action
 * @param {Object} action - Action details
 * @returns {Promise<Object>} Created audit log
 */
async function logAction(action) {
    const {
        userId,
        organizationId,
        action: actionType,
        resource,
        resourceId,
        details = {},
        ipAddress = null,
        userAgent = null
    } = action;

    try {
        const auditLog = await prisma.auditLog.create({
            data: {
                userId,
                organizationId,
                action: actionType,
                resource,
                resourceId,
                details: JSON.stringify(details),
                ipAddress,
                userAgent,
                timestamp: new Date()
            }
        });

        return auditLog;
    } catch (error) {
        console.error('[Audit Service] Log error:', error);
        // Don't throw - auditing should not break main flow
        return null;
    }
}

/**
 * Log data change
 * @param {Object} change - Change details
 * @returns {Promise<Object>} Created audit log
 */
async function logDataChange(change) {
    const {
        userId,
        organizationId,
        table,
        recordId,
        operation, // 'CREATE', 'UPDATE', 'DELETE'
        before = null,
        after = null
    } = change;

    return logAction({
        userId,
        organizationId,
        action: `DATA_${operation}`,
        resource: table,
        resourceId: recordId,
        details: {
            operation,
            before,
            after,
            changes: operation === 'UPDATE' ? detectChanges(before, after) : null
        }
    });
}

/**
 * Log authentication event
 * @param {Object} event - Auth event details
 * @returns {Promise<Object>} Created audit log
 */
async function logAuthEvent(event) {
    const {
        userId,
        action, // 'LOGIN', 'LOGOUT', 'FAILED_LOGIN', 'PASSWORD_RESET'
        ipAddress,
        userAgent,
        success = true,
        reason = null
    } = event;

    return logAction({
        userId,
        organizationId: null, // Auth events may not have org context
        action: `AUTH_${action}`,
        resource: 'authentication',
        resourceId: userId,
        details: {
            success,
            reason,
            timestamp: new Date().toISOString()
        },
        ipAddress,
        userAgent
    });
}

/**
 * Get audit trail for resource
 * @param {string} resource - Resource type
 * @param {string} resourceId - Resource ID
 * @param {string} organizationId - Organization ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Audit logs
 */
async function getAuditTrail(resource, resourceId, organizationId, options = {}) {
    const { limit = 100, offset = 0 } = options;

    try {
        const logs = await prisma.auditLog.findMany({
            where: {
                organizationId,
                resource,
                resourceId
            },
            orderBy: {
                timestamp: 'desc'
            },
            take: limit,
            skip: offset,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return logs.map(log => ({
            ...log,
            details: JSON.parse(log.details || '{}')
        }));
    } catch (error) {
        console.error('[Audit Service] Get trail error:', error);
        return [];
    }
}

/**
 * Get user activity
 * @param {string} userId - User ID
 * @param {string} organizationId - Organization ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} User activity logs
 */
async function getUserActivity(userId, organizationId, options = {}) {
    const { limit = 50, startDate = null, endDate = null } = options;

    const where = {
        userId,
        organizationId
    };

    if (startDate || endDate) {
        where.timestamp = {};
        if (startDate) where.timestamp.gte = new Date(startDate);
        if (endDate) where.timestamp.lte = new Date(endDate);
    }

    try {
        const logs = await prisma.auditLog.findMany({
            where,
            orderBy: {
                timestamp: 'desc'
            },
            take: limit
        });

        return logs.map(log => ({
            ...log,
            details: JSON.parse(log.details || '{}')
        }));
    } catch (error) {
        console.error('[Audit Service] Get activity error:', error);
        return [];
    }
}

/**
 * Generate compliance report
 * @param {string} organizationId - Organization ID
 * @param {Object} criteria - Report criteria
 * @returns {Promise<Object>} Compliance report
 */
async function generateComplianceReport(organizationId, criteria) {
    const {
        startDate,
        endDate,
        actions = [],
        users = []
    } = criteria;

    const where = {
        organizationId,
        timestamp: {
            gte: new Date(startDate),
            lte: new Date(endDate)
        }
    };

    if (actions.length > 0) {
        where.action = { in: actions };
    }

    if (users.length > 0) {
        where.userId = { in: users };
    }

    try {
        const [logs, stats] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                orderBy: { timestamp: 'desc' },
                include: {
                    user: {
                        select: { name: true, email: true }
                    }
                }
            }),
            prisma.auditLog.groupBy({
                by: ['action'],
                where,
                _count: { action: true }
            })
        ]);

        return {
            period: {
                start: startDate,
                end: endDate
            },
            totalEvents: logs.length,
            byAction: stats.reduce((acc, s) => {
                acc[s.action] = s._count.action;
                return acc;
            }, {}),
            events: logs.map(log => ({
                ...log,
                details: JSON.parse(log.details || '{}')
            }))
        };
    } catch (error) {
        console.error('[Audit Service] Report error:', error);
        throw error;
    }
}

/**
 * Detect changes between before/after
 */
function detectChanges(before, after) {
    const changes = {};

    if (!before || !after) return null;

    for (const key of Object.keys({ ...before, ...after })) {
        if (before[key] !== after[key]) {
            changes[key] = {
                from: before[key],
                to: after[key]
            };
        }
    }

    return changes;
}

module.exports = {
    logAction,
    logDataChange,
    logAuthEvent,
    getAuditTrail,
    getUserActivity,
    generateComplianceReport
};
