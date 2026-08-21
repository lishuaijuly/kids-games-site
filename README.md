# CuriousKite kids-games-site

Parent-facing website for the CuriousKite iPhone/iPad children's game series.

## Canonical source and synchronization

- GitHub repository: `lishuaijuly/kids-games-site`
- GitHub Pages: `https://lishuaijuly.github.io/kids-games-site/`
- Google Drive working copy: `/ios游戏/kids-games-site/`
- GitHub comparison baseline recorded when this Drive copy was initialized:
  - branch: `main`
  - commit: `5ca24ed77a608fe508a023371fb7c763fc501603`
  - commit message: `update security`
  - committed: 2026-08-17 04:39:52 UTC
  - this SHA is historical comparison evidence only; it does not make GitHub the upstream source
- The Google Drive copy may intentionally be newer than GitHub. It is the **canonical manual-submit working source** for website content in this project.
- Production `assets/games.json` contains **released games only**; planned/development games stay in internal project documents until formal release.
- GitHub-only changes are treated as drift, not automatic upstream truth. They may be migrated back into Drive only after explicit developer confirmation.

## Update rule

When a game is formally released or when brand/support/privacy information changes:

1. Update the Google Drive working copy first.
2. Run the site/brand release checklist.
3. Copy the contents of this folder into the local `kids-games-site` Git checkout.
4. Review the diff.
5. Commit and push manually.
6. Verify GitHub Pages after deployment.

Do not copy Drive metadata or unrelated `/ios游戏` files into the repository.

## Brand reference

- Mother brand: **CuriousKite**
- Logo: rounded blue “C” opening onto a warm path, green hills, and sunlight.
- Canonical brand values are **not redefined in this README**. Use `/ios游戏/CURIOUSKITE_BRAND_GUIDE_CURRENT.md` and `/ios游戏/assets-source/_shared/CuriousKite/tokens/CURIOUSKITE_BRAND_TOKENS.json`; `assets/styles.css` must mirror those tokens exactly.
- Website logo and favicon use the approved Curious Window raster assets in `assets/`; do not independently redraw them in this repository.
- Approved value lines are not duplicated in this README. Runtime copy must match `/ios游戏/CURIOUSKITE_BRAND_GUIDE_CURRENT.md`; the Site Checklist/consistency script validates the public pages against that authority.

## Website role

This is a parent/guardian information and support site. Children's gameplay is in the iPhone/iPad apps. The site does not provide child accounts, chat, comments, advertising, or online gameplay.

## Languages

- Simplified Chinese
- English
- Japanese
- Spanish

## Support

The current operational Support address is inherited from the shared development baseline and must match the actual `support.html`, `privacy.html`, `security.txt`, release materials, and App Store Connect values. Do not redefine the address in this README.

## Repository structure

- `index.html` — parent-facing home page and game library
- `game.html` — game detail renderer
- `support.html` — support and purchase restoration guidance
- `privacy.html` — privacy policy
- `404.html` — not-found page
- `assets/app.js` — localization and game rendering
- `assets/styles.css` — shared visual system
- `assets/games.json` — game catalog
- `assets/curiouskite-logo-horizontal.png` — approved horizontal website logo
- `assets/curiouskite-logo-mark.png` — approved small-size brand mark and favicon
- `.well-known/security.txt` — security contact
- `.nojekyll` — GitHub Pages static-site behavior
