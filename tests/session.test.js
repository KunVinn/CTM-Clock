const assert = require('node:assert/strict');
const { test } = require('node:test');
const { emptySession, loadSession, saveSession } = require('../netlify/functions/session-store.js');
const { handler } = require('../netlify/functions/ask.js');

test('in-memory session store roundtrips facts', async () => {
  const session = emptySession();
  session.facts = { coating_color: 'yellow' };
  await saveSession('test-roundtrip', session);
  const loaded = await loadSession('test-roundtrip');
  assert.equal(loaded.facts.coating_color, 'yellow');
  assert.equal(loaded.turn, 0);
});

test('handler returns a session_id and reuses stored facts next turn', async () => {
  const r1 = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ question: '舌苔黄腻怎么办', language: 'zh' })
  });
  const d1 = JSON.parse(r1.body);
  assert.ok(d1.session_id);

  const r2 = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ question: '比较润，怕冷', language: 'zh', session_id: d1.session_id })
  });
  const d2 = JSON.parse(r2.body);
  assert.equal(d2.session_id, d1.session_id);
  assert.equal(d2.session.facts.coating_color, 'yellow');
  assert.equal(d2.session.facts.cold_heat, 'cold');
  assert.ok(!d2.follow_up_questions.some(q => q.key === 'coating_color'));
});

test('two red flags in one session force urgent and stop the inquiry', async () => {
  const r1 = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ question: '舌苔灰黑，舌面溃烂出血', language: 'zh' })
  });
  const d1 = JSON.parse(r1.body);
  assert.equal(d1.urgent, true);

  const r2 = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ question: '现在舌红绛，还在发烧', language: 'zh', session_id: d1.session_id })
  });
  const d2 = JSON.parse(r2.body);
  assert.equal(d2.urgent, true);
  assert.deepEqual(d2.follow_up_questions, []);
  assert.deepEqual(d2.patterns, []);
  assert.match(d2.answer, /不再继续在线询问/);
});
