# 🚀 Extending Your App — AI-Assisted Prompt Guide

> **From idea to production in one session.** This guide gives you the exact prompt sequences to paste into your AI coding assistant (Google Antigravity, Cursor, Copilot, etc.) to build your full MicroApp on the MicroMind Base SAAS Template — from initial planning through MVP, polishing, and ongoing feature extension.

---

## 📌 The Golden Rule — Always Start Here

**Every single session**, paste this prompt first:

```
Read the AI constitution file at .ai/constitution.md — this contains 
all SDK, theme, i18n, and coding standards you must follow for this project.
```

> ⚠️ The constitution encodes 16 SDK components, the Executive Gold design system, multi-tenant data isolation, and i18n standards. Without it, your AI will generate non-compliant code.

---

## Phase 1: From Idea to MVP Plan

### Prompt 1 — Share Your Vision

```
I need your help to design and plan a new app.

I have documents that I created for this app — they are still valid 
as a direction. Review them first.

The files are in: D:\[YOUR_PATH]\Docs

You should help me decide and finalize:
1. App business goal, objectives, and ICP
2. Functional and non-functional features
3. UX and wireframes to support user inputs and outputs
4. ERD and APIs
5. UI Screens
```

> 💡 **Don't have existing docs?** Replace the file reference with a paragraph describing your app idea, target users, and key features.

### Prompt 2 — Refine the Plan

Review your AI's proposed plan. Challenge and adjust:

```
Modify the following:
- Pain point #2 should focus on [your correction]
- Remove feature X, it's out of scope for MVP
- The ICP should include [your adjustment]
- Add [missing feature] to the functional requirements
```

> 💡 Go back and forth here. Ask questions, adjust priorities, narrow scope. **This is where quality is decided.**

### Prompt 3 — Approve & Execute

Once satisfied with the plan:

```
Plan is approved. Manage the execution.
```

> Your AI will now create the database schema, backend routes, frontend pages, sidebar navigation, and translations. This typically generates the full MVP in one go.

### Prompt 4 — Catch the Gaps

AI assistants commonly miss i18n for non-English locales. Check immediately:

```
Did you miss the task "Add translations to remaining 4 locale files"?
```

### Prompt 5 — Validate the Build

```
Run dev servers and verify build compiles.
Validate only — I will do manual testing.
```

---

## Phase 2: Polish to Production Quality

### Prompt 6 — Visual Polish

After manual testing, share screenshots of the current state:

```
Polish all the pages to the app standards.
Here are sample screenshots of the expected look and feel:
[attach screenshots]
```

### Prompt 7 — Iterative Screenshot Review

This is the most critical stage. Compare each page with your vision:

```
Good progress. The pages look about 70% of what was expected. 
We need to reach 100% and there are some language gaps.

I will share screenshots of each page in the coming prompts.
Update your plan.
```

Then send page-by-page screenshots:

```
Here is the [PAGE NAME] page. Issues:
- [Specific visual issue]
- [Missing element]
- [Translation gap]
```

> 💡 **Keep iterating** until each page matches your standards. This is normal — it typically takes 2-3 rounds per page.

---

## Phase 3: Extending Page by Page

Once your MVP is live, use these sequences to add new pages and features one at a time.

### Prompt Sequence A — Adding a New Page

#### Step 1 — Plan the Page

```
I need to add a new [PAGE NAME] page to the app.

Requirements:
- [What the page shows — e.g., "A table of invoices with date/status/client filters"]
- [Key features — e.g., "Inline editing, CSV export, bulk actions"]
- [Data source — e.g., "Uses /api/invoices endpoint"]

Plan the page first. Show me:
1. Which SDK components you'll use
2. The page layout structure  
3. What backend API endpoints are needed
4. What sidebar/route changes are required
```

#### Step 2 — Build

```
Build the [PAGE NAME] page now. Follow the constitution:
- Use MMCard, MMTable, MMStatusBadge and other SDK components
- Executive Gold design system (no custom colors)
- Full i18n for all 5 locales (en, ar, fr, de, sw)
- Add lazy-loaded route to App.jsx
- Add sidebar navigation item in Sidebar.jsx
```

#### Step 3 — Connect Backend

```
Connect the [PAGE NAME] page to the backend:
1. Create client/src/services/[name]Service.js
2. Create server/src/routes/[name].js
3. Create server/src/controllers/[name]Controller.js
4. Use existing authMiddleware and tenantMiddleware
5. Add Prisma model if a new table is needed
6. Register the route in server/src/index.js
```

#### Step 4 — Review

```
Review the [PAGE NAME] page for:
1. SDK compliance — all components from @sdk?
2. i18n completeness — all 5 locale files updated?
3. Responsive design — works on mobile?
4. Multi-tenancy — data scoped to tenant?
5. Error handling — loading, empty, error states?
```

---

### Prompt Sequence B — Adding Business Logic

```
I need to add [FEATURE] to the existing [PAGE NAME] page.

Current behavior: [what it does now]
Desired behavior: [what it should do]

Constraints:
- Don't break existing functionality
- Follow constitution standards
- Keep Executive Gold design
- Update all 5 locale files
```

---

### Prompt Sequence C — Adding a Drawer / Detail Panel

```
I need a detail drawer for [ITEM] that opens when clicking 
a row in the [PAGE NAME] table.

Sections:
- [e.g., "Header with avatar and status"]
- [e.g., "Activity timeline"]
- [e.g., "Quick action buttons"]

Use MMDrawer from the SDK.
Follow the Analytical Drawer Robustness standard.
Add tabs if there are multiple sections.
```

---

### Prompt Sequence D — Adding Dashboard Analytics

```
I need a new dashboard card for [METRIC NAME].

Show:
- Primary metric: [e.g., "Total revenue this month"]
- Trend: [e.g., "% change vs last month"]
- Chart: [e.g., "Mini sparkline"]

Use the existing DashboardCard pattern.
Add data fetching to dashboardService.js.
Create backend endpoint if needed.
```

---

### Prompt Sequence E — Adding AI Co-Pilot Capabilities

```
I need a new AI Co-Pilot capability:

Feature: [What users will ask the Co-Pilot to do]
Data needed: [Database tables/views to query]
Actions: [READ only, or CREATE/UPDATE too?]

Follow existing Co-Pilot integration:
- Flowise proxy endpoint
- Add chatflow to Co-Pilot management
- Support queries in all 5 languages
```

---

### Prompt Sequence F — External API Integration

```
I need to integrate with [EXTERNAL API].

API Docs: [URL or description]
Auth: [API key / OAuth / etc.]

Requirements:
1. Service utility in server/src/services/
2. Environment variables for credentials
3. Backend proxy endpoint (never expose keys to frontend)
4. Rate limiting and error handling
```

---

## ✅ Session Checklist

After every build session, verify before committing:

| Check | Verify |
|-------|--------|
| SDK Compliance | All components use `@sdk` imports |
| Theme | Only CSS variables — no hardcoded colors |
| i18n Complete | All 5 locale files updated with real translations |
| Routes | `App.jsx` has lazy import + route |
| Sidebar | `Sidebar.jsx` has navigation item |
| Multi-Tenant | All queries filter by `tenantId` |
| Responsive | Works on desktop and mobile |
| States | Loading, empty, and error states handled |

---

## 💡 Pro Tips

1. **Constitution first, always** — never skip the Golden Rule prompt
2. **Batch locale updates** — say "add to all 5 locales at once" not one-by-one
3. **Reference existing pages** — say "follow the same pattern as Tasks page"
4. **Ask for SDK first** — "which SDK components should I use?" before building custom UI
5. **Screenshot review loops** — the fastest way to polish is sharing screenshots and iterating
6. **Review against constitution** — say "review this code against the constitution for compliance"

---

**Ready to build?** Start with Phase 1 if building a new app, or jump to Phase 3 if extending an existing one. Always start every session with the Golden Rule. 🎯
