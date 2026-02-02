# MicroMind Backend SDK

**Production-ready utilities, services, and patterns for backend development**

Version: 1.0.0 | License: MIT

---

## 📚 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Modules](#core-modules)
  - [Responses](#responses)
  - [Services](#services)
  - [Middleware](#middleware)
  - [Controllers](#controllers)
  - [Validators](#validators)
  - [Database](#database)
  - [Utilities](#utilities)
- [Examples](#examples)
- [Best Practices](#best-practices)

---

## Overview

The MicroMind Backend SDK is a comprehensive collection of production-ready utilities, services, and patterns designed for the MicroMind SAAS Base Template. It provides:

✅ **Standardized Response Formats** - Success, error, pagination  
✅ **Multi-Tenant Support** - Automatic organization scoping
  
✅ **Advanced Services** - AI, Email, PDF, Excel, File (S3), Import, SQL, Audit, Cache  
✅ **Authentication & Authorization** - JWT, roles, permissions  
✅ **Database Helpers** - Prisma utilities, transactions, pagination  
✅ **Validation** - Request validation, SQL safety, tenant checks

---

## Installation

The SDK is already included in your template. Simply import it:

```javascript
const SDK = require('./sdk');
// Or import specific modules
const { success, services, authenticateJWT } = require('./sdk');
```

---

## Quick Start

### 1. Basic Route with SDK

```javascript
const express = require('express');
const { success, authenticateJWT, validateBody } = require('./sdk');

const router = express.Router();

router.post('/items',
  authenticateJWT,
  validateBody({
    name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
    quantity: { type: 'number', required: true, min: 1 }
  }),
  async (req, res) => {
    const item = await prisma.item.create({
      data: req.body
    });
    
    return success(res, item, 'Item created successfully');
  }
);
```

### 2. Tenant-Scoped Route

```javascript
const { TenantController, authenticateJWT, tenantContext } = require('./sdk');

class ItemController extends TenantController {
  model = 'item';
  quotaResource = 'items';
}

const itemController = new ItemController();

router.get('/items',
  authenticateJWT,
  tenantContext,
  itemController.index
);
```

### 3. Using Services

```javascript
const { services } = require('./sdk');

// Send email
await services.email.sendInvitation(
  'user@example.com',
  organization,
  inviter,
  token
);

// Upload to S3
const result = await services.file.uploadToS3(
  fileBuffer,
  'document.pdf',
  'documents',
  organizationId
);

// Generate PDF
const pdfBuffer = await services.pdf.generateReport(
  reportData,
  'sales',
  organizationId
);

// Export to Excel
const excelBuffer = await services.excel.exportToExcel(
  data,
  { filename: 'export.xlsx' }
);
```

---

## Core Modules

### Responses

Standardized response formatters for consistency.

```javascript
const { success, created, updated, deleted, notFound } = require('./sdk');

// Success with data
return success(res, { items: [...] }, 'Data retrieved');

// Created resource
return created(res, newItem, 'Item created');

// Updated resource
return updated(res, updatedItem);

// Deleted resource
return deleted(res, 'Item deleted');

// Not found
return notFound(res, 'Item not found');

// Paginated response
const { paginatedSuccess } = require('./sdk');
return paginatedSuccess(res, {
  items,
  page: 1,
  limit: 10,
  total: 100
});
```

### Services

#### Email Service

```javascript
const { email } = require('./sdk').services;

// Send invitation
await email.sendInvitation(email, org, inviter, token);

// Send welcome
await email.sendWelcome(email, user, org);

// Send password reset
await email.sendPasswordReset(email, token, expiresAt);

// Custom email
await email.sendEmail({
  to: 'user@example.com',
  subject: 'Subject',
  html: '<p>Content</p>',
  text: 'Content'
});
```

#### File Service (S3)

```javascript
const { file } = require('./sdk').services;

// Upload file
const { s3Path, url } = await file.uploadToS3(
  fileBuffer,
  'filename.pdf',
  'documents',
  organizationId,
  { contentType: 'application/pdf' }
);

// Get presigned URL (for private files)
const { signedUrl, expiresAt } = await file.getPresignedUrl(s3Path, 3600);

// Download file
const buffer = await file.downloadFromS3(s3Path);

// Delete file
await file.deleteFromS3(s3Path);

// List files
const { files, totalSize } = await file.listFiles(organizationId, 'documents');
```

#### PDF Service

```javascript
const { pdf } = require('./sdk').services;

// Generate PDF from HTML
const pdfBuffer = await pdf.generatePDF('<h1>Report</h1>');

// Generate report
const reportPDF = await pdf.generateReport(data, 'sales', organizationId);

// Generate invoice
const invoicePDF = await pdf.generateInvoice(subscription, organization);
```

#### Excel Service

```javascript
const { excel } = require('./sdk').services;

// Export to Excel
const buffer = await excel.exportToExcel(data, {
  filename: 'export.xlsx',
  sheetName: 'Data',
  columns: [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Email', key: 'email', width: 30 }
  ]
});

// Export to CSV
const csvContent = excel.exportToCSV(data);

// Multi-sheet workbook
const workbook = await excel.exportMultiSheet([
  { name: 'Users', data: users },
  { name: 'Orders', data: orders }
]);
```

#### AI Service

```javascript
const { ai } = require('./sdk').services;

// Chat completion
const { content, tokensUsed } = await ai.chatCompletion([
  { role: 'user', content: 'Analyze this data...' }
]);

// Generate embeddings
const { vector } = await ai.generateEmbeddings('Some text');

// Text to SQL
const { sql, explanation } = await ai.textToSQL(
  'Show all customers from last month',
  schema,
  organizationId
);

// Call AI MicroMind
const result = await ai.callMicroMind('/predict', payload, organizationId);
```

#### Import Service

```javascript
const { import: importService } = require('./sdk').services;

// Parse CSV
const { data, headers } = importService.parseCSV(fileBuffer);

// Parse Excel
const { sheets } = importService.parseExcel(fileBuffer);

// Validate data
const { valid, invalid } = importService.validateImport(data, {
  email: { type: 'email', required: true },
  name: { type: 'string', required: true }
});

// Bulk insert
const { inserted, failed } = await importService.bulkInsert(
  'user',
  valid,
  organizationId
);

// Preview import
const { preview, totalRows } = importService.previewImport(fileBuffer, 10);
```

#### SQL Service

```javascript
const { sql } = require('./sdk').services;

// Execute safe query
const results = await sql.executeQuery(
  'SELECT * FROM "User" WHERE "organizationId" = $1',
  organizationId
);

// Aggregation
const stats = await sql.executeAggregation('Order', {
  groupBy: ['status'],
  metrics: [
    { function: 'COUNT', field: '*', alias: 'count' },
    { function: 'SUM', field: 'total', alias: 'revenue' }
  ]
}, organizationId);

// Time series
const timeSeries = await sql.executeTimeSeriesQuery('Order', {
  dateField: 'createdAt',
  groupBy: 'day',
  metrics: [{ function: 'COUNT', field: '*', alias: 'orders' }],
  startDate: '2024-01-01',
  endDate: '2024-12-31'
}, organizationId);
```

#### Audit Service

```javascript
const { audit } = require('./sdk').services;

// Log action
await audit.logAction({
  userId,
  organizationId,
  action: 'USER_CREATED',
  resource: 'user',
  resourceId: newUserId,
  details: { email: user.email },
  ipAddress: req.ip,
  userAgent: req.get('user-agent')
});

// Log data change
await audit.logDataChange({
  userId,
  organizationId,
  table: 'User',
  recordId: userId,
  operation: 'UPDATE',
  before: oldData,
  after: newData
});

// Get audit trail
const logs = await audit.getAuditTrail('user', userId, organizationId);

// Generate compliance report
const report = await audit.generateComplianceReport(organizationId, {
  startDate: '2024-01-01',
  endDate: '2024-12-31'
});
```

#### Cache Service

```javascript
const { cache } = require('./sdk').services;

// Get/Set
await cache.set('key', value, 3600); // TTL in seconds
const value = await cache.get('key');

// Get or set (cache-aside)
const data = await cache.getOrSet('key', async () => {
  return fetchDataFromDB();
}, 3600);

// Delete
await cache.del('key');

// Clear pattern
await cache.clear('user:*');

// Invalidate organization cache
await cache.invalidateOrganization(organizationId);

// Build key
const key = cache.buildKey(organizationId, 'users', userId);

// Health check
const { healthy, type, latency } = await cache.healthCheck();
```

### Middleware

```javascript
const {
  authenticateJWT,
  optionalAuth,
  requireRole,
  requireOwner,
  requireAdmin,
  tenantContext,
  quotaCheck,
  validateBody,
  validateQuery,
  rateLimit,
  apiRateLimit,
  authRateLimit,
  errorHandler,
  not FoundHandler,
  auditMiddleware
} = require('./sdk');

// Authentication
router.get('/protected', authenticateJWT, handler);
router.get('/public', optionalAuth, handler);

// Authorization
router.post('/settings', authenticateJWT, tenantContext, requireAdmin, handler);

// Validation
router.post('/users', validateBody({
  email: { type: 'email', required: true },
  name: { type: 'string', minLength: 2 }
}), handler);

// Rate limiting
router.post('/api/heavy', rateLimit({ max: 10, windowMs: 60000 }), handler);
router.post('/login', authRateLimit(), handler);

// Multi-tenancy
router.get('/data', authenticateJWT, tenantContext, handler);

// Quota enforcement
router.post('/items', authenticateJWT, tenantContext, quotaCheck('items'), handler);

// Global middleware
app.use(auditMiddleware);
app.use(errorHandler);
app.use(notFoundHandler);
```

### Controllers

```javascript
const { TenantController, AuthController, BaseController } = require('./sdk');

// Tenant-scoped controller
class DashboardController extends TenantController {
  model = 'dashboard';
  quotaResource = 'dashboards';
}

// Auth controller
class MyAuthController extends AuthController {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  
  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
  
  generateToken(user) {
    return  jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  }
  
  async findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }
  
  async createUser(data) {
    return prisma.user.create({ data });
  }
}

// Generic controller
const userController = new BaseController('user');
router.get('/users', userController.list);
router.get('/users/:id', userController.get);
```

### Validators

```javascript
const { validators } = require('./sdk');

// Common validators
validators.isValidEmail('test@example.com');
validators.isValidUUID('123e4567-e89b-12d3-a456-426614174000');
validators.validateLength('text', 2, 100);
validators.validateRequired(value, 'Field name');
validators.validateEnum(value, ['A', 'B', 'C']);

// Tenant validators
validators.tenant.validateOrganizationName(name);
validators.tenant.validateOrganizationSlug(slug);

// Subscription validators
validators.subscription.validateSubscriptionPlan('PRO');
validators.subscription.validateQuota(usage, limit, 'dashboards');

// Auth validators
validators.validatePassword(password);
validators.validateLoginCredentials({ email, password });
```

### Database

```javascript
const { database } = require('./sdk');

// Tenant-scoped queries
const items = await database.findManyTenantScoped(
  'item',
  organizationId,
  { status: 'active' }
);

const item = await database.findFirstTenantScoped(
  'item',
  organizationId,
  { id: itemId }
);

await database.createTenantScoped('item', organizationId, itemData);

// Pagination
const { items, total, hasNext } = await database.paginateTenantScoped(
  'item',
  organizationId,
  page,
  limit
);

// Transactions
const result = await database.withTransaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  const profile = await tx.profile.create({ data: { userId: user.id } });
  return { user, profile };
});
```

### Utilities

```javascript
const { stringHelpers, dateHelpers, encryption, permissions } = require('./sdk');

// String utilities
stringHelpers.slugify('Hello World'); // 'hello-world'
stringHelpers.truncate('Long text...', 10);
stringHelpers.maskString('sensitive@email.com', 2, 4); // 'se*******.com'
stringHelpers.formatBytes(1024); // '1 KB'

// Date utilities
dateHelpers.formatDate(new Date(), 'long');
dateHelpers.timeAgo(pastDate); // '2 hours ago'
dateHelpers.addDays(new Date(), 7);
dateHelpers.getDateRange('last30days');

// Encryption
const token = encryption.generateToken({ userId: '123' }, '7d');
const decoded = encryption.verifyToken(token);
const hash = await encryption.hashPassword('password');
const valid = await encryption.comparePassword('password', hash);

// Permissions
permissions.hasPermission(user, 'users:create');
permissions.isOrganizationOwner(user, organizationId);
permissions.isOrganizationAdmin(user, organizationId);
```

---

## Examples

### Complete API Endpoint

```javascript
const express = require('express');
const {
  success,
  created,
  authenticateJWT,
  tenantContext,
  requireAdmin,
  validateBody,
  quotaCheck,
  services,
  database
} = require('./sdk');

const router = express.Router();

// List items (paginated, tenant-scoped)
router.get('/items',
  authenticateJWT,
  tenantContext,
  async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const result = await database.paginateTenantScoped(
      'item',
      req.organizationId,
      page,
      limit
    );
    
    return success(res, result);
  }
);

// Create item (with validation, quota check, audit)
router.post('/items',
  authenticateJWT,
  tenantContext,
  requireAdmin,
  quotaCheck('items'),
  validateBody({
    name: { type: 'string', required: true, minLength: 2 },
    description: { type: 'string', maxLength: 500 }
  }),
  async (req, res) => {
    const item = await database.createTenantScoped(
      'item',
      req.organizationId,
      req.body
    );
    
    // Log action
    await services.audit.logAction({
      userId: req.userId,
      organizationId: req.organizationId,
      action: 'ITEM_CREATED',
      resource: 'item',
      resourceId: item.id
    });
    
    return created(res, item);
  }
);

module.exports = router;
```

---

## Best Practices

### 1. Always Use Tenant Scoping

```javascript
// ✅ Good
const items = await database.findManyTenantScoped('item', organizationId);

// ❌ Bad
const items = await prisma.item.findMany(); // No tenant filter!
```

### 2. Use Response Formatters

```javascript
// ✅ Good
return success(res, data, 'Success message');

// ❌ Bad
return res.json({ data }); // Inconsistent format
```

### 3. Validate All Inputs

```javascript
// ✅ Good
router.post('/items', validateBody({ name: { type: 'string', required: true } }), handler);

// ❌ Bad
router.post('/items', handler); // No validation
```

### 4. Log Important Actions

```javascript
// ✅ Good
await services.audit.logAction({ action: 'USER_DELETED', ... });

// ❌ Bad
// No audit trail
```

### 5. Use Caching for Expensive Operations

```javascript
// ✅ Good
const data = await services.cache.getOrSet('key', fetchData, 3600);

// ❌ Bad
const data = await fetchData(); // Always fetch
```

---

## Environment Variables

Add these to your `.env` file:

```env
# JWT
JWT_SECRET=your-secret-key
ENCRYPTION_KEY=your-32-char-encryption-key

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email (SendGrid)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@example.com

# OpenAI
OPENAI_API_KEY=your-openai-key

# AI MicroMind
AI_MICROMIND_API_URL=http://localhost:3001
AI_MICROMIND_API_KEY=your-api-key

# Redis (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# App
APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## Support

For issues, feature requests, or questions, please refer to:

- [AI_AGENTS_GUIDE.md](../../AI_AGENTS_GUIDE.md) - Complete AI agent documentation
- [SAAS.md](../../SAAS.md) - Multi-tenant architecture guide
- [V4_SDK_REFERENCE.md](../../V4_SDK_REFERENCE.md) - Frontend SDK reference

---

**Built with ❤️ for the MicroMind SAAS Template**
