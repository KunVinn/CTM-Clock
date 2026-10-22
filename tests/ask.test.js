const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const { handler } = require('../netlify/functions/ask.js');

let originalTarget;

before(() => {
  originalTarget = process.env.TCM_ASK_API_URL;
  delete process.env.TCM_ASK_API_URL;
});

after(() => {
  if (originalTarget === undefined) delete process.env.TCM_ASK_API_URL;
  else process.env.TCM_ASK_API_URL = originalTarget;
});

async function ask(question) {
  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({ question, language: 'zh' })
  });
  assert.equal(response.statusCode, 200);
  return JSON.parse(response.body);
}

test('answers gray-black and greasy coating questions with matching references', async () => {
  const result = await ask('有舌头面上灰黑色，且厚腻怎么办');
  assert.match(result.answer, /灰黑舌苔/);
  assert.match(result.answer, /厚腻舌苔/);
  assert.doesNotMatch(result.answer, /舌诊能看出什么/);
  assert.match(result.answer, /湿润还是干燥/);
  assert.deepEqual(
    result.references.map(reference => reference.id),
    ['sign-gray-black-coating', 'sign-greasy-coating', 'sign-tongue-generic']
  );
});

test('uses supplied symptom notes and selected signs to ground the answer', async () => {
  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({
      question: '这层舌苔怎么办？',
      language: 'zh',
      context: {
        symptoms: '持续三天并伴恶心',
        notes: '舌苔灰黑而厚腻',
        signs: { coating: 'greasy' }
      }
    })
  });
  const result = JSON.parse(response.body);
  assert.equal(response.statusCode, 200);
  assert.match(result.answer, /灰黑舌苔/);
  assert.match(result.answer, /厚腻舌苔/);
  assert.match(result.answer, /你补充的信息：/);
  assert.ok(result.answer.includes('舌苔灰黑而厚腻'));
});

test('does not repeat the moisture follow-up when the user already described it', async () => {
  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({
      question: '舌苔灰黑且厚腻怎么办？',
      language: 'zh',
      context: { notes: '舌苔看起来湿润，已经三天' }
    })
  });
  const result = JSON.parse(response.body);
  assert.equal(response.statusCode, 200);
  assert.match(result.answer, /灰黑舌苔/);
  assert.doesNotMatch(result.answer, /湿润还是干燥/);
});

test('keeps thick-white questions focused on the thick-coating entry', async () => {
  const result = await ask('舌苔厚白怎么办');
  assert.match(result.answer, /厚舌苔/);
  assert.doesNotMatch(result.answer, /灰黑舌苔/);
});

test('asks clarifying questions even when nothing matches', async () => {
  const result = await ask('一个没有本地参考的问题');
  assert.match(result.answer, /没有找到针对这个问题的具体资料/);
  assert.match(result.answer, /湿润还是干燥/);
  assert.deepEqual(result.follow_up_questions.map(item => item.key), ['coating_moisture', 'coating_color']);
  assert.deepEqual(result.references, []);
});

test('asks symptom questions once the tongue signs are already described', async () => {
  const response = await handler({
    httpMethod: 'POST',
    body: JSON.stringify({
      question: '舌苔厚腻怎么办？',
      language: 'zh',
      context: {
        notes: '舌苔灰黑湿润，舌体淡红，已经三天',
        ai_result: { coating_thickness: 'thick', coating_moisture: 'moist', coating_texture: 'greasy' }
      }
    })
  });
  const result = JSON.parse(response.body);
  assert.deepEqual(result.follow_up_questions.map(item => item.key), ['cold_heat', 'thirst']);
  assert.match(result.answer, /怕冷/);
});

test('does not ask for coating colour when a bare colour word is given', async () => {
  const result = await ask('舌苔厚，黄，腻，表示什么');
  assert.ok(!result.follow_up_questions.some(item => item.key === 'coating_color'));
  assert.doesNotMatch(result.answer, /舌苔是什么颜色/);
});

test('treats bare 白 as coating colour but not 淡白 tongue body', async () => {
  const white = await ask('舌苔白，厚，腻');
  assert.ok(!white.follow_up_questions.some(item => item.key === 'coating_color'));
  const pale = await ask('舌淡白，苔厚腻');
  assert.ok(pale.follow_up_questions.some(item => item.key === 'coating_color'));
});

test('any tongue description gets at least the generic guidance entry', async () => {
  const result = await ask('舌苔黄，怕冷');
  assert.match(result.answer, /舌象描述要点/);
  assert.deepEqual(result.references.map(reference => reference.id), ['sign-tongue-generic']);
});

test('treats bare 红 as tongue body colour', async () => {
  const result = await ask('舌红，苔黄厚腻');
  assert.ok(!result.follow_up_questions.some(item => item.key === 'body_color'));
});

