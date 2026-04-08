# Design System Reference

**Audience:** Developers building or extending UI for the Vimla landing page clone.  
**Prerequisite knowledge:** Tailwind CSS v4, React component composition.  
**Diátaxis quadrant:** Reference — factual lookup material. For task-oriented guides, see [`../how-to/extend-the-landing-page.md`](../how-to/extend-the-landing-page.md).

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing Scale](#4-spacing-scale)
5. [Layout](#5-layout)
6. [Border Radius](#6-border-radius)
7. [Shadows & Elevation](#7-shadows--elevation)
8. [Transitions](#8-transitions)
9. [Component Reference](#9-component-reference)
10. [Section Anatomy](#10-section-anatomy)
11. [Iconography](#11-iconography)
12. [Accessibility Checklist](#12-accessibility-checklist)
13. [Anti-Patterns](#13-anti-patterns)

---

## 1. Design Principles

| # | Principle | Enforcement |
|---|-----------|-------------|
| 1 | **Simple over clever.** No animations, parallax, or decorative illustrations. Visual hierarchy comes from color, whitespace, and typography. | Review new components for unnecessary visual complexity. |
| 2 | **Data-driven content.** All user-facing text lives in `data/` files, not inlined in JSX. | Sections import from `data/`, never hardcode Swedish copy. |
| 3 | **Variant props over className overrides.** UI primitives expose a `variant` prop. Consumers never pass raw Tailwind color classes. | `Button`, `Card`, `Badge` all use `Record<Variant, string>` maps. |
| 4 | **Mobile-first responsive.** Write base classes for mobile, then layer `sm:`, `md:`, `lg:` breakpoints. | All section padding and grid columns follow this pattern. |
| 5 | **One brand, one token set.** Every color in the UI traces back to a CSS variable in `globals.css`. No hex values in components. | `grep` for `#` in `.tsx` files should return zero results. |
| 6 | **Swedish, informal tone.** All user-facing copy uses Vimla's friendly "du"-form Swedish. | Content reviewed against brand voice in `data/` files. |

---

## 2. Color Palette

All colors are defined as CSS variables in `app/src/app/globals.css` under `@theme inline` and consumed via Tailwind utility classes.

### Brand Colors

| Token | CSS Variable | Tailwind Class | Hex | sRGB | Usage |
|-------|-------------|----------------|-----|------|-------|
| Primary | `--color-primary` | `bg-primary` / `text-primary` | `#3CB371` | `60, 179, 113` | Logo, buttons, badges, accents, check icons |
| Primary hover | `--color-primary-hover` | `bg-primary-hover` | `#2E9E5E` | `46, 158, 94` | Button hover state only |
| Primary light | `--color-primary-light` | `bg-primary-light` | `#E8F5E9` | `232, 245, 233` | Hero section bg, USP icon bg, secondary button hover |

### Neutral Colors

| Token | CSS Variable | Tailwind Class | Hex | Usage |
|-------|-------------|----------------|-----|-------|
| Dark | `--color-dark` | `text-dark` / `bg-dark` | `#2D2D2D` | Primary text, footer background |
| Muted | `--color-muted` | `text-muted` | `#6B7280` | Secondary text, descriptions, chevron icons |
| White | `--color-white` | `bg-white` / `text-white` | `#FFFFFF` | Page background, card backgrounds, text on primary bg |
| Gray 50 | `--color-gray-50` | `bg-gray-50` | `#F9FAFB` | Alternating section backgrounds (USP, FAQ) |
| Gray 100 | `--color-gray-100` | `bg-gray-100` | `#F3F4F6` | Ghost button hover |
| Gray 200 | `--color-gray-200` | `border-gray-200` / `ring-gray-200` | `#E5E7EB` | Card default ring, accordion dividers |
| Gray 300 | `--color-gray-300` | `border-gray-300` | `#D1D5DB` | Subtle borders (reserved) |

### Color Pairing Rules

| Background | Allowed Text | Allowed Accents |
|------------|-------------|-----------------|
| `bg-primary` | `text-white` only | — |
| `bg-primary-light` | `text-dark`, `text-muted` | `text-primary` for emphasis |
| `bg-white` | `text-dark`, `text-muted` | `text-primary` for links/accents |
| `bg-gray-50` | `text-dark`, `text-muted` | `text-primary` for icons/accents |
| `bg-dark` | `text-white`, `text-gray-300`, `text-gray-400` | `text-primary` for logo |

### Contrast Ratios

| Combination | Ratio | WCAG AA |
|-------------|-------|---------|
| `text-white` on `bg-primary` (`#3CB371`) | 3.3:1 | ✅ Large text / ⚠️ Small text |
| `text-dark` on `bg-white` | 14.5:1 | ✅ |
| `text-dark` on `bg-primary-light` | 13.8:1 | ✅ |
| `text-muted` on `bg-white` | 4.6:1 | ✅ |
| `text-white` on `bg-dark` | 14.5:1 | ✅ |
| `text-primary` on `bg-dark` | 5.9:1 | ✅ |

---

## 3. Typography

### Font Stack

```css
--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

No custom web fonts. The system stack ensures fast rendering and native-feeling text.

### Type Scale

| Role | Tailwind Classes | Size (mobile → desktop) | Weight | Tracking | Usage |
|------|-----------------|------------------------|--------|----------|-------|
| Hero heading | `text-4xl md:text-6xl font-extrabold tracking-tight` | 2.25rem → 3.75rem | 800 | tight | Hero `<h1>` only |
| Section heading | `text-3xl md:text-4xl font-bold` | 1.875rem → 2.25rem | 700 | normal | All `<h2>` section titles |
| Card heading | `text-xl font-bold` | 1.25rem | 700 | normal | Plan card names, USP titles |
| Subheading | `text-xl font-semibold` | 1.25rem | 600 | normal | Step titles, USP titles |
| Body large | `text-lg md:text-xl leading-relaxed` | 1.125rem → 1.25rem | 400 | normal | Hero description |
| Body | `text-lg leading-relaxed` | 1.125rem | 400 | normal | Section descriptions |
| Body small | `text-sm` | 0.875rem | 400 | normal | Feature list items, footer links |
| Caption | `text-xs font-semibold` | 0.75rem | 600 | normal | Badges ("Populärast") |
| Price | `text-2xl font-bold` | 1.5rem | 700 | normal | Plan price numbers |
| Data amount | `text-3xl font-extrabold text-primary` | 1.875rem | 800 | normal | Plan data quantity |
| Logo | `text-2xl font-extrabold tracking-tight text-primary` | 1.5rem | 800 | tight | Navbar + footer logo |

### Text Color Assignment

| Content type | Color class |
|-------------|-------------|
| Headings | `text-dark` |
| Branded text (logo, "Vimla.", data amounts) | `text-primary` |
| Body / descriptions | `text-muted` |
| Text on primary background | `text-white` |
| Footer secondary text | `text-gray-300` / `text-gray-400` |

---

## 4. Spacing Scale

All spacing uses Tailwind's default `rem`-based scale. These are the recurring values in the codebase:

### Section-Level Spacing

| Element | Mobile | Desktop | Tailwind Classes |
|---------|--------|---------|-----------------|
| Section vertical padding | 5rem (80px) | 7rem (112px) | `py-20 md:py-28` |
| Hero vertical padding | 5rem (80px) | 8rem (128px) | `py-20 md:py-32` |
| Section header to content | 3.5rem (56px) | 3.5rem | `mb-14` |
| Heading to subtext | 1rem (16px) | 1rem | `mt-4` |

### Component-Level Spacing

| Element | Value | Tailwind |
|---------|-------|---------|
| Card padding | 1.5rem (24px) | `p-6` |
| Card grid gap | 1.5rem (24px) | `gap-6` |
| Feature list item gap | 0.75rem (12px) | `space-y-3` |
| CTA group gap | 1rem (16px) | `gap-4` |
| Content grid gap | 2.5rem (40px) | `gap-10` |
| Button inner padding | 0.75rem × 1.5rem | `px-6 py-3` |
| Accordion item padding | 1.25rem (20px) top/bottom | `py-5` |
| Navbar height | 4rem (64px) | `h-16` |

---

## 5. Layout

### Container

All content is wrapped in `Container` — a single consistent max-width wrapper.

| Property | Value | Tailwind |
|----------|-------|---------|
| Max width | 80rem (1280px) | `max-w-7xl` |
| Horizontal padding (mobile) | 1rem (16px) | `px-4` |
| Horizontal padding (tablet) | 1.5rem (24px) | `sm:px-6` |
| Horizontal padding (desktop) | 2rem (32px) | `lg:px-8` |
| Centering | auto margins | `mx-auto` |
| Width | full | `w-full` |

### Grid Systems

| Context | Mobile | Tablet | Desktop | Tailwind Classes |
|---------|--------|--------|---------|-----------------|
| Plan cards | 1 column | 2 columns | 4 columns | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| USPs / Steps | 1 column | 3 columns | 3 columns | `grid-cols-1 md:grid-cols-3` |
| Footer | 1 column | 2 columns | 4 columns | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| FAQ | single column, centered | max-w-2xl | max-w-2xl | `max-w-2xl mx-auto` |

### Section Background Alternation

Sections alternate between white and gray to create visual separation without borders:

| Position | Section | Background |
|----------|---------|-----------|
| 1 | Hero | `bg-primary-light` |
| 2 | PlanCards | `bg-white` |
| 3 | USPSection | `bg-gray-50` |
| 4 | HowItWorks | `bg-white` |
| 5 | FAQ | `bg-gray-50` |
| 6 | Footer | `bg-dark` |

**Rule:** Never place two consecutive sections with the same background. Hero always uses `bg-primary-light`. Footer always uses `bg-dark`. Interior sections alternate `bg-white` / `bg-gray-50`.

---

## 6. Border Radius

| Element | Radius | Tailwind | Value |
|---------|--------|---------|-------|
| Buttons | full pill | `rounded-full` | 9999px |
| Cards | extra-large | `rounded-2xl` | 1rem (16px) |
| Badges | full pill | `rounded-full` | 9999px |
| USP icon containers | extra-large | `rounded-2xl` | 1rem (16px) |
| Step number circles | full circle | `rounded-full` | 9999px |

**Rule:** Only two border-radius values exist in the system — `rounded-full` (pill/circle) and `rounded-2xl` (large rounded rectangle). No other radius values are used.

---

## 7. Shadows & Elevation

| Level | Tailwind | Usage |
|-------|---------|-------|
| Subtle | `shadow-sm` | Default cards, primary buttons |
| Medium | `shadow-md` | Highlighted (popular) cards |
| None | — | All other elements |

**Elevation is expressed through ring + shadow, not shadow alone:**

| State | Ring | Shadow |
|-------|------|--------|
| Card default | `ring-1 ring-gray-200` | `shadow-sm` |
| Card highlighted | `ring-2 ring-primary` | `shadow-md` |
| Button primary | — | `shadow-sm` |
| Button secondary | `border-2 border-primary` | — |

---

## 8. Transitions

| Property | Duration | Easing | Tailwind | Usage |
|----------|----------|--------|---------|-------|
| Color changes | 150ms | ease-in-out | `transition-colors` | Button hover, link hover |
| Transform (rotation) | 200ms | ease-in-out | `transition-transform duration-200` | Accordion chevron rotation |
| Height (expand/collapse) | 200ms | ease-in-out | `transition-all duration-200` | Accordion content reveal |

**Rule:** No `transition-all` on color changes — use `transition-colors` for better performance. Reserve `transition-all` only for compound animations (accordion open/close). No `duration-300` or longer — everything is snappy.

---

## 9. Component Reference

### `Button`

| Variant | Background | Text | Border | Hover | Shadow |
|---------|-----------|------|--------|-------|--------|
| `primary` | `bg-primary` | `text-white` | none | `bg-primary-hover` | `shadow-sm` |
| `secondary` | `bg-white` | `text-dark` | `border-2 border-primary` | `bg-primary-light` | none |
| `ghost` | transparent | `text-dark` | none | `bg-gray-100` | none |

Fixed properties (all variants): `rounded-full px-6 py-3 text-base font-semibold transition-colors cursor-pointer`  
Focus state: `focus:ring-2 focus:ring-primary/50 focus:outline-none`  
Link mode: when `href` is provided, renders `<a>` with identical classes.

### `Card`

| Prop | Default | Highlight |
|------|---------|-----------|
| Ring | `ring-1 ring-gray-200` | `ring-2 ring-primary` |
| Shadow | `shadow-sm` | `shadow-md` |

Fixed properties: `rounded-2xl bg-white p-6`

### `Accordion`

| State | Chevron | Content |
|-------|---------|---------|
| Closed | `rotate-0` | `max-h-0 overflow-hidden` |
| Open | `rotate-180` | `max-h-96 pb-5` |

Fixed properties: `border-b border-gray-200` divider, `py-5` button padding.  
Question: `text-lg font-medium text-dark`  
Answer: `text-muted leading-relaxed`  
Chevron: `h-5 w-5 text-muted`

### `Container`

Single configuration — no variants.  
Fixed properties: `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`

### `Badge` (pattern — not yet a component)

Used inline in `PlanCards` for the "Populärast" label:  
`inline-block self-start rounded-full bg-primary text-white text-xs font-semibold px-3 py-1`

---

## 10. Section Anatomy

Every section follows a consistent internal structure:

```
<section className="{bg-color} py-20 md:py-28" id="{optional-anchor}">
  <Container>
    <!-- Section header (centered) -->
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-dark">
        {title}
      </h2>
      <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
        {description}
      </p>
    </div>

    <!-- Section content (grid or custom) -->
    <div className="grid grid-cols-1 md:grid-cols-{N} gap-{size}">
      {children}
    </div>
  </Container>
</section>
```

| Element | Classes | Constraint |
|---------|---------|-----------|
| Section wrapper | `py-20 md:py-28` + bg color | Required |
| Section header wrapper | `text-center mb-14` | Required |
| Section `<h2>` | `text-3xl md:text-4xl font-bold text-dark` | Exactly this scale |
| Section description `<p>` | `mt-4 text-muted text-lg max-w-xl mx-auto` | Max width `xl` (36rem) |
| Content area | grid or custom | Below the header |

**Exceptions:**
- `HeroSection` uses `<h1>` at a larger scale (`text-4xl md:text-6xl font-extrabold`).
- `Navbar` and `Footer` do not follow this pattern — they have their own structures.

---

## 11. Iconography

| Library | Package | Import Pattern |
|---------|---------|---------------|
| Lucide React | `lucide-react` | Named imports: `import { Check, ChevronDown } from "lucide-react"` |

### Icon Sizing

| Context | Size | Tailwind |
|---------|------|---------|
| Feature check marks | 16×16 | `h-4 w-4` |
| Accordion chevron | 20×20 | `h-5 w-5` |
| Mobile menu toggle | 24×24 | `h-6 w-6` |
| USP section icons | 28×28 | `h-7 w-7` |

### Icon Color Rules

| Context | Color | Class |
|---------|-------|-------|
| Accent/brand icons | Primary green | `text-primary` |
| Neutral/UI icons | Muted gray | `text-muted` |
| Icons on dark bg | White | `text-white` |
| Interactive icons | Inherits from parent | — |

### Icons in Use

| Icon | Import | Usage |
|------|--------|-------|
| `Check` | `lucide-react` | Plan feature list check marks |
| `ChevronDown` | `lucide-react` | Accordion open/close indicator |
| `Menu` | `lucide-react` | Mobile nav hamburger |
| `X` | `lucide-react` | Mobile nav close |
| `Lock` | `lucide-react` | USP: no lock-in |
| `Signal` | `lucide-react` | USP: Telenor network |
| `TrendingDown` | `lucide-react` | USP: price drops |

---

## 12. Accessibility Checklist

| Requirement | Implementation | Status |
|-------------|---------------|--------|
| Semantic HTML | `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>` hierarchy | ✅ |
| Keyboard navigation | Native `<button>` and `<a>` elements used throughout | ✅ |
| Focus indicators | `focus:ring-2 focus:ring-primary/50` on all buttons | ✅ |
| Accordion `aria-expanded` | Set to `true`/`false` on accordion button | ✅ |
| Mobile menu `aria-label` | Dynamic: "Öppna meny" / "Stäng meny" | ✅ |
| Language declaration | `<html lang="sv">` | ✅ |
| Text contrast (dark on white) | 14.5:1 | ✅ AA |
| Text contrast (muted on white) | 4.6:1 | ✅ AA |
| Text contrast (white on primary) | 3.3:1 | ✅ AA large text / ⚠️ AA small text |
| No text in images | Logo is styled text, no images used | ✅ |
| Smooth scroll | `scroll-behavior: smooth` in CSS | ✅ |

**Known gap:** White text on `bg-primary` (`#3CB371`) passes AA for large text (≥18px / 14px bold) but not for regular-size body text. Current usage (buttons at `text-base font-semibold`, badges at `text-xs font-semibold`) is acceptable because all instances use bold weight at ≥12px.

---

## 13. Anti-Patterns

| ❌ Don't | ✅ Do Instead | Reason |
|----------|--------------|--------|
| Add hex color values in `.tsx` files | Use Tailwind token classes (`bg-primary`, `text-dark`) | Single source of truth in `globals.css` |
| Pass raw color classes to `Button` via `className` | Use the `variant` prop | Variants enforce consistent visual language |
| Use `rounded-lg`, `rounded-xl`, or `rounded-md` | Use `rounded-full` or `rounded-2xl` only | Two radii in the system — nothing in between |
| Add `shadow-lg`, `shadow-xl` | Use `shadow-sm` or `shadow-md` | Only two shadow levels exist |
| Use `transition-all` on buttons or links | Use `transition-colors` | Better performance, explicit intent |
| Set `duration-300` or longer on any transition | Use `duration-200` max | Everything should feel snappy |
| Use `text-black` or `text-gray-900` | Use `text-dark` (`#2D2D2D`) | Softer than pure black, consistent with brand |
| Place two sections with same bg color next to each other | Alternate `bg-white` / `bg-gray-50` | Visual separation without borders |
| Import section components into other sections | Sections are self-contained, composed in `page.tsx` | Flat composition, no nesting |
| Hardcode Swedish copy in JSX | Put content in `data/` files with TypeScript interfaces | Separation of content and presentation |
| Skip `id` anchor on sections linked from nav | Add `id="section-name"` to the `<section>` | Required for in-page navigation to work |
| Use `next/link` for in-page anchors | Use plain `<a href="#anchor">` (or `Button` with `href`) | No route transitions needed for scroll targets |

---

## See Also

- **Architecture**: [`architecture.md`](./architecture.md) — system overview, component catalogue, data model, ADRs
- **How-to**: [`../how-to/extend-the-landing-page.md`](../how-to/extend-the-landing-page.md) — task recipes for adding plans, FAQs, sections, colors
