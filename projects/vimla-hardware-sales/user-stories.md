# User Stories — Vimla Hardware Sales

> **State:** Design
> **Last updated:** 2026-04-08
> **Status:** ⬜ Not Done

---

## Quality Standard

Every story and its acceptance criteria satisfy:

| Check | Rule |
|-------|------|
| **Atomic** | One capability per story. If "and" joins two behaviours, split. |
| **Testable** | Every AC has a measurable or observable outcome. |
| **Unambiguous** | No vague terms ("user-friendly", "fast", "intuitive"). |
| **Traceable** | Every story traces to ≥ 1 FR/NFR. Every AC traces forward to ≥ 1 test case. |
| **Context-linked** | The role is a specific actor. Preconditions are explicit. |

---

## Traceability

User stories trace back to [Requirements](requirements.md) and forward to [Test Cases](test-cases.md).

**Actors used in this document:**

| Actor | Definition |
|-------|-----------|
| **Prospect** | A visitor to vimla.se who is not yet a Vimla subscriber |
| **Subscriber** | An existing Vimla customer authenticated via Mitt Vimla |
| **Commercial team member** | A Vimla employee authorised to manage the phone catalogue |

---

## Story Map

| ID | Story | Priority | Traces to |
|----|-------|----------|-----------|
| US-001 | Discover the phone webshop | Must | FR-001, FR-002 |
| US-101 | Browse available phones | Must | FR-101, FR-102, FR-103 |
| US-102 | Filter phones by brand | Must | FR-104, FR-106 |
| US-103 | Sort phones by price | Should | FR-105 |
| US-201 | View phone details | Must | FR-201, FR-202, FR-206, FR-207 |
| US-202 | Select colour and storage | Must | FR-203, FR-204, FR-205 |
| US-203 | Navigate back to listing | Must | FR-207 |
| US-301 | Start checkout with selected phone | Must | FR-208, FR-301, FR-302 |
| US-302 | Select a subscription plan | Must | FR-303, FR-307 |
| US-303 | Enter personal details and consent | Must | FR-305, FR-306, FR-308 |
| US-304 | Submit order for credit check | Must | FR-309 |
| US-401 | Confirm approved order | Must | FR-401, FR-402 |
| US-402 | See order confirmation | Must | FR-404, FR-405 |
| US-403 | Handle declined credit check | Must | FR-403 |
| US-404 | Handle credit check timeout/error | Must | NFR-401 |
| US-501 | Checkout as existing subscriber | Should | FR-304, FR-501, FR-502, FR-503 |
| US-502 | Handle out-of-stock during checkout | Should | FR-107 |
| US-601 | Manage phone catalogue | Should | FR-601, FR-602, FR-603 |

---

## Stories

### US-001: Discover the phone webshop

*Traces to: FR-001, FR-002*

**As a** prospect or subscriber browsing vimla.se,
**I want** to see a clear "Telefoner" link in the site navigation and understand the phone offer at a glance,
**so that** I can discover that Vimla sells phones and navigate to the webshop.

**Priority:** Must
**Rationale:** Without a visible entry point on vimla.se, the webshop has zero organic discoverability. This is the top of the funnel — if visitors can't find the webshop, nothing downstream matters.

#### Acceptance Criteria

- [ ] **Given** a visitor is on any page of vimla.se, **when** they view the site header, **then** a "Telefoner" navigation link is visible alongside existing navigation items (e.g. Abonnemang, Mitt Vimla)
- [ ] **Given** the visitor clicks the "Telefoner" link in the site header, **when** the page loads, **then** the browser navigates to `/phones`
- [ ] **Given** the visitor arrives at `/phones`, **when** the page loads, **then** a hero section is displayed above the phone grid containing a page title and a subtitle communicating the instalment starting price (e.g. "Köp mobil med Vimla — betala från XXX kr/mån med 36 månaders delbetalning")
- [ ] **Given** the hero subtitle mentions a starting price, **when** the lowest instalment price in the catalogue changes (e.g. a cheaper model is added), **then** the subtitle updates to reflect the new lowest price

#### Edge Cases

- [ ] **Given** the phone catalogue has zero active models, **when** the visitor clicks "Telefoner", **then** the listing page loads with the hero section visible but the grid area shows "Inga telefoner tillgängliga just nu" (the nav link is still present — do not hide the entry point)

---

### US-101: Browse available phones

*Traces to: FR-101, FR-102, FR-103*

**As a** prospect or subscriber,
**I want** to see all available phones displayed as cards on a listing page,
**so that** I can quickly scan what Vimla offers and find a phone that interests me.

**Priority:** Must
**Rationale:** This is the entry point to the entire webshop — without it, there is no shopping experience.

#### Acceptance Criteria

- [ ] **Given** the prospect visits `/phones`, **when** the page loads, **then** all phone models with catalogue status "active" are displayed as cards in a responsive grid
- [ ] **Given** the listing page is loaded, **when** the prospect views a phone card, **then** the card shows: one product image, model name, and starting monthly instalment price in the format "fr. XXX kr/mån"
- [ ] **Given** the listing page is loaded, **when** the prospect clicks the "Välj →" button on a phone card, **then** the browser navigates to `/phones/<phone-slug>`

#### Edge Cases

- [ ] **Given** there are zero phone models with status "active" in the catalogue, **when** the prospect visits `/phones`, **then** the page displays a message "Inga telefoner tillgängliga just nu" (no empty grid, no broken layout)

---

### US-102: Filter phones by brand

*Traces to: FR-104, FR-106*

**As a** prospect or subscriber,
**I want** to filter the phone listing by brand (iPhone or Samsung),
**so that** I only see phones from the brand I prefer.

**Priority:** Must
**Rationale:** With two distinct brand audiences, filtering prevents irrelevant browsing.

#### Acceptance Criteria

- [ ] **Given** the listing page is loaded with "Alla" filter active (default), **when** the prospect clicks the "iPhone" tab, **then** only iPhone models are displayed and the "iPhone" tab appears selected
- [ ] **Given** the "iPhone" filter is active, **when** the prospect clicks "Alla", **then** all active phone models are displayed again
- [ ] **Given** a brand filter is active, **when** zero models match, **then** the system displays "Inga telefoner matchar ditt filter" with a clickable link that resets the filter to "Alla"

#### Edge Cases

- [ ] **Given** the prospect applies a brand filter, **when** the prospect navigates away and returns using the browser back button, **then** the previously selected filter is restored (no stale state)

---

### US-103: Sort phones by price

*Traces to: FR-105*

**As a** prospect or subscriber,
**I want** to sort the phone listing by price (lowest or highest first),
**so that** I can find phones that match my budget.

**Priority:** Should
**Rationale:** Budget is a primary decision driver for phone purchases.

#### Acceptance Criteria

- [ ] **Given** the listing page is loaded with "Populärast" sort (default), **when** the prospect selects "Pris lägst först", **then** phone cards re-order with the lowest monthly instalment first
- [ ] **Given** a sort option is selected, **when** the prospect also applies a brand filter, **then** the sort order is maintained within the filtered results

#### Edge Cases

- [ ] **Given** two phone models have the same starting instalment price, **when** sorted by price, **then** they are sub-sorted by the catalogue sort-order position (i.e. "Populärast" rank as tiebreaker)

---

### US-201: View phone details

*Traces to: FR-201, FR-202, FR-206, FR-207*

**As a** prospect or subscriber,
**I want** to view a detailed page for a specific phone showing images, specs, and pricing,
**so that** I can decide whether this is the phone I want.

**Priority:** Must
**Rationale:** The detail page is where the purchase decision happens.

#### Acceptance Criteria

- [ ] **Given** the prospect navigates to `/phones/<phone-slug>`, **when** the page loads, **then** the page displays: image gallery, model name, colour picker, storage picker, price box, specs table, and "Välj denna telefon →" button
- [ ] **Given** the detail page is loaded, **when** the prospect clicks a thumbnail image, **then** the main image updates to show the clicked thumbnail's full-size image
- [ ] **Given** the detail page is loaded, **when** the prospect reads the specs table, **then** it contains at minimum: screen size, chip/processor, camera configuration, battery life, and 5G support

#### Edge Cases

- [ ] **Given** an invalid `<phone-slug>` in the URL (e.g. a phone that doesn't exist or is inactive), **when** the page loads, **then** the system displays a 404 page with a "Tillbaka till alla telefoner" link

---

### US-202: Select colour and storage

*Traces to: FR-203, FR-204, FR-205*

**As a** prospect or subscriber,
**I want** to select a colour and storage option for a phone and see the price update instantly,
**so that** I know exactly what the selected configuration costs per month.

**Priority:** Must
**Rationale:** Colour + storage define the specific SKU and price — this is the configuration step.

#### Acceptance Criteria

- [ ] **Given** the detail page is loaded, **when** the prospect clicks a colour swatch, **then** the main image updates to show the phone in the selected colour, and the colour name label updates
- [ ] **Given** the detail page is loaded, **when** the prospect clicks a storage pill (e.g. "256 GB"), **then** the price box updates to show the instalment price for that storage variant within 200 ms
- [ ] **Given** the prospect has selected a colour and storage, **when** they read the price box, **then** they see: monthly instalment, "i 36 månader", total device price, and cheapest subscription price

#### Edge Cases

- [ ] **Given** only one colour is available for a model, **when** the detail page loads, **then** that colour is pre-selected with its swatch shown as selected, and no other swatches are displayed
- [ ] **Given** only one storage option is available, **when** the detail page loads, **then** that option is pre-selected and no other pills are displayed

---

### US-203: Navigate back to listing

*Traces to: FR-207*

**As a** prospect or subscriber,
**I want** to navigate back to the phone listing from a detail page,
**so that** I can compare other phones.

**Priority:** Must
**Rationale:** Browsing requires easy back-and-forth navigation.

#### Acceptance Criteria

- [ ] **Given** the prospect is on a phone detail page, **when** they click "← Tillbaka till alla telefoner", **then** they are navigated to `/phones`
- [ ] **Given** the prospect navigates back to the listing, **when** the listing loads, **then** previously applied filters and sort order are preserved

---

### US-301: Start checkout with selected phone

*Traces to: FR-208, FR-301, FR-302*

**As a** prospect or subscriber,
**I want** to proceed to checkout with my selected phone configuration,
**so that** I can complete my purchase.

**Priority:** Must
**Rationale:** The transition from browsing to buying is the most critical conversion point.

#### Acceptance Criteria

- [ ] **Given** the prospect has selected a colour and storage on the detail page, **when** they click "Välj denna telefon →", **then** they are navigated to `/phones/<phone-slug>/checkout` with the selected colour and storage preserved
- [ ] **Given** the checkout page loads, **when** the prospect views Step 1, **then** a collapsed summary shows: model name, selected colour, selected storage, and monthly instalment, with an "Ändra" link
- [ ] **Given** the checkout page shows the phone summary, **when** the prospect clicks "Ändra", **then** they are navigated back to the detail page with their previous colour/storage selection preserved

---

### US-302: Select a subscription plan

*Traces to: FR-303, FR-307*

**As a** prospect (not yet a Vimla subscriber),
**I want** to select a Vimla subscription plan during checkout,
**so that** I can bundle my phone purchase with a plan.

**Priority:** Must
**Rationale:** The 36-month instalment requires an active subscription — the plan selection is mandatory for new customers.

#### Acceptance Criteria

- [ ] **Given** the prospect is on the checkout page and is not authenticated, **when** they view Step 2, **then** a list of available Vimla plans is shown as radio buttons, each displaying: plan name, data allowance, and monthly price
- [ ] **Given** the plan list is displayed, **when** the prospect selects a plan, **then** the order summary panel updates the subscription line and total monthly cost within 500 ms
- [ ] **Given** no plan is selected yet, **when** the prospect attempts to proceed to Step 3, **then** the system highlights the plan selection step and does not advance

#### Edge Cases

- [ ] **Given** only one subscription plan is available (e.g. a promotion), **when** the checkout page loads, **then** that plan is pre-selected and displayed as the only option

---

### US-303: Enter personal details and consent

*Traces to: FR-305, FR-306, FR-308*

**As a** prospect or subscriber,
**I want** to enter my personal details and give consent for credit check and instalment terms,
**so that** my order can be processed.

**Priority:** Must
**Rationale:** Legal and operational prerequisite for the credit check.

#### Acceptance Criteria

- [ ] **Given** the prospect is on Step 3, **when** they view the form, **then** five fields are displayed: personnummer, full name, address, email, phone — all marked as required
- [ ] **Given** the prospect fills in all fields and checks both consent boxes, **when** they view the submit button, **then** the button is enabled (not greyed out)
- [ ] **Given** the prospect has not checked both consent boxes, **when** they view the submit button, **then** the button is disabled with `cursor: not-allowed`
- [ ] **Given** the prospect submits a field with invalid format (e.g. personnummer not matching YYMMDD-XXXX pattern), **when** the field loses focus, **then** an inline error message appears below the field in red text

#### Edge Cases

- [ ] **Given** the prospect enters a personnummer for a person under 18, **when** the form validates, **then** the system displays an error "Du måste vara minst 18 år för att ansöka om delbetalning" and the submit button remains disabled

---

### US-304: Submit order for credit check

*Traces to: FR-309*

**As a** prospect or subscriber,
**I want** to submit my order for a credit check,
**so that** I can find out if I'm approved for the 36-month instalment plan.

**Priority:** Must
**Rationale:** Credit check is the gate between intent and purchase.

#### Acceptance Criteria

- [ ] **Given** all fields are valid and both consents are checked, **when** the prospect clicks "Genomför kreditkontroll och beställ →", **then** the system displays a spinner with "Vi kontrollerar dina uppgifter…" and the button becomes disabled
- [ ] **Given** the credit check is in progress, **when** the prospect tries to navigate away, **then** the browser shows a confirmation dialog ("Är du säker? Din kreditkontroll pågår.")

#### Edge Cases

- [ ] **Given** the prospect double-clicks the submit button rapidly, **when** the first click is processed, **then** the second click is ignored (button disabled on first click)

---

### US-401: Confirm approved order

*Traces to: FR-401, FR-402*

**As a** prospect or subscriber whose credit check was approved,
**I want** to review and confirm my order,
**so that** I can complete the purchase with confidence.

**Priority:** Must
**Rationale:** Two-step confirmation is essential for a 36-month financial commitment.

#### Acceptance Criteria

- [ ] **Given** the credit check returns approved, **when** the result page loads, **then** it displays: ✅ icon, order summary (phone + plan + total monthly cost), delivery estimate "1–3 arbetsdagar", and a "Bekräfta beställning →" button
- [ ] **Given** the approved result is displayed, **when** the prospect clicks "Bekräfta beställning →", **then** the order is placed and the browser redirects to `/order/confirmation/<order-id>`

---

### US-402: See order confirmation

*Traces to: FR-404, FR-405*

**As a** customer who has just completed a purchase,
**I want** to see a confirmation of my order with all details,
**so that** I have a record and know what to expect next.

**Priority:** Must
**Rationale:** Confirmation is the final trust-building moment and provides a reference for the customer.

#### Acceptance Criteria

- [ ] **Given** the order is placed, **when** the confirmation page loads, **then** it displays: 🎉 icon, order number (format `VH-YYYYMMDD-NNN`), phone model + colour + storage, subscription plan, monthly cost breakdown, delivery address, estimated delivery window, and a note that an email confirmation was sent
- [ ] **Given** the confirmation page is displayed, **when** the customer clicks "Gå till Mitt Vimla →", **then** they are navigated to their Mitt Vimla account dashboard

#### Edge Cases

- [ ] **Given** the customer refreshes the confirmation page, **when** the page reloads, **then** the same order details are displayed (no duplicate order placed)

> **Drop 3 caveat:** Order storage is in-memory only (`globalThis` singleton). A server restart clears all stored orders, meaning a confirmation page refresh after restart will 404. Full database-backed persistence replaces this in Drop 4.

---

### US-403: Handle declined credit check

*Traces to: FR-403*

**As a** prospect whose credit check was declined,
**I want** to see a clear, empathetic message explaining the outcome,
**so that** I understand what happened and what I can do next.

**Priority:** Must
**Rationale:** A declined credit check is a sensitive moment — UX must be empathetic, not clinical.

#### Acceptance Criteria

- [ ] **Given** the credit check returns declined, **when** the result page loads, **then** it displays: ❌ icon, the message "Tyvärr blev din kreditansökan inte godkänd", a link to Vimla customer service, and a "Tillbaka till telefoner" link
- [ ] **Given** the declined result is displayed, **when** the prospect reads the page, **then** no specific decline reason is shown (credit provider policy)

---

### US-404: Handle credit check timeout or error

*Traces to: NFR-401*

**As a** prospect or subscriber,
**I want** to see a helpful error message if the credit check fails due to a technical issue,
**so that** I know it's not my fault and I can try again.

**Priority:** Must
**Rationale:** Technical failures should not be confused with a credit decline.

#### Acceptance Criteria

- [ ] **Given** the credit check provider is unreachable or times out (> 20 seconds), **when** the system detects the failure, **then** it displays the message "Något gick fel. Försök igen om en stund." with a "Försök igen" retry button
- [ ] **Given** the error message is displayed, **when** the prospect clicks "Försök igen", **then** the credit check request is re-submitted with the same data (no need to re-enter personal details)

#### Edge Cases

- [ ] **Given** the retry also fails, **when** the second attempt times out, **then** the same error message is shown again with the retry button still available (no limit on retries)

---

### US-501: Checkout as existing subscriber

*Traces to: FR-304, FR-501, FR-502, FR-503*

**As an** authenticated Vimla subscriber,
**I want** to add a phone instalment to my existing subscription without re-entering my details or choosing a new plan,
**so that** the checkout is fast and my billing stays on one invoice.

**Priority:** Should
**Rationale:** Existing subscribers are high-value — reducing checkout friction increases conversion for this segment.

#### Acceptance Criteria

- [ ] **Given** an authenticated subscriber reaches the checkout page, **when** they view Step 2 (Abonnemang), **then** their current plan name and monthly price are shown as read-only text (no radio buttons)
- [ ] **Given** an authenticated subscriber reaches Step 3, **when** the form loads, **then** name, address, email, and phone are pre-filled from their account profile — only personnummer is empty
- [ ] **Given** a subscriber completes a purchase, **when** the order is processed, **then** the device instalment appears as a new line item on their existing monthly invoice — no new subscription is created

#### Edge Cases

- [ ] **Given** the subscriber's account profile is missing address or email, **when** the form loads, **then** those fields are empty (not pre-filled) and the subscriber must enter them manually

---

### US-502: Handle out-of-stock during checkout

*Traces to: FR-107*

**As a** prospect or subscriber who has started checkout,
**I want** to be informed if the phone I selected goes out of stock before I complete the order,
**so that** I don't waste time filling in details for an unavailable product.

**Priority:** Should
**Rationale:** Stock can change between browsing and checkout — the system must handle this gracefully.

#### Acceptance Criteria

- [ ] **Given** the prospect has reached the checkout page, **when** the selected phone's stock status changes to "out of stock" before order submission, **then** the system displays a message "Tyvärr är [model name] inte längre tillgänglig" with a "Tillbaka till telefoner" link
- [ ] **Given** the out-of-stock message is shown, **when** the prospect clicks the link, **then** they return to the listing page where the out-of-stock model is no longer visible

---

### US-601: Manage phone catalogue

*Traces to: FR-601, FR-602, FR-603*

**As a** commercial team member,
**I want** to add, edit, and control the visibility of phone models in the catalogue,
**so that** I can manage the product offering without needing engineering help.

**Priority:** Should
**Rationale:** Operational autonomy for the commercial team reduces bottlenecks and speeds up catalogue updates.

#### Acceptance Criteria

- [ ] **Given** an authorised commercial team member accesses the catalogue management tool, **when** they add a new phone model with all required fields (name, brand, images, specs, colours, storage variants, instalment prices), **then** the model appears on the listing page when set to "active"
- [ ] **Given** a phone model is "active", **when** the team member changes its status to "out of stock", **then** the model no longer appears on the listing page but its data is preserved in the system
- [ ] **Given** the team member sets a sort-order value for each model, **when** a visitor views the listing with "Populärast" sort, **then** models are ordered by the assigned sort-order value (lowest number first)

#### Edge Cases

- [ ] **Given** the team member sets two models to the same sort-order value, **when** the listing renders, **then** models with the same value are sub-sorted alphabetically by model name
