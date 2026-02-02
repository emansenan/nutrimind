const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Tenant Context Middleware
 * Extracts organization context from JWT and attaches to request
 */
const tenantContext = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next();
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user with organization memberships
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                memberships: {
                    where: {
                        organizationId: user?.currentOrganizationId || undefined
                    },
                    include: {
                        organization: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach user and organization context to request
        req.user = user;
        req.userId = user.id;
        req.organizationId = user.currentOrganizationId;

        // Get current organization membership details
        const currentMembership = user.memberships.find(
            m => m.organizationId === user.currentOrganizationId
        );

        if (currentMembership) {
            req.orgRole = currentMembership.role;
            req.organization = currentMembership.organization;
        }

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        next(error);
    }
};

/**
 * Require Organization Access
 * Ensures user has selected an organization
 */
const requireOrgAccess = (req, res, next) => {
    if (!req.organizationId) {
        return res.status(403).json({
            error: 'No organization selected',
            message: 'Please select an organization to continue'
        });
    }
    next();
};

/**
 * Require Organization Role
 * Ensures user has minimum required role in organization
 */
const requireOrgRole = (minRole) => {
    const roleHierarchy = {
        VIEWER: 0,
        MEMBER: 1,
        ADMIN: 2,
        OWNER: 3
    };

    return (req, res, next) => {
        if (!req.orgRole) {
            return res.status(403).json({
                error: 'No organization role found',
                message: 'You are not a member of this organization'
            });
        }

        const userRoleLevel = roleHierarchy[req.orgRole];
        const requiredRoleLevel = roleHierarchy[minRole];

        if (userRoleLevel < requiredRoleLevel) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                message: `This action requires ${minRole} role or higher`,
                required: minRole,
                current: req.orgRole
            });
        }

        next();
    };
};

/**
 * Validate Organization Access
 * Ensures user belongs to the organization they're trying to access
 */
const validateOrgAccess = async (req, res, next) => {
    const targetOrgId = req.params.organizationId || req.body.organizationId;

    if (!targetOrgId) {
        return next(); // No specific org to validate
    }

    // Check if user is member of target organization
    const membership = await prisma.organizationMember.findUnique({
        where: {
            organizationId_userId: {
                organizationId: targetOrgId,
                userId: req.userId
            }
        }
    });

    if (!membership) {
        return res.status(403).json({
            error: 'Access denied',
            message: 'You are not a member of this organization'
        });
    }

    // Attach membership details to request
    req.targetOrgMembership = membership;
    next();
};

module.exports = {
    tenantContext,
    requireOrgAccess,
    requireOrgRole,
    validateOrgAccess
};
