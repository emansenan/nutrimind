# Backend SDK - AI Agents Guide

**Quick Reference for AI Agents developing with the MicroMind Backend SDK**

Version: 1.0.0 | Last Updated: February 2, 2026

---

## 📑 Table of Contents

- [Quick Start](#quick-start)
- [Documentation Index](#documentation-index)
- [SDK Architecture](#sdk-architecture)
- [Common Patterns](#common-patterns)
- [Module Reference](#module-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Import SDK

```javascript
// Import entire SDK
const SDK = require('./src/sdk');

// Or import specific items
const {
  success, created, updated, deleted,
  services,
  authenticateJWT, tenantContext,
  TenantController,
  database
} = require('./src/sdk');
```

### Basic Route Pattern

```javascript
router.post('/items',
  authenticateJWT,              // JWT auth
  tenantContext,                // Tenant scoping
  validateBody({ name: { type: 'string', required: true } }),
  async (req, res) => {
    const item = await database.createTenantScoped(
      'item',
      req.organizationId,
      req.body
    );
    return created(res, item);
  }
);
```

---

## 📚 Documentation Index

### Primary Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **SDK README** | [server/src/sdk/README.md](file:///D:/templates/MicroMind-Base-Template/server/src/sdk/README.md) | Complete SDK documentation with 100+ examples |
| **Implementation Plan** | [Implementation Plan](file:///C:/Users/Melsaied/.gemini/antigravity/brain/e4dde1c9-29ca-432c-b07c-1761c8cb33dd/backend_sdk_implementation_plan.md) | Detailed SDK architecture and design decisions |
| **Task Tracker** | [Task Tracker](file:///C:/Users/Melsaied/.gemini/antigravity/brain/e4dde1c9-29ca-432c-b07c-1761c8cb33dd/backend_sdk_task.md) | All 36 SDK files organized by phase |
| **Completion Walkthrough** | [Walkthrough](file:///C:/Users/Melsaied/.gemini/antigravity/brain/e4dde1c9-29ca-432c-b07c-1761c8cb33dd/backend_sdk_completion_walkthrough.md) | Implementation summary and statistics |

### Related Documentation

| Document | Purpose |
|----------|---------|
| [AI_AGENTS_GUIDE.md](file:///D:/templates/MicroMind-Base-Template/AI_AGENTS_GUIDE.md) | Main agents guide for the entire template |
| [SAAS.md](file:///D:/templates/MicroMind-Base-Template/SAAS.md) | Multi-tenant architecture guide |
| [BRANDING.md](file:///D:/templates/MicroMind-Base-Template/BRANDING.md) | Executive Gold theme guide |
| [V4_SDK_REFERENCE.md](file:///D:/templates/MicroMind-Base-Template/V4_SDK_REFERENCE.md) | Frontend SDK reference |

---

## 🏗️ SDK Architecture

### Module Structure

```
server/src/sdk/
├── index.js                 # Main SDK export
├── README.md               # Complete documentation
│
├── responses/              # ✅ Standardized API responses
│   ├── success.js         # Success formatters
│   ├── error.js           # Error classes
│   ├── pagination.js      # Pagination
│   └── index.js
│
├── services/              # ✅ Core backend services (9 services)
│   ├── emailService.js    # Email (SendGrid)
│   ├── fileService.js     # S3 file management
│   ├── pdfService.js      # PDF generation
│   ├── excelService.js    # Excel/CSV export
│   ├── aiService.js       # OpenAI + AI MicroMind
│   ├── importService.js   # CSV/Excel import
│   ├── sqlService.js      # Safe SQL execution
│   ├── auditService.js    # Compliance logging
│   ├── cacheService.js    # Redis/memory cache
│   └── index.js
│
├── middleware/            # ✅ Express middleware (8 middlewares)
│   ├── errorHandler.js   # Central error handler
│   ├── auth.js           # JWT authentication
│   ├── roleGuard.js      # Role-based access
│   ├── validate.js       # Request validation
│   ├── rateLimit.js      # Rate limiting
│   ├── tenantContext.js  # Tenant scoping
│   ├── quotaCheck.js     # Quota enforcement
│   ├── audit.js          # Audit logging
│   └── index.js
│
├── controllers/          # ✅ Base controllers (3 controllers)
│   ├── TenantController.js  # Tenant-scoped CRUD
│   ├── AuthController.js    # Auth patterns
│   └── BaseController.js    # Generic CRUD
│
├── validators/           # ✅ Input validation (5 modules)
│   ├── common.js        # Common field validators
│   ├── tenant.js        # Tenant validators
│   ├── subscription.js  # Subscription validators
│   ├── auth.js          # Auth validators
│   ├── sql.js           # SQL validators
│   └── index.js
│
├── database/            # ✅ Database utilities (3 modules)
│   ├── prismaHelpers.js    # Tenant-scoped queries
│   ├── transactions.js     # Transaction patterns
│   ├── pagination.js       # Pagination helpers
│   └── index.js
│
└── utils/               # ✅ Utility functions (5 modules)
    ├── stringHelpers.js    # String utilities
    ├── dateHelpers.js      # Date utilities
    ├── encryption.js       # JWT, bcrypt, crypto
    ├── permissions.js      # Permission checking
    └── subscriptionPlans.js # Plan definitions
```

### Statistics

- **Total Files:** 36
- **Total Lines:** ~3,600
- **Services:** 9
- **Middleware:** 8
- **Controllers:** 3
- **Validators:** 5 modules
- **Database Helpers:** 3 modules
- **Utilities:** 5 modules

---

## 🎯 Common Patterns

### Pattern 1: Standard CRUD Route

```javascript
const { TenantController, authenticateJWT, tenantContext } = require('./src/sdk');

class ItemController extends TenantController {
  model = 'item';
  quotaResource = 'items';
}

const itemController = new ItemController();

router.get('/items', authenticateJWT, tenantContext, itemController.index);
router.get('/items/:id', authenticateJWT, tenantContext, itemController.show);
router.post('/items', authenticateJWT, tenantContext, itemController.create);
router.patch('/items/:id', authenticateJWT, tenantContext, itemController.update);
router.delete('/items/:id', authenticateJWT, tenantContext, itemController.delete);
```

### Pattern 2: File Upload to S3

```javascript
const { services, created, BadRequestError } = require('./src/sdk');

router.post('/upload',
  authenticateJWT,
  tenantContext,
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      throw new BadRequestError('No file uploaded');
    }
    
    const { s3Path, url } = await services.file.uploadToS3(
      req.file.buffer,
      req.file.originalname,
      'documents',
      req.organizationId
    );
    
    return created(res, { s3Path, url });
  }
);
```

### Pattern 3: Email Notification

```javascript
const { services } = require('./src/sdk');

// Send invitation
await services.email.sendInvitation(
  'user@example.com',
  organization,
  inviter,
  invitationToken
);

// Send custom email
await services.email.sendEmail({
  to: user.email,
  subject: 'Welcome!',
  html: '<h1>Welcome to the platform</h1>'
});
```

### Pattern 4: Data Export (Excel/CSV)

```javascript
const { services } = require('./src/sdk');

router.get('/export',
  authenticateJWT,
  tenantContext,
  async (req, res) => {
    const items = await database.findManyTenantScoped(
      'item',
      req.organizationId
    );
    
    const buffer = await services.excel.exportToExcel(items, {
      filename: 'items-export.xlsx',
      columns: [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Status', key: 'status', width: 15 }
      ]
    });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="items.xlsx"');
    res.send(buffer);
  }
);
```

### Pattern 5: CSV/Excel Import

```javascript
const { services, success } = require('./src/sdk');

router.post('/import',
  authenticateJWT,
  tenantContext,
  requireAdmin,
  upload.single('file'),
  async (req, res) => {
    // Parse file
    const { data } = services.import.parseCSV(req.file.buffer);
    
    // Validate data
    const { valid, invalid } = services.import.validateImport(data, {
      name: { type: 'string', required: true },
      email: { type: 'email', required: true }
    });
    
    // Bulk insert
    const result = await services.import.bulkInsert(
      'customer',
      valid,
      req.organizationId
    );
    
    return success(res, {
      imported: result.inserted,
      failed: result.failed,
      invalidRows: invalid.length
    });
  }
);
```

### Pattern 6: AI Integration

```javascript
const { services } = require('./src/sdk');

// Chat with OpenAI
const { content, tokensUsed } = await services.ai.chatCompletion([
  { role: 'user', content: 'Analyze this sales data...' }
]);

// Generate report
const reportData = await fetchReportData();
const { report } = await services.ai.generateReport(
  'Create a comprehensive sales report',
  reportData,
  'markdown'
);

// Text to SQL
const { sql, explanation } = await services.ai.textToSQL(
  'Show all orders from last month',
  databaseSchema,
  req.organizationId
);
```

### Pattern 7: Audit Logging

```javascript
const { services } = require('./src/sdk');

// Log important action
await services.audit.logAction({
  userId: req.userId,
  organizationId: req.organizationId,
  action: 'USER_DELETED',
  resource: 'user',
  resourceId: deletedUserId,
  details: { email: deletedUser.email },
  ipAddress: req.ip,
  userAgent: req.get('user-agent')
});

// Get audit trail
const logs = await services.audit.getAuditTrail(
  'user',
  userId,
  req.organizationId
);
```

### Pattern 8: Caching

```javascript
const { services } = require('./src/sdk');

// Cache-aside pattern
const stats = await services.cache.getOrSet(
  `org:${req.organizationId}:stats`,
  async () => {
    return await calculateExpensiveStats(req.organizationId);
  },
  3600 // TTL: 1 hour
);

// Invalidate cache
await services.cache.invalidateOrganization(req.organizationId);
```

---

## 📖 Module Reference

### Responses

```javascript
const {
  success,      // success(res, data, message?)
  created,      // created(res, data, message?)
  updated,      // updated(res, data, message?)
  deleted,      // deleted(res, message?)
  noContent,    // noContent(res)
  paginatedSuccess // paginatedSuccess(res, {items, page, limit, total})
} = require('./src/sdk');
```

### Services

```javascript
const { services } = require('./src/sdk');

services.email      // Email service (SendGrid)
services.file       // S3 file service
services.pdf        // PDF generation
services.excel      // Excel/CSV export
services.ai         // OpenAI + AI MicroMind
services.import     // CSV/Excel import
services.sql        // Safe SQL execution
services.audit      // Audit logging
services.cache      // Redis/memory cache
```

### Middleware

```javascript
const {
  authenticateJWT,   // JWT authentication
  optionalAuth,      // Optional JWT auth
  requireRole,       // Role-based access
  requireOwner,      // Owner-only access
  requireAdmin,      // Admin+ access
  tenantContext,     // Tenant scoping
  quotaCheck,        // Quota enforcement
  validateBody,      // Body validation
  validateQuery,     // Query validation
  validateParams,    // Params validation
  rateLimit,         // Custom rate limit
  apiRateLimit,      // API rate limit (100/min)
  authRateLimit,     // Auth rate limit (5/min)
  errorHandler,      // Central error handler
  notFoundHandler,   // 404 handler
  auditMiddleware    // Auto audit logging
} = require('./src/sdk');
```

### Controllers

```javascript
const {
  TenantController,  // Base tenant-scoped controller
  AuthController,    // Base auth controller
  BaseController     // Generic CRUD controller
} = require('./src/sdk');
```

### Database

```javascript
const { database } = require('./src/sdk');

// Tenant-scoped queries
database.findManyTenantScoped(model, orgId, where?)
database.findFirstTenantScoped(model, orgId, where?)
database.createTenantScoped(model, orgId, data)
database.updateTenantScoped(model, orgId, where, data)
database.deleteTenantScoped(model, orgId, where)
database.paginateTenantScoped(model, orgId, page, limit, where?)

// Transactions
database.withTransaction(callback)
database.retryTransaction(callback, maxRetries)

// Pagination
database.buildPaginationParams(page, limit)
database.buildPaginationMeta(page, limit, total)
```

### Validators

```javascript
const { validators } = require('./src/sdk');

// Common
validators.isValidEmail(email)
validators.isValidUUID(uuid)
validators.validateLength(str, min, max)
validators.validateRequired(value, fieldName)

// Tenant
validators.tenant.validateOrganizationName(name)
validators.tenant.validateOrganizationSlug(slug)

// Subscription
validators.subscription.validateSubscriptionPlan(plan)
validators.subscription.validateQuota(usage, limit, resource)

// Auth
validators.auth.validatePassword(password)
validators.auth.validateLoginCredentials({email, password})
```

### Utilities

```javascript
const {
  stringHelpers,
  dateHelpers,
  encryption,
  permissions
} = require('./src/sdk');

// String
stringHelpers.slugify(text)
stringHelpers.truncate(text, length)
stringHelpers.maskString(text, showStart, showEnd)

// Date
dateHelpers.formatDate(date, format)
dateHelpers.timeAgo(date)
dateHelpers.addDays(date, days)

// Encryption
encryption.generateToken(payload, expiresIn)
encryption.verifyToken(token)
encryption.hashPassword(password)
encryption.comparePassword(password, hash)

// Permissions
permissions.hasPermission(user, permission)
permissions.isOrganizationOwner(user, orgId)
permissions.isOrganizationAdmin(user, orgId)
```

---

## ✅ Best Practices

### 1. Always Use Tenant Scoping

```javascript
// ✅ Good - Tenant-scoped
const items = await database.findManyTenantScoped('item', req.organizationId);

// ❌ Bad - No tenant filter
const items = await prisma.item.findMany();
```

### 2. Use Standardized Responses

```javascript
// ✅ Good - SDK response
return success(res, data, 'Retrieved successfully');

// ❌ Bad - Custom format
return res.json({ success: true, data });
```

### 3. Validate All Inputs

```javascript
// ✅ Good - Validated
router.post('/items',
  validateBody({
    name: { type: 'string', required: true, minLength: 2 }
  }),
  handler
);

// ❌ Bad - No validation
router.post('/items', handler);
```

### 4. Apply Authentication

```javascript
// ✅ Good - Auth required
router.get('/private', authenticateJWT, tenantContext, handler);

// ❌ Bad - No auth
router.get('/private', handler);
```

### 5. Use Services for Common Operations

```javascript
// ✅ Good - Use SDK service
await services.email.sendWelcome(user.email, user, organization);

// ❌ Bad - Custom implementation
const transporter = nodemailer.createTransport({...});
await transporter.sendMail({...});
```

### 6. Log Important Actions

```javascript
// ✅ Good - Audit trail
await services.audit.logAction({
  action: 'USER_DELETED',
  userId, organizationId, resourceId
});

// ❌ Bad - No audit
await prisma.user.delete({ where: { id } });
```

### 7. Cache Expensive Operations

```javascript
// ✅ Good - Cached
const stats = await services.cache.getOrSet(key, fetchData, 3600);

// ❌ Bad - Always fetch
const stats = await fetchData();
```

### 8. Handle Errors Properly

```javascript
// ✅ Good - Use SDK errors
if (!item) throw new NotFoundError('Item not found');

// ❌ Bad - Generic error
if (!item) throw new Error('Not found');
```

---

## 🔧 Troubleshooting

### Common Issues

**Issue: JWT token invalid**

```javascript
// Solution: Check JWT_SECRET in .env
JWT_SECRET=your-secret-key

// Verify token format
const token = req.headers.authorization?.split(' ')[1];
```

**Issue: Tenant data leakage**

```javascript
// Solution: Always use tenant-scoped queries
const items = await database.findManyTenantScoped(
  'item',
  req.organizationId  // ← Always pass organizationId
);
```

**Issue: File upload fails to S3**

```javascript
// Solution: Verify AWS credentials in .env
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
```

**Issue: Email not sending**

```javascript
// Solution: Check SendGrid configuration
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-key
EMAIL_FROM=noreply@example.com

// Test email service
const result = await services.email.sendEmail({
  to: 'test@example.com',
  subject: 'Test',
  html: '<p>Test email</p>'
});
```

**Issue: Cache not working**

```javascript
// Solution: Redis is optional, falls back to memory
// Check Redis connection
REDIS_HOST=localhost
REDIS_PORT=6379

// Verify cache health
const health = await services.cache.healthCheck();
console.log(health); // { healthy: true, type: 'redis'|'memory' }
```

---

## 📋 Environment Variables

```env
# ===== REQUIRED =====

# JWT & Encryption
JWT_SECRET=your-jwt-secret-key-min-32-chars
ENCRYPTION_KEY=your-encryption-key-exactly-32-chars

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db

# ===== OPTIONAL (Service-Specific) =====

# AWS S3 (for fileService)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email (for emailService)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com

# OpenAI (for aiService)
OPENAI_API_KEY=your-openai-api-key

# AI MicroMind (for aiService)
AI_MICROMIND_API_URL=http://localhost:3001
AI_MICROMIND_API_KEY=your-micromind-api-key

# Redis (for cacheService - optional, will use memory if not available)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# App
APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 🎓 Learning Resources

### Step-by-Step Guides

1. **[SDK README](file:///D:/templates/MicroMind-Base-Template/server/src/sdk/README.md)** - Start here for complete SDK documentation
2. **[Implementation Plan](file:///C:/Users/Melsaied/.gemini/antigravity/brain/e4dde1c9-29ca-432c-b07c-1761c8cb33dd/backend_sdk_implementation_plan.md)** - Understand SDK architecture
3. **[SAAS.md](file:///D:/templates/MicroMind-Base-Template/SAAS.md)** - Multi-tenant architecture
4. **[AI_AGENTS_GUIDE.md](file:///D:/templates/MicroMind-Base-Template/AI_AGENTS_GUIDE.md)** - Full template guide

### Quick Reference Cards

**Create Tenant-Scoped Route:**

```javascript
const { TenantController, authenticateJWT, tenantContext } = require('./src/sdk');
class MyController extends TenantController { model = 'myModel'; }
router.get('/items', authenticateJWT, tenantContext, new MyController().index);
```

**Send Email:**

```javascript
const { services } = require('./src/sdk');
await services.email.sendEmail({ to, subject, html });
```

**Upload File:**

```javascript
const { services } = require('./src/sdk');
const { s3Path, url } = await services.file.uploadToS3(buffer, filename, folder, orgId);
```

**Export Data:**

```javascript
const { services } = require('./src/sdk');
const buffer = await services.excel.exportToExcel(data, { filename: 'export.xlsx' });
```

**Import Data:**

```javascript
const { services } = require('./src/sdk');
const { data } = services.import.parseCSV(fileBuffer);
const { valid } = services.import.validateImport(data, schema);
await services.import.bulkInsert('model', valid, orgId);
```

---

## 🚦 Quick Decision Tree

**Need to create a new route?**
→ Extend `TenantController` for tenant-scoped resources  
→ Extend `BaseController` for non-tenant resources  
→ Use plain Express for custom logic

**Need to send an email?**
→ Use `services.email`

**Need to upload/download files?**
→ Use `services.file` (S3)

**Need to export data?**
→ Use `services.excel` for Excel/CSV

**Need to import data?**
→ Use `services.import` for CSV/Excel parsing + validation

**Need to generate PDFs?**
→ Use `services.pdf`

**Need AI features?**
→ Use `services.ai` (OpenAI + AI MicroMind)

**Need to execute SQL?**
→ Use `services.sql` (safe, tenant-scoped)

**Need audit logging?**
→ Use `services.audit`

**Need caching?**
→ Use `services.cache` (Redis/memory)

**Need authentication?**
→ Use `authenticateJWT` middleware

**Need authorization?**
→ Use `requireRole`, `requireOwner`, `requireAdmin`

**Need validation?**
→ Use `validateBody`, `validateQuery`, `validateParams`

**Need rate limiting?**
→ Use `rateLimit`, `apiRateLimit`, `authRateLimit`

---

## 📞 Support & Resources

### Primary Documentation

- **[SDK README](file:///D:/templates/MicroMind-Base-Template/server/src/sdk/README.md)** - Complete SDK docs (900+ lines)
- **[Implementation Plan](file:///C:/Users/Melsaied/.gemini/antigravity/brain/e4dde1c9-29ca-432c-b07c-1761c8cb33dd/backend_sdk_implementation_plan.md)** - Architecture & design
- **[Completion Walkthrough](file:///C:/Users/Melsaied/.gemini/antigravity/brain/e4dde1c9-29ca-432c-b07c-1761c8cb33dd/backend_sdk_completion_walkthrough.md)** - Implementation summary

### Related Guides

- **[AI_AGENTS_GUIDE.md](file:///D:/templates/MicroMind-Base-Template/AI_AGENTS_GUIDE.md)** - Main template guide
- **[SAAS.md](file:///D:/templates/MicroMind-Base-Template/SAAS.md)** - Multi-tenant guide
- **[V4_SDK_REFERENCE.md](file:///D:/templates/MicroMind-Base-Template/V4_SDK_REFERENCE.md)** - Frontend SDK

### File Locations

- **SDK Source:** `server/src/sdk/`
- **SDK Documentation:** `server/src/sdk/README.md`
- **Main Export:** `server/src/sdk/index.js`

---

**Built for AI Agents** | **Version 1.0.0** | **Last Updated: February 2, 2026**
