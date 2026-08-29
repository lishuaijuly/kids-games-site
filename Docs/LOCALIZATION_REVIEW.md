# Website localization review

Status: `AI_MULTIPASS_REVIEWED`

Scope: website chrome and the parent-facing home, support, privacy, 404 and game-detail UI, including each game's localized `summary` and `features`. Full App Store descriptions remain governed by each app release and are not duplicated into the website catalog.

Source intent and risk review:

- High risk: purchase restoration, refund, Apple Account, payment-card, support-email and privacy text must not imply a purchase, account access, data collection or refund handling that the source does not state.
- Medium risk: navigation, App Store/external links, support calls to action and error states must preserve their actual destination and action.
- Low risk: play-value and descriptive copy remains parent-facing, calm and non-medical.

AI review passes completed: structural locale coverage; terminology/tone review; semantic comparison with the English source; high-risk privacy/payment meaning review; Arabic RTL and punctuation review. This is AI-only review, not human or native-speaker certification.

## 2026-08-29 — Animal Spot Difference

Catalog revision: `assets/games.json` in the same commit as this record.

Changed locales: `en`, `zh-Hans`, `zh-Hant`, `ja`, `es`, `de`, `fr`, `ko`, `pt-BR`, `it`, `pl`, `ru`, `ar`.

Source intent:

- `title`: a short product-discovery label for a child-friendly animal spot-the-difference game.
- `summary`: calm, parent-facing discovery copy describing comparison of cheerful animal scenes; it must not promise a fixed inventory total.
- `features`: compare paired pictures, use optional gentle hints and a level map, and preserve the confirmed absence of ads, accounts, timers and pressure.
- `release_note`: confirm that the external App Store listing is publicly available.

Review evidence: deterministic locale/artwork checks; separate target-language naturalness and back-translation comparison; terminology and ages 6–8 tone review; second semantic pass on the privacy claims against the Apple listing and catalog privacy defaults; Simplified/Traditional Chinese wording review; Brazilian Portuguese review; Arabic RTL and punctuation review. Unresolved items: none.

Status: `AI_MULTIPASS_REVIEWED`. This was an AI-only review, not human or native-speaker certification.
