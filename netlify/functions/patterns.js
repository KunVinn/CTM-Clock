// Lightweight TCM pattern hints from fact combinations. Educational directions, never a diagnosis.
const PATTERNS = [
  {
    id: 'heat-in-blood',
    name: 'Heat in the blood (caution)',
    name_cn: '热入营血（需警惕）',
    match: { body_color: 'crimson', coating_color: 'gray-black' },
    need: ['duration', 'cold_heat', 'sleep'],
    suggest: 'A crimson tongue or persistent dark coating should not be managed as an ordinary tongue sign; rule out fever, infection and staining from food or medicine.',
    suggest_cn: '绛舌、灰黑苔若持续存在，不能按普通舌象处理，要排查发热、感染、药食染色。',
    caution_cn: '这种情况不建议自行调养，应尽快面诊评估。',
    urgent: true
  },
  {
    id: 'cold-damp-spleen',
    name: 'Cold-damp encumbering the spleen',
    name_cn: '寒湿困脾',
    match: { coating_color: 'white', coating_texture: 'greasy', cold_heat: 'cold' },
    need: ['stool', 'digestion', 'coating_moisture'],
    suggest: 'A white greasy coating with cold intolerance may point toward cold-damp or weakened spleen transport.',
    suggest_cn: '白腻苔兼畏寒，中医常从寒湿困脾、脾胃运化不力方向考虑。',
    caution_cn: '舌苔只是望诊之一，不能单凭此项定证型。'
  },
  {
    id: 'damp-heat',
    name: 'Damp-heat',
    name_cn: '湿热内蕴',
    match: { coating_color: 'yellow', coating_texture: 'greasy' },
    need: ['cold_heat', 'stool', 'thirst'],
    suggest: 'A yellow greasy coating is a common damp-heat clue; which burner is involved depends on systemic symptoms.',
    suggest_cn: '黄腻苔可作为湿热内蕴的线索，但需结合寒热、大便、口渴等判断病位。',
    caution_cn: '黄苔也可能与饮食、吸烟、发热有关，不等于“上火”。'
  },
  {
    id: 'yin-deficiency-with-damp',
    name: 'Yin deficiency with dampness',
    name_cn: '阴虚夹湿',
    match: { body_color: 'red', coating_texture: 'greasy' },
    need: ['thirst', 'sleep', 'coating_moisture'],
    suggest: 'A red tongue with a greasy coating may indicate yin deficiency together with unresolved dampness; simply clearing heat or draining damp alone may be wrong.',
    suggest_cn: '舌红而苔腻，可能提示阴虚与湿浊并存，处理上不能只清热或只化湿。',
    caution_cn: '这类情况最容易误判，应结合脉证由医师判断。'
  },
  {
    id: 'spleen-qi-deficiency',
    name: 'Spleen qi deficiency with dampness',
    name_cn: '脾虚湿蕴',
    match: { body_color: 'pale', coating_texture: 'greasy' },
    need: ['digestion', 'stool', 'cold_heat'],
    suggest: 'A pale tongue with a greasy coating may point toward spleen qi insufficiency with dampness.',
    suggest_cn: '舌淡白兼腻苔，常考虑脾气不足、湿浊内停。',
    caution_cn: '淡白舌也见于贫血、久病、体质偏弱，不一定是“虚证”。'
  },
  {
    id: 'phlegm-damp',
    name: 'Phlegm-damp obstruction',
    name_cn: '痰湿内阻',
    match: { coating_thickness: 'thick', coating_texture: 'greasy' },
    need: ['body_color', 'digestion', 'stool'],
    suggest: 'A thick greasy coating is a common phlegm-damp clue; in TCM “phlegm” includes non-respiratory signs such as heaviness and chest oppression.',
    suggest_cn: '厚腻苔常作为痰湿内阻的线索；中医的“痰”也包括身体困重、头昏、胸闷等无形之痰。',
    caution_cn: '厚苔也见于餐后、吸烟、口腔清洁不足。'
  },
  {
    id: 'stomach-yin-deficiency',
    name: 'Stomach yin deficiency',
    name_cn: '胃阴虚',
    match: { body_color: 'red', coating_texture: 'peeled' },
    need: ['thirst', 'digestion', 'sleep'],
    suggest: 'A red tongue with little or peeled coating may point toward stomach yin insufficiency and damaged fluids.',
    suggest_cn: '红舌少苔或剥苔，可指向胃阴不足、津液受伤。',
    caution_cn: '剥苔也见于真菌感染、抗生素后、地图舌，不一定是“虚”。'
  },
  {
    id: 'qi-stagnation',
    name: 'Qi stagnation',
    name_cn: '气机郁滞',
    match: { body_color: 'red', coating_thickness: 'thin' },
    need: ['sleep', 'digestion', 'thirst'],
    suggest: 'A thin coating on a red tongue, with stress-related symptoms, may suggest constrained qi.',
    suggest_cn: '薄苔兼红舌，若有情绪相关症状，可考虑肝气不舒、气机郁滞。',
    caution_cn: '单看舌象证据较弱，需结合情志、胁胀、叹气等表现。'
  },
  {
    id: 'blood-stasis',
    name: 'Blood stasis',
    name_cn: '血瘀',
    match: { body_color: 'purple' },
    need: ['duration', 'sleep', 'digestion'],
    suggest: 'A purple or bluish tongue is a classic blood-stasis clue, but fixed pain, menstruation and old injuries matter more.',
    suggest_cn: '紫舌或青紫舌是血瘀方向的重要线索，但需结合痛处固定、月经、旧伤等。',
    caution_cn: '紫舌也见于吸烟、寒冷刺激、心血管风险，不能一见就“活血”。'
  },
  {
    id: 'kidney-yang-deficiency',
    name: 'Kidney yang deficiency',
    name_cn: '肾阳虚',
    match: { body_color: 'pale', coating_moisture: 'moist', cold_heat: 'cold' },
    need: ['stool', 'sleep', 'thirst'],
    suggest: 'A pale moist tongue with marked cold intolerance may point toward yang insufficiency.',
    suggest_cn: '淡白舌、润苔、明显怕冷，可考虑阳虚方向，尤其肾阳不足。',
    caution_cn: '怕冷兼淡白也见于贫血、甲状腺功能减退、久病，不都属“肾虚”。'
  },
  {
    id: 'food-retention',
    name: 'Food retention',
    name_cn: '食积',
    match: { coating_texture: 'curd', coating_thickness: 'thick' },
    need: ['digestion', 'stool', 'duration'],
    suggest: 'A thick curd-like coating with bloating or bad breath often suggests undigested food retention.',
    suggest_cn: '厚腐苔兼口臭、腹胀，常考虑宿食不化、食积。',
    caution_cn: '腐苔也见于口腔菌群失调、吸烟、发热之后。'
  },
  {
    id: 'lung-heat',
    name: 'Lung heat',
    name_cn: '肺热',
    matchFn: f => f.body_color === 'red' && f.coating_color === 'yellow',
    need: ['thirst', 'sleep', 'stool'],
    suggest: 'A red tongue (especially at the tip) with yellow coating, plus thirst or cough, may suggest lung heat.',
    suggest_cn: '舌尖红、黄苔，伴口干或咳嗽，可考虑肺热方向。',
    caution_cn: '舌尖红不一定都是肺热，也见于熬夜、上焦火旺。'
  }
];

const SLOT_LABEL_CN = {
  body_color: '舌体颜色', body_shape: '舌形', coating_color: '苔色', coating_thickness: '苔厚薄',
  coating_texture: '苔质地', coating_moisture: '苔润燥', duration: '持续时间',
  cold_heat: '寒热', thirst: '口渴', digestion: '消化', stool: '大便', sleep: '睡眠'
};

function inferPatterns(facts = {}) {
  return PATTERNS
    .filter(p => typeof p.matchFn === 'function'
      ? p.matchFn(facts)
      : Object.entries(p.match).every(([key, value]) => facts[key] === value))
    .map(p => {
      const matchCount = p.match ? Object.keys(p.match).length : 2;
      return {
        id: p.id,
        name: p.name,
        name_cn: p.name_cn,
        confidence: matchCount >= 3 && p.need.every(k => facts[k]) ? 'medium' : 'low',
        missing_facts: p.need.filter(k => !facts[k]),
        suggest: p.suggest,
        suggest_cn: p.suggest_cn,
        caution_cn: p.caution_cn,
        urgent: Boolean(p.urgent)
      };
    })
    .sort((a, b) => (b.confidence === 'medium') - (a.confidence === 'medium'));
}

function patternBlock(patterns, language) {
  if (!patterns.length) return '';
  if (language === 'zh') {
    return '\n\n**目前可能的证候方向（非诊断）：**\n' + patterns.map(p => {
      const conf = p.confidence === 'medium' ? '中置信度' : '低置信度';
      const missing = p.missing_facts.length
        ? `（还缺：${p.missing_facts.map(k => SLOT_LABEL_CN[k] || k).join('、')}）`
        : '（关键信息较完整）';
      return `- ${p.name_cn}【${conf}】${missing}\n  ${p.suggest_cn}\n  注意：${p.caution_cn}`;
    }).join('\n');
  }
  return '\n\n**Possible TCM directions (not a diagnosis):**\n' + patterns.map(p => {
    const missing = p.missing_facts.length
      ? `(still missing: ${p.missing_facts.join(', ')})`
      : '(key info fairly complete)';
    return `- ${p.name} [${p.confidence} confidence] ${missing}\n  ${p.suggest}\n  Caution: ${p.caution_cn}`;
  }).join('\n');
}

module.exports = { inferPatterns, patternBlock };
