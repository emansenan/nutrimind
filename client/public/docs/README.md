# MicroMind Base SAAS Template

> **Build a full SAAS MicroApp in under 10 minutes** with AI-assisted deployment.

A modern, full-stack SAAS application template built with **React**, **Node.js**, **PostgreSQL**, and **Prisma**. Features the **Executive Gold** design system, V4 UI SDK, AI Co-Pilots via **MicroMind Core**, multi-tenant SAAS architecture, and comprehensive multi-language support across 5 locales.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## ⚡ What You Get

| Feature | Description |
|---------|-------------|
| 🎨 **Executive Gold Design** | Dark/light theme, V4 SDK with 16 premium components, glassmorphism, micro-animations |
| 🤖 **AI Co-Pilots** | Multi-agent chat with MicroMind Core, Report Bot, SQL dashboards |
| 🏢 **SAAS Architecture** | Multi-tenancy, subscriptions, quotas, team management, role-based access |
| 🌍 **5 Languages** | English, Arabic (RTL), French, German, Swahili — add more in minutes |
| 📁 **Document Management** | AWS S3 integration, file upload/download, media preview, tag-based search |
| 📊 **Analytics Engine** | SQL Dashboard Builder, AI-powered reports, chart exports (PNG/CSV) |
| 🔐 **Auth & Security** | JWT auth, 4 roles (Admin/Manager/User/Viewer), protected routes, session management |
| 📚 **Built-in Docs Hub** | 18 documentation files accessible at `/docs` inside your app |
| 🚀 **Go-to-Market Tools** | AI prompt guides for websites, marketing materials, and sales flyers |

---

## 🚀 Quick Start

> **New to MicroMind?** See **[QUICK_START.md](./QUICK_START.md)** for the full AI-assisted 10-prompt deployment guide.

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+
- **An AI-enabled IDE** — Google Antigravity (recommended), Cursor, or VS Code + Copilot
- **MicroMind Core keys** — Get yours at [yourapp.aimicromind.com](https://yourapp.aimicromind.com)

### Setup in 5 Steps

```bash
# 1. Clone the repository
git clone https://github.com/aimicromind/base-template.git
cd MicroMind-Base-Template

# 2. Install dependencies
cd client && npm install
cd ../server && npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your database URL, AI keys, and S3 credentials

# 4. Initialize database
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed

# 5. Start development servers
npm run dev                # Backend on port 3000
cd ../client && npm run dev  # Frontend on port 5173
```

**Open** <http://localhost:5173> and login with `admin@micromind.com` / `admin123`

> ⚠️ **Change default credentials in production!**

---

## 📁 Project Structure

```
MicroMind-Base-Template/
├── client/                    # React frontend
│   ├── src/
│   │   ├── sdk/              # V4 UI Component Library (16 components)
│   │   ├── components/       # App components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API clients
│   │   └── locales/          # i18n translations (5 languages)
│   └── public/
│       └── docs/             # 18 documentation markdown files
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   └── middleware/       # Auth, validation, error handling
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Demo data
│   └── .env.example          # Environment template
│
├── .ai/                       # AI constitution (coding standards)
├── QUICK_START.md             # 10-prompt deployment guide
├── CONTRIBUTING.md            # How to contribute
├── CHANGELOG.md               # Release history
├── LICENSE                    # Apache 2.0
├── NOTICE                     # Attribution
└── README.md                  # This file
```

---

## 🗄️ Database Schema

**Core Models:**

| Model | Purpose |
|-------|---------|
| User | Authentication & user management with roles |
| Session | JWT session tracking |
| Dashboard | SQL analytics dashboards |
| Report | AI-generated reports |
| Document | File management with S3 |
| ChatHistory | AI conversation logs |

See `server/prisma/schema.prisma` for the full schema.

---

## 🎨 UI Component Library (V4 SDK)

**16 premium components** with Executive Gold theming:

```
MMButton, MMCard, MMInput, MMSelect, MMModal, MMTable,
MMTabs, MMBadge, MMSwitch, MMCheckbox, MMRadio, MMSpinner,
MMTooltip, MMAlert, MMDrawer, MMTextarea, MMPagination
```

**Modules:** MMMap, MMChart, MMFileImport

**Usage:**

```jsx
import { MMButton, MMCard } from '@sdk';

<MMCard title="My Feature">
  <MMButton variant="primary">Get Started</MMButton>
</MMCard>
```

See **[V4_SDK_REFERENCE.md](./V4_SDK_REFERENCE.md)** for full API documentation.

---

## 🌐 Multi-Language Support

| Language | Code | Direction |
|----------|------|-----------|
| English | `en` | LTR (default) |
| Arabic | `ar` | RTL |
| French | `fr` | LTR |
| German | `de` | LTR |
| Swahili | `sw` | LTR |

**Add a new language:**

1. Create `client/src/locales/{lang}.json`
2. Copy keys from `en.json` and translate
3. Register in `client/src/i18n.js`

---

## 📖 Documentation

All documentation is available at **`/docs`** inside your running app, or as markdown files:

### Getting Started

- **[QUICK_START.md](./QUICK_START.md)** — AI-assisted 10-prompt deployment guide
- **[SETUP.md](./SETUP.md)** — Detailed setup instructions
- **[DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md)** — Step-by-step environment setup
- **[EXTENDING_YOUR_APP.md](./client/public/docs/EXTENDING_YOUR_APP.md)** — Build pages with AI prompt sequences

### Architecture & SDKs

- **[V4_SDK_REFERENCE.md](./V4_SDK_REFERENCE.md)** — 16 frontend components
- **[BACKEND_SDK_AGENTS_GUIDE.md](./BACKEND_SDK_AGENTS_GUIDE.md)** — Server-side SDK
- **[AI_AGENTS_GUIDE.md](./AI_AGENTS_GUIDE.md)** — MicroMind Core AI integration
- **[SAAS.md](./SAAS.md)** — Multi-tenancy, subscriptions, quotas
- **[BRANDING.md](./BRANDING.md)** — Customize colors, logos, typography

### Deployment & Go-to-Market

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — Production deployment (Vercel, AWS, DO, VPS)
- **[WEBSITE_AND_MARKETING.md](./client/public/docs/WEBSITE_AND_MARKETING.md)** — Build marketing sites with AI
- **[SALES_FLYERS.md](./client/public/docs/SALES_FLYERS.md)** — Create print-ready sales materials

### Example Apps

- Credit Control, Order Cycle, OTax, TeamSync, Oracle ERP Integration

---

## 🔧 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, React Router, i18next, Axios, Lucide Icons |
| **Backend** | Node.js, Express, Prisma ORM, JWT, bcrypt, Socket.IO |
| **Database** | PostgreSQL 14+ |
| **AI Engine** | MicroMind Core (Flowise-based), multi-agent orchestration |
| **Storage** | AWS S3 (optional) |
| **Design** | Executive Gold theme, V4 SDK (16 components) |

---

## 🛠️ Scripts

### Client

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Server

```bash
npm run dev               # Start with nodemon
npm start                 # Production server
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run migrations
npm run prisma:seed       # Seed demo data
npm run prisma:studio     # Open Prisma Studio
```

---

## 🤝 Contributing

We welcome contributions! Please see **[CONTRIBUTING.md](./CONTRIBUTING.md)** for guidelines.

**Quick overview:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💬 Community

- 💬 **[Discord](https://discord.gg/aimicromind)** — Chat with the team and other developers
- 💡 **[GitHub Discussions](https://github.com/aimicromind/base-template/discussions)** — Ask questions and share ideas
- 🐛 **[GitHub Issues](https://github.com/aimicromind/base-template/issues)** — Report bugs and request features
- 🌐 **[yourapp.aimicromind.com](https://yourapp.aimicromind.com)** — Get your MicroMind keys

---

## 📝 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](./LICENSE) file for details.

Copyright 2026 AI MicroMind LLC. See [NOTICE](./NOTICE) for third-party attributions.

---

**Happy building! 🚀**
