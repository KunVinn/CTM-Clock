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
    titleCn: '舌诊能看出什么？',
    textCn: '舌诊属于望闻问切四诊之一。舌色、舌形、舌苔可提示证候线索，但单凭舌照不能确诊；还需结合症状、病史、脉诊与面诊。',
    terms: ['tongue', '舌', 'observation', 'diagnosis', '舌诊']
  },
  {
    id: 'sign-white-coating',
    title: 'White coating needs more detail',
    text: 'White alone cannot show whether the coating is thin, thick, greasy or partly peeled. Note its thickness, whether it is greasy or easy to scrape off, and any symptoms. A photo still needs practitioner assessment.',
    titleCn: '白苔需要进一步描述',
    textCn: '只说“白”不能判断是薄白苔、厚白苔、腻白苔，还是剥苔。请补充厚薄、是否油腻、能否轻易刮去及伴随症状；舌照仍需结合医师辨证。',
    terms: ['white', 'coating', '苔', '白苔', 'tongue']
  },
  {
    id: 'sign-thick-coating',
    title: 'Thick tongue coating',
    text: 'A thick coating can be a descriptive clue in TCM, but it is not a diagnosis. Record whether it is white or yellow, greasy or dry, and what symptoms accompany it. Discuss persistent or changing findings with a qualified clinician.',
    titleCn: '厚舌苔',
    textCn: '厚苔在中医中可以作为描述性线索，但不是诊断。请记录苔色是白还是黄、是否油腻或干燥，以及伴随症状；若持续或发生变化，应咨询合格医师。',
    terms: ['thick', 'coating', '厚', '舌苔']
  },
  {
    id: 'faq-photo-quality',
    title: 'How should I take a tongue photo?',
    text: 'Take the photo in natural daylight, before brushing, eating or drinking. Keep the camera and background consistent, extend the tongue naturally for 10 to 15 seconds, and avoid flash and coloured indoor light.',
    titleCn: '怎样拍舌照？',
    textCn: '请在自然光下、刷牙和进食饮水前拍摄。保持相机与背景一致，舌头自然伸出 10 至 15 秒，避免闪光灯和彩色室内灯。',
    terms: ['photo', 'camera', 'light', 'picture', '舌照', '拍照']
  },
  {
    id: 'faq-recurrent-mouth-ulcers',
    title: 'What should I know about recurrent mouth ulcers?',
    text: 'Recurrent mouth ulcers have many possible causes and are not proof of a single TCM pattern. Seek clinical or dental review if an ulcer lasts longer than two weeks, returns often, is unusually large or painful, or comes with fever, weight loss or difficulty swallowing.',
    titleCn: '反复口腔溃疡应注意什么？',
    textCn: '反复口腔溃疡有多种可能原因，不能仅凭此认定某一种中医证型。若单个溃疡超过两周不愈、经常复发、范围大或疼痛明显，或伴发热、体重下降、吞咽困难，应请牙医或临床医师评估。',
    terms: ['ulcer', 'ulcers', 'canker', '口腔溃疡', '溃疡']
  },
  {
    id: 'faq-urgent-care',
    title: 'When should I seek medical care urgently?',
    text: 'Do not wait for a tongue analysis if you have trouble breathing, chest pain, new weakness or confusion, fainting, severe allergic swelling, uncontrolled bleeding, sudden severe pain, or thoughts of harming yourself. Use local emergency services.',
    titleCn: '什么时候应尽快就医？',
    textCn: '如有呼吸困难、胸痛、新发肢体无力或意识混乱、晕厥、严重过敏肿胀、无法控制的出血、突发剧烈疼痛或自伤念头，不要等待舌诊结果，请立即使用当地急救服务。',
    terms: ['urgent', 'emergency', 'breathing', 'chest pain', 'fainting', '急诊', '胸痛']
  }
];

function localAnswer(question, language) {
  const normalized = question.toLowerCase();
  const matches = ENTRIES.filter(entry => entry.terms.some(term => normalized.includes(term.toLowerCase()))).slice(0, 3);
  const selected = matches.length ? matches : [ENTRIES[0]];
  const bullets = selected.map(entry => `**${entry.title}**: ${entry.text}`).join('\n\n');
  const bulletsCn = selected.map(entry => `**${entry.titleCn}**：${entry.textCn}`).join('\n\n');
  const urgent = ['trouble breathing', 'chest pain', 'fainting', '急诊', '胸痛'].some(term => normalized.includes(term));
  const result = {
    question,
    answer: `${urgent ? '**Urgent safety note:** use local emergency services now if this is happening.\n\n' : ''}${bullets}`,
    answer_cn: `${urgent ? '**紧急提示：**如正在发生这些危险症状，请立即使用当地急救服务。\n\n' : ''}${bulletsCn}\n\n舌象只能作为整理问题的参考，不能单独用于确诊或自行调整治疗。请结合症状、病史并咨询合格医师。`,
    references: selected.map(entry => ({ id: entry.id, title: entry.title, matched_terms: entry.terms.filter(term => normalized.includes(term.toLowerCase())) })),
    knowledge_sources: ['CTM-Clock hosted patient reference'],
    needs_practitioner: true,
    urgent,
    disclaimer: 'Educational information only; not a diagnosis or a substitute for professional medical care.'
  };
  if (language === 'zh') {
    result.answer = result.answer_cn;
    delete result.answer_cn;
  } else if (language === 'en') {
    delete result.answer_cn;
  }
  return result;
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

  if (!['auto', 'en', 'zh'].includes(payload.language || 'auto')) {
    return reply(400, { error: "language must be 'auto', 'en' or 'zh'." });
  }
  if (!target) return reply(200, localAnswer(payload.question.trim(), payload.language || 'auto'));

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
