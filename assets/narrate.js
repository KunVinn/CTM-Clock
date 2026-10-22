// Narration guardrail (browser global `tcmNarrate`; also requireable in tests).
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.tcmNarrate = api;
})(typeof self !== 'undefined' ? self : globalThis, function () {
  const FORBIDDEN = [
    /小柴胡|柴胡|桂枝|附子|黄连|当归|六味地黄|逍遥丸|藿香正气|防风通圣|知柏地黄|补中益气/,
    /你就是|你可能(是|有|患)|基本可以确定|诊断是|确诊为|已经可以判定|属于.{0,12}证型|的证型/,
    /每天喝|水煎服|取\s*\d+\s*克|连服\s*\d+\s*天|建议服用|可服用/,
    /\bprescrib|\btake \d+\s*(mg|g|grams?)\b/i
  ];
  const PATTERN_NAMES = /湿热内蕴|寒湿困脾|阴虚夹湿|脾虚湿蕴|痰湿内阻|胃阴虚|肾阳虚|食积|血瘀|肺热/;

  // Reject, never repair: any violation falls back to the rule-based answer.
  function validateNarration(output, { language = 'zh', patterns = [] } = {}) {
    if (typeof output !== 'string' || output.trim().length < 20) return { ok: false, reason: 'too-short' };
    for (const re of FORBIDDEN) {
      if (re.test(output)) return { ok: false, reason: 'forbidden-content' };
    }
    if (!patterns.length && PATTERN_NAMES.test(output)) return { ok: false, reason: 'invented-pattern' };
    const disclaimer = language === 'en' ? 'cannot establish a diagnosis' : '单凭舌象不能确诊';
    if (!output.includes(disclaimer)) return { ok: false, reason: 'missing-disclaimer' };
    return { ok: true };
  }

  return { validateNarration };
});
