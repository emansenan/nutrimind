# 🎨 Branding Customization Guide

This guide explains how to customize the **MicroMind Base SAAS Template** with your own branding, including logos, colors, fonts, and theme preferences.

---

## 📋 Table of Contents

1. [Changing Logos](#1-changing-logos)
2. [Updating Color Scheme](#2-updating-color-scheme)
3. [Customizing Typography](#3-customizing-typography)
4. [Theme Configuration](#4-theme-configuration)
5. [Application Name & Metadata](#5-application-name--metadata)
6. [Favicon & Browser Tab](#6-favicon--browser-tab)
7. [Quick Checklist](#7-quick-checklist)

---

## 1. Changing Logos

### 📍 Locations to Update

#### A. Sidebar Logo

**File:** `client/src/components/Sidebar.jsx`

**Current Implementation:**

```jsx
<div className="sidebar-logo">
  <img src="/assets/logo.png" alt="MicroMind Logo" 
       style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
</div>
<div className="sidebar-branding">
  <div className="brand-name">MicroMind</div>
  <div className="product-name">Base Template</div>
</div>
```

**How to Change:**

```jsx
<div className="sidebar-logo">
  <img src="/assets/YOUR-LOGO.png" alt="Your Company Logo" 
       style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
</div>
<div className="sidebar-branding">
  <div className="brand-name">Your Company</div>
  <div className="product-name">Your Product</div>
</div>
```

**Logo Requirements:**

- **Format:** PNG or SVG
- **Size:** 40x40px (or square aspect ratio)
- **Background:** Transparent recommended
- **Location:** Place in `client/public/assets/logo.png`

---

#### B. Login Screen Logo (If Applicable)

**File:** `client/src/pages/LoginScreen.jsx`

Search for logo references and update similarly.

---

#### C. Email/Print Headers (Future Use)

When you add email templates or PDF reports, use:

```jsx
<img src="/assets/logo-full.png" alt="Company Logo" />
```

---

### 📁 Recommended Logo Files

Create these logo variations:

```
client/public/assets/
├── logo.png              # Square logo (40x40) - Sidebar
├── logo-full.png         # Full logo with text - Login/Headers  
├── logo-white.png        # White version for dark backgrounds
└── logo-icon.svg         # Icon-only SVG version
```

---

## 2. Updating Color Scheme

### 🎨 Theme Color Variables

**File:** `client/src/index.css`

**Current Executive Gold Theme:**

```css
:root[data-theme="dark"] {
  /* Primary Gold */
  --primary: #E0AA3E;
  --primary-hover: #F4C34B;
  --primary-dark: #C89533;
  
  /* Background */
  --bg-primary: #0F0F0F;
  --bg-surface: #1A1A1A;
  --bg-hover: #242424;
  
  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  
  /* Borders */
  --border: #2A2A2A;
  --border-hover: #3A3A3A;
  
  /* Status Colors */
  --success: #16a34a;
  --warning: #f59e0b;
  --error: #dc2626;
  --info: #3b82f6;
}
```

---

### 🔄 Change to Your Brand Colors

**Example: Blue Tech Theme**

```css
:root[data-theme="dark"] {
  /* Primary Blue */
  --primary: #3B82F6;           /* Your brand blue */
  --primary-hover: #60A5FA;
  --primary-dark: #2563EB;
  
  /* Keep backgrounds or customize */
  --bg-primary: #0F1419;        /* Darker blue-tinted */
  --bg-surface: #1A202C;
  --bg-hover: #2D3748;
  
  /* Text (usually keep as-is) */
  --text-primary: #FFFFFF;
  --text-secondary: #A0AEC0;
  
  /* Borders */
  --border: #2D3748;
  --border-hover: #4A5568;
  
  /* Status Colors (optional to change) */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #06B6D4;
}
```

---

### 🌞 Light Mode Colors

**Update light mode** in the same file:

```css
:root[data-theme="light"] {
  --primary: #3B82F6;           /* Same as dark */
  --primary-hover: #2563EB;
  --primary-dark: #1D4ED8;
  
  --bg-primary: #FFFFFF;
  --bg-surface: #F9FAFB;
  --bg-hover: #F3F4F6;
  
  --text-primary: #111827;
  --text-secondary: #6B7280;
  
  --border: #E5E7EB;
  --border-hover: #D1D5DB;
}
```

---

### 🎯 Where Colors Are Used

| Variable | Usage |
|----------|-------|
| `--primary` | Buttons, links, active states, accents |
| `--primary-hover` | Hover states for primary elements |
| `--bg-primary` | Page background |
| `--bg-surface` | Cards, panels, modals |
| `--bg-hover` | Hover background for rows/items |
| `--text-primary` | Main text color |
| `--text-secondary` | Labels, subtitles, placeholders |
| `--border` | Borders, dividers |
| `--success` | Success messages, positive actions |
| `--warning` | Warnings, pending states |
| `--error` | Errors, destructive actions |
| `--info` | Info messages, neutral alerts |

---

## 3. Customizing Typography

### 🔤 Font Family

**File:** `client/src/index.css`

**Current Font:**

```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Change to Your Font:**

```css
/* 1. Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* 2. Apply to body */
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

### 📊 Font Sizes

**File:** `client/tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px (default)
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
      }
    }
  }
}
```

**Customize as needed!**

---

## 4. Theme Configuration

### ⚙️ Tailwind Theme Customization

**File:** `client/tailwind.config.js`

**Example Customization:**

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your custom color palette
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',  // Primary
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        }
      },
      borderRadius: {
        'DEFAULT': '12px',    // Default card radius
        'lg': '16px',
        'xl': '20px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    }
  },
  plugins: []
}
```

---

### 🌗 Default Theme (Dark/Light)

**File:** `client/src/index.css` (bottom of file)

**Set default:**

```css
/* Force dark mode as default */
:root {
  color-scheme: dark;
}

/* Or force light mode */
:root {
  color-scheme: light;
}
```

**In localStorage:**
Users' theme preference is saved in `localStorage.getItem('theme')`.

---

## 5. Application Name & Metadata

### 📝 Browser Tab Title

**File:** `client/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- UPDATE THESE -->
  <title>Your Application Name</title>
  <meta name="description" content="Your application description" />
</head>
```

---

### 🏷️ Application Name in Code

**File:** `client/src/components/Sidebar.jsx`

```jsx
<div className="sidebar-branding">
  <div className="brand-name">Your Company</div>
  <div className="product-name">Your Product</div>
</div>
```

**File:** `server/src/index.js`

```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Your Application API',  // Update here
    version: '1.0.0'
  });
});
```

---

## 6. Favicon & Browser Tab

### 🎯 Favicon Files

**Location:** `client/public/`

**Files to Replace:**

```
client/public/
├── favicon.ico           # 32x32 ICO
├── favicon.svg           # SVG version (recommended)
├── apple-touch-icon.png  # 180x180 for iOS
└── favicon-16x16.png     # Optional 16x16
└── favicon-32x32.png     # Optional 32x32
```

---

### 📱 PWA Icons (Optional)

If you want Progressive Web App support:

**File:** `client/public/manifest.json`

```json
{
  "name": "Your Application",
  "short_name": "YourApp",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#3B82F6",
  "background_color": "#0F0F0F",
  "display": "standalone"
}
```

**Link in `index.html`:**

```html
<link rel="manifest" href="/manifest.json" />
```

---

## 7. Quick Checklist

### ✅ Branding Checklist

- [ ] **Replace logos** in `client/public/assets/`
- [ ] **Update Sidebar branding** in `Sidebar.jsx`
- [ ] **Change color scheme** in `index.css`
- [ ] **Update application name** in `index.html`
- [ ] **Replace favicon** in `client/public/`
- [ ] **Customize font** (optional) in `index.css`
- [ ] **Update Tailwind config** (optional) in `tailwind.config.js`
- [ ] **Set default theme** (dark/light) in `index.css`
- [ ] **Update API service name** in `server/src/index.js`
- [ ] **Test both dark and light modes**

---

## 🎨 Color Scheme Examples

### Example 1: Green Nature

```css
--primary: #10B981;      /* Emerald green */
--bg-primary: #0A1F1A;   /* Dark green-tinted */
```

### Example 2: Purple Creative

```css
--primary: #8B5CF6;      /* Purple */
--bg-primary: #1A1625;   /* Dark purple-tinted */
```

### Example 3: Orange Energy

```css
--primary: #F97316;      /* Orange */
--bg-primary: #1F1309;   /* Dark orange-tinted */
```

### Example 4: Teal Modern

```css
--primary: #14B8A6;      /* Teal */
--bg-primary: #0A1F1D;   /* Dark teal-tinted */
```

---

## 🧪 Testing Your Branding

1. **Start dev server:**

   ```bash
   cd client
   npm run dev
   ```

2. **Check all pages:**
   - Login screen
   - Dashboard
   - Sidebar
   - All navigation items

3. **Test both themes:**
   - Toggle dark/light mode via settings
   - Verify colors look good in both

4. **Check responsiveness:**
   - Desktop view
   - Tablet view
   - Mobile view

5. **Verify favicons:**
   - Check browser tab icon
   - Check bookmarks icon

---

## 📸 Screenshots for Reference

After customizing, take screenshots of:

- Login page
- Dashboard (both dark/light)
- Sidebar expanded
- Modal dialogs
- Settings page

---

## 🎉 You're Done

Your MicroMind Base SAAS Template is now branded with your company's identity!

**Need help?** Review the main [README.md](./README.md) or [SETUP.md](./SETUP.md).
