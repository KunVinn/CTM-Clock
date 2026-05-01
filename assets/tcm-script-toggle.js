/* ============================================================
   tcm-script-toggle.js
   Lets the user switch between Simplified (简体) and Traditional (繁體)
   Chinese throughout the site.

   How content is marked:
   - Elements that should be swapped have `data-zh-s` (simplified) and
     `data-zh-t` (traditional) attributes.
   - Inline form: <span data-zh-s="经络" data-zh-t="經絡">经络</span>
   - The element's text content is replaced with the value matching
     the active script.

   Fallback: if an element has only one of the two variants set, that
   variant is used for both modes.

   Persistence: the chosen script is stored in localStorage as
   "tcm-script" = "s" or "t".
   ============================================================ */

(function () {
  const STORAGE_KEY     = 'tcm-script';      // 's' | 't' | 'e' | 'c'
  const VARIANT_KEY     = 'tcm-script-cn';   // 's' | 't' — used only in 'c' mode
  const DEFAULT_SCRIPT  = 's';

  // Lightweight character-level mapping for the most common
  // Simplified ↔ Traditional differences seen on this site.
  // This lets us auto-convert content that *isn't* explicitly marked.
  // (Built from the actual Chinese vocabulary used across the site.)
  const S_TO_T = {
    // Organs & body
    '肝': '肝', '心': '心', '脾': '脾', '肺': '肺', '肾': '腎',
    '胆': '膽', '胃': '胃', '小肠': '小腸', '大肠': '大腸',
    '膀胱': '膀胱', '心包': '心包', '三焦': '三焦',
    // Common words
    '经络': '經絡', '气': '氣', '阴': '陰', '阳': '陽',
    '阴阳': '陰陽', '阳明': '陽明', '阴虚': '陰虛', '阳虚': '陽虛',
    '气虚': '氣虛', '血虚': '血虛', '气滞': '氣滯', '湿热': '濕熱',
    '湿': '濕', '热': '熱', '寒': '寒', '燥': '燥',
    '当归': '當歸', '黄芪': '黃芪', '麦冬': '麥冬', '黄芩': '黃芩',
    '陈皮': '陳皮', '远志': '遠志', '合欢花': '合歡花',
    '酸枣仁': '酸棗仁', '大枣': '大棗', '生姜': '生薑',
    '车前子': '車前子', '泽泻': '澤瀉', '熟地黄': '熟地黃',
    '丹参': '丹參', '人参': '人參', '山药': '山藥',
    '金钱草': '金錢草', '决明子': '決明子',
    // Concepts & verbs
    '观': '觀', '听': '聽', '问': '問', '诊': '診',
    '舌诊': '舌診', '脉诊': '脈診', '四诊': '四診',
    '识': '識', '图': '圖', '谱': '譜', '说': '說',
    '话': '話', '风': '風', '动': '動', '脏': '臟',
    '腑': '腑', '术': '術', '医': '醫', '药': '藥',
    '体': '體', '内': '內', '从': '從', '为': '為',
    '没': '沒', '会': '會', '应': '應', '点': '點',
    '历': '歷', '门': '門', '间': '間', '时': '時',
    '辰': '辰', '专': '專', '业': '業', '学': '學',
    '习': '習', '义': '義', '简': '簡', '繁': '繁',
    '体': '體',
    // 五行 etc
    '五脏': '五臟', '五气': '五氣', '五志': '五志',
    '五声': '五聲', '五华': '五華', '五液': '五液',
    '五藏': '五藏',
    // Acupuncture vocabulary
    '针灸': '針灸', '经络': '經絡', '归经': '歸經',
    '十二经脉': '十二經脈', '十二正经': '十二正經',
    '奇经八脉': '奇經八脈', '督脉': '督脈', '任脉': '任脈',
    '冲脉': '衝脈', '带脉': '帶脈',
    '阴维脉': '陰維脈', '阳维脉': '陽維脈',
    '阴跷脉': '陰蹻脈', '阳跷脉': '陽蹻脈',
    '五输穴': '五輸穴', '五腧穴': '五腧穴',
    '井穴': '井穴', '荥穴': '滎穴', '输穴': '輸穴',
    '经穴': '經穴', '合穴': '合穴', '原穴': '原穴',
    '络穴': '絡穴', '募穴': '募穴',
    '背俞穴': '背俞穴', '郄穴': '郄穴', '下合穴': '下合穴',
    '八会穴': '八會穴', '八脉交会穴': '八脈交會穴',
    '八总穴': '八總穴', '八总': '八總', '阿是穴': '阿是穴',
    '足三里': '足三里', '关元': '關元', '气海': '氣海',
    '神阙': '神闕', '命门': '命門', '三阴交': '三陰交',
    '阴陵泉': '陰陵泉', '太溪': '太谿', '太冲': '太衝',
    '丰隆': '豐隆', '中脘': '中脘', '膻中': '膻中',
    '膈俞': '膈俞', '血海': '血海', '照海': '照海',
    '合谷': '合谷', '曲池': '曲池', '大椎': '大椎',
    '穴位': '穴位', '针刺': '針刺', '艾灸': '艾灸', '按摩': '按摩',
    '针灸经络': '針灸經絡',
    // Common UI text
    '简体': '簡體', '繁体': '繁體',
    '此刻': '此刻', '十二时辰': '十二時辰', '五行': '五行',
    '知识图谱': '知識圖譜', '舌诊': '舌診',
    '日修': '日修', '关于': '關於',
    '春': '春', '夏': '夏', '秋': '秋', '冬': '冬', '长夏': '長夏',
    '东': '東', '南': '南', '西': '西', '北': '北', '中': '中',
    '寒': '寒', '风': '風', '暑': '暑',
    '酸': '酸', '苦': '苦', '甘': '甘', '辛': '辛', '咸': '鹹',
    '红': '紅', '青': '青', '黄': '黃', '白': '白', '黑': '黑',
    '怒': '怒', '喜': '喜', '思': '思', '悲': '悲', '恐': '恐',
    '魂': '魂', '神': '神', '意': '意', '魄': '魄', '志': '志',
    '筋': '筋', '脉': '脈', '皮': '皮', '骨': '骨', '肉': '肉',
    '目': '目', '舌': '舌', '口': '口', '鼻': '鼻', '耳': '耳',
    '春': '春', '夏': '夏', '秋': '秋', '冬': '冬',
    '角': '角', '徵': '徵', '宫': '宮', '商': '商', '羽': '羽',
    // Tongue diagnosis specific
    '舌色': '舌色', '舌形': '舌形', '舌苔': '舌苔',
    '淡红': '淡紅', '淡白': '淡白', '红': '紅', '绛': '絳',
    '紫': '紫', '青紫': '青紫',
    '正常': '正常', '胖大': '胖大', '瘦薄': '瘦薄',
    '齿痕': '齒痕', '裂纹': '裂紋', '强硬': '強硬',
    '痿软': '痿軟', '红点': '紅點', '芒刺': '芒刺',
    '薄白苔': '薄白苔', '厚白苔': '厚白苔',
    '黄苔': '黃苔', '腻苔': '膩苔', '燥苔': '燥苔',
    '剥苔': '剝苔', '无苔': '無苔', '灰黑苔': '灰黑苔',
    // Tongue chart zones
    '尾闾': '尾閭', '丹田': '丹田', '肚脐': '肚臍',
    '肾区': '腎區', '胃功能区': '胃功能區', '胃区': '胃區',
    '中脘': '中脘', '肝胆区': '肝膽區', '胰脏区': '胰臟區',
    '巨阙': '巨闕', '右乳区': '右乳區', '左乳区': '左乳區',
    '膻中': '膻中', '肺区': '肺區', '心区': '心區',
    '天突': '天突', '心尖': '心尖',
    '舌尖': '舌尖', '舌前': '舌前', '舌中': '舌中',
    '舌边': '舌邊', '舌根': '舌根',
    // Pattern names
    '实热': '實熱', '寒证': '寒證', '湿': '濕',
    '血瘀': '血瘀',
    // Misc
    '观察': '觀察', '可能的体质模式': '可能的體質模式',
    '舌照': '舌照', '舌诊报告': '舌診報告',
    '综合判断': '綜合判斷', '自检': '自檢',
    // '体' → '體' and '气' → '氣' covered above
  };

  // Reverse map (built once)
  const T_TO_S = Object.fromEntries(
    Object.entries(S_TO_T).map(([s, t]) => [t, s])
  );

  function getCurrent() {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_SCRIPT;
    } catch (e) { return DEFAULT_SCRIPT; }
  }

  function setCurrent(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
    // Whenever the user explicitly picks 's' or 't', remember it so that
    // 'c' (Chinese-only) mode knows which variant to display.
    if (v === 's' || v === 't') {
      try { localStorage.setItem(VARIANT_KEY, v); } catch (e) {}
    }
  }
  function getCnVariant() {
    try {
      const v = localStorage.getItem(VARIANT_KEY);
      return (v === 't') ? 't' : 's';
    } catch (e) { return 's'; }
  }

  // Apply char-level mapping to a string. Greedy multi-char first.
  function convertString(text, dir) {
    if (!text) return text;
    const dict = (dir === 't') ? S_TO_T : T_TO_S;
    // Sort keys longest first so multi-character phrases match before single chars
    const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
    for (const k of keys) {
      if (text.indexOf(k) !== -1) {
        // Use split-join for safe replace-all without regex escaping
        text = text.split(k).join(dict[k]);
      }
    }
    return text;
  }

  let observer = null;
  let applying = false;  // re-entry guard

  // Wrap bare English text inside common bilingual containers so a
  // CSS rule can hide it in 'c' (Chinese-only) mode. Idempotent — every
  // wrapped node is marked with data-en-wrapped="1".
  function wrapEnglishSiblings() {
    const containers = document.querySelectorAll(
      '.menu-btn, .corr-tab, .selector-card-title, .now-strip-organ .name'
    );
    containers.forEach(container => {
      Array.from(container.childNodes).forEach(node => {
        if (node.nodeType !== 3) return;                     // text nodes only
        const text = node.nodeValue;
        if (!text || !text.trim()) return;
        if (node.parentElement && node.parentElement.dataset.enWrapped) return;
        const span = document.createElement('span');
        span.className = 'en-only';
        span.dataset.enWrapped = '1';
        span.textContent = text;
        node.parentNode.replaceChild(span, node);
      });
    });
  }

  function applyScript(dir) {
    if (applying) return;
    applying = true;

    // Resolve the *display* variant for elements that store data-zh-s/t.
    // 'c' (Chinese-only) reuses the user's last 简/繁 preference.
    const cnVariant = getCnVariant();          // 's' | 't'
    const displayDir = (dir === 'c') ? cnVariant : dir;

    // 1. Explicit data-zh-s / data-zh-t markers — highest priority
    document.querySelectorAll('[data-zh-s], [data-zh-t]').forEach(el => {
      const s = el.dataset.zhS;
      const t = el.dataset.zhT;
      // First-run snapshot of the inline (usually English) text so 'e'
      // mode can restore it. We only snapshot once per element.
      if (!el.dataset.zhE) el.dataset.zhE = el.textContent.trim();
      if (dir === 'e') {
        el.textContent = el.dataset.zhE || s || t || '';
      } else if (displayDir === 't' && t) el.textContent = t;
      else if (displayDir === 's' && s) el.textContent = s;
      else if (s) el.textContent = s;
      else if (t) el.textContent = t;
    });

    // 2. Auto-convert any element marked with data-zh-auto.
    //    We snapshot the original text on first run so toggling is reversible.
    document.querySelectorAll('[data-zh-auto]').forEach(el => {
      if (!el.dataset.zhOriginal) {
        el.dataset.zhOriginal = el.textContent;
      }
      const original = el.dataset.zhOriginal;
      // For 'e' mode the element is CSS-hidden anyway — textContent kept as
      // simplified CN so it stays valid for screen readers / copy-paste.
      const conv = (dir === 'e') ? 's' : displayDir;
      el.textContent = convertString(original, conv);
    });

    // Wrap bare English text in known bilingual containers so the
    // [data-script="c"] CSS rule can hide it cleanly. Idempotent.
    wrapEnglishSiblings();

    // Apply authored Chinese for body content when entering Chinese-only
    // mode, and restore it on the way out. The translator wraps each
    // translatable text node in a <span data-zh-trans="<original>"> so
    // toggling can round-trip.
    //
    // We DO NOT auto-call Gemini any more: TCM theory has canonical
    // Chinese terminology, and machine back-translation from English risks
    // producing inauthentic phrasing. Translation is opt-in via a banner
    // button so the user explicitly accepts when they want a Gemini fill.
    if (dir === 'c') {
      // Apply whatever Chinese is authored in the markup (.cn, .cn-mark,
      // .lang-cn-only siblings, [data-zh-auto], data-zh-s/data-zh-t) plus
      // any prior cached translations the user opted into. Don't nag
      // about leftover English — paragraphs without authored Chinese are
      // intentionally left as-is and the user can ignore or get to them
      // later with hand-authoring.
      autoApplyChineseFromCache(displayDir);
      hideTranslateBanner();
    } else {
      restoreEnglishFromTranslations();
      hideTranslateBanner();
    }

    // Track on <html> for any CSS that wants to react
    document.documentElement.dataset.script = dir;

    // Update toggle button label if present. Button shows the CURRENT mode;
    // the cycle order is s → t → e → c → s.
    const btn = document.getElementById('script-toggle');
    if (btn) {
      const labels = { s: '简', t: '繁', e: 'EN', c: '中' };
      const titles = {
        s: '当前: 简体双语 · 点击切换为繁體',
        t: '當前: 繁體雙語 · 點擊切換為 EN',
        e: 'Current: English-emphasized (Chinese still shown for context) · Click for Chinese-only',
        c: cnVariant === 't'
            ? '當前: 純繁體 · 點擊回到簡體雙語'
            : '当前: 纯简体 · 点击回到简体双语'
      };
      btn.textContent = labels[dir] || '?';
      btn.setAttribute('aria-label', titles[dir] || '');
      btn.title = titles[dir] || '';
    }
    applying = false;
  }

  /* ============================================================
     AUTO-TRANSLATION (中 mode only)
     Walks the DOM for English text nodes that no [data-zh-*] handler
     covers, wraps each one in a <span data-zh-trans="..."> so the
     original can be restored, applies cached translations
     immediately, and fetches missing pieces from Gemini if the user
     has saved a key on the Tongue page (tcm-tongue-gemini-key-v1).
     Per-page cache keyed by (pathname, variant) means subsequent
     visits and toggles are free.
     ============================================================ */
  const TRANS_CACHE_KEY = 'tcm-page-translations-v1';
  const GEMINI_KEY_STORE = 'tcm-tongue-gemini-key-v1';
  const DEEPSEEK_KEY_STORE = 'tcm-deepseek-key-v1';
  const PROVIDER_STORE = 'tcm-translate-provider-v1';

  // Provider registry. Both endpoints accept the same {chunk → JSON
  // array of strings} batch format we want, but their request shapes
  // differ — DeepSeek is OpenAI-compatible (Authorization: Bearer +
  // chat/completions), Gemini uses ?key= and contents/parts. The
  // translateBatch fn isolates that shape difference.
  const PROVIDERS = {
    gemini: {
      label: 'Gemini',
      keyStore: GEMINI_KEY_STORE,
      keyPlaceholder: 'AIza…',
      getKeyUrl: 'https://aistudio.google.com/apikey',
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      async translateBatch(key, chunk, variantName) {
        const prompt =
          `Translate the following English UI / content strings into ${variantName}. ` +
          `Reply with ONLY a JSON array of strings, in the same order, same length. ` +
          `Do not add commentary. Preserve numbers, punctuation, names, and inline HTML-like markers verbatim. ` +
          `Strings:\n${JSON.stringify(chunk)}`;
        const resp = await fetch(`${this.endpoint}?key=${encodeURIComponent(key)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0, responseMimeType: 'application/json' }
          })
        });
        if (!resp.ok) throw new Error('Gemini HTTP ' + resp.status);
        const json = await resp.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
        return parseLooseJsonArray(text);
      }
    },
    deepseek: {
      label: 'DeepSeek',
      keyStore: DEEPSEEK_KEY_STORE,
      keyPlaceholder: 'sk-…',
      getKeyUrl: 'https://platform.deepseek.com/api_keys',
      endpoint: 'https://api.deepseek.com/chat/completions',
      async translateBatch(key, chunk, variantName) {
        // DeepSeek's response_format=json_object requires an OBJECT,
        // not an array, so we wrap the request and unwrap on receipt.
        const sysMsg =
          `You translate English UI / content strings into ${variantName}. ` +
          `Reply ONLY with a JSON object {"translations": [...]} where the array has the same order and length as the input. ` +
          `Preserve numbers, punctuation, names, and inline HTML-like markers verbatim.`;
        const userMsg = JSON.stringify({ strings: chunk });
        const resp = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: sysMsg },
              { role: 'user', content: userMsg },
            ],
            temperature: 0,
            response_format: { type: 'json_object' },
          })
        });
        if (!resp.ok) throw new Error('DeepSeek HTTP ' + resp.status);
        const json = await resp.json();
        const text = json.choices?.[0]?.message?.content || '{}';
        const obj = parseLooseJsonObject(text);
        const arr = obj.translations || obj.result || obj.data;
        if (!Array.isArray(arr)) throw new Error('DeepSeek: no translations array');
        return arr;
      }
    }
  };

  // Tolerant JSON parsers — some models still wrap their output in
  // ```json fences even when asked not to.
  function parseLooseJsonArray(text) {
    try { return JSON.parse(text); } catch (_) {}
    const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    return JSON.parse(fence ? fence[1] : text);
  }
  function parseLooseJsonObject(text) {
    try { return JSON.parse(text); } catch (_) {}
    const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    return JSON.parse(fence ? fence[1] : text);
  }

  function getProvider() {
    try {
      const v = localStorage.getItem(PROVIDER_STORE);
      if (v && PROVIDERS[v]) return v;
    } catch (_) {}
    // Default to whichever has a saved key; tie → gemini for backward compat.
    if (localStorage.getItem(GEMINI_KEY_STORE)) return 'gemini';
    if (localStorage.getItem(DEEPSEEK_KEY_STORE)) return 'deepseek';
    return 'gemini';
  }
  function setProvider(p) {
    if (!PROVIDERS[p]) return;
    try { localStorage.setItem(PROVIDER_STORE, p); } catch (_) {}
  }
  function getApiKey(provider) {
    try { return localStorage.getItem(PROVIDERS[provider].keyStore) || ''; } catch (_) { return ''; }
  }
  function setApiKey(provider, key) {
    try { localStorage.setItem(PROVIDERS[provider].keyStore, key); } catch (_) {}
  }

  // CSS selectors that should NEVER be touched by auto-translation —
  // explicit zh-* markers handle these themselves, or they're code,
  // numbers, technical labels, etc.
  const NO_TRANSLATE_SELECTOR =
    'script,style,noscript,code,pre,textarea,input,select,option,' +
    '[data-zh-s],[data-zh-t],[data-zh-auto],[data-zh-trans],' +
    '.cn,.cn-mark,.label-organ-cn,.label-fangwei,.label-branch,' +
    '.label-zodiac,.label-organ-en,.label-hour,.bagua-trigram,' +
    '.acupoint-method,.acupoint-py,.acupoint-code,' +
    '.script-toggle,.nav-arrow,.cn-translate-banner,' +
    '#zoom-value,#zoom-range,.zoom-control-reset';

  // Back-compat alias for any external caller / inline script that
  // still references the old name. Returns the Gemini-specific key.
  function getGeminiKey() { return getApiKey('gemini'); }
  function readTransCache() {
    try { return JSON.parse(localStorage.getItem(TRANS_CACHE_KEY) || '{}'); } catch (_) { return {}; }
  }
  function writeTransCache(c) {
    try { localStorage.setItem(TRANS_CACHE_KEY, JSON.stringify(c)); } catch (_) {}
  }
  function pageCache(variant) {
    const all = readTransCache();
    const path = location.pathname || '/';
    return (all[path] && all[path][variant]) || {};
  }
  function mergePageCache(variant, additions) {
    const all = readTransCache();
    const path = location.pathname || '/';
    if (!all[path]) all[path] = {};
    all[path][variant] = Object.assign(all[path][variant] || {}, additions);
    writeTransCache(all);
  }

  // True if the given text node is worth translating.
  function isTranslatable(node) {
    const text = node.nodeValue;
    if (!text || !text.trim()) return false;
    if (!/[A-Za-z]/.test(text)) return false;          // must contain Latin letters
    let p = node.parentElement;
    while (p) {
      if (p.matches && p.matches(NO_TRANSLATE_SELECTOR)) return false;
      p = p.parentElement;
    }
    return true;
  }

  // Walk the DOM once: convert each translatable text node into
  // <span data-zh-trans="<original>">…</span>. Returns ALL wrapped spans
  // on the page, both pre-existing and newly created.
  function ensureTranslatableSpans() {
    // 1. Collect every already-wrapped span first — we want to apply
    //    cached translations to them on subsequent toggles too.
    const spans = Array.from(document.querySelectorAll('[data-zh-trans]'));
    // 2. Walk text nodes for new candidates not yet wrapped.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const candidates = [];
    let n;
    while ((n = walker.nextNode())) {
      if (isTranslatable(n)) candidates.push(n);
    }
    candidates.forEach(node => {
      const lead = node.nodeValue.match(/^\s*/)[0];
      const tail = node.nodeValue.match(/\s*$/)[0];
      const core = node.nodeValue.slice(lead.length, node.nodeValue.length - tail.length);
      if (!core.trim()) return;
      const span = document.createElement('span');
      span.dataset.zhTrans = core;       // original English snapshot
      span.textContent = core;
      const parent = node.parentNode;
      if (lead) parent.insertBefore(document.createTextNode(lead), node);
      parent.insertBefore(span, node);
      if (tail) parent.insertBefore(document.createTextNode(tail), node);
      parent.removeChild(node);
      spans.push(span);
    });
    return spans;
  }

  // Apply cached Chinese translations to all wrapped spans without any
  // network call. Returns the list of spans still missing a translation.
  function autoApplyChineseFromCache(variant) {
    const spans = ensureTranslatableSpans();
    const cache = pageCache(variant);
    const missing = [];
    spans.forEach(span => {
      const orig = span.dataset.zhTrans;
      if (cache[orig]) {
        span.textContent = cache[orig];
      } else {
        missing.push(span);
      }
    });
    return missing;
  }

  function restoreEnglishFromTranslations() {
    document.querySelectorAll('[data-zh-trans]').forEach(span => {
      span.textContent = span.dataset.zhTrans;
    });
  }

  let translatePending = null;
  function scheduleAutoTranslateFetch(variant) {
    // Defer slightly so the synchronous cache-application paint finishes first.
    if (translatePending) clearTimeout(translatePending);
    translatePending = setTimeout(() => fetchMissingTranslations(variant), 80);
  }

  // Banner shown automatically on entering 中 mode when some bare English
  // text remains. Translation is offered as an explicit opt-in so the
  // user knows TCM-source content is being machine-translated, not the
  // canonical Chinese. Two routes: tap the button to invoke Gemini for
  // this page, or dismiss to leave the English visible as-is.
  // Build a Gemini/DeepSeek radio row. Selecting one sets it as the
  // active provider AND re-renders the parent banner so the key
  // input/help link below switches to the new provider's defaults.
  function buildProviderRadios(onChange) {
    const wrap = document.createElement('span');
    wrap.className = 'cn-translate-providers';
    const current = getProvider();
    Object.keys(PROVIDERS).forEach(id => {
      const lbl = document.createElement('label');
      lbl.className = 'cn-translate-provider';
      const r = document.createElement('input');
      r.type = 'radio';
      r.name = 'cn-translate-provider';
      r.value = id;
      r.checked = (id === current);
      r.addEventListener('change', () => {
        if (r.checked) { setProvider(id); onChange && onChange(id); }
      });
      lbl.appendChild(r);
      lbl.appendChild(document.createTextNode(' ' + PROVIDERS[id].label));
      wrap.appendChild(lbl);
    });
    return wrap;
  }

  function showOptInTranslateBanner(missingCount, variant) {
    let banner = document.getElementById('cn-translate-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'cn-translate-banner';
      banner.className = 'cn-translate-banner';
      document.body.appendChild(banner);
    }

    const render = () => {
      const providerId = getProvider();
      const provider = PROVIDERS[providerId];
      const key = getApiKey(providerId);
      banner.innerHTML = '';
      banner.classList.remove('loading');
      banner.classList.add('with-input');

      const text = document.createElement('span');
      text.className = 'cn-translate-msg';
      text.textContent = '本页有 ' + missingCount + ' 段英文段落（多为说明性散文，非 TCM 经典原文）。机器翻译：';
      banner.appendChild(text);

      banner.appendChild(buildProviderRadios(() => render()));

      const row = document.createElement('div');
      row.className = 'cn-translate-row';

      if (!key) {
        const input = document.createElement('input');
        input.type = 'password';
        input.placeholder = provider.keyPlaceholder;
        input.autocomplete = 'off';
        input.spellcheck = false;
        const help = document.createElement('a');
        help.href = provider.getKeyUrl;
        help.target = '_blank';
        help.rel = 'noopener';
        help.textContent = '获取密钥 ↗';
        help.className = 'cn-translate-help';
        const saveBtn = document.createElement('button');
        saveBtn.type = 'button';
        saveBtn.textContent = '保存并翻译';
        const submit = () => {
          const v = (input.value || '').trim();
          if (!v) { input.focus(); return; }
          setApiKey(providerId, v);
          input.value = '';
          showTranslateBanner('正在用 ' + provider.label + ' 翻译此页…', true);
          fetchMissingTranslations(variant);
        };
        saveBtn.addEventListener('click', submit);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
        row.appendChild(input);
        row.appendChild(saveBtn);
        row.appendChild(help);
      } else {
        const goBtn = document.createElement('button');
        goBtn.type = 'button';
        goBtn.textContent = '用 ' + provider.label + ' 翻译本页';
        goBtn.addEventListener('click', () => {
          showTranslateBanner('正在用 ' + provider.label + ' 翻译此页…', true);
          fetchMissingTranslations(variant);
        });
        row.appendChild(goBtn);
      }
      banner.appendChild(row);

      const x = document.createElement('button');
      x.type = 'button';
      x.className = 'cn-translate-close';
      x.setAttribute('aria-label', 'Dismiss');
      x.textContent = '✕';
      x.addEventListener('click', hideTranslateBanner);
      banner.appendChild(x);
      banner.style.display = '';
    };
    render();
  }

  async function fetchMissingTranslations(variant) {
    const missing = autoApplyChineseFromCache(variant)
                       .filter(span => span.textContent === span.dataset.zhTrans);
    if (missing.length === 0) { hideTranslateBanner(); return; }

    const providerId = getProvider();
    const provider = PROVIDERS[providerId];
    const key = getApiKey(providerId);
    if (!key) {
      showTranslateBanner(
        `需要 ${provider.label} 密钥才能将本页全部翻译为中文：`,
        false,
        { askForKey: true, closable: true }
      );
      return;
    }

    const busyMsg = `正在用 ${provider.label} 翻译此页 / Translating with ${provider.label}…`;
    showTranslateBanner(busyMsg, true);
    try {
      const variantName = (variant === 't') ? 'Traditional Chinese (繁體)' : 'Simplified Chinese (简体)';
      const BATCH = 40;
      const newCache = {};
      const uniq = Array.from(new Set(missing.map(s => s.dataset.zhTrans)));
      for (let i = 0; i < uniq.length; i += BATCH) {
        const chunk = uniq.slice(i, i + BATCH);
        const parsed = await provider.translateBatch(key, chunk, variantName);
        chunk.forEach((eng, idx) => {
          const cn = (parsed && parsed[idx]) || eng;
          newCache[eng] = cn;
        });
      }
      mergePageCache(variant, newCache);
      missing.forEach(span => {
        const cn = newCache[span.dataset.zhTrans];
        if (cn) span.textContent = cn;
      });
      hideTranslateBanner();
    } catch (err) {
      console.warn('Auto-translate failed:', err);
      showTranslateBanner('翻译失败 / Translation failed: ' + (err.message || err), false, { closable: true });
    }
  }

  function showTranslateBanner(msg, loading, opts) {
    let banner = document.getElementById('cn-translate-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'cn-translate-banner';
      banner.className = 'cn-translate-banner';
      document.body.appendChild(banner);
    }
    banner.innerHTML = '';
    banner.classList.toggle('loading', !!loading);
    banner.classList.toggle('with-input', !!(opts && opts.askForKey));

    const text = document.createElement('span');
    text.className = 'cn-translate-msg';
    text.textContent = msg;
    banner.appendChild(text);

    // Inline key prompt so the user can enable 中 auto-translation
    // from anywhere on the site. Provider-aware: shows a Gemini /
    // DeepSeek radio so the user can pick or switch on the spot.
    if (opts && opts.askForKey) {
      const providerId = getProvider();
      const provider = PROVIDERS[providerId];

      banner.appendChild(buildProviderRadios((newId) => {
        // User changed provider — re-render the askForKey banner so
        // the placeholder, help link, and save behaviour update.
        showTranslateBanner(msg, loading, opts);
      }));

      const row = document.createElement('div');
      row.className = 'cn-translate-row';

      const input = document.createElement('input');
      input.type = 'password';
      input.placeholder = provider.keyPlaceholder;
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.id = 'cn-translate-key-input';

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.textContent = '保存并翻译';

      const help = document.createElement('a');
      help.href = provider.getKeyUrl;
      help.target = '_blank';
      help.rel = 'noopener';
      help.textContent = '获取密钥 ↗';
      help.className = 'cn-translate-help';

      const submit = () => {
        const v = (input.value || '').trim();
        if (!v) { input.focus(); return; }
        setApiKey(providerId, v);
        input.value = '';
        // Translate now using the current 中-mode variant
        if (getCurrent() === 'c') {
          showTranslateBanner('正在用 ' + provider.label + ' 翻译此页…', true);
          fetchMissingTranslations(getCnVariant());
        } else {
          hideTranslateBanner();
        }
      };
      saveBtn.addEventListener('click', submit);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

      row.appendChild(input);
      row.appendChild(saveBtn);
      row.appendChild(help);
      banner.appendChild(row);
    }

    if (opts && opts.closable) {
      const x = document.createElement('button');
      x.type = 'button';
      x.className = 'cn-translate-close';
      x.setAttribute('aria-label', 'Dismiss');
      x.textContent = '✕';
      x.addEventListener('click', hideTranslateBanner);
      banner.appendChild(x);
    }
    banner.style.display = '';
  }
  function hideTranslateBanner() {
    const banner = document.getElementById('cn-translate-banner');
    if (banner) banner.style.display = 'none';
  }

  function toggle() {
    const curr = getCurrent();
    // Cycle order: 简 → 繁 → EN → 中 → 简
    const next = curr === 's' ? 't'
              : curr === 't' ? 'e'
              : curr === 'e' ? 'c'
              : 's';
    setCurrent(next);
    applyScript(next);
  }

  // Inject the toggle button into the topbar
  function injectToggle() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    if (document.getElementById('script-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'script-toggle';
    btn.className = 'script-toggle';
    btn.type = 'button';
    btn.addEventListener('click', toggle);
    topbar.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectToggle();
    applyScript(getCurrent());

    // Re-apply when new content with data-zh-* attributes is added
    // (e.g., the Today page rebuilds the detail card on each hour change).
    // We listen ONLY for childList changes (added subtrees) — NOT for
    // characterData, which would fire on every textContent write we make.
    // We also debounce, and skip if applying is already in progress.
    let scheduled = false;
    observer = new MutationObserver((mutations) => {
      if (applying || scheduled) return;
      // Only react if at least one added node looks like it carries Chinese markers
      const interesting = mutations.some(m =>
        Array.from(m.addedNodes).some(n =>
          n.nodeType === 1 && (
            n.matches?.('[data-zh-s], [data-zh-t], [data-zh-auto]') ||
            n.querySelector?.('[data-zh-s], [data-zh-t], [data-zh-auto]')
          )
        )
      );
      if (!interesting) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        applyScript(getCurrent());
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });

  // Expose for programmatic use
  window.tcmScript = {
    get: getCurrent,
    set: (v) => { setCurrent(v); applyScript(v); },
    toggle,
    convert: convertString
  };
})();
