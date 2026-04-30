/* ============================================================
   tcm-link.js
   Auto-decorates any element with [data-term="..."]:
     - Adds class .term-link
     - Wraps content as a clickable link to internal page or Wikipedia
     - Shows a hover/tap tooltip with the definition
   Also exposes window.openTermPopover(termKey) for programmatic use.
   ============================================================ */

(function () {
  // Build singleton tooltip element
  let tooltip = null;
  function ensureTooltip() {
    if (tooltip) return tooltip;
    tooltip = document.createElement('div');
    tooltip.className = 'term-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    return tooltip;
  }

  // Pick the citation URL appropriate to the current language mode.
  // 简/繁/中 prefer Chinese-source references (yibian.hopto.org for
  // acupuncture, shidianguji.com for classical texts, baike.baidu.com
  // for everything else); EN keeps the original (usually Wikipedia).
  //
  // For Wikipedia-only entries we derive a Baidu Baike URL on the fly
  // from the Chinese term in entry.cn — saves having to author urlCn
  // by hand for 70+ glossary entries.
  function pickUrl(entry) {
    const mode = (window.tcmScript && window.tcmScript.get && window.tcmScript.get()) || 's';
    if (mode === 'e') return entry.url;
    if (entry.urlCn) return entry.urlCn;
    // Fallback: if the only reference is Wikipedia, route to the
    // equivalent Baidu Baike page for the Chinese term.
    if (entry.url && /(?:^|\.)wikipedia\.org\//.test(entry.url) && entry.cn) {
      // entry.cn looks like '氣 / 气 · Qì' or '茯苓 · Fú Líng'.
      // Take the head part before the pinyin separator '·', then
      // split on '/' (Trad / Simp) and prefer the second half (Simp).
      const head = entry.cn.split('·')[0];
      const pieces = head.split('/').map(s => s.trim()).filter(Boolean);
      const term = pieces[1] || pieces[0];
      if (term) {
        return 'https://baike.baidu.com/item/' + encodeURIComponent(term);
      }
    }
    return entry.url;
  }

  // Pick the backup URL for 简/繁/中 mode. Returns null in EN mode or
  // when no sensible backup exists.
  // 1. Explicit entry.urlCnBackup wins (used by the 14 meridian entries
  //    where primary is rhky.com and backup is yibian.hopto.org).
  // 2. Otherwise, if the entry's primary reference is Wikipedia (we
  //    know the term has a Wikipedia article), derive a zh.wikipedia.org
  //    URL from entry.cn so users can fall back to the Chinese
  //    Wikipedia version of the same article.
  function pickBackupUrl(entry) {
    if (entry.urlCnBackup) return entry.urlCnBackup;
    if (entry.url && /(?:^|\.)wikipedia\.org\//.test(entry.url) && entry.cn) {
      const head = entry.cn.split('·')[0];
      const pieces = head.split('/').map(s => s.trim()).filter(Boolean);
      const term = pieces[1] || pieces[0];
      if (term) {
        return 'https://zh.wikipedia.org/wiki/' + encodeURIComponent(term);
      }
    }
    return null;
  }

  function buildTooltipHTML(entry) {
    const mode = (window.tcmScript && window.tcmScript.get && window.tcmScript.get()) || 's';
    const url = pickUrl(entry);
    const isCn = url && url !== entry.url;
    const linkLabel = entry.page ? '→ Open page'
                    : isCn      ? '→ 查阅原典'
                                : '→ Read on Wikipedia';
    const linkHref = entry.page || url || '#';
    const linkAttrs = entry.page ? '' : 'target="_blank" rel="noopener"';
    // In 简/繁/中 mode, show a small backup link next to the primary
    // reference. Falls back gracefully if the primary URL (e.g. a
    // session-token-bearing course URL) ever stops working.
    let backupHTML = '';
    if (mode !== 'e' && !entry.page) {
      const backupUrl = pickBackupUrl(entry);
      if (backupUrl && backupUrl !== linkHref) {
        backupHTML = `<a class="tt-link tt-link-backup" href="${backupUrl}" target="_blank" rel="noopener">→ 备用</a>`;
      }
    }
    return `
      <div class="tt-cn">${entry.cn || ''}</div>
      <div class="tt-en">${entry.en || ''}</div>
      <div class="tt-def">${entry.def || ''}</div>
      <a class="tt-link" href="${linkHref}" ${linkAttrs}>${linkLabel}</a>
      ${backupHTML}
    `;
  }

  function positionTooltip(el) {
    const tt = ensureTooltip();
    const rect = el.getBoundingClientRect();
    const ttRect = tt.getBoundingClientRect();
    const margin = 8;
    let top = rect.bottom + margin + window.scrollY;
    let left = rect.left + (rect.width / 2) - (ttRect.width / 2) + window.scrollX;
    // Keep within viewport horizontally
    const minLeft = margin + window.scrollX;
    const maxLeft = window.scrollX + window.innerWidth - ttRect.width - margin;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;
    // Flip above if off-screen below
    if (rect.bottom + ttRect.height + margin > window.innerHeight) {
      top = rect.top - ttRect.height - margin + window.scrollY;
    }
    tt.style.top = top + 'px';
    tt.style.left = left + 'px';
  }

  let currentEl = null;
  let hideTimer = null;

  function showTooltip(el, entry) {
    clearTimeout(hideTimer);
    const tt = ensureTooltip();
    tt.innerHTML = buildTooltipHTML(entry);
    tt.style.display = 'block';
    // Two paint frames so width is correct before positioning
    requestAnimationFrame(() => {
      positionTooltip(el);
      tt.classList.add('visible');
    });
    currentEl = el;
  }

  function hideTooltip() {
    if (!tooltip) return;
    hideTimer = setTimeout(() => {
      tooltip.classList.remove('visible');
      tooltip.style.display = 'none';
      currentEl = null;
    }, 120);
  }

  // Decorate all [data-term] elements
  function decorateTerms(root = document) {
    const nodes = root.querySelectorAll('[data-term]:not(.term-decorated)');
    nodes.forEach(el => {
      const key = el.dataset.term;
      const entry = lookupTerm(key);
      el.classList.add('term-decorated');
      if (!entry) {
        // Unknown term: leave as a faint marker but no link
        el.classList.add('term-unknown');
        el.title = `Unknown TCM term: ${key}`;
        return;
      }
      el.classList.add('term-link');
      // If element isn't already an anchor, wrap content
      if (el.tagName !== 'A') {
        el.setAttribute('tabindex', '0');
      }
      el.setAttribute('aria-describedby', 'term-tooltip');

      // Hover/focus
      el.addEventListener('mouseenter', () => showTooltip(el, entry));
      el.addEventListener('mouseleave', hideTooltip);
      el.addEventListener('focus', () => showTooltip(el, entry));
      el.addEventListener('blur', hideTooltip);

      // Tap → open the link (or internal page). URL respects the
      // currently selected language mode (CN sources for s/t/c).
      el.addEventListener('click', (e) => {
        if (el.tagName !== 'A') {
          const href = entry.page || pickUrl(entry);
          if (!href) return;
          if (entry.page) {
            window.location.href = href;
          } else {
            window.open(href, '_blank', 'noopener');
          }
          e.preventDefault();
        }
      });
    });

    // Keep tooltip alive when cursor enters it (so users can click "Read more")
    const tt = ensureTooltip();
    tt.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    tt.addEventListener('mouseleave', hideTooltip);
  }

  // Re-decorate when DOM changes (e.g. SPA-style updates on the Today page)
  function watchForChanges() {
    const obs = new MutationObserver(() => decorateTerms());
    obs.observe(document.body, { childList: true, subtree: true });
  }

  // Expose for programmatic use
  window.openTermPopover = function (termKey) {
    const entry = lookupTerm(termKey);
    if (!entry) return;
    if (entry.page) {
      window.location.href = entry.page;
    } else {
      const url = pickUrl(entry);
      if (url) window.open(url, '_blank', 'noopener');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    decorateTerms();
    watchForChanges();
  });
})();
