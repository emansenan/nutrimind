# 🌐 Website & Marketing Materials — AI-Assisted Prompt Guide

> **Launch your MicroApp with a stunning website, multi-language marketing posts, and promotional content** — all generated through AI-assisted prompt sequences using the MicroMind identity and Executive Gold look & feel.

---

## 📌 Prerequisites

Before starting, ensure you have:

- A working MicroApp built on the MicroMind Base SAAS Template
- An AI coding assistant (Google Antigravity, Cursor, Copilot, etc.)
- Clear understanding of your app's target audience and value proposition

---

## Phase 1: Planning the Website

### Prompt 1 — Set Direction

```
We need to build a dedicated website for this MicroApp, targeting 
its ICP, exposing its value and features.

You should help me set the optimal:
- ICP (Ideal Customer Profile)
- Business goals
- Features and benefits messaging
- Converting headlines and CTAs

Before we build. The website should keep the AI MicroMind identity 
and look & feel.
```

### Prompt 2 — Refine ICP & Messaging

Your AI will propose ICP options, headlines, and positioning. Review and adjust:

```
ICP: I've targeted [proposed ICP]. Does this match your target?
→ [Your answer — e.g., "Excellent match. You can broaden to include..."]

Headline: I've proposed 3 options — which resonates most?
→ [Pick one — e.g., "Option 1: AI-Powered Project Management for Teams That Deliver"]

Pricing Tiers: Should I use real pricing or placeholders?
→ [e.g., "Use real pricing numbers"]

Testimonials: Real testimonials or placeholder content?
→ [e.g., "Add attractive content until we have real testimonials"]
```

### Prompt 3 — Technical Setup

```
Technical approach: Standalone Vite+React static site.
Location: D:\[YOUR_PROJECT]\website\

Approved. Build it.
```

> 💡 **Why standalone?** The website is a marketing site, not part of the app. It should be independently deployable.

---

## Phase 2: Building the Website

Your AI will generate a complete multi-page website. The typical structure includes:

| Page | Purpose |
|------|---------|
| **Home** | Hero, value proposition, features, social proof, CTA |
| **Features** | Detailed feature showcase with visuals |
| **Pricing** | Tier comparison cards with real pricing |
| **About** | Company story, team, mission |
| **Contact** | Contact form, demo booking |

### Prompt 4 — Review & Refine Content

```
Review the pain points section. Modify:
- Pain point about [X] should mention [specific issue]
- Add the AI Co-Pilot value proposition:

Our MicroMind Co-Pilot exists on web and mobile. It helps users:
1. Find fast answers through existing app GET APIs
2. Do actions or input data through existing POST/PUT APIs

Users can speak in their native language while master data stays 
in the company base language. The Co-Pilot summarizes, validates, 
improves readability, translates, and asks approval before sending.
```

### Prompt 5 — Visual Polish

```
Ensure the pricing cards have the same height for proper horizontal 
alignment.

Adjust pricing:
- Increase Starter to $[X]/month
- Decrease Pro to $[X]/month
- Include [specific feature] in the Pro tier
```

---

## Phase 3: Multi-Language Support

### Prompt 6 — Add All Languages

```
Add the other languages. Set your plan.

Translations should capture deep meaning and intent — not word-to-word 
translation. Consider translations for all 5 supported languages:
- English, Arabic, French, German, Swahili

Update your plan.
```

> Your AI will create locale files and implement language switching with full RTL support for Arabic.

### Prompt 7 — Approve & Execute

```
Plan approved. Execute.
```

---

## Phase 4: Marketing Posts

### Prompt 8 — Generate Marketing Content

```
Generate 5 ready-to-publish marketing posts:

Platforms: LinkedIn, Twitter/X, Email campaigns
Tone: Professional, bold, outcome-driven
Audience: [Your ICP — e.g., "CFOs, Credit Managers, Operations Directors"]

Post types:
1. Launch Announcement
2. Problem-Agitation (Pain Point Focus)
3. Stats & Social Proof
4. How It Works (Educational)
5. Decision-Maker Direct (CFO/CEO Angle)

Include hashtags and CTA links.
```

### Prompt 9 — Translate Marketing Posts

```
Translate all 5 marketing posts to Arabic.
Keep the emotional impact and business tone — not literal translation.
```

> 💡 Repeat for other languages as needed.

---

## 📁 Expected Output Structure

After completing this workflow, your project should contain:

```
D:\[YOUR_PROJECT]\
├── website/                          # Marketing website
│   ├── src/
│   │   ├── pages/                    # Home, Features, Pricing, etc.
│   │   ├── components/               # Navbar, Footer, ScrollReveal, etc.
│   │   ├── locales/                  # en.json, ar.json, fr.json, etc.
│   │   ├── i18n.js                   # Language configuration
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── dist/                         # Production build
│   ├── package.json
│   └── vite.config.js
├── marketing posts example/          # Marketing content
│   ├── marketing_posts.md            # English posts
│   └── marketing_posts_ar.md         # Arabic posts
└── client/                           # Your main MicroApp
```

---

## 🎯 Design Standards

Your website should follow these MicroMind branding guidelines:

| Element | Standard |
|---------|----------|
| **Color Palette** | Executive Gold (`#E0AA3E`), dark backgrounds (`#0A0A0A` → `#1A1A1A`) |
| **Typography** | Inter font family, bold headlines, clean body text |
| **Animations** | Scroll-reveal (fade-up, fade-in), hover micro-animations |
| **Cards** | Glassmorphism effects, subtle borders, gradient accents |
| **CTAs** | Gold gradient buttons, high contrast against dark backgrounds |
| **RTL** | Full right-to-left layout support for Arabic |
| **Responsive** | Mobile-first, tested at 375px, 768px, 1024px, 1440px |

---

## 💡 Pro Tips

1. **Keep MicroMind identity** — your website is a product of the MicroMind ecosystem
2. **Real pricing converts better** — use actual numbers, not "Contact Us" placeholders
3. **Pain points before features** — lead with problems your ICP faces, then show solutions
4. **Social proof early** — stats and testimonials above the fold
5. **Multi-language from day one** — don't retrofit i18n later, ask for it during initial build
6. **Screenshot reviews** — share browser screenshots for iterative visual polish

---

**Ready?** Start with Prompt 1 and let your AI guide you through the complete go-to-market setup. 🚀
