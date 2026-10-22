// Narration-layer prompt: the model may rephrase the rules' output, never add knowledge.
function factLines(facts = {}) {
  const entries = Object.entries(facts).filter(([key, value]) => value && key !== '_raw');
  if (!entries.length) return '- none';
  return entries.map(([key, value]) => `- ${key}: ${value}`).join('\n');
}

function buildNarrationPrompt({ facts, references = [], patterns = [], warnings = [], language }) {
  const zh = language !== 'en';
  const refText = references.length
    ? references.map(r => `- [${r.id}] ${zh ? `${r.titleCn}：${r.textCn}` : `${r.title}: ${r.text}`}`).join('\n')
    : '- none';
  const patternText = patterns.length
    ? patterns.map(p => `- ${zh ? p.name_cn : p.name} (${p.confidence})` +
        (p.missing_facts.length ? `, missing: ${p.missing_facts.join(', ')}` : '')).join('\n')
    : '- not enough information to suggest a direction';
  const warnText = warnings.length
    ? warnings.map(w => `(${w.level}) ${zh ? w.message_cn : w.message}`).join('\n')
    : '- none';

  const rules = zh ? [
    '你不是医生，不许诊断疾病。',
    '不许推荐中药、方剂、剂量、补品。',
    '不许新增用户没有提到的症状。',
    '不许把“可能方向”说成“就是某证”。',
    '只能重新表达上面给出的事实、资料、方向与警告。',
    '有红警（red）时必须劝用户尽快就医，不做辨证。',
    '有冲突（conflict）时要明说“信息存在矛盾，待核实”。',
    '信息不足时要说“只看舌象不够”。'
  ].join('\n') : [
    'You are not a doctor; never diagnose.',
    'Never recommend herbs, formulas, dosages or supplements.',
    'Never invent symptoms the user did not mention.',
    'Never present a "possible direction" as a confirmed pattern.',
    'Only rephrase the facts, references, directions and warnings given above.',
    'On a red warning, advise prompt clinical review instead of pattern discussion.',
    'On a conflict, say the information is contradictory and needs checking.',
    'When information is insufficient, say the tongue alone is not enough.'
  ].join('\n');

  const task = zh
    ? '用简体中文，以有经验但谨慎的中医助理口吻，把以上内容说成温和、清楚、不超过 4 段的回答。结尾必须有一句：单凭舌象不能确诊。'
    : 'In plain English, like a careful TCM assistant, turn the above into a calm answer of at most 4 short paragraphs. It must end with the sentence: Tongue observations alone cannot establish a diagnosis.';

  return `You are the narration layer of a guarded TCM tongue-reading assistant. Rephrase only; add no new knowledge.

# Known facts
${factLines(facts)}

# References you may cite
${refText}

# Possible directions (not a diagnosis)
${patternText}

# Warnings
${warnText}

# Hard rules
${rules}

# Task
${task}`;
}

module.exports = { buildNarrationPrompt };
