// Subscription plan definitions with usage limits

const SUBSCRIPTION_PLANS = {
    FREE: {
        name: 'Free',
        price: 0,
        currency: 'USD',
        interval: 'month',
        limits: {
            members: 3,
            dashboards: 5,
            reports: 10,
            documents: 20,
            storage: 100 * 1024 * 1024, // 100MB
            chatMessages: 100,
        },
        features: [
            'Up to 3 team members',
            '5 custom dashboards',
            '10 reports per month',
            '100MB storage',
            'Email support'
        ]
    },

    STARTER: {
        name: 'Starter',
        price: 29,
        currency: 'USD',
        interval: 'month',
        limits: {
            members: 10,
            dashboards: 25,
            reports: 100,
            documents: 100,
            storage: 10 * 1024 * 1024 * 1024, // 10GB
            chatMessages: 1000,
        },
        features: [
            'Up to 10 team members',
            '25 custom dashboards',
            '100 reports per month',
            '10GB storage',
            'Priority email support',
            'Advanced analytics'
        ]
    },

    PRO: {
        name: 'Pro',
        price: 99,
        currency: 'USD',
        interval: 'month',
        limits: {
            members: 50,
            dashboards: -1, // unlimited
            reports: -1,
            documents: -1,
            storage: 100 * 1024 * 1024 * 1024, // 100GB
            chatMessages: -1,
        },
        features: [
            'Up to 50 team members',
            'Unlimited dashboards',
            'Unlimited reports',
            '100GB storage',
            '24/7 priority support',
            'Advanced analytics',
            'Custom integrations',
            'API access'
        ]
    },

    ENTERPRISE: {
        name: 'Enterprise',
        price: null, // Custom pricing
        currency: 'USD',
        interval: 'month',
        limits: {
            members: -1,
            dashboards: -1,
            reports: -1,
            documents: -1,
            storage: -1,
            chatMessages: -1,
        },
        features: [
            'Unlimited team members',
            'Unlimited everything',
            'Dedicated account manager',
            'Custom SLA',
            'On-premise deployment option',
            'Custom integrations',
            'Advanced security features',
            'Training and onboarding'
        ]
    }
};

/**
 * Get plan details
 */
const getPlan = (planName) => {
    return SUBSCRIPTION_PLANS[planName] || SUBSCRIPTION_PLANS.FREE;
};

/**
 * Check if organization is within quota for a resource
 */
const checkQuota = async (prisma, organizationId, resource, count = 1) => {
    const org = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: { subscription: true }
    });

    if (!org || !org.subscription) {
        throw new Error('Organization or subscription not found');
    }

    const plan = getPlan(org.subscription.plan);
    const limit = plan.limits[resource];

    // -1 means unlimited
    if (limit === -1) {
        return { allowed: true, limit: -1, current: null };
    }

    // Get current usage based on resource type
    let current = 0;
    switch (resource) {
        case 'members':
            current = await prisma.organizationMember.count({
                where: { organizationId }
            });
            break;
        case 'dashboards':
            current = await prisma.dashboard.count({
                where: { organizationId }
            });
            break;
        case 'reports':
            // Count reports created this month
            const monthStart = new Date();
            monthStart.setDate(1);
            monthStart.setHours(0, 0, 0, 0);
            current = await prisma.report.count({
                where: {
                    organizationId,
                    createdAt: { gte: monthStart }
                }
            });
            break;
        case 'documents':
            current = await prisma.document.count({
                where: { organizationId }
            });
            break;
        case 'storage':
            const docs = await prisma.document.findMany({
                where: { organizationId },
                select: { size: true }
            });
            current = docs.reduce((sum, doc) => sum + (doc.size || 0), 0);
            break;
        case 'chatMessages':
            // Count chat messages this month
            const chatMonthStart = new Date();
            chatMonthStart.setDate(1);
            chatMonthStart.setHours(0, 0, 0, 0);
            current = await prisma.chatHistory.count({
                where: {
                    organizationId,
                    createdAt: { gte: chatMonthStart }
                }
            });
            break;
        default:
            throw new Error(`Unknown resource type: ${resource}`);
    }

    const allowed = (current + count) <= limit;

    return {
        allowed,
        limit,
        current,
        remaining: Math.max(0, limit - current),
        planName: org.subscription.plan
    };
};

/**
 * Get usage statistics for an organization
 */
const getUsageStats = async (prisma, organizationId) => {
    const org = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: { subscription: true }
    });

    if (!org || !org.subscription) {
        throw new Error('Organization or subscription not found');
    }

    const plan = getPlan(org.subscription.plan);
    const stats = {};

    // Count all resources
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    stats.members = {
        current: await prisma.organizationMember.count({ where: { organizationId } }),
        limit: plan.limits.members
    };

    stats.dashboards = {
        current: await prisma.dashboard.count({ where: { organizationId } }),
        limit: plan.limits.dashboards
    };

    stats.reports = {
        current: await prisma.report.count({
            where: { organizationId, createdAt: { gte: monthStart } }
        }),
        limit: plan.limits.reports
    };

    stats.documents = {
        current: await prisma.document.count({ where: { organizationId } }),
        limit: plan.limits.documents
    };

    const docs = await prisma.document.findMany({
        where: { organizationId },
        select: { size: true }
    });
    stats.storage = {
        current: docs.reduce((sum, doc) => sum + (doc.size || 0), 0),
        limit: plan.limits.storage
    };

    stats.chatMessages = {
        current: await prisma.chatHistory.count({
            where: { organizationId, createdAt: { gte: monthStart } }
        }),
        limit: plan.limits.chatMessages
    };

    // Add percentage calculations
    Object.keys(stats).forEach(key => {
        const { current, limit } = stats[key];
        if (limit === -1) {
            stats[key].percentage = 0;
            stats[key].unlimited = true;
        } else {
            stats[key].percentage = Math.round((current / limit) * 100);
            stats[key].unlimited = false;
        }
    });

    return {
        plan: org.subscription.plan,
        planName: plan.name,
        stats
    };
};

module.exports = {
    SUBSCRIPTION_PLANS,
    getPlan,
    checkQuota,
    getUsageStats
};
