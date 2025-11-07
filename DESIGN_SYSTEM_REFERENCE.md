# Compact Design System Reference

**Last Updated:** October 15, 2025  
**Design Philosophy:** Shadcn UI/UX Inspired - Modern, Clean, Space-Efficient  
**Framework:** Nuxt 3 + Vue 3 + TailwindCSS

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Spacing Scale](#spacing-scale)
3. [Component Specifications](#component-specifications)
4. [Layout Components](#layout-components)
5. [CSS Variables & Theming](#css-variables--theming)
6. [Implementation Guidelines](#implementation-guidelines)

---

## Quick Reference

### Spacing Scale
```
gap-0.5  = 2px   (ultra tight)
gap-1    = 4px   (tight) 
gap-2    = 8px   (compact)
gap-3    = 12px  (standard)
gap-4    = 16px  (large)
```

### Component Sizes
```
Buttons:     h-8 px-3 py-1.5    (32px height)
Cards:       px-3 py-3          (12px padding)
Icons:       w-4 h-4            (16px standard)
Text:        text-sm            (14px body)
```

### Grid Layouts
```
40/60:  grid-cols-5 → col-span-2 + col-span-3
50/50:  grid-cols-2 → col-span-1 + col-span-1  
33/67:  grid-cols-3 → col-span-1 + col-span-2
```

### Color Variants
```
Primary:   bg-primary/10 text-primary
Success:   bg-green-50 text-green-700
Warning:   bg-yellow-50 text-yellow-700
Danger:    bg-red-50 text-red-700
Info:      bg-blue-50 text-blue-700
```

---

## Design Principles

### Core Values
- **Compact Over Spacious**: Reduce unnecessary whitespace while maintaining readability
- **Consistency**: Use standardized spacing units across all components
- **Hierarchy**: Visual distinction through size, not just spacing
- **Accessibility**: Maintain touch targets (min 44x44px) and contrast ratios
- **Responsiveness**: Adapt gracefully from mobile to desktop

### Spacing Philosophy
- Use **0.5 increments** (2px) for tight spacing
- Use **1.5-2 increments** (6-8px) for comfortable spacing
- Use **3 increments** (12px) for section separation
- Avoid padding > 3 (12px) in compact components

---

## Spacing Scale

### Tailwind Spacing Reference
| Class | Pixels | Usage |
|-------|--------|-------|
| `0.5` | 2px | Minimal gap between related items |
| `1` | 4px | Tight spacing, nested items |
| `1.5` | 6px | Comfortable item spacing |
| `2` | 8px | Default gap for icon-text, buttons |
| `2.5` | 10px | Icon margins, comfortable spacing |
| `3` | 12px | Section padding, card padding |
| `4` | 16px | Large section separation |

### Our Compact Scale
```
Ultra Tight:  gap-0.5 (2px)  - Between menu items
Tight:        gap-1 (4px)    - Between icons
Compact:      gap-2 (8px)    - Between action buttons
Comfortable:  gap-2.5 (10px) - Icon to text
Standard:     gap-3 (12px)   - Section padding
```

---

## Component Specifications

### 1. Header (`components/layouts/Header.vue`)

#### Container
```vue
<div class="px-3 py-3">
```
- **Horizontal Padding**: `px-3` (12px) - Consistent with sidebar
- **Vertical Padding**: `py-3` (12px) - Creates 57px total height
- **Height**: Fixed at 57px to align with sidebar header
- **Position**: `fixed top-0 z-40`

#### Action Buttons
```vue
<button class="h-8 w-8">
```
- **Size**: `h-8 w-8` (32x32px) - Compact but touchable
- **Border Radius**: `rounded-md` (6px) - Soft corners
- **Gap Between**: `gap-2` (8px)
- **Icon Size**: `w-4 h-4` (16x16px)

#### Dropdown Menus
```vue
<!-- Dropdown Container -->
<div class="py-1 min-w-44">

<!-- Dropdown Header -->
<div class="px-2 py-1.5">
  
<!-- Dropdown Items -->
<button class="px-2 py-1.5">
```
- **Dropdown Padding**: `py-1` (4px top/bottom)
- **Item Padding**: `px-2 py-1.5` (8px horizontal, 6px vertical)
- **Min Width**: `min-w-44` (176px)
- **Font Size**: `text-xs` (12px)
- **Border Radius**: `rounded-md` (6px)

#### Notifications Dropdown
```vue
<!-- Container -->
<div class="w-72">

<!-- Header -->
<div class="px-3 py-2">

<!-- Section Label -->
<div class="px-3 py-1.5">

<!-- Notification Item -->
<div class="px-3 py-2">
```
- **Width**: `w-72` (288px) - Wider for content
- **Header**: `px-3 py-2` (12px, 8px)
- **Items**: `px-3 py-2` (12px, 8px)
- **Max Height**: `max-h-56` (224px) with scroll

#### Profile Dropdown
```vue
<!-- Button -->
<button class="h-8 px-2 gap-2">

<!-- Avatar -->
<img class="w-6 h-6">

<!-- Dropdown -->
<div class="py-1 min-w-40">
<button class="px-3 py-1.5">
```
- **Avatar Size**: `w-6 h-6` (24x24px)
- **Button Padding**: `px-2` (8px)
- **Dropdown Width**: `min-w-40` (160px)

---

### 2. Sidebar (`components/layouts/sidemenu/index.vue`)

#### Container
```vue
<div class="w-[256px] fixed top-0 bottom-0">
```
- **Width**: `256px` - Standard sidebar width
- **Position**: `fixed top-0 bottom-0 z-50`
- **Border**: `border-r border-gray-200`

#### Header Section
```vue
<div class="px-3 py-3 h-[57px]">
```
- **Padding**: `px-3 py-3` (12px all sides)
- **Height**: `h-[57px]` - Aligns with main header
- **Logo Height**: `h-9` (36px)
- **Content**: Logo centered, full width

#### Menu Scroll Area
```vue
<div class="py-1.5">
```
- **Padding**: `py-1.5` (6px top/bottom)
- **Height**: `calc(100vh - 57px)`
- **Scrollbar Width**: `6px` (on hover/focus)

---

### 3. Menu Items (`components/layouts/sidemenu/Item.vue`)

#### Section Headers
```vue
<div class="px-3 pt-3 pb-1">
  <span class="text-xs uppercase">Header</span>
  <p class="text-xs mt-0.5">Description</p>
</div>
```
- **Padding**: `px-3 pt-3 pb-1` (12px sides, 12px top, 4px bottom)
- **Font Size**: `text-xs` (12px)
- **Text Transform**: `uppercase`
- **Tracking**: `tracking-wider`
- **Description Margin**: `mt-0.5` (2px)

#### Menu Items Container
```vue
<div class="space-y-0.5 px-2">
```
- **Item Spacing**: `space-y-0.5` (2px between items)
- **Container Padding**: `px-2` (8px sides)

#### Single Menu Item
```vue
<NuxtLink class="px-3 py-1.5 rounded-md">
  <Icon class="w-4 h-4 mr-2.5" />
  <span class="text-sm">Title</span>
</NuxtLink>
```
- **Padding**: `px-3 py-1.5` (12px horizontal, 6px vertical)
- **Icon Size**: `w-4 h-4` (16x16px)
- **Icon Margin**: `mr-2.5` (10px)
- **Font Size**: `text-sm` (14px)
- **Border Radius**: `rounded-md` (6px)

#### Parent Menu Item (With Children)
```vue
<button class="px-3 py-1.5 rounded-md">
  <Icon class="w-4 h-4 mr-2.5" />
  <span class="text-sm">Title</span>
  <Icon class="w-3.5 h-3.5 ml-1" /> <!-- Arrow -->
</button>
```
- **Same as single item**
- **Arrow Icon**: `w-3.5 h-3.5` (14x14px) - Slightly smaller
- **Arrow Margin**: `ml-1` (4px)

#### Nested Submenu Container
```vue
<div class="mt-0.5 ml-5 pl-2 border-l-2">
```
- **Top Margin**: `mt-0.5` (2px)
- **Left Margin**: `ml-5` (20px) - Aligns with parent icon
- **Left Padding**: `pl-2` (8px) - Space from border
- **Border**: `border-l-2` (2px) vertical line

---

### 4. Submenu Items (`components/layouts/sidemenu/ItemChild.vue`)

#### Container
```vue
<div class="space-y-0.5">
```
- **No horizontal margin** - Spacing handled by parent
- **Item Spacing**: `space-y-0.5` (2px)

#### Submenu Item
```vue
<NuxtLink class="px-3 py-1.5 rounded-md">
  <Icon class="w-3.5 h-3.5 mr-2.5" />
  <span class="text-sm">Title</span>
</NuxtLink>
```
- **Icon Size**: `w-3.5 h-3.5` (14x14px) - Smaller than parent
- **Everything else same as parent items**

#### Nested Sub-Submenu
```vue
<div class="mt-0.5 ml-5 pl-2 border-l-2">
```
- **Same nesting pattern repeats** for deeper levels

---

### 5. Active States

#### Active Menu Item
```vue
:class="route.path === path 
  ? 'bg-primary/10 dark:bg-primary/20 text-primary font-semibold'
  : 'text-gray-700 hover:bg-gray-100'"
```
- **Background**: `bg-primary/10` (light), `bg-primary/20` (dark)
- **Text**: `text-primary` (uses theme primary color)
- **Font Weight**: `font-semibold`
- **No Border**: Clean, modern look

#### Hover States
- **Buttons**: `hover:bg-gray-100 dark:hover:bg-gray-700`
- **Menu Items**: Same as buttons
- **Dropdowns**: `hover:bg-gray-50 dark:hover:bg-gray-700`

---

## Component Library

### RsButton
```vue
<!-- Sizes -->
<RsButton size="sm">Small</RsButton>    <!-- h-8 px-2 py-1 -->
<RsButton size="md">Medium</RsButton>    <!-- h-9 px-3 py-1.5 -->
<RsButton size="lg">Large</RsButton>    <!-- h-10 px-4 py-2 -->

<!-- Variants -->
<RsButton variant="primary">Primary</RsButton>
<RsButton variant="outline">Outline</RsButton>
<RsButton variant="danger">Danger</RsButton>
```

### RsCard
```vue
<RsCard>
  <template #header>
    <h2 class="text-lg font-semibold">Title</h2>
  </template>
  <template #body>
    <!-- Content with px-3 py-3 padding -->
  </template>
</RsCard>
```

### RsBadge
```vue
<RsBadge variant="success">Success</RsBadge>
<RsBadge variant="warning">Warning</RsBadge>
<RsBadge variant="danger">Danger</RsBadge>
<RsBadge variant="info">Info</RsBadge>
```

### RsModal
```vue
<RsModal v-model="showModal" title="Modal Title">
  <template #body>
    <!-- Content -->
  </template>
  <template #footer>
    <div class="flex justify-end gap-2">
      <RsButton variant="outline" @click="showModal = false">Cancel</RsButton>
      <RsButton @click="submit">Submit</RsButton>
    </div>
  </template>
</RsModal>
```

### FormKit Components
```vue
<!-- Text Input -->
<FormKit type="text" label="Label" placeholder="Placeholder" />

<!-- Select -->
<FormKit type="select" label="Label" :options="options" />

<!-- Textarea -->
<FormKit type="textarea" label="Label" rows="3" />

<!-- Date -->
<FormKit type="date" label="Date" />
```

---

## Layout Components

### Vertical Layout Structure
```
┌─────────────────────────────────────────────────────┐
│  Sidebar (256px)    │      Header (calc rest)       │
│  ┌───────────────┐  │  ┌──────────────────────────┐ │
│  │     Logo      │  │  │     Action Buttons →     │ │ 57px
│  └───────────────┘  │  └──────────────────────────┘ │
│  ┌───────────────┐  │                                │
│  │  Section      │  │                                │
│  │  ├─ Item 1    │  │       Content Area             │
│  │  ├─ Item 2    │  │                                │
│  │  │  └─ Child  │  │                                │
│  │  └─ Item 3    │  │                                │
│  └───────────────┘  │                                │
└─────────────────────────────────────────────────────┘
```

### Spacing Breakdown
```
Header Height:        57px (py-3 × 2 + content)
Sidebar Width:        256px
Sidebar Header:       57px (matches header)
Content Margin:       256px (sidebar width)
Header Width:         calc(100% - 256px)
```

---

## CSS Variables & Theming

### Primary Colors (Adaptive)
```css
--color-primary: /* Theme-specific RGB values */
```
**Used For:**
- Active menu backgrounds: `bg-primary/10` or `bg-primary/20`
- Active menu text: `text-primary`
- Links and accents
- Notification badges

### Background Colors
```css
--bg-1: /* Main background */
--bg-2: /* Component background */
```

### Text Colors
```css
--text-color: /* Main text */
```

### Semantic Colors
```css
--color-success: /* Green */
--color-info: /* Blue */
--color-warning: /* Orange */
--color-danger: /* Red */
```

---

## Implementation Guidelines

### 1. Button Sizing
```vue
<!-- Icon Only -->
<button class="h-8 w-8">
  <Icon class="w-4 h-4" />
</button>

<!-- With Text -->
<button class="h-8 px-2 gap-2">
  <Icon class="w-4 h-4" />
  <span>Text</span>
</button>
```

### 2. Dropdown Pattern
```vue
<VDropdown distance="8">
  <button class="h-8 w-8"><!-- Trigger --></button>
  <template #popper>
    <div class="py-1 min-w-44 rounded-md">
      <div class="px-2 py-1.5 text-xs border-b">Header</div>
      <button class="px-2 py-1.5 text-xs">Item</button>
    </div>
  </template>
</VDropdown>
```

### 3. Menu Hierarchy
```
Level 0: Section Headers
  - px-3 pt-3 pb-1
  - text-xs uppercase
  
Level 1: Main Items
  - px-3 py-1.5
  - Icon: w-4 h-4, mr-2.5
  - text-sm
  
Level 2+: Nested Items
  - ml-5 pl-2 (for container)
  - px-3 py-1.5
  - Icon: w-3.5 h-3.5, mr-2.5
  - text-sm
  - border-l-2 (container)
```

### 4. Icon Guidelines
```
Header Buttons:      w-4 h-4 (16px)
Menu Level 1:        w-4 h-4 (16px)
Menu Level 2+:       w-3.5 h-3.5 (14px)
Dropdown Items:      w-3.5 h-3.5 (14px)
Large Icons:         w-6 h-6 (24px) - avatars only
```

### 5. Font Sizing
```
Extra Small:  text-xs (12px)   - Dropdown items, labels, descriptions
Small:        text-sm (14px)   - Menu items, body text
Base:         text-base (16px) - Headers, important text
```

### 6. Border Radius
```
Small:   rounded-sm (2px)   - Color swatches
Medium:  rounded-md (6px)   - Buttons, dropdowns, menu items
Large:   rounded-lg (8px)   - Cards, modals
Full:    rounded-full       - Avatars, badges
```

### 7. Gap Spacing
```
Icons to Icons:     gap-0.5 (2px)
Icon to Text:       gap-2 (8px) or mr-2.5 (10px)
Action Buttons:     gap-2 (8px)
Form Elements:      gap-2 or gap-3 (8-12px)
Menu Items:         space-y-0.5 (2px)
```

---

## Component Checklist

When creating/updating components, ensure:

- [ ] Padding uses compact scale (≤ px-3, ≤ py-3)
- [ ] Margins between items ≤ 0.5 (2px)
- [ ] Icons are appropriately sized for hierarchy
- [ ] Text uses correct size (xs for compact, sm for standard)
- [ ] Border radius is consistent (rounded-md for most)
- [ ] Active states use primary color theme
- [ ] Hover states are subtle (gray backgrounds)
- [ ] Spacing is consistent with this guide
- [ ] Touch targets ≥ 32px (h-8 minimum for buttons)
- [ ] Dark mode colors are defined

---

## Common Patterns

### Pattern 1: Icon + Text Button
```vue
<button class="flex items-center gap-2 px-3 py-1.5 rounded-md">
  <Icon class="w-4 h-4" />
  <span class="text-sm">Label</span>
</button>
```

### Pattern 2: Dropdown with Sections
```vue
<div class="py-1 rounded-md">
  <!-- Section 1 -->
  <div class="px-2 py-1.5 text-xs border-b">Section</div>
  <button class="px-2 py-1.5 text-xs">Item 1</button>
  
  <!-- Section 2 -->
  <div class="px-2 py-1.5 text-xs border-b">Section</div>
  <button class="px-2 py-1.5 text-xs">Item 2</button>
</div>
```

### Pattern 3: Nested Menu with Border
```vue
<div class="space-y-0.5 px-2">
  <button class="px-3 py-1.5">Parent</button>
  <div class="ml-5 pl-2 border-l-2 space-y-0.5">
    <button class="px-3 py-1.5">Child 1</button>
    <button class="px-3 py-1.5">Child 2</button>
  </div>
</div>
```

### Pattern 4: Section Header
```vue
<div class="px-3 pt-3 pb-1">
  <span class="text-xs uppercase tracking-wider text-gray-500">
    Section Name
  </span>
  <p class="text-xs text-gray-400 mt-0.5">Optional description</p>
</div>
```

---

## Implementation Status

### Completed
- Core Layout components (Header, Sidebar, Menu items)
- Task Management Demo Module (Kitchen Sink)
- CSS migration for all component files
- Layout SCSS adjustments for compact padding

### Reference Examples
- Task List page with 40/60 master-detail layout
- Task Board page with kanban-style columns  
- Analytics page with metrics and stats

---

## Notes & Best Practices

### DO ✅
- Use compact spacing consistently
- Maintain visual hierarchy with size, not spacing
- Keep touch targets ≥ 32px (h-8)
- Use theme-aware colors (primary, text-gray)
- Test in both light and dark modes
- Ensure icons scale appropriately
- Use flexbox for alignment
- Maintain consistent border radius

### DON'T ❌
- Don't use padding > py-3 or px-3 in compact components
- Don't mix spacing scales (stick to 0.5 increments)
- Don't hardcode colors (use theme variables)
- Don't create touch targets < 32px
- Don't nest borders more than 2 levels deep
- Don't use different icon sizes at same hierarchy level
- Don't forget dark mode variants
- Don't use inconsistent border radius

---

## Future Considerations

1. **Responsive Breakpoints**
   - Mobile: Full-width modals, hidden sidebar
   - Tablet: Collapsible sidebar, compact header
   - Desktop: Full layout as designed

2. **Accessibility**
   - Keyboard navigation for all dropdowns
   - ARIA labels for icon-only buttons
   - Focus indicators (ring-2 ring-primary)
   - Screen reader announcements

3. **Performance**
   - Lazy load menu items for large menus
   - Virtual scrolling for long lists
   - Optimize icon loading

4. **Animations**
   - Transition duration: 200ms (standard)
   - Ease: ease-in-out or cubic-bezier
   - Keep subtle and quick

---

**End of Document**

For questions or updates, maintain this document as the single source of truth for the compact design system.

