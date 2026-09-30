/**
 * Proxy the hosted patient question request to the Python knowledge service.
 * Set TCM_ASK_API_URL in Netlify to a public HTTPS deployment of web_server.py.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8'
};

function reply(statusCode, body) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify(body) };
}

const ENTRIES = [
  {
    id: 'faq-what-tongue-shows',
    title: 'What can tongue observation tell me?',
    text: 'Tongue observation is one part of the traditional four examinations. Body colour, shape and coating may provide clues about patterns, but a tongue photo cannot establish a diagnosis by itself. A practitioner also needs symptoms, history, pulse and direct observation.',
    terms: ['tongue', '舌', 'observation', 'diagnosis', '舌诊']
  },
  {
    id: 'sign-white-coating',
    title: 'White coating needs more detail',
    text: 'White alone cannot show whether the coating is thin, thick, greasy or partly peeled. Note its thickness, whether it is greasy or easy to scrape off, and any symptoms. A photo still needs practitioner assessment.',
    terms: ['white', 'coating', '苔', '白苔', 'tongue']
  },
  {
    id: 'sign-thick-coating',
    title: 'Thick tongue coating',
    text: 'A thick coating can be a descriptive clue in TCM, but it is not a diagnosis. Record whether it is white or yellow, greasy or dry, and what symptoms accompany it. Discuss persistent or changing findings with a qualified clinician.',
    terms: ['thick', 'coating', '厚', '舌苔']
  },
  {
    id: 'faq-photo-quality',
    title: 'How should I take a tongue photo?',
    text: 'Take the photo in natural daylight, before brushing, eating or drinking. Keep the camera and background consistent, extend the tongue naturally for 10 to 15 seconds, and avoid flash and coloured indoor light.',
    terms: ['photo', 'camera', 'light', 'picture', '舌照', '拍照']
  },
  {
    id: 'faq-recurrent-mouth-ulcers',
    title: 'What should I know about recurrent mouth ulcers?',
    text: 'Recurrent mouth ulcers have many possible causes and are not proof of a single TCM pattern. Seek clinical or dental review if an ulcer lasts longer than two weeks, returns often, is unusually large or painful, or comes with fever, weight loss or difficulty swallowing.',
    terms: ['ulcer', 'ulcers', 'canker', '口腔溃疡', '溃疡']
  },
  {
    id: 'faq-urgent-care',
    title: 'When should I seek medical care urgently?',
    text: 'Do not wait for a tongue analysis if you have trouble breathing, chest pain, new weakness or confusion, fainting, severe allergic swelling, uncontrolled bleeding, sudden severe pain, or thoughts of harming yourself. Use local emergency services.',
    terms: ['urgent', 'emergency', 'breathing', 'chest pain', 'fainting', '急诊', '胸痛']
  }
];

function localAnswer(question) {
  const normalized = question.toLowerCase();
  const matches = ENTRIES.filter(entry => entry.terms.some(term => normalized.includes(term.toLowerCase()))).slice(0, 3);
  const selected = matches.length ? matches : [ENTRIES[0]];
  const bullets = selected.map(entry => `**${entry.title}**: ${entry.text}`).join('\n\n');
  const urgent = ['trouble breathing', 'chest pain', 'fainting', '急诊', '胸痛'].some(term => normalized.includes(term));
  return {
    question,
    answer: `${urgent ? '**Urgent safety note:** use local emergency services now if this is happening.\n\n' : ''}${bullets}`,
    answer_cn: '舌象只能作为整理问题的参考，不能单独用于确诊或自行调整治疗。请结合症状、病史并咨询合格医师。',
    references: selected.map(entry => ({ id: entry.id, title: entry.title, matched_terms: entry.terms.filter(term => normalized.includes(term.toLowerCase())) })),
    knowledge_sources: ['CTM-Clock hosted patient reference'],
    needs_practitioner: true,
    urgent,
    disclaimer: 'Educational information only; not a diagnosis or a substitute for professional medical care.'
  };
}

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: corsHeaders, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed.' });

  const target = String(process.env.TCM_ASK_API_URL || '').trim().replace(/\/$/, '');
  if (!event.body || event.body.length > 32_000) return reply(413, { error: 'Question payload is too large.' });

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return reply(400, { error: 'Invalid JSON.' });
  }
  if (!payload || typeof payload.question !== 'string' || !payload.question.trim()) {
    return reply(400, { error: 'Please enter a question.' });
  }

  if (!target) return reply(200, localAnswer(payload.question.trim()));

  try {
    const response = await fetch(`${target}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return reply(502, { error: 'The configured question service returned a non-JSON response.' });
    }
    return reply(response.status, result);
  } catch (error) {
    console.error('Question proxy failed:', error);
    return reply(502, { error: 'The configured question service could not be reached.' });
  }
};
