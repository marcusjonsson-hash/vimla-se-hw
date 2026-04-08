# Test Cases — Vimla Hardware Sales

> **State:** Build
> **Last updated:** 2026-04-08
> **Active drop:** Drop 1 — Static Catalogue

---

## Quality Standard

Every test case satisfies:

| Check | Rule |
|-------|------|
| **Traceable** | Every TC traces to ≥ 1 acceptance criterion in a user story |
| **Atomic** | One test case verifies one behaviour |
| **Deterministic** | Same input always produces same result |
| **Independent** | No TC depends on another TC's side-effects |
| **Complete** | Preconditions, steps, and expected result are explicit |

---

## Drop 1 Test Cases

### TC-001: "Telefoner" link visible in site header

*Traces to: US-001 AC-1, FR-001, Drop 1 AC #1*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on any page of vimla.se (e.g. homepage `/`) |
| **Steps** | 1. Load the page. 2. Inspect the site header navigation. |
| **Expected result** | A "Telefoner" link is visible alongside existing nav items (Mobil, Om Vimla, Vanliga frågor). The link is present on desktop and mobile views. |
| **Status** | ⬜ Not Run |

---

### TC-002: "Telefoner" link navigates to `/phones`

*Traces to: US-001 AC-2, FR-001, Drop 1 AC #2*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on any page of vimla.se and the "Telefoner" link is visible |
| **Steps** | 1. Click the "Telefoner" navigation link. |
| **Expected result** | The browser navigates to `/phones`. The URL in the address bar is `/phones`. |
| **Status** | ⬜ Not Run |

---

### TC-003: `/phones` hero section displays title and instalment subtitle

*Traces to: US-001 AC-3, FR-002, Drop 1 AC #3*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor navigates to `/phones` |
| **Steps** | 1. Load `/phones`. 2. Inspect the area above the phone grid. |
| **Expected result** | A hero section is displayed containing: (a) page title "Telefoner", (b) a subtitle communicating the instalment value proposition with a starting price in the format "Köp mobil med Vimla — betala från XXX kr/mån med 36 månaders delbetalning". The "XXX" value equals the lowest monthly instalment in the active catalogue. |
| **Status** | ⬜ Not Run |

---

### TC-004: Hero subtitle starting price updates dynamically

*Traces to: US-001 AC-4, BR-102*

| Field | Value |
|-------|-------|
| **Precondition** | The catalogue contains ≥ 2 phone models with different starting instalment prices |
| **Steps** | 1. Note the current lowest instalment price. 2. Add a cheaper phone model to the catalogue (or change the cheapest variant price). 3. Reload `/phones`. |
| **Expected result** | The hero subtitle now displays the new lowest instalment price. |
| **Status** | ⬜ Not Run |

---

### TC-005: Phone cards display correctly with required information

*Traces to: US-101 AC-1, US-101 AC-2, FR-101, FR-102, Drop 1 AC #4*

| Field | Value |
|-------|-------|
| **Precondition** | The catalogue contains ≥ 3 phone models with status "active" |
| **Steps** | 1. Navigate to `/phones`. 2. Inspect the phone card grid. |
| **Expected result** | All active phone models are displayed as cards. Each card shows: (a) one product image, (b) model name, (c) starting monthly instalment price in format "fr. XXX kr/mån". At least 3 cards are visible. |
| **Status** | ⬜ Not Run |

---

### TC-006: Phone card instalment price is calculated correctly

*Traces to: BR-101, BR-102, FR-102*

| Field | Value |
|-------|-------|
| **Precondition** | The catalogue contains a phone with cheapest storage variant retail price = 14 000 SEK |
| **Steps** | 1. Navigate to `/phones`. 2. Find the card for the test phone. 3. Read the "fr. XXX kr/mån" price. |
| **Expected result** | The displayed price = ceil(14 000 ÷ 36) = ceil(388.89) = **389 kr/mån**. Displayed as "fr. 389 kr/mån". |
| **Status** | ⬜ Not Run |

---

### TC-007: "Välj →" button navigates to phone detail page

*Traces to: US-101 AC-3, FR-103*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` and phone cards are displayed |
| **Steps** | 1. Click the "Välj →" button on a phone card. |
| **Expected result** | Browser navigates to `/phones/<phone-slug>` where `<phone-slug>` matches the selected phone's slug. (In Drop 1, this page returns 404 — that is expected.) |
| **Status** | ⬜ Not Run |

---

### TC-008: Brand filter — "iPhone" tab shows only iPhones

*Traces to: US-102 AC-1, FR-104, Drop 1 AC #5*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains both iPhone and Samsung models. Visitor is on `/phones` with "Alla" active (default). |
| **Steps** | 1. Click the "iPhone" filter tab. |
| **Expected result** | Only iPhone models are displayed. Samsung models are hidden. The "iPhone" tab appears selected (filled with brand colour, white text). |
| **Status** | ⬜ Not Run |

---

### TC-009: Brand filter — "Alla" restores all models

*Traces to: US-102 AC-2, FR-104*

| Field | Value |
|-------|-------|
| **Precondition** | "iPhone" filter is currently active |
| **Steps** | 1. Click the "Alla" filter tab. |
| **Expected result** | All active phone models (both iPhone and Samsung) are displayed. The "Alla" tab appears selected. |
| **Status** | ⬜ Not Run |

---

### TC-010: Brand filter — "Samsung" tab shows only Samsung

*Traces to: US-102 AC-1, FR-104*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with "Alla" active |
| **Steps** | 1. Click the "Samsung" filter tab. |
| **Expected result** | Only Samsung models are displayed. iPhone models are hidden. The "Samsung" tab appears selected. |
| **Status** | ⬜ Not Run |

---

### TC-011: Empty filter state shows message with reset link

*Traces to: US-102 AC-3, FR-106, Drop 1 AC #6*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains only iPhone models (no Samsung), or vice versa |
| **Steps** | 1. Navigate to `/phones`. 2. Click the filter tab for the brand with zero active models. |
| **Expected result** | The message "Inga telefoner matchar ditt filter" is displayed with a clickable link/button that resets the filter to "Alla". No empty grid or broken layout. |
| **Status** | ⬜ Not Run |

---

### TC-012: Sort — default is "Populärast"

*Traces to: US-103, FR-105, Drop 1 AC #7*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor navigates to `/phones` for the first time |
| **Steps** | 1. Inspect the sort dropdown value. 2. Inspect the card order. |
| **Expected result** | Sort dropdown shows "Populärast" as the selected value. Cards are ordered by the catalogue sort-order position (lower number first, per BR-403). |
| **Status** | ⬜ Not Run |

---

### TC-013: Sort — "Pris lägst först" reorders cards ascending

*Traces to: US-103 AC-1, FR-105, Drop 1 AC #7*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones`, catalogue has phones with different instalment prices |
| **Steps** | 1. Select "Pris lägst först" from the sort dropdown. |
| **Expected result** | Phone cards are re-ordered with the lowest monthly instalment first, ascending. |
| **Status** | ⬜ Not Run |

---

### TC-014: Sort — "Pris högst först" reorders cards descending

*Traces to: US-103, FR-105, Drop 1 AC #7*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones`, catalogue has phones with different instalment prices |
| **Steps** | 1. Select "Pris högst först" from the sort dropdown. |
| **Expected result** | Phone cards are re-ordered with the highest monthly instalment first, descending. |
| **Status** | ⬜ Not Run |

---

### TC-015: Sort maintained across brand filter

*Traces to: US-103 AC-2*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with "Pris lägst först" sort active |
| **Steps** | 1. Click the "iPhone" filter tab. |
| **Expected result** | Only iPhone models are shown. They are still sorted by price ascending (sort is maintained within filtered results). |
| **Status** | ⬜ Not Run |

---

### TC-016: Same-price tiebreaker uses catalogue sort order

*Traces to: US-103 edge case, BR-403*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains two phone models with the same starting instalment price but different sort-order values |
| **Steps** | 1. Navigate to `/phones`. 2. Select "Pris lägst först". |
| **Expected result** | The two same-priced models are sub-sorted by their catalogue sort-order position (lower number first). |
| **Status** | ⬜ Not Run |

---

### TC-017: Responsive grid — 3 columns at ≥ 1280px

*Traces to: Drop 1 AC #9, NFR-101, ux.md responsive behaviour*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with ≥ 3 phone models |
| **Steps** | 1. Set viewport width to 1280px or wider. 2. Inspect the phone grid. |
| **Expected result** | Phone cards are arranged in a 3-column grid. |
| **Status** | ⬜ Not Run |

---

### TC-018: Responsive grid — 2 columns at 768px–1279px

*Traces to: Drop 1 AC #9, ux.md responsive behaviour*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with ≥ 3 phone models |
| **Steps** | 1. Set viewport width to 1024px (within 768–1279 range). 2. Inspect the phone grid. |
| **Expected result** | Phone cards are arranged in a 2-column grid. |
| **Status** | ⬜ Not Run |

---

### TC-019: Responsive grid — 1 column at < 768px

*Traces to: Drop 1 AC #9, ux.md responsive behaviour*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with ≥ 3 phone models |
| **Steps** | 1. Set viewport width to 375px (below 768px). 2. Inspect the phone grid. |
| **Expected result** | Phone cards are arranged in a single-column layout (full-width cards). |
| **Status** | ⬜ Not Run |

---

### TC-020: Empty catalogue — zero active models

*Traces to: US-001 edge case, US-101 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | The catalogue contains zero phone models with status "active" |
| **Steps** | 1. Navigate to `/phones`. |
| **Expected result** | The hero section is visible. The grid area displays "Inga telefoner tillgängliga just nu". No empty grid, no broken layout. The "Telefoner" nav link is still present. |
| **Status** | ⬜ Not Run |

---

### TC-021: Phone card hover state

*Traces to: ux.md interaction states*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with phone cards displayed (desktop) |
| **Steps** | 1. Hover the cursor over a phone card. |
| **Expected result** | Card shows elevated shadow, slight scale-up (1.02×), cursor changes to pointer. |
| **Status** | ⬜ Not Run |

---

### TC-022: Phone card keyboard focus

*Traces to: ux.md accessibility, NFR-302*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` with phone cards displayed |
| **Steps** | 1. Tab to a phone card. |
| **Expected result** | Card shows a 2px Vimla-brand-colour (green) focus outline. The focus is clearly visible. |
| **Status** | ⬜ Not Run |

---

### TC-023: Brand filter tab keyboard navigation

*Traces to: NFR-302, ux.md accessibility*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones` |
| **Steps** | 1. Tab to the brand filter tabs. 2. Press Enter or Space on "iPhone". |
| **Expected result** | The "iPhone" tab becomes active and only iPhone models are displayed. |
| **Status** | ⬜ Not Run |

---

### TC-024: Only active and in-stock models displayed

*Traces to: FR-107, BR-401*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains 4 models: 2 "active" + in-stock, 1 "out of stock", 1 "inactive" |
| **Steps** | 1. Navigate to `/phones`. |
| **Expected result** | Only the 2 active + in-stock models are displayed. The out-of-stock and inactive models are not visible. |
| **Status** | ⬜ Not Run |

---

### TC-025: "Telefoner" link visible in mobile nav

*Traces to: US-001 AC-1, FR-001*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on vimla.se on a mobile viewport (< 768px) |
| **Steps** | 1. Tap the hamburger menu icon. 2. Inspect the mobile navigation. |
| **Expected result** | "Telefoner" link is visible in the mobile navigation menu alongside other nav items. |
| **Status** | ⬜ Not Run |

---

## Traceability Matrix — Drop 1

| Drop 1 AC | Test Cases |
|-----------|------------|
| #1 "Telefoner" link visible in header | TC-001, TC-025 |
| #2 Clicking "Telefoner" navigates to `/phones` | TC-002 |
| #3 Hero section with title and subtitle | TC-003, TC-004 |
| #4 ≥ 3 phone cards with image, name, price | TC-005, TC-006 |
| #5 iPhone tab filters to iPhone only | TC-008, TC-009, TC-010 |
| #6 Empty-filter state message | TC-011 |
| #7 Sort dropdown re-orders cards | TC-012, TC-013, TC-014, TC-015, TC-016 |
| #8 Page loads within 2 seconds | (Performance test — Lighthouse) |
| #9 Responsive grid 3/2/1 columns | TC-017, TC-018, TC-019 |

| User Story | Test Cases |
|------------|------------|
| US-001 | TC-001, TC-002, TC-003, TC-004, TC-020, TC-025 |
| US-101 | TC-005, TC-006, TC-007, TC-020, TC-024 |
| US-102 | TC-008, TC-009, TC-010, TC-011, TC-023 |
| US-103 | TC-012, TC-013, TC-014, TC-015, TC-016 |
