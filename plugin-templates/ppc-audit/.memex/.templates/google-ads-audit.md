---
title: "Google Ads audit — <account>"
type: audit
status: draft
created: {{Created}}
updated: {{Created}}
channel: google-search
---

# Google Ads audit — `<account>`

**Date:** {{Created}}
**Auditor:**
**Account ID:**
**Date range under review:**

> Walk every checkbox. For each red flag, file a `finding` page (link it from the row). For each finding, file a `recommendation` page once you've decided what to do.

## 1. Account structure

- [ ] Campaign types correctly split (Search / Shopping / Performance Max / Demand Gen / Display)
- [ ] Naming convention applied consistently
- [ ] Budgets aligned with priority + share-of-voice goal
- [ ] Bidding strategy choice fits goal (tCPA / tROAS / Max Conv / Manual CPC) — note any "Maximize Clicks" outliers
- [ ] Location targets explicit (presence + interest), not "presence or interest"
- [ ] Languages set deliberately (not just "all")
- [ ] Ad-rotation set to "Optimize" unless intentionally testing
- [ ] Ad schedules reviewed against conversion-by-hour data

## 2. Conversion tracking & GA4 import

- [ ] Primary conversions clearly distinguished from secondary
- [ ] No duplicate-counting between native pixel + GA4 import
- [ ] Enhanced conversions enabled where applicable (and consented)
- [ ] Cross-domain tracking working if applicable
- [ ] Offline conversion import for high-value leads
- [ ] Consent Mode v2 deployed (GDPR markets)
- [ ] Attribution model set deliberately (data-driven by default)
- [ ] Conversion windows match sales cycle

## 3. Keywords & match types

- [ ] Match-type mix reviewed (broad share, exact share, phrase share)
- [ ] Negative keyword lists applied at account + campaign + ad-group level
- [ ] No internal cannibalisation between exact and broad ad groups
- [ ] Search-terms report sampled for the last 30/90 days — irrelevant terms negativised
- [ ] Brand keywords isolated from generic keywords
- [ ] Quality Score audited; Below-average expected CTR / ad relevance / LP experience entries triaged

## 4. Ad copy & assets

- [ ] At least 3 RSAs per ad group, with all asset slots filled
- [ ] Asset strength: Excellent / Good (none Poor or Average without explanation)
- [ ] Sitelinks, callouts, structured snippets, prices, promotion assets up to date
- [ ] Lead-form / call assets enabled where relevant
- [ ] Image assets attached (Search shows them increasingly)
- [ ] Final URL paths use UTMs and don't include consent banners that block conversion firing

## 5. Performance Max specifics

- [ ] Asset groups separated by audience signal / theme
- [ ] Campaign-level negatives applied (PMax accepts them now)
- [ ] Brand exclusions configured if separate brand campaign exists
- [ ] Asset reporting reviewed; low-rated assets replaced
- [ ] URL expansion deliberately on/off (off when LP coverage matters)
- [ ] Customer-acquisition mode set (new customer goal vs all)

## 6. Shopping specifics

- [ ] Feed health: 0 disapproved / suspended for serious reasons
- [ ] Title + description optimised for top-search-term coverage
- [ ] Product groups subdivided by margin / ROAS bucket
- [ ] Item-level data complete (GTIN, brand, condition, age group, gender, sizes)
- [ ] Promotions feed connected if applicable

## 7. Audiences & remarketing

- [ ] Audiences attached as Observation (Search) or Targeting (PMax) deliberately
- [ ] Remarketing lists fresh; durations make sense for the buying cycle
- [ ] Customer Match lists uploaded + matched
- [ ] Affinity / In-market layers applied where data supports it

## 8. Geo, schedule, device

- [ ] Geo bid adjustments based on conversion-rate-by-region data
- [ ] Hours-of-day bid adjustments based on conversion-rate-by-hour data
- [ ] Device adjustments deliberate (mobile / desktop / tablet)

## 9. Measurement hygiene

- [ ] Auto-applied recommendations review settings
- [ ] No experiments running unintentionally
- [ ] Data retention configured per privacy policy
- [ ] Account access list reviewed; ex-staff removed; MFA required

## Findings

<!-- Filed under audits/<date>-<account>/findings/ -->
