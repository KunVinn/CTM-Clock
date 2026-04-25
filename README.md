# 子午流注 · Zǐ Wǔ Liú Zhù

> **Midnight–Noon Ebb-and-Flow** — a contemplative TCM educational site built around the classical 24-hour organ-meridian clock, with a bilingual knowledge base spanning 五行 Five Elements, 经络 meridians, 舌诊 tongue diagnosis, and the 针灸 acupuncture point system.

A static, self-contained, single-deploy website. Drop the folder onto Netlify and it runs. No build step, no database, no user accounts, no external dependencies on Google Fonts or CDNs except where explicitly chosen for music streaming.

---

## Table of Contents

1. [What this is](#what-this-is)
2. [Live preview](#live-preview)
3. [Project layout](#project-layout)
4. [Pages and features](#pages-and-features)
5. [The cosmological clock](#the-cosmological-clock)
6. [Knowledge base](#knowledge-base)
7. [Optional services](#optional-services)
8. [Deployment](#deployment)
9. [Design decisions](#design-decisions)
10. [Roadmap and ideas](#roadmap-and-ideas)
11. [Sources and credits](#sources-and-credits)

---

## What this is

This site is a **teaching companion for Traditional Chinese Medicine** organised around the central insight of 子午流注 — that human qi flows through the twelve organ-meridians on a 24-hour cycle, with each meridian peaking in a specific two-hour window. It blends:

- **A live cosmological clock** showing the active meridian at every moment
- **Reference pages** on the Five Elements, the Twelve Hours, and the meridian/point system
- **A guided tongue-diagnosis tool** with photo capture, pattern recognition, and acupoint suggestions
- **A bilingual glossary** of ~100 TCM terms cross-linked throughout the site
- **A meridian-time music player** (五音 five-tone playlists for each organ)
- **A "send to my practitioner" relay** for sharing self-check reports

Inspired by:
- **KunVinn/CTM-Clock** — the original cosmological clock with five-tone music
- **AI-HPC-Research-Team/TCM_knowledge_graph (TCMM)** — the entity taxonomy on the Knowledge Graph page
- **FWD/福沃德 八卦时钟** — the reference for the 太极 + 八卦 center

---

## Live preview

After deployment, the URL structure is:

| Pretty URL | Page |
|---|---|
| `/` or `/today` | The hour that is now |
| `/hours` | Twelve Hours overview |
| `/elements` | Five Elements + correspondence table |
| `/knowledge` | TCMM-style entity browser |
| `/tongue` | Guided tongue diagnosis |
| `/acupuncture` | Meridian map and point system |
| `/practices` | Daily habit tracker |
| `/about` | Sources and disclaimer |

---

## Project layout

```
tcm-site/
├── index.html                 ← Today's active meridian
├── hours.html                 ← Twelve hour cards
├── elements.html              ← Five Elements + 24-category correspondence table
├── knowledge.html             ← Knowledge graph entity browser
├── tongue.html                ← Tongue diagnosis tool
├── acupuncture.html           ← Meridian + point system
├── practices.html             ← Daily practices tracker
├── about.html                 ← Credits and disclaimer
│
├── netlify.toml               ← Cache headers + pretty-URL redirects + functions wiring
├── EMAIL_RELAY_SETUP.md       ← Step-by-step setup for the optional email relay
│
├── netlify/functions/
│   └── send-report.js         ← Optional: serverless email relay (Resend)
│
└── assets/
    ├── style.css              ← All styling — single ~80 KB sheet
    ├── data.js                ← Organs, elements, correspondences, music data
    ├── glossary.js            ← ~100 TCM terms + ~130 aliases
    ├── clock.js               ← The cosmological clock SVG builder
    ├── tcm-link.js            ← Auto-decorates [data-term] elements with tooltips
    ├── tcm-script-toggle.js   ← Simplified ↔ Traditional Chinese site-wide toggle
    ├── tcm-music.js           ← Floating music panel + Wake Lock toggle
    │
    ├── CTM-Music/
    │   └── README.txt         ← Filenames for the optional .mp3 audio drop-in
    │
    └── img/
        └── tongue-guide.svg   ← Alignment overlay for the live camera capture
```

---

## Pages and features

### The hour that is now (`index.html`)

Detail card for the meridian currently active. Updates live. Each card shows:

- The Chinese name + pinyin + zodiac correspondence
- A short paragraph on what the organ governs
- "Practices that nourish" / "What to avoid" lists
- Linked terms throughout that surface tooltips on hover

### Twelve Hours (`hours.html`)

Grid of all twelve organ-meridian cards in chronological order from 子时 (23:00–01:00 Gallbladder) onwards.

### Five Elements (`elements.html`)

Five element cards (Wood / Fire / Earth / Metal / Water) plus:

- **The Generation & Control diagram** — pentagonal SVG with green solid arrows for 相生 (Wood → Fire → Earth → Metal → Water → Wood) and red dashed arrows for 相克 (Wood → Earth, Earth → Water, Water → Fire, Fire → Metal, Metal → Wood). Both cycles render with visible arrowheads.
- **A 24-category correspondence table** — Season, Climate, Direction, Color, Sound, Taste, Smell, Emotion, Sense Organ, Tissue, Yin Organ, Yang Organ, Phase of Life, Planet, Animal, Grain, Fruit, Vegetable, Domesticated Animal, Number, Tone, Manifestation, Action, Pulse — all five rows × 24 columns sourced from 《素问·宣明五气篇》《素问·阴阳应象大论》《素问·五脏生成篇》

### Knowledge Graph (`knowledge.html`)

A TCMM-style entity browser. 20 entity types and the relations between them — herbs, formulas, channels, syndromes, functions, biomedical targets — drawn from the upstream TCMM 知识图谱 paper.

### Tongue Diagnosis (`tongue.html`)

A complete guided tongue self-check:

- **Photo capture** — file upload OR a live in-browser camera (uses `navigator.mediaDevices.getUserMedia`) with a tongue-alignment overlay
- **Tongue zone map** — interactive SVG showing which area maps to which organ system (tip = Heart/Lung, edges = Liver/Gallbladder, center = Spleen/Stomach, root = Kidney/Bladder/Intestines)
- **Three selector grids** — 6 colors × 8 shapes × 7 coatings, each with photographic descriptions
- **Pattern matching** — selections trigger the 10 classical TCM patterns (qi-deficiency, yang-deficiency, yin-deficiency, blood-deficiency, excess heat, cold, dampness, damp-heat, qi stagnation, blood stasis), ranked by how many of the three signs match
- **🆕 Acupoint suggestions per pattern** — each pattern shows 3 specific points with method icons (針 acupuncture / 艾 moxibustion / 按 acupressure), location, and clinical rationale
- **Six self-check steps** — guided checklist for taking your own observation
- **Report generation** — three actions:
  - Print / Save as PDF (uses `window.print()` with `@media print` rules)
  - Download as standalone HTML (~10 KB self-contained file with the photo embedded as base64)
  - Email to practitioner via mailto:
- **🆕 "Send to my practitioner" relay** (optional) — collects user name, user email, practitioner email, optional note, consent — forwards via Resend

### Acupuncture (`acupuncture.html`) — 9 sections

A comprehensive meridian-and-point reference:

1. **八总穴歌** — bilingual quick-reference clinical mnemonic (足三里, 委中, 列缺, 合谷, 内关, 三阴交, 阿是, 水沟)
2. **五输穴** — the river-flow table (Well / Spring / Stream / River / Sea) with Yin/Yang element correspondence and classical use
3. **特定穴** — 8 special-point category cards (原 source · 络 connecting · 募 front-mu · 俞 back-shu · 郄 cleft · 下合 lower-uniting · 八会 eight-influential · 八脉交会 eight-confluence)
4. **十二经络歌诀** — all 12 main meridian point-list verses (歌诀), each with a direct link to the canonical point list at **yibian.hopto.org**
5. **奇经八脉** — 8 extraordinary vessels (Du, Ren, Chong, Dai, Yang Wei / Yin Wei, Yang Qiao / Yin Qiao)
6. **十六郄穴歌** — verse + 16-row table of acute-pain points
7. **十二募穴** — verse + detailed 12-row table of front-mu alarm point locations
8. **十二经脉流注表** — color-coded yin/yang flow table, marks where Stream and Source merge on yin channels (以输代原)
9. **五腧穴的深层内涵** — 6-card essay using the water/river metaphor, tying back to 子午流注 time-acupuncture

### Daily Practices (`practices.html`)

A self-tracking habit grid for the rhythms suggested throughout the site (early sleep, warm cooked breakfast, gentle movement, etc.). State persists in localStorage.

### About (`about.html`)

Sources, credits, and the educational-use disclaimer.

---

## The cosmological clock

The 380 px sticky sidebar contains an SVG clock that's the heart of the site. Built layer by layer:

| Ring | Content |
|---|---|
| Outer band | 24-hour numerals (00–23) on warm dark wood |
| Next ring | 24 fangwei directional characters (子癸丑艮…) |
| Next ring | 12 zodiac emoji (🐀🐂🐅…) |
| Next ring | 12 organ sectors, each clickable, color-coded by 五行 element |
| Next ring | 八卦 trigrams (先天 sequence: 坤 top, 乾 bottom, 离 right, 坎 left) |
| Center | 太极 with white yang-eye pointing up at 24:00, dark yin-eye pointing down at 12:00 |
| Pivot | 氣 disc in cinnabar |

The hour, minute, and second hands sweep over all of this. The active meridian sector is highlighted. The sidebar's "now" panel below the clock shows the current organ + 时辰 + zodiac + a one-line health tip.

---

## Knowledge base

### Glossary (`assets/glossary.js`)

About **100 entries** + **130 aliases** spanning:

- Foundational concepts (qi, yin-yang, wuxing, jing, shen, meridian, ziwu-liuzhu, …)
- All 12 organs
- All 10 patterns of disharmony
- Substance categories (qi types, blood, jin-ye fluids, …)
- Diagnostic methods (四诊, 望诊, 闻诊, 问诊, 切诊, 舌诊, 脉诊)
- Five Elements details
- Common herbs and formulas
- **Acupuncture vocabulary** — 针灸, 归经, 经络, the entire 五输穴 system, all 8 special-point categories, plus 17 specific high-frequency points (ST36, CV4, SP6, LV3, LI4, etc.)

Each entry has Chinese + pinyin + English name, a 1–3 sentence definition, and a Wikipedia or yibian.hopto.org link. Aliases let you write `data-term="liver"`, `data-term="肝"`, `data-term="ST36"`, or `data-term="足三里"` interchangeably.

### Tooltip system (`assets/tcm-link.js`)

Any element with `data-term="…"` is auto-decorated with a hover tooltip. A `MutationObserver` re-decorates dynamically inserted content so the system works inside the report modal, the share form, and dynamically rendered pattern cards.

### Bilingual support (`assets/tcm-script-toggle.js`)

The 繁/简 button in the topbar swaps every Chinese character on the page between Simplified and Traditional. The dictionary contains ~150 entries covering menu items, organ names, herb names, KG entities, hour cards, tongue selectors, pattern names, report content, and the entire acupuncture vocabulary. State persists in localStorage.

---

## Optional services

### Music player (`assets/tcm-music.js`)

Floating panel in the bottom-right (♫ button to expand/collapse). Auto-selects the playlist matching the currently active organ-meridian. Controls: prev / play+pause / next / loop or shuffle.

The playlist data lives in `assets/data.js` (`MUSIC_DATA`) and references `.mp3` files by Chinese filename only (e.g. `春江花月夜.mp3`). To enable playback: drop the audio files into `assets/CTM-Music/` matching the filenames listed in that folder's `README.txt`. The site works without the audio — the panel just shows "track not loaded".

### Wake-lock toggle

The ☾ button in the topbar uses the modern `navigator.wakeLock.request('screen')` API to keep the screen on (preventing auto-lock). When active it shows 🔆. Re-acquires automatically when the tab regains visibility (browsers auto-release on hide). Gracefully disabled with explanatory tooltip on browsers without Wake Lock support.

### Email relay (Option B)

Sends the user's tongue self-check report to a TCM practitioner. **No accounts, no database, no storage on the site.** The user types their own name and emails into a form each time — they identify themselves voluntarily.

- `netlify/functions/send-report.js` — stateless serverless function (~150 lines)
- Forwards via **Resend** (free tier: 3000 emails/month)
- The user is CC'd on every email
- Reply-To is set to the user, so the practitioner can simply hit Reply
- The photo travels as a real attachment (not inline base64)
- If the relay isn't configured, the form gracefully falls back to opening the local mail client via mailto:

See `EMAIL_RELAY_SETUP.md` for the 10-minute setup procedure (Resend signup, domain verification, two environment variables).

---

## Deployment

### Quick deploy (Netlify Drop)

1. Unzip `tcm-site.zip`
2. Drag the `tcm-site/` folder onto https://app.netlify.com/drop
3. Site is live in ~30 seconds at `your-site.netlify.app`

That's it. The site is a pure static deliverable.

### To enable music playback (optional)

Drop `.mp3` files into `assets/CTM-Music/` matching the filenames in that folder's `README.txt`. Filenames use Chinese characters; modern browsers and Netlify both handle UTF-8 paths fine.

### To enable email relay (optional)

Follow `EMAIL_RELAY_SETUP.md`. About 10 minutes:

1. Sign up at Resend (free, no credit card)
2. Verify a sender domain (DNS records)
3. Set `RESEND_API_KEY` and `FROM_ADDRESS` in Netlify environment variables
4. Trigger a redeploy

### To use a custom domain

1. In Netlify: **Domain settings → Add custom domain**
2. Update DNS at your registrar to point at Netlify's nameservers
3. Netlify auto-provisions a Let's Encrypt certificate

---

## Design decisions

### Why static?

- Zero ongoing cost (Netlify free tier)
- Zero attack surface — no database, no admin panel, nothing to compromise
- Zero data-privacy obligation — the site collects nothing
- Trivial to fork, modify, self-host
- Survives indefinitely with no maintenance

### Why one CSS file?

Trading "many small files" for "one well-organised sheet" because:
- HTTP/2 multiplexing makes the savings of file-splitting marginal
- A single file is much easier to grep, audit, and refactor by hand
- One cache header rule covers everything

### Why no framework?

The site has rich interactivity (camera capture, pattern matching, dynamic glossary tooltips, script toggle, music player, wake lock) yet is entirely vanilla JS. No React, no Vue, no Svelte. Reasons:

- **Total weight under 200 KB** uncompressed including all 8 pages, glossary, music data, the entire SVG clock — vs. typical React landing pages at 500 KB+ minimum
- **No build step** — the source code IS the deployable. Edit the file, refresh the browser
- **Every line is auditable** by anyone who reads JavaScript

### Why dark contemplative theme?

TCM has a meditative quality. Bright UI feels wrong for a site about `子时 静卧养血` (lying still during the Liver hour). The colors come from classical Chinese ink painting:

- Background: `#0d0a08` (lampblack)
- Ink: `#ede2cd` (raw silk)
- Gold: `#d4af7a` (aged scroll edge)
- Cinnabar: `#c43c2a` (vermilion)
- Jade: `#6b9676` (apple-jade)

### Why bilingual everywhere?

Many TCM concepts have no precise English equivalent — 气, 神, 精 carry meaning that "energy", "spirit", "essence" only approximate. Showing the Chinese alongside the English lets readers calibrate. The 繁/简 toggle then accommodates both diaspora communities.

### Why the cosmological clock as the heart?

子午流注 is the unifying metaphor for everything else on the site. Tongue diagnosis findings, dietary advice, sleep timing, music selection, and acupuncture point suggestions all anchor to "what hour is it, what organ is active, what is the body trying to do right now." The clock made it natural to keep that present at every moment of browsing.

---

## Roadmap and ideas

### Higher-priority (already structurally supported)

- **Drop in the actual `.mp3` files** for the music player. The infrastructure is fully built; it just needs the audio files. The upstream **KunVinn/CTM-Clock** repo lists the same track set used here.
- **Custom domain + email-relay setup.** ~10 minutes of work for a much better practitioner-sharing experience than mailto:.
- **Add user-submitted herb library entries.** The Knowledge Graph page currently shows the TCMM taxonomy but is browse-only. A small Markdown file format (`herbs/dang-gui.md` etc.) that auto-loads into the knowledge page would let you grow the library over time without database work.

### Medium-priority (require some design)

- **A pulse-diagnosis page** (`pulse.html`) parallel to tongue diagnosis. The 28 classical pulse qualities (浮沉迟数, 滑涩弦紧, …) with audio rhythm samples and pattern matching.
- **A formula explorer.** The 经方 classical formulas — 桂枝汤, 麻黄汤, 小柴胡汤, 六味地黄丸, etc. — each as a card showing ingredients, pattern indications, and modern adaptations. Cross-link to the herbs they contain and the patterns they treat.
- **Seasonal pages.** 立春 / 立夏 / 立秋 / 立冬 etc. — 24 节气 pages with seasonal eating, sleeping, and qigong recommendations. Auto-highlight the current solar term in the sidebar.
- **A meridian-tracing trainer.** Interactive SVG body where the user can trace each meridian's path from start to end, with the verses (歌诀) revealing one line at a time as confirmation.
- **Audio of the verses being read.** Each meridian's 歌诀 spoken aloud (Mandarin pinyin), so memory study can include listening.

### Lower-priority / experimental

- **A simple pattern journal.** Local-only (browser localStorage) — let users record their tongue findings over time and see how patterns shift. No accounts, no server.
- **Print-friendly meridian charts.** Single-page A4 PDF posters generated from the meridian data — one per channel, with the verse and the yibian point list sequence. Useful for clinic walls.
- **Acupressure self-care guides.** Per-symptom (headache, insomnia, neck pain, indigestion…) guided sequences of acupressure points with timing. Cross-linked to the existing point glossary.
- **Five-tone music theory page.** Explain why 角音 supports 肝, 商音 supports 肺, etc. — the actual Chinese music theory behind the playlist correspondences. With audio examples of each tone (modal, scale, characteristic).
- **Multi-practitioner relay.** Currently the share form sends to one practitioner. A "share with up to 3 colleagues" mode would let users get a second opinion easily.
- **Translation pass.** Add a third language toggle for English ↔ Norwegian (or another local language) for the surface text. The Chinese stays as the canonical reference; the translated layer is just for accessibility.

### Architectural ideas (would change the project shape)

- **Convert to a 静态 generator** (Eleventy, Astro) if the page count grows past ~20. Right now the cost is just typing some HTML; past a threshold a templating system pays off.
- **PWA / offline support.** Add a service worker so the site works fully offline once visited. Especially useful for travelers using the meridian clock and tongue tools without reliable internet.
- **A small admin dashboard** showing aggregate usage stats — popular pages, popular tongue patterns, which terms get clicked most. This would require some kind of analytics; Plausible (privacy-friendly, EU-hosted) is a natural fit.

### Things to deliberately *not* do

- **Don't add user accounts.** They're a liability under helsedataloven and GDPR. The site's privacy model is its strongest feature.
- **Don't add diagnosis claims.** Everything is "self-observation aiding lifestyle adjustment" or "study reference of classical doctrine." The educational framing is what allows the site to discuss TCM frankly without crossing into regulated medical territory.
- **Don't add ads or tracking.** It would conflict with the contemplative tone and most analytics scripts hurt site speed.

---

## Sources and credits

### Classical sources

- **《黄帝内经·素问》** — particularly 阴阳应象大论, 宣明五气篇, 五脏生成篇, 咳论 (the Five Elements correspondences and the doctrine of organ-time correspondence)
- **《灵枢》** — particularly 九针十二原, 邪气藏府病形, 经脉 (the 五输穴 system, 下合穴, the 12 channel paths)
- **《难经》** — particularly 四十五难 (the 八会穴 doctrine)
- **《针灸大成》** and **《针灸聚英》** — the classical mnemonic verses (歌诀)
- **《脉经》** — pulse diagnosis basis
- Maciocia, *Tongue Diagnosis in Chinese Medicine* — the modern standard for the tongue maps used here

### Project inspirations

- **KunVinn/CTM-Clock** (https://github.com/KunVinn/CTM-Clock) — the original cosmological clock with five-tone music; this project is a direct descendant with restructured content and an expanded knowledge base
- **AI-HPC-Research-Team/TCM_knowledge_graph** (https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph) — the TCMM taxonomy used on the Knowledge Graph page
- **FWD/福沃德 八卦时钟** — visual reference for the 太极 + 八卦 + 氣 center
- **医砭 yibian.hopto.org** — authoritative point-list reference linked from each meridian verse

### Disclaimer

This site is **educational only**. Nothing here is a substitute for diagnosis or treatment by a licensed medical or TCM practitioner. Tongue self-observation is an aid to self-awareness and lifestyle adjustment, not a diagnostic tool. Acupuncture must only be performed by a licensed practitioner. Moxibustion (艾灸) requires care to avoid burns. Acupressure (steady firm pressure for 1–2 minutes per point) is the safest self-application of the point knowledge. **Avoid all of these techniques in pregnancy without specific professional guidance.** If you notice a sudden dramatic change in your health, or if symptoms persist or worsen, please consult a qualified healthcare professional.

### License

The classical TCM content is in the public domain (the texts are millennia old). The site code, design, and modern arrangement are released for free non-commercial use. If you fork or adapt this project, a link back to the original repository is appreciated but not required.

---

*Built in 2026 with Claude as a study companion. Single static deploy on Netlify. ~120 KB total. Nothing is stored on any server about anyone who visits.*
