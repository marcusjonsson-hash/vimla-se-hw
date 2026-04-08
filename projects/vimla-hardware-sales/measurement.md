# Measurement & Follow-up — Vimla Hardware Sales

> **State:** Design
> **Last updated:** 2026-04-08
> **Status:** ⬜ Not Done

---

## Measurement Plan

> 📋 This section serves as the **Measurement Plan** artifact defined in the Design state of the project lifecycle.

### Success Criteria

Tied directly to the [hypothesis and disconfirm condition in idea.md](idea.md):

> *"If, after 6 months of availability, hardware-attached subscription sign-ups represent less than 5% of new activations and hardware gross margin is negative, the initiative should be reconsidered."*

| # | KPI | Target | How to measure | When to measure |
|---|-----|--------|---------------|----------------|
| 1 | **Hardware attach rate** (hardware-attached sign-ups ÷ total new activations) | ≥ 5% of new activations include a device instalment | Count new subscriptions with an associated device instalment vs. total new subscriptions | Monthly, starting month 1 post-launch |
| 2 | **Hardware gross margin** | ≥ 0% (not negative) | (Instalment revenue – wholesale device cost – logistics cost – financing partner commission) ÷ instalment revenue | Monthly, starting month 3 (once enough orders exist) |
| 3 | **ARPU uplift for hardware customers** | Hardware customers' ARPU ≥ 1.5× SIM-only ARPU | Average monthly revenue per hardware customer (subscription + instalment) vs. average SIM-only customer | Monthly, starting month 1 |
| 4 | **Checkout conversion rate** | ≥ 30% of visitors who reach the checkout page complete the credit check | Orders submitted ÷ checkout page visits | Weekly during first 3 months, then monthly |
| 5 | **Credit approval rate** | ≥ 70% of credit check submissions are approved | Approved checks ÷ total checks submitted | Weekly during first 3 months, then monthly |

### Leading Indicators

Early signals (during Build or early Launch) that suggest we're on track:

| # | Indicator | What it tells us |
|---|-----------|-----------------|
| 1 | Phone listing page traffic (visits/week) | Are customers discovering the webshop? Is marketing driving traffic? |
| 2 | Phone detail page click-through rate (listing → detail) | Are the phone cards compelling enough to drive interest? |
| 3 | Checkout start rate (detail → checkout) | Are pricing and product presentation converting interest into intent? |
| 4 | Checkout abandonment rate per step (Step 1 → 2 → 3 → submit) | Where are customers dropping off? Plan selection? Personal details? Consent? |
| 5 | Credit check error/timeout rate | Is the credit provider integration reliable? |
| 6 | Average time from checkout start to order confirmation | Is the flow fast enough or is friction too high? |

### Lagging Indicators

Longer-term metrics to validate the hypothesis:

| # | Indicator | Target | Timeframe |
|---|-----------|--------|-----------|
| 1 | Churn rate among hardware customers vs. SIM-only customers | Hardware customer churn ≤ 50% of SIM-only churn | 6 months post-launch |
| 2 | Customer lifetime value (CLTV) for hardware customers | CLTV ≥ 2× SIM-only CLTV | 12 months (modelled at 6 months) |
| 3 | Net Promoter Score (NPS) impact | NPS for hardware customers ≥ NPS for SIM-only customers | 6 months post-launch |
| 4 | Return rate (devices returned under ångerrätt) | ≤ 5% of orders | 3 months post-launch |
| 5 | Customer service ticket volume for hardware orders | ≤ 0.3 tickets per order | 3 months post-launch |

---

## Follow-up Plan

> 📋 This section serves as the **Follow-up Plan** artifact defined in the Design state of the project lifecycle.

### Post-Launch Monitoring

| # | What to monitor | How | Who | Frequency |
|---|----------------|-----|-----|-----------|
| 1 | Hardware attach rate | Analytics dashboard (new subscriptions with device instalment ÷ total) | Product / Commercial | Weekly for first 3 months, then monthly |
| 2 | Checkout funnel conversion per step | Analytics funnel (listing → detail → checkout → submit → confirmed) | Product | Weekly for first 3 months |
| 3 | Credit approval/decline ratio | Credit provider dashboard + internal analytics | Finance / Product | Weekly |
| 4 | Hardware gross margin | Finance report (revenue – costs) | Finance | Monthly from month 3 |
| 5 | Fulfilment SLA compliance | Logistics partner reporting (% delivered within 1–3 days) | Ops | Weekly |
| 6 | Customer service ticket volume (hardware-related) | CS ticketing system filtered by "hardware" tag | CS Lead | Weekly |
| 7 | Webshop uptime | Monitoring dashboard (Pingdom / UptimeRobot) | Engineering | Continuous (alerting) |

### Decision Points

| Timeframe | Decision | Criteria |
|-----------|----------|----------|
| 4 weeks post-launch | Continue / iterate / pause | Attach rate trending toward ≥ 5%; checkout conversion ≥ 20%; no critical UX or technical issues |
| 3 months post-launch | Expand catalogue or hold | If attach rate ≥ 5% and margin ≥ 0%, begin planning Phase 2 (more brands, storage options). If below, investigate root cause before expanding |
| 6 months post-launch | Validate or disconfirm hypothesis | Apply the disconfirm condition from idea.md. If attach rate < 5% AND margin negative → reconsidering the initiative. If one metric is met, investigate the other before deciding |
| 12 months post-launch | Evaluate CLTV and churn impact | Are hardware customers retaining better than SIM-only? Is the 36-month anchor working? |

### Known Follow-up Items

Things we know we'll want to address after launch but are explicitly out of scope for Phase 1:

| # | Item | Priority | Rationale for deferral |
|---|------|----------|----------------------|
| 1 | Outright purchase option (one-time payment) | Should | Simplifies Phase 1 to instalment-only; add once the core flow is proven |
| 2 | 12-month and 24-month instalment options | Should | More terms = more complexity in pricing, billing, and credit rules; validate 36-month first |
| 3 | Additional phone brands (Google Pixel, OnePlus, etc.) | Should | Phase 1 validates demand with premium flagships; expand based on data |
| 4 | Accessories (cases, chargers, headphones) | Could | Low-margin, high-SKU — adds catalogue management burden without testing the core hypothesis |
| 5 | Trade-in program (old device for credit) | Could | Requires device valuation logic, reverse logistics, and refurbishment partnerships |
| 6 | Phone comparison feature (side-by-side specs) | Could | Nice-to-have for browsing; not needed with ~10–15 SKUs in Phase 1 |
| 7 | Multi-device / multi-instalment support | Could | Phase 1 limits to 1 active instalment (BR-302); expand if demand warrants it |
| 8 | Self-service early buyout (pay off remaining balance online) | Could | Deferred to financing partner's portal; consider in-app buyout if customer demand is high |

---

## Team Ownership

> 📋 This section serves as the **Team Ownership** artifact defined in the Design state of the project lifecycle.

| Area | Owner | Responsibility |
|------|-------|----------------|
| **Product & requirements** | Product | Define and prioritise requirements, user stories, and acceptance criteria. Accept delivered drops |
| **CMS & catalogue setup** | Engineering | Set up headless CMS, schema design, test data population. Handover to Commercial for catalogue management in Drop 6 |
| **Frontend (listing + detail)** | Engineering | Implement phone listing page, detail page, responsive grid, pickers, price box |
| **Frontend (checkout)** | Engineering | Implement multi-step checkout form, validation, consent, order summary |
| **Backend (Order API)** | Engineering | Implement order orchestration: stock validation → credit check → fulfilment → billing |
| **Credit provider integration** | Engineering + Finance | Engineering implements API integration; Finance owns the commercial contract (D-01) |
| **Logistics partner integration** | Engineering + Ops | Engineering implements fulfilment API; Ops owns partner relationship and SLAs (D-02) |
| **Billing extension** | Engineering | Extend existing billing system to support device instalment line items (D-04) |
| **Stock sync job** | Engineering | Background job polling logistics partner for stock levels every 5 min |
| **Subscriber auth (Mitt Vimla)** | Engineering | Reuse existing auth to detect logged-in subscribers in checkout (D-06) |
| **UX design & validation** | UX | Wireframes, interaction states, responsive behaviour. Validate usability during Build |
| **Legal & regulatory** | Legal | Konsumentkreditlagen, GDPR, ångerrätt, SECCI review and sign-off (D-05) |
| **Distributor agreements** | Commercial | Negotiate supplier agreements with Apple and Samsung distributors (D-03) |
| **Measurement & analytics** | Product + Engineering | Product defines KPIs; Engineering instruments tracking (Drop 6) |
| **Security review** | Engineering | PII handling, credential isolation, HTTPS enforcement (Drop 6) |
| **Accessibility audit** | UX + Engineering | axe-core + manual keyboard/screen reader testing (Drop 6) |
| **CS readiness** | CS Lead | Customer service trained on hardware orders, returns, credit declines (D-08) |
| **Post-launch monitoring** | Product + Engineering | Product monitors KPIs and decision points; Engineering monitors uptime and error rates |
