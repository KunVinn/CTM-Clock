const assert = require('node:assert/strict');
const { test } = require('node:test');
const { validateNarration } = require('../assets/narrate.js');
const { buildNarrationPrompt } = require('../netlify/functions/narrate.js');

const GOOD_ZH = '黄腻苔提示湿热方向的线索，但目前证据有限，还缺寒热、大便、口渴等信息。单凭舌象不能确诊。';
const GOOD_EN = 'A yellow greasy coating is one clue toward damp-heat, but the evidence is limited and more details are needed. Tongue observations alone cannot establish a diagnosis.';

test('accepts a compliant zh narration', () => {
  assert.equal(validateNarration(GOOD_ZH, { language: 'zh', patterns: [{ id: 'damp-heat' }] }).ok, true);
});

test('accepts a compliant en narration', () => {
  assert.equal(validateNarration(GOOD_EN, { language: 'en', patterns: [{ id: 'damp-heat' }] }).ok, true);
});

test('rejects herbal formula recommendations', () => {
  assert.equal(validateNarration('可以服用六味地黄丸调理。单凭舌象不能确诊。', { patterns: [{}] }).reason, 'forbidden-content');
});

test('rejects diagnostic language', () => {
  assert.equal(validateNarration('从描述来看，你可能是湿热内蕴的证型了。单凭舌象不能确诊。', { patterns: [{}] }).reason, 'forbidden-content');
});

test('rejects invented patterns when none were given', () => {
  const result = validateNarration('这属于湿热内蕴的表现。单凭舌象不能确诊。', { patterns: [] });
  assert.equal(result.reason, 'invented-pattern');
});

test('rejects a narration without the disclaimer', () => {
  assert.equal(validateNarration('黄腻苔提示湿热方向的线索，但证据有限，还需要更多信息。', { patterns: [{}] }).reason, 'missing-disclaimer');
});

test('rejects too-short output', () => {
  assert.equal(validateNarration('好的。', { patterns: [] }).reason, 'too-short');
});

test('prompt builder includes facts, rules and the required closing sentence', () => {
  const prompt = buildNarrationPrompt({
    facts: { coating_color: 'yellow', coating_texture: 'greasy' },
    references: [{ id: 'sign-greasy-coating', title: 'Greasy', text: 'desc', titleCn: '腻苔', textCn: '描述' }],
    patterns: [{ name_cn: '湿热内蕴', confidence: 'low', missing_facts: ['stool'] }],
    warnings: [],
    language: 'zh'
  });
  assert.match(prompt, /coating_color: yellow/);
  assert.match(prompt, /不许推荐中药/);
  assert.match(prompt, /单凭舌象不能确诊/);
  assert.match(prompt, /湿热内蕴/);
});
