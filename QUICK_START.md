# 🚀 MicroMind Base Template — Quick Start Guide

> **Build a full SAAS MicroApp in under 10 minutes** using AI-assisted deployment.
>
> This guide uses a **10-prompt sequence** designed for AI coding assistants (Google Antigravity + Claude Opus 4.6, Cursor, Copilot, etc.).

---

## Prerequisites

Before starting, ensure you have:

- ✅ **Node.js 18+** — `node --version`
- ✅ **PostgreSQL 14+** — running locally or remote (Render, Railway, Supabase)
- ✅ **npm** — `npm --version`
- ✅ **An IDE with AI assistant** — Google Antigravity (recommended), Cursor, or VS Code + Copilot
- ✅ **MicroMind Core keys** — Get yours at [create.aimicromind.com](https://create.aimicromind.com)

---

## Stage 1: Deploy (10 minutes)

### Prompt 0 — Preflight Check

Paste this into your AI assistant:

```
Read the AI constitution file at .ai/constitution.md — this contains all SDK, theme, i18n, and coding standards you must follow.

Then verify: Node.js 18+, PostgreSQL 14+, and npm are installed.
Report any missing prerequisites.
```

### Prompt 1 — Initialize Project

```
Copy the MicroMind Base Template to D:\<YOUR_APP_NAME>.
Install all dependencies for both server/ and client/.
Report status.
```

### Prompt 2 — Configure Environment

```
Create server/.env from server/.env.example with these values:
- DATABASE_URL="<your-postgresql-connection-string>"
- AI_API_URL="https://dev.aimicromind.com"
- AI_API_KEY="<your-micromind-api-key>"
- AI_CHATFLOW_ID="<your-ai-agent-id>"
- AWS S3 keys (if using file uploads)
- Generate a random JWT_SECRET (64 characters)
```

### Prompt 3 — Database Setup

```
Run Prisma migrations to create all database tables:
  cd server && npx prisma migrate deploy
Generate the Prisma client:
  npx prisma generate
Seed the database with initial data (organization, admin user, system config):
  node prisma/seed.js
Verify tables were created successfully.
```

### Prompt 4 — Launch & Verify

```
Start the backend server (port 3000) and frontend dev server (port 5173).
Test the health endpoint.
Open browser to http://localhost:5173.
Login with default admin credentials.
Verify: sidebar renders, pages load, authentication works.
```

---

## Stage 2: Design & Build (1-4 hours)

### Prompt 5 — App Design

```
I want to build a <YOUR_APP_DESCRIPTION>.
Help me create:
1. Business goals, objectives, and target user (ICP)
2. Functional and non-functional feature list
3. UX wireframes and user flows
4. Database ERD and API design
5. UI screen list with sidebar navigation

Here are my initial design documents: <attach or paste your docs>
```

### Prompt 6 — Build the App

```
Based on the approved design, implement the application:
1. Create Prisma models and run migrations
2. Create backend API routes in server/src/routes/
3. Add service methods in client/src/services/managerService.js
4. Create page components in client/src/pages/
5. Add sidebar navigation in client/src/components/Sidebar.jsx
6. Add translations to ALL 5 locale files (en, ar, fr, de, sw)
7. Follow the constitution rules: CSS variables, SDK components, i18n, multi-tenancy

CRITICAL: Add translations to ALL 5 locale files for every new text string.
```

### Prompt 7 — Polish

```
Polish all pages to match the Executive Gold design standard.
Reference the constitution at .ai/constitution.md for CSS variables and SDK usage.

Checklist:
- [ ] All pages use CSS variables (no hardcoded colors)
- [ ] All 5 locale files (en, ar, fr, de, sw) have complete translations
- [ ] Dark mode and light mode both render correctly
- [ ] SDK components (MMCard, MMButton, MMTable, etc.) used consistently
- [ ] Responsive layout works on mobile, tablet, and desktop
- [ ] Test in both dark AND light modes
```

---

## Stage 3: Go-to-Market (1-2 hours)

### Prompt 8 — Product Website

```
Build a product landing page for <YOUR_APP_NAME> with:
1. Hero section with value proposition
2. Feature showcase with icons
3. Pricing section (if applicable)
4. Screenshots/demo section
5. Call-to-action and sign-up
6. Footer with social links

Use the Executive Gold design system (dark theme, gold accents).
```

### Prompt 9 — Sales Flyer

```
Create a print-ready sales flyer (HTML) for <YOUR_APP_NAME> that includes:
- Product name and tagline
- Top 5 features with benefits
- Pricing tiers
- Contact information
- Professional design optimized for printing as PDF
```

### Prompt 10 — Marketing Posts

```
Generate the first 5 social media posts for <YOUR_APP_NAME>:
1. Launch announcement
2. Feature highlight (top feature)
3. Problem/solution story
4. Customer testimonial template
5. Call-to-action post

Create posts for LinkedIn and X (Twitter), with appropriate hashtags.
```

---

## What's Included

| Feature | Details |
|---------|---------|
| **UI SDK** | 16 Executive Gold components (MMCard, MMButton, MMTable, etc.) |
| **Authentication** | JWT-based with role management (Admin, Manager, User, Viewer) |
| **Multi-Tenancy** | Organization-scoped data isolation |
| **AI Co-Pilots** | MicroMind Core integration with multi-agent support |
| **SQL Dashboards** | AI-powered analytics with chart generation |
| **Report Bot** | AI-generated PDF reports |
| **Document Storage** | AWS S3 with presigned URL security |
| **i18n** | 5 languages (EN, AR, FR, DE, SW) with RTL support |
| **Design System** | Executive Gold V4 with dark/light mode |

---

## License

This template is licensed under the **Apache License 2.0**. See [LICENSE](./LICENSE) for details.

Built with ❤️ by [AI MicroMind](https://aimicromind.com)
