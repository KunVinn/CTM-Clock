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
    ['sign-gray-black-coating', 'sign-greasy-coating']
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
  assert.ok(result.answer.includes('持续三天并伴恶心；舌苔灰黑而厚腻'));
});

test('keeps thick-white questions focused on the thick-coating entry', async () => {
  const result = await ask('舌苔厚白怎么办');
  assert.match(result.answer, /厚舌苔/);
  assert.doesNotMatch(result.answer, /灰黑舌苔/);
});

test('does not invent a generic FAQ answer when nothing matches', async () => {
  const result = await ask('一个没有本地参考的问题');
  assert.match(result.answer, /没有找到针对这个问题的具体资料/);
  assert.deepEqual(result.references, []);
});
