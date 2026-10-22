// Monte Carlo check of the follow-up inquiry logic in netlify/functions/ask.js.
// Usage: node scripts/mc-inquiry.js [runs] [seed]
const { handler } = require('../netlify/functions/ask.js');

const RUNS = Number(process.argv[2]) || 20000;
let seed = Number(process.argv[3]) || 42;
const rand = () => {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const pick = list => list[Math.floor(rand() * list.length)];

// Same order as INQUIRY_DIMENSIONS; each entry is a pool of ways a user may state that dimension.
const POOLS = [
  ['coating_moisture', ['湿润', '干燥', '苔润', '苔燥', 'moist', 'dry']],
  ['coating_color', ['白', '黄', '白苔', '黄苔', '灰黑', 'white', 'yellow']],
  ['coating_thickness', ['厚', '薄', 'thick', 'thin']],
  ['coating_texture', ['腻', '腐', 'greasy']],
  ['body_color', ['淡白舌', '舌红', '红', '绛', '紫', 'pale', 'crimson']],
  ['duration', ['三天', '两周', '一直', '3 days', 'since last week']],
  ['cold_heat', ['怕冷', '畏寒', '手脚冰凉', '怕热', '潮热']],
  ['thirst', ['口干', '口苦', '口渴', '口黏']],
  ['digestion', ['腹胀', '食欲差', '恶心', 'bloating']],
  ['stool', ['便秘', '腹泻', '大便偏稀', '便溏']],
  ['sleep', ['失眠', '多梦', '睡眠差']]
];
const KEYS = POOLS.map(([key]) => key);

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

async function main() {
  let noMatch = 0, matched = 0, redundant = 0, suppressed = 0, exact = 0;
  const redundantBy = new Map();
  const suppressedBy = new Map();
  const bump = (map, key) => map.set(key, (map.get(key) || 0) + 1);

  for (let i = 0; i < RUNS; i++) {
    const given = new Map();
    for (const [key, pool] of POOLS) if (rand() < 0.4) given.set(key, pick(pool));
    const text = `舌苔${shuffle([...given.values()]).join('，')}怎么办`;
    const response = await handler({ httpMethod: 'POST', body: JSON.stringify({ question: text, language: 'zh' }) });
    const result = JSON.parse(response.body);
    if (!result.references.length) { noMatch++; continue; }
    matched++;

    const asked = result.follow_up_questions.map(item => item.key);
    const expected = KEYS.filter(key => !given.has(key)).slice(0, 2);
    const wasRedundant = asked.filter(key => given.has(key));
    const wasSuppressed = expected.filter(key => !asked.includes(key));
    if (wasRedundant.length) { redundant++; wasRedundant.forEach(key => bump(redundantBy, `${key} <= ${given.get(key)}`)); }
    if (wasSuppressed.length) {
      suppressed++;
      // Name the supplied phrase that is likely to have satisfied the missing dimension's detector.
      wasSuppressed.forEach(key => bump(suppressedBy, `${key} suppressed by: ${[...given.entries()].map(([k, v]) => `${k}=${v}`).join(' ')}`));
    }
    if (!wasRedundant.length && !wasSuppressed.length) exact++;
  }

  const pct = (n, d) => `${n}/${d} (${(100 * n / d).toFixed(2)}%)`;
  console.log(`runs=${RUNS}  no local match: ${pct(noMatch, RUNS)}  matched: ${matched}`);
  console.log(`redundant question asked : ${pct(redundant, matched)}`);
  console.log(`expected question missing: ${pct(suppressed, matched)}`);
  console.log(`exactly as expected      : ${pct(exact, matched)}`);
  const top = map => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (redundantBy.size) console.log('top redundant:', top(redundantBy));
  if (suppressedBy.size) console.log('top missing:', top(suppressedBy));
}

main();
