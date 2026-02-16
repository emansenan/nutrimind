# 🔗 TeamSync — Example App

> **Built with:** MicroMind Base SAAS Template v1.0  
> **Build time:** ~4 hours using AI-assisted development  
> **Theme:** Executive Gold (Dark Mode)

---

## Overview

TeamSync is a full-featured **Project & Task Management** application built entirely on the MicroMind Base Template. It demonstrates how every core module can be extended into a production-ready SAAS product.

## Features Used

| Template Module | TeamSync Implementation |
|----------------|------------------------|
| **Authentication** | Branded login with company logo |
| **Dashboard** | KPI cards, activity feed, quick-action grid |
| **Co-Pilots** | Context-aware AI assistant with scope/mode selectors |
| **Documents** | File management with filters and categories |
| **Dashboards** | Intelligence cockpit with configurable chart tiles |
| **Report Bot** | Natural-language report generation |
| **Reports Explorer** | Tabular data with sorting and export |
| **Settings** | Profile, theme toggle, notifications, language |

## Custom Modules Added

| Module | Description |
|--------|------------|
| **Projects** | Card-based project view with progress tracking |
| **Tasks** | Three views — Table, Kanban Board, Calendar — plus AI-powered task detail |
| **Team** | Member directory with workload distribution analytics |
| **Customers** | CRM contact list with linked tasks |

## Screenshots

See the full gallery: [TeamSync Screenshots](../screenshots/GALLERY.md#-teamsync--project--task-management)

### Highlights

| Screenshot | Feature |
|-----------|---------|
| ![Dashboard](../screenshots/teamsync/02-dashboard.png) | Home dashboard with KPIs |
| ![Kanban Board](../screenshots/teamsync/11-tasks-board.png) | Drag-and-drop task board |
| ![AI Co-Pilot](../screenshots/teamsync/04-copilots-chat.png) | Context-aware AI assistant |
| ![Credit Decision](../screenshots/teamsync/13-task-detail-ai.png) | AI-powered task insights |

## Database Schema Extensions

TeamSync extends the base template schema with:

```prisma
model Project {
  id          String   @id @default(uuid())
  name        String
  description String?
  status      String   @default("active")
  progress    Int      @default(0)
  startDate   DateTime?
  endDate     DateTime?
  customerId  String?
  createdBy   String
  tasks       Task[]
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   @default("todo")
  priority    String   @default("medium")
  type        String   @default("task")
  dueDate     DateTime?
  projectId   String?
  assigneeId  String?
  project     Project? @relation(fields: [projectId])
  comments    Comment[]
  subtasks    Subtask[]
}

model Customer {
  id        String @id @default(uuid())
  name      String
  shortName String?
  email     String?
  phone     String?
}
```

## Sidebar Configuration

TeamSync adds these navigation groups to the base sidebar:

```javascript
// Sidebar groups added to base template
const TEAMSYNC_NAV = [
  {
    group: 'TEAMSYNC',
    items: [
      { label: 'Projects', icon: FolderIcon, path: '/projects' },
      { label: 'Tasks', icon: CheckIcon, path: '/tasks' },
      { label: 'Team', icon: UsersIcon, path: '/team' },
      { label: 'Customers', icon: BuildingIcon, path: '/customers' },
    ]
  }
];
```

## Localization

TeamSync supports all 5 base template locales:

- 🇺🇸 English
- 🇫🇷 French  
- 🇩🇪 German
- 🇸🇦 Arabic (RTL)
- 🇰🇪 Swahili

## Getting Started

To build your own app like TeamSync:

1. Follow the [Quick Start Guide](../../QUICK_START.md)
2. Use the 10-prompt AI workflow to scaffold your modules
3. Extend the Prisma schema with your domain models
4. Add sidebar navigation groups
5. Run `node scripts/check-i18n.js` to validate translations
