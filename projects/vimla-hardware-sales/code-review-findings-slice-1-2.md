# Code Review Findings — Slice 1 & 2

> **Date:** 2026-04-08
> **Reviewers:** PM · Lead Developer · Lead Architect
> **Scope:** All code delivered in Drop 1 (Static Catalogue) and Drop 2 (Phone Detail & Configuration)
> **Reviewed against:** `requirements.md`, `business-rules.md`, `user-stories.md`, `ux.md`, `design.md`, `definition-of-done.md`, `copilot-instructions.md`

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 2 |
| 🟠 Major | 7 |
| 🟡 Minor | 6 |
| 🔵 Improvement | 5 |
| **Total** | **20** |

---

## Findings Index

| ID | Sev | Reviewer | Finding | File(s) | Spec Ref | Fixed |
|----|-----|----------|---------|---------|----------|-------|
| F-01 | 🔴 | Lead Dev | Zero `next/link` usage — all navigation uses raw `<a>`, losing client-side routing, prefetching, and SPA transitions | All components with `href` | copilot-instructions (Next.js App Router) | ✅ |
| F-02 | 🔴 | Lead Dev | Zero `next/image` usage — all `<img>` tags miss image optimisation (WebP/AVIF, responsive sizing, blur placeholder) | `PhoneCard`, `ImageGallery` | NFR-101, NFR-102 | ✅ |
| F-03 | 🟠 | PM | Back link does not preserve filter/sort state — `<a href="/phones">` resets all client state to defaults | `PhoneDetail.tsx` | FR-207, US-203 AC-2, Drop 2 AC-7 | ✅ |
| F-04 | 🟠 | PM | Browser back button does not preserve filter state — `PhoneListing` stores filter/sort in `useState` with no URL sync | `PhoneListing.tsx` | US-102 edge case | ✅ |
| F-05 | 🟠 | Lead Dev | No tests exist — zero unit, integration, or component tests for any Drop 1/2 code | Entire codebase | DoD per-story: "acceptance criteria verified" | ✅ |
| F-06 | 🟠 | Lead Dev | Image gallery limited to 2 images — `PhoneColour` has single `imageUrl`, not an array; FR-202 specifies 3–5 images | `phones.ts`, `PhoneDetail.tsx`, `ImageGallery.tsx` | FR-202 | ⬜ P2 |
| F-07 | 🟠 | Architect | Pricing logic in client bundle — `calculateTotalCost` imported inside a `"use client"` component, contradicting design.md | `pricing.ts`, `PhoneDetail.tsx` | design.md (server-side computation) | ✅ |
| F-08 | 🟠 | Lead Dev | No image error fallback — broken image URL shows browser broken-image icon; no `onError` handler | `PhoneCard.tsx`, `ImageGallery.tsx` | NFR-402 | ✅ |
| F-09 | 🟠 | Architect | Full phone array serialised to client — entire `Phone[]` (specs, colours, variants) passed to client component; 50-phone scenario hits NFR-501 | `phones/page.tsx`, `PhoneListing.tsx` | NFR-501 | ⬜ P2 |
| F-10 | 🟡 | Lead Dev | Hardcoded light-colour detection in `ColourPicker` — only `#F5F5F0` and `#C0C0C0` trigger dark checkmark; any new light colour shows invisible white tick | `ColourPicker.tsx` | ux.md (colour swatch states) | ✅ |
| F-11 | 🟡 | Lead Dev | `Button.tsx` type mismatch — extends `ButtonHTMLAttributes<HTMLButtonElement>` but renders `<a>` when `href` is set | `Button.tsx` | TypeScript strict | ✅ |
| F-12 | 🟡 | Lead Dev | `ImageGallery` uses `key={index}` on thumbnails — unstable key causes React to reuse stale DOM nodes when colour changes | `ImageGallery.tsx` | React best practices | ✅ |
| F-13 | 🟡 | PM | Colour swatch hover tooltip is only `title` attribute — ux.md specifies a custom tooltip; native `title` has 1 s delay and browser styling | `ColourPicker.tsx` | ux.md (interaction states) | ⬜ P3 |
| F-14 | 🟡 | Lead Dev | `SpecsTable` uses `md:open` on `<details>` — `open` is an HTML boolean attribute, not a CSS class; non-standard pattern with inconsistent browser support | `SpecsTable.tsx` | ux.md (collapsible on mobile) | ⬜ P3 |
| F-15 | 🟡 | PM | Listing grid breakpoints don't fully match ux.md 4-tier model — `md:grid-cols-2` merges the 768–1023 and 1024–1279 tiers | `PhoneListing.tsx` | ux.md (responsive behaviour) | ⬜ P3 |
| F-16 | 🔵 | Architect | No shared layout for `/phones` routes — `<Navbar />` and `<Footer />` duplicated in both `phones/page.tsx` and `phones/[slug]/page.tsx` | `phones/page.tsx`, `phones/[slug]/page.tsx` | Next.js App Router conventions | ⬜ P3 |
| F-17 | 🔵 | Architect | No SEO artefacts — no `robots.txt`, `sitemap.xml`, or JSON-LD `Product` schema on catalogue/detail pages | N/A | SEO best practice for commerce | ⬜ P3 |
| F-18 | 🔵 | Architect | No Open Graph metadata — `generateMetadata` sets `title`/`description` but no `openGraph` or `twitter` fields | `phones/page.tsx`, `phones/[slug]/page.tsx` | SEO / social sharing | ⬜ P3 |
| F-19 | 🔵 | Lead Dev | No `loading.tsx` or `error.tsx` for `/phones` routes — slow loads show nothing, uncaught errors show default Next.js error page | N/A | Next.js App Router conventions | ⬜ P3 |
| F-20 | 🔵 | PM | Incomplete WAI-ARIA Tabs pattern — `BrandFilter` uses `role="tablist"`/`role="tab"` but is missing `role="tabpanel"`, `aria-controls`, and arrow-key navigation | `BrandFilter.tsx` | NFR-302, ux.md (accessibility) | ⬜ P3 |

---

## Detailed Findings

### 🔴 Critical

#### F-01: Zero `next/link` usage across all components ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
Every internal link in the codebase rendered a raw `<a>` tag instead of Next.js's `<Link>` component. This caused:
- Every navigation to be a full page reload (no client-side SPA transition)
- No automatic route prefetching on viewport/hover
- No preservation of React client state across navigations
- Measurable performance degradation on every user interaction

**Files affected:** `Navbar.tsx`, `PhoneCard.tsx`, `PhoneDetail.tsx`, `Button.tsx`, `Footer.tsx`, `not-found.tsx`

**Fix applied:** All internal `<a href>` replaced with `import Link from "next/link"`. `Button.tsx` now uses `<Link>` when `href` is an internal path.

---

#### F-02: Zero `next/image` usage — raw `<img>` everywhere ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
All product images used plain `<img>` tags, missing:
- Automatic WebP/AVIF conversion
- Responsive `srcSet` generation
- Built-in lazy loading with blur placeholder
- CLS prevention via width/height enforcement

Without it, Lighthouse performance scores would be significantly lower, threatening NFR-101 and NFR-102 (2 s FCP target).

**Files affected:** `PhoneCard.tsx`, `ImageGallery.tsx`

**Fix applied:** `<img>` replaced with `next/image` `<Image>`. Main gallery image uses `priority` prop (above the fold). Card images use default lazy loading with `sizes` prop for responsive hinting.

---

### 🟠 Major

#### F-03: Back link does not preserve listing filter/sort state ✅ Fixed

**Reviewer:** PM

**Description:**
`PhoneDetail.tsx` rendered the back link as `<a href="/phones">`, causing a full page reload which reset `PhoneListing`'s `useState` for `brand` and `sort` to defaults.

Drop 2 AC-7 states: *"← Tillbaka till alla telefoner navigates to /phones with filters preserved."* This AC was **not met**.

**Spec reference:** FR-207, US-203 AC-2, Drop 2 AC-7

**Fix applied:** Back link replaced with `<Link href="/phones">`. Filter/sort state is now persisted to URL search params (see F-04), so navigating back restores state automatically.

---

#### F-04: Browser back button does not restore filter state ✅ Fixed

**Reviewer:** PM

**Description:**
US-102 edge case: *"the previously selected filter is restored when the user presses back."* `PhoneListing` used `useState` with no URL synchronisation — pressing back after visiting a detail page reset all filters.

**Spec reference:** US-102 edge case

**Fix applied:** `PhoneListing` now reads `brand` and `sort` from `useSearchParams()` and writes changes via `router.replace()` with `scroll: false`. Default values are omitted from the URL to keep it clean. State is now bookmark-safe, back-button-safe, and shareable. The listing page wraps `PhoneListing` in `<Suspense>` as required by Next.js for `useSearchParams`.

---

#### F-05: No tests exist for any Drop 1 or Drop 2 code ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
Zero test files existed. The per-story DoD requires *"all acceptance criteria verified (manually or by automated test)"*. Core calculation logic (`calculateInstalment`, `calculateTotalCost`, `sortPhones`, etc.) is pure and trivially testable.

**Spec reference:** `definition-of-done.md` (per-story DoD), BR-101, BR-103

**Fix applied:**
- Vitest added to `devDependencies`
- `vitest.config.ts` created with `@` path alias matching `tsconfig.json`
- `test` and `test:watch` scripts added to `package.json`
- `src/lib/pricing.test.ts` — 9 tests covering BR-101, BR-103, BR-301
- `src/lib/catalogue.test.ts` — 25 tests covering `findBySlug`, `getActivePhones`, `filterByBrand`, `getStartingPrice`, `sortPhones`, `getLowestInstalmentPrice` with edge cases (empty arrays, tiebreakers, immutability)
- **All 34 tests pass**

---

#### F-06: Image gallery limited to 2 images per colour ⬜ Priority 2

**Reviewer:** Lead Developer

**Description:**
FR-202 specifies *"thumbnail strip of 3–5 images."* `PhoneColour` has a single `imageUrl: string` field, so `PhoneDetail.tsx` can only ever construct 2 gallery images (colour image + model default). The `ImageGallery` component supports N images, but the data model cannot supply more than 2.

**Spec reference:** FR-202

**Recommendation:** Extend `PhoneColour` to `imageUrls: string[]` (3–5 per colour). The gallery component needs no changes.

---

#### F-07: Pricing logic ships in the client JavaScript bundle ✅ Fixed

**Reviewer:** Lead Architect

**Description:**
`design.md` states: *"Server-side computation — no client-side financial logic."* `PhoneDetail.tsx` (`"use client"`) imported `calculateTotalCost` directly, bundling pricing logic client-side.

**Spec reference:** `design.md` (technology stack)

**Fix applied:** `totalCost: number` added to `PhoneVariant` interface and pre-computed in the `variant()` helper in `phones.ts` (build-time, server-side). `PhoneDetail` now reads `currentVariant.totalCost` directly — no pricing import in any client component.

---

#### F-08: No image error fallback ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
NFR-402 requires a placeholder image when product images fail to load. Neither `PhoneCard` nor `ImageGallery` had an `onError` handler.

**Spec reference:** NFR-402

**Fix applied:** `onError` handler added to all `<Image>` elements, swapping `src` to `/phones/placeholder.svg` on failure (placeholder SVG already existed in `public/phones/`).

---

#### F-09: Full phone array serialised to client component ⬜ Priority 2

**Reviewer:** Lead Architect

**Description:**
`phones/page.tsx` passes the entire `Phone[]` (all specs, colours, variants) to `PhoneListing`, a client component. This is serialised as the RSC payload. With 6 phones the payload is fine, but NFR-501 targets 50 phones, at which point this becomes 50–100 KB of JSON.

**Spec reference:** NFR-501

**Recommendation:** Project a minimal `PhoneListingItem` type server-side (slug, name, brand, imageUrl, sortOrder, startingPrice) and map before passing to the client component.

---

### 🟡 Minor

#### F-10: Hardcoded light-colour detection in `ColourPicker` ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
Checkmark contrast was determined by `hex === "#F5F5F0" || hex === "#C0C0C0"`. Any new light colour (e.g. `#FFE4B5`) would render an invisible white checkmark on a light swatch.

**Fix applied:** Replaced with a proper WCAG relative-luminance formula. `getRelativeLuminance(hex)` calculates `0.2126R + 0.7152G + 0.0722B` from the hex value; values above 0.5 use a dark checkmark, below use white. This handles any future colour automatically.

---

#### F-11: `Button.tsx` type mismatch — `ButtonHTMLAttributes` applied to `<a>` ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
`Button` extended `ButtonHTMLAttributes<HTMLButtonElement>` but rendered an `<a>` when `href` was set, spreading invalid props (e.g. `type`, `disabled`, `form`) onto an anchor element.

**Fix applied:** Replaced with a discriminated union: `ButtonAsButton` (no `href`) | `ButtonAsLink` (`href: string`). TypeScript now enforces the correct attribute set for each rendering path. Link variant uses `next/link` `<Link>` for internal paths (detected by leading `/` or `#`).

---

#### F-12: Unstable `key={index}` in `ImageGallery` thumbnails ✅ Fixed

**Reviewer:** Lead Developer

**Description:**
Array index keys cause React to reuse stale DOM nodes when the image list changes on colour selection, potentially showing the wrong image or misfiring focus.

**Fix applied:** Key changed to `key={img.url}` — a stable, unique identifier per image.

---

#### F-13: Colour swatch hover tooltip is only `title` attribute ⬜ Priority 3

**Reviewer:** PM

**Description:**
ux.md specifies *"Hover: tooltip with colour name."* The implementation uses `title={colour.name}`, which browsers render with a ~1 s delay and plain OS-styled text. This is functional but doesn't match the intended UX.

**Recommendation:** Implement a lightweight CSS-only tooltip (e.g. `data-tooltip` + `::after` pseudo-element) or a small Tooltip component using Radix UI or Floating UI.

---

#### F-14: `SpecsTable` `md:open` on `<details>` — non-standard pattern ⬜ Priority 3

**Reviewer:** Lead Developer

**Description:**
`<details className="md:open">` attempts to keep the element open on desktop via a CSS class. `open` is an HTML boolean attribute that controls user-toggled state, not a CSS property. The behaviour is inconsistent across browsers.

**Recommendation:** Replace with a client component that initialises `isOpen` state from `useMediaQuery("(min-width: 768px)")`, or keep `<details>` always open and add a mobile-only "Visa/Göm" toggle using `useState`.

---

#### F-15: Listing grid breakpoints don't fully match ux.md 4-tier model ⬜ Priority 3

**Reviewer:** PM

**Description:**
ux.md defines 4 responsive tiers (≥1280, 1024–1279, 768–1023, <768). The listing uses 3 Tailwind tiers: `xl:grid-cols-3` / `md:grid-cols-2` / 1-col. The 1024–1279 tier is merged with 768–1023. Both show 2 columns so the listing result is visually acceptable, but the detail page layout at 1024–1279px differs from spec ("slightly narrower side-by-side" vs fully stacked).

**Recommendation:** Add `lg:grid-cols-2` to the detail page product section to reinstate the intermediate breakpoint.

---

### 🔵 Improvements

#### F-16: No shared layout for `/phones` routes ⬜ Priority 3

**Reviewer:** Lead Architect

**Description:**
`<Navbar />` and `<Footer />` are manually composed in both `phones/page.tsx` and `phones/[slug]/page.tsx`. A `phones/layout.tsx` would eliminate duplication and ensure consistent page chrome across the route segment.

**Recommendation:** Create `app/phones/layout.tsx` rendering `<Navbar>{children}<Footer />`.

---

#### F-17: No SEO artefacts for commerce pages ⬜ Priority 3

**Reviewer:** Lead Architect

**Description:**
Product detail pages should include JSON-LD structured data (`Product` schema with `offers`, `brand`, `image`) for Google rich results. No `robots.txt` or `sitemap.xml` is generated.

**Recommendation:** Add `<script type="application/ld+json">` in `phones/[slug]/page.tsx`, and create `app/robots.ts` + `app/sitemap.ts` using Next.js metadata conventions.

---

#### F-18: No Open Graph metadata on phone pages ⬜ Priority 3

**Reviewer:** Lead Architect

**Description:**
Sharing a phone detail URL on social media produces no preview card. `generateMetadata` sets `title` and `description` but no `openGraph` or `twitter` fields.

**Recommendation:** Add `openGraph: { title, description, images: [{ url: phone.imageUrl }] }` to `generateMetadata` in both `phones/page.tsx` and `phones/[slug]/page.tsx`.

---

#### F-19: No `loading.tsx` or `error.tsx` for `/phones` routes ⬜ Priority 3

**Reviewer:** Lead Developer

**Description:**
Next.js App Router supports `loading.tsx` (Suspense skeleton) and `error.tsx` (error boundary). Neither exists — slow builds show a blank page during streaming, and uncaught errors display the default Next.js error screen.

**Recommendation:** Add `phones/loading.tsx` with a skeleton card grid, and `phones/error.tsx` with "Något gick fel, försök igen" and a retry button.

---

#### F-20: Incomplete WAI-ARIA Tabs pattern on `BrandFilter` ⬜ Priority 3

**Reviewer:** PM

**Description:**
`BrandFilter` uses `role="tablist"` and `role="tab"` but is missing `role="tabpanel"` on the results area, `aria-controls` linking each tab to its panel, and arrow-key navigation between tabs. Screen readers will announce incomplete tab structure.

**Recommendation:** Either complete the full WAI-ARIA Tabs pattern (tabpanel, aria-controls, arrow keys via `onKeyDown`), or simplify to `role="radiogroup"` + `role="radio"` which better matches the single-select filter semantics without requiring a panel association.

---

## Action Items — Prioritised

### Priority 1 — Applied in this review session ✅

| Finding | Change | Files |
|---------|--------|-------|
| F-01, F-11 | All internal `<a>` → `<Link>`; `Button` discriminated union | `Button.tsx`, `Navbar.tsx`, `Footer.tsx`, `PhoneCard.tsx`, `PhoneDetail.tsx` |
| F-02, F-08 | All `<img>` → `<Image>`; `onError` → `placeholder.svg` | `PhoneCard.tsx`, `ImageGallery.tsx` |
| F-03, F-04 | Filter/sort state synced to URL search params via `useSearchParams` + `router.replace` | `PhoneListing.tsx`, `phones/page.tsx` |
| F-05 | Vitest configured; 34 unit tests for `pricing.ts` and `catalogue.ts` | `pricing.test.ts`, `catalogue.test.ts`, `vitest.config.ts`, `package.json` |
| F-07 | `totalCost` pre-computed in `phones.ts`; client `pricing.ts` import removed from `PhoneDetail` | `phones.ts`, `PhoneDetail.tsx` |
| F-10 | WCAG luminance formula replaces hardcoded hex check in `ColourPicker` | `ColourPicker.tsx` |
| F-12 | Stable `key={img.url}` in `ImageGallery` | `ImageGallery.tsx` |

### Priority 2 — During Drop 3

| Finding | Action | Effort |
|---------|--------|--------|
| F-06 | Extend `PhoneColour.imageUrls` to `string[]` for multi-angle gallery support | M |
| F-09 | Project minimal `PhoneListingItem` type server-side; strip specs/colours/variants from listing payload | S |

### Priority 3 — During Drop 6 (hardening)

| Finding | Action | Effort |
|---------|--------|--------|
| F-16 | Create `phones/layout.tsx` shared layout | S |
| F-17 | Add JSON-LD Product schema, `robots.ts`, `sitemap.ts` | M |
| F-18 | Add Open Graph metadata to phone pages | S |
| F-19 | Add `phones/loading.tsx` skeleton + `phones/error.tsx` | S |
| F-20 | Fix BrandFilter: complete WAI-ARIA Tabs or switch to `radiogroup` | S |
| F-13 | Custom tooltip for colour swatches | S |
| F-14 | Fix `SpecsTable` open/close with proper client state | S |
| F-15 | Reinstate 1024–1279px `lg:` breakpoint on detail page product section | S |

**Effort legend:** S = small (< 1 hour), M = medium (1–4 hours)

---

## Sign-off

| Reviewer | Status | Date |
|----------|--------|------|
| PM | ⬜ Pending | |
| Lead Developer | ⬜ Pending | |
| Lead Architect | ⬜ Pending | |
