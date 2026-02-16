# Contributing to MicroMind Base SAAS Template

Thank you for your interest in contributing! This guide will help you get started.

---

## 🏗️ Development Setup

1. **Fork** the repository on GitHub
2. **Clone** your fork:

   ```bash
   git clone https://github.com/YOUR-USERNAME/base-template.git
   cd MicroMind-Base-Template
   ```

3. **Install dependencies:**

   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. **Set up environment:** Copy `server/.env.example` to `server/.env` and configure

5. **Run the app:**

   ```bash
   # Terminal 1
   cd server && npm run dev

   # Terminal 2
   cd client && npm run dev
   ```

---

## 📋 How to Contribute

### Reporting Bugs

- Search [existing issues](https://github.com/aimicromind/base-template/issues) first
- Include steps to reproduce, expected vs actual behavior
- Include browser/Node.js/OS version info

### Suggesting Features

- Open a [GitHub Discussion](https://github.com/aimicromind/base-template/discussions) first
- Explain the use case and why it belongs in the base template
- Feature requests that are app-specific (not template-generic) may be declined

### Submitting Pull Requests

1. Create a branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style guidelines below
3. Test your changes:

   ```bash
   # Ensure both client and server start without errors
   cd client && npm run build   # Verify production build
   ```

4. Commit with a clear message:

   ```bash
   git commit -m "feat: add widget component to SDK"
   ```

5. Push and open a PR against `main`

---

## 🎨 Code Style

### Frontend (React/JSX)

- Use **functional components** with hooks
- Import SDK components from `@sdk`:

  ```jsx
  import { MMButton, MMCard } from '@sdk';
  ```

- Follow the **Executive Gold** design system — use CSS variables from `theme.css`
- Add translations for all user-facing text in all 5 locale files (`en`, `ar`, `fr`, `de`, `sw`)
- Use `useTranslation()` hook for all strings

### Backend (Node.js/Express)

- Use **async/await** (no callbacks)
- Follow existing route patterns in `server/src/routes/`
- Use Prisma for all database operations
- Add proper error handling with try/catch

### CSS

- Use vanilla CSS (no Tailwind utility classes in components)
- Reference theme variables: `var(--primary)`, `var(--bg-card)`, etc.
- Prefix component-specific classes with the component name (e.g., `.docs-sidebar-link`)

### File Naming

- React components: `PascalCase.jsx` (e.g., `MyComponent.jsx`)
- CSS files: Match component name (e.g., `MyComponent.css`)
- Server routes: `camelCase.js` (e.g., `userRoutes.js`)
- Documentation: `UPPER_SNAKE_CASE.md` (e.g., `QUICK_START.md`)

---

## 📂 What Belongs in the Base Template

**✅ Do contribute:**

- Bug fixes
- SDK component improvements or new components
- i18n improvements (new languages, translation fixes)
- Documentation improvements
- Performance optimizations
- Accessibility improvements
- Security fixes

**❌ Don't contribute:**

- App-specific business logic
- Features that only apply to one type of MicroApp
- Changes to the AI constitution that alter coding standards without discussion
- New npm dependencies without prior discussion

---

## 🔍 Pull Request Checklist

Before submitting, verify:

- [ ] App starts without console errors (both client and server)
- [ ] `npm run build` succeeds in the client directory
- [ ] All 5 locale files are updated if you added user-facing text
- [ ] RTL layout is not broken (test with Arabic locale)
- [ ] No hardcoded strings — all text uses `t('key')` translation
- [ ] No secrets or credentials in the code
- [ ] CSS follows the Executive Gold design system

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the **Apache License 2.0**.

---

## 💬 Questions?

- 💬 **[Discord](https://discord.gg/aimicromind)** — Chat with the team
- 💡 **[GitHub Discussions](https://github.com/aimicromind/base-template/discussions)** — Ask questions

Thank you for helping improve MicroMind! 🚀
