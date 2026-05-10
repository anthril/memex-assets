---
title: "Meta Ads audit — <account>"
type: audit
status: draft
created: {{Created}}
updated: {{Created}}
channel: meta-feed
---

# Meta Ads audit — `<account>`

**Date:** {{Created}}
**Auditor:**
**Business Manager ID / Ad Account ID:**
**Date range under review:**

> Walk every checkbox. For each red flag, file a `finding` page; for each one you'll act on, follow up with a `recommendation`.

## 1. Account & access hygiene

- [ ] Business Manager owns the ad account, page, pixel, catalog, and domain
- [ ] No personal-profile assets connected
- [ ] User access roles reviewed (no ex-staff / over-permissioned partners)
- [ ] 2FA required for all admins
- [ ] Domain verified (Aggregated Event Measurement)

## 2. Pixel + Conversions API parity

- [ ] Pixel firing on every key page (PageView, ViewContent, AddToCart, InitiateCheckout, Purchase / Lead)
- [ ] CAPI deployed (server-side or via CAPI Gateway / Stape / GTM server)
- [ ] Event Match Quality ≥ 7 across primary events
- [ ] Deduplication keys (`event_id`) consistent between pixel + CAPI
- [ ] AEM event priorities ordered correctly (highest-value first within the 8 slots)
- [ ] Test Events tab clean — no warnings

## 3. Attribution & measurement

- [ ] Attribution setting deliberate (1d-click vs 7d-click, view-through on/off)
- [ ] Comparison window set when running tests
- [ ] Conversions API deduplication verified for 30 days
- [ ] Cost cap / bid cap in use only when appropriate

## 4. Campaign structure

- [ ] Naming convention enforced (channel / objective / audience / placement / creative concept)
- [ ] Objective matches goal (Sales / Leads / Engagement / Awareness)
- [ ] Advantage+ Shopping campaigns separated from manual prospecting / retargeting
- [ ] Lookalike vs interest stack vs broad clearly delineated
- [ ] Audience overlap (Audience Overlap tool) acceptable (<30% by default)
- [ ] Frequency caps reviewed for retargeting

## 5. Creative

- [ ] Creative testing matrix in place (concept × format × audience)
- [ ] At least one running test per ad set
- [ ] Format mix: feed image, feed video, story / reels vertical, carousel, collection (catalog where applicable)
- [ ] Dynamic creative used for early concept testing only
- [ ] Aspect ratios + safe zones respected per placement
- [ ] Brand-safe + accessibility (captions on video) defaults

## 6. Budgeting & bidding

- [ ] CBO (Advantage Campaign Budget) vs ABO decision matches the test goal
- [ ] Daily vs lifetime budget chosen deliberately
- [ ] Min/max budget guardrails set (Cost cap when needed)
- [ ] Learning-phase health: no ad set stuck in "Learning Limited" without a plan

## 7. Placements & optimisation

- [ ] Advantage+ placements default unless test data justifies manual
- [ ] No legacy placements (e.g. Instant Articles, in-stream pre-roll on weak audiences) bleeding budget
- [ ] Optimization event matches goal (e.g. don't optimise Purchases at <50/wk per ad set)

## 8. Catalog (if applicable)

- [ ] Catalog feed parity with website (price, availability, sale price)
- [ ] Microdata or product feed schema validated
- [ ] Product set segmentation (best sellers, low stock, new arrivals)
- [ ] Dynamic Product Ads firing for retargeting + acquisition

## 9. Brand safety + compliance

- [ ] Brand safety controls reviewed (Inventory filter, blocklists)
- [ ] Special Ad Categories declared where required (Credit / Employment / Housing / Politics)
- [ ] Disclaimers / required disclosures present in copy

## Findings

<!-- Link to filed `finding` pages under audits/<date>-<account>/findings/ -->
