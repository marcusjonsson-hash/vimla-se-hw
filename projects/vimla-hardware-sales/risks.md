# Risks & Dependencies — Vimla Hardware Sales

> **State:** Design
> **Last updated:** 2026-04-08
> **Status:** ⬜ Not Done

---

## Risks

Carried forward from [Initial Risk Assessment in idea.md](idea.md) and refined with Design-phase detail.

| ID | Risk | Likelihood | Impact | Mitigation | Status |
|----|------|------------|--------|------------|--------|
| R-01 | **Inventory risk** — unsold stock ties up capital | Medium | High | Phase 1 uses drop-ship / consignment model via logistics partner — Vimla does not hold inventory. Expand to stocked model only with proven demand | Mitigated (by design) |
| R-02 | **Credit/financing liability** — bad debt from instalment plans | Medium | High | Third-party financing partner (e.g. Klarna / Svea) assumes credit risk. Vimla does not perform credit assessments directly | Mitigated (by partner model) |
| R-03 | **Logistics complexity** — returns, warranty, DOA (dead on arrival) devices increase operational load | High | Medium | Partner with an established fulfilment provider with defined SLAs for returns and warranty. CS team briefed on hardware support processes (DoD #12) | Open |
| R-04 | **Brand risk** — hardware quality issues (defective devices, slow delivery) reflect negatively on Vimla | Medium | Medium | Curate a limited, premium-only catalogue (iPhone + Samsung flagships). Vet logistics partner carefully before launch | Open |
| R-05 | **Technical complexity** — integrating webshop, credit check, billing, and fulfilment into existing vimla.se infrastructure | Medium | High | Use headless CMS for catalogue (no custom product DB), server-side credit check, and extend existing billing (not replace). Time-box technical spikes early in Build | Open |
| R-06 | **Regulatory** — Konsumentkreditlagen (consumer credit), distansavtalslagen (distance selling), GDPR compliance for PII handling | Medium | High | Engage legal early (Design phase). Partner with a licensed credit provider. Legal sign-off is a hard gate in DoD (#8) | Open |
| R-07 | **36-month lock-in perception** — customers may view the 36-month commitment negatively | Medium | Medium | Position as "spread the cost" (not "lock-in"). Display total cost transparently (BR-103, FR-205). Highlight ångerrätt (14-day withdrawal) prominently in checkout | Open |
| R-08 | **Limited Phase 1 catalogue** — only iPhone + Samsung may not attract all customer segments | Low | Low | Phase 1 is hypothesis validation with two high-demand brands. Expand catalogue in Phase 2 based on data (measurement.md follow-up #3) | Accepted |
| R-09 | **Cannibalisation** — low-margin hardware dilutes overall profit margin | Low | Medium | Focus value case on instalment revenue + retention (36-month churn reduction), not device margin. Monitor hardware gross margin monthly (measurement.md KPI #2) | Accepted |
| R-10 | **Credit provider API reliability** — timeouts or outages block all checkout completions | Medium | High | Implement error handling with retry button (NFR-401, US-404). Monitor credit check error rate as a leading indicator. Evaluate backup provider if primary provider SLA is not met | Open |
| R-11 | **Billing system extension fails** — existing billing system cannot support a device instalment line item | Low | High | Conduct a billing-system spike early in Build (Assumption #4 in requirements.md). If extension is not feasible, escalate immediately — this is a project blocker | Open |
| R-12 | **Low checkout conversion** — customers browse but don't complete checkout (credit check friction, 36-month hesitation) | Medium | High | Monitor checkout funnel weekly (measurement.md leading indicator #4). A/B test checkout copy and flow. Ensure total cost transparency reduces anxiety rather than increasing it | Open |

---

## Dependencies

| ID | Dependency | Type | Owner | Status | Impact if blocked |
|----|------------|------|-------|--------|-------------------|
| D-01 | **Credit/financing provider contract** — signed agreement with a licensed provider (e.g. Klarna, Svea, Collector) that offers 36-month consumer instalment terms and provides a credit check API | External | Finance / Legal | Not Started | **Project blocker.** No instalment offering is possible without a financing partner. All checkout functionality (FR-300, FR-400) is blocked |
| D-02 | **Logistics/fulfilment partner agreement** — signed agreement with a fulfilment provider for warehousing, shipping, returns, and warranty handling | External | Ops / Commercial | Not Started | **Project blocker.** Cannot ship devices (FR-402, HLR-5). Webshop can be built but not launched |
| D-03 | **Apple & Samsung distributor agreements** — access to devices at wholesale pricing via authorised distributors | External | Commercial | Not Started | **Project blocker.** No devices to sell. Business case viability depends on wholesale pricing |
| D-04 | **Billing system extension** — Vimla's existing billing system must support a device instalment line item on the monthly invoice | Internal | Engineering / Billing team | Not Started | **Project blocker.** Cannot invoice customers correctly (FR-503, BR-502). Workaround: manual invoicing (not scalable) |
| D-05 | **Legal review and sign-off** — Konsumentkreditlagen compliance, GDPR data processing agreement, distance-selling terms, SECCI form | Internal | Legal / Compliance | Not Started | **Launch blocker.** Build can proceed, but launch is blocked until legal approves (DoD #8, NFR-601) |
| D-06 | **Mitt Vimla authentication reuse** — existing subscriber auth system can identify logged-in subscribers in the webshop checkout | Internal | Engineering | Not Started | **Feature blocker.** Existing-subscriber path (FR-500) is blocked. New-customer path still works. Degrades to "all customers treated as new" |
| D-07 | **vimla.se technology compatibility** — the existing site stack can host new pages (/phones, /phones/slug, /checkout, /order/confirmation) without a replatform | Internal | Engineering | Not Started | **Project blocker.** If a replatform is needed, timeline and cost increase dramatically (Assumption #5 in requirements.md) |
| D-08 | **Customer service readiness** — CS team trained on hardware order processes (order status, returns, ångerrätt, credit declines, warranty) | Internal | CS Lead | Not Started | **Launch blocker.** Build can proceed, but launch without CS readiness risks poor customer experience (DoD #12) |
