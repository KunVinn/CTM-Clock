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
  const STORAGE_KEY = 'tcm-script';
  const DEFAULT_SCRIPT = 's';

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

  function applyScript(dir) {
    if (applying) return;
    applying = true;
    // 1. Explicit data-zh-s / data-zh-t markers — highest priority
    document.querySelectorAll('[data-zh-s], [data-zh-t]').forEach(el => {
      const s = el.dataset.zhS;
      const t = el.dataset.zhT;
      if (dir === 't' && t) el.textContent = t;
      else if (dir === 's' && s) el.textContent = s;
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
      el.textContent = convertString(original, dir);
    });

    // Track on <html> for any CSS that wants to react
    document.documentElement.dataset.script = dir;

    // Update toggle button label if present
    const btn = document.getElementById('script-toggle');
    if (btn) {
      btn.textContent = dir === 't' ? '简' : '繁';
      btn.setAttribute('aria-label',
        dir === 't' ? 'Switch to Simplified Chinese' : 'Switch to Traditional Chinese');
      btn.title = dir === 't' ? '切换到简体' : '切換到繁體';
    }
    applying = false;
  }

  function toggle() {
    const curr = getCurrent();
    const next = curr === 't' ? 's' : 't';
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
