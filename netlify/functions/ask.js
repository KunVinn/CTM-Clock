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

const { extractFactsFromTexts, factsFromSigns, factsFromAi, mergeFacts } = require('./facts');
const { detectWarnings, warningBlock } = require('./warnings');
const { inferPatterns, patternBlock } = require('./patterns');
const { buildNarrationPrompt } = require('./narrate');
const sessionStore = require('./session-store');

const ENTRIES = [
  {
    id: 'faq-what-tongue-shows',
    title: 'What can tongue observation tell me?',
    text: 'Tongue observation is one part of the traditional four examinations. Body colour, shape and coating may provide clues about patterns, but a tongue photo cannot establish a diagnosis by itself. A practitioner also needs symptoms, history, pulse and direct observation.',
    titleCn: '舌诊能看出什么？',
    textCn: '舌诊属于望闻问切四诊之一。舌色、舌形、舌苔可提示证候线索，但单凭舌照不能确诊；还需结合症状、病史、脉诊与面诊。',
    terms: ['tongue observation', 'tongue diagnosis', 'observation', 'diagnosis', '舌诊', '舌诊能看出什么']
  },
  {
    id: 'sign-white-coating',
    title: 'White coating needs more detail',
    text: 'White alone cannot show whether the coating is thin, thick, greasy or partly peeled. Note its thickness, whether it is greasy or easy to scrape off, and any symptoms. A photo still needs practitioner assessment.',
    titleCn: '白苔需要进一步描述',
    textCn: '只说“白”不能判断是薄白苔、厚白苔、腻白苔，还是剥苔。请补充厚薄、是否油腻、能否轻易刮去及伴随症状；舌照仍需结合医师辨证。',
    terms: ['white coating', 'white tongue coating', 'white coat', '白色舌苔', '舌苔白', '白苔']
  },
  {
    id: 'sign-tongue-generic',
    title: 'Describing your tongue signs',
    text: 'Tongue signs are clues, not a diagnosis by themselves. Along with colour, record the coating’s thickness, moisture and texture, the tongue body’s colour and shape, how long it has been present, and how you feel (cold or heat, thirst, digestion, stool, sleep). A practitioner integrates all of these with pulse and history.',
    titleCn: '舌象描述要点',
    textCn: '舌象是线索，单独不能确诊。除颜色外，请记录舌苔厚薄、润燥、腻腐，舌体的颜色与形态，持续时间，以及自身感受（怕冷怕热、口渴、食欲、大便、睡眠）。医师会结合脉象与病史综合判断。',
    terms: ['舌']
  },
  {
    id: 'sign-thick-coating',
    title: 'Thick tongue coating',
    text: 'A thick coating can be a descriptive clue in TCM, but it is not a diagnosis. Record whether it is white or yellow, greasy or dry, and what symptoms accompany it. Discuss persistent or changing findings with a qualified clinician.',
    titleCn: '厚舌苔',
    textCn: '厚苔在中医中可以作为描述性线索，但不是诊断。请记录苔色是白还是黄、是否油腻或干燥，以及伴随症状；若持续或发生变化，应咨询合格医师。',
    terms: ['thick white', 'white thick', 'thick tongue coating', 'thick coating', 'thick coat', '舌苔厚白', '厚白苔', '舌苔很厚', '厚苔', '厚舌苔']
  },
  {
    id: 'sign-gray-black-coating',
    title: 'Gray or black tongue coating',
    text: 'In TCM references, a gray or black coating is interpreted differently depending on whether it is moist or dry. Color alone cannot establish a diagnosis or cause. Note its moisture, duration, recent foods or medicines, and any mouth symptoms; seek dental or medical advice if it persists, is painful, or bleeds.',
    titleCn: '灰黑舌苔',
    textCn: '中医资料会结合舌苔的润燥讨论灰黑苔，但颜色本身不能确定诊断或病因。可留意润燥、持续时间、近期饮食或用药及口腔症状；若持续不退、疼痛或出血，请咨询牙医或临床医师。',
    terms: ['gray-black coating', 'gray black coating', 'black tongue coating', 'dark tongue coating', '灰黑苔', '灰黑色', '灰黑', '黑苔']
  },
  {
    id: 'sign-greasy-coating',
    title: 'Thick or greasy tongue coating',
    text: 'A greasy or sticky coating is a description, not a diagnosis. Its color, moisture, how easily it brushes away, duration, and associated symptoms matter; do not infer a cause from thickness alone.',
    titleCn: '厚腻舌苔',
    textCn: '腻苔是舌象描述，不是诊断。还需了解苔色、润燥、轻柔刷舌时是否容易脱落、持续时间及伴随症状；不能只凭厚腻判断病因。',
    terms: ['greasy coating', 'sticky coating', 'greasy tongue coating', '厚腻', '腻苔', '腻']
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

// Follow-up slots in priority order: tongue observations first, then symptoms. A slot is asked only while its fact is unknown.
const INQUIRY_DIMENSIONS = [
  { key: 'coating_moisture', en: 'Does the coating look moist or dry?', cn: '舌苔看起来湿润还是干燥？' },
  { key: 'coating_color', en: 'What colour is the coating?', cn: '舌苔是什么颜色？' },
  { key: 'coating_thickness', en: 'Is the coating thin (you can see the tongue body through it) or thick?', cn: '舌苔是薄（能透见舌体）还是厚？' },
  { key: 'coating_texture', en: 'Does the coating look greasy or curd-like, and does it scrape off easily?', cn: '舌苔是否油腻或像豆腐渣，能否轻易刮去？' },
  { key: 'body_color', en: 'What colour is the tongue body itself, apart from the coating?', cn: '去掉舌苔后，舌体本身是什么颜色？' },
  { key: 'duration', en: 'How long has this been present, and does it change through the day?', cn: '这种舌象持续多久了？一天中有变化吗？' },
  { key: 'cold_heat', en: 'Do you tend to feel cold (chilly hands and feet) or hot (feverish, night sweats)?', cn: '平时怕冷（手脚冰凉）还是怕热（潮热盗汗）？' },
  { key: 'thirst', en: 'Is your mouth dry, bitter or sticky, and do you want hot or cold drinks?', cn: '口干、口苦还是口黏？喜欢喝热饮还是冷饮？' },
  { key: 'digestion', en: 'How are your appetite and digestion (bloating, nausea, reflux)?', cn: '食欲和消化如何（腹胀、恶心、反酸）？' },
  { key: 'stool', en: 'How are your bowel movements (dry, loose, sticky, irregular)?', cn: '大便情况如何（干结、偏稀、黏滞、不规律）？' },
  { key: 'sleep', en: 'How is your sleep, and do you wake up tired?', cn: '睡眠如何？醒后是否疲倦？' }
];

function localAnswer(question, language, context = {}, prevFacts = {}) {
  const safeContext = context && typeof context === 'object' && !Array.isArray(context) ? context : {};
  const noteLines = (Array.isArray(safeContext.notes) ? safeContext.notes : [safeContext.notes])
    .flatMap(value => typeof value === 'string' && value.trim() ? value.split(/\n+/) : [])
    .map(value => value.trim());
  const notes = [...new Set(noteLines)];
  const additionalNotes = [safeContext.symptoms, ...notes]
    .filter(value => typeof value === 'string' && value.trim() && value.trim().toLowerCase() !== question.trim().toLowerCase())
    .map(value => value.trim());
  const texts = [question, ...additionalNotes];
  const signValues = safeContext.signs && typeof safeContext.signs === 'object' && !Array.isArray(safeContext.signs)
    ? Object.values(safeContext.signs).filter(value => typeof value === 'string')
    : [];
  const aiSigns = safeContext.ai_result && typeof safeContext.ai_result === 'object'
    ? ['body_color', 'shape', 'coating', 'coating_thickness', 'coating_moisture', 'coating_texture'].map(key => safeContext.ai_result[key]).filter(value => typeof value === 'string')
    : [];
  const facts = mergeFacts(prevFacts,
    mergeFacts(factsFromAi(safeContext.ai_result),
      mergeFacts(factsFromSigns(safeContext.signs), extractFactsFromTexts(texts))));
  const normalized = [...texts, ...signValues, ...aiSigns].join(' ').toLowerCase();
  const thickWhite = normalized.includes('thick white') || normalized.includes('white thick') || normalized.includes('舌苔厚白') || normalized.includes('厚白苔');
  const unspecifiedWhite = (normalized.includes('white coating') || normalized.includes('舌苔白') || normalized.includes('白苔')) &&
    !['thin', 'thick', 'greasy', 'sticky', 'peeled', '薄', '厚', '腻', '剥'].some(term => normalized.includes(term));
  const matches = ENTRIES.map(entry => ({
    entry,
    hits: entry.terms.filter(term => normalized.includes(term.toLowerCase()))
  })).filter(match => match.hits.length);
  const signMatches = matches.filter(match => match.entry.id.startsWith('sign-'));
  const relevantMatches = signMatches.length ? signMatches : matches;
  const focused = thickWhite ? relevantMatches.filter(match => match.entry.id === 'sign-thick-coating') :
    (unspecifiedWhite ? relevantMatches.filter(match => match.entry.id === 'sign-white-coating') : relevantMatches);
  const selected = focused
    .map(match => match.entry)
    .sort((a, b) => (a.id === 'sign-tongue-generic') - (b.id === 'sign-tongue-generic'))
    .slice(0, 3);
  const noMatch = selected.length === 0;
  const warnings = detectWarnings({ ...facts, _raw: normalized });
  const redWarning = warnings.some(w => w.level === 'red');
  const patterns = redWarning ? [] : inferPatterns(facts);
  const asked = redWarning ? [] : INQUIRY_DIMENSIONS.filter(dim => !facts[dim.key]).slice(0, 2);
  const bullets = selected.map(entry => `**${entry.title}**: ${entry.text}`).join('\n\n');
  const bulletsCn = selected.map(entry => `**${entry.titleCn}**：${entry.textCn}`).join('\n\n');
  const detail = thickWhite ? '\n\n**How to make this more useful**: Check whether the coat is evenly thick or patchy, moist/greasy or dry, and whether it scrapes away easily. Note its location, duration, recent illness or medicines, and symptoms such as bloating, nausea, reflux, constipation or loose stools. In TCM, thick white may be discussed as a cold/damp or digestive clue, but it cannot identify a pattern or cause by itself.' : '';
  const detailCn = thickWhite ? '\n\n**怎样补充才更有用**：请观察舌苔是否均匀或斑片状、湿润油腻还是干燥、能否轻易刮去，并记录分布部位、出现多久、近期是否生病或用药，以及腹胀、恶心、反流、便秘或腹泻等症状。在中医语境中，厚白苔有时可作为寒湿或消化方面的线索，但不能单凭它确定证型或病因。' : '';
  const followUpEn = asked.length ? `\n\n**To narrow this down, please tell me:**\n${asked.map(dim => `- ${dim.en}`).join('\n')}` : '';
  const followUpCn = asked.length ? `\n\n**为了更准确，请再补充：**\n${asked.map(dim => `- ${dim.cn}`).join('\n')}` : '';
  const notesEn = additionalNotes.length ? `\n\n**Details you provided:** ${additionalNotes.join('; ')}` : '';
  const notesCn = additionalNotes.length ? `\n\n**你补充的信息：**${additionalNotes.join('；')}` : '';
  const urgent = redWarning || patterns.some(p => p.urgent) ||
    ['trouble breathing', 'chest pain', 'fainting', '急诊', '胸痛'].some(term => normalized.includes(term));
  const result = {
    question,
    answer: `${urgent ? '**Urgent safety note:** use local emergency services now if this is happening.\n\n' : ''}${noMatch ? 'I could not find a specific answer in this local TCM reference. Please consult a qualified clinician for guidance.' : bullets + detail + notesEn}${warningBlock(warnings, 'en')}${patternBlock(patterns, 'en')}${followUpEn}\n\nTongue observations alone cannot establish a diagnosis or justify changing treatment.`,
    answer_cn: `${urgent ? '**紧急提示：**如正在发生这些危险症状，请立即使用当地急救服务。\n\n' : ''}${noMatch ? '本地中医参考库中没有找到针对这个问题的具体资料，请咨询合格临床医师。' : bulletsCn + detailCn + notesCn}${warningBlock(warnings, 'zh')}${patternBlock(patterns, 'zh')}${followUpCn}\n\n单凭舌象不能确诊，也不能据此自行调整治疗。`,
    references: selected.map(entry => ({ id: entry.id, title: entry.title, matched_terms: entry.terms.filter(term => normalized.includes(term.toLowerCase())) })),
    follow_up_questions: asked.map(dim => ({ key: dim.key, question: dim.en, question_cn: dim.cn })),
    warnings,
    patterns: patterns.map(p => ({ id: p.id, name: p.name_cn, confidence: p.confidence, missing_facts: p.missing_facts, urgent: p.urgent })),
    session: { facts },
    narration_prompt: redWarning ? undefined : buildNarrationPrompt({ facts, references: selected, patterns, warnings, language }),
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
  const sessionId = typeof payload.session_id === 'string' && payload.session_id.length <= 80 ? payload.session_id : '';
  const session = sessionId ? await sessionStore.loadSession(sessionId) : sessionStore.emptySession();
  if (!Object.keys(session.facts).length) {
    session.facts = payload.session && typeof payload.session === 'object' &&
      payload.session.facts && typeof payload.session.facts === 'object' && !Array.isArray(payload.session.facts)
      ? payload.session.facts : {};
  }
  if (!target) {
    const result = localAnswer(payload.question.trim(), payload.language || 'auto', payload.context, session.facts);
    session.facts = result.session.facts;
    session.turn += 1;
    for (const w of result.warnings || []) {
      if (w.level === 'red' && !session.red_flags.includes(w.code)) session.red_flags.push(w.code);
    }
    if (session.red_flags.length >= 2) {
      // Repeated red flags: stop the inquiry and insist on clinical review.
      result.urgent = true;
      result.follow_up_questions = [];
      result.patterns = [];
      delete result.narration_prompt;
      const note = (payload.language || 'auto') === 'en'
        ? '🚩 Several answers in this session needed clinical review. Please see a clinician instead of continuing this online check.'
        : '🚩 本次问诊已多次出现需要临床评估的信号，请尽快面诊，不再继续在线询问。';
      result.answer = `${note}\n\n${result.answer}`;
      if (result.answer_cn) result.answer_cn = `${note}\n\n${result.answer_cn}`;
    }
    for (const q of result.follow_up_questions || []) {
      if (!session.asked.includes(q.key)) session.asked.push(q.key);
    }
    const finalSessionId = sessionId || sessionStore.newSessionId();
    await sessionStore.saveSession(finalSessionId, session);
    result.session_id = finalSessionId;
    return reply(200, result);
  }

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
