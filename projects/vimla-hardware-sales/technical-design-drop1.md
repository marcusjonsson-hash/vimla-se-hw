# Detailed Technical Design — Drop 1: Static Catalogue

> **State:** Build
> **Last updated:** 2026-04-08
> **Drop:** 1 — Static Catalogue

---

## Overview

Drop 1 delivers the phone listing page at `/phones` with static phone catalogue data, brand filtering, sorting, and a responsive card grid. No backend API, no CMS integration — this drop uses local TypeScript data files as the catalogue source (to be replaced by a headless CMS API in a later drop).

---

## Design Decision: Local Data vs. CMS for Drop 1

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Local `.ts` data files** | Zero external dependency, fast iteration, testable immediately, follows existing codebase pattern (`plans.ts`, `usps.ts`) | Not editable by commercial team (Drop 6 concern), data lives in codebase | ✅ **Chosen for Drop 1** |
| **Headless CMS from day 1** | Commercial team access earlier | Adds external dependency, CMS setup scope, slower iteration for Drop 1 | Deferred to Drop 2+ |

**Rationale:** The existing codebase follows a "data-driven sections" pattern where typed arrays in `data/` feed section components. Drop 1 continues this pattern. The CMS migration is a Drop 2+ concern where product detail requires richer content. The TypeScript interfaces defined now will serve as the contract that the CMS schema must satisfy.

---

## Data Layer — CMS Schema (TypeScript Interfaces)

### `app/src/data/phones.ts`

```typescript
/** Represents a single storage variant with its own price */
export interface PhoneVariant {
  storage: string;           // e.g. "128 GB", "256 GB", "512 GB", "1 TB"
  retailPrice: number;       // Device retail price in SEK (e.g. 14388)
  instalmentPrice: number;   // Monthly instalment = ceil(retailPrice / 36)  — BR-101
}

/** Represents a colour option for a phone model */
export interface PhoneColour {
  name: string;              // e.g. "Titan Natur", "Titan Blå"
  hex: string;               // CSS colour value for the swatch (e.g. "#8B7355")
  imageUrl: string;          // Primary product image for this colour
}

/** Catalogue status for a phone model — BR-401, FR-107, FR-602 */
export type PhoneStatus = "active" | "out-of-stock" | "inactive";

/** Brand identifier — used for filtering (FR-104) */
export type PhoneBrand = "iPhone" | "Samsung";

/** A phone model in the catalogue */
export interface Phone {
  slug: string;              // URL slug, e.g. "iphone-17-pro" — used in /phones/<slug>
  name: string;              // Display name, e.g. "iPhone 17 Pro"
  brand: PhoneBrand;         // Brand for filtering — FR-104
  status: PhoneStatus;       // Catalogue status — FR-107, BR-401
  sortOrder: number;         // Sort order for "Populärast" — BR-403 (lower = first)
  imageUrl: string;          // Default listing image (first colour's image)
  colours: PhoneColour[];    // Available colour options — FR-203 (Drop 2)
  variants: PhoneVariant[];  // Storage variants with prices — FR-204, BR-101
  specs: Record<string, string>; // Key-value specs — FR-206 (Drop 2)
}
```

### Business Rule Enforcement

| Rule | Enforcement | Location |
|------|-------------|----------|
| **BR-101** (instalment = ceil(price ÷ 36)) | `instalmentPrice` field is pre-computed in the data file; a utility function `calculateInstalment(retailPrice)` validates it | `data/phones.ts` + `lib/pricing.ts` |
| **BR-102** (starting price = cheapest variant) | `getStartingPrice(phone)` utility returns `Math.min(...phone.variants.map(v => v.instalmentPrice))` | `lib/pricing.ts` |
| **BR-401** (only "active" models shown) | `getActivePhones()` filters by `status === "active"` AND `variants.length > 0` | `lib/catalogue.ts` |
| **BR-403** (sort order for "Populärast") | Default sort uses `phone.sortOrder` ascending; ties broken alphabetically by `phone.name` | `lib/catalogue.ts` |

---

## Component Structure

### New Files — Drop 1

```
app/src/
├── app/
│   └── phones/
│       └── page.tsx              # Phone listing page — US-101
├── components/
│   ├── sections/
│   │   ├── PhoneHero.tsx         # Hero section with title + instalment subtitle — US-001
│   │   └── PhoneListing.tsx      # Client component: filter/sort state, grid render — US-101, US-102, US-103
│   └── ui/
│       ├── PhoneCard.tsx         # Phone card component — FR-102, FR-103
│       ├── BrandFilter.tsx       # Filter tabs: Alla / iPhone / Samsung — FR-104, FR-106
│       └── SortDropdown.tsx      # Sort control: Populärast, Pris lägst, Pris högst — FR-105
├── data/
│   └── phones.ts                 # Phone catalogue data + interfaces — ≥ 3 test models
└── lib/
    ├── pricing.ts                # Instalment calculation utility — BR-101, BR-102
    └── catalogue.ts              # Catalogue filtering, sorting, and querying — BR-401, BR-403
```

### Modified Files — Drop 1

| File | Change | Traces to |
|------|--------|-----------|
| `data/navigation.ts` | Add `{ label: "Telefoner", href: "/phones" }` to `navLinks` | FR-001, US-001 |
| `components/sections/Navbar.tsx` | No code change — already data-driven from `navLinks` | FR-001 |

---

## Component Design

### `PhoneHero.tsx` (Server Component)

**Props:** none (reads directly from catalogue data to compute lowest price)

**Renders:**
- Section with `bg-primary-light` background
- `<h1>` "Telefoner"
- Subtitle: "Köp mobil med Vimla — betala från {lowestPrice} kr/mån med 36 månaders delbetalning"
- `lowestPrice` = computed from `getActivePhones()` → min `getStartingPrice()`

**Traces to:** FR-002, US-001 AC-3, US-001 AC-4

---

### `PhoneListing.tsx` (Client Component — `"use client"`)

**Props:** `phones: Phone[]` (the active phone list, passed from the server page)

**State:**
- `brand: "Alla" | "iPhone" | "Samsung"` — default `"Alla"`
- `sort: "popularity" | "price-asc" | "price-desc"` — default `"popularity"`

**Behaviour:**
1. Filters `phones` by `brand` (or all if "Alla")
2. Sorts filtered list by selected sort option
3. Renders `BrandFilter`, `SortDropdown`, and phone card grid
4. Renders empty state message when filter yields zero results

**Traces to:** US-101, US-102, US-103, FR-104, FR-105, FR-106

---

### `PhoneCard.tsx` (Server-compatible, stateless)

**Props:** `phone: Phone`

**Renders:**
- White card with rounded corners, subtle shadow
- Product image (square, centered)
- Model name
- Starting instalment price: "fr. {startingPrice} kr/mån"
- "Välj →" button linking to `/phones/{phone.slug}`
- Hover: elevated shadow, 1.02× scale
- Focus: 2px Vimla-brand-colour outline

**Traces to:** FR-102, FR-103, ux.md phone card interaction states

---

### `BrandFilter.tsx` (Client Component)

**Props:** `activeBrand: string`, `onBrandChange: (brand) => void`

**Renders:**
- Three pill-shaped toggle buttons: Alla, iPhone, Samsung
- Active tab: filled with brand colour (`bg-primary text-white`)
- Inactive tab: outlined, muted text
- Keyboard accessible: Tab/Enter/Space

**Traces to:** FR-104, FR-106, US-102

---

### `SortDropdown.tsx` (Client Component)

**Props:** `activeSort: string`, `onSortChange: (sort) => void`

**Renders:**
- `<select>` dropdown with three options: Populärast, Pris lägst först, Pris högst först
- Default: Populärast
- `aria-label="Sortera telefoner"`

**Traces to:** FR-105, US-103

---

### `phones/page.tsx` (Server Component — Page)

**Composition:**
1. `<Navbar />` (existing — now includes "Telefoner" link via data)
2. `<PhoneHero />`
3. `<PhoneListing phones={activePhones} />`
4. `<Footer />` (existing)

**Data loading:** Imports `getActivePhones()` from `lib/catalogue.ts` at the server level.

---

## Responsive Grid

Per ux.md responsive behaviour and Drop 1 AC #9:

| Breakpoint | Columns | Tailwind Class |
|------------|---------|----------------|
| < 768px | 1 | `grid-cols-1` (default) |
| 768px – 1279px | 2 | `md:grid-cols-2` |
| ≥ 1280px | 3 | `xl:grid-cols-3` |

Grid container: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`

---

## URL Structure

| URL | Component | Drop |
|-----|-----------|------|
| `/phones` | Phone listing page | **Drop 1** |
| `/phones/<slug>` | Phone detail page | Drop 2 (404 for now) |
| `/phones/<slug>/checkout` | Checkout page | Drop 3 |
| `/phones/<slug>/checkout/result` | Credit check result | Drop 3 |
| `/order/confirmation/<order-id>` | Order confirmation | Drop 3 |

---

## Accessibility — Drop 1

| Element | Implementation | Traces to |
|---------|---------------|-----------|
| Phone cards | `role="link"`, `tabIndex={0}`, focus ring `ring-2 ring-primary` | NFR-302, ux.md |
| Brand filter tabs | `role="tablist"` / `role="tab"`, `aria-selected`, keyboard Enter/Space | NFR-302 |
| Sort dropdown | `<select>` with `aria-label="Sortera telefoner"` | NFR-302 |
| Product images | `alt="{phone.name}"` (basic; Drop 2 adds colour/angle detail per NFR-303) | NFR-303 |
| Price updates | Filter/sort changes are instant (client-side) — no `aria-live` needed until Drop 2 price box | — |
| Language | `lang="sv"` on `<html>` (already set in layout.tsx) | NFR-602 |

---

## Test Phone Models (Drop 1 Seed Data)

Per Drop 1 requirement: "≥ 3 test phone models (placeholder images + real specs)"

| # | Model | Brand | Slug | Cheapest Variant | Instalment | Sort Order |
|---|-------|-------|------|------------------|------------|------------|
| 1 | iPhone 17 Pro | iPhone | `iphone-17-pro` | 128 GB @ 14 388 SEK | 400 kr/mån | 1 |
| 2 | iPhone 17 Pro Max | iPhone | `iphone-17-pro-max` | 256 GB @ 17 988 SEK | 500 kr/mån | 2 |
| 3 | iPhone 17 | iPhone | `iphone-17` | 128 GB @ 10 788 SEK | 300 kr/mån | 3 |
| 4 | Samsung Galaxy S26 Ultra | Samsung | `samsung-galaxy-s26-ultra` | 256 GB @ 16 188 SEK | 450 kr/mån | 4 |
| 5 | Samsung Galaxy S26 | Samsung | `samsung-galaxy-s26` | 128 GB @ 11 988 SEK | 333 kr/mån | 5 |
| 6 | Samsung Galaxy S26+ | Samsung | `samsung-galaxy-s26-plus` | 256 GB @ 13 788 SEK | 383 kr/mån | 6 |

Note: `instalmentPrice = ceil(retailPrice / 36)` per BR-101. Placeholder images use `/phones/placeholder.svg`.
