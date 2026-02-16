# Changelog

All notable changes to the MicroMind Base SAAS Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-02-16

### 🎉 Initial Release

The first public release of the MicroMind Base SAAS Template — a full-stack PERN application with integrated MicroMind Core AI engine.

### Added

#### Core Platform

- Full-stack SAAS application (React + Node.js + PostgreSQL + Prisma)
- JWT authentication with 4 roles (Admin, Manager, User, Viewer)
- Multi-tenant architecture with subscription plans, quotas, and team management
- AWS S3 document management with media preview

#### Executive Gold Design System

- V4 UI SDK with 16 premium components (MMButton, MMCard, MMInput, MMSelect, MMModal, MMTable, MMTabs, MMBadge, MMSwitch, MMCheckbox, MMRadio, MMSpinner, MMTooltip, MMAlert, MMDrawer, MMTextarea)
- Dark/light theme support
- Glassmorphic cards and micro-animations
- Fully responsive layouts

#### AI Integration

- MicroMind Core AI Co-Pilot chat interface
- Multi-agent orchestration support
- AI Report Bot for natural language report generation
- SQL Dashboard Builder with interactive visualizations

#### Internationalization

- 5 languages: English, Arabic (RTL), French, German, Swahili
- Automatic RTL layout switching
- Translation validation script (`scripts/check-i18n.js`)

#### Documentation Hub

- Built-in `/docs` page with 18 documentation files
- Categorized sidebar navigation with search
- 10 documentation categories including Getting Started, Deployment, Go-to-Market, SAAS Features, AI Integration, Example Apps, Frontend SDK, and Backend SDK
- 3 Go-to-Market guides: Extending Your App, Website & Marketing, Sales Flyers
- 5 Example App guides: Credit Control, Order Cycle, OTax, TeamSync, Oracle ERP Integration

#### Developer Experience

- AI constitution file (`.ai/constitution.md`) for coding standards
- 10-prompt Quick Start deployment guide
- Apache 2.0 license with NOTICE file
- Comprehensive `.env.example` with all configuration options

#### Pages Included

- Login & Authentication
- Dashboard (Home)
- Co-Pilots (AI Chat)
- Documents Library
- SQL Dashboards
- Report Bot
- Reports Explorer
- Documentation Hub
- Campus (Learning Tracks)
- Settings

---

*For upcoming releases, see the [roadmap](https://github.com/aimicromind/base-template/discussions).*
