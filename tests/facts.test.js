const assert = require('node:assert/strict');
const { test } = require('node:test');
const { extractFactsFromTexts, factsFromAi, mergeFacts } = require('../netlify/functions/facts.js');
const { detectWarnings } = require('../netlify/functions/warnings.js');
const { inferPatterns } = require('../netlify/functions/patterns.js');
const { handler } = require('../netlify/functions/ask.js');

test('distinguishes coating white from pale tongue body', () => {
  assert.equal(extractFactsFromTexts(['舌苔白，厚']).coating_color, 'white');
  const pale = extractFactsFromTexts(['舌淡白，苔厚腻']);
  assert.equal(pale.body_color, 'pale');
  assert.equal(pale.coating_color ?? null, null);
});

test('extracts bare colour words in comma lists', () => {
  const facts = extractFactsFromTexts(['舌苔厚，黄，腻，表示什么']);
  assert.equal(facts.coating_color, 'yellow');
  assert.equal(facts.coating_thickness, 'thick');
  assert.equal(facts.coating_texture, 'greasy');
});

test('session facts persist across turns and current turn wins', () => {
  const prev = extractFactsFromTexts(['舌苔灰黑厚腻']);
  const next = mergeFacts(prev, extractFactsFromTexts(['比较润，怕冷']));
  assert.equal(next.coating_color, 'gray-black');
  assert.equal(next.coating_moisture, 'moist');
  assert.equal(next.cold_heat, 'cold');
});

test('ai result maps coating key and detail fields into facts', () => {
  const facts = factsFromAi({ coating: 'thick-white', coating_moisture: 'moist', coating_texture: 'none' });
  assert.equal(facts.coating_color, 'white');
  assert.equal(facts.coating_thickness, 'thick');
  assert.equal(facts.coating_moisture, 'moist');
  assert.equal(facts.coating_texture ?? null, null);
});

test('red tongue plus cold intolerance raises a conflict', () => {
  const warnings = detectWarnings({ body_color: 'red', cold_heat: 'cold', _raw: '' });
  assert.ok(warnings.some(w => w.code === 'red-body-cold-intolerance'));
});

test('dark coating with bleeding is a red flag', () => {
  const warnings = detectWarnings({ coating_color: 'gray-black', _raw: '舌面出血' });
  assert.equal(warnings[0].level, 'red');
});

test('yellow greasy coating suggests damp-heat', () => {
  assert.ok(inferPatterns({ coating_color: 'yellow', coating_texture: 'greasy' }).some(p => p.id === 'damp-heat'));
});

test('crimson tongue with dark coating is urgent', () => {
  assert.ok(inferPatterns({ body_color: 'crimson', coating_color: 'gray-black' })[0].urgent);
});

test('handler merges session facts and returns updated session', async () => {
  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({
      question: '比较润，而且怕冷',
      language: 'zh',
      session: { facts: { coating_color: 'gray-black', coating_texture: 'greasy' } }
    })
  });
  const result = JSON.parse(response.body);
  assert.ok(!result.follow_up_questions.some(item => item.key === 'coating_moisture'));
  assert.ok(!result.follow_up_questions.some(item => item.key === 'coating_color'));
  assert.equal(result.session.facts.coating_color, 'gray-black');
  assert.equal(result.session.facts.cold_heat, 'cold');
});

test('red flag suppresses patterns and follow-ups', async () => {
  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ question: '舌苔灰黑，舌面溃烂出血', language: 'zh' })
  });
  const result = JSON.parse(response.body);
  assert.equal(result.urgent, true);
  assert.deepEqual(result.follow_up_questions, []);
  assert.deepEqual(result.patterns, []);
  assert.ok(result.warnings.some(w => w.level === 'red'));
});

test('purple tongue suggests blood stasis', () => {
  assert.ok(inferPatterns({ body_color: 'purple' }).some(p => p.id === 'blood-stasis'));
});

test('red tongue with peeled coating suggests stomach yin deficiency', () => {
  assert.ok(inferPatterns({ body_color: 'red', coating_texture: 'peeled' }).some(p => p.id === 'stomach-yin-deficiency'));
});

test('thick curd coating suggests food retention', () => {
  assert.ok(inferPatterns({ coating_thickness: 'thick', coating_texture: 'curd' }).some(p => p.id === 'food-retention'));
});

test('red tongue with yellow coating suggests lung heat via matchFn', () => {
  assert.ok(inferPatterns({ body_color: 'red', coating_color: 'yellow' }).some(p => p.id === 'lung-heat'));
});

test('pale moist tongue with cold intolerance suggests kidney yang deficiency', () => {
  assert.ok(inferPatterns({ body_color: 'pale', coating_moisture: 'moist', cold_heat: 'cold' }).some(p => p.id === 'kidney-yang-deficiency'));
});

test('option-button answer phrases extract as facts', () => {
  assert.equal(extractFactsFromTexts(['消化正常']).digestion, 'normal');
  assert.equal(extractFactsFromTexts(['睡眠还好']).sleep, 'good');
  assert.equal(extractFactsFromTexts(['有剥脱']).coating_texture, 'peeled');
  assert.equal(extractFactsFromTexts(['大便干结']).stool, 'dry');
  assert.equal(extractFactsFromTexts(['怕冷，手脚冰凉']).cold_heat, 'cold');
  assert.equal(extractFactsFromTexts(['一个月以上']).duration, 'reported');
});
