# Test Cases — Vimla Hardware Sales

> **State:** Build
> **Last updated:** 2026-04-08
> **Active drop:** Drop 3 — Checkout Flow (Stubbed)

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

---

## Drop 2 Test Cases

### TC-026: Phone detail page loads for valid slug

*Traces to: US-201 AC-1, FR-201, Drop 2 AC #1*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains an active phone with slug `iphone-17-pro` |
| **Steps** | 1. Navigate to `/phones/iphone-17-pro`. |
| **Expected result** | Page displays: image gallery (main + thumbnails), model name "iPhone 17 Pro", colour swatches, storage pills, price box, specs table, and "Välj denna telefon →" button. |
| **Status** | ⬜ Not Run |

---

### TC-027: Clicking thumbnail updates main image

*Traces to: US-201 AC-2, FR-202, Drop 2 AC #3*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on a phone detail page with ≥ 2 gallery images |
| **Steps** | 1. Click the second thumbnail image. |
| **Expected result** | The main image updates to show the clicked thumbnail's full-size image. |
| **Status** | ⬜ Not Run |

---

### TC-028: Colour swatch updates image and label

*Traces to: US-202 AC-1, FR-203, Drop 2 AC #4*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on a phone detail page with ≥ 2 colour options |
| **Steps** | 1. Click a non-selected colour swatch (e.g. "Titan Blå"). |
| **Expected result** | The main image updates to show the phone in the selected colour. The colour name label below the swatches updates to "Titan Blå". |
| **Status** | ⬜ Not Run |

---

### TC-029: Storage pill updates price box

*Traces to: US-202 AC-2, FR-204, FR-205, Drop 2 AC #5*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on a phone detail page with ≥ 2 storage variants |
| **Steps** | 1. Click a non-selected storage pill (e.g. "256 GB"). 2. Observe the price box. |
| **Expected result** | The price box updates within 200 ms to show: (a) monthly instalment for the selected storage, (b) "i 36 månader", (c) total device cost = instalment × 36, (d) cheapest subscription price. |
| **Status** | ⬜ Not Run |

---

### TC-030: Price box shows all four values

*Traces to: US-202 AC-3, FR-205, Drop 2 AC #6*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on a phone detail page with a colour and storage selected |
| **Steps** | 1. Read the price box. |
| **Expected result** | Price box displays: monthly instalment (large text), "i 36 månader", total device cost "Totalt: X kr" (instalment × 36), and "+ abonnemang fr. X kr/mån" (cheapest plan price). |
| **Status** | ⬜ Not Run |

---

### TC-031: Back link navigates to `/phones` with filters preserved

*Traces to: US-203 AC-1, US-203 AC-2, FR-207, Drop 2 AC #7*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor applied "iPhone" filter on listing, then navigated to a detail page |
| **Steps** | 1. Click "← Tillbaka till alla telefoner". |
| **Expected result** | Browser navigates to `/phones`. The "iPhone" filter is still active. Previously applied sort order is preserved. |
| **Status** | ⬜ Not Run |

---

### TC-032: Invalid slug shows 404 with back link

*Traces to: US-201 edge case, Drop 2 AC #8*

| Field | Value |
|-------|-------|
| **Precondition** | None |
| **Steps** | 1. Navigate to `/phones/nonexistent-phone`. |
| **Expected result** | A 404 page is displayed with a "Tillbaka till alla telefoner" link that navigates to `/phones`. |
| **Status** | ⬜ Not Run |

---

### TC-033: Specs table contains minimum required specs

*Traces to: US-201 AC-3, FR-206*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on a phone detail page |
| **Steps** | 1. Scroll to the specs table. |
| **Expected result** | Table contains at minimum: screen size, chip/processor, camera configuration, battery life, and 5G support. |
| **Status** | ⬜ Not Run |

---

### TC-034: Single colour pre-selected

*Traces to: US-202 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains a phone model with only one colour option |
| **Steps** | 1. Navigate to that phone's detail page. |
| **Expected result** | The single colour is pre-selected with its swatch shown as selected. No other swatches are displayed. |
| **Status** | ⬜ Not Run |

---

### TC-035: Single storage pre-selected

*Traces to: US-202 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | Catalogue contains a phone model with only one storage option |
| **Steps** | 1. Navigate to that phone's detail page. |
| **Expected result** | The single storage option is pre-selected. No other pills are displayed. |
| **Status** | ⬜ Not Run |

---

## Traceability Matrix — Drop 2

| Drop 2 AC | Test Cases |
|-----------|------------|
| #1 Detail page loads from listing card click | TC-026 |
| #2 Detail page shows all required elements | TC-026 |
| #3 Thumbnail click updates main image | TC-027 |
| #4 Colour swatch updates image + label | TC-028 |
| #5 Storage pill updates price box within 200 ms | TC-029 |
| #6 Price box shows all four values | TC-030 |
| #7 Back link navigates to `/phones` with filters | TC-031 |
| #8 Invalid slug shows 404 | TC-032 |
| #9 Page loads within 2 seconds | (Performance test — Lighthouse) |

| User Story | Test Cases |
|------------|------------|
| US-201 | TC-026, TC-027, TC-032, TC-033 |
| US-202 | TC-028, TC-029, TC-030, TC-034, TC-035 |
| US-203 | TC-031 |

---

## Drop 3 Test Cases

### TC-036: CTA button navigates to checkout with colour + storage preserved

*Traces to: US-301 AC-1, FR-208, Drop 3 AC #1*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on `/phones/iphone-17-pro` with "Titan Blå" colour and "256 GB" storage selected |
| **Steps** | 1. Click "Välj denna telefon →". |
| **Expected result** | Browser navigates to `/phones/iphone-17-pro/checkout?colour=Titan%20Bl%C3%A5&storage=256%20GB`. The checkout page loads with the selected colour and storage reflected in the phone summary. |
| **Status** | ⬜ Not Run |

---

### TC-037: Checkout shows progress bar and phone summary

*Traces to: US-301 AC-2, FR-301, FR-302, Drop 3 AC #2*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor navigated to `/phones/iphone-17-pro/checkout?colour=Titan%20Natur&storage=256%20GB` |
| **Steps** | 1. Inspect the checkout page. |
| **Expected result** | (a) A 4-step progress bar shows: Välj telefon (completed ●), Abonnemang (active ●), Dina uppgifter (upcoming ○), Bekräfta (upcoming ○). (b) Step 1 is a collapsed summary showing: "iPhone 17 Pro · Titan Natur · 256 GB · 433 kr/mån" with an "Ändra" link. |
| **Status** | ⬜ Not Run |

---

### TC-038: "Ändra" link returns to detail page with selection preserved

*Traces to: US-301 AC-3, FR-302*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page with phone summary showing "Titan Natur · 256 GB" |
| **Steps** | 1. Click the "Ändra" link in the phone summary. |
| **Expected result** | Browser navigates back to `/phones/iphone-17-pro` with "Titan Natur" colour and "256 GB" storage still selected. |
| **Status** | ⬜ Not Run |

---

### TC-039: Plan selection shows radio buttons for ≥ 3 plans

*Traces to: US-302 AC-1, FR-303, Drop 3 AC #3*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page (unauthenticated) |
| **Steps** | 1. Inspect Step 2 (Abonnemang). |
| **Expected result** | A list of ≥ 3 plans is shown as radio buttons. Each shows: plan name, data allowance (GB), and monthly price (kr/mån). The plan marked `popular: true` has a "Populärast" badge. No plan is pre-selected. |
| **Status** | ⬜ Not Run |

---

### TC-040: Selecting a plan updates order summary within 500 ms

*Traces to: US-302 AC-2, FR-307, Drop 3 AC #3*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page, no plan selected yet |
| **Steps** | 1. Click the radio button for "Mellan" (149 kr/mån). 2. Observe the order summary panel. |
| **Expected result** | Within 500 ms, the order summary shows: phone instalment + "Mellan 15 GB — 149 kr/mån" + total monthly cost (instalment + 149). A "Fortsätt till personuppgifter →" button appears below the plan selector. |
| **Status** | ⬜ Not Run |

---

### TC-041: Cannot proceed without selecting a plan

*Traces to: US-302 AC-3*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page, no plan selected |
| **Steps** | 1. Attempt to advance to Step 3 (e.g. Tab past plan selector or look for a continue button). |
| **Expected result** | The "Fortsätt till personuppgifter →" button is not visible or is disabled until a plan is selected. The form fields in Step 3 are not yet shown. |
| **Status** | ⬜ Not Run |

---

### TC-042: Personal details form displays all 5 required fields

*Traces to: US-303 AC-1, FR-305, Drop 3 AC #4*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout (plan selected) |
| **Steps** | 1. Inspect the personal details form. |
| **Expected result** | Five fields are displayed: Personnummer, Namn, Adress, E-post, Telefon. All are marked as required (asterisk or `aria-required`). Two consent checkboxes are shown below. |
| **Status** | ⬜ Not Run |

---

### TC-043: Inline validation on invalid personnummer format

*Traces to: US-303 AC-4, FR-305, Drop 3 AC #4*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "abc123" in the Personnummer field. 2. Tab away from the field (blur). |
| **Expected result** | An inline error message "Ange ett giltigt personnummer (YYYYMMDD-XXXX)" appears below the field in red text. The field shows a red border. |
| **Status** | ⬜ Not Run |

---

### TC-044: Valid personnummer format accepted

*Traces to: US-303 AC-4, FR-305*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "19900101-1234" in the Personnummer field. 2. Tab away from the field. |
| **Expected result** | No error message appears. The field shows a green checkmark. |
| **Status** | ⬜ Not Run |

---

### TC-045: Personnummer with implausible date rejected

*Traces to: DEV-3 (review fix), FR-305*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "20261301-1234" in the Personnummer field (month 13). 2. Tab away. |
| **Expected result** | An inline error "Ange ett giltigt personnummer (YYYYMMDD-XXXX)" appears. The date portion must have a valid month (01–12) and day (01–31). |
| **Status** | ⬜ Not Run |

---

### TC-046: Under-18 personnummer shows age-gate error

*Traces to: US-303 edge case, BR-202, Drop 3 AC #5*

| Field | Value |
|-------|-------|
| **Precondition** | Current date is 2026-04-08. Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "20100101-1234" (person is 16 years old) in the Personnummer field. 2. Tab away. |
| **Expected result** | An inline error "Du måste vara minst 18 år för att ansöka om delbetalning" appears below the field. The submit button remains disabled. |
| **Status** | ⬜ Not Run |

---

### TC-047: Exactly 18 years old today is allowed

*Traces to: BR-202 edge case #4*

| Field | Value |
|-------|-------|
| **Precondition** | Current date is 2026-04-08 |
| **Steps** | 1. Type "20080408-1234" (turning 18 today) in the Personnummer field. 2. Tab away. |
| **Expected result** | No age error appears. The personnummer passes validation. |
| **Status** | ⬜ Not Run |

---

### TC-048: Invalid email shows inline error

*Traces to: US-303 AC-4, FR-305*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "not-an-email" in the E-post field. 2. Tab away. |
| **Expected result** | An inline error "Ange en giltig e-postadress" appears below the field. |
| **Status** | ⬜ Not Run |

---

### TC-049: Invalid phone number shows inline error

*Traces to: US-303 AC-4, FR-305*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "12345" in the Telefon field. 2. Tab away. |
| **Expected result** | An inline error "Ange ett giltigt telefonnummer" appears below the field. |
| **Status** | ⬜ Not Run |

---

### TC-050: Swedish phone number with spaces accepted

*Traces to: DEV-5 (review fix), FR-305*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Type "070-123 45 67" in the Telefon field. 2. Tab away. |
| **Expected result** | No error appears. The input is normalised internally (spaces and dashes stripped) and validated as a valid Swedish mobile number. |
| **Status** | ⬜ Not Run |

---

### TC-051: Submit button disabled until all fields valid + both consents checked

*Traces to: US-303 AC-2, US-303 AC-3, FR-308, BR-203, Drop 3 AC #6*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3, all form fields are empty |
| **Steps** | 1. Fill all 5 fields with valid values. 2. Check only the first consent box. 3. Observe submit button. 4. Check the second consent box. 5. Observe submit button. |
| **Expected result** | After step 3: button is disabled (grey, `cursor: not-allowed`). After step 5: button becomes enabled (brand colour, clickable). |
| **Status** | ⬜ Not Run |

---

### TC-052: Submit shows spinner and loading text

*Traces to: US-304 AC-1, FR-309, Drop 3 AC #7*

| Field | Value |
|-------|-------|
| **Precondition** | All fields valid, both consents checked, submit button enabled |
| **Steps** | 1. Click "Genomför kreditkontroll och beställ →". |
| **Expected result** | (a) A spinner is displayed. (b) Text "Vi kontrollerar dina uppgifter…" is shown. (c) The submit button becomes disabled. |
| **Status** | ⬜ Not Run |

---

### TC-053: Double-click prevention on submit

*Traces to: US-304 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | All fields valid, both consents checked, submit button enabled |
| **Steps** | 1. Rapidly double-click the submit button. |
| **Expected result** | Only one credit check is triggered. The button is disabled on the first click; the second click is ignored. |
| **Status** | ⬜ Not Run |

---

### TC-054: Approved credit check — shows confirmation screen

*Traces to: US-401 AC-1, FR-401, Drop 3 AC #8*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor submits with a valid personnummer (not a test decline/error PNR) |
| **Steps** | 1. Wait for the stubbed credit check to complete (≈ 2 seconds). |
| **Expected result** | The screen shows: ✅ icon, "Din kreditkontroll är godkänd!", order summary (phone + plan + total monthly cost), delivery estimate "1–3 arbetsdagar", and a "Bekräfta beställning →" button. |
| **Status** | ⬜ Not Run |

---

### TC-055: Confirm order redirects to confirmation page

*Traces to: US-401 AC-2, US-402 AC-1, FR-402, FR-404, Drop 3 AC #8, #9*

| Field | Value |
|-------|-------|
| **Precondition** | Approved screen is displayed |
| **Steps** | 1. Click "Bekräfta beställning →". |
| **Expected result** | Browser redirects to `/order/confirmation/<order-id>`. The confirmation page shows: 🎉 icon, order number (format `VH-YYYYMMDD-NNN`), phone model + colour + storage, subscription plan, monthly cost breakdown (instalment + subscription = total), delivery address, estimated delivery "1–3 arbetsdagar", note about confirmation email, and "Gå till Mitt Vimla →" link. |
| **Status** | ⬜ Not Run |

---

### TC-056: Confirmation page — "Gå till Mitt Vimla" link

*Traces to: US-402 AC-2, FR-405*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the order confirmation page |
| **Steps** | 1. Click "Gå till Mitt Vimla →". |
| **Expected result** | The link navigates toward the Mitt Vimla account dashboard. (In Drop 3, this links to `#` as auth is not implemented.) |
| **Status** | ⬜ Not Run |

---

### TC-057: Confirmation page survives refresh (no duplicate order)

*Traces to: US-402 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the order confirmation page showing order VH-20260408-001 |
| **Steps** | 1. Press F5 (refresh the page). |
| **Expected result** | The same order details are displayed. No duplicate order is placed. The order number remains VH-20260408-001. **Note:** In Drop 3, order persistence is in-memory only — a server restart clears stored orders. Full persistence comes in Drop 4. |
| **Status** | ⬜ Not Run |

---

### TC-058: Declined credit check — test personnummer `199001019999`

*Traces to: US-403 AC-1, FR-403, Drop 3 AC #10*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 with all fields valid |
| **Steps** | 1. Enter personnummer `199001019999`. 2. Check both consents. 3. Click submit. 4. Wait for stub response. |
| **Expected result** | The screen shows: ❌ icon, "Tyvärr blev din kreditansökan inte godkänd.", an empathetic message, a customer service contact link, and a "Tillbaka till telefoner" link. No decline reason is shown. |
| **Status** | ⬜ Not Run |

---

### TC-059: Declined — no order created

*Traces to: US-403 AC-2, BR-205*

| Field | Value |
|-------|-------|
| **Precondition** | Declined screen is displayed |
| **Steps** | 1. Verify that no redirect to `/order/confirmation/` occurred. 2. Verify no order number is shown. |
| **Expected result** | No order was created. The page does not show any order number or confirmation. |
| **Status** | ⬜ Not Run |

---

### TC-060: Error/timeout credit check — test personnummer `199001018888`

*Traces to: US-404 AC-1, NFR-401, Drop 3 AC #11*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 with all fields valid |
| **Steps** | 1. Enter personnummer `199001018888`. 2. Check both consents. 3. Click submit. 4. Wait for stub response. |
| **Expected result** | The screen shows: ⚠️ icon, "Något gick fel. Försök igen om en stund.", and a "Försök igen" retry button. |
| **Status** | ⬜ Not Run |

---

### TC-061: Retry after error re-submits with same data

*Traces to: US-404 AC-2, Drop 3 AC #11*

| Field | Value |
|-------|-------|
| **Precondition** | Error screen is displayed after using personnummer `199001018888` |
| **Steps** | 1. Change personnummer to a valid non-test value (e.g. `19900101-1234`). 2. Click "Försök igen". |
| **Expected result** | The credit check is re-submitted. The spinner + loading text reappears. Since the new PNR is not a test PNR, the result is ✅ approved. Personal details do not need to be re-entered. |
| **Status** | ⬜ Not Run |

---

### TC-062: Retry after error — repeated failure

*Traces to: US-404 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | Error screen is displayed |
| **Steps** | 1. Click "Försök igen" (keeping the error-trigger PNR). |
| **Expected result** | The same error message and retry button are shown again. No limit on retries. |
| **Status** | ⬜ Not Run |

---

### TC-063: Order summary panel visible throughout checkout

*Traces to: FR-307, BR-104, Drop 3 AC #12*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page at any step |
| **Steps** | 1. Inspect the order summary panel on desktop (≥ 1024px). 2. Select a plan. 3. Scroll down through the form. |
| **Expected result** | (a) The order summary is visible as a sticky sidebar on desktop. (b) It shows phone + instalment, selected plan + price, total = instalment + subscription (BR-104). (c) It remains visible while scrolling. |
| **Status** | ⬜ Not Run |

---

### TC-064: Order summary — mobile collapsed state

*Traces to: FR-307, ux.md responsive behaviour*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page on mobile (< 768px) |
| **Steps** | 1. Inspect the bottom of the screen. 2. Tap the summary bar. |
| **Expected result** | (a) A sticky bottom bar shows "Totalt: XXX kr/mån ▲" in collapsed state. (b) Tapping expands to show the full order summary with slide-up animation. (c) Tapping again collapses it. |
| **Status** | ⬜ Not Run |

---

### TC-065: Out-of-stock guard — phone unavailable at page load

*Traces to: US-502, BR-401, Drop 3 AC #13*

| Field | Value |
|-------|-------|
| **Precondition** | Phone model's status is changed to "out-of-stock" in the catalogue |
| **Steps** | 1. Navigate to `/phones/<slug>/checkout` for the out-of-stock phone. |
| **Expected result** | A 404 page is displayed (the phone is not active). A "Tillbaka till alla telefoner" link is shown. |
| **Status** | ⬜ Not Run |

---

### TC-066: Out-of-stock guard — phone becomes unavailable during checkout

*Traces to: US-502 AC-1, BR-401, Drop 3 AC #13*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor has started checkout, then the phone's status changes to "out-of-stock" before submission |
| **Steps** | 1. Click submit (or the system checks stock before the credit call). |
| **Expected result** | The message "Tyvärr är [model name] inte längre tillgänglig" is displayed with a "Tillbaka till telefoner" link. No credit check is triggered. |
| **Status** | ⬜ Not Run |

---

### TC-067: Order number format — BR-501

*Traces to: BR-501, FR-404*

| Field | Value |
|-------|-------|
| **Precondition** | A successful order is placed on 2026-04-08, and it is the first order of the day |
| **Steps** | 1. Complete the full checkout flow (approved + confirm). 2. Read the order number on the confirmation page. |
| **Expected result** | Order number is `VH-20260408-001`. Format: `VH-YYYYMMDD-NNN` with zero-padded sequential counter. |
| **Status** | ⬜ Not Run |

---

### TC-068: Order number counter increments

*Traces to: BR-501, BR-501 edge case #6*

| Field | Value |
|-------|-------|
| **Precondition** | Two orders placed on the same day |
| **Steps** | 1. Place a first order. 2. Place a second order. |
| **Expected result** | First order: `VH-20260408-001`. Second order: `VH-20260408-002`. Counter increments. |
| **Status** | ⬜ Not Run |

---

### TC-069: Combined monthly cost is correct — BR-104

*Traces to: BR-104, FR-307*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor selects a phone with instalment 433 kr/mån and plan "Mellan" at 149 kr/mån |
| **Steps** | 1. Read the "Totalt per månad" in the order summary. |
| **Expected result** | Total = 433 + 149 = **582 kr/mån**. The two line items sum to the displayed total. |
| **Status** | ⬜ Not Run |

---

### TC-070: Checkout page — invalid slug returns 404

*Traces to: FR-208 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | None |
| **Steps** | 1. Navigate to `/phones/nonexistent-phone/checkout`. |
| **Expected result** | A 404 page is displayed with a "Tillbaka till alla telefoner" link. |
| **Status** | ⬜ Not Run |

---

### TC-071: Confirmation page — invalid order ID returns 404

*Traces to: FR-404 edge case*

| Field | Value |
|-------|-------|
| **Precondition** | None |
| **Steps** | 1. Navigate to `/order/confirmation/INVALID-ID`. |
| **Expected result** | A 404 page is displayed with a link back to the phone listing. |
| **Status** | ⬜ Not Run |

---

### TC-072: Consent checkbox — "villkoren" is a hyperlink

*Traces to: FR-306, UX-5 (review fix)*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on Step 3 of checkout |
| **Steps** | 1. Inspect the first consent checkbox label. |
| **Expected result** | The word "villkoren" is a hyperlink (underlined, opens terms page or placeholder). The checkbox still functions independently of the link. |
| **Status** | ⬜ Not Run |

---

### TC-073: Keyboard navigation — progress bar, plan selector, form

*Traces to: NFR-302*

| Field | Value |
|-------|-------|
| **Precondition** | Visitor is on the checkout page |
| **Steps** | 1. Tab through all interactive elements: progress bar steps, plan radio buttons, form fields, consent checkboxes, submit button. 2. Use arrow keys within the plan selector. 3. Use Enter/Space to check consent boxes. |
| **Expected result** | All elements are reachable via Tab. Arrow keys navigate between plan options. Enter/Space toggles checkboxes and activates buttons. Focus rings (2px brand colour) are visible on every element. |
| **Status** | ⬜ Not Run |

---

### TC-074: Screen reader — price update announced

*Traces to: NFR-304*

| Field | Value |
|-------|-------|
| **Precondition** | Screen reader active (VoiceOver/NVDA), visitor on checkout page |
| **Steps** | 1. Select a plan via radio button. |
| **Expected result** | The updated total monthly cost in the order summary is announced via `aria-live="polite"` within 500 ms. |
| **Status** | ⬜ Not Run |

---

### TC-075: Navigation-away warning during credit check

*Traces to: US-304 AC-2*

| Field | Value |
|-------|-------|
| **Precondition** | Credit check is in progress (spinner visible) |
| **Steps** | 1. Try to navigate away (click browser back, or close tab). |
| **Expected result** | The browser shows a confirmation dialog: "Är du säker? Din kreditkontroll pågår." (or browser-default leave-page text). |
| **Status** | ⬜ Not Run |

---

## Traceability Matrix — Drop 3

| Drop 3 AC | Test Cases |
|-----------|------------|
| #1 CTA navigates to checkout with colour + storage | TC-036 |
| #2 Progress bar + phone summary with Ändra | TC-037, TC-038 |
| #3 Plan selection with ≥ 3 plans, updates summary | TC-039, TC-040, TC-041 |
| #4 Personal details form validates all 5 fields | TC-042, TC-043, TC-044, TC-045, TC-048, TC-049, TC-050 |
| #5 Under-18 age-gate error | TC-046, TC-047 |
| #6 Submit button disabled until valid + consents | TC-051 |
| #7 Spinner + loading text on submit | TC-052, TC-053 |
| #8 Approved flow → Bekräfta → confirmation | TC-054, TC-055 |
| #9 Confirmation page with order number + breakdown | TC-055, TC-056, TC-057, TC-067, TC-068 |
| #10 Declined flow with empathetic message | TC-058, TC-059 |
| #11 Error flow with retry | TC-060, TC-061, TC-062 |
| #12 Order summary visible, total = instalment + subscription | TC-063, TC-064, TC-069 |
| #13 Out-of-stock guard | TC-065, TC-066 |

| User Story | Test Cases |
|------------|------------|
| US-301 | TC-036, TC-037, TC-038 |
| US-302 | TC-039, TC-040, TC-041 |
| US-303 | TC-042, TC-043, TC-044, TC-045, TC-046, TC-047, TC-048, TC-049, TC-050, TC-051, TC-072 |
| US-304 | TC-052, TC-053, TC-075 |
| US-401 | TC-054, TC-055 |
| US-402 | TC-055, TC-056, TC-057, TC-067, TC-068 |
| US-403 | TC-058, TC-059 |
| US-404 | TC-060, TC-061, TC-062 |
| US-502 | TC-065, TC-066 |

| Business Rule | Test Cases |
|--------------|------------|
| BR-104 | TC-063, TC-069 |
| BR-202 | TC-046, TC-047 |
| BR-203 | TC-051 |
| BR-204 | TC-054, TC-055 |
| BR-205 | TC-059 |
| BR-501 | TC-067, TC-068 |
