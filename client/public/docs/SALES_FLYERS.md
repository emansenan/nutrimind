# 📄 Sales Flyers — AI-Assisted Prompt Guide

> **Create stunning, print-ready A4 sales flyers** with the Executive Gold design system — from feature highlights and pricing to CTA and PDF generation — all through AI prompt sequences.

---

## 📌 Overview

Sales flyers are single-file HTML documents designed for A4 print. They use the Executive Gold branding and are optimized for browser-to-PDF printing. No framework required — pure HTML + CSS.

---

## Phase 1: Planning the Flyer

### Prompt 1 — Request the Flyer

```
I need to have an attractive sales flyer for this app.
Can you help me?

The flyer should:
- Follow the Executive Gold design system
- Highlight the key features and benefits
- Include pricing tiers
- Have a clear call-to-action
- Be designed for A4 print (PDF-ready)
```

### Prompt 2 — Review & Refine Content

Your AI will generate a flyer. Review and adjust:

```
Adjust the flyer:
- Update the headline to [your preferred headline]
- Change Starter pricing to $[X]/month
- Add [missing feature] to the feature grid
- The AI Co-Pilot section should emphasize [specific value]
- Include these stats: [your metrics]
```

---

## Phase 2: Multi-Page Structure

### Prompt 3 — Request PDF Format

```
Need to save it as PDF. Content should respect A4 page size. 
Multiple pages are allowed.
```

> Your AI will restructure the content into A4 pages with proper page breaks.

### Typical Flyer Structure

| Page | Content |
|------|---------|
| **Page 1** | Header, hero headline, key stats, feature grid, supported views & languages |
| **Page 2** | AI Co-Pilot showcase, pricing tiers, "Why [App Name]" value cards, CTA |

---

## Phase 3: PDF Generation

### Option A — Browser Print (Simplest)

1. Open the `flyer.html` file in Chrome
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Set **Destination** to "Save as PDF"
4. Set **Paper size** to A4
5. Set **Margins** to None
6. Enable **Background graphics**
7. Click **Save**

### Option B — Automated Script

Create a `generate-pdf.js` script using Puppeteer:

```javascript
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const filePath = path.resolve(__dirname, 'flyer.html');
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
    
    await page.pdf({
        path: 'Sales_Flyer.pdf',
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    
    await browser.close();
    console.log('PDF generated: Sales_Flyer.pdf');
})();
```

Install and run:

```bash
npm install puppeteer
node generate-pdf.js
```

---

## 🎨 A4 Page CSS System

The flyer uses a CSS page system for print-perfect output:

```css
/* A4 Page Container */
.page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: var(--bg);
    position: relative;
    overflow: hidden;
    page-break-after: always;
}

.page:last-child {
    page-break-after: avoid;
}

/* Print-specific styles */
@media print {
    body { background: var(--bg); margin: 0; }
    .page { box-shadow: none; margin: 0; }
}

@page {
    size: A4;
    margin: 0;
}

/* Screen preview (shows shadow around pages) */
@media screen {
    body { background: #333; padding: 20px 0; }
    .page { box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }
}
```

Key rules:

- **Width:** Always `210mm` (A4 width)
- **Height:** `min-height: 297mm` (A4 height)
- **Page breaks:** `page-break-after: always` between pages
- **Print colors:** `-webkit-print-color-adjust: exact` to preserve dark backgrounds

---

## 📁 Expected Output

```
D:\[YOUR_PROJECT]\
├── website/                          # or Sales Flyers/
│   ├── flyer.html                    # Self-contained HTML flyer
│   ├── generate-pdf.js               # Optional Puppeteer script
│   ├── [AppName]_Sales_Flyer.pdf     # Generated PDF
│   └── package.json                  # If using Puppeteer
└── Sales Flyers/                     # Collection of all flyers
    ├── [App1] — Sales Flyer.pdf
    └── [App2] — Sales Flyer.pdf
```

---

## 🎯 Design Standards for Flyers

| Element | Standard |
|---------|----------|
| **Background** | Dark (`#0A0A0A`) with subtle radial glows |
| **Accent** | Executive Gold (`#E0AA3E`) for highlights, stats, CTAs |
| **Typography** | Inter font, 900 weight for headlines, 400-600 for body |
| **Feature Cards** | `#1A1A1A` background, `#2A2A2A` borders, gold accent bars |
| **Pricing Cards** | Grid layout, equal heights, "Most Popular" badge on recommended tier |
| **Stats Row** | Large gold numbers with uppercase labels |
| **CTA Buttons** | Gold gradient (`#E0AA3E → #F4C34B`), dark text |
| **Footer** | Minimal — brand logo, copyright, links |

---

## 💡 Pro Tips

1. **One file = one flyer** — keep everything in a single HTML file (styles included) for portability
2. **Test print early** — print to PDF after the first draft to catch layout issues
3. **Gold on dark converts** — the Executive Gold palette is designed for visual impact on print
4. **Keep text concise** — flyers are scanned in seconds, use bullet points and stats
5. **Include all pricing** — real numbers convert better than "Contact Us"
6. **Use decorative glows** — subtle `radial-gradient` backgrounds add depth without being distracting

---

**Ready?** Paste the Phase 1 prompt into your AI assistant, then iterate on content and styling until you have a polished, print-ready flyer. 📄
