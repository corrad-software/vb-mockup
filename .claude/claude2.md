# Design System Reference

## 1. Purpose & Success Criteria

**Purpose**: Single source of truth for building consistent, space-efficient interfaces that minimize whitespace while maintaining readability. Anyone with access to this document and component library can construct any page from data/requirements with identical look and feel.

**Success Criteria**:
- All pages fit primary content in viewport with minimal scrolling
- Spacing tokens used consistently across all modules
- Components follow documented anatomy and state behaviors
- Layouts adapt seamlessly across mobile/tablet/desktop breakpoints
- WCAG 2.2 AA contrast and keyboard navigation standards met
- Patterns achievable in framework/page builder without custom CSS

**Risks**:
- Over-densification sacrificing readability (mitigation: test with real content)
- Builder constraints limiting grid flexibility (mitigation: fallback to stacked layouts)

**Out of Scope**: Custom animations, gradients, complex data visualizations, real-time collaboration features

## 2. Design Principles

1. **Density First**: Maximize information per viewport. Use multi-column grids, compact spacing, strategic sticky positioning
2. **Consistency Over Creativity**: Reuse tokens, components, and patterns. Variations only when functionally required
3. **Progressive Enhancement**: Mobile-first responsive design. Desktop unlocks grid layouts and sticky behaviors
4. **Accessibility Non-Negotiable**: WCAG 2.2 AA minimum. Color contrast ≥4.5:1, keyboard navigation, focus indicators
5. **Builder-Native**: Avoid custom CSS beyond utility classes. Use framework components and standard layouts

## 3. Design Tokens Map

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
gap-4      → Standard card/section gaps, grid columns
gap-6      → Loose section separation (use sparingly)
mb-4       → Default vertical rhythm between cards/sections
space-y-3  → Compact stacked items (list items, form rows)
space-y-4  → Standard stacked sections
px-3 py-2  → Compact table cells, small buttons
px-4 py-2.5 → Standard buttons, form inputs
p-4        → Mobile card padding
p-6        → Desktop card padding
```

**Rule**: Default to `gap-4` and `mb-4`. Use `gap-3` only for inline tight groups. Use `gap-6` only between major page sections.

### Typography Scale
```
text-xl    → Page titles (font-bold)
text-lg    → Section headings (font-semibold)
text-base  → Body text, form labels
text-sm    → Table content, secondary info, helper text
text-xs    → Captions, timestamps, metadata
```

**Rule**: Headings always bold/semibold. Body text regular weight. Use `text-[rgb(var(--text-muted))]` for secondary content.

### Grid Breakpoints
```
Base (default) → Mobile, single column
sm: 640px      → Small tablets, 2-column grids
md: 768px      → Tablets, 3-column grids
lg: 1024px     → Desktop, 2/3+1/3 splits, sticky sidebars
```

**Rule**: All layouts stack vertically on mobile. Grid columns unlock at `lg:` breakpoint.

## 4. Layout System

### Container Pattern
```html
<div class="container mx-auto px-4 py-6 lg:px-6">
  <!-- Page content -->
</div>
```
- Mobile: `px-4 py-6` (1rem sides, 1.5rem top/bottom)
- Desktop: `lg:px-6` (1.5rem sides)

### Grid Layouts

**2/3 + 1/3 Split** (Main content + Sidebar):
```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div class="lg:col-span-2"><!-- Main content --></div>
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
Use for: Displaying key-value pairs, applicant info, summary data

**Full Width Tables**:
```html
<rs-card class="mt-4">
  <template #body>
    <table class="w-full text-sm"><!-- Table --></table>
  </template>
</rs-card>
```
Always full width, compact padding (`px-3 py-2`)

### Sticky Positioning
```html
<div class="lg:sticky lg:top-6">
  <!-- Sidebar content stays visible on scroll -->
</div>
```
Use for: Action sidebars, navigation panels (desktop only)

## 5. Component Library

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
**Don't**: Use for interactive elements (use buttons instead)

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
**Don't**: Use for static labels (use badges instead)

### FormKit
**Anatomy**: Form input with label, validation, and help text
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
**Spacing**: Vertical rhythm handled by FormKit (no manual mb-* needed)
**Do**: Use for all form inputs, wrap in `<FormKit type="form">` for submission
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
**Don't**: Use decoratively (accessibility: meaningful icons only)

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
**Don't**: Use for layout (use grids instead), nest tables

## 6. Interaction Patterns

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

## 7. Content Guidelines

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

## 8. Page Blueprints

### Blueprint A: Semakan List Page

**Purpose**: Display applicant summary and list of bantuan applications

**Layout**: Page header → 2/3+1/3 grid → Full-width table

**Modules**:

| Module | Component | Content | Layout |
|--------|-----------|---------|--------|
| Header | Text + Badge | Page title + status badge | `flex items-center justify-between mb-4` |
| Applicant Info | rs-card | Name, IC, contact, address in 3-col grid | `lg:col-span-2`, `grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3` |
| Actions | rs-card | Status, dates, action buttons | `lg:col-span-1`, `space-y-4` |
| Bantuan List | rs-card + table | Table with bantuan details | Full width, `text-sm`, `px-3 py-2` cells |

**Data Fields**:
- Applicant: Nama, No. KP, No. Tel, E-mel, Alamat, Poskod, Negeri, Daerah, Mukim
- Actions: Status, Tarikh Mohon, Tarikh Semakan, buttons (Semak Sekarang, Tolak, Kembalikan)
- Bantuan: No., Jenis Bantuan, Kategori, Jumlah Mohon (RM), Status, Tindakan

**Acceptance**:
- [ ] All applicant fields visible in viewport on desktop (lg)
- [ ] Table displays all columns without horizontal scroll on desktop
- [ ] Action buttons stack vertically with consistent spacing
- [ ] Status badge uses correct variant (warning for pending)

### Blueprint B: Semakan Detail Page

**Purpose**: Review individual bantuan application with documents and decision form

**Layout**: Page header → 2/3+1/3 grid (main content + sticky sidebar) → Full-width tables

**Modules**:

| Module | Component | Content | Layout |
|--------|-----------|---------|--------|
| Header | Text + Badge | Applicant name + status | `flex items-center justify-between mb-4` |
| Bantuan Info | rs-card | Aid details in 4-col grid | `lg:col-span-2`, `grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3` |
| Documents | rs-card + table | Table with dokumen sokongan | `lg:col-span-2`, `text-sm`, `px-3 py-2` cells |
| Sejarah Bantuan | rs-card + table | Table with previous aids | `lg:col-span-2`, `text-sm`, `px-3 py-2` cells |
| Decision Panel | rs-card (sticky) | Decision form + action buttons | `lg:col-span-1`, `lg:sticky lg:top-6` |

**Data Fields**:
- Bantuan: Jenis, Kategori, Keutamaan, Jumlah Mohon, Tempoh, Tarikh Mula, Status, Catatan
- Documents: No., Jenis, Nama Fail, Tarikh Muat Naik, Tindakan (view icon)
- Sejarah: No., Jenis, Tarikh Lulus, Jumlah (RM), Status
- Decision: Radio buttons (Lulus/Tolak/Kembalikan), Jumlah Diluluskan, Catatan, Dokumen Tambahan

**Acceptance**:
- [ ] Sticky sidebar remains visible during scroll on desktop
- [ ] 4-column grid displays without wrapping on desktop
- [ ] Tables fit all columns in viewport
- [ ] Radio buttons for decision work correctly

### Blueprint C: Siasatan Form Page

**Purpose**: Multi-section investigation form with collapsible sections and 70/30 split

**Layout**: Tab navigation → 70/30 grid → Collapsible sections → Sticky action sidebar

**Modules**:

| Module | Component | Content | Layout |
|--------|-----------|---------|--------|
| Tabs | Buttons | 3 tabs with icons | `flex gap-2 mb-4` |
| Form Sections | Collapsible rs-card | Multiple sections (Profil, Alamat, Pendapatan, etc.) | `col-span-12 lg:col-span-8`, `space-y-4` |
| Action Sidebar | rs-card (sticky) | Status timeline + buttons | `lg:col-span-4`, `lg:sticky lg:top-6` |

**Sections** (all collapsible):
1. Maklumat Profil (FormKit fields: 2-col grid)
2. Maklumat Alamat (FormKit fields: 2-col grid)
3. Maklumat Pendapatan (Side-by-side tables)
4. Maklumat Aset (2-col table)
5. Ulasan Pegawai (Textarea + file upload)

**Data Fields**:
- Profil: Nama, No. KP, Tarikh Lahir, Umur (auto-calc), Bangsa, Agama, Jantina, Status Perkahwinan, Bilangan Tanggungan
- Alamat: Alamat, Poskod, Negeri, Daerah, Mukim, Status Kediaman
- Pendapatan: Sumber (table with Sumber, Jumlah RM, Catatan), Perbelanjaan (same)
- Aset: Jenis Aset, Nilai Anggaran (RM)
- Ulasan: Textarea, file upload

**Acceptance**:
- [ ] All sections start collapsed on mobile, expanded on desktop
- [ ] Clicking section header toggles visibility
- [ ] Pendapatan/Perbelanjaan tables display side-by-side on desktop
- [ ] Auto-calculation for Umur and totals works correctly
- [ ] Sticky sidebar visible on desktop scroll

### Blueprint D: Asnaf Profiling Form

**Purpose**: Multi-step registration form with conditional fields and modals

**Layout**: Step navigation → Collapsible sections → Modal for adding dependents

**Modules**:

| Module | Component | Content | Layout |
|--------|-----------|---------|--------|
| Steps | Buttons | 3-step navigation with numbers | `flex gap-2 mb-4` |
| Form Sections | Collapsible rs-card | Multiple sections per step | `space-y-4` |
| Add Dependent | Modal | Form for adding tanggungan | Centered modal overlay |

**Steps**:
1. **Maklumat Pemohon**: Profil, Alamat
2. **Maklumat Keluarga**: Pasangan, Tanggungan, Waris
3. **Maklumat Kewangan**: Pendapatan, Perbelanjaan, Aset

**Sections** (all collapsible):
- Maklumat Profil (FormKit: 2-col grid)
- Maklumat Alamat (FormKit: 2-col grid)
- Maklumat Pasangan (FormKit: 2-col grid, conditional on status perkahwinan)
- Maklumat Tanggungan (Table + add button → modal)
- Maklumat Waris (FormKit: 2-col grid)
- Maklumat Pendapatan (Table with totals)
- Maklumat Perbelanjaan (Table with totals)
- Maklumat Aset (Table with totals)

**Conditional Logic**:
- Pasangan section only shows if status = "Berkahwin"
- Umur auto-calculates from Tarikh Lahir
- Totals auto-sum from table rows

**Acceptance**:
- [ ] Step navigation highlights current step
- [ ] All sections start collapsed
- [ ] Pasangan fields hidden unless married
- [ ] Modal opens/closes correctly
- [ ] Auto-calculations work for age and totals
- [ ] Table rows can be added/removed

## 9. Navigation & IA

### Breadcrumbs Pattern
```html
<div class="flex items-center gap-2 text-sm text-[rgb(var(--text-muted))] mb-4">
  <a href="/" class="hover:text-[rgb(var(--primary))]">Utama</a>
  <Icon name="mdi:chevron-right" class="w-4 h-4" />
  <span class="text-[rgb(var(--text-color))]">Semakan</span>
</div>
```
**Rule**: Show full path, last item not linked, chevron separators

### Tab Navigation
```html
<div class="flex gap-2 mb-4">
  <button
    :class="['px-4 py-2 rounded', activeTab === 'tab1' ? 'bg-[rgb(var(--primary))] text-white' : 'bg-[rgb(var(--bg-1))]']"
    @click="activeTab = 'tab1'"
  >
    <Icon name="mdi:account" class="w-5 h-5 inline mr-2" />
    Tab 1
  </button>
</div>
```
**Rule**: Tabs with icon + text, active state with primary background

### Active States
- **Current Page**: Bold text, primary color, no underline
- **Hover**: Underline, darker shade
- **Focus**: Outline ring, primary color

## 10. Responsive & Theming

### Breakpoint Strategy
```
Mobile (default)     → Stack all, full width cards, compact padding (p-4)
Tablet (md: 768px)   → 2-col data grids, larger tables
Desktop (lg: 1024px) → Multi-col layouts (2/3+1/3), sticky sidebars, 3-4 col grids, larger padding (p-6)
```

**Rule**: Always design mobile-first. Use `lg:` prefix for desktop-specific layouts.

### Whitespace Reduction Tactics
1. **Compact Spacing**: Prefer `gap-4` over `gap-6`, `mb-4` over `mb-6`
2. **Multi-Column Grids**: Use 3-4 columns on desktop for data fields
3. **Tight Tables**: `px-3 py-2` cells instead of `px-4 py-3`
4. **Sticky Sidebars**: Keep actions visible without extra scroll
5. **Collapsible Sections**: Hide optional content by default

**Balance**: Maintain minimum 0.75rem (3 units) between interactive elements for touch targets (WCAG 2.5.5)

### Dark Mode (Optional)
- If implemented, invert `--bg-1` and `--bg-2`, lighten `--text-color`, darken `--border-color`
- Test contrast ratios for all color combinations

## 11. Accessibility & Performance

### Contrast Requirements
- **Body Text**: ≥4.5:1 contrast ratio
- **Large Text** (≥18pt or 14pt bold): ≥3:1 contrast ratio
- **Interactive Elements**: ≥3:1 contrast for borders/icons

**Tool**: Use browser DevTools or WebAIM contrast checker

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
- **Initial Load**: <3s on 3G connection
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3.5s
- **Bundle Size**: <200KB gzipped JS

**Tactics**: Code splitting by route, lazy load images, minify CSS/JS

## 12. Edge Cases & Data States

### Long Text Handling
- **Truncation**: Use `truncate` class for single-line overflow
- **Wrapping**: Use `break-words` for multi-line content
- **Tooltips**: Show full text on hover for truncated fields

### Short Text / Empty States
- **Empty Tables**: "Tiada maklumat" centered row with colspan
- **Zero Values**: Display "0" or "RM 0.00" (not blank)
- **Optional Fields**: Leave blank or show placeholder text

### Loading States
- **Skeleton Screens**: Gray boxes matching content layout
- **Spinners**: Centered in card/page for full-page loads
- **Disabled Buttons**: Opacity 50%, "Memuatkan..." text

### Error States
- **Form Validation**: Red border + error message below field
- **API Errors**: Alert banner at top of page with retry button
- **404/403**: Full-page centered message with navigation link

### Overflow Handling
- **Tables**: Horizontal scroll on mobile (`overflow-x-auto`)
- **Modals**: Vertical scroll if content exceeds viewport height
- **Sidebars**: Sticky only if content fits viewport, otherwise scroll

## 13. Feasibility Notes

### Builder-Native Alternatives
- **Custom Grids**: Use builder's column system with 12-col grid (2/3 = 8 cols, 1/3 = 4 cols)
- **Sticky Positioning**: May require builder plugin or custom CSS panel
- **Collapsible Sections**: Use accordion component if available, otherwise tabs
- **Conditional Fields**: Builder's conditional logic rules or custom JS
- **Auto-Calculations**: Builder's formula fields or client-side JS

### Component Mapping
| Design Component | Builder Equivalent |
|------------------|-------------------|
| rs-card | Container/Panel component |
| rs-badge | Label/Badge component |
| rs-button | Button component |
| FormKit | Form fields (text, select, date, etc.) |
| Icon | Icon library integration |
| Table | Data table component |

### CSS Utility Classes
- **If builder lacks Tailwind**: Map to builder's spacing system (e.g., `gap-4` = 1rem gap)
- **CSS Variables**: Add to builder's theme/custom CSS panel
- **Responsive Breakpoints**: Use builder's responsive settings (mobile/tablet/desktop toggles)

### Testing in Builder
1. **Build sample page** from Blueprint A (simplest)
2. **Verify spacing** matches design tokens (gap-4 = 1rem)
3. **Test responsive** behavior at breakpoints
4. **Check accessibility** (keyboard nav, contrast)
5. **Validate forms** (required fields, error states)
6. **Iterate**: If pattern doesn't work, document fallback in this section

## 14. QA Checklist

### Visual Consistency
- [ ] All spacing uses defined tokens (gap-4, mb-4, p-6)
- [ ] Typography scale consistent (text-xl titles, text-sm tables)
- [ ] Colors use CSS variables only (no hardcoded hex values)
- [ ] Cards have consistent padding (p-4 mobile, p-6 desktop)
- [ ] Tables use compact cells (px-3 py-2/2.5)

### Layout Integrity
- [ ] Grid columns stack on mobile, expand on desktop (lg:)
- [ ] 2/3 + 1/3 splits render correctly (lg:col-span-2 and lg:col-span-1)
- [ ] Multi-column data grids (3-4 cols) display without wrapping on desktop
- [ ] Sticky sidebars remain visible during scroll on desktop
- [ ] Full-width tables fit viewport without horizontal scroll on desktop

### Interaction & States
- [ ] All buttons have hover, focus, and disabled states
- [ ] Focus indicators visible for keyboard navigation (2px ring)
- [ ] Collapsible sections toggle correctly (icon rotates)
- [ ] Modals open/close with button, overlay click, and Escape key
- [ ] Form validation shows errors inline below fields
- [ ] Tab/step navigation highlights active state

### Content & Data
- [ ] Empty states display "Tiada maklumat" message
- [ ] Loading states show spinner or skeleton screens
- [ ] Long text truncates with ellipsis or wraps appropriately
- [ ] Currency formats as RM X,XXX.XX
- [ ] Dates format as DD/MM/YYYY
- [ ] Auto-calculations work (age, totals, conditional fields)

### Accessibility
- [ ] Color contrast ≥4.5:1 for body text (WCAG AA)
- [ ] Focus order follows visual reading order
- [ ] All images/icons have alt text or aria-label
- [ ] Form inputs have associated labels
- [ ] Modals trap focus and announce to screen readers
- [ ] Keyboard navigation works for all interactive elements

### Responsive Behavior
- [ ] Mobile: All layouts stack vertically, padding is p-4
- [ ] Tablet (md): Data grids expand to 2-3 columns
- [ ] Desktop (lg): Multi-column layouts, sticky sidebars, padding is p-6
- [ ] Tables scroll horizontally on mobile if needed
- [ ] Touch targets ≥44x44px for mobile (WCAG 2.5.5)

### Performance
- [ ] Initial load <3s on 3G connection
- [ ] Images lazy load (loading="lazy")
- [ ] No layout shift during load (CLS <0.1)
- [ ] Bundle size <200KB gzipped JS
- [ ] No console errors or warnings

### Builder Compatibility
- [ ] All patterns achievable with builder's native components
- [ ] Custom CSS limited to utility classes and CSS variables
- [ ] Conditional logic works with builder's rules system
- [ ] Responsive breakpoints align with builder settings
- [ ] Forms integrate with builder's submission handling

### User Flow Validation (Multi-Page Applications)

**Critical**: For applications with multiple pages, complete flow validation is mandatory before considering implementation settled.

**Two-Phase Validation Process**:

**Phase 1: UI/UX Visual Validation** (using MCP DevTools)
- [ ] **Page-by-Page Review**: Inspect every page systematically
  - [ ] Visual consistency: spacing, typography, colors match design tokens
  - [ ] Layout integrity: grids, alignment, responsive breakpoints
  - [ ] Component states: default, hover, focus, disabled, error
  - [ ] Content accuracy: labels, microcopy, formats (dates, currency)
- [ ] **Cross-Page Consistency**: Compare all pages side-by-side
  - [ ] Header/navigation identical across pages
  - [ ] Card padding uniform (p-4 mobile, p-6 desktop)
  - [ ] Button variants used consistently for same actions
  - [ ] Status badges use same color mapping
- [ ] **Responsive Behavior**: Test all breakpoints (mobile, tablet, desktop)
  - [ ] Layouts stack/expand correctly at each breakpoint
  - [ ] Touch targets ≥44px on mobile
  - [ ] No horizontal scroll on any viewport size
  - [ ] Sticky elements behave as expected on desktop

**Phase 2: Functional Flow Validation** (using MCP DevTools)
- [ ] **Navigation Flows**: Test every navigation path
  - [ ] All links navigate to correct pages
  - [ ] Breadcrumbs reflect current location accurately
  - [ ] Back/forward browser buttons work correctly
  - [ ] Active states highlight current page
- [ ] **Conditional Logic**: Test every conditional branch
  - [ ] Conditional buttons appear/hide based on state (e.g., status-based actions)
  - [ ] Conditional fields show/hide based on selections (e.g., spouse fields when married)
  - [ ] Conditional sections expand/collapse correctly
  - [ ] Guard conditions prevent invalid actions (e.g., submit disabled until valid)
- [ ] **Button Actions**: Click every button, verify outcomes
  - [ ] Submit buttons trigger form validation and submission
  - [ ] Cancel buttons return to previous page or reset form
  - [ ] Action buttons (Approve/Reject/Return) update status and navigate
  - [ ] Secondary buttons (Add, Edit, Delete) open modals or trigger actions
  - [ ] Disabled buttons cannot be clicked
- [ ] **Form Workflows**: Complete every form end-to-end
  - [ ] Required field validation triggers on submit
  - [ ] Format validation (email, phone, IC) shows error messages
  - [ ] Auto-calculations update on field change (age, totals)
  - [ ] File uploads accept correct formats, show preview/confirmation
  - [ ] Success message appears on submit, redirects to next page
  - [ ] Draft save works, data persists on page reload
- [ ] **Tab/Step Navigation**: Test multi-step flows completely
  - [ ] Tab/step buttons navigate forward and backward
  - [ ] Current tab/step highlighted correctly
  - [ ] Data persists when switching tabs/steps
  - [ ] Progress indicators update accurately
  - [ ] Cannot skip required steps
- [ ] **Modal Interactions**: Test all modal flows
  - [ ] Modal opens on trigger (button, link)
  - [ ] Form inside modal submits correctly
  - [ ] Modal closes on X button, overlay click, Escape key
  - [ ] Focus returns to trigger element on close
  - [ ] Multiple modals stack correctly if applicable
- [ ] **Table Interactions**: Test every table action
  - [ ] Sort columns change data order
  - [ ] Pagination navigates pages correctly
  - [ ] Search/filter updates visible rows
  - [ ] Row actions (view, edit, delete) work for every row
  - [ ] Empty state displays when no data
- [ ] **Edge Case Scenarios**: Test boundary conditions
  - [ ] Submit with all fields empty (validation errors)
  - [ ] Submit with minimum valid data (success)
  - [ ] Submit with maximum character limits (no overflow)
  - [ ] Multiple rapid clicks (debounce/disable behavior)
  - [ ] Network failure (error message, retry option)
  - [ ] Session timeout (redirect to login)

**Validation Tools**: Use MCP Chrome DevTools for systematic testing
- **Take Snapshot**: Capture DOM structure for visual inspection
- **Take Screenshot**: Document visual appearance at each step
- **Click/Fill/Navigate**: Interact with all UI elements
- **Evaluate Script**: Test auto-calculations and dynamic behaviors
- **List Console Messages**: Check for JavaScript errors
- **List Network Requests**: Verify API calls on actions

**Completion Criteria**:
✅ **Phase 1 Complete**: All visual/UI checks passed, zero inconsistencies
✅ **Phase 2 Complete**: All functional flows tested, zero broken paths

**Only when BOTH phases are 100% complete can the implementation be marked as SETTLED.**

---

**Version**: 1.1
**Last Updated**: 2025-10-21
**Maintained By**: Design System Team