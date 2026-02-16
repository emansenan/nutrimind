# MicroMind SAAS Template — AI Constitution

> **This file guides AI coding assistants** (Cursor, Copilot, Gemini, etc.) to follow the application's standards, conventions, and SDK patterns when building features on this template.

---

## 🏗️ Architecture Overview

This is a **full-stack SAAS application** built on the MicroMind platform:

| Layer | Technology | Location |
|-------|-----------|----------|
| **Frontend** | React 18 + Vite | `client/` |
| **Backend** | Node.js + Express | `server/` |
| **Database** | PostgreSQL + Prisma ORM | `server/prisma/` |
| **AI** | MicroMind Core AI Engine | `server/src/routes/ai.js` |
| **Storage** | AWS S3 (presigned URLs) | Server-side utility |
| **Auth** | JWT + bcrypt | `server/src/routes/auth.js` |

### Multi-Tenancy

All data models include `organizationId` for tenant isolation. **Always scope database queries by `organizationId`** from the authenticated user's JWT token.

---

## 🎨 Design System — Executive Gold V4

### MANDATORY: Use CSS Variables, Never Hardcode Colors

**CRITICAL RULE:** Never use hardcoded hex colors in JSX or CSS. Always use CSS variables.

```jsx
// ✅ CORRECT
style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}

// ❌ WRONG — breaks light mode
style={{ background: '#0F0F0F', color: '#F2F3EC' }}
```

### CSS Variable Reference

#### Backgrounds

| Variable | Dark Mode | Light Mode | Usage |
|----------|-----------|------------|-------|
| `--bg-page` | `#0F0F0F` | `#FFFFFF` | Page/body background |
| `--bg-surface` | `#1C1C1C` | `#FFFFFF` | Section/container backgrounds |
| `--bg-card` | `#1C1C1C` | `#FFFFFF` | Card backgrounds |
| `--bg-input` | `#0F0F0F` | `#F9FAFB` | Input field backgrounds |
| `--bg-hover` | `#262626` | `#F3F4F6` | Hover states |

#### Text

| Variable | Dark Mode | Light Mode | Usage |
|----------|-----------|------------|-------|
| `--text-primary` / `--text-main` | `#F2F3EC` | `#000000` | Primary text |
| `--text-secondary` / `--text-muted` | `#888888` | `#6B7280` | Muted/secondary text |

#### Borders, Brand & Semantic

| Variable | Dark Mode | Light Mode |
|----------|-----------|------------|
| `--border` / `--border-color` | `#333333` | `#E5E5E5` |
| `--primary` / `--primary-color` | `#E0AA3E` | `#E0AA3E` |
| `--success-color` | `#10B981` | `#16A34A` |
| `--warning-color` | `#F59E0B` | `#D97706` |
| `--danger-color` | `#EF4444` | `#DC2626` |
| `--accent-color` | `#2CA58D` | `#0D9488` |

#### Shadows (Light mode only)

| Variable | Value |
|----------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` |

### Where Variables Are Defined

- **Primary definitions:** `client/src/index.css` (lines 6–99)
- **SDK theme:** `client/src/sdk/styles/theme.css`
- The `data-theme` attribute on `<html>` controls dark/light mode

---

## 📦 V4 UI SDK — Component Library

Import from the SDK barrel file:

```jsx
import { MMCard, MMButton, MMTable, MMInput } from '../sdk';
```

### Available Components

| Component | Purpose | Import |
|-----------|---------|--------|
| `MMCard` | Container card with optional title/action header | `./sdk/components/MMCard` |
| `MMButton` | Styled button with variants (primary, outline, ghost) | `./sdk/components/MMButton` |
| `MMBadge` | Status/label badges | `./sdk/components/MMBadge` |
| `MMTable` | Data table with sorting, pagination | `./sdk/components/MMTable` |
| `MMSearch` | Search input with icon | `./sdk/components/MMSearch` |
| `MMSelect` | Styled dropdown select | `./sdk/components/MMSelect` |
| `MMFilterBar` | Multi-filter bar | `./sdk/components/MMFilterBar` |
| `MMPagination` | Page navigation controls | `./sdk/components/MMPagination` |
| `MMInput` | Styled text input | `./sdk/components/MMInput` |
| `MMTextarea` | Multi-line text input | `./sdk/components/MMTextarea` |
| `MMCheckbox` | Checkbox with label | `./sdk/components/MMCheckbox` |
| `MMSwitch` | Toggle switch | `./sdk/components/MMSwitch` |
| `MMDrawer` | Slide-out drawer/panel | `./sdk/MMDrawer` |
| `MMMap` | Leaflet map module | `./sdk/modules/map/MMMap` |
| `MMCalendarBoard` | Calendar/scheduler view | `./sdk/modules/calendar/MMCalendarBoard` |
| `MMFileImport` | File upload with drag & drop | `./sdk/modules/documents/MMFileImport` |

### Component CSS Convention

Each SDK component has a co-located CSS file (e.g., `MMCard.jsx` + `MMCard.css`). The CSS uses the CSS variables from the theme — **do not override these with inline hardcoded colors**.

---

## 📁 Project Structure & Conventions

```
client/src/
├── sdk/                    # V4 UI Component Library (DO NOT modify unless extending SDK)
│   ├── components/         # 13 core components (MMCard, MMButton, etc.)
│   ├── modules/            # 3 advanced modules (Map, Calendar, FileImport)
│   ├── styles/theme.css    # Theme CSS variables
│   ├── MMDrawer.jsx        # Drawer component
│   └── index.js            # Barrel export file
├── components/             # App-specific components
│   ├── AppLayout.jsx       # Main shell (sidebar + content area)
│   ├── Sidebar.jsx         # Navigation sidebar (240px fixed)
│   ├── CustomSelect.jsx    # Styled select dropdown
│   ├── LanguageSwitcher.jsx
│   └── analytics/          # Dashboard-specific components
├── pages/                  # Route pages
│   ├── HomePage.jsx        # Dashboard home
│   ├── LoginScreen.jsx     # Authentication
│   ├── CoPilotsPage.jsx    # AI chat interface
│   ├── DocumentsLibrary.jsx# S3 document browser
│   ├── DashboardsPage.jsx  # SQL analytics
│   ├── ReportBotPage.jsx   # AI report generation
│   ├── ReportsPage.jsx     # Reports list
│   └── SettingsPage.jsx    # User preferences
├── services/
│   ├── api.js              # Axios instance (baseURL, JWT interceptor)
│   └── managerService.js   # All API methods (50+ functions)
├── locales/                # i18n translation files
│   ├── en.json             # English (default)
│   ├── ar.json             # Arabic (RTL)
│   ├── fr.json, de.json, sw.json
├── i18n.js                 # i18next configuration
├── App.jsx                 # React Router routes
├── main.jsx                # Entry point
└── index.css               # Global styles + theme variables
```

---

## 🛣️ Adding New Pages

Follow this exact pattern:

### 1. Create the Page Component

```jsx
// client/src/pages/MyNewPage.jsx
import React, { useEffect, useState } from 'react';
import { MMCard, MMButton, MMTable } from '../sdk';
import managerService from '../services/managerService';
import { useTranslation } from 'react-i18next';

const MyNewPage = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data on mount
    }, []);

    return (
        <div>
            <h1 style={{ 
                fontFamily: 'var(--heading-font)',
                color: 'var(--text-primary)',
                fontSize: '28px'
            }}>
                {t('myPage.title')}
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
                {t('myPage.subtitle')}
            </p>
            <MMCard>
                {/* Page content */}
            </MMCard>
        </div>
    );
};

export default MyNewPage;
```

### 2. Add Route in App.jsx

```jsx
import MyNewPage from './pages/MyNewPage';
// Inside the <Route element={<ManagerLayout />}> block:
<Route path="/my-page" element={<MyNewPage />} />
```

### 3. Add Sidebar Navigation

Edit `client/src/components/Sidebar.jsx` — add a nav item with icon and translation key.

### 4. Add Translations

Add keys to ALL locale files (`en.json`, `ar.json`, `fr.json`, `de.json`, `sw.json`).

### 5. Add Backend Route

Add your API endpoint in `server/src/routes/manager.js` using Prisma:

```js
router.get('/my-data', async (req, res) => {
    try {
        const data = await prisma.myModel.findMany({
            where: { organizationId: req.user.organizationId }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### 6. Add Service Method

Add the API call in `client/src/services/managerService.js`:

```js
const getMyData = async (params) => {
    const response = await api.get('/manager/my-data', { params });
    return response.data;
};
```

---

## 🔐 Authentication Pattern

### Frontend

- JWT token stored in `localStorage` under key `token`
- Axios interceptor in `services/api.js` auto-attaches `Authorization: Bearer <token>` header
- 401 responses trigger auto-logout and redirect to `/login`
- User object stored in `localStorage` under key `user`

### Backend

- All protected routes use the `authCheck` middleware in `server/src/routes/manager.js`
- JWT payload contains: `id`, `email`, `role`, `displayName`, `organizationId`
- Verify with: `jwt.verify(token, process.env.JWT_SECRET)`
- User roles: `ADMIN`, `MANAGER`, `USER`, `VIEWER`
- Organization roles: `OWNER`, `ADMIN`, `MEMBER`, `VIEWER`

---

## 🤖 AI Integration — MicroMind Core

### How It Works

The backend proxies AI requests to MicroMind Core:

```
Frontend → POST /api/v1/ai/chat/:chatflowId → Backend proxy → https://dev.aimicromind.com/api/v1/prediction/:chatflowId
```

### Configuration (server/.env)

```env
AI_API_URL="https://dev.aimicromind.com"
AI_API_KEY="your-api-key"
AI_CHATFLOW_ID="your-default-chatflow-id"
```

### Adding a New AI Agent

1. Create a new AI Agent in MicroMind Core
2. Get the AI Agent ID
3. Use the Co-Pilots page — it already supports multiple agents via the AI Agent ID parameter
4. Or create a new page that calls `managerService` with the specific AI Agent ID

---

## 📁 S3 Document Storage

### Pattern

Documents use AWS S3 with presigned URLs for secure access:

1. **Upload:** Frontend sends file to backend → backend uploads to S3 using AWS SDK → stores `s3Path` in database
2. **Download:** Backend generates presigned URL from `s3Path` → returns temporary URL to frontend
3. **Display:** Frontend uses presigned URL directly in `<img>`, `<video>`, or download links

### Configuration

```env
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_REGION="eu-west-1"
S3_BUCKET="your-bucket-name"
```

---

## 🌍 Internationalization (i18n)

### Usage in Components

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
    const { t } = useTranslation();
    return <h1>{t('myPage.title')}</h1>;
};
```

### Adding New Keys

Add to ALL 5 locale files simultaneously — never add a key to only one file.

### RTL Support

Arabic (`ar`) is RTL. The app auto-detects and applies `dir="rtl"` and adjusts layouts using `marginInlineStart` instead of `marginLeft`.

---

## 🗄️ Database — Prisma ORM

### Schema Location

`server/prisma/schema.prisma`

### Adding a New Model

1. Define the model in `schema.prisma`
2. Always include `organizationId` for multi-tenancy
3. Run migration: `npx prisma migrate dev --name add_my_model`
4. Generate client: `npx prisma generate`
5. Use in routes: `const { PrismaClient } = require('@prisma/client');`

### Existing Models

| Model | Table | Purpose |
|-------|-------|---------|
| `Organization` | `organizations` | Tenant container |
| `OrganizationMember` | `organization_members` | User-org membership |
| `Subscription` | `subscriptions` | Plan/billing (FREE, STARTER, PRO, ENTERPRISE) |
| `Invitation` | `invitations` | Org invite tokens |
| `User` | `users` | Authentication & profiles |
| `Session` | `sessions` | JWT session tracking |
| `Dashboard` | `dashboards` | SQL analytics configs |
| `Report` | `reports` | AI-generated reports |
| `Document` | `documents` | File management (S3) |
| `ChatHistory` | `chat_history` | AI conversation logs |

---

## ⚠️ Critical Rules

1. **Always use CSS variables** — never hardcode colors. The app supports dark/light mode via `data-theme` attribute
2. **Always use `useTranslation()`** — never hardcode user-visible text strings
3. **Always scope by `organizationId`** — multi-tenant data isolation is mandatory
4. **Always use SDK components** — import from `../sdk` instead of creating custom UI primitives
5. **Always add translations to ALL 5 locales** — `en.json`, `ar.json`, `fr.json`, `de.json`, `sw.json`
6. **Never modify SDK files** unless you are extending the SDK with a new component that follows the existing patterns
7. **Use `managerService.js`** for all API calls — don't create inline `fetch` or `axios` calls
8. **Backend routes in `manager.js` are stubs** — replace with real Prisma queries when implementing features
9. **Use `var(--heading-font)` for headings** and `var(--font-family)` for body text
10. **Test in both dark AND light modes** after any visual changes
11. **Run i18n completeness check** after creating or modifying any page: `node scripts/check-i18n.js` — ensure all 5 locale files have all keys
12. **Match Executive Gold design standards** — for UI polish, reference existing base template pages (Login, Home, Settings, Co-Pilots) as the visual "gold standard"
