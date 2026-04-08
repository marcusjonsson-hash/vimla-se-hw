# Code Review Findings — Slice 3

> **Date:** 2026-04-08
> **Review format:** Round-table (PM · UX Lead · Lead Developer · Lead Architect)
> **Scope:** Drop 3 implementation (Checkout Flow, stubbed credit check, order confirmation)
> **Reviewed against:** `requirements.md`, `business-rules.md`, `user-stories.md`, `ux.md`, `design.md`, `technical-design-drop3.md`, `definition-of-done.md`

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 1 |
| 🟠 Major | 5 |
| 🟡 Minor | 4 |
| 🔵 Improvement | 3 |
| **Total** | **13** |

---

## Findings Index

| ID | Sev | Role | Finding | File(s) | Spec Ref |
|----|-----|------|---------|---------|----------|
| S3-F01 | 🔴 | Lead Architect | `confirmOrder` can be called without prior approved credit check (server trust gap) | `app/src/app/phones/[slug]/checkout/actions.ts` | BR-201, BR-204, BR-205, FR-402 |
| S3-F02 | 🟠 | Lead Dev | Missing `try/catch` around Server Action calls can surface unhandled runtime errors in UI | `components/sections/CheckoutFlow.tsx` | NFR-401, US-304 edge case |
| S3-F03 | 🟠 | PM | Out-of-stock mid-checkout path does not show required specific stock message/link | `components/sections/CheckoutFlow.tsx`, `components/ui/CreditResultScreen.tsx` | US-502, BR-401, technical-design-drop3 |
| S3-F04 | 🟠 | UX Lead | Checkout uses full site navbar; wireframe/design calls for minimal logo-only checkout header | `app/src/app/phones/[slug]/checkout/page.tsx` | technical-design-drop3 page composition, ux.md |
| S3-F05 | 🟠 | UX Lead | Consent link inside label (`href="#"`) risks accidental checkbox toggle + page jump | `components/ui/ConsentCheckboxes.tsx` | FR-306, NFR-302 |
| S3-F06 | 🟠 | PM | Not all CTA buttons in Drop 3 routes carry `data-analytics-*` attributes | `app/src/app/phones/[slug]/checkout/not-found.tsx`, `app/src/app/order/confirmation/[orderId]/not-found.tsx` | Drop 3 delivery checklist (analytics attributes) |
| S3-F07 | 🟡 | Lead Dev | Progress step 1 is rendered as clickable but has no effect (inconsistent interaction semantics) | `components/ui/ProgressBar.tsx`, `components/sections/CheckoutFlow.tsx` | FR-301, NFR-302 |
| S3-F08 | 🟡 | UX Lead | Error variant always says generic message; under-18/validation errors from action are not surfaced contextually | `components/sections/CheckoutFlow.tsx`, `components/ui/CreditResultScreen.tsx` | FR-305, FR-308, NFR-401 |
| S3-F09 | 🟡 | Lead Dev | `creditCheck` tests incur real 2s delay in three tests; test suite can be much faster with fake timers | `lib/creditCheck.test.ts` | Engineering efficiency |
| S3-F10 | 🟡 | PM | Confirmation copy says email sent even if email send is not implemented in Drop 3 (stub realism mismatch) | `components/sections/OrderConfirmation.tsx` | FR-404 note + Drop 3 scope |
| S3-F11 | 🔵 | Lead Architect | Duplicate checkout composition chrome (`Navbar`) suggests route-segment layout opportunity | `app/src/app/phones/[slug]/checkout/page.tsx`, `loading.tsx`, `not-found.tsx` | App Router maintainability |
| S3-F12 | 🔵 | Lead Dev | No direct unit tests for `actions.ts` contract behavior (validation/error mapping) | `app/src/app/phones/[slug]/checkout/actions.ts` | DoD per-story verification |
| S3-F13 | 🔵 | UX Lead | Plan selector relies on native radio keyboard behavior; explicit arrow-key support not documented/tested | `components/ui/PlanSelector.tsx` | technical-design-drop3 accessibility table |

---

## Detailed Findings

### 🔴 Critical

#### S3-F01: `confirmOrder` does not enforce credit-approved precondition

**Role:** Lead Architect  
**Problem:** `confirmOrder` validates personal data but does not verify that a successful credit check was completed in this session. A forged client call can create an order directly.  
**Why it matters:** Violates mandatory business sequencing (credit check before order placement).  
**Recommendation:**
1. Add a server-side credit-approval token/ref to `submitCreditCheck` response.
2. Require and verify that token/ref in `confirmOrder`.
3. Reject order creation when status is not approved.

---

### 🟠 Major

#### S3-F02: Missing defensive error handling in checkout async flow

**Role:** Lead Developer  
**Problem:** `runCreditCheck` and `handleConfirmOrder` await Server Actions without `try/catch`; thrown errors can break flow and miss user-friendly messaging.  
**Recommendation:** Wrap both calls in `try/catch`, set controlled UI state, and show Swedish fallback copy per NFR-401.

#### S3-F03: Out-of-stock scenario not aligned to specified UX copy/path

**Role:** PM  
**Problem:** Mid-flow out-of-stock currently maps to generic error state; design specifies explicit “inte längre tillgänglig” handling and link back to `/phones`.  
**Recommendation:** Add dedicated stock-unavailable variant in `CreditResultScreen` or separate state branch.

#### S3-F04: Checkout header does not match focused checkout design

**Role:** UX Lead  
**Problem:** Full nav appears in checkout; intended flow uses minimal logo-first header to reduce distractions.  
**Recommendation:** Add a checkout-specific navbar variant (`logoOnly`) and apply in checkout + confirmation routes.

#### S3-F05: Consent terms link interaction risk

**Role:** UX Lead  
**Problem:** Terms link is nested inside checkbox label with `href="#"`; interaction may toggle checkbox and/or jump to top unexpectedly.  
**Recommendation:** Move link outside checkbox label text or prevent default explicitly and route to a real terms page.

#### S3-F06: Missing analytics attributes on all Drop 3 CTA paths

**Role:** PM  
**Problem:** Several CTA buttons (not-found screens) miss `data-analytics-action`/`section`, while checklist requires broad CTA instrumentation.  
**Recommendation:** Add consistent analytics attributes for all CTA buttons and key sections in checkout/confirmation routes.

---

### 🟡 Minor

#### S3-F07: ProgressBar step semantics are inconsistent

**Role:** Lead Developer  
**Problem:** Completed step 1 appears clickable but callback ignores it; users get no effect despite enabled control.  
**Recommendation:** Either handle step 1 click explicitly or render it non-clickable/disabled.

#### S3-F08: Action error messages are not surfaced contextually

**Role:** UX Lead  
**Problem:** Action can return specific validation messages (e.g., age), but client maps all non-approved/non-declined to generic error state.  
**Recommendation:** Store and display `CreditCheckResult.message` in error view.

#### S3-F09: Credit check tests are slow by design

**Role:** Lead Developer  
**Problem:** Three tests run real 2-second waits.  
**Recommendation:** Use fake timers for status tests too, reserving one timing test for delay semantics.

#### S3-F10: Confirmation copy implies real email send in a stub drop

**Role:** PM  
**Problem:** Text says confirmation email was sent, while delivery is stubbed in Drop 3.  
**Recommendation:** Rephrase to “Du får en bekräftelse via e-post i nästa steg” or mark as stub/demo copy in acceptance artifacts.

---

### 🔵 Improvements

#### S3-F11: Introduce route-segment layout for checkout subtree

**Role:** Lead Architect  
**Suggestion:** Use `app/src/app/phones/[slug]/checkout/layout.tsx` for shared chrome across `page/loading/not-found`.

#### S3-F12: Add tests for Server Action contracts

**Role:** Lead Developer  
**Suggestion:** Add focused tests for `submitCreditCheck` and `confirmOrder` (validation rejection, approved flow, failure handling).

#### S3-F13: Accessibility proof for radio keyboard behavior

**Role:** UX Lead  
**Suggestion:** Add explicit keyboard interaction test notes/cases to test-cases artifact (arrow, tab, space behavior).

---

## Round-table Verdict

- **PM:** Slice 3 is functionally complete and demo-ready, but two acceptance-level behavior details need tightening (stock-unavailable UX and full analytics instrumentation).
- **UX Lead:** UI quality is strong overall; most risk is interaction polish and focus/flow strictness for checkout context.
- **Lead Developer:** Code is readable and test-backed at lib level, with clear architecture for Drop 4 swap-out; missing defensive error handling is the largest technical UX gap.
- **Lead Architect:** Architecture direction is sound; the only critical concern is server-side enforcement of credit-before-order sequencing.

**Release recommendation for Slice 3:** ✅ **Accept with follow-up backlog**, but treat `S3-F01` as **must-fix before any environment beyond internal demo/staging**.
