# Form Page Design Guideline - NAS Framework

**Last Updated:** January 16, 2025
**Purpose:** Design guidelines for complex form pages with multiple sections
**Reference Implementation:** [mockup-siasatan/index.vue](pages/mockup-siasatan/index.vue)
**Design Philosophy:** Clean, organized, tab-based navigation with responsive layout

---

## Table of Contents

1. [Overview](#overview)
2. [Page Structure](#page-structure)
3. [Navigation Patterns](#navigation-patterns)
4. [Layout System](#layout-system)
5. [Form Components](#form-components)
6. [Data Tables](#data-tables)
7. [Responsive Behavior](#responsive-behavior)
8. [Implementation Checklist](#implementation-checklist)

---

## Overview

This guideline covers the design and implementation of complex form pages that contain:
- Multiple tabs for different major sections
- Sub-sections within tabs (using pills navigation)
- 70/30 split layout (content + sidebar)
- Data tables and form inputs
- Action buttons and status indicators

**Use Cases:**
- Investigation/Assessment forms
- Application forms with multiple sections
- Profile management pages
- Multi-step data entry workflows

---

## Page Structure

### 1. Page Header

```vue
<div class="flex justify-between items-center mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
      Page Title
    </h1>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
      Subtitle or Reference Number
    </p>
  </div>
  <div class="flex items-center gap-3">
    <rs-badge variant="warning">STATUS</rs-badge>
  </div>
</div>
```

**Specifications:**
- Title: `text-2xl font-bold`
- Subtitle: `text-sm text-gray-600 mt-1`
- Badge for status indication
- Flex layout with `justify-between`

### 2. Main Layout Structure

```vue
<div class="grid grid-cols-12 gap-6">
  <!-- Left Column: 70% -->
  <div class="col-span-12 lg:col-span-8">
    <!-- Main content -->
  </div>

  <!-- Right Column: 30% -->
  <div class="col-span-12 lg:col-span-4">
    <!-- Sidebar -->
  </div>
</div>
```

**Grid System:**
- Use 12-column grid
- Main content: `col-span-8` (66.67%)
- Sidebar: `col-span-4` (33.33%)
- Full width on mobile: `col-span-12`
- Gap: `gap-6` (24px)

---

## Navigation Patterns

### 1. Tab Navigation (Primary Level)

**Visual Style:**
```vue
<div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
  <button
    :class="[
      'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
      isActive
        ? 'border-primary text-primary bg-primary/5'
        : 'border-transparent text-gray-600 hover:text-gray-900'
    ]"
  >
    <Icon name="mdi:icon" class="w-4 h-4 inline-block mr-2" />
    Tab Label
  </button>
</div>
```

**Specifications:**
- **Padding**: `px-4 py-2.5` (16px horizontal, 10px vertical)
- **Font**: `text-sm font-medium` (14px)
- **Icon**: `w-4 h-4 mr-2` (16px icon, 8px margin)
- **Border**: 2px bottom border
- **Active State**:
  - Border: `border-primary`
  - Text: `text-primary`
  - Background: `bg-primary/5` (5% opacity)
- **Inactive State**:
  - Border: `border-transparent`
  - Text: `text-gray-600`
  - Hover: `hover:text-gray-900`

### 2. Section Pills (Secondary Level)

**Visual Style:**
```vue
<div class="flex gap-2 flex-wrap">
  <button
    :class="[
      'px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
      isActive
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    ]"
  >
    Section Name
  </button>
</div>
```

**Specifications:**
- **Padding**: `px-3 py-1.5` (12px horizontal, 6px vertical)
- **Font**: `text-sm font-medium` (14px)
- **Border Radius**: `rounded-full`
- **Gap**: `gap-2` (8px between pills)
- **Active State**: `bg-primary text-white`
- **Inactive State**: `bg-gray-100 text-gray-700`
- **Hover**: `hover:bg-gray-200`

---

## Layout System

### 1. Main Content Area (70%)

**Card-Based Sections:**
```vue
<rs-card>
  <template #header>
    <div class="flex justify-between items-center">
      <h3 class="text-base font-semibold">Section Title</h3>
      <!-- Optional: Badge or action -->
    </div>
  </template>
  <template #body>
    <div class="space-y-4">
      <!-- Form fields -->
    </div>
  </template>
</rs-card>
```

**Card Specifications:**
- **Header Title**: `text-base font-semibold` (16px)
- **Body Spacing**: `space-y-4` (16px between elements)
- **Card Gap**: `space-y-4` or `space-y-6` between cards

### 2. Sidebar (30%)

**Sticky Sidebar Pattern:**
```vue
<div class="col-span-12 lg:col-span-4">
  <div class="space-y-4 lg:sticky lg:top-6">
    <!-- Sidebar cards -->
  </div>
</div>
```

**Specifications:**
- Sticky positioning: `lg:sticky lg:top-6`
- Card spacing: `space-y-4`
- Consistent with main content card style

**Common Sidebar Elements:**
1. Summary Information Card
2. Financial/Status Card
3. Action Buttons Card

---

## Form Components

### 1. Form Grid Layouts

**2-Column Grid:**
```vue
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <FormKit type="text" label="Field 1" />
  <FormKit type="text" label="Field 2" />
</div>
```

**3-Column Grid:**
```vue
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <FormKit type="date" label="Date" />
  <FormKit type="number" label="Age" />
  <FormKit type="select" label="Gender" />
</div>
```

**Specifications:**
- Mobile: `grid-cols-1` (stacked)
- Tablet+: `grid-cols-2` or `grid-cols-3`
- Gap: `gap-4` (16px)

### 2. FormKit Components

**Standard Input:**
```vue
<FormKit
  type="text"
  label="Label Name"
  v-model="formData.field"
  placeholder="Placeholder text"
/>
```

**Select Dropdown:**
```vue
<FormKit
  type="select"
  label="Select Option"
  v-model="formData.field"
  :options="['Option 1', 'Option 2', 'Option 3']"
/>
```

**Radio Buttons:**
```vue
<FormKit
  type="radio"
  label="Choose One"
  v-model="formData.field"
  :options="[
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ]"
/>
```

**Checkboxes:**
```vue
<FormKit
  type="checkbox"
  label="Select Multiple"
  v-model="formData.field"
  :options="['Option 1', 'Option 2', 'Option 3']"
/>
```

**File Upload:**
```vue
<FormKit
  type="file"
  label="Upload Document"
  help="Format: PDF, JPG, PNG. Max: 5MB"
  accept=".pdf,.jpg,.png"
  multiple
/>
```

### 3. Textarea:**
```vue
<FormKit
  type="textarea"
  label="Description"
  v-model="formData.field"
  rows="3"
/>
```

---

## Data Tables

### Table Pattern

```vue
<div class="overflow-x-auto">
  <table class="w-full text-sm">
    <thead class="bg-gray-50 dark:bg-gray-800">
      <tr>
        <th class="px-3 py-2 text-left">Header 1</th>
        <th class="px-3 py-2 text-right">Header 2</th>
        <th class="px-3 py-2 text-center">Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-t dark:border-gray-700">
        <td class="px-3 py-2">Data 1</td>
        <td class="px-3 py-2 text-right">Data 2</td>
        <td class="px-3 py-2 text-center">Data 3</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Table Specifications:**
- **Container**: `overflow-x-auto` for horizontal scroll
- **Font Size**: `text-sm` (14px)
- **Header**:
  - Background: `bg-gray-50 dark:bg-gray-800`
  - Padding: `px-3 py-2`
  - Alignment: `text-left`, `text-right`, or `text-center`
- **Body**:
  - Border: `border-t dark:border-gray-700`
  - Padding: `px-3 py-2`
  - Same alignment options as header

**Editable Table Cells:**
```vue
<td class="px-3 py-2">
  <input type="text" v-model="row.field" class="form-control" />
</td>
<td class="px-3 py-2">
  <select v-model="row.status" class="form-control">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</td>
```

---

## Responsive Behavior

### Breakpoint Strategy

**Mobile (< 768px):**
- Stack all grid columns to `grid-cols-1`
- Full-width cards
- Hide sidebar or move to bottom
- Reduce padding: `padding: 1rem`

**Tablet (768px - 1024px):**
- Show 2-column grids
- Sidebar appears below content
- Maintain card structure

**Desktop (> 1024px):**
- Full 70/30 split layout
- Sticky sidebar
- Multi-column grids
- Maximum `padding: 1.5rem`

### Responsive Classes Used

```css
/* Mobile-first approach */
col-span-12          /* Full width on mobile */
md:col-span-2        /* Tablet: 2 columns */
lg:col-span-8        /* Desktop: 8 columns (70%) */
lg:col-span-4        /* Desktop: 4 columns (30%) */

/* Grid responsiveness */
grid-cols-1          /* Mobile: Stacked */
md:grid-cols-2       /* Tablet: 2 columns */
lg:grid-cols-3       /* Desktop: 3 columns */

/* Sidebar sticky */
lg:sticky lg:top-6   /* Sticky on large screens only */
```

---

## Implementation Checklist

### Page Setup
- [ ] Define page meta with title, middleware, breadcrumb
- [ ] Create state management refs for tabs and sections
- [ ] Set up form data reactive object
- [ ] Implement computed values for calculations

### Navigation
- [ ] Implement tab switching function
- [ ] Implement section switching function
- [ ] Add active state styling for tabs
- [ ] Add active state styling for pills

### Layout
- [ ] Create 12-column grid with gap-6
- [ ] Set up main content area (col-span-8)
- [ ] Set up sidebar area (col-span-4)
- [ ] Make sidebar sticky on desktop

### Form Components
- [ ] Use FormKit for all form inputs
- [ ] Implement 2/3-column grids for related fields
- [ ] Add proper labels and help text
- [ ] Implement v-model bindings

### Tables
- [ ] Wrap tables in overflow-x-auto container
- [ ] Use consistent padding (px-3 py-2)
- [ ] Style headers with bg-gray-50
- [ ] Add border-t for body rows
- [ ] Implement dark mode colors

### Sidebar
- [ ] Create summary cards
- [ ] Add financial/status information
- [ ] Implement action buttons
- [ ] Ensure sticky positioning works

### Responsive Design
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify all grids stack properly
- [ ] Check sidebar behavior

### Functionality
- [ ] Implement save function
- [ ] Implement submit function
- [ ] Add navigation to other pages
- [ ] Add loading states
- [ ] Add validation

---

## Color Palette

### Status Badges

```vue
<rs-badge variant="success">Success</rs-badge>
<rs-badge variant="warning">Warning</rs-badge>
<rs-badge variant="danger">Danger</rs-badge>
<rs-badge variant="info">Info</rs-badge>
<rs-badge variant="primary">Primary</rs-badge>
```

### Button Variants

```vue
<rs-button variant="primary">Primary Action</rs-button>
<rs-button variant="secondary">Secondary</rs-button>
<rs-button variant="success">Success</rs-button>
<rs-button variant="danger">Danger</rs-button>
```

---

## Common Patterns

### Pattern 1: Two-Column Card Layout

```vue
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <rs-card>
    <template #header>
      <h4 class="text-base font-semibold">Left Card</h4>
    </template>
    <template #body>
      <!-- Content -->
    </template>
  </rs-card>

  <rs-card>
    <template #header>
      <h4 class="text-base font-semibold">Right Card</h4>
    </template>
    <template #body>
      <!-- Content -->
    </template>
  </rs-card>
</div>
```

### Pattern 2: Editable Data Table

```vue
<rs-card>
  <template #header>
    <h4 class="text-base font-semibold">Data Management</h4>
  </template>
  <template #body>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-3 py-2 text-left">No.</th>
            <th class="px-3 py-2 text-left">Name</th>
            <th class="px-3 py-2 text-left">Status</th>
            <th class="px-3 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index"
              class="border-t dark:border-gray-700">
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <td class="px-3 py-2">
              <input type="text" v-model="item.name" class="form-control" />
            </td>
            <td class="px-3 py-2">
              <select v-model="item.status" class="form-control">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </td>
            <td class="px-3 py-2 text-center">
              <input type="checkbox" v-model="item.selected" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</rs-card>
```

### Pattern 3: Action Sidebar

```vue
<rs-card>
  <template #body>
    <div class="space-y-3">
      <rs-button variant="primary" class="w-full" @click="handleSave">
        <Icon name="mdi:content-save" class="w-4 h-4 mr-2" />
        Save
      </rs-button>
      <rs-button variant="success" class="w-full" @click="handleSubmit">
        <Icon name="mdi:send" class="w-4 h-4 mr-2" />
        Submit
      </rs-button>
      <rs-button variant="secondary" class="w-full" @click="handleBack">
        <Icon name="mdi:arrow-left" class="w-4 h-4 mr-2" />
        Back
      </rs-button>
    </div>
  </template>
</rs-card>
```

---

## Best Practices

### DO ✅
- Use consistent spacing (multiples of 4px)
- Group related fields together
- Use FormKit for all form inputs
- Implement proper validation
- Add loading states for actions
- Use semantic HTML
- Follow accessibility guidelines
- Test on multiple screen sizes
- Use rs-card for section containers
- Maintain 70/30 layout for complex forms

### DON'T ❌
- Mix spacing scales arbitrarily
- Create custom form components unnecessarily
- Forget mobile responsiveness
- Ignore dark mode styling
- Use inline styles
- Hardcode colors (use theme variables)
- Create overly deep nesting
- Forget to implement loading states
- Skip validation
- Make tables non-scrollable

---

## Migration Notes

When converting existing forms to this pattern:

1. **Analyze current structure** - Identify major sections
2. **Group into tabs** - Max 4-5 main tabs
3. **Create sub-sections** - Use pills for secondary navigation
4. **Implement 70/30 layout** - Move summary to sidebar
5. **Use standard components** - Replace custom components with FormKit
6. **Add responsive classes** - Ensure mobile compatibility
7. **Implement state management** - Use reactive refs
8. **Test thoroughly** - All screen sizes and interactions

---

## Reference Files

- **Implementation**: `pages/mockup-siasatan/index.vue`
- **Design System**: `DESIGN_SYSTEM_REFERENCE.md`
- **LLM Guide**: `llms.txt`
- **Component Library**: `components/Rs*.vue`, `components/formkit/*.vue`

---

**End of Document**

For updates or questions, maintain this document as the single source of truth for complex form page design in the NAS framework.
