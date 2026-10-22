// Safety and consistency checks over extracted facts. Red flags suppress pattern hints and follow-ups.
const RULES = [
  {
    level: 'red',
    code: 'dark-coating-with-pain-bleeding',
    test: f => f.coating_color === 'gray-black' && /疼痛|出血|溃烂|肿胀|pain|bleed|ulcer/i.test(f._raw || ''),
    message: 'Dark coating together with pain, bleeding, ulceration or swelling needs prompt clinical or dental review.',
    message_cn: '灰黑苔同时有疼痛、出血、溃烂或肿胀，应尽快面诊或看口腔科。'
  },
  {
    level: 'red',
    code: 'crimson-with-fever',
    test: f => f.body_color === 'crimson' && /发热|发烧|高烧|fever/i.test(f._raw || ''),
    message: 'A crimson tongue with fever can indicate a serious heat pattern or infection; seek medical care promptly.',
    message_cn: '绛舌伴发热，可能提示热入营血或感染状态，请尽快就医。'
  },
  {
    level: 'conflict',
    code: 'red-body-cold-intolerance',
    test: f => ['red', 'crimson'].includes(f.body_color) && f.cold_heat === 'cold',
    message: 'A red tongue usually suggests heat, but cold intolerance suggests cold — this may be a mixed pattern or inconsistent description.',
    message_cn: '舌红通常偏热，但“怕冷”又偏寒——可能是上热下寒、真寒假热，或描述不一致。'
  },
  {
    level: 'conflict',
    code: 'yellow-greasy-but-cold',
    test: f => f.coating_color === 'yellow' && f.coating_texture === 'greasy' && f.cold_heat === 'cold',
    message: 'A yellow greasy coating often suggests damp-heat, but cold intolerance contradicts it; stool and thirst details are needed.',
    message_cn: '黄腻苔多属湿热，但你说畏寒——需看大便、口渴、病程，不能直断湿热。'
  },
  {
    level: 'conflict',
    code: 'pale-body-with-heat',
    test: f => f.body_color === 'pale' && f.cold_heat === 'heat',
    message: 'A pale tongue usually suggests deficiency or cold, but heat symptoms may indicate deficiency-heat or a mixed pattern.',
    message_cn: '舌淡通常偏虚偏寒，但怕热、口干、盗汗可能是虚热或寒热错杂。'
  },
  {
    level: 'insufficient',
    code: 'only-coating-thickness',
    test: f => f.coating_thickness && !f.coating_color && !f.body_color,
    message: 'Coating thickness alone cannot indicate a direction; coating colour and tongue-body colour are also needed.',
    message_cn: '只有“厚/薄”还不足以判断方向，至少还要苔色和舌体颜色。'
  },
  {
    level: 'insufficient',
    code: 'too-few-facts',
    test: f => Object.keys(f).filter(k => k !== '_raw' && f[k]).length <= 1,
    message: 'Too few observations to outline a TCM direction; only general guidance can be given.',
    message_cn: '目前舌象信息太少，只能给通用说明，不能推证候方向。'
  }
];

const ORDER = { red: 0, conflict: 1, insufficient: 2 };
const ICON = { red: '🚩', conflict: '⚠️', insufficient: 'ℹ️' };

function detectWarnings(facts = {}) {
  return RULES
    .filter(rule => {
      try { return rule.test(facts); } catch { return false; }
    })
    .map(rule => ({ level: rule.level, code: rule.code, message: rule.message, message_cn: rule.message_cn }))
    .sort((a, b) => ORDER[a.level] - ORDER[b.level]);
}

function warningBlock(warnings, language) {
  if (!warnings.length) return '';
  const header = language === 'zh' ? '**需要谨慎：**' : '**Please note:**';
  const lines = warnings.map(w => `${ICON[w.level]} ${language === 'zh' ? w.message_cn : w.message}`);
  return `\n\n${header}\n${lines.join('\n')}`;
}

module.exports = { detectWarnings, warningBlock };
