# 🏢 Multi-Tenant SAAS Guide

Complete guide for understanding and customizing the multi-tenant SAAS features in the **MicroMind Base SAAS Template**.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Multi-Tenancy Architecture](#multi-tenancy-architecture)
3. [Database Schema](#database-schema)
4. [Data Isolation](#data-isolation)
5. [Subscription Plans](#subscription-plans)
6. [Usage Quotas](#usage-quotas)
7. [Tenant Onboarding](#tenant-onboarding)
8. [Team Management](#team-management)
9. [Billing Integration](#billing-integration)
10. [Testing Multi-Tenancy](#testing-multi-tenancy)

---

## Overview

The MicroMind Base Template is built as a **true multi-tenant SAAS application**, where:

- Multiple **organizations** (tenants) share one application instance
- Each organization has **complete data isolation**
- Organizations can have **multiple team members** with different roles
- **Subscription-based** access with usage quotas
- **Billing-ready** with Stripe integration hooks

---

## Multi-Tenancy Architecture

### Core Concept

```
┌─────────────────────────────────────────┐
│         Single Application Instance      │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   Org A (Acme)            Org B (Labs)
   ├── 5 members           ├── 2 members
   ├── PRO plan            ├── FREE plan
   └── Isolated data       └── Isolated data
```

### Key Principles

1. **Row-Level Isolation:** Every tenant-scoped table has `organizationId`
2. **Middleware-Enforced:** Tenant context automatically applied to all queries
3. **Subscription-Gated:** Features limited by subscription plan
4. **Role-Based Access:** 4 organizational roles (OWNER, ADMIN, MEMBER, VIEWER)

---

## Database Schema

### Multi-Tenant Models

#### 1. Organization

```prisma
model Organization {
  id          String   @id @default(uuid())
  name        String   // Display name
  slug        String   @unique  // URL-safe (e.g., 'acme-corp')
  logo        String?
  settings    Json?    // Custom org settings
  
  members     OrganizationMember[]
  subscription Subscription?
  // ... all tenant-scoped data
}
```

#### 2. OrganizationMember

```prisma
model OrganizationMember {
  organizationId  String
  userId          String
  role            OrgRole  // OWNER, ADMIN, MEMBER, VIEWER
  
  @@unique([organizationId, userId])
}
```

#### 3. Subscription

```prisma
model Subscription {
  organizationId    String @unique
  plan              SubscriptionPlan  // FREE, STARTER, PRO, ENTERPRISE
  status            SubscriptionStatus
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  stripeCustomerId   String?
}
```

#### 4. Invitation

```prisma
model Invitation {
  organizationId  String
  email           String
  role            OrgRole
  token           String   @unique
  expiresAt       DateTime
  acceptedAt      DateTime?
}
```

### Tenant-Scoped Models

All these models include `organizationId`:

- Dashboard
- Report
- Document
- ChatHistory

**Example:**

```prisma
model Dashboard {
  organizationId  String
  organization    Organization @relation(...)
  // ... other fields
  
  @@index([organizationId])  // Performance!
}
```

---

## Data Isolation

### Automatic Tenant Scoping

**Middleware:** `server/src/middleware/tenantContext.js`

```javascript
// Every API request automatically gets:
req.organizationId  // Current organization ID
req.orgRole        // User's role in organization
req.organization   // Full organization object
```

### Usage in Controllers

**✅ Correct:**

```javascript
// GET /api/dashboards
router.get('/', tenantContext, requireOrgAccess, async (req, res) => {
  const dashboards = await prisma.dashboard.findMany({
    where: { organizationId: req.organizationId }  // ✅ Scoped!
  });
  res.json(dashboards);
});
```

**❌ Incorrect:**

```javascript
// ❌ DON'T DO THIS - exposes all tenants' data!
const dashboards = await prisma.dashboard.findMany();
```

### Prisma Best Practices

**Always filter by `organizationId`:**

```javascript
// Create
await prisma.dashboard.create({
  data: {
    organizationId: req.organizationId,  // ✅
    // ... other fields
  }
});

// Read
await prisma.dashboard.findMany({
  where: { organizationId: req.organizationId }  // ✅
});

// Update
await prisma.dashboard.update({
  where: {
    id: dashboardId,
    organizationId: req.organizationId  // ✅ Double-check ownership!
  },
  data: { ... }
});

// Delete
await prisma.dashboard.delete({
  where: {
    id: dashboardId,
    organizationId: req.organizationId  // ✅
  }
});
```

---

## Subscription Plans

### Plan Tiers

**File:** `server/src/utils/subscriptionPlans.js`

| Plan | Price | Members | Dashboards | Reports/Mo | Storage |
|------|-------|---------|------------|------------|---------|
| FREE | $0 | 3 | 5 | 10 | 100MB |
| STARTER | $29 | 10 | 25 | 100 | 10GB |
| PRO | $99 | 50 | Unlimited | Unlimited | 100GB |
| ENTERPRISE | Custom | Unlimited | Unlimited | Unlimited | Unlimited |

### Customizing Plans

```javascript
// server/src/utils/subscriptionPlans.js
const SUBSCRIPTION_PLANS = {
  CUSTOM_PLAN: {
    name: 'Custom Plan',
    price: 49,
    limits: {
      members: 20,
      dashboards: 50,
      reports: 200,
      storage: 50 * 1024 * 1024 * 1024  // 50GB
    },
    features: ['Feature 1', 'Feature 2']
  }
};
```

**Don't forget to:**

1. Add enum value to `schema.prisma`
2. Run `npx prisma migrate dev`
3. Update frontend plan display

---

## Usage Quotas

### Quota Enforcement

**Middleware:** `server/src/middleware/quotaCheck.js`

```javascript
// Protect resource creation with quota check
router.post('/dashboards',
  tenantContext,
  requireOrgAccess,
  checkResourceQuota('dashboards'),  // ✅ Checks quota before allowing
  async (req, res) => {
    // If this runs, user is within quota
    const dashboard = await prisma.dashboard.create({...});
    res.json(dashboard);
  }
);
```

### Resources with Quotas

- `members` - Team member count
- `dashboards` - Total dashboards
- `reports` - Reports created this month
- `documents` - Total documents
- `storage` - Total file storage (bytes)
- `chatMessages` - Chat messages this month

### Usage Stats API

```javascript
// GET /api/subscriptions/:orgId/usage
const { getUsageStats } = require('../utils/subscriptionPlans');

const stats = await getUsageStats(prisma, organizationId);
/*
{
  plan: 'PRO',
  planName: 'Pro',
  stats: {
    members: { current: 12, limit: 50, percentage: 24, unlimited: false },
    dashboards: { current: 45, limit: -1, percentage: 0, unlimited: true },
    ...
  }
}
*/
```

---

## Tenant Onboarding

### Onboarding Flow

1. **User Signs Up** → Create user account
2. **Create Organization** → Name, slug (URL-safe)
3. **Create Membership** → User becomes OWNER
4. **Create Subscription** → Start with FREE plan
5. **Optional: Invite Team** → Send invitations
6. **Redirect to Dashboard** → Start using app

### Implementation

**Create Organization API:**

```javascript
POST /api/organizations
{
  "name": "Acme Corporation",
  "slug": "acme-corp"  // Must be unique
}
```

**Automatic Setup:**

- Creates organization
- Creates OrganizationMember (role: OWNER)
- Creates Subscription (plan: FREE)
- Sets as user's current organization

---

## Team Management

### Organizational Roles

| Role | Create/Edit | Delete | Invite Members | Billing | Delete Org |
|------|-------------|---------|----------------|---------|------------|
| OWNER | ✅ | ✅ | ✅ | ✅ | ✅ |
| ADMIN | ✅ | ✅ | ✅ | ❌ | ❌ |
| MEMBER | ✅ | Own only | ❌ | ❌ | ❌ |
| VIEWER | ❌ | ❌ | ❌ | ❌ | ❌ |

### Invitation Flow

```javascript
// 1. Create invitation
POST /api/organizations/:id/invitations
{
  "email": "colleague@email.com",
  "role": "MEMBER"
}

// 2. System sends email with token link
// https://yourapp.com/accept-invitation?token=xxx

// 3. Recipient accepts
POST /api/invitations/accept
{
  "token": "xxx"
}

// 4. If user doesn't exist, create account
// 5. Create OrganizationMember
// 6. Delete invitation
```

---

## Billing Integration

### Stripe Integration Points

**Ready-to-integrate fields:**

- `subscription.stripeCustomerId`
- `subscription.stripeSubscriptionId`

**Example Upgrade Flow:**

```javascript
// 1. Create Stripe checkout session
const session = await stripe.checkout.sessions.create({
  customer: subscription.stripeCustomerId,
  line_items: [{
    price: 'price_pro_monthly',
    quantity: 1
  }],
  mode: 'subscription'
});

// 2. On successful payment (webhook):
await prisma.subscription.update({
  where: { organizationId },
  data: {
    plan: 'PRO',
    stripeSubscriptionId: session.subscription
  }
});
```

### Recommended Libraries

```bash
npm install stripe
```

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

---

## Testing Multi-Tenancy

### Demo Organizations

After `npm run prisma:seed`:

**Organization 1: Acme Corporation (PRO)**

- Owner: <admin@acme.com> / admin123
- Member: <user@acme.com> / user123

**Organization 2: MicroMind Labs (FREE)**

- Owner: <jane@micromind.com> / user123

### Manual Testing

#### 1. Test Data Isolation

```
1. Login as admin@acme.com
2. Create dashboard "Acme Dashboard"
3. Logout
4. Login as jane@micromind.com
5. Verify "Acme Dashboard" does NOT appear
6. Create dashboard "Labs Dashboard"
7. Logout
8. Login as admin@acme.com
9. Verify only "Acme Dashboard" appears
```

#### 2. Test Quote Enforcement

```
1. Login as jane@micromind.com (FREE plan - 5 dashboard limit)
2. Create 5 dashboards → should succeed
3. Try to create 6th dashboard → should fail with quota error
```

#### 3. Test Role Permissions

```
1. Login as user@acme.com (MEMBER role)
2. Try to access Organization Settings → should succeed (view only)
3. Try to delete organization → should fail (403 Forbidden)
4. Login as admin@acme.com (OWNER)
5. Try to delete organization → should succeed
```

### Automated Tests

```javascript
// server/tests/multi-tenant.test.js
describe('Multi-Tenant Isolation', () => {
  test('User cannot access other organization data', async () => {
    // Create 2 orgs, 2 users
    // Verify  complete data isolation
  });
});
```

---

## Best Practices

### ✅ Do's

- **Always** filter by `organizationId`
- **Always** validate organization membership before actions
- **Always** check quotas before resource creation
- Use `requireOrgAccess` middleware on all tenant endpoints
- Index all `organizationId` columns for performance

### ❌ Don'ts

- **Never** query without `organizationId` filter (except for system/admin endpoints)
- **Never** trust client-provided `organizationId` - always use `req.organizationId`
- **Never** allow users to change `organizationId` of existing records
- **Don't** forget to cascade deletes (use Prisma `onDelete: Cascade`)

---

## Customization Examples

### Add New Quota Type

```javascript
// 1. Add to subscription plans
limits: {
  customResource: 100
}

// 2. Implement count logic in checkQuota()
case 'customResource':
  current = await prisma.customResource.count({
    where: { organizationId }
  });
  break;

// 3. Use in routes
checkResourceQuota('customResource')
```

### Add New Organization Role

```prisma
// schema.prisma
enum OrgRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
  CUSTOM_ROLE  // ← Add here
}
```

Update role hierarchy in `tenantContext.js`.

---

## Troubleshooting

### Common Issues

**Issue:** User sees data from other organizations  
**Cause:** Missing `organizationId` filter  
**Fix:** Add `where: { organizationId: req.organizationId }`

**Issue:** Quota not enforcing  
**Cause:** Missing `checkResourceQuota()` middleware  
**Fix:** Add middleware to route

**Issue:** User can't switch organizations  
**Cause:** Not a member of target organization  
**Fix:** Check `organization_members` table

---

## 🎉 You Now Have a True SAAS Template

Your application supports:

- ✅ Multiple organizations with complete isolation
- ✅ Team collaboration with role-based access
- ✅ Subscription-based pricing (4 tiers)
- ✅ Usage quotas and limits
- ✅ Billing-ready architecture

**Next:**  Deploy and start building your SAAS! See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment.
