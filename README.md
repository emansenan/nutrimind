# MicroMind Base SAAS Template

> **Production-ready SAAS template** with AI-powered features, SQL dashboards, and multi-language support.

A modern, full-stack SAAS application template built with **React**, **Node.js**, **PostgreSQL**, and **Prisma**. Features the **Executive Gold** design system, V4 UI SDK, and comprehensive authentication.

---

## ✨ Features

### 🎨 **Professional Design System**

- **Executive Gold Theme** with dark/light mode
- **V4 UI SDK** - 16 premium components
- Glassmorphic cards, smooth animations
- Fully responsive layouts

### 🌍 **Multi-Language Support (i18n)**

- **5 Languages:** English, Arabic (RTL), French, German, Swahili
- Automatic RTL layout switching
- Easy to add more languages

### 🔐 **Authentication & Authorization**

- JWT-based authentication
- Role-based access control (ADMIN, MANAGER, USER, VIEWER)
- Protected routes
- Session management

### 📊 **Analytics & Reporting**

- **SQL Dashboard Builder** - Create custom analytics
- **AI Report Bot** - Natural language report generation
- **Charts & Visualizations** - Interactive data displays
- Report export (PDF, Excel)

### 🤖 **AI-Powered Features**

- **Co-Pilot Chat Interface** - Multi-agent AI assistants
- Chat history & context management
- Extensible AI agent architecture

### 📁 **Document Management**

- File upload/download with AWS S3 integration
- Advanced filtering & search
- Media preview
- Tag-based organization

### ⚙️ **Settings & Preferences**

- User profile management
- Theme customization
- Language selection
- Notification preferences
- Security settings (2FA ready)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+
- **Git**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd MicroMind-Base-Template
```

### 2. Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Configure Environment

```bash
# Server configuration
cd server
cp .env.example .env
# Edit .env with your database credentials
```

### 4. Initialize Database

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
```

### 5. Start Development Servers

```bash
# Terminal 1: Start backend (port 3000)
cd server
npm run dev

# Terminal 2: Start frontend (port 5173)
cd client
npm run dev
```

### 6. Access the Application

- **Frontend:** <http://localhost:5173>
- **Backend API:** <http://localhost:3000>
- **Login:** <admin@micromind.com> / admin123

---

## 📁 Project Structure

```
MicroMind-Base-Template/
├── client/                    # React frontend
│   ├── src/
│   │   ├── sdk/              # V4 UI Component Library
│   │   │   ├── components/   # 16 premium components
│   │   │   ├── modules/      # Map, Charts, etc.
│   │   │   └── styles/       # Executive Gold theme
│   │   ├── components/       # App components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API clients
│   │   ├── locales/          # i18n translations (5 languages)
│   │   ├── App.jsx           # Main router
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── tailwind.config.js    # Theme configuration
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── src/
│   │   └── index.js          # Express server
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema (6 models)
│   │   └── seed.js           # Demo data
│   ├── .env.example          # Environment template
│   └── package.json
│
└── README.md                  # This file
```

---

## 🗄️ Database Schema

**6 Core Models:**

- **User** - Authentication & user management
- **Session** - JWT session tracking
- **Dashboard** - SQL analytics dashboards
- **Report** - AI-generated reports
- **Document** - File management
- **ChatHistory** - AI conversation logs

See `server/prisma/schema.prisma` for full schema.

---

## 🎨 UI Component Library (V4 SDK)

**16 Premium Components:**

- MMButton, MMCard, MMInput, MMSelect
- MMModal, MMTable, MMTabs, MMBadge
- MMSwitch, MMCheckbox, MMRadio, MMSpinner
- MMTooltip, MMAlert, MMDrawer
- **Modules:** MMMap, MMChart

**Usage:**

```jsx
import { MMButton, MMCard } from '@sdk';

<MMCard>
  <MMButton variant="primary">Click Me</MMButton>
</MMCard>
```

---

## 🌐 Multi-Language Support

**Supported Languages:**

1. English (en) - Default
2. Arabic (ar) - RTL
3. French (fr)
4. German (de)
5. Swahili (sw)

**Add a New Language:**

1. Create `client/src/locales/{lang}.json`
2. Copy keys from `en.json`
3. Translate values
4. Update `client/src/i18n.js` (add to resources & rtlLanguages if RTL)

---

## 🔑 Default Credentials

After running `npm run prisma:seed`:

| User | Email | Password | Role |
|------|-------|----------|------|
| Admin | <admin@micromind.com> | admin123 | ADMIN |
| User | <user@micromind.com> | user123 | USER |

**⚠️ Change these in production!**

---

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[BRANDING.md](./BRANDING.md)** - Customize colors, logos, and branding
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[API.md](./API.md)** - API documentation

---

## 🛠️ Available Scripts

### Client

```bash
npm run dev          # Start dev server (Vite)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Server

```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:seed       # Seed demo data
npm run prisma:studio     # Open Prisma Studio
```

---

## 🎨 Customizing the Template

### Change Branding

See **[BRANDING.md](./BRANDING.md)** for detailed instructions on:

- Updating logos and favicons
- Changing color schemes
- Customizing typography
- Modifying theme variables

### Add Custom Pages

1. Create page in `client/src/pages/MyPage.jsx`
2. Add route in `client/src/App.jsx`
3. Add navigation item in `client/src/components/Sidebar.jsx`
4. Add translations in `client/src/locales/*.json`

### Add Custom Database Models

1. Update `server/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name description`
3. Run `npx prisma generate`
4. Use in your API routes

---

## 🔧 Technology Stack

**Frontend:**

- React 18 + Vite
- React Router DOM
- Tailwind CSS
- i18next (internationalization)
- Axios (API client)
- Lucide React (icons)

**Backend:**

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT (authentication)
- bcrypt (password hashing)

**UI Components:**

- Custom V4 SDK (16 components)
- Executive Gold design system

---

## 📦 What's Included

### Pages

- ✅ Login & Authentication
- ✅ Dashboard (Home)
- ✅ Co-Pilots (AI Chat)
- ✅ Documents Library
- ✅ SQL Dashboards
- ✅ Report Bot
- ✅ Reports Explorer
- ✅ Settings

### Components

- ✅ 16 V4 SDK components
- ✅ Sidebar navigation
- ✅ Layout system
- ✅ Language switcher
- ✅ Theme toggle
- ✅ Protected routes

### Backend

- ✅ Generic Prisma schema
- ✅ JWT authentication
- ✅ Seed data
- ✅ Express server setup

---

## 🚧 What's NOT Included

This template provides the foundation. You'll need to implement:

- Domain-specific business logic
- Custom API endpoints
- Payment processing (if needed)
- Email services (if needed)
- Advanced AI integrations (if needed)
- Production database setup

---

## 📝 License

This is a private template. Customize as needed for your projects.

---

## 🤝 Support

For questions or issues:

1. Check **[SETUP.md](./SETUP.md)** for setup help
2. Review **[BRANDING.md](./BRANDING.md)** for customization
3. See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for production deployment

---

## 🎉 Getting Started

1. ✅ Clone the repo
2. ✅ Install dependencies
3. ✅ Configure `.env`
4. ✅ Initialize database
5. ✅ Start dev servers
6. ✅ Login and explore!

**Happy building! 🚀**
