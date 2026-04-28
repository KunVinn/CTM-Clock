# Changelog · 子午流注

A dated log of meaningful changes to the site, in reverse-chronological order.
The site is a single-author study aid; the format is informal but the entries
should give a future reader (or future-me) enough context to understand why
each thing exists.

## 2026-04-28

- Practitioners page: replaced the placeholder `practitioners@your-domain.example`
  contact with the site owner's real email; removed the meta-comment that was
  visible to public visitors. Stiffened the directory loader so the initial
  "Loading practitioners…" text never persists — every failure path now ends
  with a useful empty-state message.
- `PRACTITIONER_CONSENT.md`: filled in the `[your-domain.com]`, `[Your name]`,
  `[Your email]` placeholders with the real site URL and contact so a
  practitioner downloading the form sees a finished document.
- Tongue page · privacy framing: rewrote the "your photo stays on your device"
  promise as conditional ("by default; the single exception is if you opt in
  to AI analysis below") so it stays accurate when read alongside the Gemini
  section that breaks it.
- Tongue page · fallback file picker: collapsed inside a `<details>` summary
  ("Trouble? Use the browser-native picker") so it stops adding visual
  clutter while still being one tap away if the styled buttons misbehave.

## 2026-04-27

- Music tone audit: corrected 三焦 from `商音/宫音` to `徵音/角音` (Triple
  Burner is a Fire-element organ; the previous Metal/Earth label and tracks
  were inconsistent with classical 五音对五脏 mapping). Track list updated
  to three Fire-group pieces. All 11 other organ tone labels verified
  correct.
- Event-driven 时辰 transitions: `tcm-music.js` now listens to the clock's
  `hourchange` event so playlists switch instantly when the active organ
  changes. The 60-second poll stays as a safety net.
- SPA-style menu navigation: clicks on `.menu-btn` and changes on the topbar
  dropdown are intercepted, the destination page is fetched, and only
  `.main-content` is swapped — the sidebar, topbar, music panel, and
  `<audio>` element survive. Music continues uninterrupted across pages.

## 2026-04-26

- Tongue page · classical foundation: added the full 9-row 舌与经络 table
  per《灵枢》 (channels + divergences + sinews), expanding from the prior
  6-channel paragraph. Includes 三焦 and 肺 connections previously omitted.
- Tongue page · zone-organ map overlay: Show Guide on a loaded photo now
  renders the five TCM zones (tip / front / center / sides / root) directly
  over the user's photo, each labelled with its organ correspondence.
- Hover-zoom slider redesigned as a single-row compact strip in the sidebar
  (was two stacked rows). Default 160% restored.
- Hover-zoom now applies to organ-name labels too (`label-organ-cn` and
  `label-organ-en`) — every text/notation ring on the clock is now zoomable.
  Fixed `pointer-events: none` on several base label classes that was
  silently blocking the `.clock-zoom:hover` rule.
- Photo / Camera buttons: settled on the native `<label>+<input
  capture=environment>` pattern with `onclick="this.value=null"` plus a
  deferred `value=''` reset inside the `change` handler. Fixes the
  Firefox-on-Huawei "works once" stuck-value bug. Camera button on
  desktop opens the in-page video modal; on touch devices uses native
  capture; touch detection switched from UA-sniff to feature checks
  (Huawei Browser's UA was missing the Android token).
- Three-mode → four-mode language toggle: 简 → 繁 → EN → 中. The 中 mode
  hides English siblings; remembers the last 简/繁 choice.
- Per-page Chinese authoring: added `meaningCn`, `functionCn`, `practicesCn`,
  `avoidCn`, `tcmSymptomsCn`, `habitCn` to all 12 ORGANS and
  `meaningCn` to all 21 tongue-selector items. Bilingual sibling pairs
  (`.lang-en-only` / `.lang-cn-only`) added to every static prose block
  on Acupuncture, Hours, Today (detail), Elements, Knowledge, Practices,
  Practitioners, About, and Tongue pages.
- Acupuncture page · 妇科调经 section: new card group for 痛经, 月事不下,
  月经不调 with classical-Chinese descriptions and recommended acupoint
  lists, drawing on 郭氏针灸 and 《针灸大成·卷九·妇人门》.
- Glossary URLs · Chinese sources: 12 organ entries and the 黄帝内经 entry
  now have `urlCn` pointing to `yibian.hopto.org/zang/?gid=…` and
  `shidianguji.com/book/SBCK072`. The `tcm-link.js` tooltip routing
  prefers `urlCn` when the user is in a Chinese script mode.
- Cache headers: `netlify.toml` changed from `max-age=31536000, immutable`
  to `max-age=3600, must-revalidate` so deploys actually reach users
  within an hour. Asset URLs now include `?v=YYYYMMDDx` cache-bust
  query strings that I bump on every push.

## 2026-04-25

- Initial Netlify deploy. Site replaces the original CTM-Clock single-page
  application with a multi-page version: index (Today), hours, elements,
  knowledge, tongue, acupuncture, practitioners, practices, about. Shared
  sidebar with the organ clock, top navigation strip, optional Gemini AI
  analysis on the Tongue page (user supplies their own free API key).
