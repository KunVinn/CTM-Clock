/* ============================================================
   子午流注 · Data
   The single source of truth for the 12 organ meridians.
   ============================================================ */

const ORGANS = [
  {
    start: 23, end: 1,
    cn: '膽', cnSimp: '胆', pinyin: 'Dǎn', organ: 'Gallbladder',
    branch: '子', branchPinyin: 'Zǐ',
    zodiac: '鼠', zodiacEn: 'Rat', zodiacEmoji: '🐀',
    chineseHour: '子時 · Zǐ shí',
    element: 'wood',
    meaning: 'The day is born in stillness. Yang qi begins its slow ascent from the deepest yin.',
    meaningCn: '一日始于静中。阳气自至阴之处徐徐而升。',
    function: 'In TCM the gallbladder governs decisiveness and the renewal of cellular tissue overnight. Sleep at this hour is the most restorative of the entire 24-hour cycle. Bile is secreted and yang qi quietly seeded.',
    functionCn: '中医谓胆主决断，夜半主藏腑细胞之新生。子时之熟睡，乃二十四时辰中最养人之眠。胆汁分泌，阳气暗孕。',
    practices: [
      'Be in deep sleep — ideally asleep before 23:00',
      'Keep the bedroom dark, cool, and quiet',
      'Avoid bright screens and stimulating thoughts'
    ],
    practicesCn: [
      '深度睡眠——以亥时（21:00 前）入睡为佳',
      '卧室宜暗、宜凉、宜静',
      '避明亮屏幕与劳神思虑'
    ],
    avoid: [
      'Late-night meals or heavy snacking',
      'Caffeine, alcohol, intense work',
      'Decision-making — the mind is meant to rest'
    ],
    avoidCn: [
      '夜半进食与零食',
      '咖啡、酒、剧烈劳作',
      '决断思虑——此时神当休'
    ],
    tone: '角音', toneEn: 'Jué (E note)',
    musicEffect: '疏肝利胆，调和气血 · soothes the liver-gallbladder axis, harmonises qi and blood',
    tracks: ['梅花三弄', '潇湘水云', '胡笳十八拍'],
    habit: 'Lights out, screens away',
    habitCn: '熄灯远屏',
    kg: {
      properties: ['平 Neutral', '微温 Slightly Warm'],
      flavours: ['苦 Bitter', '甘 Sweet'],
      tropism: ['膽經 Gallbladder', '肝經 Liver'],
      herbs: [
        { cn: '柴胡', py: 'Chái Hú', en: 'Bupleurum root' },
        { cn: '黄芩', py: 'Huáng Qín', en: 'Scutellaria root' }
      ],
      syndrome: '膽鬱化火 · Gallbladder qi stagnation',
      tcmSymptoms: ['Bitter mouth', 'Indecision', 'Chest tightness'],
      tcmSymptomsCn: ['口苦', '寡断犹豫', '胸闷']
    }
  },
  {
    start: 1, end: 3,
    cn: '肝', cnSimp: '肝', pinyin: 'Gān', organ: 'Liver',
    branch: '丑', branchPinyin: 'Chǒu',
    zodiac: '牛', zodiacEn: 'Ox', zodiacEmoji: '🐂',
    chineseHour: '丑時 · Chǒu shí',
    element: 'wood',
    meaning: 'The liver cleanses, regenerates, and stores the blood while you sleep.',
    meaningCn: '人卧则血归于肝——肝在睡梦中涤血、再生、藏血。',
    function: 'TCM teaches that the liver detoxifies and replenishes blood during these hours. Waking regularly between 1 and 3 a.m. may suggest liver qi imbalance — often linked to stress, anger, or excess alcohol.',
    functionCn: '中医谓丑时肝主疏泄、藏血。卧则血归于肝，浊去而清存。若每于丑时（凌晨 1–3 时）惊醒，多属肝气郁滞——常因忧思、恼怒或酒食过度而致。',
    practices: [
      'Remain in deep sleep',
      'Earlier in the day: reduce alcohol and processed foods',
      'Practice forgiveness and emotional release before bed'
    ],
    practicesCn: [
      '继续深睡，勿令惊扰',
      '日间减酒少食加工之物',
      '睡前宽心释怒，畅其情志'
    ],
    avoid: [
      'Working late into the night',
      'Suppressing strong emotions like anger',
      'Heavy fats and alcohol consumed before bed'
    ],
    avoidCn: [
      '熬夜劳作至深',
      '强忍怒火，郁结于胸',
      '睡前重油厚味与酒'
    ],
    tone: '角音', toneEn: 'Jué (E note)',
    musicEffect: '解郁疏肝，平复情绪 · resolves stagnation, calms the emotions',
    tracks: ['庄周梦蝶', '春江花月夜', '紫竹调'],
    habit: 'Sleep deeply (1–3 AM is liver-restoration time)',
    habitCn: '深眠静养（1–3 时为肝复之时）',
    kg: {
      properties: ['温 Warm', '凉 Cool'],
      flavours: ['酸 Sour', '苦 Bitter'],
      tropism: ['肝經 Liver', '心經 Heart'],
      herbs: [
        { cn: '当归', py: 'Dāng Guī', en: 'Angelica root' },
        { cn: '白芍', py: 'Bái Sháo', en: 'White peony root' },
        { cn: '枸杞', py: 'Gǒu Qǐ', en: 'Goji berry' }
      ],
      syndrome: '肝血不足 · Liver blood deficiency',
      tcmSymptoms: ['Dry eyes', 'Brittle nails', 'Restless sleep', 'Irritability'],
      tcmSymptomsCn: ['目干涩', '指甲脆易裂', '睡卧不安', '易怒烦躁']
    }
  },
  {
    start: 3, end: 5,
    cn: '肺', cnSimp: '肺', pinyin: 'Fèi', organ: 'Lung',
    branch: '寅', branchPinyin: 'Yín',
    zodiac: '虎', zodiacEn: 'Tiger', zodiacEmoji: '🐅',
    chineseHour: '寅時 · Yín shí',
    element: 'metal',
    meaning: 'Breath returns to the body. The lungs distribute fresh qi to every meridian.',
    meaningCn: '气息归身。肺将清气布于诸经。',
    function: 'The lungs govern qi and protect the body. Waking with cough or shortness of breath at this hour may indicate lung-qi weakness. This is the hour of subtle renewal.',
    functionCn: '肺主气、司呼吸、卫外御邪。于此寅时早醒、咳喘者，多属肺气虚。此乃身体最微妙之更新时辰。',
    practices: [
      'Sleep deeply — the lungs need stillness to circulate qi',
      'If awake: gentle deep breathing or quiet meditation',
      'Open a window briefly for fresh morning air'
    ],
    practicesCn: [
      '继续安睡——肺气需静以行',
      '若早醒，作深长缓慢之呼吸数次再卧',
      '稍开窗扉，纳清晨之清气'
    ],
    avoid: [
      'Cold drafts directly on the chest',
      'Smoking or polluted environments',
      'Forceful exercise — the body is still gathering qi'
    ],
    avoidCn: [
      '寒风直吹胸背',
      '吸烟与污浊空气',
      '剧烈运动——身正聚气'
    ],
    tone: '商音', toneEn: 'Shāng (D note)',
    musicEffect: '润肺降燥，清肃呼吸 · moistens the lungs, calms the breath',
    tracks: ['阳春白雪', '广陵散', '黄河大合唱'],
    habit: 'Stay sleeping; open a window for fresh morning air',
    habitCn: '继续安睡；微开窗纳清气',
    kg: {
      properties: ['凉 Cool', '平 Neutral'],
      flavours: ['辛 Pungent', '甘 Sweet'],
      tropism: ['肺經 Lung', '大腸經 Lg. Intestine'],
      herbs: [
        { cn: '百合', py: 'Bǎi Hé', en: 'Lily bulb' },
        { cn: '杏仁', py: 'Xìng Rén', en: 'Bitter apricot kernel' },
        { cn: '麥冬', py: 'Mài Dōng', en: 'Ophiopogon root' }
      ],
      syndrome: '肺氣虛 · Lung qi deficiency',
      tcmSymptoms: ['Shortness of breath', 'Weak voice', 'Spontaneous sweating'],
      tcmSymptomsCn: ['气短', '语声低弱', '自汗']
    }
  },
  {
    start: 5, end: 7,
    cn: '大腸', cnSimp: '大肠', pinyin: 'Dà Cháng', organ: 'Large Intestine',
    branch: '卯', branchPinyin: 'Mǎo',
    zodiac: '兔', zodiacEn: 'Rabbit', zodiacEmoji: '🐇',
    chineseHour: '卯時 · Mǎo shí',
    element: 'metal',
    meaning: 'The body wakes and lets go. A new cycle of yang energy rises.',
    meaningCn: '身觉醒，体放下。新一轮阳气始升。',
    function: 'The large intestine releases what is no longer needed. The ideal hour for a bowel movement, drinking warm water, and beginning the day with intention.',
    functionCn: '大肠主传导糟粕。卯时为排便、饮温水、用心起头之最佳时辰。',
    practices: [
      'Drink a warm glass of water on rising',
      'Allow time for a natural bowel movement',
      'Gentle stretching or qigong to wake the body',
      'Open curtains — let morning light enter'
    ],
    practicesCn: [
      '醒后即饮温开水一盏',
      '从容如厕，不强不憋',
      '舒缓伸展或习气功以唤身',
      '拉开窗帘，迎晨光入室'
    ],
    avoid: [
      'Rushing immediately into stress or screens',
      'Skipping the morning toilet routine',
      'Cold or icy drinks first thing'
    ],
    avoidCn: [
      '甫醒即急于事务、手机',
      '忽略晨间排便',
      '清晨即饮冷水冰品'
    ],
    tone: '商音 / 宫音', toneEn: 'Shāng / Gōng',
    musicEffect: '通腑润肠，代谢调理 · supports elimination and metabolism',
    tracks: ['潇湘水云', '梅花三弄', '十面埋伏'],
    habit: 'Warm water on rising · allow time for the morning bowel movement',
    habitCn: '醒后饮温水 · 从容如厕',
    kg: {
      properties: ['温 Warm'],
      flavours: ['辛 Pungent'],
      tropism: ['大腸經 Lg. Intestine', '肺經 Lung'],
      herbs: [
        { cn: '火麻仁', py: 'Huǒ Má Rén', en: 'Hemp seed' },
        { cn: '决明子', py: 'Jué Míng Zǐ', en: 'Cassia seed' }
      ],
      syndrome: '大腸燥結 · Dryness of the large intestine',
      tcmSymptoms: ['Constipation', 'Dry stool', 'Abdominal fullness'],
      tcmSymptomsCn: ['便秘', '大便燥结', '腹胀']
    }
  },
  {
    start: 7, end: 9,
    cn: '胃', cnSimp: '胃', pinyin: 'Wèi', organ: 'Stomach',
    branch: '辰', branchPinyin: 'Chén',
    zodiac: '龙', zodiacEn: 'Dragon', zodiacEmoji: '🐉',
    chineseHour: '辰時 · Chén shí',
    element: 'earth',
    meaning: 'Earth nourishes. The stomach digests most efficiently — eat your richest meal.',
    meaningCn: '土气养身。胃运化最盛之时——当饱餐于此。',
    function: "The stomach's digestive fire is at its peak. A warm, substantial breakfast eaten now nourishes the entire day. Skipping breakfast is considered a major insult to spleen and stomach qi.",
    functionCn: '胃之消化之火，于辰时最旺。此时一餐温热丰盛之早膳，可养一整日之气。古谓不食早餐为伤脾胃之大忌。',
    practices: [
      'Eat a warm, nourishing breakfast — congee, oats, eggs',
      'Sit down and eat without distraction',
      'Chew thoroughly; sip warm water, not iced',
      'Include cooked grains and warming spices'
    ],
    practicesCn: [
      '吃温热而滋养之早餐——粥、燕麦、鸡蛋皆宜',
      '坐下安心而食，勿事他务',
      '细嚼慢咽，饮温水，不宜冰',
      '兼用熟谷与温性辛香之品'
    ],
    avoid: [
      'Skipping breakfast',
      'Cold smoothies, raw salads, ice-cold drinks',
      'Eating while standing, walking, or working'
    ],
    avoidCn: [
      '不食早餐',
      '冷饮冰沙、生菜沙拉、冰水',
      '立食、行食、边食边事'
    ],
    tone: '宫音 / 羽音', toneEn: 'Gōng / Yǔ',
    musicEffect: '健脾和胃，促进运化 · strengthens the spleen-stomach, supports transformation',
    tracks: ['古琴山居吟', '洞庭秋思', '北国之春'],
    habit: 'Warm, nourishing breakfast · no cold drinks or screens',
    habitCn: '温热丰盛早餐 · 不饮冷不看屏',
    kg: {
      properties: ['温 Warm', '平 Neutral'],
      flavours: ['甘 Sweet'],
      tropism: ['胃經 Stomach', '脾經 Spleen'],
      herbs: [
        { cn: '生姜', py: 'Shēng Jiāng', en: 'Fresh ginger' },
        { cn: '大枣', py: 'Dà Zǎo', en: 'Chinese date' },
        { cn: '小米', py: 'Xiǎo Mǐ', en: 'Foxtail millet' }
      ],
      syndrome: '胃氣虛寒 · Stomach qi deficiency with cold',
      tcmSymptoms: ['Poor appetite', 'Bloating', 'Cold abdomen'],
      tcmSymptomsCn: ['食欲不振', '脘腹胀闷', '腹中喜温畏寒']
    }
  },
  {
    start: 9, end: 11,
    cn: '脾', cnSimp: '脾', pinyin: 'Pí', organ: 'Spleen',
    branch: '巳', branchPinyin: 'Sì',
    zodiac: '蛇', zodiacEn: 'Snake', zodiacEmoji: '🐍',
    chineseHour: '巳時 · Sì shí',
    element: 'earth',
    meaning: 'The spleen transforms food into qi and blood — energy and clarity peak.',
    meaningCn: '脾化水谷为气血——精力与神思俱清。',
    function: 'The spleen extracts nutrients and energy from breakfast. The mind is sharpest here. This is the prime window for focused, demanding mental work.',
    functionCn: '脾运化早餐之水谷精微，化为气血。此时神思最为清明，宜事繁难深思之业。',
    practices: [
      'Tackle your most demanding mental work',
      'Stay hydrated with warm or room-temperature water',
      'Take a brief walk if you feel sluggish'
    ],
    practicesCn: [
      '处理最需用脑用心之事',
      '常饮温水或常温水',
      '若觉倦怠，起身少行片刻'
    ],
    avoid: [
      'Sugary snacks that strain the spleen',
      'Excessive worry or overthinking',
      'Sitting still for the entire two hours'
    ],
    avoidCn: [
      '甜食零食——伤脾',
      '思虑过度，忧愁缠心',
      '久坐不动满二时辰'
    ],
    tone: '宫音 / 徵音', toneEn: 'Gōng / Zhǐ',
    musicEffect: "益气运化，强健肌理 · boosts qi, strengthens the body's structure",
    tracks: ['高山流水', '阳春', '花好月圆'],
    habit: 'Tackle your hardest mental work · sip warm water',
    habitCn: '专注用脑 · 频饮温水',
    kg: {
      properties: ['温 Warm', '平 Neutral'],
      flavours: ['甘 Sweet'],
      tropism: ['脾經 Spleen', '胃經 Stomach', '肺經 Lung'],
      herbs: [
        { cn: '黄芪', py: 'Huáng Qí', en: 'Astragalus root' },
        { cn: '白术', py: 'Bái Zhú', en: 'Atractylodes' },
        { cn: '山药', py: 'Shān Yào', en: 'Chinese yam' }
      ],
      syndrome: '脾氣虛 · Spleen qi deficiency',
      tcmSymptoms: ['Fatigue', 'Loose stools', 'Heavy limbs', 'Loss of appetite'],
      tcmSymptomsCn: ['倦怠乏力', '便溏', '四肢沉重', '纳呆食少']
    }
  },
  {
    start: 11, end: 13,
    cn: '心', cnSimp: '心', pinyin: 'Xīn', organ: 'Heart',
    branch: '午', branchPinyin: 'Wǔ',
    zodiac: '马', zodiacEn: 'Horse', zodiacEmoji: '🐎',
    chineseHour: '午時 · Wǔ shí',
    element: 'fire',
    meaning: 'Yang reaches its zenith. The heart governs the spirit and the joy of being alive.',
    meaningCn: '阳气至极。心主神明，主生命之喜。',
    function: 'At solar noon, yang energy peaks. The heart, ruler of the meridians, circulates blood and houses the shen (spirit). A short rest here protects the heart for the rest of the day.',
    functionCn: '日中之时，阳气至盛。心为君主之官，行血脉，藏神明。此时小憩片刻，以养心安神，可固一日之根本。',
    practices: [
      'Eat a moderate, nourishing lunch',
      'Take a 15–30 minute rest or quiet pause',
      'Connect with someone — laughter nourishes heart qi',
      'Avoid intense conflict or strain'
    ],
    practicesCn: [
      '午餐宜适量、营养而不过饱',
      '小憩 15–30 分钟，或静坐片刻',
      '与所爱之人相谈——笑可养心',
      '避剧烈争执与紧张'
    ],
    avoid: [
      'Heavy or greasy lunches',
      'Vigorous exercise during peak heat',
      'Skipping rest and pushing through'
    ],
    avoidCn: [
      '午餐重油厚腻',
      '日中烈日下剧烈运动',
      '忽略小憩，强力赶工'
    ],
    tone: '徵音 / 羽音', toneEn: 'Zhǐ / Yǔ',
    musicEffect: '宁心安神，调和阴阳 · calms the spirit, harmonises yin and yang',
    tracks: ['乌夜啼', '雉朝飞', '步步高'],
    habit: '15–30 minute midday rest · connect with someone you love',
    habitCn: '小憩 15–30 分钟 · 与所爱者相连',
    kg: {
      properties: ['平 Neutral', '微寒 Slightly Cold'],
      flavours: ['苦 Bitter'],
      tropism: ['心經 Heart', '小腸經 Sm. Intestine'],
      herbs: [
        { cn: '丹参', py: 'Dān Shēn', en: 'Salvia root' },
        { cn: '酸枣仁', py: 'Suān Zǎo Rén', en: 'Sour jujube seed' },
        { cn: '柏子仁', py: 'Bǎi Zǐ Rén', en: 'Biota seed' }
      ],
      syndrome: '心血不足 · Heart blood deficiency',
      tcmSymptoms: ['Insomnia', 'Palpitations', 'Anxiety', 'Pale complexion'],
      tcmSymptomsCn: ['失眠', '心悸', '心神不宁', '面色无华']
    }
  },
  {
    start: 13, end: 15,
    cn: '小腸', cnSimp: '小肠', pinyin: 'Xiǎo Cháng', organ: 'Small Intestine',
    branch: '未', branchPinyin: 'Wèi',
    zodiac: '羊', zodiacEn: 'Goat', zodiacEmoji: '🐐',
    chineseHour: '未時 · Wèi shí',
    element: 'fire',
    meaning: 'The pure is separated from the impure — clarity follows nourishment.',
    meaningCn: '受盛化物，泌别清浊——纳养既毕，清自现矣。',
    function: 'The small intestine sorts what to absorb and what to release, both physically and mentally. Lunch eaten before this window is now being processed. Drink water to support assimilation.',
    functionCn: '小肠主受盛化物、泌别清浊——既别水谷之精，亦别神思之清浊。前所食午餐，此时正在化精。饮温水以助吸收。',
    practices: [
      'Drink warm water steadily',
      'Engage in detail-oriented or analytical work',
      'A brief walk supports digestion'
    ],
    practicesCn: [
      '徐饮温水以助化',
      '宜处理需细致、分析之事',
      '稍事散步，助消化'
    ],
    avoid: [
      'Eating a heavy second meal during this window',
      'Cold drinks that quench digestive fire',
      'Emotionally charged conversations during digestion'
    ],
    avoidCn: [
      '此时再饱餐',
      '冷饮——熄消化之火',
      '情绪激越之谈话扰消化'
    ],
    tone: '徵音 / 角音', toneEn: 'Zhǐ / Jué',
    musicEffect: '促进吸收，分化清浊 · supports absorption, separates clear from turbid',
    tracks: ['列子御风', '文王操', '渔舟唱晚'],
    habit: 'Steady warm water · light analytical work',
    habitCn: '徐饮温水 · 行轻度分析之事',
    kg: {
      properties: ['温 Warm'],
      flavours: ['苦 Bitter', '甘 Sweet'],
      tropism: ['小腸經 Sm. Intestine'],
      herbs: [
        { cn: '茯苓', py: 'Fú Líng', en: 'Poria mushroom' },
        { cn: '车前子', py: 'Chē Qián Zǐ', en: 'Plantago seed' }
      ],
      syndrome: '小腸實熱 · Small intestine excess heat',
      tcmSymptoms: ['Mouth ulcers', 'Scanty dark urine', 'Restlessness'],
      tcmSymptomsCn: ['口舌生疮', '小便短赤', '心烦不宁']
    }
  },
  {
    start: 15, end: 17,
    cn: '膀胱', cnSimp: '膀胱', pinyin: 'Páng Guāng', organ: 'Bladder',
    branch: '申', branchPinyin: 'Shēn',
    zodiac: '猴', zodiacEn: 'Monkey', zodiacEmoji: '🐒',
    chineseHour: '申時 · Shēn shí',
    element: 'water',
    meaning: 'Memory and learning sharpen. The bladder meridian travels along the spine and head.',
    meaningCn: '记性与学力俱锐。膀胱经循脊柱而上达于头。',
    function: 'The bladder meridian governs the spine and supports the brain. A strong window for learning, study, and exercise. Drinking water helps flush the system.',
    functionCn: '膀胱经循脊柱而上达于脑，主一身阳气之外卫。申时为学习、读书、运动之佳时。多饮水可助水道通利。',
    practices: [
      'Study, read, or learn something new',
      'Drink plenty of water',
      'Gentle to moderate exercise',
      'Stand and stretch the spine often'
    ],
    practicesCn: [
      '读书、思考、习新事物',
      '多饮温水',
      '行轻至中度之运动',
      '常起身舒展腰背脊柱'
    ],
    avoid: [
      'Holding urination',
      'Dehydration — fatigue here is often thirst',
      'Slumping at a desk'
    ],
    avoidCn: [
      '憋尿',
      '不饮水——此时之倦多由渴',
      '长时间伏案塌肩'
    ],
    tone: '羽音 / 商音', toneEn: 'Yǔ / Shāng',
    musicEffect: '利水排毒，疏通经络 · drains dampness, opens the meridians',
    tracks: ['白雪', '长清', '平湖秋月'],
    habit: 'Move your body · learn or study · stay hydrated',
    habitCn: '活动身体 · 读书或思考 · 多饮温水',
    kg: {
      properties: ['寒 Cold', '平 Neutral'],
      flavours: ['淡 Bland', '甘 Sweet'],
      tropism: ['膀胱經 Bladder', '腎經 Kidney'],
      herbs: [
        { cn: '泽泻', py: 'Zé Xiè', en: 'Alisma rhizome' },
        { cn: '金钱草', py: 'Jīn Qián Cǎo', en: 'Lysimachia' }
      ],
      syndrome: '膀胱濕熱 · Bladder damp-heat',
      tcmSymptoms: ['Burning urination', 'Cloudy urine', 'Lower abdominal heaviness'],
      tcmSymptomsCn: ['小便涩痛', '小便混浊', '小腹坠胀']
    }
  },
  {
    start: 17, end: 19,
    cn: '腎', cnSimp: '肾', pinyin: 'Shèn', organ: 'Kidney',
    branch: '酉', branchPinyin: 'Yǒu',
    zodiac: '鸡', zodiacEn: 'Rooster', zodiacEmoji: '🐓',
    chineseHour: '酉時 · Yǒu shí',
    element: 'water',
    meaning: 'The kidneys store essence (jīng) — the foundation of life and longevity.',
    meaningCn: '肾藏精——为生命与长寿之本。',
    function: "TCM regards the kidneys as the body's root, holding inherited essence. This is a gentle hour for restoration. A light, warm dinner now supports the kidneys overnight.",
    functionCn: '中医谓肾为先天之本，藏先天之精。酉时宜静养调息。此时一餐温淡之晚膳，可助肾气安养至夜。',
    practices: [
      'Eat a light, warm dinner — soups, stews, cooked vegetables',
      'Include kidney-supporting foods: black beans, walnuts, sesame',
      'Begin to slow the pace of the day',
      'Stretch the lower back gently'
    ],
    practicesCn: [
      '晚餐宜清淡温热——汤、炖菜、煮熟蔬',
      '多食补肾之物：黑豆、核桃、黑芝麻',
      '渐缓日间之节奏',
      '轻舒腰背'
    ],
    avoid: [
      'Heavy, late, or salty meals',
      'Cold raw foods that drain kidney yang',
      'Pushing through fatigue with stimulants'
    ],
    avoidCn: [
      '晚餐重口、过咸或过晚',
      '生冷之食——耗肾阳',
      '以咖啡浓茶强撑倦怠'
    ],
    tone: '羽音', toneEn: 'Yǔ (A note)',
    musicEffect: '滋补肾气，固本培元 · nourishes essence, anchors the root',
    tracks: ['流水', '鹤鸣九皋', '二泉映月'],
    habit: 'Light, warm dinner · gentle low-back stretches',
    habitCn: '清淡温热晚膳 · 轻舒腰背',
    kg: {
      properties: ['温 Warm', '平 Neutral'],
      flavours: ['咸 Salty', '甘 Sweet'],
      tropism: ['腎經 Kidney', '肝經 Liver'],
      herbs: [
        { cn: '熟地黄', py: 'Shú Dì Huáng', en: 'Prepared rehmannia' },
        { cn: '杜仲', py: 'Dù Zhòng', en: 'Eucommia bark' },
        { cn: '黑芝麻', py: 'Hēi Zhī Má', en: 'Black sesame' }
      ],
      syndrome: '腎陽虛 · Kidney yang deficiency',
      tcmSymptoms: ['Cold hands and feet', 'Low back ache', 'Fatigue', 'Frequent urination'],
      tcmSymptomsCn: ['手足不温', '腰膝酸软', '神疲乏力', '夜尿频多']
    }
  },
  {
    start: 19, end: 21,
    cn: '心包', cnSimp: '心包', pinyin: 'Xīn Bāo', organ: 'Pericardium',
    branch: '戌', branchPinyin: 'Xū',
    zodiac: '狗', zodiacEn: 'Dog', zodiacEmoji: '🐕',
    chineseHour: '戌時 · Xū shí',
    element: 'fire',
    meaning: "The heart's protector. Time for warmth, connection, and emotional release.",
    meaningCn: '心之外护。此时宜温情、相聚、舒情志。',
    function: 'The pericardium shields the heart and is closely linked to circulation and emotional regulation. This is the relational hour — for family, intimacy, and gentle conversation.',
    functionCn: '心包为心之外卫，主血脉之运行，与情志调和最为密切。戌时为人伦相聚之时——宜与家人相处、温言细语。',
    practices: [
      'Connect with loved ones',
      'A leisurely walk after dinner',
      'Gentle yoga, journaling, or reading',
      'Warm (not hot) bath or foot soak'
    ],
    practicesCn: [
      '与家人朋友相聚共度',
      '饭后从容散步',
      '柔缓瑜伽、写日记或阅读',
      '温水（非烫）沐浴或泡脚'
    ],
    avoid: [
      'Heavy work or overtime',
      'Stressful news, tense arguments',
      'Eating large meals now'
    ],
    avoidCn: [
      '繁重劳作或加班',
      '紧张新闻、激烈争论',
      '此时大餐'
    ],
    tone: '徵音 / 角音', toneEn: 'Zhǐ / Jué',
    musicEffect: '宁心定志，调和情志 · settles the spirit, harmonises emotion',
    tracks: ['文王操', '庄周梦蝶', '烛影摇红'],
    habit: 'Connect with someone · gentle walk · warm foot soak',
    habitCn: '与人相聚 · 散步 · 温水泡脚',
    kg: {
      properties: ['温 Warm'],
      flavours: ['苦 Bitter', '甘 Sweet'],
      tropism: ['心包經 Pericardium', '心經 Heart'],
      herbs: [
        { cn: '远志', py: 'Yuǎn Zhì', en: 'Polygala root' },
        { cn: '合欢花', py: 'Hé Huān Huā', en: 'Albizia flower' }
      ],
      syndrome: '心包鬱熱 · Pericardium stagnant heat',
      tcmSymptoms: ['Anxiety', 'Mental restlessness', 'Chest oppression'],
      tcmSymptomsCn: ['心烦', '心神不宁', '胸闷']
    }
  },
  {
    start: 21, end: 23,
    cn: '三焦', cnSimp: '三焦', pinyin: 'Sān Jiāo', organ: 'Triple Burner',
    branch: '亥', branchPinyin: 'Hài',
    zodiac: '猪', zodiacEn: 'Pig', zodiacEmoji: '🐖',
    chineseHour: '亥時 · Hài shí',
    element: 'fire',
    meaning: "The body's waterways harmonise. Yin deepens. Prepare for sleep.",
    meaningCn: '体内水道相合。阴气加深，宜准备入睡。',
    function: "The Triple Burner (San Jiao) regulates the flow of fluids and qi through the body's three cavities. As yin gathers, the entire system prepares for the deep restoration of night.",
    functionCn: '三焦为「孤府」，统摄水液运行，与上中下三焦之气化。亥时阴气渐聚，全身始入夜养之深修。',
    practices: [
      'Dim the lights — let the body know night has come',
      'Stop working; close screens',
      'Read something calming, meditate, or do gentle breathing',
      'Aim to be in bed by 22:30'
    ],
    practicesCn: [
      '调暗灯光——使身知夜已临',
      '停事务，闭屏幕',
      '读宁静书籍、静坐或调息',
      '于亥末（22:30 前）入卧'
    ],
    avoid: [
      'Bright screens, especially blue light',
      'Vigorous exercise or heated debate',
      'Late caffeine or large drinks'
    ],
    avoidCn: [
      '明亮屏幕，尤其蓝光',
      '剧烈运动或激烈辩论',
      '晚间咖啡因或大量饮水'
    ],
    tone: '徵音 / 角音', toneEn: 'Zhǐ / Jué',
    musicEffect: '通调水道，安神宁心 · regulates the waterways, calms the heart-spirit',
    tracks: ['文王操', '庄周梦蝶', '烛影摇红'],
    habit: 'Dim the lights · screens off · in bed by 22:30',
    habitCn: '调暗灯光 · 闭屏 · 22:30 前入卧',
    kg: {
      properties: ['温 Warm', '平 Neutral'],
      flavours: ['辛 Pungent', '苦 Bitter'],
      tropism: ['三焦經 Triple Burner', '心包經 Pericardium'],
      herbs: [
        { cn: '陈皮', py: 'Chén Pí', en: 'Aged tangerine peel' },
        { cn: '柴胡', py: 'Chái Hú', en: 'Bupleurum root' }
      ],
      syndrome: '三焦氣鬱 · Triple Burner qi stagnation',
      tcmSymptoms: ['Sluggish digestion', 'Edema', 'Mood swings'],
      tcmSymptomsCn: ['消化迟缓', '水肿', '情志不舒']
    }
  }
];

const ELEMENT_FILL = {
  wood:  'var(--el-wood-soft)',
  fire:  'var(--el-fire-soft)',
  earth: 'var(--el-earth-soft)',
  metal: 'var(--el-metal-soft)',
  water: 'var(--el-water-soft)'
};
const ELEMENT_FILL_ACTIVE = {
  wood:  'rgba(107, 150, 118, 0.4)',
  fire:  'rgba(196, 60, 42, 0.4)',
  earth: 'rgba(200, 160, 74, 0.4)',
  metal: 'rgba(197, 184, 164, 0.35)',
  water: 'rgba(74, 116, 148, 0.4)'
};

/* ============================================================
   FIVE ELEMENTS · 五行 — comprehensive correspondences
   Per 《黄帝内经·素问》: 宣明五气篇, 阴阳应象大论, 五脏生成篇
   ============================================================ */

const FIVE_ELEMENTS = [
  {
    key: 'wood',
    cn: '木', pinyin: 'Mù', en: 'Wood',
    color: 'var(--el-wood)',
    season:    { cn: '春',  en: 'Spring',     note: 'rising, sprouting, growing outward' },
    direction: { cn: '东',  en: 'East' },
    climate:   { cn: '风',  en: 'Wind' },
    zang:      { cn: '肝',  en: 'Liver',           desc: 'governs free flow of qi, stores blood' },
    fu:        { cn: '胆',  en: 'Gallbladder',     desc: 'governs decision-making' },
    sense:     { cn: '目',  en: 'Eyes (vision)' },
    body:      { cn: '筋',  en: 'Sinews / tendons', source: '《素问·五脏生成》肝主筋' },
    bloom:     { cn: '爪',  en: 'Nails',     source: '其华在爪' },
    fluid:     { cn: '泪',  en: 'Tears',     source: '《宣明五气》肝为泪' },
    spirit:    { cn: '魂',  en: 'Hún (ethereal soul)', desc: 'imagination, dreams, vision', source: '《宣明五气》肝藏魂' },
    emotion:   { cn: '怒',  en: 'Anger',     desc: 'rises and disperses qi upward' },
    qiSign:    { cn: '语',  en: 'Talkativeness', source: '《宣明五气》肝为语', desc: 'liver disharmony manifests as excessive speech' },
    flavour:   { cn: '酸',  en: 'Sour',      desc: 'astringes, gathers' },
    color5:    { cn: '青',  en: 'Green / Cyan' },
    smell:     { cn: '臊',  en: 'Rancid' },
    tone:      { cn: '角',  en: 'Jué (E)',   desc: 'rising, soothes the liver' },
    grain:     { cn: '麦',  en: 'Wheat' },
    livestock: { cn: '鸡',  en: 'Chicken' },
    fruit:     { cn: '李',  en: 'Plum' },
    pernicious: { cn: '风', en: 'Wind',      desc: 'wind pathogens enter via the liver' },
    overuse:   { cn: '久行伤筋', en: 'Excessive walking injures sinews', source: '《宣明五气》五劳' },
    aversion:  { cn: '风',  en: 'wind',      source: '《宣明五气》肝恶风' },
    injury:    { cn: '怒伤肝', en: 'Excess anger injures the liver' },
    counter:   { cn: '悲胜怒', en: 'Sorrow overcomes anger',
                 desc: 'because Metal (sorrow) controls Wood (anger)' }
  },
  {
    key: 'fire',
    cn: '火', pinyin: 'Huǒ', en: 'Fire',
    color: 'var(--el-fire)',
    season:    { cn: '夏',  en: 'Summer',         note: 'peak yang, expansive, radiant' },
    direction: { cn: '南',  en: 'South' },
    climate:   { cn: '暑',  en: 'Heat' },
    zang:      { cn: '心',  en: 'Heart',          desc: 'houses the spirit, governs the blood vessels' },
    fu:        { cn: '小肠', en: 'Small Intestine', desc: 'separates clear from turbid' },
    sense:     { cn: '舌',  en: 'Tongue' },
    body:      { cn: '脉',  en: 'Blood vessels',  source: '心主脉' },
    bloom:     { cn: '面',  en: 'Face / complexion', source: '其华在面' },
    fluid:     { cn: '汗',  en: 'Sweat',     source: '心为汗' },
    spirit:    { cn: '神',  en: 'Shén (spirit)',     desc: 'consciousness, presence, awareness', source: '心藏神' },
    emotion:   { cn: '喜',  en: 'Joy',       desc: 'relaxes qi; in excess, scatters the spirit' },
    qiSign:    { cn: '噫',  en: 'Belching / sighing', source: '《宣明五气》心为噫', desc: 'a soft upward release from the chest' },
    flavour:   { cn: '苦',  en: 'Bitter',    desc: 'descends, drains, dries' },
    color5:    { cn: '赤',  en: 'Red' },
    smell:     { cn: '焦',  en: 'Scorched' },
    tone:      { cn: '徵',  en: 'Zhǐ (G)',   desc: 'warm, joyful — supports the heart' },
    grain:     { cn: '黍',  en: 'Glutinous millet' },
    livestock: { cn: '羊',  en: 'Goat / mutton' },
    fruit:     { cn: '杏',  en: 'Apricot' },
    pernicious: { cn: '热',  en: 'Heat',      desc: 'heat pathogens enter via the heart' },
    overuse:   { cn: '久视伤血', en: 'Excessive looking injures the blood', source: '《宣明五气》五劳' },
    aversion:  { cn: '热',  en: 'heat',      source: '心恶热' },
    injury:    { cn: '喜伤心', en: 'Excess joy injures the heart' },
    counter:   { cn: '恐胜喜', en: 'Fear overcomes joy',
                 desc: 'because Water (fear) controls Fire (joy)' }
  },
  {
    key: 'earth',
    cn: '土', pinyin: 'Tǔ', en: 'Earth',
    color: 'var(--el-earth)',
    season:    { cn: '长夏', en: 'Late Summer',    note: 'pivot, ripening, transformation' },
    direction: { cn: '中',  en: 'Center' },
    climate:   { cn: '湿',  en: 'Dampness' },
    zang:      { cn: '脾',  en: 'Spleen',         desc: 'transforms food into qi & blood, holds blood in vessels' },
    fu:        { cn: '胃',  en: 'Stomach',        desc: "the body's 'sea of grain and water'" },
    sense:     { cn: '口',  en: 'Mouth (taste)' },
    body:      { cn: '肉',  en: 'Flesh / muscle', source: '脾主肉' },
    bloom:     { cn: '唇',  en: 'Lips',           source: '其华在唇' },
    fluid:     { cn: '涎',  en: 'Saliva (thin)',  source: '脾为涎' },
    spirit:    { cn: '意',  en: 'Yì (intent)',    desc: 'thought, intention, focused attention', source: '脾藏意' },
    emotion:   { cn: '思',  en: 'Pensive worry',  desc: 'binds qi; excessive thinking knots the spleen' },
    qiSign:    { cn: '吞',  en: 'Swallowing / acid swallowing', source: '《宣明五气》脾为吞', desc: 'reflux of acid, the swallow reflex' },
    flavour:   { cn: '甘',  en: 'Sweet',     desc: 'tonifies, harmonises, moderates' },
    color5:    { cn: '黄',  en: 'Yellow' },
    smell:     { cn: '香',  en: 'Fragrant' },
    tone:      { cn: '宫',  en: 'Gōng (C)',  desc: 'centering, grounding — supports the spleen' },
    grain:     { cn: '稷',  en: 'Foxtail millet' },
    livestock: { cn: '牛',  en: 'Ox / beef' },
    fruit:     { cn: '枣',  en: 'Jujube' },
    pernicious: { cn: '湿', en: 'Dampness', desc: 'damp pathogens lodge in the spleen' },
    overuse:   { cn: '久坐伤肉', en: 'Excessive sitting injures the flesh', source: '《宣明五气》五劳' },
    aversion:  { cn: '湿',  en: 'dampness', source: '脾恶湿' },
    injury:    { cn: '思伤脾', en: 'Excess thinking injures the spleen' },
    counter:   { cn: '怒胜思', en: 'Anger overcomes worry',
                 desc: 'because Wood (anger) controls Earth (worry)' }
  },
  {
    key: 'metal',
    cn: '金', pinyin: 'Jīn', en: 'Metal',
    color: 'var(--el-metal)',
    season:    { cn: '秋',  en: 'Autumn',         note: 'gathering, descending, letting go' },
    direction: { cn: '西',  en: 'West' },
    climate:   { cn: '燥',  en: 'Dryness' },
    zang:      { cn: '肺',  en: 'Lung',           desc: 'governs qi and the breath, regulates the water passages' },
    fu:        { cn: '大肠', en: 'Large Intestine', desc: 'releases what is no longer needed' },
    sense:     { cn: '鼻',  en: 'Nose (smell)' },
    body:      { cn: '皮',  en: 'Skin (& body hair)', source: '肺主皮' },
    bloom:     { cn: '毛',  en: 'Body hair',  source: '其华在毛' },
    fluid:     { cn: '涕',  en: 'Mucus / nasal discharge', source: '肺为涕' },
    spirit:    { cn: '魄',  en: 'Pò (corporeal soul)', desc: 'reflexes, sensation, instinct, the body-self', source: '肺藏魄' },
    emotion:   { cn: '悲/忧', en: 'Grief / sorrow', desc: 'gathers and consumes qi' },
    qiSign:    { cn: '咳',  en: 'Cough', source: '《宣明五气》肺为咳', desc: 'lung qi rebelling upward' },
    flavour:   { cn: '辛',  en: 'Pungent / acrid', desc: 'disperses, releases the exterior' },
    color5:    { cn: '白',  en: 'White' },
    smell:     { cn: '腥',  en: 'Fishy / raw' },
    tone:      { cn: '商',  en: 'Shāng (D)', desc: 'crisp, clear — supports the lungs' },
    grain:     { cn: '稻',  en: 'Rice' },
    livestock: { cn: '马',  en: 'Horse' },
    fruit:     { cn: '桃',  en: 'Peach' },
    pernicious: { cn: '燥', en: 'Dryness', desc: 'dryness pathogens enter via the lungs' },
    overuse:   { cn: '久卧伤气', en: 'Excessive lying injures the qi', source: '《宣明五气》五劳' },
    aversion:  { cn: '寒',  en: 'cold',     source: '肺恶寒' },
    injury:    { cn: '悲伤肺', en: 'Excess grief injures the lung' },
    counter:   { cn: '喜胜悲', en: 'Joy overcomes grief',
                 desc: 'because Fire (joy) controls Metal (grief)' }
  },
  {
    key: 'water',
    cn: '水', pinyin: 'Shuǐ', en: 'Water',
    color: 'var(--el-water)',
    season:    { cn: '冬',  en: 'Winter',         note: 'storage, stillness, conservation' },
    direction: { cn: '北',  en: 'North' },
    climate:   { cn: '寒',  en: 'Cold' },
    zang:      { cn: '肾',  en: 'Kidney',         desc: 'stores essence (jīng), governs water and bones' },
    fu:        { cn: '膀胱', en: 'Bladder',       desc: 'stores and releases fluids' },
    sense:     { cn: '耳',  en: 'Ears (hearing)' },
    body:      { cn: '骨',  en: 'Bones / marrow', source: '肾主骨' },
    bloom:     { cn: '发',  en: 'Hair of the head', source: '其华在发' },
    fluid:     { cn: '唾',  en: 'Saliva (thick)', source: '肾为唾' },
    spirit:    { cn: '志',  en: 'Zhì (will)',     desc: 'memory, willpower, life-purpose', source: '肾藏志' },
    emotion:   { cn: '恐',  en: 'Fear',      desc: 'descends qi; excessive fear weakens the kidney' },
    qiSign:    { cn: '欠/嚏', en: 'Yawning / sneezing', source: '《宣明五气》肾为欠为嚏', desc: 'kidney qi reaching for breath' },
    flavour:   { cn: '咸',  en: 'Salty',     desc: 'softens, descends' },
    color5:    { cn: '黑',  en: 'Black' },
    smell:     { cn: '腐',  en: 'Putrid' },
    tone:      { cn: '羽',  en: 'Yǔ (A)',    desc: 'deep, anchoring — supports the kidneys' },
    grain:     { cn: '豆',  en: 'Bean' },
    livestock: { cn: '猪',  en: 'Pig / pork' },
    fruit:     { cn: '栗',  en: 'Chestnut' },
    pernicious: { cn: '寒', en: 'Cold',      desc: 'cold pathogens enter via the kidney' },
    overuse:   { cn: '久立伤骨', en: 'Excessive standing injures the bones', source: '《宣明五气》五劳' },
    aversion:  { cn: '燥',  en: 'dryness',   source: '肾恶燥' },
    injury:    { cn: '恐伤肾', en: 'Excess fear injures the kidney' },
    counter:   { cn: '思胜恐', en: 'Reflection overcomes fear',
                 desc: 'because Earth (thought) controls Water (fear)' }
  }
];

/* The categories displayed in the correspondences table on elements.html.
   Each entry: { key on each element object, Chinese label, English label, group } */
const CORRESPONDENCE_CATEGORIES = [
  // Cosmological
  { key: 'season',     cn: '五季', en: 'Season',           group: 'cosmos' },
  { key: 'direction',  cn: '五方', en: 'Direction',        group: 'cosmos' },
  { key: 'climate',    cn: '五气', en: 'Climatic Qi',      group: 'cosmos' },
  { key: 'pernicious', cn: '五淫', en: 'Climatic Excess',  group: 'cosmos' },
  // Anatomical
  { key: 'zang',       cn: '五脏', en: 'Yīn Organ (zàng)', group: 'body' },
  { key: 'fu',         cn: '五腑', en: 'Yáng Organ (fǔ)',  group: 'body' },
  { key: 'sense',      cn: '五官', en: 'Sense Organ',      group: 'body' },
  { key: 'body',       cn: '五主', en: 'Body Tissue',      group: 'body' },
  { key: 'bloom',      cn: '五华', en: 'Outer Bloom',      group: 'body' },
  { key: 'fluid',      cn: '五液', en: 'Body Fluid',       group: 'body' },
  // Mental / spiritual
  { key: 'spirit',     cn: '五藏 (神)', en: 'Spirit aspect',  group: 'spirit' },
  { key: 'emotion',    cn: '五志', en: 'Emotion',          group: 'spirit' },
  { key: 'qiSign',     cn: '五气病', en: 'Qi-disturbance sign', group: 'spirit' },
  // Sensory
  { key: 'flavour',    cn: '五味', en: 'Flavour',          group: 'sense' },
  { key: 'color5',     cn: '五色', en: 'Color',            group: 'sense' },
  { key: 'smell',      cn: '五臭', en: 'Smell',            group: 'sense' },
  { key: 'tone',       cn: '五音', en: 'Musical Tone',     group: 'sense' },
  // Sustenance
  { key: 'grain',      cn: '五谷', en: 'Grain',            group: 'food' },
  { key: 'livestock',  cn: '五畜', en: 'Livestock',        group: 'food' },
  { key: 'fruit',      cn: '五果', en: 'Fruit',            group: 'food' },
  // Pathology
  { key: 'aversion',   cn: '五恶', en: 'Aversion',         group: 'pathology' },
  { key: 'overuse',    cn: '五劳', en: 'Five Strains',     group: 'pathology' },
  { key: 'injury',     cn: '五伤', en: 'Five Injuries',    group: 'pathology' },
  { key: 'counter',    cn: '相胜', en: 'Counter-emotion',  group: 'pathology' }
];

const GROUP_LABELS = {
  cosmos:    { cn: '天地', en: 'Cosmos' },
  body:      { cn: '形',   en: 'Body' },
  spirit:    { cn: '神',   en: 'Spirit & Mind' },
  sense:     { cn: '感',   en: 'Senses' },
  food:      { cn: '食',   en: 'Sustenance' },
  pathology: { cn: '病',   en: 'Pathology' }
};

const FANGWEI = ['子','癸','丑','艮','寅','甲','卯','乙','辰','巽','巳','丙','午','丁','未','坤','申','庚','酉','辛','戌','乾','亥','壬'];

function getCurrentIdx(now = new Date()) {
  const h = now.getHours() + now.getMinutes() / 60;
  return ORGANS.findIndex(o => {
    if (o.end <= o.start) return h >= o.start || h < o.end;
    return h >= o.start && h < o.end;
  });
}

/* ============================================================
   MUSIC DATA — five-tone (五音) tracks for each meridian hour
   ported from KunVinn/CTM-Clock (https://github.com/KunVinn/CTM-Clock).
   The mp3 files live in `assets/CTM-Music/` (relative to site root).
   See `assets/CTM-Music/README.txt` for instructions.
   ============================================================ */

const MUSIC_DATA = {
  '肝':   { tone: '角音',      tracks: ['春江花月夜.mp3', '紫竹调.mp3',     '庄周梦蝶.mp3'] },
  '肺':   { tone: '商音',      tracks: ['阳春白雪.mp3', '广陵散.mp3',     '黄河大合唱.mp3'] },
  '大肠': { tone: '商音/宫音', tracks: ['潇湘水云.mp3', '梅花三弄.mp3',   '十面埋伏.mp3'] },
  '胃':   { tone: '宫音/羽音', tracks: ['古琴山居吟.mp3','洞庭秋思.mp3',  '北国之春.mp3'] },
  '脾':   { tone: '宫音/徵音', tracks: ['高山流水.mp3', '阳春.mp3',       '花好月圆.mp3'] },
  '心':   { tone: '徵音/羽音', tracks: ['乌夜啼.mp3',   '雉朝飞.mp3',     '步步高.mp3'] },
  '小肠': { tone: '徵音/角音', tracks: ['列子御风.mp3', '文王操.mp3',     '渔舟唱晚.mp3'] },
  '膀胱': { tone: '羽音/商音', tracks: ['长清.mp3',     '白雪.mp3',       '平湖秋月.mp3'] },
  '肾':   { tone: '羽音',      tracks: ['流水.mp3',     '鹤鸣九皋.mp3',   '二泉映月.mp3'] },
  '心包': { tone: '徵音/角音', tracks: ['文王操.mp3',   '庄周梦蝶.mp3',   '烛影摇红.mp3'] },
  '三焦': { tone: '徵音/角音', tracks: ['文王操.mp3',   '庄周梦蝶.mp3',   '烛影摇红.mp3'] },
  '胆':   { tone: '角音',      tracks: ['肝胆相照.mp3', '木调晨曦.mp3',   '胡笳十八拍.mp3', '姑苏行.mp3'] }
};

// Resolve a track filename to a full URL relative to the site root.
function musicTrackUrl(filename) {
  return 'assets/CTM-Music/' + filename;
}

/* ============================================================
   MERIDIANS — 14 channels with classical 歌诀 mnemonic verses
   and links to the canonical reference at yibian.hopto.org.
   Sourced from the 针灸知识 collection (uploaded by user).
   ============================================================ */

const MERIDIANS = [
  {
    cn: '手太阴肺经', cnTrad: '手太陰肺經',
    en: 'Lung Channel of Hand-Taiyin', short: 'Lung · LU',
    pointCount: 11,
    organ: '肺', orgEn: 'Lung',
    element: 'metal', hour: 4,
    verse: ['手太阴肺十一穴，', '中府云门天府诀，', '侠白尺泽孔最存，', '列缺经渠太渊涉，', '鱼际拇指白肉际，', '抵指少商如韭叶。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  {
    cn: '手少阴心经', cnTrad: '手少陰心經',
    en: 'Heart Channel of Hand-Shaoyin', short: 'Heart · HT',
    pointCount: 9,
    organ: '心', orgEn: 'Heart',
    element: 'fire', hour: 12,
    verse: ['九穴心经手少阴，', '极泉青灵少海深，', '灵道通里阴郄邃，', '神门少府少冲寻。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6970'
  },
  {
    cn: '手厥阴心包经', cnTrad: '手厥陰心包經',
    en: 'Pericardium Channel of Hand-Jueyin', short: 'Pericardium · PC',
    pointCount: 9,
    organ: '心包', orgEn: 'Pericardium',
    element: 'fire', hour: 20,
    verse: ['心包九穴天池近，', '天泉曲泽郄门认，', '间使内关输大陵，', '劳宫中冲中指尽。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6972'
  },
  {
    cn: '手阳明大肠经', cnTrad: '手陽明大腸經',
    en: 'Large Intestine Channel of Hand-Yangming', short: 'Large Intestine · LI',
    pointCount: 20,
    organ: '大肠', orgEn: 'Large Intestine',
    element: 'metal', hour: 6,
    verse: ['二十大肠起商阳，', '二间三间合谷藏，', '阳溪偏历温溜济，', '下廉上廉三里长，', '曲池肘髎五里近，', '臂臑肩髃巨骨当，', '天鼎扶突禾髎接，', '鼻旁五分迎香列。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  {
    cn: '手太阳小肠经', cnTrad: '手太陽小腸經',
    en: 'Small Intestine Channel of Hand-Taiyang', short: 'Small Intestine · SI',
    pointCount: 19,
    organ: '小肠', orgEn: 'Small Intestine',
    element: 'fire', hour: 14,
    verse: ['手太阳经小肠穴，', '少泽先行小指末，', '前谷后溪腕骨间，', '阳谷须同养老列，', '支正小海上肩贞，', '臑俞天宗秉风和，', '曲垣肩外复肩中，', '天窗寻刺上天容，', '此经穴数一十九，', '还有颧髎入听宫。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6969'
  },
  {
    cn: '手少阳三焦经', cnTrad: '手少陽三焦經',
    en: 'Triple Burner Channel of Hand-Shaoyang', short: 'Triple Burner · TB',
    pointCount: 23,
    organ: '三焦', orgEn: 'Triple Burner',
    element: 'fire', hour: 22,
    verse: ['少阳三焦二十三，', '关冲液门中渚间，', '阳池外关支沟正，', '会宗三阳四渎长，', '天井清泠渊消泺，', '臑会肩髎天髎堂，', '天牖翳风瘈脉青，', '颅息角孙耳门当，', '和髎耳前发际边，', '丝竹空在眉外藏。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6971'
  },
  {
    cn: '足阳明胃经', cnTrad: '足陽明胃經',
    en: 'Stomach Channel of Foot-Yangming', short: 'Stomach · ST',
    pointCount: 45,
    organ: '胃', orgEn: 'Stomach',
    element: 'earth', hour: 8,
    verse: ['四十五穴足阳明，', '承泣四白巨髎经，', '地仓大迎下颊车，', '下关头维对人迎，', '水突气舍连缺盆，', '气户库房屋翳寻，', '膺窗乳中下乳根，', '不容承满与梁门，', '关门太乙滑肉门，', '天枢外陵大巨存，', '水道归来气冲刺，', '髀关伏兔走阴市，', '梁丘犊鼻足三里，', '上巨虚连条口行，', '下巨虚下有丰隆，', '解溪冲阳陷谷同，', '内庭厉兑阳明穴，', '大趾次趾之端终。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  {
    cn: '足少阳胆经', cnTrad: '足少陽膽經',
    en: 'Gallbladder Channel of Foot-Shaoyang', short: 'Gallbladder · GB',
    pointCount: 44,
    organ: '胆', orgEn: 'Gallbladder',
    element: 'wood', hour: 24,
    verse: ['足少阳起瞳子髎，', '四十四穴君记牢，', '听会上关颔厌集，', '悬颅悬厘曲鬓分，', '率谷天冲浮白次，', '窍阴完骨本神交，', '阳白临泣目窗开，', '正营承灵脑空怀，', '风池肩井与渊腋，', '辄筋日月京门结，', '带脉五枢维道连，', '居髎环跳风市间，', '中渎阳关阳陵泉，', '阳交外丘光明宜，', '阳辅悬钟丘墟外，', '临泣地五会侠溪，', '四趾外端足窍阴，', '胆经经穴仔细扪。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6965'
  },
  {
    cn: '足太阳膀胱经', cnTrad: '足太陽膀胱經',
    en: 'Bladder Channel of Foot-Taiyang', short: 'Bladder · BL',
    pointCount: 67,
    organ: '膀胱', orgEn: 'Bladder',
    element: 'water', hour: 16,
    verse: ['六十七穴足太阳，', '睛明目内红肉藏，', '攒竹眉冲与曲差，', '五处一五上承光，', '通天络却下玉枕，', '天柱发际大筋上，', '大杼风门肺厥阴，', '心俞督俞膈俞当，', '肝胆脾胃具挨次，', '三焦肾俞海大肠，', '关元小肠到膀胱，', '中膂百环寸半量，', '上次中下四髎穴，', '一空一空骶孔藏，', '会阳尾骨外边取，', '附分脊背第二行，', '魄户膏肓神堂遇，', '譩譆膈关魂门详，', '阳纲意舍胃仓随，', '肓门志室至胞肓，', '二十一椎秩边是，', '承扶臀股纹中央，', '殷门浮郄委阳至，', '委中合阳承筋量，', '承山飞扬跗阳继，', '昆仑仆参申脉堂，', '金门京骨束骨跟，', '通谷至阴小趾旁。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6963'
  },
  {
    cn: '足太阴脾经', cnTrad: '足太陰脾經',
    en: 'Spleen Channel of Foot-Taiyin', short: 'Spleen · SP',
    pointCount: 21,
    organ: '脾', orgEn: 'Spleen',
    element: 'earth', hour: 10,
    verse: ['二十一穴脾中州，', '隐白在足大趾头，', '大都太白公孙盛，', '商丘直上三阴交，', '漏谷地机阴陵泉，', '血海箕门冲门前，', '府舍腹结大横上，', '腹哀食窦天溪候，', '胸乡周容大包上。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  {
    cn: '足厥阴肝经', cnTrad: '足厥陰肝經',
    en: 'Liver Channel of Foot-Jueyin', short: 'Liver · LV',
    pointCount: 14,
    organ: '肝', orgEn: 'Liver',
    element: 'wood', hour: 2,
    verse: ['足厥阴经一十四，', '大敦行间太冲是，', '中封蠡沟伴中都，', '膝关曲泉阴包次，', '五里阴廉上急脉，', '章门过后期门至。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6966'
  },
  {
    cn: '足少阴肾经', cnTrad: '足少陰腎經',
    en: 'Kidney Channel of Foot-Shaoyin', short: 'Kidney · KI',
    pointCount: 27,
    organ: '肾', orgEn: 'Kidney',
    element: 'water', hour: 18,
    verse: ['少阴肾经二十七，', '涌泉然谷与太溪，', '大钟水泉与照海，', '复溜交信筑宾派，', '阴谷膝内辅骨后，', '以上从足至膝求，', '横骨大赫连气穴，', '四满中注肓俞脐，', '商曲石关阴都密，', '通谷幽门一寸取，', '步廊神封膺灵墟，', '神藏彧中俞府毕。'],
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  {
    cn: '督脉', cnTrad: '督脈',
    en: 'Governing Vessel', short: 'Du Mài · GV',
    pointCount: 29, vessel: true,
    organ: '督脉', orgEn: 'Governing Vessel',
    verse: ['督脉经穴二十九，', '起长强止龈交上，', '脑病为主次分段，', '急救热病及肛肠。'],
    note: 'Runs along the back midline from coccyx (长强 GV1) to upper lip (龈交 GV28). Governs all yang channels — used for brain disorders, fever, emergencies, and lower-spine issues.',
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  {
    cn: '任脉', cnTrad: '任脈',
    en: 'Conception Vessel', short: 'Rèn Mài · CV',
    pointCount: 24, vessel: true,
    organ: '任脉', orgEn: 'Conception Vessel',
    verse: ['任脉经穴二十四，', '起于会阴承浆停，', '强壮为主次分段，', '泌尿生殖作用宏。'],
    note: 'Runs along the front midline from perineum (会阴 CV1) to lower lip (承浆 CV24). Governs all yin channels — used for tonification, reproductive and urinary disorders, and digestive issues.',
    sourceUrl: 'https://yibian.hopto.org/shu/?sid=6943'
  }
];

/* ============================================================
   SPECIAL POINT CATEGORIES
   Classical 特定穴 categories used in clinical practice.
   ============================================================ */

const SPECIAL_POINTS = [
  {
    cn: '八总穴', en: 'Eight Command Points',
    desc: 'Eight points covering the major treatment areas of the body — the foundational mnemonic for clinical practice.',
    points: [
      { cn: '足三里', code: 'ST36', covers: '肚腹 — Abdomen' },
      { cn: '委中',   code: 'BL40', covers: '腰背 — Lower back' },
      { cn: '列缺',   code: 'LU7',  covers: '头项 — Head & neck' },
      { cn: '合谷',   code: 'LI4',  covers: '面口 — Face & mouth' },
      { cn: '内关',   code: 'PC6',  covers: '心胸 — Heart & chest' },
      { cn: '三阴交', code: 'SP6',  covers: '妇科 — Gynecology' },
      { cn: '安眠',   code: 'EX',   covers: '失眠 — Insomnia' },
      { cn: '太冲',   code: 'LV3',  covers: '情志 — Emotions' }
    ]
  },
  {
    cn: '十二原穴', en: 'Twelve Source Points',
    desc: 'The "yuan source" point of each of the 12 regular channels — where the original qi of that organ surfaces. Essential for diagnosing and treating that organ system.',
    points: [
      { cn: '太渊', code: 'LU9',  covers: '肺 Lung' },
      { cn: '合谷', code: 'LI4',  covers: '大肠 Large Intestine' },
      { cn: '冲阳', code: 'ST42', covers: '胃 Stomach' },
      { cn: '太白', code: 'SP3',  covers: '脾 Spleen' },
      { cn: '神门', code: 'HT7',  covers: '心 Heart' },
      { cn: '腕骨', code: 'SI4',  covers: '小肠 Small Intestine' },
      { cn: '京骨', code: 'BL64', covers: '膀胱 Bladder' },
      { cn: '太溪', code: 'KI3',  covers: '肾 Kidney' },
      { cn: '大陵', code: 'PC7',  covers: '心包 Pericardium' },
      { cn: '阳池', code: 'TB4',  covers: '三焦 Triple Burner' },
      { cn: '丘墟', code: 'GB40', covers: '胆 Gallbladder' },
      { cn: '太冲', code: 'LV3',  covers: '肝 Liver' }
    ]
  },
  {
    cn: '十二募穴', en: 'Twelve Front-Mu Points',
    desc: 'The "alarm" or "gathering" point of each organ on the front of the body — where pathology of that organ shows up as tenderness, and where treatment most directly reaches the organ.',
    points: [
      { cn: '中府',   code: 'LU1',  covers: '肺 Lung' },
      { cn: '巨阙',   code: 'CV14', covers: '心 Heart' },
      { cn: '膻中',   code: 'CV17', covers: '心包 Pericardium' },
      { cn: '期门',   code: 'LV14', covers: '肝 Liver' },
      { cn: '日月',   code: 'GB24', covers: '胆 Gallbladder' },
      { cn: '章门',   code: 'LV13', covers: '脾 Spleen' },
      { cn: '中脘',   code: 'CV12', covers: '胃 Stomach' },
      { cn: '京门',   code: 'GB25', covers: '肾 Kidney' },
      { cn: '天枢',   code: 'ST25', covers: '大肠 Large Intestine' },
      { cn: '关元',   code: 'CV4',  covers: '小肠 Small Intestine' },
      { cn: '中极',   code: 'CV3',  covers: '膀胱 Bladder' },
      { cn: '石门',   code: 'CV5',  covers: '三焦 Triple Burner' }
    ]
  },
  {
    cn: '十二背俞穴', en: 'Twelve Back-Shu Points',
    desc: 'The "transport" point of each organ on the back, alongside the spine — where the organ\'s qi flows out to the surface. Mirror of the front-mu points.',
    points: [
      { cn: '肺俞',   code: 'BL13', covers: '肺 Lung' },
      { cn: '厥阴俞', code: 'BL14', covers: '心包 Pericardium' },
      { cn: '心俞',   code: 'BL15', covers: '心 Heart' },
      { cn: '肝俞',   code: 'BL18', covers: '肝 Liver' },
      { cn: '胆俞',   code: 'BL19', covers: '胆 Gallbladder' },
      { cn: '脾俞',   code: 'BL20', covers: '脾 Spleen' },
      { cn: '胃俞',   code: 'BL21', covers: '胃 Stomach' },
      { cn: '三焦俞', code: 'BL22', covers: '三焦 Triple Burner' },
      { cn: '肾俞',   code: 'BL23', covers: '肾 Kidney' },
      { cn: '大肠俞', code: 'BL25', covers: '大肠 Large Intestine' },
      { cn: '小肠俞', code: 'BL27', covers: '小肠 Small Intestine' },
      { cn: '膀胱俞', code: 'BL28', covers: '膀胱 Bladder' }
    ]
  },
  {
    cn: '八会穴', en: 'Eight Influential Points',
    desc: 'Eight points each "influential" for one body tissue or substance — used when that tissue is involved.',
    points: [
      { cn: '章门', code: 'LV13', covers: '脏会 — Influential for the yīn organs' },
      { cn: '中脘', code: 'CV12', covers: '腑会 — Influential for the yáng organs' },
      { cn: '膻中', code: 'CV17', covers: '气会 — Influential for qi' },
      { cn: '膈俞', code: 'BL17', covers: '血会 — Influential for blood' },
      { cn: '阳陵泉', code: 'GB34', covers: '筋会 — Influential for tendons / sinews' },
      { cn: '太渊', code: 'LU9',  covers: '脉会 — Influential for vessels' },
      { cn: '大杼', code: 'BL11', covers: '骨会 — Influential for bones' },
      { cn: '悬钟', code: 'GB39', covers: '髓会 — Influential for marrow' }
    ]
  }
];


