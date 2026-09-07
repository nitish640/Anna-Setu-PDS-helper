# Anna Setu — UI/UX Redesign Notes

## What changed and why

The previous design used a warm cream background + terracotta-orange
accent + soft rounded cards with drop shadows — a combination that
reads as generic/AI-templated to a trained eye (it's one of the most
common default patterns right now). No functionality was touched —
this is a CSS-only redesign plus two font imports.

### New concept: a citizen's ration ledger

Instead of a generic "friendly app" look, the design is now grounded
in what a ration card system actually *is*: a ledger, a stamped
document, a torn coupon.

**Color** — `--ink` (navy, official/trustworthy) + `--turmeric`
(gold, grain/spice — distinctly Indian, not the overused terracotta)
+ `--paper` (aged ledger background). Red and green are used **only**
for actual status meaning (paused / resolved) — never decoratively
elsewhere. This semantic discipline is itself a UX signal: color
means something consistent throughout the app.

**Type** — Fraunces (a serif with character) is used sparingly, only
for the single biggest status word per screen. Everything else is
IBM Plex Sans / IBM Plex Sans Devanagari — chosen because it's one of
the few type families with matching Latin + Devanagari metrics, which
fixes a real problem: Hindi and English text previously used mismatched
fallback fonts with uneven visual weight.

**Cards → coupons** — status, reason, shop, and tracking cards now
have a torn-ticket-stub treatment (small punched notches at top/bottom
of the left edge) instead of generic rounded corners + soft shadow.
No box-shadows are used anywhere in the new system — everything is
flat with hairline borders, like paper.

**Status → ink stamps** — the glyphs on status cards, reason cards,
and history rows now render as a double-ring "stamp" (via box-shadow
rings) with a slight rotation, like a rubber stamp hitting paper
slightly askew — replacing the flat colored-circle-with-icon look.

**One bold animated moment** — the Success screen's checkmark now
plays a "stamp thud" animation (a quick scale + rotate settle) when a
grievance or correction is confirmed. This is the only new motion
added; everywhere else keeps the existing calm page-transition fade.

## Files changed
- `src/main.jsx` — added a `PhoneVerify` gate between card lookup and the
  home screen. A user must now enter a phone number and a 4-digit code
  before any ration data is shown — previously, typing any card number
  showed that card's data with no verification at all.
  **Current state:** the OTP code is a fixed, clearly-labeled demo value
  (`1234`, shown on-screen as "Demo OTP: 1234") rather than a real SMS,
  because live delivery requires a Twilio Messaging Service, which needs
  a paid Twilio tier. The gate itself — phone entry, code entry, wrong-code
  handling, and blocking access until verified — is fully real and
  functional. Say this plainly to mentors: the verification *flow* is
  real, the SMS *delivery* is a labeled placeholder pending Twilio upgrade.
- `src/styles.css` — full rewrite, token-based (CSS custom properties
  at `:root`), same class names as before so existing markup needed no
  changes. Includes a full motion layer (stamp animations, page-turn
  transitions, staggered list entrances, ink-burst on success, etc.)
  — see the "MOTION LAYER" section in the file for details.
- `src/overrides.css` — retinted to match new tokens; all font sizes
  (the accessibility-driven readability rules) kept identical.
- `index.html` — added Google Fonts import for Fraunces + IBM Plex
  Sans + IBM Plex Sans Devanagari; updated `theme-color` meta to match
  the new ink navy.
- `public/sw.js` — fixed a real bug: the service worker cached with a
  hardcoded name that never changed between deploys, so it would have
  kept serving old versions of the app forever. Now bumps cache version
  and uses network-first for the app shell/JS/CSS so updates show up
  immediately on every deploy.

- `src/main.jsx` — added:
  - Phone verification gate with simulated native incoming SMS push notification (`VA-TNPDS: 1234`) and one-tap auto-fill.
  - Interactive 4-box split OTP input with individual focus-jump, retreat, and shake-on-error animation.
  - Full 3-way language toggle (**தமிழ்** / **हिन्दी** / **English**) with localized brand marks (`அ` / `अ` / `A`).
  - TNPDS fair price shops list with interactive filtering tabs (All, Open Now, Rice in Stock, Wheat in Stock).
  - Quick demo card preset switcher (`TN-02-G-849201` and `MH-12-0418-2675`).
- `src/mockData.json` — updated with authentic Tamil Nadu PDS (TNPDS) fair price shops across Chennai, Madurai, Coimbatore, and Salem, multi-commodity tracking (Boiled Rice, Wheat, Sugar, Toor Dal), dual demo cards, and complete Tamil translations.
- `src/styles.css` — upgraded with "deadly smooth" physics:
  - Realistic rubber ink stamp squash-and-stretch settle (`cubic-bezier(0.17, 1.6, 0.4, 1)`).
  - Native iOS/Android style floating SMS toast drop animation.
  - Live radar beacon pulsation on open fair price shops.
  - 4-box split OTP glow and digit pop animations.
  - Segmented 3-way language pill toggle and smooth chip filter tabs.
- `index.html` — added Google Font for `IBM Plex Sans Tamil` alongside `IBM Plex Sans Devanagari` and `Fraunces`.
- `README.md` & `.gitignore` — added comprehensive documentation, pitch talking points, and clean Git configuration.

## To preview
```
npm install
npm run dev
```
