# Idea — Vimla Hardware Sales

> **State:** Idea
> **Last updated:** 2026-04-08

---

## Problem / Opportunity Statement

Vimla currently operates as a mobile-only MVNO, offering SIM-only subscription plans through vimla.se. Customers who want a new phone must purchase it separately from a third party and then pair it with their Vimla subscription. This creates several problems:

| # | Problem | Impact |
|---|---------|--------|
| 1 | **No phone webshop on vimla.se** | Customers leave the Vimla ecosystem to buy phones, increasing churn risk and reducing lifetime value |
| 2 | **Competitive disadvantage** | Most competing operators (Telia, Tre, Telenor) let customers buy phones on instalments bundled with a plan — Vimla loses prospects who want a combined deal |
| 3 | **Revenue ceiling** | SIM-only revenue is capped by subscription pricing alone; there is no device margin or financing revenue stream |
| 4 | **Customer friction at sign-up** | New customers who don't already own an unlocked device face a higher barrier to switching to Vimla |
| 5 | **No instalment option** | The lump-sum cost of a flagship phone (SEK 15 000–20 000+) is a barrier; competitors spread this over 24–36 months |

**Who is affected:** Prospective and existing Vimla customers, the commercial/growth team (limited acquisition levers), and the product team (no hardware integration in the current platform).

---

## Hypothesis

> **We believe that** launching a phone webshop on vimla.se where customers can browse, select, and buy mobile phones on 36-month instalment plans bundled with a Vimla subscription
> **for** existing Vimla subscribers and new prospects visiting vimla.se
> **will result in** increased average revenue per user (ARPU), improved new-customer conversion rate, and reduced churn among instalment-locked customers
> **because** a 36-month instalment plan removes the upfront cost barrier of flagship devices, matches what competing operators offer, and creates a 3-year retention anchor that deepens the customer relationship.

**Scope — phased approach:**
- **Phase 1 (this project):** Latest iPhone models (e.g. iPhone 17 lineup) and latest Samsung Galaxy S and Galaxy Z series. 36-month instalment plans only.
- **Vision (future phases):** Expand to all phone brands, accessories, routers, and additional payment options (outright purchase, 12/24-month plans).

**Disconfirm condition:** If, after 6 months of availability, hardware-attached subscription sign-ups represent less than 5% of new activations and hardware gross margin is negative, the initiative should be reconsidered.

---

## Strategic Alignment

| Goal | How this project supports it |
|------|------------------------------|
| Grow subscriber base | Hardware bundles remove a key acquisition barrier — prospects can get device + plan in one place |
| Increase ARPU | Hardware sales and instalment financing add a new revenue stream on top of subscription fees |
| Reduce churn | Customers on device instalment plans have higher switching costs and longer retention windows |
| Strengthen brand positioning | Offering hardware positions Vimla as a full-service operator, not just a budget SIM-only alternative |
| Expand addressable market | Reaches the segment of customers who only consider operators that sell devices |

---

## High-Level Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| HLR-1 | A webshop on vimla.se where customers can browse available phones with images, specs, colours, and storage options | Must |
| HLR-2 | Customers can select a phone and purchase it on a 36-month instalment plan bundled with a Vimla subscription | Must |
| HLR-3 | Phase 1 catalogue includes the latest iPhone models (e.g. iPhone 17 / 17 Pro / 17 Pro Max) and latest Samsung Galaxy models (e.g. Galaxy S26 / S26+ / S26 Ultra, Galaxy Z Fold / Z Flip) | Must |
| HLR-4 | The system performs a credit check before approving an instalment plan | Must |
| HLR-5 | Orders integrate with a logistics/fulfilment partner for shipping, tracking, and returns | Must |
| HLR-6 | The monthly instalment amount is clearly displayed alongside the subscription cost so the customer sees the total monthly cost | Must |
| HLR-7 | Existing Vimla subscribers can add a phone instalment to their current subscription without re-subscribing | Should |
| HLR-8 | The catalogue is manageable by the commercial team without engineering involvement (CMS or admin tool) | Should |
| HLR-9 | Customers can compare phones side-by-side (specs, price, monthly cost) | Could |
| HLR-10 | Customers can trade in an old device for credit toward a new purchase | Could |
| HLR-11 | Customers can purchase a phone outright (one-time payment) without an instalment plan | Could |

---

## Business Case Impact

| Metric | Estimate |
|--------|----------|
| New revenue stream (device instalment payments) | UNSPECIFIED — requires commercial modelling based on attach rate × average device price ÷ 36 months |
| Estimated ARPU uplift | UNSPECIFIED — depends on attach rate and device mix; a SEK 18 000 phone on 36 months = SEK 500/month on top of subscription |
| 36-month retention anchor | Customers on active instalment plans are contractually bound for 36 months, significantly reducing voluntary churn |
| Customer acquisition uplift | 10–20% increase in conversion for prospects who currently leave due to no device offering (estimate) |
| Churn reduction | 5–10% reduction among customers on active instalment plans (estimate based on industry benchmarks) |
| Phase 1 catalogue size | ~10–15 SKUs (iPhone + Samsung flagship models × storage/colour variants) |
| Cost to build (platform) | UNSPECIFIED — requires technical assessment of webshop, payments, fulfilment integration |
| Ongoing operational cost | UNSPECIFIED — logistics, inventory risk, customer support for hardware issues |

---

## Major Technology Impact

- **Phone webshop on vimla.se** — Vimla.se currently has no product catalogue, shopping cart, or checkout flow. A webshop must be built or integrated (build vs. headless commerce platform like Centra, Shopify, or similar).
- **Product catalogue & CMS** — Phone models with images, specs, colours, storage variants, and pricing. Manageable by the commercial team.
- **36-month instalment billing** — The current billing system handles subscriptions only. It must be extended to support a combined monthly invoice: subscription fee + device instalment. The 36-month instalment amount must be calculated per device and displayed clearly in the webshop.
- **Credit check integration** — 36-month instalment commitments require a credit check before approval. Integration with a credit/financing provider (e.g. Klarna, Svea, Collector) who can perform the check and optionally assume credit risk.
- **Logistics & fulfilment** — Integration with a logistics partner for warehousing, shipping, delivery tracking, returns, and warranty handling.
- **Inventory management** — Real-time stock visibility for the ~10–15 Phase 1 SKUs to avoid overselling; integration with Apple/Samsung distributor systems.
- **Subscription + device bundling** — The checkout flow must support two paths: (a) new customer → pick phone + pick subscription plan + credit check → order, and (b) existing subscriber → pick phone + credit check → add instalment to current subscription.

---

## Initial Risk Assessment

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | Inventory risk — unsold stock ties up capital | Medium | High | Start with a drop-ship or consignment model to avoid holding inventory; expand to stocked model only with proven demand |
| 2 | Credit/financing liability — bad debt from instalment plans | Medium | High | Use a third-party financing partner (e.g. Klarna) who assumes credit risk |
| 3 | Logistics complexity — returns, warranty, DOA devices | High | Medium | Partner with an established fulfilment provider; define clear return/warranty SLAs |
| 4 | Brand risk — hardware quality issues reflect on Vimla | Medium | Medium | Curate a limited, high-quality catalogue rather than a wide assortment; vet suppliers carefully |
| 5 | Technical complexity — integrating e-commerce into an MVNO platform | Medium | High | Evaluate headless commerce platforms to minimise custom build; time-box a technical spike in Design |
| 6 | Regulatory — consumer credit regulations (Konsumentkreditlagen) for 36-month instalment plans | Medium | High | Engage legal early; partner with a licensed credit provider to handle compliance |
| 7 | 36-month lock-in perception — customers may view the commitment negatively | Medium | Medium | Position as "spread the cost" rather than lock-in; ensure transparent total-cost-of-ownership display |
| 8 | Limited Phase 1 catalogue — only iPhone + Samsung may not be enough to attract all segments | Low | Low | Validate demand with two premium brands first; expand catalogue in Phase 2 based on data |
| 9 | Cannibalisation — low-margin hardware dilutes overall margin | Low | Medium | Focus on instalment revenue and retention value rather than device margin |

---

## Stakeholder Identification

| Stakeholder | Role | Interest |
|------------|------|----------|
| Commercial / Growth team | Owner, Driver | Revenue growth, customer acquisition, pricing & assortment strategy |
| Product team | Contributor | Platform integration, user experience, feature prioritisation |
| Engineering | Contributor | Technical feasibility, e-commerce integration, billing system changes |
| Finance | Approver | Business case validation, margin analysis, financing partner selection |
| Legal / Compliance | Approver | Consumer credit law, warranty obligations, terms & conditions |
| Customer Service | Informed | Support processes for hardware orders, returns, troubleshooting |
| Marketing | Contributor | Launch campaigns, positioning, hardware landing pages |
| Supply Chain / Ops | Contributor | Fulfilment partner selection, logistics setup, inventory management |
| Leadership | Approver | Strategic alignment, investment approval |
