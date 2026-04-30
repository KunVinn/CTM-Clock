// node scripts/dump-dual-links.js
// Walks assets/glossary.js (TERMS + TERM_ALIASES) and prints the
// CN-mode dual link (primary + backup) for every acupoint listed in
// 十六郄穴歌, 十二募穴, 十二经脉流注表, 妇科调经.
//
// No Wikipedia anywhere — primary is rhky urlCn (when present) or
// yibian url; backup is yibian urlCnBackup or auto-derived baike.

const fs = require('fs');
const path = require('path');

// Load glossary.js by reading its source and extracting TERMS / TERM_ALIASES
// via a sandboxed eval. The file uses top-level const declarations and a
// lookupTerm fn — we just want the two data tables.
const src = fs.readFileSync(
  path.join(__dirname, '..', 'assets', 'glossary.js'),
  'utf8'
);
const ctx = { TERMS: null, TERM_ALIASES: null };
const wrapped = src
  .replace(/^const TERMS\s*=/m, 'ctx.TERMS =')
  .replace(/^const TERM_ALIASES\s*=/m, 'ctx.TERM_ALIASES =');
new Function('ctx', wrapped + '\nreturn ctx;')(ctx);
const { TERMS, TERM_ALIASES } = ctx;

function pickCnPrimary(entry) {
  return entry.urlCn || entry.url || null;
}
function pickCnBackup(entry) {
  if (entry.urlCnBackup) return entry.urlCnBackup;
  if (!entry.cn) return null;
  const head = entry.cn.split('·')[0];
  const pieces = head.split('/').map(s => s.trim()).filter(Boolean);
  const term = pieces[1] || pieces[0];
  if (!term) return null;
  if (entry.url && /yibian\.hopto\.org/.test(entry.url)) {
    return 'https://baike.baidu.com/item/' + encodeURIComponent(term);
  }
  // Wikipedia primary → zh.wikipedia derived backup. Not used by acupoints.
  if (entry.url && /(?:^|\.)wikipedia\.org\//.test(entry.url)) {
    return 'https://zh.wikipedia.org/wiki/' + encodeURIComponent(term);
  }
  return null;
}

const sections = {
  '十六郄穴歌': [
    'lu6', 'li7', 'st34', 'sp8', 'ht6', 'si6', 'bl63', 'ki5',
    'pc4', 'te7', 'gb36', 'lv6', 'bl59', 'ki8', 'gb35', 'ki9'
  ],
  '十二募穴': [
    'lu1', 'cv14', 'lv14', 'gb24', 'lv13', 'cv12', 'st25', 'cv4',
    'cv5', 'cv3', 'cv17', 'gb25'
  ],
  '十二经脉流注表': [
    // Lung
    'lu11', 'lu10', 'lu9', 'lu8', 'lu5',
    // Large Intestine
    'li1', 'li2', 'li3', 'li4', 'li5', 'li11',
    // Stomach
    'st45', 'st44', 'st43', 'st42', 'st41', 'st36',
    // Spleen
    'sp1', 'sp2', 'sp3', 'sp5', 'sp9',
    // Heart
    'ht9', 'ht8', 'ht7', 'ht4', 'ht3',
    // Small Intestine
    'si1', 'si2', 'si3', 'si4', 'si5', 'si8',
    // Bladder
    'bl67', 'bl66', 'bl65', 'bl64', 'bl60', 'bl40',
    // Kidney
    'ki1', 'ki2', 'ki3', 'ki7', 'ki10',
    // Pericardium
    'pc9', 'pc8', 'pc7', 'pc5', 'pc3',
    // Triple Burner
    'te1', 'te2', 'te3', 'te4', 'te6', 'te10',
    // Gallbladder
    'gb44', 'gb43', 'gb41', 'gb40', 'gb38', 'gb34',
    // Liver
    'lv1', 'lv2', 'lv3', 'lv4', 'lv8'
  ],
  '妇科调经': [
    'sp6', 'sp8', 'sp10', 'cv4', 'lv3',     // 痛经
    'cv6', 'baliao', 'lv9',                  // 月事不下
    'bl23',                                  // 月事不调 (其余 LV3, BL23, SP6, SP10, CV4 已列)
    'st36', 'cv8', 'gv4', 'ki3'              // 一般调经常配 (足三里 神阙 命门 太溪)
  ]
};

function fmt(key) {
  const target = TERM_ALIASES[key] || key;
  const e = TERMS[target] || TERMS[key];
  if (!e) return `${key}\t(not found)\t-\t-`;
  const primary = pickCnPrimary(e) || '-';
  const backup = pickCnBackup(e) || '-';
  return [
    key.toUpperCase().padEnd(8),
    (e.cn || '').padEnd(20),
    primary,
    backup
  ].join('\t');
}

for (const [section, keys] of Object.entries(sections)) {
  console.log('\n==================================================');
  console.log(' ', section);
  console.log('==================================================');
  console.log('CODE    \tNAME                \tPRIMARY\tBACKUP');
  for (const k of keys) console.log(fmt(k));
}
