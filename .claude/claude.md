# NAS Application - Design System

## Project Structure Protocol

**CRITICAL FILE ORGANIZATION RULE**: All user-generated content (documentation, examples, screenshots, analysis files, or any files not required by the codebase to run) MUST be placed in the `user-content/` folder.

**Place in `user-content/` folder:**
- ✅ Documentation files (.md, .txt) - except README.md
- ✅ Example files (HTML examples, prototypes)
- ✅ Screenshots and images (.png, .jpg, etc.)
- ✅ Analysis or specification documents
- ✅ CLI tools or scripts not used by the main app
- ✅ Template files not used by the runtime

**Keep in codebase root (system required):**
- ⚠️ README.md (project documentation)
- ⚠️ package.json, yarn.lock (dependencies)
- ⚠️ Configuration files (.env.example, nuxt.config.js, etc.)
- ⚠️ Dockerfile, .dockerignore (deployment)
- ⚠️ .gitignore (version control)

**Note**: The `user-content/` folder is gitignored and will not be committed to the repository.

---

## Purpose & Success Criteria

Single source of truth for building consistent, space-efficient interfaces. Anyone can construct any page from requirements with identical look and feel.

**Success Criteria**:
- Primary content fits viewport with minimal scrolling
- Spacing tokens used consistently
- WCAG 2.2 AA compliance (contrast ≥4.5:1, keyboard nav)
- Achievable in framework/page builder without custom CSS

**Out of Scope**: Custom animations, gradients, complex visualizations

## Design Principles

1. **Density First**: Maximize information per viewport. Multi-column grids, compact spacing, sticky positioning
2. **Consistency Over Creativity**: Reuse tokens, components, patterns. Variations only when functionally required
3. **Progressive Enhancement**: Mobile-first. Desktop unlocks grids and sticky behaviors
4. **Accessibility Non-Negotiable**: WCAG 2.2 AA minimum. Contrast ≥4.5:1, keyboard nav, focus indicators
5. **Builder-Native**: Avoid custom CSS beyond utilities. Use framework components and standard layouts

## Design Tokens

### Color Variables (CSS Custom Properties)
```
--text-color      → Body text, headings, labels
--text-muted      → Secondary text, placeholders
--bg-1            → Table headers, subtle backgrounds
--bg-2            → Page background
--border-color    → Dividers, card borders, input borders
--primary         → Action buttons, links, active states
--success         → Success badges, positive indicators
--warning         → Warning badges, pending states
--error           → Error messages, validation alerts
```

**Usage**: `rgb(var(--text-color))` or `text-[rgb(var(--text-color))]`

### Spacing Scale
```
gap-3      → Tight inline elements (badges, icons)
gap-4      → Standard card/section gaps, grid columns (DEFAULT)
gap-6      → Loose section separation (use sparingly)
mb-4       → Default vertical rhythm between cards/sections
space-y-3  → Compact stacked items (list items, form rows)
space-y-4  → Standard stacked sections
px-3 py-2  → Compact table cells, small buttons
px-4 py-2.5 → Standard buttons, form inputs
p-4        → Mobile card padding
p-6        → Desktop card padding
```

**Rule**: Default to `gap-4` and `mb-4`. Use `gap-3` for tight inline groups. Use `gap-6` only between major sections.

### Typography Scale
```
text-xl    → Page titles (font-bold)
text-lg    → Section headings (font-semibold)
text-base  → Body text, form labels
text-sm    → Table content, secondary info, helper text
text-xs    → Captions, timestamps, metadata
```

**Rule**: Headings bold/semibold. Body regular. Secondary content uses `text-[rgb(var(--text-muted))]`

### Grid Breakpoints
```
Base (default) → Mobile, single column
sm: 640px      → Small tablets, 2-column grids
md: 768px      → Tablets, 3-column grids
lg: 1024px     → Desktop, 2/3+1/3 splits, sticky sidebars
```

**Rule**: All layouts stack on mobile. Grid columns unlock at `lg:` breakpoint.

## Layout System

### Container Pattern
```html
<div class="container mx-auto px-4 py-6 lg:px-6">
  <!-- Page content -->
</div>
```
Mobile: `px-4 py-6`, Desktop: `lg:px-6`

### Grid Layouts

**2/3 + 1/3 Split** (Main + Sidebar):
```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div class="lg:col-span-2"><!-- Main --></div>
  <div class="lg:col-span-1"><!-- Sidebar --></div>
</div>
```
Use for: Detail pages, forms with action sidebars

**Multi-Column Data Grids**:
```html
<!-- 2→3 columns -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
  <div><!-- Field --></div>
</div>

<!-- 2→4 columns -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
  <div><!-- Field --></div>
</div>
```
Use for: Key-value pairs, applicant info, summary data

**Full Width Tables**:
```html
<rs-card class="mt-4">
  <template #body>
    <table class="w-full text-sm"><!-- Table --></table>
  </template>
</rs-card>
```
Always full width, compact padding (`px-3 py-2`)

**Sticky Positioning**:
```html
<div class="lg:sticky lg:top-6">
  <!-- Sidebar stays visible on scroll -->
</div>
```
Use for: Action sidebars, navigation panels (desktop only)

## Component Library

### rs-card
**Anatomy**: Container with optional header and body slots
```html
<rs-card>
  <template #header>
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Title</h2>
    </div>
  </template>
  <template #body>
    <!-- Content -->
  </template>
</rs-card>
```

**States**: Default (white bg, border), no hover/active states
**Spacing**: Content inherits card padding (p-4 mobile, p-6 desktop)
**Do**: Use for grouping related content, forms, tables
**Don't**: Nest cards deeply (max 1 level), use for single fields

### rs-badge
**Anatomy**: Inline label with variant colors
```html
<rs-badge variant="success">APPROVED</rs-badge>
<rs-badge variant="warning">PENDING</rs-badge>
<rs-badge variant="error">REJECTED</rs-badge>
<rs-badge size="lg">LARGE</rs-badge>
```

**Variants**: `success` (green), `warning` (yellow), `error` (red), default (gray)
**Sizes**: Default, `lg` (larger padding/text)
**Do**: Use for status indicators, categories, counts
**Don't**: Use for interactive elements (use buttons)

### rs-button
**Anatomy**: Interactive button with variants and sizes
```html
<rs-button variant="primary">Submit</rs-button>
<rs-button variant="outline">Cancel</rs-button>
<rs-button size="sm">Small</rs-button>
<rs-button disabled>Disabled</rs-button>
```

**Variants**: `primary` (filled), `outline` (bordered), `ghost` (text only)
**States**: Default, hover (darker), focus (ring), disabled (opacity-50, cursor-not-allowed)
**Spacing**: `px-4 py-2.5` default, `px-3 py-2` for `size="sm"`
**Do**: Use for actions, form submissions, navigation
**Don't**: Use for static labels (use badges)

### FormKit
**Anatomy**: Form input with label, validation, help text
```html
<FormKit
  type="text"
  name="fieldName"
  label="Field Label"
  placeholder="Enter value"
  validation="required"
  help="Helper text"
/>
```

**Types**: `text`, `email`, `tel`, `number`, `date`, `select`, `textarea`, `radio`, `checkbox`
**Validation**: `required`, `email`, `min:X`, `max:X`, `length:X,Y`
**States**: Default, focus (border color), error (red border + message), disabled
**Spacing**: Vertical rhythm handled by FormKit (no manual mb-\*)
**Do**: Use for all form inputs, wrap in `<FormKit type="form">`
**Don't**: Mix with native HTML inputs

### Icon
**Anatomy**: SVG icon component
```html
<Icon name="mdi:check" class="w-5 h-5" />
<Icon name="mdi:close" class="w-4 h-4 text-[rgb(var(--error))]" />
```

**Sizes**: `w-4 h-4` (small), `w-5 h-5` (default), `w-6 h-6` (large)
**Colors**: Inherit from parent or set with `text-*` classes
**Do**: Use for visual indicators, button icons, list markers
**Don't**: Use decoratively (meaningful icons only)

### Tables
**Anatomy**: Semantic HTML table with styled header/body
```html
<table class="w-full text-sm">
  <thead class="bg-[rgb(var(--bg-1))]">
    <tr>
      <th class="px-3 py-2 text-left font-semibold">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-[rgb(var(--border-color))]">
      <td class="px-3 py-2.5">Cell</td>
    </tr>
  </tbody>
</table>
```

**Spacing**: `px-3 py-2` (header), `px-3 py-2.5` (body)
**States**: Hover row (optional: `hover:bg-[rgb(var(--bg-1))]`)
**Do**: Use for tabular data, lists with multiple columns
**Don't**: Use for layout (use grids), nest tables

## Interaction Patterns

### Hover States
- **Buttons**: Background darkens 10%
- **Links**: Underline appears
- **Table Rows**: Optional subtle background (`bg-[rgb(var(--bg-1))]`)
- **Cards**: No hover state (static containers)

### Focus States
- **Inputs**: Border color changes to primary
- **Buttons**: 2px ring with primary color
- **Links**: 2px outline with primary color
**Rule**: All interactive elements must have visible focus indicator

### Keyboard Navigation
- **Tab Order**: Follow visual reading order (left→right, top→bottom)
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dropdowns
- **Arrow Keys**: Navigate within selects, radios, accordions

### Collapsible Sections
```vue
<script setup>
const collapsedSections = ref({ section1: true, section2: false })
</script>

<div @click="collapsedSections.section1 = !collapsedSections.section1">
  <h3>Section Title</h3>
  <Icon :name="collapsedSections.section1 ? 'mdi:chevron-down' : 'mdi:chevron-up'" />
</div>
<div v-show="!collapsedSections.section1">
  <!-- Content -->
</div>
```
**Rule**: Desktop starts expanded, mobile starts collapsed. Icon rotates to indicate state.

### Modals
- **Trigger**: Button with `@click="showModal = true"`
- **Overlay**: Semi-transparent backdrop (`bg-black/50`)
- **Close**: X button + click outside + Escape key
- **Focus Trap**: Focus stays within modal while open

## Content Guidelines

### Voice & Tone
- **Formal but Clear**: "Maklumat Pemohon", "Senarai Bantuan", "Dokumen Sokongan"
- **Action-Oriented**: "Semak", "Hantar", "Simpan Draf", "Tolak"
- **Status-Explicit**: "DALAM SEMAKAN", "LULUS", "GAGAL"

### Microcopy Patterns
- **Empty States**: "Tiada maklumat", "Belum ada dokumen"
- **Loading**: "Memuatkan...", "Sila tunggu"
- **Errors**: "Medan diperlukan", "Format tidak sah"
- **Success**: "Berjaya disimpan", "Permohonan dihantar"

### Date/Time Formats
- **Date**: `DD/MM/YYYY` (e.g., 15/03/2024)
- **Time**: `HH:MM` 24-hour format
- **DateTime**: `DD/MM/YYYY HH:MM`

### Number Formats
- **Currency**: `RM X,XXX.XX` (e.g., RM 1,500.00)
- **Percentage**: `XX%` (e.g., 75%)
- **Phone**: `XXX-XXXXXXX` (e.g., 012-3456789)

## Responsive Behavior

### Breakpoint Strategy
```
Mobile (default)     → Stack all, full width, p-4
Tablet (md: 768px)   → 2-col data grids, larger tables
Desktop (lg: 1024px) → Multi-col layouts, sticky sidebars, p-6
```

**Rule**: Mobile-first. Use `lg:` prefix for desktop-specific layouts.

### Whitespace Reduction Tactics
1. **Compact Spacing**: `gap-4` over `gap-6`, `mb-4` over `mb-6`
2. **Multi-Column Grids**: 3-4 columns on desktop for data
3. **Tight Tables**: `px-3 py-2` cells instead of `px-4 py-3`
4. **Sticky Sidebars**: Keep actions visible without extra scroll
5. **Collapsible Sections**: Hide optional content by default

**Balance**: Maintain ≥0.75rem (3 units) between interactive elements for touch targets (WCAG 2.5.5)

## Accessibility & Performance

### Contrast Requirements
- **Body Text**: ≥4.5:1 contrast ratio
- **Large Text** (≥18pt or 14pt bold): ≥3:1 contrast ratio
- **Interactive Elements**: ≥3:1 contrast for borders/icons

### Focus Order
1. Page header / breadcrumbs
2. Main content area (left column)
3. Sidebar / actions (right column)
4. Modals (trap focus while open)

**Rule**: Tab order must follow visual reading order

### Screen Reader Support
- All images/icons with `alt` or `aria-label`
- Form inputs with associated labels (FormKit handles this)
- Status messages with `role="status"` or `aria-live="polite"`
- Modals with `role="dialog"` and `aria-labelledby`

### Performance Budgets
- **Initial Load**: <3s on 3G
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3.5s
- **Bundle Size**: <200KB gzipped JS

## Edge Cases & Data States

### Long Text Handling
- **Truncation**: `truncate` class for single-line overflow
- **Wrapping**: `break-words` for multi-line content
- **Tooltips**: Show full text on hover for truncated fields

### Short Text / Empty States
- **Empty Tables**: "Tiada maklumat" centered row with colspan
- **Zero Values**: Display "0" or "RM 0.00" (not blank)
- **Optional Fields**: Leave blank or show placeholder

### Loading States
- **Skeleton Screens**: Gray boxes matching content layout
- **Spinners**: Centered in card/page for full-page loads
- **Disabled Buttons**: Opacity 50%, "Memuatkan..." text

### Error States
- **Form Validation**: Red border + error message below field
- **API Errors**: Alert banner at top with retry button
- **404/403**: Full-page centered message with navigation link

### Overflow Handling
- **Tables**: Horizontal scroll on mobile (`overflow-x-auto`)
- **Modals**: Vertical scroll if content exceeds viewport
- **Sidebars**: Sticky only if content fits viewport, otherwise scroll

## Flow Validation Protocol (Multi-Page Apps)

**Critical**: For multi-page applications, complete flow validation is **mandatory** before marking work as settled. Must test **every single flow** without missing any conditional path.

### Two-Phase Testing (Use MCP DevTools)

**Phase 1: UI/UX Visual Check**
- [ ] **Page-by-Page**: spacing, grids, typography, component states match tokens
- [ ] **Cross-Page**: consistent headers, padding, button variants, badges
- [ ] **Responsive**: mobile/tablet/desktop breakpoints, no horizontal scroll, sticky behavior

**Phase 2: Functional Flow Check**
- [ ] **Navigation**: All links work, breadcrumbs accurate, browser back/forward, active states
- [ ] **Conditional Logic**: Test every branch—buttons show/hide by state, fields by selection, sections expand/collapse, guard conditions prevent invalid actions
- [ ] **Button Actions**: Click every button—submit/cancel/action/secondary/disabled
- [ ] **Forms**: End-to-end—required validation, format checks, auto-calc, file upload, success messages, draft save
- [ ] **Tabs/Steps**: Navigate forward/back, current highlighted, data persists, cannot skip required
- [ ] **Modals**: Open/close (X, overlay, Escape), form submit, focus return
- [ ] **Tables**: Sort, pagination, search/filter, row actions, empty state
- [ ] **Edge Cases**: Empty submit, min/max data, character limits, rapid clicks, network failure, session timeout

**MCP DevTools**: Snapshot, Screenshot, Click/Fill/Navigate, Evaluate Script, Console Messages, Network Requests

**Completion**: ✅ Phase 1 + ✅ Phase 2 = **SETTLED**

## What to Avoid

❌ Overly large spacing (mb-8, gap-8, p-8)
❌ Large font sizes (text-3xl, text-2xl for titles)
❌ Boring vertical-only stacks
❌ Unnecessary cards or wrappers
❌ Custom gradients, animations, complex CSS
❌ Hardcoded colors (use CSS variables)
❌ Empty space that could show information
❌ Multiple scroll regions
❌ Verbose descriptions or helper text

## What to Embrace

✅ Efficient multi-column layouts
✅ Compact, readable spacing
✅ Smart use of sticky positioning
✅ Grid-based data displays (3-4 columns)
✅ Inline info boxes and badges
✅ Standard component combinations
✅ CSS variable-based theming
✅ Viewport-optimized layouts
✅ Clean, professional aesthetics
✅ Information density without clutter

---

**Version**: 1.1
**Last Updated**: 2025-10-21
**Remember**: Every page should feel **purposeful, efficient, and beautifully designed** while being easily achievable with standard components and page builder tools. Balance is key—not too sparse, not too dense, just right.
