# MicroMind Base Template — Deployment Instructions

> **Use this document as the FIRST PROMPT in a new IDE AI session** to deploy the template on a fresh location and database.

---

## 🎯 Objective

Deploy the MicroMind Base SAAS Template to a new working directory with a fresh PostgreSQL database. The template includes:

- React + Vite frontend with Executive Gold design system
- Node.js + Express backend with JWT auth
- PostgreSQL database via Prisma ORM
- MicroMind Core AI integration (Co-Pilots, Report Bot)
- Multi-language support (5 languages, RTL-ready)
- V4 UI SDK (16 premium components)

---

## 📋 Step-by-Step Deployment

### Step 1: Copy Template to New Location

```powershell
# Copy from the template source to your new app directory
Copy-Item -Path "D:\templates\MicroMind-Base-Template\*" -Destination "D:\<YOUR_APP_NAME>" -Recurse
cd D:\<YOUR_APP_NAME>
```

### Step 2: Install Dependencies

```powershell
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ..\server
npm install
```

### Step 3: Create the PostgreSQL Database

Create a fresh PostgreSQL database for the new app:

```sql
CREATE DATABASE your_app_db;
```

### Step 4: Configure Server Environment

Create `server/.env` with these variables:

```env
# === DATABASE ===
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/your_app_db?schema=public"

# === AUTH ===
JWT_SECRET="your-secure-random-secret-key-here"
JWT_EXPIRES_IN="7d"

# === SERVER ===
PORT=3000
NODE_ENV=development

# === AI INTEGRATION (MicroMind Core) ===
AI_API_URL="https://dev.aimicromind.com"
AI_API_KEY="your-micromind-api-key"
AI_CHATFLOW_ID="your-default-ai-agent-id"

# === AWS S3 (for document storage) ===
# AWS_ACCESS_KEY_ID="your-key"
# AWS_SECRET_ACCESS_KEY="your-secret"
# AWS_REGION="eu-west-1"
# S3_BUCKET="your-bucket-name"
```

### Step 5: Initialize Database Schema

```powershell
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### Step 6: Seed Default Data

```powershell
npm run prisma:seed
```

This creates:

- **Organization:** MicroMind (PRO plan)
- **Admin User:** <melsaied@aimicromind.com> / Ai123@135
- **Sample Dashboard** and **Document** records

### Step 7: Start Development Servers

```powershell
# Terminal 1 — Backend (port 3000)
cd server
npm run dev

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev
```

### Step 8: Verify Deployment

1. Open <http://localhost:5173>
2. Login with admin credentials
3. Verify sidebar navigation works
4. Check Settings page (theme toggle, language switcher)
5. Check AI Chat on Report Bot or Co-Pilots page

---

## ⚠️ Important Notes

### Backend is Stub Routes

The `server/src/routes/manager.js` returns empty data for all endpoints. This is intentional — the base template provides the UI framework. When building your app, **replace the stub routes with real Prisma queries** connected to your domain-specific data.

### Customization Checklist

After deployment, customize:

| Item | File(s) | What to Change |
|------|---------|----------------|
| **App Name** | `client/index.html`, `Sidebar.jsx` | Title, sidebar header text |
| **Branding** | `client/public/assets/logo.png` | Replace logo |
| **Seed Data** | `server/prisma/seed.js` | Organization name, admin email/password |
| **AI Agent** | `server/.env` or `server/src/routes/ai.js` | AI Agent ID for your domain |
| **Colors** | `client/src/sdk/styles/theme.css`, `client/src/index.css` | Theme variables |

### Theme System

- Dark/Light mode is controlled by `data-theme` attribute on `<html>`
- CSS variables are defined in `client/src/index.css` (lines 6-99) and `client/src/sdk/styles/theme.css`
- **Always use CSS variables** (e.g., `var(--bg-page)`, `var(--text-primary)`) — never hardcode hex colors

### Constitution File

See `.ai/constitution.md` in the template root — this file guides AI coding assistants to follow the app's standards, conventions, and SDK usage patterns.
