// Fact extraction: user text, UI selector keys and AI results become fact slots.
const EMPTY_FACTS = {
  body_color: null,
  body_shape: null,
  coating_color: null,
  coating_thickness: null,
  coating_texture: null,
  coating_moisture: null,
  duration: null,
  cold_heat: null,
  thirst: null,
  digestion: null,
  stool: null,
  sleep: null
};

// First matching pattern wins per slot; earlier texts win over later ones.
const SLOT_PATTERNS = {
  coating_moisture: [
    ['moist', /湿润|润苔|苔润|滑苔|苔滑|湿苔|润|\bmoist\b|\bwet\b|\bdamp\b/i],
    ['dry', /干燥|干苔|苔燥|燥苔|燥|\bdry\b/i]
  ],
  coating_color: [
    ['gray-black', /灰黑|灰苔|苔灰|黑苔|苔黑|焦黑|\bgr[ae]y\b|\bblack\b/i],
    ['white', /白苔|苔白|薄白|厚白|白腻|白滑|(?<!淡)白|\bwhite\b/i],
    ['yellow', /黄苔|苔黄|薄黄|黄腻|黄|\byellow\b/i]
  ],
  coating_thickness: [
    ['thin', /薄|\bthin\b/i],
    ['thick', /厚|\bthick\b/i]
  ],
  coating_texture: [
    ['peeled', /剥苔|地图舌|少苔|无苔|\bpeeled\b/i],
    ['curd', /腐苔|豆腐渣|腐|\bcurd/i],
    ['greasy', /腻|黏腻|油腻|\bgreasy\b|\bsticky\b|\bslimy\b/i]
  ],
  body_color: [
    ['pale', /淡白|\bpale\b/i],
    ['pale-red', /淡红/],
    ['crimson', /绛|\bcrimson\b/i],
    ['purple', /青紫|紫|\bpurple\b/i],
    ['red', /(?<!淡)红|\bred\b/i]
  ],
  duration: [
    ['reported', /天|周|星期|个月|一直|病程|\bdays?\b|\bweeks?\b|\bmonths?\b|\bsince\b/i]
  ],
  cold_heat: [
    ['cold', /怕冷|畏寒|怕凉|手脚冰|手足冷|\bcold\b|\bchill/i],
    ['heat', /怕热|潮热|盗汗|五心烦热|发热|发烧|fever|\bhot\b/i]
  ],
  thirst: [
    ['dry', /口干|口渴|咽干|dry mouth|\bthirst/i],
    ['bitter', /口苦/],
    ['sticky', /口黏|口粘/]
  ],
  digestion: [
    ['bloating', /腹胀|肚胀|肚子胀|bloat/i],
    ['poor-appetite', /没胃口|食欲不振|食欲差|不欲食|appetite/i],
    ['reflux', /反酸|反流|吞酸|reflux/i],
    ['nausea', /恶心|想吐|nausea/i]
  ],
  stool: [
    ['dry', /便秘|大便干|排便困难|constipat/i],
    ['loose', /腹泻|拉肚子|便溏|稀|diarrh/i],
    ['sticky', /大便黏|大便粘|粘马桶|排便不爽/]
  ],
  sleep: [
    ['insomnia', /失眠|睡不着|入睡难|insomnia/i],
    ['dreamful', /多梦|梦多|易醒|睡眠(差|不好)/i]
  ]
};

function extractFactsFromTexts(texts) {
  const facts = {};
  for (const text of texts) {
    if (typeof text !== 'string' || !text.trim()) continue;
    for (const [slot, patterns] of Object.entries(SLOT_PATTERNS)) {
      if (facts[slot]) continue;
      const hit = patterns.find(([, re]) => re.test(text));
      if (hit) facts[slot] = hit[0];
    }
  }
  return facts;
}

// Selector/AI coating keys decode into one or two fact slots.
const COATING_KEY_FACTS = {
  'thin-white': { coating_color: 'white', coating_thickness: 'thin' },
  'thick-white': { coating_color: 'white', coating_thickness: 'thick' },
  yellow: { coating_color: 'yellow' },
  greasy: { coating_texture: 'greasy' },
  dry: { coating_moisture: 'dry' },
  peeled: { coating_texture: 'peeled' },
  'gray-black': { coating_color: 'gray-black' }
};

function factsFromSigns(signs) {
  const facts = {};
  if (!signs || typeof signs !== 'object' || Array.isArray(signs)) return facts;
  if (typeof signs.color === 'string' && signs.color !== 'pink') facts.body_color = signs.color;
  if (typeof signs.shape === 'string' && signs.shape !== 'normal') facts.body_shape = signs.shape;
  Object.assign(facts, COATING_KEY_FACTS[signs.coating] || {});
  return facts;
}

function factsFromAi(ai) {
  const facts = {};
  if (!ai || typeof ai !== 'object' || Array.isArray(ai)) return facts;
  if (typeof ai.body_color === 'string' && ai.body_color !== 'pink') facts.body_color = ai.body_color;
  if (typeof ai.shape === 'string' && ai.shape !== 'normal') facts.body_shape = ai.shape;
  Object.assign(facts, COATING_KEY_FACTS[ai.coating] || {});
  for (const key of ['coating_thickness', 'coating_moisture', 'coating_texture']) {
    if (typeof ai[key] === 'string' && ai[key] !== 'none') facts[key] = ai[key];
  }
  return facts;
}

// Current-turn facts override session facts; null never overwrites.
function mergeFacts(base = {}, override = {}) {
  const merged = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value != null) merged[key] = value;
  }
  return merged;
}

module.exports = { EMPTY_FACTS, extractFactsFromTexts, factsFromSigns, factsFromAi, mergeFacts };
