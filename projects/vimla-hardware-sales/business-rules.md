# Business Rules — Vimla Hardware Sales

> **State:** Design
> **Last updated:** 2026-04-08
> **Status:** ⬜ Not Done

---

## Quality Standard

Every rule satisfies:

| Check | Rule |
|-------|------|
| **Atomic** | One rule per row. If "and" joins two conditions with different outcomes, split. |
| **Testable** | The rule can be verified by a finite procedure with an explicit expected outcome. |
| **Unambiguous** | One interpretation only. No "appropriate", "reasonable", "as needed". |
| **Complete** | States both the condition AND what happens when it is met or violated. |
| **Traceable** | Every rule traces to ≥ 1 requirement and informs ≥ 1 acceptance criterion. |

---

## Traceability

Business rules trace back to [Requirements](requirements.md) and inform [User Stories](user-stories.md) acceptance criteria.

---

## Rules

### BR-100: Instalment Calculation

*Traces to: FR-102, FR-205, FR-307*

| ID | Rule | Type | When Violated |
|----|------|------|---------------|
| BR-101 | Monthly instalment = device retail price ÷ 36, rounded up to nearest whole SEK | Computation | If the formula yields a non-integer, rounding down would under-collect over 36 months — always round up |
| BR-102 | The "starting price" shown on a phone card on the listing page = the monthly instalment of the cheapest available storage variant for that model | Computation | If no storage variants are active, the phone model shall not appear on the listing page (see BR-401) |
| BR-103 | Total device cost displayed in the price box = monthly instalment × 36 | Computation | Mismatch between instalment × 36 and displayed total erodes customer trust — values must be arithmetically consistent |
| BR-104 | Total monthly cost displayed in the order summary = monthly device instalment + monthly subscription price | Computation | If the two line items do not sum to the displayed total, the checkout shall block submission and log an error |

### BR-200: Credit Check & Eligibility

*Traces to: FR-305, FR-306, FR-309, FR-401, FR-403*

| ID | Rule | Type | When Violated |
|----|------|------|---------------|
| BR-201 | A credit check shall be performed for every instalment order — no exceptions, regardless of customer type (prospect or existing subscriber) | Constraint | If the credit check is bypassed, the order shall not be placed — the system shall display an error and prevent submission |
| BR-202 | The customer must be at least 18 years old at the time of order (derived from personnummer) | Constraint | If the customer is under 18, the system shall display "Du måste vara minst 18 år för att ansöka om delbetalning" and the submit button shall remain disabled |
| BR-203 | Both consent checkboxes (instalment terms + credit check) must be checked before the order can be submitted | Constraint | If either checkbox is unchecked, the submit button remains disabled — no partial consent is accepted |
| BR-204 | When the credit check returns "approved", the customer must explicitly click "Bekräfta beställning →" to place the order — approval alone does not place the order | Constraint | If the confirmation step is skipped (e.g. auto-submission), the order is invalid — two-step confirmation is mandatory for a 36-month commitment |
| BR-205 | When the credit check returns "declined", no order shall be created and no financial commitment shall be recorded | Constraint | If an order is created despite a decline, it must be automatically voided and flagged for review |

### BR-300: Instalment Terms & Lifecycle

*Traces to: FR-503, NFR-601*

| ID | Rule | Type | When Violated |
|----|------|------|---------------|
| BR-301 | The instalment period is fixed at 36 months — no shorter or longer terms are available in Phase 1 | Constraint | If a customer requests a different term, the system shall not offer alternatives — 36 months is the only option |
| BR-302 | A customer may have at most one active device instalment plan at a time (Phase 1 limitation) | Constraint | If a customer with an active instalment attempts to purchase a second device, the system shall display "Du har redan en aktiv delbetalning. Kontakta kundtjänst för mer information." and block checkout submission |
| BR-303 | Early termination (paying off remaining balance before 36 months) is handled by the financing partner, not by Vimla's webshop — the webshop does not offer a self-service buyout | Constraint | If a customer asks to pay off early, customer service directs them to the financing partner's process |
| BR-304 | The customer has a 14-day right of withdrawal (ångerrätt) from the date of device delivery, per Swedish distance-selling law (Distansavtalslagen) | Constraint | If withdrawal is requested within 14 days: the device must be returned unused, the instalment plan is cancelled, and any payments made are refunded. If the device is used or damaged, the right of withdrawal may be limited per the financing partner's terms |
| BR-305 | The instalment plan begins on the date the order is confirmed (credit check approved + customer confirmation), not on the delivery date | Computation | If billing starts before confirmation, the charge is premature and must be reversed |

### BR-400: Catalogue & Stock

*Traces to: FR-107, FR-601, FR-602*

| ID | Rule | Type | When Violated |
|----|------|------|---------------|
| BR-401 | Only phone models with catalogue status "active" AND at least one storage variant in stock shall appear on the listing page | Constraint | If an "active" model has zero in-stock variants, it shall be hidden from the listing (treated as out-of-stock) |
| BR-402 | When a phone model's status is changed to "out of stock" or "inactive", it shall be removed from the listing page within 5 minutes | Constraint | If the model remains visible after 5 minutes, customers may attempt to order unavailable products — cache must be invalidated |
| BR-403 | The sort-order position set by the commercial team determines the display order for the "Populärast" sort; lower numbers appear first | Inference | If two models share the same sort-order value, they are sub-sorted alphabetically by model name |

### BR-500: Order Processing

*Traces to: FR-402, FR-404, FR-503*

| ID | Rule | Type | When Violated |
|----|------|------|---------------|
| BR-501 | An order number is generated in the format `VH-YYYYMMDD-NNN` where YYYY-MM-DD is the order date and NNN is a zero-padded sequential counter per day | Computation | If the counter exceeds 999 in a single day, the format extends to NNNN (4 digits) — no orders shall be rejected due to counter overflow |
| BR-502 | For existing subscribers, the device instalment shall appear as a separate line item on their existing monthly invoice — no new subscription or separate invoice shall be created | Constraint | If a new subscription is created, it must be voided and the instalment merged onto the existing invoice |
| BR-503 | For new customers (prospects), the system shall create both a new Vimla subscription and a device instalment plan — both appear on a single combined invoice | Constraint | If the subscription and instalment are invoiced separately, customer support must merge them |
| BR-504 | A confirmation email shall be sent to the customer's provided email address within 5 minutes of order placement | Constraint | If the email fails to send, the order remains valid but a support alert is triggered for manual follow-up |

---

## Edge Cases

| # | Scenario | Expected Behaviour | Traces to |
|---|----------|-------------------|-----------|
| 1 | Customer reaches checkout but the selected phone goes out of stock before submission | Display "Tyvärr är [model] inte längre tillgänglig" and link back to listing | BR-401, US-502 |
| 2 | Customer with an active instalment plan tries to buy a second phone | Display "Du har redan en aktiv delbetalning" and block submission | BR-302 |
| 3 | Credit check provider returns an unexpected/unknown status (neither approved nor declined) | Treat as error — display the generic error message with retry button | BR-201, US-404 |
| 4 | Customer is exactly 18 years old today (birthday = today based on personnummer) | Allowed — the rule is "at least 18", which includes the 18th birthday | BR-202 |
| 5 | Customer requests ångerrätt (withdrawal) on day 14 at 23:59 | Valid — the 14-day period includes the entirety of day 14 | BR-304 |
| 6 | Order placed on a day where 999 orders already exist | Order number extends to 4-digit counter (VH-YYYYMMDD-1000) | BR-501 |
