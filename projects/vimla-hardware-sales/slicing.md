# Slicing & Drops — Vimla Hardware Sales

> **State:** Build
> **Last updated:** 2026-04-08
> **Status:** 🟡 In Progress — Drop 3 complete, Drop 4 next

---

## Slicing Strategy

The project is sliced into **6 drops**, each delivering a **tiny, isolated, testable increment**. The guiding principles:

1. **Valuable alone** — each drop delivers something a real person can see, use, or verify, even if the full purchase flow isn't complete yet.
2. **Isolated** — each drop can be built and tested independently. External dependencies (credit provider, logistics) are stubbed until their drop arrives.
3. **Testable** — every drop has clear pass/fail acceptance criteria. No "it mostly works".
4. **De-risk early** — the hardest integrations (credit check, billing) come before polish, not after.

| Drop | Theme | Goal |
|------|-------|------|
| **Drop 1** | Static catalogue | A visitor can browse phones and see prices — proves the CMS + frontend pipeline |
| **Drop 2** | Phone detail & configuration | A visitor can view a phone, pick colour/storage, and see the price update — proves the product experience |
| **Drop 3** | Checkout flow (stubbed) | A new customer can walk through the full checkout with a mocked credit check — proves the purchase UX end-to-end |
| **Drop 4** | Live integrations | Real credit check, real fulfilment, real billing — the system can process a real order |
| **Drop 5** | Existing subscriber path | Authenticated subscribers get the streamlined checkout — proves the two-path model |
| **Drop 6** | Catalogue management & hardening | Commercial team can manage products; security, accessibility, monitoring, and legal sign-off complete — ready for launch |

---

## Drop 1: Static Catalogue

**Goal:** A visitor can navigate from vimla.se to `/phones`, see phone cards with images and instalment prices, and filter by brand.

**Deliverable:** The webshop entry point exists and is browsable. No detail pages, no checkout — just a functional listing powered by the CMS.

### What's in

| Component | Stories | Requirements | Details |
|-----------|---------|--------------|---------|
| **Nav entry point** | US-001 | FR-001, FR-002 | "Telefoner" link in vimla.se site header + hero section with value-proposition subtitle |
| **Phone listing page** | US-101 | FR-101, FR-102, FR-103, FR-107 | Card grid at `/phones`, each card shows image, model name, "fr. XXX kr/mån" price, "Välj →" button (links to detail page — 404 until Drop 2) |
| **Brand filter** | US-102 | FR-104, FR-106 | Alla / iPhone / Samsung tabs, empty-state message when no match |
| **Sort control** | US-103 | FR-105 | Dropdown: Populärast, Pris lägst, Pris högst |
| **CMS integration** | — | — | Headless CMS set up with ≥ 3 test phone models (placeholder images + real specs). Commercial team can see the CMS but does not manage it yet |
| **Responsive listing** | — | NFR-101 | 3-col / 2-col / 1-col grid at breakpoints defined in ux.md |

### What's NOT in

- No phone detail page (Drop 2)
- No checkout (Drop 3)
- No credit check (Drop 4)
- No existing-subscriber path (Drop 5)
- No catalogue management UI (Drop 6)
- Phone card "Välj →" links to `/phones/<slug>` which returns 404 until Drop 2

### Acceptance Criteria — Drop 1

- [x] "Telefoner" link is visible in vimla.se site header on all pages
- [x] Clicking "Telefoner" navigates to `/phones`
- [x] `/phones` displays a hero section with title and instalment value-proposition subtitle
- [x] ≥ 3 phone models are displayed as cards, each showing: image, model name, "fr. XXX kr/mån"
- [x] Clicking "iPhone" tab shows only iPhone models; clicking "Alla" shows all
- [x] Empty-filter state shows "Inga telefoner matchar ditt filter" with reset link
- [x] Sort dropdown re-orders cards (Populärast default, Pris lägst, Pris högst)
- [ ] Page loads within 2 seconds (NFR-101) — *awaiting Lighthouse audit*
- [x] Grid is responsive: 3 columns ≥ 1280px, 2 columns 768–1279px, 1 column < 768px

---

## Drop 2: Phone Detail & Configuration

**Goal:** A visitor can click a phone card, view its detail page, pick colour and storage, and see the instalment price update in real time.

**Deliverable:** The browse-to-detail flow works end-to-end. The visitor can configure a phone but cannot yet buy it.

### What's in

| Component | Stories | Requirements | Details |
|-----------|---------|--------------|---------|
| **Phone detail page** | US-201 | FR-201, FR-202, FR-206 | `/phones/<phone-slug>` with image gallery, specs table |
| **Colour picker** | US-202 | FR-203 | Swatches update image + colour label |
| **Storage picker** | US-202 | FR-204, FR-205 | Pills update price box (instalment, total, subscription hint) |
| **Price box** | US-202 | FR-205 | Monthly instalment + "i 36 månader" + total + subscription hint. Dynamic update within 200ms (NFR-103) |
| **Back link** | US-203 | FR-207 | "← Tillbaka till alla telefoner" preserves listing filter/sort state |
| **CTA button** | — | FR-208 | "Välj denna telefon →" links to `/phones/<slug>/checkout` (404 until Drop 3) |
| **404 handling** | US-201 edge case | — | Invalid slug shows 404 with "Tillbaka till alla telefoner" link |

### What's NOT in

- CTA button leads to 404 until Drop 3
- No checkout, no credit check, no order
- No phone comparison feature (HLR-9, Could)
- No accessibility audit yet (Drop 6)

### Acceptance Criteria — Drop 2

- [x] Clicking a phone card on the listing navigates to `/phones/<phone-slug>`
- [x] Detail page shows: image gallery (main + thumbnails), model name, colour swatches, storage pills, price box, specs table
- [x] Clicking a thumbnail updates the main image
- [x] Clicking a colour swatch updates the main image and colour name label
- [x] Clicking a storage pill updates the price box within 200 ms
- [x] Price box shows: monthly instalment, "i 36 månader", total device cost, subscription starting price
- [x] "← Tillbaka till alla telefoner" navigates to `/phones` with filters preserved
- [x] Invalid phone slug shows a 404 page with a link back to `/phones`
- [ ] Page loads within 2 seconds (NFR-102) — *awaiting Lighthouse audit*

---

## Drop 3: Checkout Flow (Stubbed)

**Goal:** A new customer can walk through the complete checkout — plan selection, personal details, consent, credit check (mocked), confirmation — end-to-end.

**Deliverable:** The entire purchase UX is testable with a stubbed credit provider. All form validation, business rules, and UI states work. No real money, no real credit check.

### What's in

| Component | Stories | Requirements | Details |
|-----------|---------|--------------|---------|
| **Start checkout** | US-301 | FR-208, FR-301, FR-302 | Checkout page with progress bar, phone summary with "Ändra" link |
| **Plan selection** | US-302 | FR-303, FR-307 | Radio buttons for Vimla plans, order summary panel updates live |
| **Personal details + consent** | US-303 | FR-305, FR-306, FR-308 | 5-field form, 2 consent checkboxes, inline validation, under-18 check (BR-202) |
| **Submit + loading state** | US-304 | FR-309 | Submit button disabled until valid, spinner during credit check, double-click prevention |
| **Approved flow (stubbed)** | US-401 | FR-401, FR-402 | Stubbed credit check always returns approved. Approved screen with "Bekräfta beställning →" |
| **Confirmation page** | US-402 | FR-404, FR-405 | Order number, cost breakdown, delivery estimate, "Gå till Mitt Vimla →" link |
| **Declined flow (stubbed)** | US-403 | FR-403 | Stubbed mode: trigger decline with a specific test personnummer. Empathetic message, "Tillbaka till telefoner" link |
| **Error/timeout flow (stubbed)** | US-404 | NFR-401 | Stubbed mode: trigger error with a specific test personnummer. Error message + retry button |
| **Instalment calculation** | — | BR-101, BR-103, BR-104 | Server-side price calculation: device ÷ 36 rounded up, total = instalment × 36, combined = instalment + subscription |
| **Single-instalment guard** | — | BR-302 | If customer has an active instalment, block checkout (stubbed check) |
| **Out-of-stock guard** | US-502 | FR-107 | Stock check before credit call; message if unavailable |
| **Order summary panel** | — | FR-307 | Sticky sidebar (desktop) / bottom bar (mobile) |

### What's NOT in

- Credit check is **stubbed** — no real provider integration (Drop 4)
- Fulfilment is **stubbed** — no real logistics call (Drop 4)
- Billing is **stubbed** — no real invoice update (Drop 4)
- No existing-subscriber path (Drop 5)
- No existing-subscriber plan display (FR-304, Drop 5)
- Confirmation email is not sent (Drop 4)
- No HTTPS enforcement yet (Drop 6)
- No PII security review yet (Drop 6)

### Acceptance Criteria — Drop 3

- [x] Clicking "Välj denna telefon →" on detail page navigates to `/phones/<slug>/checkout` with colour + storage preserved
- [x] Checkout shows 4-step progress bar, phone summary (Step 1) with "Ändra" link that returns to detail page
- [x] Plan selection (Step 2) shows radio buttons for ≥ 3 plans; selecting a plan updates order summary within 500 ms
- [x] Personal details form (Step 3) validates all 5 fields; inline errors on invalid input
- [x] Personnummer for person under 18 shows age-gate error (BR-202)
- [x] Submit button is disabled until all fields valid + both consents checked
- [x] On submit: spinner shown, button disabled, "Vi kontrollerar dina uppgifter…" displayed
- [x] Stubbed approved flow: shows ✅ screen, "Bekräfta beställning →" places order, redirects to confirmation page
- [x] Confirmation page shows order number, full cost breakdown, delivery estimate
- [x] Stubbed declined flow: trigger with test personnummer, shows ❌ empathetic message
- [x] Stubbed error flow: trigger with test personnummer, shows error message + retry button
- [x] Order summary panel visible throughout checkout; total = instalment + subscription (BR-104)
- [x] Out-of-stock check: if phone marked unavailable during checkout, shows stock message

---

## Drop 4: Live Integrations

**Goal:** Replace all stubs with real provider integrations. A real order can be placed — real credit check, real fulfilment trigger, real billing update, real confirmation email.

**Deliverable:** The first real test order can go through the system end-to-end (staging environment).

### What's in

| Component | Stories | Requirements | Details |
|-----------|---------|--------------|---------|
| **Credit check integration** | US-304, US-401, US-403, US-404 | FR-309, FR-401, FR-403, NFR-401 | Replace stub with real credit provider API (server-side). Handle approved/declined/error responses |
| **Fulfilment integration** | US-402 | FR-402 | On confirmed order, call logistics partner API to trigger shipment |
| **Billing integration** | — | BR-502, BR-503 | Add device instalment line item to subscriber invoice (new customer: create subscription + instalment; existing: add instalment to existing invoice) |
| **Stock sync** | — | BR-401, BR-402 | Background job polls logistics partner for stock levels every 5 min, updates CMS |
| **Confirmation email** | — | BR-504 | Send order confirmation email within 5 minutes of order placement |
| **Credit check timeout handling** | US-404 | NFR-401, NFR-104 | Real timeout handling (20 s), retry logic |
| **Ångerrätt information** | — | BR-304, NFR-601 | Display 14-day right-of-withdrawal info on confirmation page and in email |

### What's NOT in

- No existing-subscriber path (Drop 5)
- No catalogue management tool (Drop 6)
- No security hardening (Drop 6)
- No accessibility audit (Drop 6)
- No monitoring/alerting setup (Drop 6)

### Acceptance Criteria — Drop 4

- [ ] Real credit check API call returns approved/declined for real personnummer (staging)
- [ ] Approved order triggers fulfilment API call to logistics partner (verified in partner dashboard)
- [ ] Billing system shows device instalment line item on the customer's invoice (staging)
- [ ] Stock sync job runs every 5 minutes; out-of-stock models disappear from listing within 5 min
- [ ] Confirmation email received within 5 minutes of order placement
- [ ] Credit check timeout (> 20 s) shows error message with retry button (chaos test: block provider endpoint)
- [ ] Credit check round-trip completes within 15 seconds p95 (NFR-104)
- [ ] Ångerrätt (14-day withdrawal) information displayed on confirmation page
- [ ] End-to-end test: place order → credit approved → fulfilment triggered → instalment on invoice → email received (DoD #14)

---

## Drop 5: Existing Subscriber Path

**Goal:** Authenticated Vimla subscribers get a streamlined checkout: plan pre-filled, personal details pre-populated, instalment added to existing invoice.

**Deliverable:** The "two paths, one shop" model works — subscribers experience a faster checkout than prospects.

### What's in

| Component | Stories | Requirements | Details |
|-----------|---------|--------------|---------|
| **Subscriber detection** | US-501 | FR-501, FR-304 | Reuse Mitt Vimla auth to detect logged-in subscriber at checkout |
| **Plan pre-fill** | US-501 | FR-304, FR-501 | Step 2 shows current plan as read-only (no radio buttons) |
| **Details pre-fill** | US-501 | FR-502 | Step 3 pre-fills name, address, email, phone from account profile |
| **Existing invoice billing** | US-501 | FR-503, BR-502 | On order, instalment added to existing invoice — no new subscription created |
| **Missing profile fields** | US-501 edge case | — | If account is missing address/email, those fields are left empty for manual entry |

### What's NOT in

- No subscriber self-service for instalment management (Phase 2)
- No multi-instalment support (BR-302 limits to 1 active)
- No catalogue management (Drop 6)

### Acceptance Criteria — Drop 5

- [ ] Authenticated subscriber sees their plan name + price as read-only text in Step 2 (no radio buttons)
- [ ] Subscriber's name, address, email, phone are pre-filled in Step 3 (personnummer still empty)
- [ ] On order confirmation, instalment is added to existing invoice — no new subscription created
- [ ] Subscriber with missing profile data (e.g. no email) sees those fields empty for manual entry
- [ ] Subscriber with an active instalment sees "Du har redan en aktiv delbetalning" and cannot proceed (BR-302)
- [ ] Subscriber flow is measurably faster: fewer fields to fill, no plan selection step

---

## Drop 6: Catalogue Management & Launch Hardening

**Goal:** Commercial team can manage products independently. All security, accessibility, regulatory, and operational criteria met. Ready for public launch.

**Deliverable:** The full system passes the project-level Definition of Done. Launch gate cleared.

### What's in

| Component | Stories | Requirements | Details |
|-----------|---------|--------------|---------|
| **Catalogue management** | US-601 | FR-601, FR-602, FR-603 | CMS dashboard configured for commercial team: add/edit/remove models, set status, set sort order |
| **Security hardening** | — | NFR-201, NFR-202, NFR-203, NFR-204 | HTTPS enforcement, PII handling review, credential isolation audit, GDPR compliance |
| **Accessibility audit** | — | NFR-301, NFR-302, NFR-303, NFR-304, NFR-305 | axe-core automated audit + manual keyboard + screen reader testing |
| **Legal sign-off** | — | NFR-601, NFR-204 | Konsumentkreditlagen, GDPR, ångerrätt, SECCI form — legal review and approval |
| **Monitoring & alerting** | — | NFR-403 | Uptime monitoring (99.5% target), checkout error alerting, stock sync failure alerting |
| **Measurement instrumentation** | — | — | Analytics for: attach rate, checkout funnel, credit approval rate, conversion per step (measurement.md KPIs) |
| **CS team briefing** | — | — | Customer service trained on hardware orders, returns, ångerrätt, credit declines |
| **Phase 1 catalogue population** | — | — | Commercial team adds ≥ 3 iPhone + ≥ 3 Samsung models with real images, specs, prices |
| **Early termination info** | — | BR-303 | Customer service documentation: early buyout handled by financing partner |

### What's NOT in

- No phone comparison feature (HLR-9, Could — Phase 2)
- No trade-in program (HLR-10, Could — Phase 2)
- No outright purchase (HLR-11, Could — Phase 2)
- No 12/24-month instalment options (Phase 2)
- No multi-instalment support (Phase 2)

### Acceptance Criteria — Drop 6

- [ ] Commercial team member can add a phone model via CMS (name, brand, images, specs, colours, storage, price)
- [ ] Commercial team member can set model status to active / out of stock / inactive
- [ ] Commercial team member can set sort-order; listing reflects the configured order
- [ ] All pages served over HTTPS; HTTP requests redirect to HTTPS
- [ ] Zero PII in browser local storage / session storage / cookies (verified by inspection)
- [ ] Credit provider credentials not present in client JavaScript bundle (verified by static analysis)
- [ ] WCAG 2.1 AA audit passed (axe-core: zero critical/serious violations)
- [ ] Keyboard navigation works on all webshop pages (Tab, Enter, Space, Arrow)
- [ ] Legal review signed off (Konsumentkreditlagen, GDPR, distance-selling)
- [ ] Uptime monitoring active with alerting configured
- [ ] Analytics tracking live for all KPIs in measurement.md
- [ ] CS team briefed and sign-off received
- [ ] Catalogue has ≥ 3 iPhone + ≥ 3 Samsung models with real product data
- [ ] DoD criteria #1–#14 all verified ✅

---

## Summary: Story-to-Drop Mapping

| Story | Description | D1 | D2 | D3 | D4 | D5 | D6 |
|-------|-------------|:--:|:--:|:--:|:--:|:--:|:--:|
| US-001 | Discover the phone webshop | ● | | | | | |
| US-101 | Browse available phones | ● | | | | | |
| US-102 | Filter phones by brand | ● | | | | | |
| US-103 | Sort phones by price | ● | | | | | |
| US-201 | View phone details | | ● | | | | |
| US-202 | Select colour and storage | | ● | | | | |
| US-203 | Navigate back to listing | | ● | | | | |
| US-301 | Start checkout | | | ● | | | |
| US-302 | Select a subscription plan | | | ● | | | |
| US-303 | Enter personal details + consent | | | ● | | | |
| US-304 | Submit order for credit check | | | ●stub | ●live | | |
| US-401 | Confirm approved order | | | ●stub | ●live | | |
| US-402 | See order confirmation | | | ●stub | ●live | | |
| US-403 | Handle declined credit check | | | ●stub | ●live | | |
| US-404 | Handle credit check timeout | | | ●stub | ●live | | |
| US-501 | Checkout as existing subscriber | | | | | ● | |
| US-502 | Handle out-of-stock during checkout | | | ● | | | |
| US-601 | Manage phone catalogue | | | | | | ● |

**Legend:** ● = delivered in this drop. ●stub = delivered with stubbed integrations. ●live = upgraded to real integrations.

---

## Estimated Effort

| Drop | Scope | Rough Estimate | Key Dependencies |
|------|-------|---------------|------------------|
| **Drop 1** | Nav + listing + CMS setup + filters + sort | 2–3 weeks | D-07 (vimla.se tech compatibility) |
| **Drop 2** | Detail page + gallery + pickers + price box | 1–2 weeks | CMS populated with test data (Drop 1) |
| **Drop 3** | Checkout flow + form validation + stubbed integrations | 3–4 weeks | — (no external dependencies, all stubbed) |
| **Drop 4** | Credit check + fulfilment + billing + stock sync + email | 3–4 weeks | D-01 (credit provider), D-02 (logistics), D-03 (distributors), D-04 (billing) |
| **Drop 5** | Subscriber auth + pre-fill + existing-invoice billing | 1–2 weeks | D-06 (Mitt Vimla auth) |
| **Drop 6** | CMS config + security + a11y + legal + monitoring + catalogue | 2–3 weeks | D-05 (legal sign-off), D-08 (CS readiness) |
| **Total** | | **12–18 weeks** | Parallel dependency resolution during Drops 1–3 |

> **Note on parallelism:** Drops 1–3 have no external partner dependencies (all stubbed). This means the 4 critical external dependencies (D-01 through D-04) can be resolved in parallel during Drops 1–3 build time, unblocking Drop 4 when the team reaches it.
