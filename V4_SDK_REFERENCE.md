# 🎨 V4 SDK Component Reference

**Complete guide to using the MicroMind V4 SDK components in your frontend applications.**

---

## 📦 SDK Overview

The V4 SDK provides **12 production-ready React components** with the Executive Gold theme. All components support dark/light modes and follow consistent design patterns.

**Location:**  `client/src/sdk/components/`

---

## 🎨 Form Components

### MMButton

**Purpose:** Primary interactive element with multiple variants

**Props:**

```typescript
{
  variant: 'gold' | 'glass' | 'danger' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  isLoading: boolean
  disabled: boolean
  icon: ReactNode
  onClick: () => void
  type: 'button' | 'submit' | 'reset'
}
```

**Usage:**

```jsx
import MMButton from './sdk/components/MMButton';
import { Save, Trash2 } from 'lucide-react';

// Primary action
<MMButton variant="gold" icon={<Save size={16} />}>
  Save Dashboard
</MMButton>

// Danger action
<MMButton variant="danger" icon={<Trash2 size={16} />}>
  Delete
</MMButton>

// Loading state
<MMButton isLoading variant="gold">
  Processing...
</MMButton>

// Ghost (minimal) 
<MMButton variant="ghost" size="sm">
  Cancel
</MMButton>
```

---

### MMInput

**Purpose:** Text input with built-in validation and icons

**Props:**

```typescript
{
  label: string
  placeholder: string
  value: string
  onChange: (e) => void
  error: string
  type: 'text' | 'email' | 'password' | 'number'
  icon: ReactNode
  disabled: boolean
  required: boolean
}
```

**Usage:**

```jsx
import MMInput from './sdk/components/MMInput';
import { User, Mail } from 'lucide-react';

<MMInput
  label="Display Name"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  icon={<User size={18} />}
  required
/>

<MMInput
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  icon={<Mail size={18} />}
/>
```

---

### MMSelect

**Purpose:** Dropdown selection with search

**Props:**

```typescript
{
  label: string
  options: Array<{ value: string, label: string }>
  value: string
  onChange: (value) => void
  placeholder: string
  error: string
  disabled: boolean
}
```

**Usage:**

```jsx
import MMSelect from './sdk/components/MMSelect';

const plans = [
  { value: 'FREE', label: 'Free Plan' },
  { value: 'PRO', label: 'Pro Plan ($99/mo)' },
  { value: 'ENTERPRISE', label: 'Enterprise' }
];

<MMSelect
  label="Subscription Plan"
  options={plans}
  value={selectedPlan}
  onChange={setSelectedPlan}
  placeholder="Choose a plan"
/>
```

---

### MMTextarea

**Purpose:** Multi-line text input

**Props:**

```typescript
{
  label: string
  placeholder: string
  value: string
  onChange: (e) => void
  rows: number
  error: string
  disabled: boolean
}
```

**Usage:**

```jsx
import MMTextarea from './sdk/components/MMTextarea';

<MMTextarea
  label="Description"
  placeholder="Enter dashboard description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
/>
```

---

### MMCheckbox & MMSwitch

**Purpose:** Boolean input controls

**Props:**

```typescript
{
  label: string
  checked: boolean
  onChange: (checked) => void
  disabled: boolean
}
```

**Usage:**

```jsx
import MMCheckbox from './sdk/components/MMCheckbox';
import MMSwitch from './sdk/components/MMSwitch';

<MMCheckbox
  label="Make dashboard public"
  checked={isPublic}
  onChange={setIsPublic}
/>

<MMSwitch
  label="Enable dark mode"
  checked={darkMode}
  onChange={setDarkMode}
/>
```

---

## 📊 Display Components

### MMCard

**Purpose:** Container with glass morphism effect

**Props:**

```typescript
{
  title: string
  subtitle: string
  children: ReactNode
  className: string
  onClick: () => void
}
```

**Usage:**

```jsx
import MMCard from './sdk/components/MMCard';

<MMCard 
  title="Analytics Dashboard"
  subtitle="Last updated 2 hours ago"
>
  <div>Your dashboard content here</div>
</MMCard>

// Clickable card
<MMCard 
  title="Report #123"
  onClick={() => navigate(`/reports/123`)}
>
  Report preview...
</MMCard>
```

---

### MMBadge

**Purpose:** Status indicators and tags

**Props:**

```typescript
{
  variant: 'success' | 'warning' | 'danger' | 'info' | 'default'
  children: ReactNode
  size: 'sm' | 'md'
}
```

**Usage:**

```jsx
import MMBadge from './sdk/components/MMBadge';

<MMBadge variant="success">Active</MMBadge>
<MMBadge variant="warning">Pending</MMBadge>
<MMBadge variant="danger">Expired</MMBadge>
<MMBadge variant="info" size="sm">PRO</MMBadge>
```

---

### MMTable

**Purpose:** Data tables with sorting

**Props:**

```typescript
{
  columns: Array<{ key: string, label: string, sortable?: boolean }>
  data: Array<object>
  onRowClick: (row) => void
  emptyMessage: string
}
```

**Usage:**

```jsx
import MMTable from './sdk/components/MMTable';

const columns = [
  { key: 'name', label: 'Dashboard Name', sortable: true },
  { key: 'created', label: 'Created', sortable: true },
  { key: 'status', label: 'Status' }
];

const data = [
  { name: 'Sales Overview', created: '2024-01-15', status: 'Active' },
  { name: 'User Metrics', created: '2024-01-10', status: 'Draft' }
];

<MMTable
  columns={columns}
  data={data}
  onRowClick={(row) => console.log('Clicked:', row)}
  emptyMessage="No dashboards found"
/>
```

---

### MMPagination

**Purpose:** Pagination controls

**Props:**

```typescript
{
  currentPage: number
  totalPages: number
  onPageChange: (page) => void
  pageSize: number
  totalItems: number
}
```

**Usage:**

```jsx
import MMPagination from './sdk/components/MMPagination';

<MMPagination
  currentPage={page}
  totalPages={Math.ceil(total / pageSize)}
  onPageChange={setPage}
  totalItems={total}
  pageSize={pageSize}
/>
```

---

### MMSearch & MMFilterBar

**Purpose:** Search and filtering

**Usage:**

```jsx
import MMSearch from './sdk/components/MMSearch';
import MMFilterBar from './sdk/components/MMFilterBar';

<MMSearch
  placeholder="Search dashboards..."
  value={searchValue}
  onChange={setSearchValue}
/>

<MMFilterBar
  filters={['Active', 'Draft', 'Archived']}
  activeFilter={filter}
  onFilterChange={setFilter}
/>
```

---

## 🎨 Executive Gold Theme

### Color Palette

**Primary (Gold):**

```css
--primary: #D4AF37
--primary-dark: #B8941F
--primary-light: #E5C866
```

**Surface Colors:**

```css
--bg-primary: #0F0F0F
--bg-surface: rgba(255, 255, 255, 0.05)  /* Glass effect */
--bg-hover: rgba(255, 255, 255, 0.1)
```

**Text Colors:**

```css
--text-primary: #FFFFFF
--text-secondary: rgba(255, 255, 255, 0.7)
--text-muted: rgba(255, 255, 255, 0.5)
```

### Using Theme Variables

```jsx
<div style={{
  backgroundColor: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  border: `1px solid var(--border)`
}}>
  Themed content
</div>
```

---

## 🏗️ Common UI Patterns

### Form Pattern

```jsx
import { MMCard, MMInput, MMSelect, MMTextarea, MMButton } from './sdk/components';

function CreateDashboardForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'bar'
  });

  return (
    <MMCard title="Create Dashboard">
      <form onSubmit={handleSubmit}>
        <MMInput
          label="Dashboard Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <MMTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
        
        <MMSelect
          label="Chart Type"
          options={[
            { value: 'bar', label: 'Bar Chart' },
            { value: 'line', label: 'Line Chart' }
          ]}
          value={formData.type}
          onChange={(type) => setFormData({ ...formData, type })}
        />
        
        <MMButton type="submit" variant="gold">
          Create Dashboard
        </MMButton>
      </form>
    </MMCard>
  );
}
```

### List Pattern

```jsx
import { MMCard, MMBadge, MMPagination } from './sdk/components';

function DashboardList({ dashboards }) {
  return (
    <div>
      {dashboards.map(dashboard => (
        <MMCard
          key={dashboard.id}
          title={dashboard.title}
          subtitle={dashboard.description}
          onClick={() => navigate(`/dashboards/${dashboard.id}`)}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <MMBadge variant={dashboard.isPublic ? 'success' : 'info'}>
              {dashboard.isPublic ? 'Public' : 'Private'}
            </MMBadge>
            <MMBadge variant="default">
              {dashboard.views} views
            </MMBadge>
          </div>
        </MMCard>
      ))}
      
      <MMPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
```

### Settings Pattern

```jsx
import { MMCard, MMSwitch, MMSelect } from './sdk/components';

function SettingsPage() {
  return (
    <div>
      <MMCard title="Preferences">
        <MMSwitch
          label="Enable notifications"
          checked={notifications}
          onChange={setNotifications}
        />
        
        <MMSwitch
          label="Dark mode"
          checked={darkMode}
          onChange={setDarkMode}
        />
        
        <MMSelect
          label="Language"
          options={[
            { value: 'en', label: 'English' },
            { value: 'ar', label: 'Arabic' },
            { value: 'fr', label: 'French' }
          ]}
          value={language}
          onChange={setLanguage}
        />
      </MMCard>
    </div>
  );
}
```

---

## 🌐 Internationalization with SDK

All SDK components support i18n keys:

```jsx
import { useTranslation } from 'react-i18next';
import { MMButton, MMInput } from './sdk/components';

function TranslatedForm() {
  const { t } = useTranslation();
  
  return (
    <>
      <MMInput
        label={t('form.email')}
        placeholder={t('form.emailPlaceholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <MMButton variant="gold">
        {t('actions.save')}
      </MMButton>
    </>
  );
}
```

---

## 🎯 Best Practices

### ✅ Do's

```jsx
// ✅ Use SDK components for consistency
<MMButton variant="gold">Submit</MMButton>

// ✅ Leverage theme variables
style={{ color: 'var(--text-primary)' }}

// ✅ Compose SDK components
<MMCard>
  <MMTable data={data} />
  <MMPagination {...paginationProps} />
</MMCard>

// ✅ Use icons from lucide-react
import { Save } from 'lucide-react';
<MMButton icon={<Save size={16} />}>Save</MMButton>
```

### ❌ Don'ts

```jsx
// ❌ Don't create custom buttons when MMButton exists
<button className="custom-button">Submit</button>

// ❌ Don't hardcore colors
style={{ color: '#FFFFFF' }}  // Use var(--text-primary)

// ❌ Don't mix with other UI libraries
import { Button } from 'other-library';  // Use MMButton

// ❌ Don't ignore loading states
<MMButton onClick={async () => await save()}>  // Use isLoading prop
```

---

## 📏 Responsive Design

SDK components are mobile-friendly by default:

```jsx
// Responsive grid
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1rem'
}}>
  <MMCard title="Card 1">...</MMCard>
  <MMCard title="Card 2">...</MMCard>
  <MMCard title="Card 3">...</MMCard>
</div>

// Responsive sizing
<MMButton size="lg">Desktop</MMButton>
<MMButton size="md" className="hidden-mobile">Tablet</MMButton>
<MMButton size="sm" className="mobile-only">Mobile</MMButton>
```

---

## 🎨 Customizing SDK Components

### Override Specific Component Styles

```css
/* client/src/App.css */
.mm-btn--gold {
  --button-primary: #FF6B00;  /* Custom gold */
}

.mm-card {
  --card-border-radius: 16px;  /* More rounded */
}
```

### Extend Components

```jsx
// MyCustomButton.jsx
import MMButton from './sdk/components/MMButton';

function MyCustomButton(props) {
  return (
    <MMButton
      {...props}
      className={`my-custom-class ${props.className || ''}`}
    />
  );
}
```

---

## 🆘 Troubleshooting

**Q: Components not styled correctly?**  
**A:** Ensure you're importing the CSS:

```jsx
import './sdk/components/MMButton.css';
```

**Q: Theme variables not working?**  
**A:** Check `client/src/index.css` has theme variables defined

**Q: Icons not showing?**  
**A:** Install lucide-react:

```bash
npm install lucide-react
```

**Q: Dark mode not switching?**  
**A:** Add `data-theme="dark"` to `<html>` tag

---

## 📦 Complete Component Import Reference

```jsx
// Form Components
import MMButton from './sdk/components/MMButton';
import MMInput from './sdk/components/MMInput';
import MMSelect from './sdk/components/MMSelect';
import MMTextarea from './sdk/components/MMTextarea';
import MMCheckbox from './sdk/components/MMCheckbox';
import MMSwitch from './sdk/components/MMSwitch';

// Display Components
import MMCard from './sdk/components/MMCard';
import MMBadge from './sdk/components/MMBadge';
import MMTable from './sdk/components/MMTable';
import MMPagination from './sdk/components/MMPagination';
import MMSearch from './sdk/components/MMSearch';
import MMFilterBar from './sdk/components/MMFilterBar';

// Icons
import { Save, Edit, Trash2, Plus, X } from 'lucide-react';
```

---

**For complete styling reference, see:** `client/src/sdk/styles/theme.css`  
**For usage in existing pages, see:** `client/src/pages/*.jsx`
