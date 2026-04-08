# Requirements — Vimla Hardware Sales

> **State:** Design
> **Last updated:** 2026-04-08
> **Status:** ⬜ Not Done

---

## Quality Standard

Every requirement in this document satisfies the **7 quality attributes** (IEEE 830 / ISO 29148):

| Attribute | Key Question |
|-----------|-------------|
| **Clear** | Can the intended audience understand it without tribal knowledge? |
| **Testable** | Can a finite procedure determine pass/fail objectively? |
| **Atomic** | Does it express exactly one capability or constraint? |
| **Traceable** | Does it link back to its origin and forward to tests? |
| **Unambiguous** | Does it have only one possible interpretation? |
| **Prioritized** | Is its importance labelled with rationale? |
| **Context-linked** | Are actor, preconditions, and constraints stated? |

---

## Traceability

Requirements trace back to [High-Level Requirements in idea.md](idea.md) and forward to [User Stories](user-stories.md).

---

## Functional Requirements

### FR-000: Webshop Entry Point & Navigation

*Traces to: HLR-1*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-001 | The vimla.se site header shall include a "Telefoner" navigation link visible on all pages; clicking it shall navigate the visitor to the phone listing page at `/phones` | Must | Visitors must be able to discover and reach the webshop from anywhere on vimla.se — without a visible entry point, the webshop has zero organic traffic |
| FR-002 | The phone listing page shall display a hero section above the phone grid containing: a page title ("Telefoner") and a value-proposition subtitle communicating the instalment offer (e.g. "Köp mobil med Vimla — betala från XXX kr/mån med 36 månaders delbetalning") | Must | The hero section frames the offer and anchors the instalment message before the visitor starts browsing |

### FR-100: Phone Catalogue & Browsing

*Traces to: HLR-1, HLR-3*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-101 | The system shall display a phone listing page at `/phones` showing all phone models marked as "active" in the catalogue, rendered as cards in a responsive grid | Must | Core webshop entry point — HLR-1 |
| FR-102 | Each phone card shall display: one product image, model name, and the starting monthly instalment price formatted as "fr. XXX kr/mån" (calculated from the cheapest storage variant ÷ 36 months) | Must | Instalment-first framing — design principle #1 (total cost transparency) |
| FR-103 | Each phone card shall include a "Välj →" call-to-action button that navigates the visitor to that phone's detail page at `/phones/<phone-slug>` | Must | Standard e-commerce pattern — browse to detail |
| FR-104 | The listing page shall display brand filter tabs (Alla, iPhone, Samsung); selecting a tab shall immediately filter the visible phone cards to the selected brand, with "Alla" selected by default | Must | Phase 1 has two brands — simple single-select filter |
| FR-105 | The listing page shall display a sort dropdown with options: Populärast (default), Pris lägst först, Pris högst först; changing the selection shall re-order the visible phone cards immediately | Should | Helps visitors find phones matching their budget |
| FR-106 | When no phone models match the active brand filter, the system shall display the message "Inga telefoner matchar ditt filter" with a link that resets the filter to "Alla" | Must | Prevents dead-end browsing states |
| FR-107 | The system shall display only phone models that are marked as "active" and "in stock" in the catalogue — models marked as "out of stock" or "inactive" shall not appear on the listing page | Must | Prevents ordering of unavailable products |

### FR-200: Phone Detail Page

*Traces to: HLR-1, HLR-6*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-201 | The system shall display a phone detail page at `/phones/<phone-slug>` containing: image gallery, model name, colour picker, storage picker, price box, specs table, and a primary CTA button | Must | Standard product detail page — HLR-1 |
| FR-202 | The image gallery shall show one main product image and a thumbnail strip of 3–5 images; clicking a thumbnail shall replace the main image with the clicked image | Must | Customers expect to see the phone from multiple angles |
| FR-203 | The colour picker shall display one circular swatch per available colour; selecting a swatch shall: (a) update the main image to show the phone in that colour, (b) update the colour name label below the swatches | Must | Colour is a primary purchase criterion for phones |
| FR-204 | The storage picker shall display one pill-shaped toggle button per available storage capacity (e.g. 128 GB, 256 GB, 512 GB, 1 TB); selecting a capacity shall update the instalment price in the price box | Must | Storage directly determines the device price |
| FR-205 | The price box shall display four values: (a) monthly instalment amount in large text, (b) "i 36 månader" label, (c) total device cost labelled "Totalt: X kr" (monthly instalment × 36), (d) cheapest subscription price shown as "+ abonnemang fr. X kr/mån" | Must | Total cost transparency — HLR-6 |
| FR-206 | The specs table shall display key specifications for the selected model in a two-column (label / value) format, including at minimum: screen size, processor/chip, camera configuration, battery life, and 5G support | Must | Customers compare specs before choosing a phone |
| FR-207 | The detail page shall display a "← Tillbaka till alla telefoner" back link that navigates to `/phones` | Must | Standard navigation — prevents feeling trapped |
| FR-208 | The primary CTA "Välj denna telefon →" shall navigate the visitor to `/phones/<phone-slug>/checkout`, passing the selected colour and storage as URL parameters | Must | Bridges browsing to purchase |

### FR-300: Checkout Flow

*Traces to: HLR-2, HLR-4, HLR-6, HLR-7*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-301 | The system shall display a checkout page at `/phones/<phone-slug>/checkout` with a 4-step progress bar showing: Välj telefon → Abonnemang → Dina uppgifter → Bekräfta | Must | Confidence at every step — design principle #4 |
| FR-302 | Step 1 (Välj telefon) shall display a collapsed summary row showing the selected phone model, colour, storage, and monthly instalment price, with an "Ändra" link that navigates back to the detail page | Must | Allows correction without restarting |
| FR-303 | Step 2 (Abonnemang) shall display a radio-button list of all available Vimla subscription plans, each showing: plan name, data allowance (GB), and monthly price (kr/mån), when the visitor is not authenticated as an existing subscriber | Must | New customers must select a plan — HLR-2 |
| FR-304 | Step 2 (Abonnemang) shall display the subscriber's current plan name and monthly price as a read-only summary (no radio buttons) when the visitor is authenticated as an existing Vimla subscriber | Should | Existing subscribers skip plan selection — HLR-7 |
| FR-305 | Step 3 (Dina uppgifter) shall collect five fields: personnummer, full name, street address, email, and phone number — all fields are mandatory | Must | Required for credit check (personnummer) and delivery |
| FR-306 | Step 3 shall display two consent checkboxes: (a) "Jag godkänner villkoren för 36 mån delbetalning" and (b) "Jag godkänner kreditupplysning" — both must be checked before the submit button activates | Must | Legal requirement — Konsumentkreditlagen consent |
| FR-307 | The checkout page shall display a persistent order summary panel showing: phone model + monthly instalment, subscription plan + monthly cost, total monthly cost (instalment + subscription), and delivery cost — the panel shall update within 500 ms when the visitor changes plan selection | Must | Total cost transparency — HLR-6 |
| FR-308 | The submit button labelled "Genomför kreditkontroll och beställ →" shall remain disabled (greyed out, `cursor: not-allowed`) until all five form fields pass validation and both consent checkboxes are checked | Must | Prevents incomplete submissions |
| FR-309 | On submit, the system shall send the personnummer and order details to the credit check provider via a server-side API call and display a loading state with spinner and the text "Vi kontrollerar dina uppgifter…" until a response is received | Must | Credit check is mandatory — HLR-4 |

### FR-400: Credit Check & Order Completion

*Traces to: HLR-4, HLR-5*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-401 | When the credit check returns **approved**, the system shall display: ✅ icon, order summary (phone, plan, total monthly cost), delivery estimate "1–3 arbetsdagar", and a "Bekräfta beställning →" button | Must | Two-step confirmation prevents accidental 36-month commitments |
| FR-402 | When the visitor clicks "Bekräfta beställning →" on the approved screen, the system shall place the order with the fulfilment partner and redirect to `/order/confirmation/<order-id>` | Must | Finalises the purchase |
| FR-403 | When the credit check returns **declined**, the system shall display: ❌ icon, the message "Tyvärr blev din kreditansökan inte godkänd", a customer-service contact link, and a "Tillbaka till telefoner" link — no decline reason shall be displayed | Must | Empathetic UX; specific decline reasons are credit-provider policy |
| FR-404 | The order confirmation page shall display: 🎉 icon, order number (format `VH-YYYYMMDD-NNN`), phone model + colour + storage, subscription plan, monthly cost breakdown (instalment + subscription = total), delivery address, estimated delivery window, and a note that a confirmation email has been sent | Must | Complete closure of the purchase journey |
| FR-405 | The order confirmation page shall display a "Gå till Mitt Vimla →" link pointing to the customer's account dashboard | Should | Natural next step after purchase |

### FR-500: Existing Subscriber Path

*Traces to: HLR-7*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-501 | When an authenticated Vimla subscriber reaches the checkout page, the system shall display their current subscription plan as a read-only summary and skip the plan selection radio buttons | Should | Reduces friction — HLR-7 |
| FR-502 | When an authenticated subscriber reaches Step 3, the system shall pre-fill name, address, email, and phone number from the subscriber's account profile (personnummer still required for credit check) | Should | Fewer fields = higher completion rate |
| FR-503 | On successful order for an existing subscriber, the system shall add the 36-month device instalment as a new line item on the subscriber's existing monthly invoice — no new subscription shall be created | Should | Single combined invoice — HLR-7 |

### FR-600: Catalogue Management

*Traces to: HLR-8*

| ID | Requirement | Priority | Rationale |
|----|-------------|----------|-----------|
| FR-601 | An authorised member of the commercial team shall be able to add a new phone model to the catalogue (model name, brand, images, specs, colours, storage variants, wholesale cost, retail instalment price per variant) without engineering involvement | Should | Operational autonomy — HLR-8 |
| FR-602 | An authorised member of the commercial team shall be able to set a phone model's status to "active", "out of stock", or "inactive" — only "active" models appear on the listing page | Should | Prevents overselling while retaining data |
| FR-603 | An authorised member of the commercial team shall be able to set the sort-order position of each phone model to control the display order in the "Populärast" sort | Should | Commercial control over product prominence |

---

## Non-Functional Requirements

### NFR-100: Performance

| ID | Requirement | Priority | Metric | Conditions | Verification |
|----|-------------|----------|--------|------------|--------------|
| NFR-101 | The phone listing page shall load within 2 seconds | Must | p95 ≤ 2 000 ms (Time to First Contentful Paint) | Up to 15 active phone models, desktop on 4G connection | Lighthouse audit |
| NFR-102 | The phone detail page shall load within 2 seconds | Must | p95 ≤ 2 000 ms (TFCP) | Gallery images lazy-loaded below fold | Lighthouse audit |
| NFR-103 | Colour/storage picker interactions shall update the price box within 200 ms | Should | ≤ 200 ms from click event to updated DOM | Client-side calculation, no server round-trip | Performance profiling |
| NFR-104 | The credit check round-trip (submit → result page) shall complete within 15 seconds | Must | p95 ≤ 15 000 ms | Dependent on credit provider SLA | End-to-end test against provider sandbox |

### NFR-200: Security

| ID | Requirement | Priority | Metric | Conditions | Verification |
|----|-------------|----------|--------|------------|--------------|
| NFR-201 | All webshop pages shall be served over HTTPS (TLS 1.2 or higher) | Must | 100% of requests on HTTPS | All environments | Certificate check + HTTP→HTTPS redirect test |
| NFR-202 | Personnummer and personal details shall not be stored in browser local storage, session storage, or cookies | Must | Zero PII in client-side storage after form submission | All browsers | Browser dev-tools inspection |
| NFR-203 | Credit check API calls shall be executed server-side only — provider credentials shall never appear in the client-side JavaScript bundle | Must | Zero credential exposure in client bundle | All production builds | Static analysis of compiled bundle |
| NFR-204 | Personal data processing shall comply with GDPR (lawful basis, data minimisation, right to erasure) | Must | Legal review sign-off | Before launch | Legal audit |

### NFR-300: Accessibility

| ID | Requirement | Priority | Metric | Conditions | Verification |
|----|-------------|----------|--------|------------|--------------|
| NFR-301 | All webshop pages shall meet WCAG 2.1 Level AA for colour contrast | Must | Contrast ratio ≥ 4.5:1 (normal text), ≥ 3:1 (large text) | All text/background combinations | axe-core automated audit |
| NFR-302 | All interactive elements shall be operable via keyboard (Tab, Enter, Space, Arrow keys) | Must | 100% of interactive elements reachable and activatable | All webshop pages | Manual keyboard testing |
| NFR-303 | Product images shall have descriptive alt text following the format "[Model] in [Colour], [angle]" | Must | 100% of product images have alt text | All catalogue entries | Automated HTML audit |
| NFR-304 | Dynamic price changes (triggered by colour/storage selection) shall be announced to screen readers via `aria-live="polite"` on the price box container | Should | Price change announced within 1 second | VoiceOver (macOS), NVDA (Windows) | Screen reader testing |

### NFR-400: Reliability

| ID | Requirement | Priority | Metric | Conditions | Verification |
|----|-------------|----------|--------|------------|--------------|
| NFR-401 | If the credit check provider is unreachable or times out, the system shall display the message "Något gick fel. Försök igen om en stund." with a "Försök igen" retry button — no unhandled exception or blank screen | Must | Error message displayed within 20 seconds of timeout | Provider unreachable | Chaos test (block provider endpoint) |
| NFR-402 | If a phone model's images fail to load (404 or network error), the system shall display a placeholder image; the rest of the page shall remain functional | Should | Placeholder rendered, no layout breakage | Broken image URLs | Manual test |
| NFR-403 | The webshop shall maintain 99.5% uptime during business hours (08:00–22:00 CET) measured monthly | Must | ≥ 99.5% availability | Excludes scheduled maintenance windows announced ≥ 24 h in advance | Uptime monitoring (e.g. Pingdom, UptimeRobot) |

### NFR-500: Scalability

| ID | Requirement | Priority | Metric | Conditions | Verification |
|----|-------------|----------|--------|------------|--------------|
| NFR-501 | The listing page shall load within 2 seconds with up to 50 phone models | Should | p95 ≤ 2 000 ms TFCP with 50 models | Load test with synthetic catalogue data | Load test |
| NFR-502 | The checkout system shall handle 100 concurrent sessions without queueing or error responses | Should | p95 response ≤ 3 s under 100 concurrent sessions | Excluding external credit-check latency | Load test |

### NFR-600: Regulatory

| ID | Requirement | Priority | Metric | Conditions | Verification |
|----|-------------|----------|--------|------------|--------------|
| NFR-601 | The instalment offering shall comply with Konsumentkreditlagen (Swedish Consumer Credit Act): total cost disclosure, effective interest rate (if any), right-of-withdrawal information, and standardised European Consumer Credit Information (SECCI) form | Must | Legal review sign-off before launch | All instalment-related pages and confirmation emails | Legal audit |
| NFR-602 | All customer-facing text shall be in Swedish with `lang="sv"` set on the HTML element | Must | 100% of UI text in Swedish | All webshop pages | Manual review |

---

## Constraints

| # | Constraint | Rationale |
|---|-----------|----------|
| 1 | Phase 1 supports 36-month instalment plans only — no outright purchase, no 12- or 24-month options | Limits complexity for initial launch; additional payment methods deferred to future phases |
| 2 | Phase 1 catalogue is limited to latest iPhone and Samsung Galaxy flagship models (~10–15 SKUs across colour/storage variants) | Proves demand with two high-volume premium brands before expanding |
| 3 | Credit check and instalment financing shall be handled by a licensed third-party provider — Vimla shall not perform credit assessments or assume credit risk directly | Regulatory compliance (Konsumentkreditlagen) and financial risk transfer |
| 4 | The webshop shall be part of vimla.se (same domain, consistent brand identity) — not a separate site or subdomain | Customers must perceive the webshop as native to Vimla |
| 5 | Physical inventory and fulfilment shall be handled by a logistics partner — Vimla does not hold stock in Phase 1 | Avoids capital tied up in inventory and warehousing costs |

---

## Assumptions

| # | Assumption | Impact if wrong |
|---|-----------|----------------|
| 1 | A credit/financing provider (e.g. Klarna, Svea, Collector) will partner with Vimla and offer 36-month consumer instalment terms with acceptable commission rates | No instalment offering possible — project blocked. Mitigation: begin provider outreach immediately in Design |
| 2 | Apple and Samsung authorised distributors will supply devices to Vimla's fulfilment partner at competitive wholesale prices | Margins too thin or negative — business case fails. Mitigation: negotiate distributor terms in parallel |
| 3 | The credit check provider's API response time is ≤ 15 seconds for p95 of requests | Checkout abandonment increases. Mitigation: design a fallback async-approval flow (email confirmation) if latency exceeds target |
| 4 | Vimla's existing billing system can be extended to add a device-instalment line item to the monthly invoice | Separate billing required — increases scope and cost significantly. Mitigation: conduct billing-system spike early in Build |
| 5 | vimla.se's technology stack supports adding new pages without a full replatform | Replatform needed — timeline and cost increase dramatically. Mitigation: validate with Engineering before committing to Build |
| 6 | Existing Vimla subscriber authentication ("Mitt Vimla" login) can be reused for the webshop checkout flow to identify existing subscribers | Custom auth required — adds scope. Mitigation: confirm with Engineering during Design |
