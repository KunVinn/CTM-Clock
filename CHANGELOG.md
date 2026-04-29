# Changelog · 子午流注

A dated log of meaningful changes to the site, in reverse-chronological order.
The site is a single-author study aid; the format is informal but the entries
should give a future reader (or future-me) enough context to understand why
each thing exists.

## 2026-04-29 (latest)

- **Tongue gallery · renumbered, lightboxed, prescription-linked.**
  - Five zone cards reordered to **1.肝 → 2.心 → 3.脾 → 4.肺 → 5.肾**
    with the new number rendered in HTML, so it is correct regardless
    of what the source poster's baked-in number happened to be.
  - Each photo now ships in two versions: `*-photo.jpg` (just the
    tongue photograph — used in the small card thumbnail, since the
    diagnostic-text rows are already shown alongside) and `*-full.jpg`
    (photo + diagnostic-text rows, with the source title bar cropped
    off — used when enlarged). Same treatment for the three 齿痕舌
    pattern cards (脾虚 / 阳虚 / 肝郁).
  - In-page lightbox modal: clicking a card opens an overlay that
    renders a clean HTML title bar with the corrected number above
    the full-poster image (Esc / backdrop / × button to close).
    Falls back to opening the full image in a new tab if JS is off.
  - 参考方 names (参苓白术散 / 附子理中丸 / 逍遥丸) are now clickable
    links to their Baidu Baike entries for users who want the formula
    composition and indications.

## 2026-04-29 (later)

- **Tongue gallery · images cleaned of source attribution.** Each
  reference image was cropped to remove the broadcaster logo / book
  watermark / broadcast subtitle that was baked into the source —
  CCTV-4 logos and 中文国际 / CCTV.com tags from the color &
  shape charts; "@中医王主任 / @中医王子华" attribution from the
  zone and pattern photos; "如有不适 请线下就医" advisory bar
  from the pattern posters; "心脑" trailing label from the
  three-burner overview. All originals (.webp / .png) replaced
  with cleaned .jpg files; HTML references updated. Cache bumped
  to `?v=20260429b`.

## 2026-04-29

- **Tongue gallery · click-to-enlarge fix.** The five-zone real photos
  were being rendered at 200 px tall with `object-fit: cover`, which
  cropped away the educational text baked into each source image —
  effectively making them unreadable. Now each photo is wrapped in a
  link that opens the full-size original in a new tab, the card image
  uses `object-fit: contain` with a 360 px max-height (480 px for the
  pattern posters, 360 px for the CCTV charts), and a small ⤢ badge
  hints that the image is enlargeable.
- **Tongue gallery · CCTV reference charts added.** Two new figures
  inserted between the three-burner overview and the five-zone grid:
  the four tongue body colors (淡白 / 淡红 / 红绛 / 青紫) and the five
  body shapes (胖大 / 瘦小 / 齿痕 / 裂纹 / 瘀斑), each with bilingual
  captions naming the pattern they typically signal. Source: CCTV-4
  中文国际 educational broadcast.

## 2026-04-28 (later)

- **SPA-nav bug fixed**: when navigating between menu items, per-page
  init scripts (which build the hour grid, the elements table, the KG
  cards, etc.) live as inline `<script>` tags at the bottom of `<body>`,
  outside `.main-content`. The SPA loader was only collecting scripts
  from inside the swapped-in `.main-content`, so those init scripts
  never ran and pages rendered with empty placeholders. Now collects
  scripts from the whole `doc.body`; external scripts are deduped by
  src, inline scripts are re-created so they execute. Pages render
  fully on every menu click.
- **Tongue page · real-photo gallery** added below the abstract zone-map
  SVG: a three-burner anatomical diagram, a five-zone real-photo grid
  with the typical signs for each organ (心 sunken/red/swollen/pale tip;
  肺 cracks/red/sunken front; etc.), and three common teeth-marked
  patterns (脾虚, 阳虚, 肝郁) with full 辨证 / 表现 / 调理 from the
  source reference plus reference formula (参苓白术散 / 附子理中丸 /
  逍遥丸). Bilingual cards, color-coded by element. Photos served from
  new `assets/tongue/` (9 webp files, ASCII filenames for portability).

## 2026-04-28

- New `privacy.html` page: a 4-card data-flow summary (stays-on-device,
  Google-when-opted-in, Resend-when-you-press-Send, public practitioner
  listings) plus a no-analytics statement and a remove/forget contact
  block. Bilingual throughout. Linked from a new shared footer that
  appears at the bottom of every page (privacy / source / changelog +
  version stamp `v2026.04.28b · last updated 2026-04-28`). Footer is
  positioned outside `.main-content` so it survives SPA navigation.
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
