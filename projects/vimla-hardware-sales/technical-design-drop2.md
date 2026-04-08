# Detailed Technical Design — Drop 2: Phone Detail & Configuration

> **State:** Build
> **Last updated:** 2026-04-08
> **Drop:** 2 — Phone Detail & Configuration

---

## Overview

Drop 2 delivers the phone detail page at `/phones/<phone-slug>` with an image gallery, colour picker, storage picker, dynamic price box, specs table, and CTA button. The visitor can configure a phone (select colour and storage) and see the instalment price update in real time — no checkout yet (Drop 3).

This drop builds on top of the data layer and catalogue utilities established in Drop 1, extending the `Phone` interface's `colours`, `variants`, and `specs` fields into interactive UI components.

---

## Design Decision: Client vs Server Component Split

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Entire detail page as Client Component** | Simpler mental model, single `"use client"` boundary | Larger JS bundle, SEO metadata requires server extraction, no SSG benefit | ❌ Rejected |
| **Server page shell + Client `PhoneDetail` section** | Metadata generated server-side (SEO), static params for build-time generation, interactive pickers scoped to client boundary | Requires prop-passing across boundary | ✅ **Chosen** |
| **Individual client pickers composed in server page** | Maximum SSR surface | Complex state synchronisation between sibling client components (colour ↔ gallery, storage ↔ price) | ❌ Rejected — shared state too tightly coupled |

**Rationale:** The phone page has two distinct concerns:

1. **Server concerns:** URL routing, metadata generation (`generateMetadata`), build-time path generation (`generateStaticParams`), data fetching from the catalogue, and 404 handling. These belong in the Next.js page component.
2. **Client concerns:** Colour selection state, storage selection state, derived gallery images, and derived prices. These are tightly coupled — changing colour updates the gallery, changing storage updates the price box. A single `"use client"` boundary (`PhoneDetail.tsx`) encapsulates all interactive state.

This mirrors Drop 1's pattern where `PhoneListing.tsx` is the single client boundary for filter/sort state, while `phones/page.tsx` remains a server component.

---

## Design Decision: Image Gallery Architecture

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **One image per colour (colour swap only)** | Simple, minimal data | No multi-angle browsing per FR-202 thumbnail requirement | ❌ |
| **Gallery images derived from colour + model default** | Works with placeholder data, structure supports future CMS images | Fewer images than ux.md's "3–5 per colour" target in Drop 2 | ✅ **Chosen for Drop 2** |
| **Full gallery per colour from CMS** | Best customer experience, 3–5 angles per colour | Requires real product photography (Phase 1 catalogue population in Drop 6) | Deferred to Drop 6 |

**Rationale:** Drop 2 uses placeholder SVG images. The `ImageGallery` component is built to support N images per colour, but the current data provides 2 images per colour (colour-specific image + model default). When real product photography arrives in Drop 6, the `PhoneColour` type can be extended with an `images: string[]` array, and the gallery requires no structural changes.

---

## Design Decision: `totalCost` Field on `PhoneVariant`

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Compute `totalCost` at render time** | Less data, single source of truth | Scattered computation, easy to forget `×36` | ❌ |
| **Pre-compute `totalCost` in data file** | Co-located with `instalmentPrice`, enforced by `variant()` helper, consistent with BR-103 | Slightly more data per variant | ✅ **Chosen** |

**Rationale:** Drop 1 defined `PhoneVariant` with `retailPrice` and `instalmentPrice`. Drop 2 added `totalCost` to the interface because the price box (FR-205) requires "Totalt: X kr". Pre-computing via the `variant()` helper function guarantees arithmetic consistency (BR-103: total = instalment × 36) and keeps the component layer free of business rule logic.

```typescript
// Updated PhoneVariant (Drop 2 addition: totalCost)
export interface PhoneVariant {
  storage: string;
  retailPrice: number;
  instalmentPrice: number;  // ceil(retailPrice / 36) — BR-101
  totalCost: number;        // instalmentPrice × 36 — BR-103 (NEW in Drop 2)
}
```

The `variant()` helper in `data/phones.ts` enforces both calculations:

```typescript
function variant(storage: string, retailPrice: number): PhoneVariant {
  const instalmentPrice = calculateInstalment(retailPrice);
  return {
    storage,
    retailPrice,
    instalmentPrice,
    totalCost: calculateTotalCost(instalmentPrice),
  };
}
```

---

## Data Layer — Extensions from Drop 1

### No New Data Files

Drop 2 does not introduce new data files. All data is sourced from existing files:

| File | Drop 2 Usage |
|------|-------------|
| `data/phones.ts` | `Phone.colours` (was defined but minimally used in Drop 1), `Phone.specs` (used for the first time), `PhoneVariant.totalCost` (new field) |
| `data/plans.ts` | `plans[].price` — used to compute cheapest subscription price for the price box hint |
| `lib/pricing.ts` | `INSTALMENT_MONTHS` constant displayed in price box ("i 36 månader"), `calculateTotalCost()` used by `variant()` helper |
| `lib/catalogue.ts` | `findBySlug()` — new utility for slug-based lookup (added in Drop 2) |

### `findBySlug()` — New Catalogue Utility

Added to `lib/catalogue.ts` to support the detail page's slug-based data loading:

```typescript
/**
 * Find a phone by its URL slug. Returns undefined if not found.
 */
export function findBySlug(
  allPhones: Phone[],
  slug: string
): Phone | undefined {
  return allPhones.find((phone) => phone.slug === slug);
}
```

**Traces to:** US-201 (view phone details), 404 handling for invalid slugs.

### Seed Data Enrichment

Drop 1 defined the `specs` and `colours` fields on each phone model but they were not consumed by any component. Drop 2 populates these fields with realistic data:

- **Colours:** 3–4 per model with distinct hex values and colour-specific image URLs
- **Specs:** 5 key-value pairs per model (Skärm, Chip, Kamera, Batteri, 5G) per FR-206

All 6 phone models have complete colour, variant, and spec data. See `data/phones.ts` for the full seed catalogue.

---

## Component Structure

### New Files — Drop 2

```
app/src/
├── app/
│   └── phones/
│       └── [slug]/
│           ├── page.tsx          # Phone detail page — US-201
│           └── not-found.tsx     # 404 for invalid slugs — US-201 edge case
├── components/
│   ├── sections/
│   │   └── PhoneDetail.tsx      # Client component: colour/storage state, composition — US-201, US-202
│   └── ui/
│       ├── ImageGallery.tsx     # Main image + thumbnail strip — FR-202
│       ├── ColourPicker.tsx     # Colour swatches — FR-203
│       ├── StoragePicker.tsx    # Storage pills — FR-204
│       ├── PriceBox.tsx         # Instalment price breakdown — FR-205
│       └── SpecsTable.tsx       # Key-value specs table — FR-206
```

### Modified Files — Drop 2

| File | Change | Traces to |
|------|--------|-----------|
| `data/phones.ts` | Added `totalCost` to `PhoneVariant` interface; `variant()` helper now computes both `instalmentPrice` and `totalCost`; enriched seed data with full specs and colours | BR-103, FR-203, FR-206 |
| `lib/catalogue.ts` | Added `findBySlug()` utility | US-201 |
| `lib/pricing.ts` | Added `calculateTotalCost()` function | BR-103 |

---

## Component Design

### `phones/[slug]/page.tsx` (Server Component — Page)

**Type:** Server Component (Next.js App Router dynamic route)

**Responsibilities:**
1. Extract `slug` from URL params
2. Look up the phone via `findBySlug()`
3. Return `notFound()` for invalid/inactive slugs (triggers `not-found.tsx`)
4. Generate dynamic `<title>` and `<meta description>` per phone model
5. Pre-compute cheapest plan price for the price box
6. Generate static paths at build time via `generateStaticParams()`

**Composition:**
```
<Navbar />                          ← existing
<main>
  <Container>
    <PhoneDetail                    ← client boundary
      phone={phone}
      cheapestPlanPrice={39}        ← from plans data
    />
    <SpecsTable specs={phone.specs} /> ← server-rendered below the fold
  </Container>
</main>
<Footer />                          ← existing
```

**Key implementation details:**

- **`generateStaticParams()`** pre-renders all active phone slugs at build time for SSG performance
- **`generateMetadata()`** produces unique SEO metadata per phone: `"iPhone 17 Pro – Köp med Vimla"` with instalment price in description
- **404 guard:** Both "not found" and "inactive" models trigger `notFound()` — inactive phones should not be accessible via direct URL

**Traces to:** FR-201, US-201, Drop 2 AC #1

---

### `phones/[slug]/not-found.tsx` (Server Component)

**Props:** none

**Renders:**
- Centred layout with `📱` emoji, "Telefonen hittades inte" heading
- Empathetic body text: "Vi kunde inte hitta den telefon du letade efter..."
- Primary CTA button: "Tillbaka till alla telefoner" linking to `/phones` with arrow icon

**Traces to:** US-201 edge case, Drop 2 AC #8

---

### `PhoneDetail.tsx` (Client Component — `"use client"`)

**Props:**

| Prop | Type | Source |
|------|------|--------|
| `phone` | `Phone` | Server page passes the full phone object |
| `cheapestPlanPrice` | `number` | Computed server-side from `Math.min(...plans.map(p => p.price))` |

**State:**

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `activeColour` | `string` | `phone.colours[0].name` | Tracks selected colour by name |
| `activeStorage` | `string` | `phone.variants[0].storage` | Tracks selected storage capacity |

**Derived values (via `useMemo`):**

| Derived | Computation | Traces to |
|---------|-------------|-----------|
| `currentColour` | `phone.colours.find(c => c.name === activeColour)` | FR-203 |
| `currentVariant` | `phone.variants.find(v => v.storage === activeStorage)` | FR-204, FR-205 |
| `galleryImages` | Build image array from `currentColour.imageUrl` + `phone.imageUrl` | FR-202 |
| `checkoutUrl` | `/phones/${slug}/checkout?colour=...&storage=...` | FR-208 |

**State flow diagram:**

```
User clicks colour swatch
  → setActiveColour(name)
  → currentColour recalculates (useMemo)
  → galleryImages recalculates (useMemo)
  → ImageGallery re-renders with new images
  → ImageGallery useEffect resets activeIndex to 0

User clicks storage pill
  → setActiveStorage(storage)
  → currentVariant recalculates (useMemo)
  → PriceBox re-renders with new instalmentPrice/totalCost
```

**Layout:** Responsive two-column grid (side-by-side on `md:`, stacked on mobile):

| Column | Contents |
|--------|----------|
| Left | `ImageGallery` |
| Right | Model name (`<h1>`), `ColourPicker`, `StoragePicker`, `PriceBox`, CTA button |

**Renders:**
1. Back link: "← Tillbaka till alla telefoner" → `/phones` (FR-207, US-203)
2. Two-column grid: image gallery left, product info right
3. CTA button: "Välj denna telefon →" linking to checkout URL with colour/storage params (FR-208)

**Traces to:** US-201, US-202, US-203, FR-201–FR-208

---

### `ImageGallery.tsx` (Client Component — `"use client"`)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `images` | `{ url: string; alt: string }[]` | Ordered list of gallery images |

**State:**

| State | Type | Default |
|-------|------|---------|
| `activeIndex` | `number` | `0` |

**Behaviour:**
- Renders main image in a square container with `aspect-square`, centered, contained
- Below the main image: a thumbnail strip (only if `images.length > 1`)
- Clicking a thumbnail sets `activeIndex` → main image swaps immediately
- **When `images` prop changes** (e.g. colour switch), `activeIndex` resets to `0` via `useEffect` — ensures the gallery always shows the new colour's primary image (FR-203)
- Thumbnails use `ring-2 ring-primary` for the selected state
- Image load failure: `onError` handler falls back to `/phones/placeholder.svg` (NFR-402)
- All images use Next.js `<Image>` with `fill` + `sizes` for optimised loading

**Accessibility:**
- Each thumbnail button has `aria-label="Visa bild {n}: {alt}"` — screen reader friendly
- Focus ring via `focus:ring-2 focus:ring-primary/50`

**Traces to:** FR-202, FR-203, US-201 AC-2, Drop 2 AC #3

---

### `ColourPicker.tsx` (Server-compatible, stateless)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `colours` | `PhoneColour[]` | Available colour options |
| `activeColour` | `string` | Currently selected colour name |
| `onColourChange` | `(name: string) => void` | Callback on colour change |

**Behaviour:**
- **Multiple colours:** Renders circular swatches in a row. Selected swatch: `ring-2 ring-primary ring-offset-2` + checkmark overlay. Unselected: `ring-1 ring-gray-300`. Active colour name displayed as text label.
- **Single colour (edge case):** Renders one non-interactive swatch as pre-selected. No buttons. (US-202 edge case)
- **Checkmark contrast:** Uses luminance calculation (`getRelativeLuminance()`) to pick white or dark checkmark on the swatch background, ensuring visibility on both light and dark swatches.

**Accessibility:**
- Each swatch: `aria-label={colour.name}`, `title={colour.name}`
- Hover: `scale-110` transition
- Focus: `focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`

**Traces to:** FR-203, US-202 AC-1, Drop 2 AC #4

---

### `StoragePicker.tsx` (Server-compatible, stateless)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `variants` | `PhoneVariant[]` | Available storage variants |
| `activeStorage` | `string` | Currently selected storage capacity |
| `onStorageChange` | `(storage: string) => void` | Callback on storage change |

**Behaviour:**
- **Multiple variants:** Pill-shaped toggle buttons. Selected pill: `bg-primary text-white`. Unselected: `bg-white text-muted ring-1 ring-gray-200`.
- **Single variant (edge case):** Renders one non-interactive pill as pre-selected. (US-202 edge case)

**Accessibility:**
- Each pill: `aria-label="{storage} lagring"`
- Focus: `focus:ring-2 focus:ring-primary/50`

**Traces to:** FR-204, US-202 AC-2, Drop 2 AC #5

---

### `PriceBox.tsx` (Server-compatible, stateless)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `instalmentPrice` | `number` | Monthly instalment for selected variant |
| `totalCost` | `number` | Total device cost (instalment × 36) |
| `cheapestPlanPrice` | `number` | Cheapest available subscription price |

**Renders:**
1. **Monthly instalment:** `{instalmentPrice} kr/mån` — 3xl bold
2. **Period label:** `i {INSTALMENT_MONTHS} månader` — small muted
3. **Total cost:** `Totalt: {totalCost} kr` — small muted, formatted with `sv-SE` locale
4. **Subscription hint:** `+ abonnemang fr. {cheapestPlanPrice} kr/mån` — small, price in bold

**Accessibility:**
- Container has `aria-live="polite"` and `aria-atomic="true"` — screen readers announce the full price box when storage changes (NFR-304)

**Performance:**
- Pure component — re-renders only when props change. Price updates are instant (client-side state change, no network round-trip), satisfying NFR-103 (< 200 ms).

**Traces to:** FR-205, US-202 AC-3, BR-103, NFR-103, NFR-304, Drop 2 AC #6

---

### `SpecsTable.tsx` (Server Component)

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `specs` | `Record<string, string>` | Key-value specification pairs |

**Renders:**
- Section heading: "Specifikationer"
- Two-column table with alternating row backgrounds (`bg-white` / `bg-gray-50`)
- Wrapped in `<details>` element with `open` attribute: open by default on all viewports, collapsible via native `<details>`/`<summary>` toggle
- Mobile collapse indicator: `▼` chevron (visible only on mobile via `md:hidden`) that rotates on open (`group-open:rotate-180`)
- On desktop: `md:list-none` hides the default disclosure marker, `md:cursor-default` on summary

**Layout:**
- Labels in left column (1/3 width), values in right column (2/3 width)
- Rounded container with `ring-1 ring-gray-200`

**Note:** `SpecsTable` is rendered outside the `PhoneDetail` client boundary — it's a server-rendered component composed directly in the page. This is intentional: specs don't change with colour/storage selection, so they don't need client-side reactivity. The `<details open>` attribute ensures the specs are visible on initial load without requiring JavaScript.

**Traces to:** FR-206, US-201 AC-3, Drop 2 AC #2

---

## Business Rule Enforcement — Drop 2

| Rule | Enforcement | Location |
|------|-------------|----------|
| **BR-101** (instalment = ceil(price ÷ 36)) | `variant()` helper auto-computes via `calculateInstalment()` | `data/phones.ts` → `lib/pricing.ts` |
| **BR-103** (total = instalment × 36) | `variant()` helper auto-computes via `calculateTotalCost()` | `data/phones.ts` → `lib/pricing.ts` |
| **BR-102** (starting price = cheapest variant) | `PriceBox` receives the selected variant's price; listing card uses `getStartingPrice()` | `lib/catalogue.ts` |
| **BR-401** (only active models shown) | `page.tsx` calls `findBySlug()` then checks `phone.status !== "active"` → `notFound()` | `app/phones/[slug]/page.tsx` |

---

## URL Structure — Drop 2

| URL | Component | Route Type | Status |
|-----|-----------|------------|--------|
| `/phones/<slug>` | Phone detail page | Dynamic (`[slug]`) + SSG | ✅ Live |
| `/phones/<slug>/checkout` | Checkout page | — | 404 until Drop 3 |

### URL Parameters — CTA Link (FR-208)

The "Välj denna telefon →" CTA encodes the current selection in query parameters:

```
/phones/iphone-17-pro/checkout?colour=Titan%20Natur&storage=256%20GB
```

This preserves the visitor's configuration when they arrive at checkout (Drop 3 will read these params).

---

## State Management

### State Ownership

All interactive state for Drop 2 lives in a single component: `PhoneDetail.tsx`.

```
PhoneDetail (client, "use client")
├── state: activeColour
├── state: activeStorage
├── derived: currentColour      (useMemo)
├── derived: currentVariant     (useMemo)
├── derived: galleryImages      (useMemo)
├── derived: checkoutUrl        (variable)
│
├── ImageGallery (client)
│   └── state: activeIndex      (local — thumbnail selection)
│
├── ColourPicker (stateless)     ← receives activeColour + callback
├── StoragePicker (stateless)    ← receives activeStorage + callback
├── PriceBox (stateless)         ← receives derived prices
└── CTA Button (stateless)       ← receives checkoutUrl
```

### Why No Global State / Context

- Only two pieces of state exist: colour and storage
- Both are scoped to a single page visit — no cross-page persistence needed
- All derived values (`currentVariant`, `galleryImages`, etc.) are computed via `useMemo`
- React Context or Zustand would add unnecessary abstraction for two `useState` hooks

---

## Responsive Layout

### Detail Page — `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12`

| Breakpoint | Layout |
|------------|--------|
| < 768px | Single column — image gallery stacked above product info. Specs table collapsible. |
| ≥ 768px | Two columns — image gallery left (50%), product info right (50%). Specs table open by default. |

Per ux.md responsive behaviour:

| Element | Mobile (< 768px) | Desktop (≥ 768px) |
|---------|-------------------|---------------------|
| Image gallery | Full width, square aspect ratio | Left column, square aspect ratio |
| Product info | Full width, stacked below image | Right column |
| Specs table | Open by default, collapsible (`<details open>`) | Open by default (`<details open>`) |
| CTA button | Full width (`w-full`) | Auto width (`w-auto`) |
| Back link | Full width above content | Full width above content |

---

## Accessibility — Drop 2

| Element | Implementation | Traces to |
|---------|---------------|-----------|
| **Back link** | `<Link>` with visible arrow icon, standard link semantics | FR-207 |
| **Image gallery thumbnails** | `<button>` with `aria-label="Visa bild {n}: {alt}"`, focus ring | FR-202, NFR-302 |
| **Colour swatches** | `<button>` per swatch with `aria-label={colour.name}`, `title={colour.name}`, focus ring with offset | FR-203, NFR-302 |
| **Colour checkmark contrast** | `getRelativeLuminance()` ensures checkmark is visible on both light and dark swatches | NFR-301 |
| **Storage pills** | `<button>` with `aria-label="{storage} lagring"`, focus ring | FR-204, NFR-302 |
| **Price box** | `aria-live="polite"` + `aria-atomic="true"` — announces full price update on storage change | NFR-304 |
| **Product images** | `alt="{phone.name} i {colour.name}, {angle}"` — descriptive per NFR-303 | NFR-303 |
| **Specs table** | `<details open>` / `<summary>` — native keyboard-accessible, open by default, collapsible on all viewports. Mobile chevron indicator via `md:hidden` | NFR-302 |
| **Image fallback** | `onError` handler loads `/phones/placeholder.svg` — prevents broken image state | NFR-402 |
| **Language** | All UI text in Swedish. `lang="sv"` on `<html>` (set in `layout.tsx`) | NFR-602 |

---

## SEO — Drop 2

### Dynamic Metadata

Each phone model gets unique metadata generated server-side via `generateMetadata()`:

```typescript
{
  title: "iPhone 17 Pro – Köp med Vimla",
  description: "Köp iPhone 17 Pro med 36 månaders delbetalning från 400 kr/mån. Bundla med ett Vimla-abonnemang."
}
```

### Static Site Generation

`generateStaticParams()` pre-renders all active phone slugs at build time:

```typescript
export async function generateStaticParams() {
  const active = getActivePhones(phones);
  return active.map((phone) => ({ slug: phone.slug }));
}
```

This ensures:
- All 6 active phone pages are pre-rendered as static HTML at build time
- No client-side data fetching on page load
- Fast Time to First Contentful Paint (NFR-102: p95 ≤ 2 000 ms)

---

## Performance Considerations

| Concern | Approach | Target |
|---------|----------|--------|
| **Page load** | SSG via `generateStaticParams()` — HTML pre-rendered at build time | NFR-102: p95 ≤ 2 s |
| **Image loading** | Main image: `priority` flag for LCP. Thumbnails: default lazy loading. Next.js `<Image>` with `sizes` for responsive optimisation | < 2 s LCP |
| **Price update speed** | Client-side state change → `useMemo` recalculation → React re-render. No network round-trip. | NFR-103: ≤ 200 ms |
| **Bundle size** | Only `PhoneDetail.tsx` and `ImageGallery.tsx` are client components. `SpecsTable.tsx` is server-rendered. | Minimal client JS |
| **Image fallback** | `onError` handler prevents layout breakage on 404 images | NFR-402 |

---

## Error Handling

| Scenario | Handling | Traces to |
|----------|----------|-----------|
| **Invalid slug** (e.g. `/phones/nonexistent`) | `findBySlug()` returns `undefined` → `notFound()` → renders `not-found.tsx` | US-201 edge case, Drop 2 AC #8 |
| **Inactive model** (slug exists but `status !== "active"`) | Same as invalid — `notFound()` prevents access to deactivated phones | BR-401 |
| **Image load failure** | `onError` handler on `<Image>` swaps to `/phones/placeholder.svg` | NFR-402 |
| **Empty colours array** | `PhoneDetail` returns `null` if `currentColour` is falsy (guard) | Defensive |
| **Empty variants array** | `PhoneDetail` returns `null` if `currentVariant` is falsy (guard) | Defensive |
| **CTA leads to 404** | "Välj denna telefon →" links to `/phones/<slug>/checkout` which does not exist until Drop 3 | Expected — documented in slicing.md |

---

## Test Coverage — Drop 2

### Unit Tests

| Test | File | What it verifies |
|------|------|-----------------|
| `calculateInstalment()` | `lib/pricing.test.ts` | BR-101: ceil(price ÷ 36) — rounds up, handles edge cases |
| `calculateTotalCost()` | `lib/pricing.test.ts` | BR-103: instalment × 36, including round-up case where total > retail |
| `INSTALMENT_MONTHS` | `lib/pricing.test.ts` | BR-301: fixed at 36 |

### Manual Test Cases (Drop 2)

Per the project's test case format, the following scenarios should be verified:

| TC | Scenario | Traces to |
|----|----------|-----------|
| TC-D2-01 | Clicking a phone card on listing navigates to `/phones/<slug>` | US-201, Drop 2 AC #1 |
| TC-D2-02 | Detail page shows: image gallery, model name, colour swatches, storage pills, price box, specs table | US-201, FR-201, Drop 2 AC #2 |
| TC-D2-03 | Clicking a thumbnail updates the main image | FR-202, Drop 2 AC #3 |
| TC-D2-04 | Clicking a colour swatch updates the main image and colour name label | FR-203, US-202 AC-1, Drop 2 AC #4 |
| TC-D2-05 | Clicking a storage pill updates the price box within 200 ms | FR-204, NFR-103, Drop 2 AC #5 |
| TC-D2-06 | Price box shows: monthly instalment, "i 36 månader", total device cost, subscription starting price | FR-205, BR-103, Drop 2 AC #6 |
| TC-D2-07 | "← Tillbaka till alla telefoner" navigates to `/phones` | FR-207, US-203, Drop 2 AC #7 |
| TC-D2-08 | Invalid phone slug shows 404 page with link back to `/phones` | US-201 edge case, Drop 2 AC #8 |
| TC-D2-09 | Single-colour model shows pre-selected swatch, no other swatches | US-202 edge case |
| TC-D2-10 | Single-storage model shows pre-selected pill, no other pills | US-202 edge case |
| TC-D2-11 | Specs table contains at minimum: Skärm, Chip, Kamera, Batteri, 5G | FR-206, US-201 AC-3 |
| TC-D2-12 | Price box has `aria-live="polite"` — screen reader announces price changes | NFR-304 |
| TC-D2-13 | Colour swatches are keyboard accessible (Tab + Enter/Space) | NFR-302 |
| TC-D2-14 | Storage pills are keyboard accessible (Tab + Enter/Space) | NFR-302 |
| TC-D2-15 | Image load failure shows placeholder (no broken image icon) | NFR-402 |
| TC-D2-16 | Responsive: detail page stacks vertically on mobile (< 768px) | ux.md responsive |
| TC-D2-17 | Responsive: detail page side-by-side on desktop (≥ 768px) | ux.md responsive |
| TC-D2-18 | Specs table open by default on all viewports, collapsible on mobile (chevron visible) | ux.md responsive |
| TC-D2-19 | CTA "Välj denna telefon →" links to checkout URL with colour + storage params | FR-208 |
| TC-D2-20 | Dynamic page title matches phone model name | SEO |

---

## Traceability Matrix — Drop 2

### Requirements → Components

| Requirement | Component(s) |
|-------------|-------------|
| FR-201 (detail page content) | `[slug]/page.tsx`, `PhoneDetail.tsx`, `SpecsTable.tsx` |
| FR-202 (image gallery + thumbnails) | `ImageGallery.tsx` |
| FR-203 (colour picker) | `ColourPicker.tsx`, `PhoneDetail.tsx` (state) |
| FR-204 (storage picker) | `StoragePicker.tsx`, `PhoneDetail.tsx` (state) |
| FR-205 (price box) | `PriceBox.tsx` |
| FR-206 (specs table) | `SpecsTable.tsx` |
| FR-207 (back link) | `PhoneDetail.tsx` (inline `<Link>`) |
| FR-208 (CTA to checkout) | `PhoneDetail.tsx` (CTA button with `checkoutUrl`) |
| BR-101 (instalment calc) | `lib/pricing.ts` → `data/phones.ts` `variant()` helper |
| BR-103 (total cost calc) | `lib/pricing.ts` → `data/phones.ts` `variant()` helper → `PriceBox.tsx` |
| BR-401 (active-only display) | `[slug]/page.tsx` (status guard) |
| NFR-103 (price update ≤ 200 ms) | `PhoneDetail.tsx` (client-side state, `useMemo`) |
| NFR-304 (aria-live price) | `PriceBox.tsx` (`aria-live="polite"`) |
| NFR-402 (image fallback) | `ImageGallery.tsx` (`onError` handler) |

### User Stories → Components

| Story | Component(s) |
|-------|-------------|
| US-201 (view phone details) | `[slug]/page.tsx`, `PhoneDetail.tsx`, `SpecsTable.tsx`, `not-found.tsx` |
| US-202 (select colour + storage) | `PhoneDetail.tsx`, `ColourPicker.tsx`, `StoragePicker.tsx`, `PriceBox.tsx` |
| US-203 (navigate back to listing) | `PhoneDetail.tsx` (back link) |

### Drop 2 AC → Test Cases

| Drop 2 AC | Test Cases |
|-----------|------------|
| #1 Phone card click → detail page | TC-D2-01 |
| #2 Detail page shows all elements | TC-D2-02, TC-D2-11 |
| #3 Thumbnail updates main image | TC-D2-03 |
| #4 Colour swatch updates image + label | TC-D2-04 |
| #5 Storage pill updates price box ≤ 200 ms | TC-D2-05 |
| #6 Price box shows four values | TC-D2-06 |
| #7 Back link navigates to `/phones` | TC-D2-07 |
| #8 Invalid slug → 404 with back link | TC-D2-08 |
| #9 Page loads within 2 seconds | (Performance test — Lighthouse) |

---

## File Inventory — Complete Drop 2 Source

| File | Type | Lines | Purpose |
|------|------|-------|---------|
| `app/phones/[slug]/page.tsx` | Server Component | 82 | Page shell: routing, metadata, SSG, data loading, 404 guard |
| `app/phones/[slug]/not-found.tsx` | Server Component | 40 | Custom 404 with back link |
| `components/sections/PhoneDetail.tsx` | Client Component | 124 | Interactive section: state management, composition |
| `components/ui/ImageGallery.tsx` | Client Component | 82 | Main image + thumbnail strip with colour-switch reset |
| `components/ui/ColourPicker.tsx` | Presentational | 98 | Colour swatches with contrast-aware checkmark |
| `components/ui/StoragePicker.tsx` | Presentational | 64 | Storage pill toggles |
| `components/ui/PriceBox.tsx` | Presentational | 51 | Price breakdown with aria-live |
| `components/ui/SpecsTable.tsx` | Server Component | 47 | Collapsible specs table |
| `lib/catalogue.ts` | Utility | 108 | `findBySlug()` added for Drop 2 |
| `lib/pricing.ts` | Utility | 27 | `calculateTotalCost()` added for Drop 2 |
| `lib/pricing.test.ts` | Test | 76 | Unit tests for pricing utilities |
| `data/phones.ts` | Data | 228 | Updated interfaces + enriched seed data |

---

## What Drop 2 Does NOT Include

| Excluded | Reason | When |
|----------|--------|------|
| Checkout page at `/phones/<slug>/checkout` | Drop 3 scope | CTA links to 404 |
| Real product photography | Requires commercial team + Drop 6 catalogue population | Drop 6 |
| Multi-angle images per colour (3–5) | Requires real photography | Drop 6 |
| Phone comparison feature | HLR-9, Could priority | Phase 2 |
| Accessibility audit (axe-core) | Comprehensive audit is Drop 6 | Drop 6 |
| Back navigation state preservation | US-203 AC-2: "previously applied filters and sort order preserved" — partially handled by browser history | Drop 3+ refinement |
