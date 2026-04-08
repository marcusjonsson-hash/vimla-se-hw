# Definition of Done — Vimla Hardware Sales

> **State:** Design
> **Last updated:** 2026-04-08
> **Status:** ⬜ Not Done

---

## Project-Level Definition of Done

**Progress update (2026-04-08):** Drop 3 (Checkout Flow, stubbed) is implemented and verified with passing unit tests. Project-level DoD remains open pending Drops 4–6 integrations, audits, and launch-readiness gates.

All of the following must be true before this project can be considered **Done** (moved to Post-launch):

| # | Criterion | Verified | Notes |
|---|-----------|----------|-------|
| 1 | All "Must" functional requirements (FR-1xx through FR-5xx) are implemented and working in production | ⬜ | Core webshop flow: browse → detail → checkout → credit check → confirmation |
| 2 | All "Must" non-functional requirements are met (NFR-101–104, NFR-201–204, NFR-301–303, NFR-401, NFR-403, NFR-601–602) | ⬜ | Performance, security, accessibility, reliability, regulatory |
| 3 | All business rules (BR-100 through BR-500) are enforced and verified by test cases | ⬜ | Instalment calculation, credit check, eligibility, catalogue rules, order processing |
| 4 | Credit check integration is live with the selected financing partner, tested with real API credentials in a staging environment | ⬜ | Cannot launch without a functioning credit check |
| 5 | Logistics/fulfilment integration is live — orders placed in the webshop result in devices shipped to customers | ⬜ | End-to-end fulfilment verified with test orders |
| 6 | Billing system extended to support device instalment line items on monthly invoices — verified for both new and existing subscribers | ⬜ | Combined invoice (subscription + instalment) must be correct |
| 7 | Phase 1 catalogue is populated with at least 3 iPhone models and 3 Samsung Galaxy models, each with images, specs, colour/storage variants, and pricing | ⬜ | Commercial team has added products via CMS |
| 8 | Legal review completed and signed off — Konsumentkreditlagen compliance, GDPR, distance-selling terms, SECCI form | ⬜ | Hard gate — cannot launch without legal approval (NFR-601, NFR-204) |
| 9 | WCAG 2.1 Level AA accessibility audit passed on all webshop pages (automated axe-core + manual keyboard testing) | ⬜ | NFR-301, NFR-302 |
| 10 | Security review completed — no PII in client storage, credit API credentials server-side only, HTTPS enforced | ⬜ | NFR-201, NFR-202, NFR-203 |
| 11 | Uptime monitoring configured and verified (99.5% target, NFR-403) | ⬜ | Alerting in place before launch |
| 12 | Customer service team briefed on hardware order support processes (orders, returns, ångerrätt, credit-check declines) | ⬜ | Operational readiness |
| 13 | Measurement instrumentation in place — analytics tracking for KPIs defined in measurement.md (attach rate, ARPU uplift, checkout conversion, credit approval rate) | ⬜ | Cannot evaluate hypothesis without measurement |
| 14 | End-to-end test order completed successfully in production (place order → receive device → see instalment on invoice) | ⬜ | Final smoke test before public launch |

---

## Per-Story Definition of Done

Every user story is considered done when:

- [ ] All acceptance criteria are met and verified (manually or by automated test)
- [ ] Edge cases listed in the story are handled and verified
- [ ] Code is reviewed and approved by at least one other engineer
- [ ] No regressions introduced in existing vimla.se functionality
- [ ] Responsive behaviour verified at all four breakpoints (≥1280, 1024–1279, 768–1023, <768)
- [ ] Accessibility requirements met for the story's interactive elements (keyboard nav, focus indicators, aria attributes)
- [ ] Swedish copy reviewed for correctness (no English fallback text in production)
