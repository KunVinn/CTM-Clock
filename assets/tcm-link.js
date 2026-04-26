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
  // acupuncture, shidianguji.com for classical texts); EN keeps Wikipedia.
  function pickUrl(entry) {
    const mode = (window.tcmScript && window.tcmScript.get && window.tcmScript.get()) || 's';
    if (mode !== 'e' && entry.urlCn) return entry.urlCn;
    return entry.url;
  }

  function buildTooltipHTML(entry) {
    const url = pickUrl(entry);
    const isCn = url && url !== entry.url;
    const linkLabel = entry.page ? '→ Open page'
                    : isCn      ? '→ 查阅原典'
                                : '→ Read on Wikipedia';
    const linkHref = entry.page || url || '#';
    const linkAttrs = entry.page ? '' : 'target="_blank" rel="noopener"';
    return `
      <div class="tt-cn">${entry.cn || ''}</div>
      <div class="tt-en">${entry.en || ''}</div>
      <div class="tt-def">${entry.def || ''}</div>
      <a class="tt-link" href="${linkHref}" ${linkAttrs}>${linkLabel}</a>
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
