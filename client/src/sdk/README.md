# MicroMind V4 Embedded SDK

A comprehensive UI component library for building enterprise SAAS applications with the **Executive Gold** design system.

---

## 📦 Installation

### In This App

Components are already available via the `@sdk` alias:

```javascript
import { MMCard, MMButton, MMTable } from '@sdk';
```

### In New Apps

1. Copy the entire `src/sdk/` folder to your new project
2. Add Vite alias in `vite.config.js`:

```javascript
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@sdk': path.resolve(__dirname, './src/sdk')
    }
  }
});
```

3. Import theme CSS in your main entry point:

```javascript
import './sdk/styles/theme.css';
```

---

## 🎨 Theme Customization

The SDK uses CSS variables for theming. All variables are defined in `sdk/styles/theme.css`.

### Dark Mode (Default)

```css
:root {
  --bg-surface: #1C1C1C;
  --text-primary: #F2F3EC;
  --primary: #E0AA3E; /* Executive Gold */
}
```

### Light Mode

Toggle theme by setting `data-theme="light"` on the `<html>` element:

```javascript
document.documentElement.setAttribute('data-theme', 'light');
```

### Custom Overrides

Override any variable in your own CSS:

```css
:root {
  --primary: #YOUR_COLOR;
}
```

---

## 📚 Components Reference

### Core Components

#### MMCard

Standard container component with glassmorphism and gold accents.

**Props:**

- `children` - Card content
- `title` - Optional header title
- `subtitle` - Optional header subtitle
- `variant` - `'default'` | `'glass'` | `'solid'`
- `className` - Additional CSS classes

**Example:**

```jsx
import { MMCard } from '@sdk';

<MMCard title="Dashboard" variant="glass">
  <p>Content goes here</p>
</MMCard>
```

---

#### MMButton

Interactive button with Gold gradients and hover effects.

**Props:**

- `children` - Button text/content
- `variant` - `'gold'` | `'glass'` | `'danger'` | `'ghost'`
- `size` - `'sm'` | `'md'` | `'lg'`
- `isLoading` - Show loading spinner
- `icon` - Lucide icon component
- `onClick` - Click handler

**Example:**

```jsx
import { MMButton } from '@sdk';
import { Save } from 'lucide-react';

<MMButton variant="gold" icon={Save} onClick={handleSave}>
  Save Changes
</MMButton>
```

---

#### MMBadge

Status indicators with pulse animations.

**Props:**

- `children` - Badge text
- `variant` - `'success'` | `'warning'` | `'error'` | `'info'` | `'gold'` | `'outline'`
- `pulse` - Enable pulse animation

**Example:**

```jsx
import { MMBadge } from '@sdk';

<MMBadge variant="success" pulse>Active</MMBadge>
```

---

#### MMTable

High-density data grid with Executive styling.

**Props:**

- `columns` - Array of `{ header, accessor, width }`
- `data` - Array of row objects
- `renderRow` - Optional custom row renderer
- `isLoading` - Show loading state
- `emptyMessage` - Message when no data

**Example:**

```jsx
import { MMTable } from '@sdk';

const columns = [
  { header: 'Name', accessor: 'name', width: '40%' },
  { header: 'Email', accessor: 'email', width: '60%' }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
];

<MMTable columns={columns} data={data} />
```

---

#### MMSearch

Search input with integrated icon and gold focus states.

**Props:**

- `value` - Controlled input value
- `onChange` - Change handler
- `placeholder` - Placeholder text
- `className` - Additional CSS classes

**Example:**

```jsx
import { MMSearch } from '@sdk';

<MMSearch 
  value={searchTerm} 
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search customers..."
/>
```

---

#### MMSelect

Custom dropdown component (replaces browser default).

**Props:**

- `value` - Current selected value
- `onChange` - Change handler (receives value)
- `options` - Array of `{ value, label }`
- `placeholder` - Default text

**Example:**

```jsx
import { MMSelect } from '@sdk';

const options = [
  { value: 'all', label: 'All Items' },
  { value: 'active', label: 'Active Only' }
];

<MMSelect 
  value={filter} 
  onChange={setFilter}
  options={options}
/>
```

---

#### MMFilterBar

Layout container for aligning search (left) and filters (right).

**Props:**

- `children` - Filter controls
- `className` - Additional CSS classes

**Example:**

```jsx
import { MMFilterBar, MMSearch, MMSelect } from '@sdk';

<MMFilterBar>
  <MMSearch value={search} onChange={setSearch} />
  <MMSelect value={filter} onChange={setFilter} options={options} />
</MMFilterBar>
```

---

### Advanced Modules

#### MMMap

Leaflet wrapper with theme support and custom markers.

**Dependencies:** Requires `leaflet` and `react-leaflet`

**Props:**

- `markers` - Array of `{ lat, lon, title, color, label, content }`
- `center` - `[lat, lon]` array
- `zoom` - Zoom level (default: 12)
- `height` - Container height (default: '400px')

**Example:**

```jsx
import { MMMap } from '@sdk';

const markers = [
  { 
    lat: 33.3, 
    lon: 44.4, 
    title: 'Location A', 
    color: '#ef4444',
    content: <div>Customer details here</div>
  }
];

<MMMap markers={markers} center={[33.3, 44.4]} zoom={13} />
```

---

#### MMCalendarBoard

Generic drag-and-drop Kanban/Calendar board.

**Dependencies:** Requires `react-beautiful-dnd`

**Props:**

- `columns` - Array of `{ id, title, subtitle, isDropDisabled }`
- `items` - Array of `{ id, columnId, ...data }`
- `onDragEnd` - Drag end handler (receives result)
- `renderItem` - Custom item renderer `(item, isDragging) => ReactNode`
- `renderColumnHeader` - Optional custom header renderer

**Example:**

```jsx
import { MMCalendarBoard, MMCard } from '@sdk';

const columns = [
  { id: 'mon', title: 'Monday', subtitle: '0/5' },
  { id: 'tue', title: 'Tuesday', subtitle: '3/5' }
];

const items = [
  { id: 't1', columnId: 'mon', customerName: 'John Doe' }
];

<MMCalendarBoard 
  columns={columns}
  items={items}
  onDragEnd={handleDragEnd}
  renderItem={(item) => (
    <MMCard title={item.customerName} variant="glass" />
  )}
/>
```

---

#### MMFileImport

File upload wizard with drag-and-drop and validation.

**Props:**

- `allowedExtensions` - Array like `['xlsx', 'csv']`
- `onUpload` - Upload handler (async function)
- `title` - Card title
- `subtitle` - Card subtitle

**Example:**

```jsx
import { MMFileImport } from '@sdk';

const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  await fetch('/api/upload', { method: 'POST', body: formData });
};

<MMFileImport 
  allowedExtensions={['xlsx', 'csv']}
  onUpload={handleUpload}
  title="Upload Data File"
/>
```

---

## 🔧 Peer Dependencies

Some advanced modules require additional libraries:

| Component | Dependencies |
|-----------|-------------|
| **MMMap** | `leaflet`, `react-leaflet` |
| **MMCalendarBoard** | `react-beautiful-dnd` |
| **All Components** | `lucide-react` (for icons) |

Install if needed:

```bash
npm install leaflet react-leaflet react-beautiful-dnd lucide-react
```

---

## 🎯 Best Practices

1. **Always import theme CSS** in your app entry point
2. **Use the @sdk alias** for cleaner imports
3. **Wrap forms in MMFilterBar** for consistent layouts
4. **Use MMCard** as the base container for content sections
5. **Prefer MMButton** over native buttons for brand consistency
6. **Use semantic variants** (success, warning, danger) for status

---

## 📖 Examples

### Dashboard Card with Actions

```jsx
import { MMCard, MMButton } from '@sdk';
import { Plus, Download } from 'lucide-react';

<MMCard 
  title="Recent Customers" 
  subtitle="Last 30 days"
  variant="glass"
>
  {/* Content */}
  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
    <MMButton variant="gold" icon={Plus}>Add New</MMButton>
    <MMButton variant="ghost" icon={Download}>Export</MMButton>
  </div>
</MMCard>
```

### Data Table with Search & Filter

```jsx
import { MMFilterBar, MMSearch, MMSelect, MMTable } from '@sdk';

<>
  <MMFilterBar>
    <MMSearch value={search} onChange={setSearch} />
    <MMSelect value={status} onChange={setStatus} options={statusOptions} />
  </MMFilterBar>
  
  <MMTable columns={columns} data={filteredData} />
</>
```

---

## 🚀 Roadmap

Future components planned:

- `MMPagination` - Table pagination controls
- `MMInput` - Form text inputs
- `MMModal` - Centered modal dialogs
- `MMToast` - Notification system
- `MMTabs` - Tabbed interfaces

---

## 📄 License

Internal use only - MicroMind V4 SDK
