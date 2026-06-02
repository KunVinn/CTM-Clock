/* ============================================================
   子午流注 · Shared site-wide script
   - Renders the sidebar markup into placeholder
   - Builds the clock SVG inside the sidebar
   - Highlights active menu item
   - Live-updates clock hands & now-strip every second
   ============================================================ */

const NS = 'http://www.w3.org/2000/svg';
const SIDEBAR_HTML = `
  <div>
    <div class="sidebar-mark"><a href="index.html" data-zh-auto>子午流注</a></div>
    <div class="sidebar-eyebrow">Zǐ Wǔ Liú Zhù</div>
  </div>
  <div class="clock-mode-tabs" role="tablist" aria-label="Clock mode">
    <button class="clock-mode-tab active" data-mode="yangsheng" role="tab"
            data-zh-s="养生时钟" data-zh-t="養生時鐘"
            title="Health-rhythm clock — what each hour does for the body">养生时钟</button>
    <button class="clock-mode-tab" data-mode="ziwu" role="tab"
            data-zh-s="子午流注" data-zh-t="子午流注"
            title="Ziwu Liuzhu — 5-shu points of each meridian arranged by hour">子午流注</button>
    <button class="clock-mode-tab" data-mode="lingui" role="tab"
            data-zh-s="灵龟八法" data-zh-t="靈龜八法"
            title="Linggui Bafa — 八脉交会穴 by sector (static placeholder, algorithm TBD)">灵龟八法</button>
    <button class="clock-mode-tab" data-mode="feiteng" role="tab"
            data-zh-s="飞腾八法" data-zh-t="飛騰八法"
            title="Feiteng Bafa — 八脉交会穴 by sector (static placeholder, algorithm TBD)">飞腾八法</button>
  </div>
  <div class="clock-wrap">
    <svg class="clock-svg" id="clock-svg" viewBox="-360 -360 720 720"></svg>
  </div>
  <a href="index.html" class="now-strip" id="now-strip">
    <div class="now-strip-time" id="now-time">--:--<small>NOW</small></div>
    <div class="now-strip-organ">
      <div class="label">Active Meridian</div>
      <div class="name" id="now-name"><span class="cn">—</span> —</div>
      <div class="branch" id="now-branch">—</div>
    </div>
    <div class="now-strip-tip" id="now-tip">…</div>
    <div class="now-strip-music" id="now-music">
      <span class="tone" id="now-tone">—</span>
      <span id="now-track">—</span>
    </div>
  </a>
  <div class="sidebar-credit">
    Inspired by <a href="https://github.com/KunVinn/CTM-Clock" target="_blank" rel="noopener">CTM-Clock</a><br>
    Knowledge taxonomy: <a href="https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph" target="_blank" rel="noopener">TCMM</a>
  </div>
`;

/* ===================== SECTOR LABEL CYCLES =====================
   The old slider UI is gone. Two cycles run on the clock:

   1. ACTIVE cycle — always on. Walks the labels of whichever sector
      is the current-hour sector at 2× zoom (label-focus-active).
      The active sector is tracked from clock.js's hour-change
      logic; when the hour rolls over, this cycle re-targets.

   2. HOVER cycle — only when the user is hovering a sector. Walks
      THAT sector's labels at 3× zoom (label-focus). CSS specificity
      lets label-focus win over label-focus-active on the same
      element, so when the user hovers the active sector they see
      the brighter 3× version instead of two competing styles.

   Both cycles include all "5 + 1" elements per sector: branch,
   zodiac, cn-organ, en-organ, the two hour labels at the boundary
   (shared with the neighbor sector), and the nearest bagua trigram
   if its angle falls within (also shareable with neighbor sector).
   ============================================================ */
const SECTOR_CYCLE_MS_HOVER  = 700;   // mouse hover — faster, more responsive
const SECTOR_CYCLE_MS_ACTIVE = 1100;  // always-on current-hour — slower, ambient

let _hoverTimer = null;
let _hoverIdx   = -1;
let _hoverStep  = 0;

let _activeTimer = null;
let _activeIdx   = -1;
let _activeStep  = 0;

function _labelsFor(idx) {
  if (idx < 0) return [];
  // When a clock-mode has rendered its own labels for this sector,
  // cycle ONLY those — user wants the 5-shu (中冲→劳宫→大陵→间使→曲泽)
  // to pulse as a clean sequence, not mixed with branch/zodiac/organ.
  // Falls back to the original 5+1 set (branch, zodiac, organ-cn,
  // organ-en, hour-label, bagua) when no mode labels are present.
  const modeLabels = document.querySelectorAll('.mode-label[data-sector-idx~="' + idx + '"]');
  if (modeLabels.length) return Array.from(modeLabels);
  return Array.from(document.querySelectorAll('[data-sector-idx~="' + idx + '"]'));
}

function clearHoverCycle() {
  if (_hoverTimer) { clearInterval(_hoverTimer); _hoverTimer = null; }
  document.querySelectorAll('.clock-zoom.label-focus').forEach(l => l.classList.remove('label-focus'));
  _hoverIdx = -1;
}

function startHoverCycle(sectorIdx) {
  clearHoverCycle();
  _hoverIdx = sectorIdx;
  const labels = _labelsFor(sectorIdx);
  if (!labels.length) return;
  _hoverStep = 0;
  labels[0].classList.add('label-focus');
  _hoverStep = 1;
  _hoverTimer = setInterval(() => {
    if (_hoverIdx !== sectorIdx) { clearHoverCycle(); return; }
    labels.forEach(l => l.classList.remove('label-focus'));
    labels[_hoverStep % labels.length].classList.add('label-focus');
    _hoverStep++;
  }, SECTOR_CYCLE_MS_HOVER);
}

function _stopActiveCycle() {
  if (_activeTimer) { clearInterval(_activeTimer); _activeTimer = null; }
  document.querySelectorAll('.clock-zoom.label-focus-active').forEach(l => l.classList.remove('label-focus-active'));
}

function setActiveSector(sectorIdx) {
  if (sectorIdx === _activeIdx && _activeTimer) return;  // already cycling that one
  _stopActiveCycle();
  _activeIdx = sectorIdx;
  const labels = _labelsFor(sectorIdx);
  if (!labels.length) return;
  _activeStep = 0;
  labels[0].classList.add('label-focus-active');
  _activeStep = 1;
  _activeTimer = setInterval(() => {
    const ls = _labelsFor(_activeIdx);
    if (!ls.length) return;
    ls.forEach(l => l.classList.remove('label-focus-active'));
    ls[_activeStep % ls.length].classList.add('label-focus-active');
    _activeStep++;
  }, SECTOR_CYCLE_MS_ACTIVE);
}

function bindSectorHoverCycle() {
  document.querySelectorAll('.sector').forEach((sect, i) => {
    sect.addEventListener('mouseenter', () => startHoverCycle(i));
    sect.addEventListener('mouseleave', () => clearHoverCycle());
  });
}

// Inject sidebar + mobile toggle + overlay
function injectSidebarScaffold() {
  document.body.insertAdjacentHTML('afterbegin', `
    <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle clock">☰</button>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
  `);
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = SIDEBAR_HTML;

  // Toggle behaviour
  const toggle = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  if (toggle && sidebar && overlay) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}

// Highlight active menu item based on body[data-page]
function highlightActiveMenu() {
  const page = document.body.dataset.page;
  let active = null;
  document.querySelectorAll('.menu-btn').forEach(btn => {
    const isActive = btn.dataset.page === page;
    btn.classList.toggle('active', isActive);
    if (isActive) active = btn;
  });
  // Center the active item inside the topbar nav so it remains visible
  // after a page transition. Direct nav.scrollLeft with bounding-rect math
  // is more reliable on iOS Safari than scrollIntoView, which has spotty
  // support for inline:'center' on overflow strips. Run multiple times to
  // cover layout shifts (font load, address-bar collapse, image decode).
  if (active) {
    const scrollActive = () => {
      const nav = active.closest('nav');
      if (!nav) return;
      const navRect    = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (!navRect.width || !activeRect.width) return;  // not laid out yet
      const target = nav.scrollLeft
                   + (activeRect.left - navRect.left)
                   - (navRect.width - activeRect.width) / 2;
      const maxLeft = Math.max(0, nav.scrollWidth - nav.clientWidth);
      const clamped = Math.max(0, Math.min(target, maxLeft));
      if (Math.abs(nav.scrollLeft - clamped) > 1) nav.scrollLeft = clamped;
      updateTopbarOverflowState(nav);
    };
    requestAnimationFrame(scrollActive);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(scrollActive));
    }
    window.addEventListener('load', () => requestAnimationFrame(scrollActive), { once: true });
    // Safety passes — iOS Safari address-bar collapse fires at unpredictable
    // points after page load. Cheap to call; idempotent if already centred.
    setTimeout(scrollActive, 100);
    setTimeout(scrollActive, 500);
    setTimeout(scrollActive, 1200);
  }
}

// Toggle .has-overflow-left / .has-overflow-right on the parent .topbar so
// CSS can show edge-fade chevrons when there is more content to scroll to.
function updateTopbarOverflowState(nav) {
  const bar = nav.closest('.topbar');
  if (!bar) return;
  const max = nav.scrollWidth - nav.clientWidth;
  bar.classList.toggle('has-overflow-left',  nav.scrollLeft > 4);
  bar.classList.toggle('has-overflow-right', nav.scrollLeft < max - 4);
}

// Wire up overflow-state updates and a horizontal-swipe gesture that
// navigates between pages in menu order. The swipe is intentionally
// conservative (must be primarily horizontal, fast, and outside any
// element that does its own horizontal scrolling).
function initTopbarBehaviour() {
  const nav = document.querySelector('.topbar nav');
  if (nav) {
    const bar = nav.closest('.topbar');
    // Inject explicit scroll buttons. CSS shows them only when there is
    // overflow in the matching direction. They click-scroll the nav by
    // ~70% of its visible width — comparable to a tab's worth of items.
    if (bar && !bar.querySelector('.nav-arrow')) {
      const left = document.createElement('button');
      left.type = 'button';
      left.className = 'nav-arrow nav-arrow-left';
      left.setAttribute('aria-label', 'Scroll menu left');
      left.innerHTML = '‹‹';
      const right = document.createElement('button');
      right.type = 'button';
      right.className = 'nav-arrow nav-arrow-right';
      right.setAttribute('aria-label', 'Scroll menu right');
      right.innerHTML = '››';
      bar.insertBefore(left, nav);
      // right button after the nav (before the script-toggle / actions)
      if (nav.nextSibling) bar.insertBefore(right, nav.nextSibling);
      else bar.appendChild(right);

      const scrollNav = (delta) => {
        const step = Math.round(nav.clientWidth * 0.70) * delta;
        if (typeof nav.scrollBy === 'function') {
          nav.scrollBy({ left: step, behavior: 'smooth' });
        } else {
          nav.scrollLeft += step;
        }
      };
      left.addEventListener('click',  () => scrollNav(-1));
      right.addEventListener('click', () => scrollNav(+1));
    }

    updateTopbarOverflowState(nav);
    nav.addEventListener('scroll', () => updateTopbarOverflowState(nav), { passive: true });
    window.addEventListener('resize', () => updateTopbarOverflowState(nav));

    // Inject a parallel <select> dropdown for tablet/phone sizes. CSS
    // shows the dropdown and hides the scrolling nav strip below 700px.
    // Selecting an option navigates to that page. Reading menu items
    // straight from the existing nav so the dropdown stays in sync if
    // pages are added/removed later.
    if (bar && !bar.querySelector('.topbar-select')) {
      const select = document.createElement('select');
      select.className = 'topbar-select';
      select.setAttribute('aria-label', 'Pages · 页面');
      const buttons = nav.querySelectorAll('.menu-btn');
      buttons.forEach(btn => {
        const opt = document.createElement('option');
        opt.value = btn.getAttribute('href') || '';
        // Keep both Chinese and English in the option label so it works
        // in any script mode without needing data-zh-* attributes.
        const cnEl = btn.querySelector('.cn');
        const cnTxt = cnEl ? cnEl.textContent.trim() : '';
        // The English label is the bare text node after the .cn span.
        const enTxt = (btn.textContent || '').replace(cnTxt, '').trim();
        opt.textContent = cnTxt && enTxt ? `${cnTxt}  ·  ${enTxt}` : (cnTxt || enTxt);
        opt.dataset.page = btn.dataset.page || '';
        if (btn.classList.contains('active')) opt.selected = true;
        select.appendChild(opt);
      });
      select.addEventListener('change', () => {
        const href = select.value;
        if (href) window.location.href = href;
      });
      // Place the select between the left arrow and the nav so the
      // arrows still appear if a desktop user drags the window narrow
      // enough to hit the dropdown breakpoint.
      bar.insertBefore(select, nav);
    }
  }

  let sx = 0, sy = 0, st = 0, tracking = false;
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { tracking = false; return; }
    const t = e.touches[0];
    // Ignore swipes that begin inside something that scrolls horizontally
    // on its own, or inside the sidebar drawer.
    if (e.target.closest('.topbar nav, .sidebar, .clock-wrap, .corr-tabs, [data-no-swipe]')) {
      tracking = false; return;
    }
    sx = t.clientX; sy = t.clientY; st = Date.now(); tracking = true;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!tracking || e.changedTouches.length !== 1) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx;
    const dy = t.clientY - sy;
    const dt = Date.now() - st;
    // Thresholds: clearly horizontal, fast enough, far enough.
    if (Math.abs(dx) < 80 || Math.abs(dy) > 60 || dt > 600) return;
    navigateMenu(dx < 0 ? 1 : -1);
  }, { passive: true });
}

function navigateMenu(delta) {
  const buttons = Array.from(document.querySelectorAll('.menu-btn'));
  const idx = buttons.findIndex(b => b.classList.contains('active'));
  if (idx < 0) return;
  const next = buttons[idx + delta];
  if (next && next.href) window.location.href = next.href;
}

/* ===================== CLOCK SVG BUILDER ===================== */

const R_OUTER = 320, R_HOUR = 305, R_FANG = 280, R_BRANCH = 250;
const R_ZODIAC = 220, R_SEC_OUT = 200, R_SEC_IN = 100;
const R_LABEL_CN = 165, R_LABEL_EN = 138, R_INNER = 100;

/* ============================================================
   CLOCK MODES (Phase 1: yangsheng + ziwu enabled)
   ============================================================ */
const CLOCK_MODE_STORE = 'tcm-clock-mode-v1';
const CLOCK_MODES = ['yangsheng', 'ziwu', 'lingui', 'feiteng'];
let _clockMode = 'yangsheng';

function getClockMode() {
  try {
    const v = localStorage.getItem(CLOCK_MODE_STORE);
    return CLOCK_MODES.indexOf(v) >= 0 ? v : 'yangsheng';
  } catch (_) { return 'yangsheng'; }
}
function setClockMode(m) {
  if (CLOCK_MODES.indexOf(m) < 0) return;
  _clockMode = m;
  try { localStorage.setItem(CLOCK_MODE_STORE, m); } catch (_) {}
  document.querySelectorAll('.clock-mode-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === m);
  });
  renderModeLabels();
  // Re-target the always-on cycle so it picks up the freshly-rendered
  // mode labels right away. Without this, there's a ~1.1 s gap after
  // mode switch where the active sector has no highlighted label.
  if (_activeIdx >= 0) {
    const idx = _activeIdx;
    _activeIdx = -1;
    setActiveSector(idx);
  }
}

// 养生时钟 — one functional label per organ-hour. Mapped by ORGANS
// index (0 = 子时/胆). Plain Chinese strings only — applyScript() in
// tcm-script-toggle.js merges SVG <title> text into textContent when
// caching the EN form, which was the source of the "尺泽尺泽" pile-up,
// so mode labels deliberately have no <title> children and no
// bilingual data-* attributes. They stay Chinese in every script.
const YANGSHENG_LABELS = [
  '细胞重生',  // 0  子 23-01 胆
  '排毒解郁',  // 1  丑 01-03 肝
  '气血灌肺',  // 2  寅 03-05 肺
  '排毒时间',  // 3  卯 05-07 大肠
  '消化时间',  // 4  辰 07-09 胃
  '吸收时间',  // 5  巳 09-11 脾
  '养心时间',  // 6  午 11-13 心
  '吸收营养',  // 7  未 13-15 小肠
  '大量喝水',  // 8  申 15-17 膀胱
  '补充气血',  // 9  酉 17-19 肾
  '血液循环',  // 10 戌 19-21 心包
  '滋养筋骨',  // 11 亥 21-23 三焦
];

// 子午流注 5-shu points (井 荥 输 经 合) per meridian, ordered
// distal → proximal. Stacked concentrically in each sector.
const ZIWU_5SHU = [
  ['足窍阴','侠溪','足临泣','阳辅','阳陵泉'],  // 0  胆 GB
  ['大敦','行间','太冲','中封','曲泉'],         // 1  肝 LV
  ['少商','鱼际','太渊','经渠','尺泽'],         // 2  肺 LU
  ['商阳','二间','三间','阳溪','曲池'],         // 3  大肠 LI
  ['厉兑','内庭','陷谷','解溪','足三里'],       // 4  胃 ST
  ['隐白','大都','太白','商丘','阴陵泉'],       // 5  脾 SP
  ['少冲','少府','神门','灵道','少海'],         // 6  心 HT
  ['少泽','前谷','后溪','阳谷','小海'],         // 7  小肠 SI
  ['至阴','足通谷','束骨','昆仑','委中'],       // 8  膀胱 BL
  ['涌泉','然谷','太溪','复溜','阴谷'],         // 9  肾 KI
  ['中冲','劳宫','大陵','间使','曲泽'],         // 10 心包 PC
  ['关冲','液门','中渚','支沟','天井'],         // 11 三焦 TE
];

/* ============================================================
   灵龟八法 (Linggui Bafa) — dynamic computation
   ------------------------------------------------------------
   Standard 环周盘 algorithm using TWO separate code tables:
     《八法逐日干支歌》(day pillar):
       甲己辰戌丑未十   乙庚申酉九为期
       丁壬寅卯八成数   丙辛亥子七作期
       戊癸巳午亦如五
     《八法临时干支歌》(hour pillar):
       甲己子午九宜用   乙庚丑未八无疑
       丙辛寅申七作数   丁壬卯酉六须知
       戊癸辰戌各有五   巳亥单加四共齐
   Sum the four 干支 codes, divide by 9 on 阳日 (日干 = 甲丙戊庚壬)
   or by 6 on 阴日 (乙丁己辛癸); 0 becomes the divisor. The remainder
   is the 八穴代数 — mapped to the open 穴.
   Verified against the user's 1997-12-21 (丁酉日) worked example:
     all 12 hours reproduce [4,2,6,4,1,5,3,1,5,2,6,4] exactly.
   ============================================================ */
const LINGUI_DAY_STEM_CODE = {
  '甲':10, '己':10, '乙':9,  '庚':9,
  '丁':8,  '壬':8,  '丙':7,  '辛':7,
  '戊':5,  '癸':5,
};
const LINGUI_DAY_BRANCH_CODE = {
  '辰':10, '戌':10, '丑':10, '未':10,
  '申':9,  '酉':9,
  '寅':8,  '卯':8,
  '亥':7,  '子':7,
  '巳':5,  '午':5,
};
const LINGUI_HOUR_STEM_CODE = {
  '甲':9, '己':9, '乙':8, '庚':8,
  '丙':7, '辛':7, '丁':6, '壬':6,
  '戊':5, '癸':5,
};
const LINGUI_HOUR_BRANCH_CODE = {
  '子':9, '午':9, '丑':8, '未':8,
  '寅':7, '申':7, '卯':6, '酉':6,
  '辰':5, '戌':5, '巳':4, '亥':4,
};
// 八穴代数 → 穴 (per 灵龟八法环周盘 第一盘).
// 2 and 5 both map to 照海 — the 5中宫 borrows from 2坤宫.
const LINGUI_CODE_TO_POINT = {
  1: '申脉',  2: '照海',  3: '外关',
  4: '足临泣', 5: '照海',  6: '公孙',
  7: '后溪',  8: '内关',  9: '列缺',
};
function linguiCodeForSector(date, sectorIdx) {
  const pillar     = dayPillarIdx(date);
  const dayStem    = STEMS[pillar % 10];
  const dayBranch  = BRANCHES[pillar % 12];
  const hourStem   = STEMS[hourStemIdxFromDay(pillar % 10, sectorIdx)];
  const hourBranch = BRANCHES[sectorIdx];
  const sum = LINGUI_DAY_STEM_CODE[dayStem]
            + LINGUI_DAY_BRANCH_CODE[dayBranch]
            + LINGUI_HOUR_STEM_CODE[hourStem]
            + LINGUI_HOUR_BRANCH_CODE[hourBranch];
  const isYangDay = (pillar % 10) % 2 === 0;   // 甲(0)丙(2)戊(4)庚(6)壬(8)
  const divisor   = isYangDay ? 9 : 6;
  const r         = sum % divisor;
  return r === 0 ? divisor : r;
}
function linguiPointsForToday(date) {
  const out = new Array(12);
  for (let i = 0; i < 12; i++) {
    out[i] = LINGUI_CODE_TO_POINT[linguiCodeForSector(date, i)];
  }
  return out;
}

/* ============================================================
   飞腾八法 (Feiteng Bafa) — dynamic computation
   ------------------------------------------------------------
   Source: 飞腾八法歌 + 五鼠遁 hour-stem tables (user-provided).
       壬甲公孙即是乾    丙居艮上内关然
       戊为临泣生坎水    庚属外关震相连
       辛上后溪装巽卦    乙癸申脉到坤传
       己土列缺南离上    丁居照海兑金全
   At any moment the active 飞腾 point depends ONLY on the current
   hour-stem (时干), which is derived from day-stem + hour-branch
   via 五鼠遁 (the "five-rat escape" rule):
       日干甲己 → 子时甲子   日干乙庚 → 子时丙子
       日干丙辛 → 子时戊子   日干丁壬 → 子时庚子   日干戊癸 → 子时壬子
   Each subsequent 时 advances the stem by 1 (mod 10), branch by 1.
   ============================================================ */
const STEMS    = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

// 时干 → {穴, 卦}. Two stems share each yin/yang gua (e.g. 甲+壬→乾)
const FEITENG_STEM_MAP = {
  '甲': { point: '公孙',  gua: '乾' },
  '乙': { point: '申脉',  gua: '坤' },
  '丙': { point: '内关',  gua: '艮' },
  '丁': { point: '照海',  gua: '兑' },
  '戊': { point: '足临泣', gua: '坎' },
  '己': { point: '列缺',  gua: '离' },
  '庚': { point: '外关',  gua: '震' },
  '辛': { point: '后溪',  gua: '巽' },
  '壬': { point: '公孙',  gua: '乾' },
  '癸': { point: '申脉',  gua: '坤' },
};

// 五鼠遁: day-stem index → hour-stem index of 子时.
//   甲己→甲(0)子;  乙庚→丙(2)子;  丙辛→戊(4)子;  丁壬→庚(6)子;  戊癸→壬(8)子
const WUSHU_DUN_BASE = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];

function hourStemIdxFromDay(dayStemIdx, hourBranchIdx) {
  return (WUSHU_DUN_BASE[dayStemIdx] + hourBranchIdx) % 10;
}

// Anchor for the sexagenary day-pillar cycle:
//   2026-05-31 (Gregorian) = 乙巳日 = cycle index 41 (0-indexed; 甲子=0).
// TCM days begin at 子时 (23:00), so a date whose Gregorian hour is
// ≥23 rolls over to the NEXT day's pillar.
function dayPillarIdx(date) {
  let target = new Date(date.getTime());
  if (target.getHours() >= 23) target.setDate(target.getDate() + 1);
  // Use UTC-of-local-date to dodge DST drift.
  const targetUTC = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const anchorUTC = Date.UTC(2026, 4, 31);
  const daysDiff  = Math.round((targetUTC - anchorUTC) / 86400000);
  return (((41 + daysDiff) % 60) + 60) % 60;
}

// Build the 12 飞腾 point names for the current day, indexed by sector
// (sector i corresponds to hour-branch i, matching ORGANS).
function feitengPointsForToday(date) {
  const dayStemIdx = dayPillarIdx(date) % 10;
  const out = new Array(12);
  for (let i = 0; i < 12; i++) {
    const hStem = hourStemIdxFromDay(dayStemIdx, i);
    out[i] = FEITENG_STEM_MAP[STEMS[hStem]].point;
  }
  return out;
}

// Radii for the various mode rings. The ziwu stack runs distal (outer)
// to proximal (inner) and tucks into the band between the sector outer
// edge (200) and the bagua ring (100). The innermost ring is held at
// ≥118 so the label box (centered ±6px at 9.5px font) clears the
// bagua background that begins at R=100. Spacing is ~19px which gives
// breathing room between rings even when the inner sector arc width
// drops to ~60px. Single-label modes sit at one radius inside the sector.
const ZIWU_RADII_R   = [191, 172, 153, 134, 118];
const R_MODE_SINGLE  = 150;

function renderModeLabels() {
  // Wipe any prior mode labels — class selector matches both .mode-label
  // and the per-mode variants. Always clear before re-rendering so
  // mode switches don't pile elements on top of each other.
  document.querySelectorAll('.mode-label').forEach(el => el.remove());
  const svg = document.getElementById('clock-svg');
  if (!svg) return;
  svg.setAttribute('data-clock-mode', _clockMode);

  const addLabel = (radius, content, sectorIdx, variantClass) => {
    const o = ORGANS[sectorIdx];
    const a = midAngle(o.start, o.end);
    const [x, y] = polar(radius, a);
    // NOTE: no <title> child, no data-zh-* attrs — see YANGSHENG_LABELS
    // comment above for why these are intentionally omitted.
    const el = makeText(x, y, content, 'mode-label ' + variantClass + ' clock-zoom');
    el.setAttribute('data-sector-idx', String(sectorIdx));
    svg.appendChild(el);
    return el;
  };

  if (_clockMode === 'yangsheng') {
    YANGSHENG_LABELS.forEach((cn, i) => addLabel(R_MODE_SINGLE, cn, i, 'mode-label-yangsheng'));
  } else if (_clockMode === 'ziwu') {
    ZIWU_5SHU.forEach((pts, i) => {
      pts.forEach((pt, j) => addLabel(ZIWU_RADII_R[j], pt, i, 'mode-label-ziwu'));
    });
  } else if (_clockMode === 'lingui') {
    const now = new Date();
    linguiPointsForToday(now).forEach((cn, i) => addLabel(R_MODE_SINGLE, cn, i, 'mode-label-lingui'));
  } else if (_clockMode === 'feiteng') {
    const now = new Date();
    feitengPointsForToday(now).forEach((cn, i) => addLabel(R_MODE_SINGLE, cn, i, 'mode-label-feiteng'));
  }
}

function polar(r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [r * Math.cos(rad), r * Math.sin(rad)];
}
function hourAngle(h) { return (h / 24) * 360; }
function midAngle(s, e) {
  let eAdj = e; if (e <= s) eAdj = e + 24;
  return hourAngle((s + eAdj) / 2);
}
function describeSector(sH, eH, ro, ri) {
  let eAdj = eH; if (eH <= sH) eAdj = eH + 24;
  const a1 = hourAngle(sH), a2 = hourAngle(eAdj);
  const [x1o, y1o] = polar(ro, a1);
  const [x2o, y2o] = polar(ro, a2);
  const [x1i, y1i] = polar(ri, a1);
  const [x2i, y2i] = polar(ri, a2);
  const large = (a2 - a1) > 180 ? 1 : 0;
  return `M ${x1o} ${y1o}
          A ${ro} ${ro} 0 ${large} 1 ${x2o} ${y2o}
          L ${x2i} ${y2i}
          A ${ri} ${ri} 0 ${large} 0 ${x1i} ${y1i} Z`;
}
function makeText(x, y, content, cls) {
  const t = document.createElementNS(NS, 'text');
  t.setAttribute('x', x); t.setAttribute('y', y);
  t.setAttribute('text-anchor', 'middle');
  t.setAttribute('dominant-baseline', 'central');
  t.setAttribute('class', cls);
  t.textContent = content;
  return t;
}
function makeCircle(r, cls) {
  const c = document.createElementNS(NS, 'circle');
  c.setAttribute('r', r);
  c.setAttribute('class', cls);
  return c;
}
function makeHand(length, cls) {
  // Wrap line in <g> so SVG transform="rotate(deg)" pivots around (0,0).
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', 'hand-group');
  const line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', 0); line.setAttribute('y1', 0);
  line.setAttribute('x2', 0); line.setAttribute('y2', -length);
  line.setAttribute('class', `hand ${cls}`);
  g.appendChild(line);
  return g;
}

let hourH, minH, secH;

function buildClock() {
  const svg = document.getElementById('clock-svg');
  if (!svg) return;

  // Outer-ring background — a slightly lighter band that sets off the
  // 24-hour numbers and fangwei characters from the page background.
  // Drawn as a single circle filled to R_OUTER (the inner-edge ring will
  // be drawn over the sectors so this only shows in the outer ring area).
  const outerBg = document.createElementNS(NS, 'circle');
  outerBg.setAttribute('r', R_OUTER + 4);
  outerBg.setAttribute('class', 'outer-ring-bg');
  svg.appendChild(outerBg);

  // Decorative rings
  svg.appendChild(makeCircle(R_OUTER + 8, 'ring-line'));
  svg.appendChild(makeCircle(R_OUTER, 'ring-line'));
  svg.appendChild(makeCircle(R_BRANCH + 16, 'ring-line-soft'));
  svg.appendChild(makeCircle(R_FANG - 8, 'ring-line-soft'));

  // 24 hour numbers
  for (let h = 0; h < 24; h++) {
    const a = hourAngle(h);
    const [x, y] = polar(R_HOUR, a);
    const label = makeText(x, y, String(h).padStart(2, '0'), 'label-hour clock-zoom');
    // Tooltip: which organ-meridian this hour belongs to
    const orgIdx = ORGANS.findIndex(o => {
      const s = o.start, e = o.end;
      if (e <= s) return h >= s || h < e;
      return h >= s && h < e;
    });
    if (orgIdx >= 0) {
      const o = ORGANS[orgIdx];
      const titleEl = document.createElementNS(NS, 'title');
      titleEl.textContent = `${String(h).padStart(2,'0')}:00 — ${o.cn} ${o.organ} · ${o.branch}时 ${o.pinyin}`;
      label.appendChild(titleEl);
    }
    // Wire hour-label into the per-sector hover cycle. Every hour
    // belongs to one sector by definition; if it's right at a sector
    // boundary it gets tagged with BOTH the sector it starts and the
    // previous one (so both sectors include it when hovered).
    const owners = new Set();
    if (orgIdx >= 0) owners.add(orgIdx);
    // Boundary hour = h matches some sector's start → also tag the
    // previous sector (whose .end == h).
    const startIdx = ORGANS.findIndex(o => o.start === h);
    if (startIdx >= 0) owners.add((startIdx + ORGANS.length - 1) % ORGANS.length);
    if (owners.size) {
      label.setAttribute('data-sector-idx', Array.from(owners).join(' '));
    }
    svg.appendChild(label);
    const [x1, y1] = polar(R_FANG - 12, a);
    const [x2, y2] = polar(R_HOUR - 10, a);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('class', 'ring-line-soft');
    svg.appendChild(line);
  }

  // 24 fangwei (directional terms) — hover-zoomable, with directional context
  // The fangwei wheel pairs the 12 earthly branches with 8 trigrams + 10 stems
  // to mark the 24 directional points. Hovering reveals what each character is.
  const FANGWEI_INFO = {
    '子':'North · midnight', '癸':'N–NNE · stem癸', '丑':'NNE · 丑时',
    '艮':'NE · 艮卦 mountain', '寅':'ENE · 寅时', '甲':'E–ENE · stem甲',
    '卯':'East · sunrise', '乙':'E–ESE · stem乙', '辰':'ESE · 辰时',
    '巽':'SE · 巽卦 wind', '巳':'SSE · 巳时', '丙':'S–SSE · stem丙',
    '午':'South · noon', '丁':'S–SSW · stem丁', '未':'SSW · 未时',
    '坤':'SW · 坤卦 earth', '申':'WSW · 申时', '庚':'W–WSW · stem庚',
    '酉':'West · sunset', '辛':'W–WNW · stem辛', '戌':'WNW · 戌时',
    '乾':'NW · 乾卦 heaven', '亥':'NNW · 亥时', '壬':'N–NNW · stem壬'
  };
  for (let i = 0; i < 24; i++) {
    const angle = ((i - 1) * 360 / 24);
    const [x, y] = polar(R_FANG, angle);
    const label = makeText(x, y, FANGWEI[i], 'label-fangwei clock-zoom');
    const titleEl = document.createElementNS(NS, 'title');
    titleEl.textContent = `${FANGWEI[i]} — ${FANGWEI_INFO[FANGWEI[i]] || ''}`;
    label.appendChild(titleEl);
    svg.appendChild(label);
  }

  // 12 sectors, each one clickable
  ORGANS.forEach((o, i) => {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', describeSector(o.start, o.end, R_SEC_OUT, R_SEC_IN));
    path.setAttribute('class', 'sector');
    path.setAttribute('fill', ELEMENT_FILL[o.element]);
    path.setAttribute('stroke', 'var(--gold)');
    path.setAttribute('stroke-width', '0.6');
    path.setAttribute('data-idx', i);
    path.style.opacity = '0.85';
    // Click on a sector: jump to Today page with that organ pre-selected
    path.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `index.html?hour=${i}`;
    });
    svg.appendChild(path);

    const a = midAngle(o.start, o.end);
    const [bx, by] = polar(R_BRANCH, a);
    const branchLabel = makeText(bx, by, o.branch, 'label-branch label-cn clock-zoom');
    branchLabel.setAttribute('data-sector-idx', String(i));
    const branchTitle = document.createElementNS(NS, 'title');
    branchTitle.textContent = `${o.branch}时 ${o.pinyin} · ${String(o.start).padStart(2,'0')}:00–${String(o.end).padStart(2,'0')}:00`;
    branchLabel.appendChild(branchTitle);
    svg.appendChild(branchLabel);

    const [zx, zy] = polar(R_ZODIAC, a);
    const zodiacLabel = makeText(zx, zy, o.zodiacEmoji, 'label-zodiac clock-zoom');
    zodiacLabel.setAttribute('data-sector-idx', String(i));
    const zodiacTitle = document.createElementNS(NS, 'title');
    zodiacTitle.textContent = `${o.zodiacEmoji} ${o.zodiac} — ${o.branch}时 ${o.pinyin}`;
    zodiacLabel.appendChild(zodiacTitle);
    svg.appendChild(zodiacLabel);

    const [cx, cy] = polar(R_LABEL_CN, a);
    const cnOrgan = makeText(cx, cy, o.cn, 'label-organ-cn label-cn clock-zoom');
    cnOrgan.setAttribute('data-sector-idx', String(i));
    const cnOrganTitle = document.createElementNS(NS, 'title');
    cnOrganTitle.textContent = `${o.cn}经 · ${o.organ}`;
    cnOrgan.appendChild(cnOrganTitle);
    svg.appendChild(cnOrgan);

    const [ex, ey] = polar(R_LABEL_EN, a);
    const enOrgan = makeText(ex, ey, o.organ, 'label-organ-en clock-zoom');
    enOrgan.setAttribute('data-sector-idx', String(i));
    const enOrganTitle = document.createElementNS(NS, 'title');
    enOrganTitle.textContent = `${o.organ} · ${o.cn}`;
    enOrgan.appendChild(enOrganTitle);
    svg.appendChild(enOrgan);
  });

  // Sector dividers
  for (let i = 0; i < 12; i++) {
    const a = hourAngle(ORGANS[i].start);
    const [x1, y1] = polar(R_SEC_IN, a);
    const [x2, y2] = polar(R_SEC_OUT, a);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'var(--gold)');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.5');
    svg.appendChild(line);
  }

  // ------- Center: 八卦 ring + 太极 (yin-yang) + 氣 pivot -------
  // The 太极 is oriented to match the clock's time positions:
  //   Top (子时, midnight) = yin (black)
  //   Bottom (午时, noon)  = yang (white)
  //   Right (卯时, sunrise) and left (酉时, sunset) = the rotating boundary
  // The 八卦 ring uses 后天八卦 with 坎 (water/night) at top, 离 (fire/noon) at bottom.
  buildCenter(svg);

  // Hands
  hourH = makeHand(70, 'hand-hour');
  minH  = makeHand(88, 'hand-minute');
  secH  = makeHand(96, 'hand-second');
  svg.appendChild(hourH);
  svg.appendChild(minH);
  svg.appendChild(secH);

  const dot = makeCircle(4, 'center-pivot');
  dot.setAttribute('fill', 'var(--gold-bright)');
  dot.setAttribute('stroke', 'var(--bg-deep)');
  dot.setAttribute('stroke-width', '1');
  svg.appendChild(dot);
}

/* ============================================================
   CENTER: 八卦 ring + 太极 + 氣 pivot
   ============================================================ */

function buildCenter(svg) {
  // 八卦 ring — 先天八卦 (Pre-Heaven) sequence aligned to our 24-hour clock convention.
  // Our clock face has midnight at top, noon at bottom, sunrise at right, sunset at left.
  // The classical 先天八卦 puts 乾 (pure yang, south, max-light) opposite 坤 (pure yin,
  // north, max-dark), with 离 (sun/east) and 坎 (moon/west) on the sides.
  // Mapped to our orientation:
  //   坤 ☷ (earth, pure yin, north/midnight) at TOP        → 子时
  //   艮 ☶ at top-right (between 坤 and 离)
  //   离 ☲ (fire/sun, east, sunrise) at RIGHT              → 卯时
  //   兑 ☱ at bottom-right (between 离 and 乾)
  //   乾 ☰ (heaven, pure yang, south/noon) at BOTTOM       → 午时
  //   巽 ☴ at bottom-left (between 乾 and 坎)
  //   坎 ☵ (water/moon, west, sunset) at LEFT              → 酉时
  //   震 ☳ at top-left (between 坎 and 坤)
  const trigrams = [
    { name: '坤', symbol: '☷', meaning: 'Earth · pure yin · north · midnight (子时)' },
    { name: '艮', symbol: '☶', meaning: 'Mountain · stillness · top-right' },
    { name: '离', symbol: '☲', meaning: 'Fire · sun · east · sunrise (卯时)' },
    { name: '兑', symbol: '☱', meaning: 'Lake · joy · bottom-right' },
    { name: '乾', symbol: '☰', meaning: 'Heaven · pure yang · south · noon (午时)' },
    { name: '巽', symbol: '☴', meaning: 'Wind · gentle penetration · bottom-left' },
    { name: '坎', symbol: '☵', meaning: 'Water · moon · west · sunset (酉时)' },
    { name: '震', symbol: '☳', meaning: 'Thunder · arousing · top-left' }
  ];

  const R_BAGUA_OUTER = R_INNER;        // 100 — matches the inner edge of the sector ring
  const R_BAGUA_INNER = R_INNER - 22;   // 78 — inner edge of the bagua band
  const R_TAIJI       = R_BAGUA_INNER - 10;  // 68 — leaves a clear 10px gap before the 太极

  // 八卦 ring outer band — warm dark cinnabar disc, not page-background color
  const baguaBg = document.createElementNS(NS, 'circle');
  baguaBg.setAttribute('r', R_BAGUA_OUTER);
  baguaBg.setAttribute('class', 'bagua-ring-outer');
  svg.appendChild(baguaBg);

  // Inner edge — slightly darker, sets up a faint ring shadow
  const baguaInnerEdge = document.createElementNS(NS, 'circle');
  baguaInnerEdge.setAttribute('r', R_BAGUA_INNER);
  baguaInnerEdge.setAttribute('class', 'bagua-ring-inner');
  svg.appendChild(baguaInnerEdge);

  // 八卦 trigrams around the ring (8 evenly spaced positions) — also
  // wired into the per-sector hover cycle. For each trigram, figure
  // out which sector contains its angle; if the angle sits exactly
  // on a sector boundary (which it does for half of the 8 trigrams),
  // assign it to BOTH neighboring sectors so both can include it.
  trigrams.forEach((tg, i) => {
    const angle = i * 45;
    const r = (R_BAGUA_OUTER + R_BAGUA_INNER) / 2;
    const [x, y] = polar(r, angle);
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'central');
    t.setAttribute('class', 'bagua-trigram clock-zoom');
    t.textContent = tg.symbol;
    const titleEl = document.createElementNS(NS, 'title');
    titleEl.textContent = `${tg.name} ${tg.symbol} — ${tg.meaning}`;
    t.appendChild(titleEl);

    // Map this trigram's angle to its owning sector(s).
    const owners = new Set();
    ORGANS.forEach((o, oi) => {
      const sA = hourAngle(o.start);
      const eAdj = (o.end <= o.start) ? o.end + 24 : o.end;
      const eA = hourAngle(eAdj);
      // Bring `angle` into the same revolution as [sA, eA]
      let a = angle;
      if (a < sA) a += 360;
      if (a > sA && a < eA) owners.add(oi);     // strictly inside
      // Boundary: angle == sA (i.e. trigram sits at this sector's start
      // edge) → tag this sector AND the previous one.
      if (Math.abs(angle - hourAngle(o.start)) < 0.01) {
        owners.add(oi);
        owners.add((oi + ORGANS.length - 1) % ORGANS.length);
      }
    });
    if (owners.size) {
      t.setAttribute('data-sector-idx', Array.from(owners).join(' '));
    }
    svg.appendChild(t);
  });

  // Subtle dividers between the eight 八卦 octants
  for (let i = 0; i < 8; i++) {
    const angle = i * 45 + 22.5;  // halfway between trigrams
    const [x1, y1] = polar(R_BAGUA_INNER, angle);
    const [x2, y2] = polar(R_BAGUA_OUTER, angle);
    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'var(--gold)');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.35');
    svg.appendChild(line);
  }

  // 太极 (yin-yang) — built using two SVG paths that exactly match the reference
  // 八卦时钟 (FWD/福沃德). The S-curve runs from top to bottom in a backwards-S
  // shape, producing:
  //   YIN  (dark) = upper-right LARGE lobe + small lobe at center-bottom
  //   YANG (light) = lower-left LARGE lobe + small lobe at center-top
  //
  // From the user's description (which matches the reference image):
  //   "the Yang (white) fish is heading down [head at bottom] and the tail tip
  //    is at 2400 [top]; the Yin (black fish) is heading upwards pointing
  //    upright 2400 with tail tip at 1200 [bottom]"
  //
  // Eyes:
  //   Yang eye (small light dot) sits inside the yin head, at the very TOP (24:00)
  //   Yin eye  (small dark dot)  sits inside the yang head, at the very BOTTOM (12:00)

  const R = R_TAIJI;
  const r_small = R / 2;

  // (1) Full circle filled YIN (dark) as the base
  const yinBase = document.createElementNS(NS, 'circle');
  yinBase.setAttribute('r', R);
  yinBase.setAttribute('class', 'taiji-yin');
  svg.appendChild(yinBase);

  // (2) The YANG fish path — drawn over the yin base.
  //     Path traces the boundary: starting at top, big arc CW down through the
  //     RIGHT side to bottom, then small arc back UP through the center to top
  //     curving along the LEFT side.  This produces the lower-right + small
  //     upper-left region as yang, matching the reference exactly.
  const yangFish = document.createElementNS(NS, 'path');
  yangFish.setAttribute('d', `
    M 0 ${-R}
    A ${R} ${R} 0 0 1 0 ${R}
    A ${r_small} ${r_small} 0 0 1 0 0
    A ${r_small} ${r_small} 0 0 0 0 ${-R}
    Z
  `);
  yangFish.setAttribute('class', 'taiji-yang');
  svg.appendChild(yangFish);

  // (3) Yang eye — small light dot at the TOP, inside the yin head, pointing up
  //     toward 24:00 (the yin extremum where the seed of yang is born)
  const yangEye = document.createElementNS(NS, 'circle');
  yangEye.setAttribute('cx', 0);
  yangEye.setAttribute('cy', -r_small);
  yangEye.setAttribute('r', R / 9);
  yangEye.setAttribute('class', 'taiji-eye-light');
  svg.appendChild(yangEye);

  // (4) Yin eye — small dark dot at the BOTTOM, inside the yang head, pointing
  //     down toward 12:00 (the yang extremum where the seed of yin is born)
  const yinEye = document.createElementNS(NS, 'circle');
  yinEye.setAttribute('cx', 0);
  yinEye.setAttribute('cy', r_small);
  yinEye.setAttribute('r', R / 9);
  yinEye.setAttribute('class', 'taiji-eye-dark');
  svg.appendChild(yinEye);

  // The 氣 pivot — a small red disc at the dead center, with the character on top.
  // Sits OVER the 太极's central crossing-point, marking the still axis around which
  // the hands rotate.
  const qiDisc = document.createElementNS(NS, 'circle');
  qiDisc.setAttribute('r', 11);
  qiDisc.setAttribute('class', 'taiji-qi-disc');
  svg.appendChild(qiDisc);

  const qiMark = document.createElementNS(NS, 'text');
  qiMark.setAttribute('x', 0);
  qiMark.setAttribute('y', 0);
  qiMark.setAttribute('text-anchor', 'middle');
  qiMark.setAttribute('dominant-baseline', 'central');
  qiMark.setAttribute('class', 'taiji-qi-mark');
  qiMark.textContent = '氣';
  svg.appendChild(qiMark);
}

/* ===================== LIVE CLOCK + NOW-STRIP ===================== */

function rotateHand(group, deg, animate = true) {
  if (!group) return;
  if (!animate) group.classList.add('no-anim');
  group.setAttribute('transform', `rotate(${deg})`);
  if (!animate) {
    void group.getBoundingClientRect();
    group.classList.remove('no-anim');
  }
}

let lastSec = -1;
let lastOrganIdxClock = -1;

// Music scheduler: pick the current track for the active organ.
// Track changes when the organ changes, or every ~4 minutes.
let trackIdx = 0;
let trackOrgan = -1;
let trackChangedAt = Date.now();
const TRACK_DURATION_MS = 4 * 60 * 1000;

function currentTrack(organIdx) {
  if (organIdx !== trackOrgan) {
    trackOrgan = organIdx;
    trackIdx = 0;
    trackChangedAt = Date.now();
  } else if (Date.now() - trackChangedAt > TRACK_DURATION_MS) {
    const list = ORGANS[organIdx].tracks;
    trackIdx = (trackIdx + 1) % list.length;
    trackChangedAt = Date.now();
  }
  return ORGANS[organIdx].tracks[trackIdx];
}

function highlightSectors(idx) {
  document.querySelectorAll('.sector').forEach((s, i) => {
    const o = ORGANS[i];
    if (i === idx) {
      s.classList.add('active');
      s.setAttribute('fill', ELEMENT_FILL_ACTIVE[o.element]);
      s.style.opacity = '1';
    } else {
      s.classList.remove('active');
      s.setAttribute('fill', ELEMENT_FILL[o.element]);
      s.style.opacity = '0.7';
    }
  });
}

function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  // CTM-Clock formulas
  const hourDeg = h * 15 + m * 0.25;
  const minDeg  = m * 6  + s * 0.1;
  const secDeg  = s * 6;

  const wrapping = (lastSec === 59 && s === 0);
  rotateHand(secH, secDeg, !wrapping);
  rotateHand(minH, minDeg, !wrapping);
  rotateHand(hourH, hourDeg, true);
  lastSec = s;

  // Now-strip text
  const timeStr = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  const nowTime = document.getElementById('now-time');
  if (nowTime) nowTime.innerHTML = `${timeStr}<small>NOW · ${String(s).padStart(2,'0')}</small>`;

  const idx = getCurrentIdx(now);
  const o = ORGANS[idx];
  const nowName = document.getElementById('now-name');
  const nowBranch = document.getElementById('now-branch');
  const nowTip = document.getElementById('now-tip');
  const nowTone = document.getElementById('now-tone');
  const nowTrack = document.getElementById('now-track');
  if (nowName) nowName.innerHTML = `<span class="cn" data-zh-auto>${o.cn}</span> ${o.organ}`;
  // Wrap each Chinese-bearing fragment in data-zh-auto so the
  // 简/繁 toggle picks them up. textContent strips HTML, so use
  // innerHTML for these.
  if (nowBranch) nowBranch.innerHTML = `<span data-zh-auto>${o.chineseHour}</span> · ${o.zodiacEmoji}`;
  if (nowTip) nowTip.textContent = `"${o.practices[0]}"`;
  if (nowTone) nowTone.innerHTML = `<span data-zh-auto>${o.tone}</span>`;
  // Music track display: only auto-cycle when nothing else has
  // claimed the slot. tcm-music.js sets data-claimed-by="player"
  // when it pushes the playing-track name; in that case we leave
  // it alone so the displayed name matches the audio.
  if (nowTrack && nowTrack.dataset.claimedBy !== 'player') {
    nowTrack.innerHTML = `♫ <span data-zh-auto>${currentTrack(idx)}</span>`;
  }

  // Highlight current sector on every tick;
  // notify other pages about hour change via a custom event
  if (idx !== lastOrganIdxClock) {
    lastOrganIdxClock = idx;
    highlightSectors(idx);
    // Time-dependent modes (灵龟八法 / 飞腾八法) compute each sector's
    // open 穴 from the current day-pillar + hour-branch. The day-pillar
    // flips at 子时 (23:00), so re-render whenever the active hour
    // changes — cheap (60 / 12 SVG text nodes) and guarantees the
    // labels stay correct across midnight.
    if (_clockMode === 'lingui' || _clockMode === 'feiteng') {
      renderModeLabels();
    }
    setActiveSector(idx);   // retarget the always-on 2× cycle
    document.dispatchEvent(new CustomEvent('hourchange', { detail: { idx } }));
  }
}

function bindClockModeTabs() {
  document.querySelectorAll('.clock-mode-tab').forEach(tab => {
    if (tab.disabled) return;
    tab.addEventListener('click', () => setClockMode(tab.dataset.mode));
  });
  // Restore persisted choice on load
  _clockMode = getClockMode();
  document.querySelectorAll('.clock-mode-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === _clockMode);
  });
}

/* ===================== INIT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  injectSidebarScaffold();
  highlightActiveMenu();
  initTopbarBehaviour();
  buildClock();
  bindClockModeTabs();
  renderModeLabels();
  bindSectorHoverCycle();
  updateClock();
  setInterval(updateClock, 1000);
  initSPANav();
});

/* ============================================================
   SPA-style navigation
   --------------------
   Menu clicks normally trigger a full page reload, which destroys the
   <audio> element and stops the music. To keep playback continuous
   across menu navigation, we intercept menu-btn clicks (and topbar-
   select changes), fetch the destination page, and swap ONLY the
   .main-content region — leaving the sidebar, topbar, music panel,
   and <audio> element untouched.

   We also patch document.addEventListener so DOMContentLoaded
   listeners added by the new page's inline scripts (after the real
   event has long since fired) still execute on the next microtask.
   That makes existing per-page init code work unchanged.
   ============================================================ */
function initSPANav() {
  if (window.__tcmSPAReady) return;
  window.__tcmSPAReady = true;

  // 1. Patch DOMContentLoaded so handlers added during a SPA load run.
  let domLoaded = (document.readyState !== 'loading');
  document.addEventListener('DOMContentLoaded', () => { domLoaded = true; }, { once: true });
  const origAddListener = document.addEventListener.bind(document);
  document.addEventListener = function (type, listener, options) {
    if (type === 'DOMContentLoaded' && domLoaded) {
      Promise.resolve().then(() => {
        try { listener(new Event('DOMContentLoaded')); } catch (e) { console.warn(e); }
      });
      return;
    }
    return origAddListener(type, listener, options);
  };

  // 2. Click intercept on menu links (delegated, survives content swap).
  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('a.menu-btn');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;  // open-in-new-tab
    e.preventDefault();
    spaNavigate(href);
  }, true);  // capture phase so we beat any other handler

  // 3. Topbar dropdown — change event also triggers SPA nav.
  document.addEventListener('change', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('topbar-select')) {
      const href = e.target.value;
      if (href && href !== location.pathname.split('/').pop()) {
        spaNavigate(href);
      }
    }
  }, true);

  // 4. Browser back/forward.
  window.addEventListener('popstate', () => {
    spaNavigate(location.pathname + location.search, { skipPush: true });
  });
}

let _spaInFlight = null;
async function spaNavigate(href, opts) {
  opts = opts || {};
  if (_spaInFlight) return;       // ignore taps while a fetch is mid-flight
  _spaInFlight = href;
  try {
    const resp = await fetch(href, { credentials: 'same-origin' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const html = await resp.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Update <title> and body data-page so the rest of the site reacts.
    if (doc.title) document.title = doc.title;
    const newPage = doc.body.getAttribute('data-page');
    if (newPage) document.body.setAttribute('data-page', newPage);

    // Swap .main-content. Keep sidebar, topbar, music panel, audio intact.
    const newMain = doc.querySelector('.main-content');
    const oldMain = document.querySelector('.main-content');
    if (newMain && oldMain) {
      oldMain.replaceWith(newMain);
    }

    // Update URL (unless this is a popstate-triggered nav).
    if (!opts.skipPush) {
      history.pushState({}, '', href);
    }

    // Re-execute scripts from the new document. Look at the WHOLE body of
    // the fetched document, not just .main-content — per-page init code
    // typically lives in inline <script> tags at the bottom of <body>,
    // outside .main-content. Without this, the swapped page renders an
    // empty grid / placeholder because the build-on-DOMContentLoaded
    // script never runs.
    const scripts = doc.body.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const src = oldScript.getAttribute('src');
      if (src) {
        // External script — skip if same src already in document.
        const sel = 'script[src="' + src.replace(/"/g, '\\"') + '"]';
        if (document.querySelector(sel)) return;
        const s = document.createElement('script');
        for (const a of oldScript.attributes) s.setAttribute(a.name, a.value);
        document.head.appendChild(s);
      } else {
        // Inline — re-create so it runs. document.createElement +
        // appendChild is the canonical way to make injected script
        // content actually execute.
        //
        // Wrap the script body in an IIFE so each SPA-nav invocation
        // gets its own scope. Without this, top-level `const`/`let`
        // declarations (e.g. `const ELEMENT_CN = ...` at the top of
        // index.html and hours.html's per-page init script) go to the
        // shared script-global lexical environment and the SECOND
        // invocation throws SyntaxError: Identifier already declared,
        // killing the DOMContentLoaded listener that builds the page.
        // Module scripts and inline scripts that depend on cross-script
        // shared state are not used here, so IIFE-wrapping is safe.
        const s = document.createElement('script');
        for (const a of oldScript.attributes) s.setAttribute(a.name, a.value);
        s.textContent = '(function(){\n' + oldScript.textContent + '\n})();';
        document.head.appendChild(s);
        s.parentNode && s.parentNode.removeChild(s);
      }
    });

    // Re-run cross-cutting initialisers that watch the menu state.
    if (typeof highlightActiveMenu === 'function') highlightActiveMenu();

    // Force the script-toggle to re-apply current variant to new content
    // (the MutationObserver in tcm-script-toggle should also catch new
    // [data-zh-*] elements, but this is a belt-and-braces nudge).
    if (window.tcmScript) window.tcmScript.set(window.tcmScript.get());

    // Decorate any new [data-term] tooltips. Same belt-and-braces note.
    if (window.tcmLink && typeof window.tcmLink.decorate === 'function') {
      window.tcmLink.decorate();
    }

    window.scrollTo(0, 0);
  } catch (err) {
    // Anything goes wrong → fall back to a real navigation.
    console.warn('SPA nav failed; falling back to full reload:', err);
    window.location.href = href;
  } finally {
    _spaInFlight = null;
  }
}
