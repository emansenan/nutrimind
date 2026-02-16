# 🤖 AI Agents Guide - MicroMind Base SAAS Template

**Complete documentation index and quick-start guide for AI coding agents working with this template.**

---

## 📋 Quick Reference

This template is a **production-ready multi-tenant SAAS platform** with authentication, analytics, AI services, team collaboration, and subscription management.

**Template Location:** `D:\templates\MicroMind-Base-Template\`

---

## 📚 Complete Documentation Index

### 1. **README.md** - Start Here! ⭐

**Purpose:** Project overview, quick start, features summary  
**Location:** `/README.md`  
**Size:** ~350 lines

**Key Sections:**

- ✨ Features overview (8 major features)
- 🚀 Quick start (6 steps)
- 📁 Project structure
- 🗄️ Database schema summary
- 🎨 V4 SDK component library (16 components)
- 🌐 Multi-language support (5 languages)
- 🔑 Default credentials
- 🛠️ Available npm scripts

**Read this first to understand what the template includes!**

---

### 2. **SETUP.md** - Detailed Installation Guide

**Purpose:** Step-by-step setup with troubleshooting  
**Location:** `/SETUP.md`  
**Size:** ~450 lines

**Key Sections:**

- 📋 Prerequisites (Node.js, PostgreSQL, etc.)
- 🚀 8-step setup process
  - Clone repository
  - Install dependencies
  - PostgreSQL setup (local & Docker)
  - Environment configuration
  - Database initialization (Prisma)
  - Seed demo data
  - Start dev servers
  - Access application
- ✅ Verification checklist
- 🔧 Troubleshooting (6 common issues)
- 📚 Useful commands (dev & database)

**Use this when setting up the template for development!**

---

### 3. **BRANDING.md** - Customization Guide ⭐

**Purpose:** How to rebrand/customize the template  
**Location:** `/BRANDING.md`  
**Size:** ~500 lines

**Key Sections:**

1. **Changing Logos** (sidebar, login, favicon)
2. **Updating Color Scheme** (4 example palettes)
3. **Customizing Typography** (Google Fonts)
4. **Theme Configuration** (Tailwind config)
5. **Application Name & Metadata**
6. **Favicon & Browser Tab**
7. **Quick Checklist** (10-step branding guide)

**Color Scheme Examples Included:**

- 🟢 Corporate Green
- 🟣 Purple Innovation
- 🟠 Vibrant Orange
- 🔵 Professional Teal

**Use this when customizing the template for a new client/project!**

---

### 4. **DEPLOYMENT.md** - Production Deployment

**Purpose:** Deploy to production (multiple hosting options)  
**Location:** `/DEPLOYMENT.md`  
**Size:** ~550 lines

**Key Sections:**

- 📋 Production checklist
- 🌐 **4 Deployment Options:**
  1. **Vercel + Railway** (recommended for quick start)
  2. **AWS** (full stack - EC2, RDS, S3, CloudFront)
  3. **Digital Ocean** (App Platform)
  4. **Self-Hosted VPS** (maximum control)
- 🔒 Security best practices
- 📊 Monitoring setup
- 🔄 CI/CD pipeline (GitHub Actions)
- 💾 Backup strategy
- 📈 Scaling considerations
- ✅ Post-deployment checklist

**Use this when deploying to production!**

---

### 5. **SAAS.md** - Multi-Tenant SAAS Guide ⭐⭐⭐

**Purpose:** Comprehensive multi-tenancy architecture & implementation  
**Location:** `/SAAS.md`  
**Size:** ~900 lines

**THIS IS THE MOST IMPORTANT DOCUMENT FOR UNDERSTANDING THE SAAS ARCHITECTURE!**

**Key Sections:**

1. **Multi-Tenancy Architecture** - How it works
2. **Database Schema** - All 10 models explained
3. **Data Isolation** - Automatic tenant scoping
4. **Subscription Plans** - 4 tiers (FREE, STARTER, PRO, ENTERPRISE)
5. **Usage Quotas** - 6 resource types with limits
6. **Tenant Onboarding** - Organization creation flow
7. **Team Management** - Roles & permissions (OWNER, ADMIN, MEMBER, VIEWER)
8. **Billing Integration** - Stripe-ready architecture
9. **Testing Multi-Tenancy** - Manual & automated tests
10. **Best Practices** - Do's & Don'ts
11. **Customization Examples** - Add quotas, roles, etc.
12. **Troubleshooting** - Common issues & fixes

**Critical Concepts:**

- Every tenant-scoped model has `organizationId`
- Middleware automatically scopes queries
- Quota enforcement via middleware
- 4 organizational roles with hierarchy

**Use this when:**

- Building multi-tenant features
- Understanding data isolation
- Implementing subscription logic
- Managing team permissions
- Troubleshooting tenant issues

---

### 6. **V4_SDK_REFERENCE.md** - Frontend Component Guide ⭐⭐

**Purpose:** Complete reference for V4 SDK components  
**Location:** `/V4_SDK_REFERENCE.md`  
**Size:** ~600 lines

**THIS IS THE MOST IMPORTANT DOCUMENT FOR BUILDING THE FRONTEND!**

**Key Sections:**

1. **Component Props** - All props for each component
2. **Usage Examples** - Real code examples for each component
3. **Executive Gold Theme** - Color palette & theme variables
4. **Common UI Patterns** - Form, list, settings patterns
5. **Internationalization** - Using i18n with SDK
6. **Best Practices** - Do's & Don'ts with code
7. **Responsive Design** - Mobile-friendly patterns
8. **Customization** - Override component styles
9. **Troubleshooting** - Common issues & fixes
10. **Import Reference** - All components listed

**Covers All 12 Components:**

- Form: MMButton, MMInput, MMSelect, MMTextarea, MMCheckbox, MMSwitch
- Display: MMCard, MMBadge, MMTable, MMPagination, MMSearch
- Utility: MMFilterBar

**Use this when:**

- Building new pages/components
- Understanding component props
- Learning the Executive Gold theme
- Implementing forms, lists, tables
- Troubleshooting UI issues
- Customizing SDK components

---

## 🏗️ Architecture Overview

### Tech Stack

**Frontend:**

- React 18
- Vite 5 (build tool)
- Tailwind CSS v4 (styling)
- i18next (internationalization)
- Lucide React (icons)

**Backend:**

- Node.js + Express
- Prisma ORM
- PostgreSQL 14+
- JWT authentication
- bcrypt (password hashing)

**AI Services:**

- OpenAI integration ready
- AI Co-Pilot system
- Report generation bot
- Chart.js for visualizations

---

## 📁 Project Structure

```
MicroMind-Base-Template/
├── client/                     # React Frontend
│   ├── public/
│   │   └── assets/            # Logos, favicons
│   ├── src/
│   │   ├── sdk/               # V4 SDK (16 components)
│   │   │   ├── components/    # MMButton, MMCard, MMSelect, etc.
│   │   │   ├── modules/       # MMMap, MMChart, MMDataTable
│   │   │   └── styles/        # Executive Gold theme
│   │   ├── components/        # App components (9 files)
│   │   │   ├── AIAgentChat.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── ManagerLayout.jsx
│   │   │   ├── OfflineBanner.jsx
│   │   │   ├── OrganizationSwitcher.jsx  # ← Multi-tenant!
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ReportsExplorer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── CustomSelect.jsx
│   │   ├── pages/             # Pages (8 files)
│   │   │   ├── HomePage.jsx
│   │   │   ├── CoPilotsPage.jsx
│   │   │   ├── DashboardsPage.jsx
│   │   │   ├── DocumentsLibrary.jsx
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── ReportBotPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── services/          # API services
│   │   │   ├── authService.js
│   │   │   └── managerService.js
│   │   ├── locales/           # Translations (5 languages)
│   │   │   ├── en.json        # English
│   │   │   ├── ar.json        # Arabic (RTL)
│   │   │   ├── fr.json        # French
│   │   │   ├── de.json        # German
│   │   │   └── sw.json        # Swahili
│   │   ├── App.jsx            # Routes + lazy loading
│   │   ├── main.jsx           # Entry point
│   │   ├── index.css          # Theme CSS
│   │   └── i18n.js            # i18n config
│   ├── index.html
│   ├── tailwind.config.js     # Tailwind v4
│   ├── vite.config.js         # Vite config
│   ├── postcss.config.js
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── index.js           # Express server
│   │   ├── middleware/        # Middleware
│   │   │   ├── tenantContext.js     # ← Multi-tenant!
│   │   │   └── quotaCheck.js        # ← Subscription limits!
│   │   └── utils/
│   │       └── subscriptionPlans.js  # ← Plan definitions!
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema (10 models)
│   │   └── seed.js            # Demo data (2 organizations)
│   ├── .env                   # Environment variables (dev)
│   ├── .env.example           # Template
│   └── package.json
│
├── README.md                  # ⭐ Project overview
├── BRANDING.md                # ⭐ Customization guide
├── SETUP.md                   # ⭐ Installation guide
├── DEPLOYMENT.md              # ⭐ Production deployment
├── SAAS.md                    # ⭐⭐⭐ Multi-tenancy guide
├── .gitignore
└── task.md (artifact)         # Development tracking
```

---

## 🗄️ Database Schema Summary

**10 Models | 5 Enums**

### Multi-Tenant SAAS Models

1. **Organization** - Primary tenant entity
   - `id`, `name`, `slug` (URL-safe), `logo`, `settings`
   - Relations: members, subscription, dashboards, reports, documents

2. **OrganizationMember** - User-to-organization mapping
   - `organizationId`, `userId`, `role` (OrgRole enum)
   - Unique constraint: one membership per user per org

3. **Subscription** - Subscription management
   - `organizationId`, `plan` (enum), `status` (enum)
   - `currentPeriodStart`, `currentPeriodEnd`
   - Stripe fields: `stripeCustomerId`, `stripeSubscriptionId`

4. **Invitation** - Team invitations
   - `organizationId`, `email`, `role`, `token`, `expiresAt`

### Core Models

1. **User** - User accounts
   - `email`, `passwordHash`, `displayName`, `role` (UserRole)
   - `currentOrganizationId` (current active org)
   - Relations: sessions, memberships, dashboards, reports

2. **Session** - JWT sessions
   - `userId`, `token`, `expiresAt`

3. **Dashboard** - SQL analytics dashboards
   - `organizationId` 🔒, `userId`, `title`, `sqlQuery`, `chartConfig`

4. **Report** - Generated reports
   - `organizationId` 🔒, `userId`, `title`, `content`, `s3Path`

5. **Document** - Document management
   - `organizationId` 🔒, `title`, `fileType`, `s3Path`, `tags`

6. **ChatHistory** - AI chat logs
    - `organizationId` 🔒, `userId`, `agentType`, `message`, `response`

**🔒 = Tenant-scoped** (automatic data isolation)

### Enums

1. **UserRole:** `ADMIN` | `MANAGER` | `USER` | `VIEWER`
2. **OrgRole:** `OWNER` | `ADMIN` | `MEMBER` | `VIEWER`
3. **SubscriptionPlan:** `FREE` | `STARTER` | `PRO` | `ENTERPRISE`
4. **SubscriptionStatus:** `ACTIVE` | `PAST_DUE` | `CANCELED` | `TRIALING`
5. **DocumentType:** `PDF` | `IMAGE` | `VIDEO` | `AUDIO` | `SPREADSHEET` | `DOCUMENT` | `OTHER`

**See [SAAS.md](./SAAS.md) for complete schema details!**

---

## 💡 Quick Start for AI Agents

### When Starting a New Feature

1. **Read [README.md](./README.md)** - Understand what exists
2. **Read [SAAS.md](./SAAS.md)** - Understand multi-tenancy
3. **Check if multi-tenant:**
   - Yes → Add `organizationId` to your model
   - Yes → Use `tenantContext` middleware
   - Yes → Filter all queries by `organizationId`
4. **Check if quota-limited:**
   - Yes → Add quota to `subscriptionPlans.js`
   - Yes → Use `checkResourceQuota()` middleware
5. **Update documentation** when done

### When Customizing Branding

1. **Read [BRANDING.md](./BRANDING.md)**
2. **Follow the 10-step checklist**
3. **Use provided color scheme examples**

### When Deploying

1. **Read [DEPLOYMENT.md](./DEPLOYMENT.md)**
2. **Choose deployment option** (Vercel, AWS, DO, VPS)
3. **Follow security checklist**
4. **Set up monitoring**

### When Troubleshooting

1. **Check [SETUP.md](./SETUP.md)** - 6 common issues
2. **Check [SAAS.md](./SAAS.md)** - Multi-tenancy issues
3. **Verify environment variables**
4. **Check database connection**

---

## 🎨 V4 SDK Component Library

**16 Premium Components** in `client/src/sdk/components/`

> 📘 **For complete component reference with props, examples, and patterns:**  
> **See [V4_SDK_REFERENCE.md](./V4_SDK_REFERENCE.md)** - Comprehensive 600+ line guide!

### Quick Component Overview

#### Form Components (7)

- **MMButton** - Interactive buttons with 4 variants (gold, glass, danger, ghost), loading states, icons
- **MMInput** - Text inputs with validation, error display, leading icons
- **MMSelect** - Dropdown selects with search functionality
- **MMTextarea** - Multi-line text input with error handling
- **MMCheckbox** - Checkbox with labels
- **MMSwitch** - Toggle switches for boolean values
- **MMDatePicker** - Date selection (coming soon)

#### Display Components (5)

- **MMCard** - Container cards with glassmorphism effect
- **MMBadge** - Status indicators (success, warning, danger, info)
- **MMTable** - Sortable data tables
- **MMPagination** - Pagination controls with page info
- **MMSearch** - Search input with icons

#### Utility Components (4)

- **MMFilterBar** - Filter chips/tags
- **MMStats** - KPI statistics display (coming soon)
- **MMAvatarGroup** - User avatar groups (coming soon)
- **MMProgressBar** - Progress indicators (coming soon)

### Quick Start Example

```jsx
import { MMCard, MMButton, MMInput, MMBadge } from './sdk/components';
import { Save } from 'lucide-react';

function QuickExample() {
  return (
    <MMCard title="Create Dashboard" subtitle="Fill in the details">
      <MMInput
        label="Dashboard Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <MMBadge variant="success">Active</MMBadge>
      
      <MMButton variant="gold" icon={<Save size={16} />}>
        Save Dashboard
      </MMButton>
    </MMCard>
  );
}
```

### Theme & Styling

**Executive Gold Theme**

- Primary Color: `#E0AA3E` (Executive Gold)
- Dark Background: `#0F0F0F` (Deep Night)
- Surface: `#1C1C1C` with glassmorphism
- Supports dark/light modes via `data-theme` attribute

**Theme Variables in:** `client/src/sdk/styles/theme.css`

```css
/* Use theme variables in your custom CSS */
.my-component {
  color: var(--text-primary);
  background: var(--bg-surface);
  border: 1px solid var(--border);
}
```

### Component Best Practices for AI Agents

**✅ Always:**

1. Use SDK components instead of native HTML elements
2. Import from `./sdk/components/ComponentName`
3. Use theme variables (`var(--text-primary)`) for colors
4. Include Lucide icons for better UX
5. Add i18n keys for multi-language support

**❌ Never:**

1. Style components with hardcoded colors
2. Create custom buttons/inputs when SDK has them
3. Mix with other UI libraries
4. Ignore loading/error states

**📘 For detailed props, patterns, and examples:**  
**→ [V4_SDK_REFERENCE.md](./V4_SDK_REFERENCE.md)**

---

## 🌐 Multi-Language Support

**5 Languages Supported:**

- 🇬🇧 English (`en.json`)
- 🇸🇦 Arabic (`ar.json`) - RTL layout
- 🇫🇷 French (`fr.json`)
- 🇩🇪 German (`de.json`)
- 🇰🇪 Swahili (`sw.json`)

**Adding a new language:**

1. Create `client/src/locales/{code}.json`
2. Copy structure from `en.json`
3. Translate all keys
4. Add to `i18n.js` resources
5. Test with `<LanguageSwitcher />`

---

## 🔐 Authentication & Authorization

### User Roles (Application-Level)

- `ADMIN` - System administrator
- `MANAGER` - Manager access
- `USER` - Regular user
- `VIEWER` - Read-only

### Organization Roles (Tenant-Level)

- `OWNER` - Full control, billing, delete org
- `ADMIN` - Admin access, invite members
- `MEMBER` - Regular member
- `VIEWER` - Read-only access

**Role Hierarchy:**  
`OWNER > ADMIN > MEMBER > VIEWER`

**Middleware:** `requireOrgRole(minRole)`

---

## 💳 Subscription Plans

| Plan | Price/Mo | Members | Dashboards | Reports/Mo | Storage | Chat/Mo |
|------|----------|---------|------------|------------|---------|---------|
| FREE | $0 | 3 | 5 | 10 | 100MB | 100 |
| STARTER | $29 | 10 | 25 | 100 | 10GB | 1,000 |
| PRO | $99 | 50 | ∞ | ∞ | 100GB | ∞ |
| ENTERPRISE | Custom | ∞ | ∞ | ∞ | ∞ | ∞ |

**Quota Enforcement:** Automatic via `checkResourceQuota()` middleware

**See [SAAS.md](./SAAS.md) Section 5 for quota customization!**

---

## 🚨 Critical Multi-Tenancy Rules for AI Agents

### ✅ ALWAYS Do

```javascript
// 1. Filter by organizationId
const dashboards = await prisma.dashboard.findMany({
  where: { organizationId: req.organizationId }  // ✅
});

// 2. Use middleware
router.get('/dashboards',
  tenantContext,        // ✅ Extract organization
  requireOrgAccess,     // ✅ Ensure org selected
  async (req, res) => { ... }
);

// 3. Check quotas before creation
router.post('/dashboards',
  checkResourceQuota('dashboards'),  // ✅
  async (req, res) => { ... }
);

// 4. Include organizationId when creating
await prisma.dashboard.create({
  data: {
    organizationId: req.organizationId,  // ✅
    title: 'Dashboard',
    // ...
  }
});
```

### ❌ NEVER Do

```javascript
// ❌ DON'T query without organizationId filter
const dashboards = await prisma.dashboard.findMany();  // ❌ Exposes all orgs!

// ❌ DON'T trust client-provided organizationId
const orgId = req.body.organizationId;  // ❌ Security risk!
// Always use: req.organizationId (from middleware)

// ❌ DON'T skip quota checks
router.post('/dashboards', async (req, res) => {  // ❌ No quota!
  // User can exceed limits
});

// ❌ DON'T allow changing organizationId
await prisma.dashboard.update({
  where: { id },
  data: {
    organizationId: newOrgId  // ❌ Data leak!
  }
});
```

**See [SAAS.md](./SAAS.md) Section 10 for complete best practices!**

---

## 📝 Demo Data (After Seed)

**Organization 1: Acme Corporation (PRO Plan)**

- Owner: `admin@acme.com` / `admin123`
- Member: `user@acme.com` / `user123`
- Subscription: PRO (unlimited)
- Data: 1 dashboard, 1 document

**Organization 2: MicroMind Labs (FREE Plan)**

- Owner: `jane@micromind.com` / `user123`
- Subscription: FREE (limited)
- Data: 1 dashboard

**Test with these accounts to verify data isolation!**

---

## 🛠️ Common Tasks for AI Agents

### Add a New Page

1. Create page in `client/src/pages/NewPage.jsx`
2. Use SDK components (`MMCard`, `MMButton`, etc.)
3. Add route in `client/src/App.jsx`
4. Add to sidebar in `client/src/components/Sidebar.jsx`
5. Add translations in `client/src/locales/*.json`
6. If multi-tenant: filter by `organizationId`

### Add a New Database Model

1. Add to `server/prisma/schema.prisma`
2. If multi-tenant: add `organizationId` field + relation
3. Run `npx prisma migrate dev --name add_model`
4. Run `npx prisma generate`
5. Update seed script if needed
6. Create API routes with tenant middleware

### Add a New Subscription Quota

1. Add to plan limits in `server/src/utils/subscriptionPlans.js`
2. Add count logic to `checkQuota()` function
3. Use `checkResourceQuota('newResource')` in routes
4. Update `getUsageStats()` to track it
5. Document in [SAAS.md](./SAAS.md)

### Customize Color Scheme

1. Read [BRANDING.md](./BRANDING.md) Section 2
2. Edit `client/src/index.css` (CSS variables)
3. Update primary/secondary/accent colors
4. Test dark & light modes
5. Use provided color examples as reference

---

## 🔍 File Locations Cheat Sheet

| What You Need | File Location |
|---------------|---------------|
| **Prisma Schema** | `server/prisma/schema.prisma` |
| **Seed Data** | `server/prisma/seed.js` |
| **Subscription Plans** | `server/src/utils/subscriptionPlans.js` |
| **Tenant Middleware** | `server/src/middleware/tenantContext.js` |
| **Quota Middleware** | `server/src/middleware/quotaCheck.js` |
| **Main Server** | `server/src/index.js` |
| **Routes** | `client/src/App.jsx` |
| **Sidebar Menu** | `client/src/components/Sidebar.jsx` |
| **Org Switcher** | `client/src/components/OrganizationSwitcher.jsx` |
| **SDK Components** | `client/src/sdk/components/` |
| **Theme CSS** | `client/src/index.css` + `client/src/sdk/styles/theme.css` |
| **Translations** | `client/src/locales/*.json` |
| **i18n Config** | `client/src/i18n.js` |
| **Tailwind Config** | `client/tailwind.config.js` |
| **Environment** | `server/.env` (dev) + `server/.env.example` (template) |

---

## 📖 Documentation Reading Order

### For New Developers

1. **[README.md](./README.md)** - Get overview (15 min)
2. **[SETUP.md](./SETUP.md)** - Set up locally (30 min)
3. **[SAAS.md](./SAAS.md)** - Understand architecture (60 min)
4. **[BRANDING.md](./BRANDING.md)** - When customizing (20 min)
5. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - When deploying (30 min)

### For AI Agents Starting a Task

1. **[README.md](./README.md)** - Quick context
2. **[SAAS.md](./SAAS.md)** - If touching multi-tenant features
3. **Relevant section** of other docs as needed

### For Quick Customization

1. **[BRANDING.md](./BRANDING.md)** - Logo, colors, fonts
2. **[SAAS.md](./SAAS.md) Section 5** - If changing subscription plans

### For Deployment

1. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Full deployment guide
2. **[SAAS.md](./SAAS.md)** - Multi-tenancy considerations

---

## ⚡ Quick Commands

### Development

```bash
# Client
cd client
npm install
npm run dev          # Start Vite dev server (http://localhost:5173)

# Server
cd server
npm install
npx prisma generate  # Generate Prisma client
npx prisma migrate dev --name init  # Run migrations
npm run prisma:seed  # Seed demo data
npm run dev          # Start Express server (http://localhost:3000)
```

### Database

```bash
cd server
npx prisma studio    # Open Prisma Studio (http://localhost:5555)
npx prisma migrate dev  # Create & run migration
npx prisma generate  # Regenerate Prisma client
npm run prisma:seed  # Reseed database
```

### Production Build

```bash
cd client
npm run build        # Build for production → dist/

cd server
npm start            # Start production server
```

---

## 🎯 Template Capabilities Summary

### ✅ What's Included

- ✅ **Multi-tenant SAAS** architecture (complete data isolation)
- ✅ **Authentication** (JWT with bcrypt)
- ✅ **Authorization** (User roles + Organization roles)
- ✅ **Subscription management** (4 tiers with quotas)
- ✅ **Team collaboration** (invitations, roles, permissions)
- ✅ **Analytics** (SQL dashboards with charts)
- ✅ **AI services** (Co-Pilot, Report Bot)
- ✅ **Document management** (S3-ready)
- ✅ **Multi-language** (5 languages + RTL)
- ✅ **Premium UI** (16 SDK components + Executive Gold theme)
- ✅ **Responsive design** (mobile-friendly)
- ✅ **Comprehensive docs** (5 guides, 2,500+ lines)

### What Developers Need to Add

- Domain-specific business logic
- Custom API endpoints
- Additional database models
- Production database instance
- Domain name & SSL
- Optional: Payment processing (Stripe integration)
- Optional: Email services (invitations, notifications)
- Optional: Advanced AI features

---

## 🆘 Getting Help

### Documentation Hierarchy

1. **[SAAS.md](./SAAS.md)** - Multi-tenancy, architecture, data isolation
2. **[SETUP.md](./SETUP.md)** - Installation, troubleshooting
3. **[BRANDING.md](./BRANDING.md)** - Customization
4. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment
5. **[README.md](./README.md)** - Quick overview

### Common Questions

**Q: How do I add a new tenant-scoped model?**  
**A:** See [SAAS.md](./SAAS.md) Section 3.3 - "Prisma Best Practices"

**Q: How do I customize subscription plans?**  
**A:** See [SAAS.md](./SAAS.md) Section 5.2 - "Customizing Plans"

**Q: How do I change the logo?**  
**A:** See [BRANDING.md](./BRANDING.md) Section 1 - "Changing Logos"

**Q: How do I deploy to AWS?**  
**A:** See [DEPLOYMENT.md](./DEPLOYMENT.md) Section "Option 2: AWS Deployment"

**Q: Database connection fails?**  
**A:** See [SETUP.md](./SETUP.md) Troubleshooting - "Database Connection Failed"

---

## ✅ Pre-Development Checklist for AI Agents

Before starting any task, verify:

- [ ] I've read [README.md](./README.md) for context
- [ ] I understand this is a **multi-tenant SAAS** platform
- [ ] I know every tenant-scoped model needs `organizationId`
- [ ] I know to use `tenantContext` middleware on protected routes
- [ ] I know to check quotas before creating resources
- [ ] I know to filter ALL queries by `organizationId`
- [ ] I have the relevant documentation section open
- [ ] I understand the color scheme (Executive Gold)
- [ ] I know the SDK components available to use
- [ ] I'm ready to maintain existing code patterns

---

## 🎉 Summary for AI Agents

**This is a production-ready multi-tenant SAAS template.**

**6 Documentation Files:**

1. **README.md** - Overview (~350 lines)
2. **SETUP.md** - Installation (~450 lines)
3. **BRANDING.md** - Customization (~500 lines)
4. **DEPLOYMENT.md** - Production (~550 lines)
5. **SAAS.md** - Multi-tenancy (~900 lines) ⭐⭐⭐ **Backend/Multi-Tenancy**
6. **V4_SDK_REFERENCE.md** - UI Components (~600 lines) ⭐⭐ **Frontend/UI**

**Key Takeaways:**

- 🔒 **Always** filter by `organizationId` for tenant data (backend)
- 🛡️ **Always** use `tenantContext` middleware (backend)
- 📊 **Always** check quotas before resource creation (backend)
- 🎨 **Always** use SDK components for consistent UI (frontend)
- 🌐 **Always** use i18n keys for multi-language support (frontend)
- 📚 **Read** [SAAS.md](./SAAS.md) for backend/multi-tenant features
- 📚 **Read** [V4_SDK_REFERENCE.md](./V4_SDK_REFERENCE.md) for frontend/UI components

**You're ready to build! 🚀**
