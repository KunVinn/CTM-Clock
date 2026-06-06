/* ============================================================
   子午流注 · TCM Glossary
   Maps TCM terms (Chinese, pinyin, or English) to their definition
   and an external reference URL (Wikipedia, classical text, etc.)

   Format:
     TERMS[lookupKey] = {
       cn:      Chinese name (with ·pinyin)
       en:      English name
       def:     One-line definition
       url:     External link for "read more"
       page:    Optional internal page anchor (overrides url)
     }
   ============================================================ */

const TERMS = {
  // ================== CORE FOUNDATIONAL CONCEPTS ==================
  'qi': {
    cn: '氣 / 气 · Qì', en: 'Vital energy',
    def: 'The vital life-force or animating energy that flows through every meridian and powers all bodily function.',
    defCn: '人体之生命力——流贯诸经络、推动一切生理活动之根本之气。',
    url: 'https://en.wikipedia.org/wiki/Qi'
  },
  'yin-yang': {
    cn: '陰陽 / 阴阳 · Yīn Yáng', en: 'Yin–Yang',
    def: 'Two complementary, opposing forces whose dynamic balance underlies all natural phenomena.',
    defCn: '相对而相成之两种力，其动态平衡为天地万物之根本。',
    url: 'https://en.wikipedia.org/wiki/Yin_and_yang'
  },
  'wuxing': {
    cn: '五行 · Wǔ Xíng', en: 'Five Phases / Five Elements',
    def: 'Wood, Fire, Earth, Metal, Water — five interrelated phases that mutually generate (相生) and control (相克).',
    defCn: '木、火、土、金、水——五大相互关联之相，互生（相生）、互制（相克），为万象之纲。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)'
  },
  'jing': {
    cn: '精 · Jīng', en: 'Essence',
    def: 'The deep, inherited substance stored chiefly in the Kidneys; foundation of growth, reproduction, and longevity.',
    defCn: '先天之精藏于肾，为生长、生殖、寿命之根本。',
    url: 'https://en.wikipedia.org/wiki/Jing_(Chinese_medicine)'
  },
  'shen': {
    cn: '神 · Shén', en: 'Spirit / Mind',
    def: 'The luminous spirit-mind housed in the Heart; consciousness, presence, and emotional clarity.',
    defCn: '心所藏之神明——为意识、知觉、情志清明之主。',
    url: 'https://en.wikipedia.org/wiki/Shen_(Chinese_religion)'
  },
  'meridian': {
    cn: '經絡 · Jīng Luò', en: 'Meridian / Channel',
    def: 'Networks through which qi and blood circulate, connecting organs to the surface of the body.',
    defCn: '气血循行之径，内联脏腑，外络肢节，贯通表里上下之网络系统。',
    url: 'https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)'
  },
  'ziwu-liuzhu': {
    cn: '子午流注 · Zǐ Wǔ Liú Zhù', en: 'Midnight–Noon Ebb-and-Flow',
    def: 'The TCM theory that qi flows through the twelve organ meridians on a 24-hour cycle, with each meridian peaking in a specific two-hour window.',
    defCn: '中医气血循行学说——气血依十二经按时辰流注，每经各有当令之两小时为其气血最盛之时。',
    url: 'https://en.wikipedia.org/wiki/Chinese_clock'
  },
  'huangdi-neijing': {
    cn: '黃帝內經 · Huáng Dì Nèi Jīng', en: "Yellow Emperor's Inner Canon",
    def: 'The foundational classic of Chinese medicine, compiled c. 100 BCE; source of most TCM theory.',
    defCn: '中医理论之奠基经典，约成书于公元前 100 年，分《素问》《灵枢》两部——为后世中医学说之源泉。',
    url: 'https://en.wikipedia.org/wiki/Huangdi_Neijing',
    urlCn: 'https://www.shidianguji.com/book/SBCK072'
  },

  // ================== EARTHLY BRANCHES & ZODIAC ==================
  'dizhi': {
    cn: '地支 · Dì Zhī', en: 'Earthly Branches',
    def: 'A 12-fold cycle (子丑寅卯辰巳午未申酉戌亥) used to mark hours, days, months, and years.',
    url: 'https://en.wikipedia.org/wiki/Earthly_Branches'
  },
  'shengxiao': {
    cn: '生肖 · Shēng Xiào', en: 'Chinese Zodiac',
    def: 'Twelve animals (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) corresponding to the Earthly Branches.',
    url: 'https://en.wikipedia.org/wiki/Chinese_zodiac'
  },

  // ================== FIVE ELEMENTS ==================
  'wood': {
    cn: '木 · Mù', en: 'Wood',
    def: 'The phase of springtime, growth, and outward expansion. Associated with Liver and Gallbladder.',
    defCn: '春之气，主生发——肝、胆、筋、目、青色、酸味、怒志所属。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Wood',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'fire': {
    cn: '火 · Huǒ', en: 'Fire',
    def: 'The phase of summer and peak yang. Associated with Heart, Small Intestine, Pericardium, and Triple Burner.',
    defCn: '夏之气，主炎上——心、小肠、脉、舌、赤色、苦味、喜志所属。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Fire',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'earth': {
    cn: '土 · Tǔ', en: 'Earth',
    def: 'The pivot phase of late summer, transformation, and nourishment. Associated with Spleen and Stomach.',
    defCn: '长夏之气，主化育——脾、胃、肉、口、黄色、甘味、思志所属。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Earth',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'metal': {
    cn: '金 · Jīn', en: 'Metal',
    def: 'The phase of autumn, gathering, and letting go. Associated with Lung and Large Intestine.',
    defCn: '秋之气，主肃降——肺、大肠、皮毛、鼻、白色、辛味、悲志所属。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Metal',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'water': {
    cn: '水 · Shuǐ', en: 'Water',
    def: 'The phase of winter, storage, and depth. Associated with Kidney and Bladder.',
    defCn: '冬之气，主闭藏——肾、膀胱、骨、耳、黑色、咸味、恐志所属。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Water',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'sheng-cycle': {
    cn: '相生 · Xiāng Shēng', en: 'Generation Cycle',
    def: 'The nourishing cycle: Wood→Fire→Earth→Metal→Water→Wood. Each phase generates the next.',
    defCn: '相生：木→火→土→金→水→木，循环不已之滋养关系。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Generating',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C%E7%9B%B8%E7%94%9F%E7%9B%B8%E5%85%8B'
  },
  'ke-cycle': {
    cn: '相克 · Xiāng Kè', en: 'Control Cycle',
    def: 'The restraining cycle: Wood↔Earth, Fire↔Metal, Earth↔Water, Metal↔Wood, Water↔Fire. Each phase controls another.',
    defCn: '相克：木克土、土克水、水克火、火克金、金克木——彼此相制以维平衡。',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Overcoming',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C%E7%9B%B8%E7%94%9F%E7%9B%B8%E5%85%8B'
  },

  // ================== ORGANS (12 main + relevant) ==================
  // For each organ in 简/繁/中 mode we link to the rhky.com (人卫慕课)
  // online TCM course on the meridians. Where a specific chapter card
  // ID is known, we deep-link to that chapter; otherwise we fall back
  // to the master course page (245888516) so the user can pick.
  // Adding more specific chapter IDs as the user supplies them.
  'liver-tcm': {
    cn: '肝 · Gān', en: 'Liver',
    def: 'In TCM the Liver governs the free flow of qi, stores blood, houses the hún (ethereal soul), and opens to the eyes.',
    defCn: '主疏泄、调畅气机；藏血；藏魂；开窍于目。木性脏。',
    url: 'https://en.wikipedia.org/wiki/Liver_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006030?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0+%E8%B6%B3%E5%8E%A5%E9%98%B4%E8%82%9D%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'
  },
  'heart-tcm': {
    cn: '心 · Xīn', en: 'Heart',
    def: 'The "emperor" organ; governs blood, houses the shén (spirit), and opens to the tongue.',
    defCn: '君主之官；主血脉，主神志；藏神；开窍于舌。火性脏。',
    url: 'https://en.wikipedia.org/wiki/Heart_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005800?courseId=245888516&name=%E7%AC%AC%E5%85%AD%E7%AB%A0+%E6%89%8B%E5%B0%91%E9%98%B4%E5%BF%83%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'
  },
  'spleen-tcm': {
    cn: '脾 · Pí', en: 'Spleen',
    def: 'Governs transformation of food into qi and blood; controls muscles, the four limbs, and houses yì (intent).',
    defCn: '主运化（化食生气血）、统血；主四肢肌肉；藏意。土性脏。',
    url: 'https://en.wikipedia.org/wiki/Spleen_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005774?courseId=245888516&name=%E7%AC%AC%E4%BA%94%E7%AB%A0+%E8%B6%B3%E5%A4%AA%E9%98%B4%E8%84%BE%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'lung-tcm': {
    cn: '肺 · Fèi', en: 'Lung',
    def: 'Governs qi and breathing, regulates the water passages, controls the skin, houses pò (corporeal soul).',
    defCn: '主气司呼吸；主皮毛；通调水道；藏魄。金性脏。',
    url: 'https://en.wikipedia.org/wiki/Lung_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005650?courseId=245888516&name=%E7%AC%AC%E4%BA%8C%E7%AB%A0+%E6%89%8B%E5%A4%AA%E9%98%B4%E8%82%BA%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  'kidney-tcm': {
    cn: '腎 / 肾 · Shèn', en: 'Kidney',
    def: 'Stores essence (jīng), governs water, fills the bones and marrow, houses zhì (will).',
    defCn: '藏先天之精；主水液；主骨生髓；藏志；开窍于耳。水性脏。',
    url: 'https://en.wikipedia.org/wiki/Kidney_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005916?courseId=245888516&name=%E7%AC%AC%E4%B9%9D%E7%AB%A0+%E8%B6%B3%E5%B0%91%E9%98%B4%E8%82%BE%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'gallbladder-tcm': {
    cn: '膽 / 胆 · Dǎn', en: 'Gallbladder',
    def: 'Stores and secretes bile; governs decisiveness; paired with the Liver in the Wood phase.',
    defCn: '主决断；藏胆汁；与肝相表里。木性腑。',
    url: 'https://en.wikipedia.org/wiki/Gallbladder_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005978?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%BA%8C%E7%AB%A0+%E8%B6%B3%E5%B0%91%E9%98%B3%E8%83%86%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'
  },
  'stomach-tcm': {
    cn: '胃 · Wèi', en: 'Stomach',
    def: 'The "sea of grain and water"; rots and ripens food. Paired with the Spleen in the Earth phase.',
    defCn: '主受纳腐熟水谷——「水谷之海」；与脾相表里。土性腑。',
    url: 'https://en.wikipedia.org/wiki/Stomach_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005718?courseId=245888516&name=%E7%AC%AC%E5%9B%9B%E7%AB%A0+%E8%B6%B3%E9%98%B3%E6%98%8E%E8%83%83%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'small-intestine-tcm': {
    cn: '小腸 / 小肠 · Xiǎo Cháng', en: 'Small Intestine',
    def: 'Separates the clear from the turbid in food. Paired with the Heart in the Fire phase.',
    defCn: '主受盛化物，分清别浊；与心相表里。火性腑。',
    url: 'https://en.wikipedia.org/wiki/Small_intestine_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005813?courseId=245888516&name=%E7%AC%AC%E4%B8%83%E7%AB%A0+%E6%89%8B%E5%A4%AA%E9%98%B3%E5%B0%8F%E8%82%A0%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'
  },
  'large-intestine-tcm': {
    cn: '大腸 / 大肠 · Dà Cháng', en: 'Large Intestine',
    def: 'Receives waste and conducts elimination. Paired with the Lung in the Metal phase.',
    defCn: '主传化糟粕，主津液；与肺相表里。金性腑。',
    url: 'https://en.wikipedia.org/wiki/Large_intestine_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005678?courseId=245888516&name=%E7%AC%AC%E4%B8%89%E7%AB%A0+%E6%89%8B%E9%98%B3%E6%98%8E%E5%A4%A7%E8%82%A0%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'bladder-tcm': {
    cn: '膀胱 · Páng Guāng', en: 'Bladder',
    def: 'Stores and excretes urine; its meridian runs the entire spine. Paired with the Kidney in the Water phase.',
    defCn: '主贮尿排尿；与肾相表里。其经循行贯背脊。水性腑。',
    url: 'https://en.wikipedia.org/wiki/Urinary_bladder_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005844?courseId=245888516&name=%E7%AC%AC%E5%85%AB%E7%AB%A0+%E8%B6%B3%E5%A4%AA%E9%98%B3%E8%86%80%E8%83%B1%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'
  },
  'pericardium-tcm': {
    cn: '心包 · Xīn Bāo', en: 'Pericardium',
    def: "The Heart's protector; first line of defense against external pathogens reaching the heart.",
    url: 'https://en.wikipedia.org/wiki/Pericardium_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005944?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E7%AB%A0+%E6%89%8B%E5%8E%A5%E9%98%B4%E5%BF%83%E5%8C%85%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'
  },
  'sanjiao': {
    cn: '三焦 · Sān Jiāo', en: 'Triple Burner',
    def: "Coordinates qi and fluid metabolism through the body's three cavities (chest, abdomen, pelvis).",
    url: 'https://en.wikipedia.org/wiki/San_Jiao',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005954?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%B8%80%E7%AB%A0+%E6%89%8B%E5%B0%91%E9%98%B3%E4%B8%89%E7%84%A6%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'
  },

  // ================== FIVE TONES ==================
  // All five tones share the 五音 entry on Baidu Baike, which has the
  // most authoritative coverage of the pentatonic system.
  'jue-tone': {
    cn: '角音 · Jué', en: 'Jué (E)',
    def: 'Wood-element musical tone; gentle, rising; used to soothe the Liver in 五音疗法 (five-tone therapy).',
    defCn: '角音（mi）——属木，入肝胆；舒展、生发。',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'zhi-tone': {
    cn: '徵音 · Zhǐ', en: 'Zhǐ (G)',
    def: 'Fire-element musical tone; warm, joyful; supports the Heart.',
    defCn: '徵音（sol）——属火，入心小肠；明亮、上扬。',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'gong-tone': {
    cn: '宮音 / 宫音 · Gōng', en: 'Gōng (C)',
    def: 'Earth-element musical tone; centering, grounding; supports the Spleen.',
    defCn: '宫音（do）——属土，入脾胃；浑厚、稳定。',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'shang-tone': {
    cn: '商音 · Shāng', en: 'Shāng (D)',
    def: 'Metal-element musical tone; crisp, clear; supports the Lung.',
    defCn: '商音（re）——属金，入肺大肠；清亮、收敛。',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'yu-tone': {
    cn: '羽音 · Yǔ', en: 'Yǔ (A)',
    def: 'Water-element musical tone; deep, anchoring; supports the Kidney.',
    defCn: '羽音（la）——属水，入肾膀胱；深沉、内藏。',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },

  // ================== FIVE SPIRITS (五神) ==================
  'hun': {
    cn: '魂 · Hún', en: 'Ethereal Soul',
    def: 'The "yang soul" housed in the Liver; governs imagination, dreams, plans, and life-vision.',
    defCn: '魂——肝所藏；夜寐时游行，主谋虑。',
    url: 'https://en.wikipedia.org/wiki/Hun_and_po',
    urlCn: 'https://baike.baidu.com/item/%E4%B8%89%E9%AD%82%E4%B8%83%E9%AD%84'
  },
  'po': {
    cn: '魄 · Pò', en: 'Corporeal Soul',
    def: 'The "yin soul" housed in the Lung; governs reflexes, sensations, and bodily instinct.',
    defCn: '魄——肺所藏；主本能感觉与反应。',
    url: 'https://en.wikipedia.org/wiki/Hun_and_po',
    urlCn: 'https://baike.baidu.com/item/%E4%B8%89%E9%AD%82%E4%B8%83%E9%AD%84'
  },
  'yi': {
    cn: '意 · Yì', en: 'Intent',
    def: 'The aspect of mind housed in the Spleen; thought, focused attention, intention.',
    defCn: '意——脾所藏；主思忆与记忆。',
    url: 'https://en.wikipedia.org/wiki/Spleen_(Chinese_medicine)',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E5%BF%97'
  },
  'zhi': {
    cn: '志 · Zhì', en: 'Will',
    def: 'The aspect of mind housed in the Kidney; willpower, memory, determination.',
    defCn: '志——肾所藏；主意志与定力。',
    url: 'https://en.wikipedia.org/wiki/Kidney_(Chinese_medicine)',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E5%BF%97'
  },

  // ================== HERBS ==================
  'huang-qi': {
    cn: '黃芪 / 黄芪 · Huáng Qí', en: 'Astragalus root',
    def: 'A primary qi tonic; strengthens the Spleen and Lung, raises sinking qi, secures the exterior.',
    defCn: '味甘，性微温；入脾、肺经。补气升阳、固表止汗、利水消肿、托毒生肌。气虚要药。',
    url: 'https://en.wikipedia.org/wiki/Astragalus_propinquus'
  },
  'dang-gui': {
    cn: '當歸 / 当归 · Dāng Guī', en: 'Angelica sinensis root',
    def: 'A premier blood tonic; nourishes the Liver, invigorates blood circulation, regulates menstruation.',
    defCn: '味甘辛，性温；入肝、心、脾经。补血活血、调经止痛、润肠通便。妇科血药之首。',
    url: 'https://en.wikipedia.org/wiki/Angelica_sinensis'
  },
  'gou-qi': {
    cn: '枸杞 · Gǒu Qǐ', en: 'Goji berry / Wolfberry',
    def: 'Sweet, neutral; tonifies Liver and Kidney essence, brightens the eyes, nourishes blood.',
    defCn: '味甘，性平；入肝、肾经。滋补肝肾、益精明目。日常滋养之品。',
    url: 'https://en.wikipedia.org/wiki/Goji'
  },
  'chai-hu': {
    cn: '柴胡 · Chái Hú', en: 'Bupleurum root',
    def: "A premier herb for resolving Liver-qi stagnation and harmonising the Shaoyang aspect.",
    url: 'https://en.wikipedia.org/wiki/Bupleurum_chinense'
  },
  'sheng-jiang': {
    cn: '生薑 / 生姜 · Shēng Jiāng', en: 'Fresh ginger',
    def: 'Warms the Stomach, releases the exterior, transforms cold mucus, alleviates nausea.',
    defCn: '味辛，性温；入肺、脾、胃经。发汗解表、温中止呕、温肺化痰。生姜也。',
    url: 'https://en.wikipedia.org/wiki/Ginger'
  },
  'da-zao': {
    cn: '大棗 / 大枣 · Dà Zǎo', en: 'Chinese date / Jujube',
    def: 'Sweet, warm; tonifies Spleen qi, nourishes blood, calms the spirit.',
    defCn: '味甘，性温；入脾、胃经。补中益气、养血安神、缓和药性。',
    url: 'https://en.wikipedia.org/wiki/Jujube'
  },
  'fu-ling': {
    cn: '茯苓 · Fú Líng', en: 'Poria mushroom',
    def: 'Sweet, bland, neutral; drains dampness, strengthens the Spleen, calms the spirit.',
    defCn: '味甘淡，性平；入心、脾、肾经。利水渗湿、健脾安神。茯苓也。',
    url: 'https://en.wikipedia.org/wiki/Wolfiporia_extensa'
  },
  'qian-shi': {
    cn: '芡实 · Qiàn Shí', en: 'Euryale seed (Fox-nut)',
    def: 'Sweet, astringent, neutral; tonifies the Spleen and Kidney, stops diarrhea, secures essence (jīng), restrains turbid leucorrhoea.',
    defCn: '味甘涩，性平；入脾、肾经。健脾止泻、益肾固精、除湿止带。',
    url: 'https://en.wikipedia.org/wiki/Euryale_ferox'
  },
  'lian-zi': {
    cn: '莲子 · Lián Zǐ', en: 'Lotus seed',
    def: 'Sweet, astringent, neutral; tonifies Spleen and Kidney, calms the Heart spirit, restrains seminal/leucorrheal discharge. The plumule (莲子心) is bitter and clears Heart fire.',
    defCn: '味甘涩，性平；入脾、肾、心经。补脾止泻、益肾涩精、养心安神。',
    url: 'https://en.wikipedia.org/wiki/Nelumbo_nucifera'
  },
  'yi-yi-ren': {
    cn: '薏苡仁 · Yì Yǐ Rén', en: 'Job\'s tears / Coix seed',
    def: 'Sweet, bland, slightly cool; drains dampness, strengthens Spleen, expels pus, eases joint pain (痹). Often shortened to 薏仁 / 薏米.',
    defCn: '味甘淡，性微寒；入脾、胃、肺经。利水渗湿、健脾止泻、除痹排脓。',
    url: 'https://en.wikipedia.org/wiki/Coix_lacryma-jobi'
  },
  'fu-zi': {
    cn: '附子 · Fù Zǐ', en: 'Aconite (prepared)',
    def: 'Acrid, very hot, TOXIC raw — must be processed (paozhi) and decocted long. Restores devastated yang, warms the Kidneys, expels cold from the channels. Cardinal herb of 四逆汤.',
    defCn: '味辛甘，性大热——生用有毒，须炮制久煎。回阳救逆、补火助阳、散寒止痛。四逆汤主药。',
    url: 'https://en.wikipedia.org/wiki/Aconitum_carmichaelii'
  },
  'gan-jiang': {
    cn: '干姜 · Gān Jiāng', en: 'Dried ginger',
    def: 'Acrid, hot; warms the middle burner, restores yang, warms the Lung and transforms phlegm. Distinct from fresh ginger 生姜 — drier and more deeply warming.',
    defCn: '味辛，性热；入脾、胃、肺、心、肾经。温中散寒、回阳通脉、温肺化饮。与生姜异。',
    url: 'https://en.wikipedia.org/wiki/Ginger'
  },
  'chuan-xiong': {
    cn: '川芎 · Chuān Xiōng', en: 'Szechuan lovage rhizome',
    def: 'Acrid, warm; the chief blood-mover that also moves qi, expels wind, stops pain — particularly headaches. Pairs with 当归 to circulate while nourishing.',
    defCn: '味辛，性温；入肝、胆、心包经。活血行气、祛风止痛——尤治头痛。',
    url: 'https://en.wikipedia.org/wiki/Ligusticum_striatum'
  },
  'dang-shen': {
    cn: '党参 · Dǎng Shēn', en: 'Codonopsis root',
    def: 'Sweet, neutral; tonifies the middle-burner qi, generates fluids, supports Lung qi. Often substituted for the more expensive 人参 in everyday formulas.',
    defCn: '味甘，性平；入脾、肺经。补中益气、生津养血。人参之平价替代。',
    url: 'https://en.wikipedia.org/wiki/Codonopsis_pilosula'
  },
  'ren-shen': {
    cn: '人參 / 人参 · Rén Shēn', en: 'Ginseng',
    def: 'A powerful tonic for original qi (yuán qì); supports Lung and Spleen, generates fluids, calms the spirit.',
    defCn: '味甘微苦，性微温；入脾、肺、心经。大补元气、复脉固脱、补脾益肺、生津安神。补气之圣品。',
    url: 'https://en.wikipedia.org/wiki/Panax_ginseng'
  },
  'gan-cao': {
    cn: '甘草 · Gān Cǎo', en: 'Licorice root',
    def: 'Harmonises herbs in formulas; tonifies Spleen qi, moistens the Lungs, resolves toxicity.',
    defCn: '味甘，性平；入心、肺、脾、胃经。补脾益气、清热解毒、祛痰止咳、调和诸药。',
    url: 'https://en.wikipedia.org/wiki/Glycyrrhiza_uralensis'
  },
  'huang-qin': {
    cn: '黃芩 / 黄芩 · Huáng Qín', en: 'Scutellaria root',
    def: 'Bitter, cold; clears heat and damp-heat, particularly in the upper burner.',
    defCn: '味苦，性寒；入肺、胆、脾、大肠、小肠经。清热燥湿、泻火解毒、止血安胎。',
    url: 'https://en.wikipedia.org/wiki/Scutellaria_baicalensis'
  },
  'bai-shao': {
    cn: '白芍 · Bái Sháo', en: 'White Peony root',
    def: 'Sour, bitter; nourishes Liver blood, calms the Liver, softens cramping.',
    defCn: '味苦酸，性微寒；入肝、脾经。养血敛阴、柔肝止痛、平抑肝阳。',
    url: 'https://en.wikipedia.org/wiki/Paeonia_lactiflora'
  },
  'bai-he': {
    cn: '百合 · Bǎi Hé', en: 'Lily bulb',
    def: 'Sweet, slightly cold; moistens the Lung, calms the spirit, gently nourishes yin.',
    defCn: '味甘，性微寒；入心、肺经。养阴润肺、清心安神。',
    url: 'https://en.wikipedia.org/wiki/Lilium_brownii'
  },
  'xing-ren': {
    cn: '杏仁 · Xìng Rén', en: 'Bitter apricot kernel',
    def: 'Bitter; descends and disperses Lung qi, stops cough, moistens the intestines.',
    defCn: '味苦，性微温；入肺、大肠经。降气止咳平喘、润肠通便。',
    url: 'https://en.wikipedia.org/wiki/Apricot_kernel'
  },
  'mai-dong': {
    cn: '麥冬 / 麦冬 · Mài Dōng', en: 'Ophiopogon root',
    def: 'Sweet, slightly cold; moistens Lung yin, generates fluids, calms the heart.',
    defCn: '味甘微苦，性微寒；入心、肺、胃经。养阴生津、润肺清心。',
    url: 'https://en.wikipedia.org/wiki/Ophiopogon_japonicus'
  },
  'huo-ma-ren': {
    cn: '火麻仁 · Huǒ Má Rén', en: 'Hemp seed',
    def: 'Sweet, neutral; moistens the intestines, gently relieves dryness-type constipation.',
    defCn: '味甘，性平；入脾、胃、大肠经。润肠通便。年老体弱、津血亏虚者宜。',
    url: 'https://en.wikipedia.org/wiki/Cannabis_seed'
  },
  'jue-ming-zi': {
    cn: '决明子 · Jué Míng Zǐ', en: 'Cassia seed',
    def: 'Bitter, sweet; clears Liver heat, brightens the eyes, moistens the intestines.',
    defCn: '味苦甘咸，性微寒；入肝、大肠经。清肝明目、润肠通便。',
    url: 'https://en.wikipedia.org/wiki/Senna_obtusifolia'
  },
  'xiao-mi': {
    cn: '小米 · Xiǎo Mǐ', en: 'Foxtail millet',
    def: 'Sweet, salty, slightly cool; nourishes the Spleen-Stomach, generates fluids.',
    defCn: '味甘咸，性凉；入脾、胃、肾经。健脾和胃、补益虚损、和中除热。',
    url: 'https://en.wikipedia.org/wiki/Foxtail_millet'
  },
  'bai-zhu': {
    cn: '白术 · Bái Zhú', en: 'Atractylodes rhizome',
    def: 'Bitter, sweet, warm; tonifies Spleen qi, dries dampness, stops sweating.',
    defCn: '味甘苦，性温；入脾、胃经。健脾益气、燥湿利水、止汗安胎。',
    url: 'https://en.wikipedia.org/wiki/Atractylodes_macrocephala'
  },
  'shan-yao': {
    cn: '山藥 / 山药 · Shān Yào', en: 'Chinese yam',
    def: 'Sweet, neutral; tonifies Spleen, Lung, and Kidney; nourishes yin without dampness.',
    defCn: '味甘，性平；入脾、肺、肾经。补脾养胃、生津益肺、补肾涩精。山药也。',
    url: 'https://en.wikipedia.org/wiki/Dioscorea_polystachya'
  },
  'dan-shen': {
    cn: '丹參 / 丹参 · Dān Shēn', en: 'Salvia root',
    def: 'Bitter, slightly cold; invigorates blood, removes stasis, calms the spirit.',
    defCn: '味苦，性微寒；入心、肝经。活血祛瘀、通经止痛、清心除烦。',
    url: 'https://en.wikipedia.org/wiki/Salvia_miltiorrhiza'
  },
  'suan-zao-ren': {
    cn: '酸棗仁 / 酸枣仁 · Suān Zǎo Rén', en: 'Sour jujube seed',
    def: 'Sweet, sour, neutral; calms the spirit, treats insomnia and night sweats.',
    defCn: '味甘酸，性平；入心、肝、胆经。养心安神、敛汗生津。失眠要药。',
    url: 'https://en.wikipedia.org/wiki/Ziziphus_jujuba'
  },
  'bai-zi-ren': {
    cn: '柏子仁 · Bǎi Zǐ Rén', en: 'Biota seed',
    def: 'Sweet, neutral; calms the spirit, nourishes the Heart, moistens the intestines.',
    defCn: '味甘，性平；入心、肾、大肠经。养心安神、润肠通便。',
    url: 'https://en.wikipedia.org/wiki/Platycladus'
  },
  'ze-xie': {
    cn: '澤瀉 / 泽泻 · Zé Xiè', en: 'Alisma rhizome',
    def: 'Sweet, bland, cold; promotes urination, drains damp-heat from the lower burner.',
    defCn: '味甘淡，性寒；入肾、膀胱经。利水渗湿、泄热。',
    url: 'https://en.wikipedia.org/wiki/Alisma'
  },
  'jin-qian-cao': {
    cn: '金錢草 / 金钱草 · Jīn Qián Cǎo', en: 'Lysimachia',
    def: 'Sweet, salty, cool; clears damp-heat, treats stones in the urinary tract.',
    defCn: '味甘咸，性微寒；入肝、胆、肾、膀胱经。利湿退黄、利尿通淋、解毒消肿。结石要药。',
    url: 'https://en.wikipedia.org/wiki/Lysimachia_christinae'
  },
  'che-qian-zi': {
    cn: '車前子 / 车前子 · Chē Qián Zǐ', en: 'Plantago seed',
    def: 'Sweet, cold; promotes urination, clears heat from the eyes and lungs.',
    defCn: '味甘，性微寒；入肝、肾、肺、小肠经。清热利尿通淋、渗湿止泻、明目、祛痰。',
    url: 'https://en.wikipedia.org/wiki/Plantago_asiatica'
  },
  'shu-di-huang': {
    cn: '熟地黃 / 熟地黄 · Shú Dì Huáng', en: 'Prepared rehmannia',
    def: 'Sweet, slightly warm; nourishes Liver and Kidney yin and blood; rich and cloying.',
    defCn: '味甘，性微温；入肝、肾经。补血养阴、填精益髓。养血滋阴之要药。',
    url: 'https://en.wikipedia.org/wiki/Rehmannia_glutinosa'
  },
  'du-zhong': {
    cn: '杜仲 · Dù Zhòng', en: 'Eucommia bark',
    def: 'Sweet, slightly warm; tonifies Liver and Kidney yang; strengthens the lower back and knees.',
    defCn: '味甘，性温；入肝、肾经。补肝肾、强筋骨、安胎。',
    url: 'https://en.wikipedia.org/wiki/Eucommia_ulmoides'
  },
  'hei-zhi-ma': {
    cn: '黑芝麻 · Hēi Zhī Má', en: 'Black sesame',
    def: 'Sweet, neutral; tonifies Liver and Kidney; nourishes blood and essence; moistens the intestines.',
    defCn: '味甘，性平；入肝、肾、大肠经。补肝肾、益精血、润肠燥。',
    url: 'https://en.wikipedia.org/wiki/Sesame'
  },
  'yuan-zhi': {
    cn: '遠志 / 远志 · Yuǎn Zhì', en: 'Polygala root',
    def: 'Bitter, pungent, slightly warm; calms the spirit, opens the heart-mind, expels phlegm.',
    defCn: '味苦辛，性微温；入心、肾、肺经。安神益智、祛痰开窍、消散痈肿。',
    url: 'https://en.wikipedia.org/wiki/Polygala_tenuifolia'
  },
  'he-huan-hua': {
    cn: '合歡花 / 合欢花 · Hé Huān Huā', en: 'Albizia flower',
    def: 'Sweet, neutral; calms the spirit, relieves emotional stagnation, lifts depression.',
    defCn: '味甘，性平；入心、肝经。解郁安神、理气和胃。',
    url: 'https://en.wikipedia.org/wiki/Albizia_julibrissin'
  },
  'chen-pi': {
    cn: '陳皮 / 陈皮 · Chén Pí', en: 'Aged tangerine peel',
    def: 'Pungent, bitter, warm; regulates qi, harmonises the Stomach, transforms damp phlegm. The longer aged the better — "an ounce of aged peel is worth an ounce of gold." Classic pairings: + 半夏 (Èr Chén Tāng core for damp-phlegm cough), + 茯苓 (Spleen damp / loose stool), + 生姜 (cold-stomach nausea, wind-cold cough), + 山楂 (meat-stagnation indigestion).',
    defCn: '味辛苦，性温；入脾、肺经。理气健脾、燥湿化痰。"一两陈皮一两金，半年陈皮胜黄金"——愈陈愈良。经典配伍：① + 半夏 → 二陈汤（常加茯苓、甘草），治痰湿停滞、咳嗽痰多；② + 茯苓 → 健脾渗湿，治脾虚湿盛之腹胀便溏；③ + 生姜 → 温胃散寒、止呕止咳，治胃寒呕吐或风寒咳嗽；④ + 山楂 → 消食导滞，治肉食积滞之消化不良。',
    url: 'https://en.wikipedia.org/wiki/Citrus_reticulata',
    urlCn: 'https://baike.baidu.com/item/陈皮'
  },

  // ================== TONGUE & DIAGNOSIS ==================
  'tongue-diagnosis': {
    cn: '舌診 / 舌诊 · Shé Zhěn', en: 'Tongue Diagnosis',
    def: 'A core TCM diagnostic method evaluating tongue body color, shape, coating, and moisture.',
    defCn: '舌诊——通过观察舌质、舌苔、舌形以辨脏腑虚实寒热。中医四诊之一。',
    page: 'tongue.html'
  },
  'four-examinations': {
    cn: '四診 / 四诊 · Sì Zhěn', en: 'Four Examinations',
    def: 'The four diagnostic methods of TCM: 望 (looking), 聞 (listening/smelling), 問 (asking), 切 (pulse-taking).',
    defCn: '四诊——望、闻、问、切，中医辨证之四大手段。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Diagnostic_principles'
  },

  // ================== TCM PATTERNS ==================
  'qi-deficiency': {
    cn: '氣虛 / 气虚 · Qì Xū', en: 'Qi Deficiency',
    def: 'Fatigue, shortness of breath, weak voice, pale tongue; the root weakness pattern in TCM.',
    defCn: '气虚——气之不足，见少气懒言、神疲乏力、自汗、易感冒，舌淡苔白、脉虚弱。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'yang-deficiency': {
    cn: '陽虛 / 阳虚 · Yáng Xū', en: 'Yang Deficiency',
    def: 'Coldness, fatigue, low libido, pale-and-puffy tongue; insufficient warming, activating energy.',
    defCn: '阳虚——阳气不足，见畏寒肢冷、面色苍白、小便清长、舌淡胖、脉沉迟。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'yin-deficiency': {
    cn: '陰虛 / 阴虚 · Yīn Xū', en: 'Yin Deficiency',
    def: 'Heat sensations, night sweats, dry mouth, red tongue with little coating; insufficient cooling, moistening substance.',
    defCn: '阴虚——阴液亏虚，见午后潮热、五心烦热、盗汗、口干咽燥，舌红少苔、脉细数。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'blood-deficiency': {
    cn: '血虛 / 血虚 · Xuè Xū', en: 'Blood Deficiency',
    def: 'Pale complexion, dizziness, brittle nails, scant menstruation, pale tongue.',
    defCn: '血虚——血液不足，见面色萎黄、唇甲淡白、头晕眼花、心悸失眠，舌淡、脉细。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'damp-heat': {
    cn: '濕熱 / 湿热 · Shī Rè', en: 'Damp-Heat',
    def: 'Heaviness with heat signs; thick yellow tongue coating, foul-smelling discharges, irritability.',
    defCn: '湿热——湿与热相合，见身热不扬、口苦黏腻、便溏色黄、苔黄腻、脉濡数。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'qi-stagnation': {
    cn: '氣滯 / 气滞 · Qì Zhì', en: 'Qi Stagnation',
    def: 'Distension, irritability, irregular cycles; qi flow is blocked. Often a Liver-qi pattern.',
    defCn: '气滞——气机郁结不畅，见胀闷疼痛、随情志变化，舌淡、脉弦。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'blood-stasis': {
    cn: '血瘀 · Xuè Yū', en: 'Blood Stasis',
    def: 'Fixed, sharp pains; purple tongue or sublingual veins; blood circulation is impeded.',
    defCn: '血瘀——血液运行不畅或离经留滞，见刺痛固定、舌紫暗或瘀斑、脉涩。',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },

  // ================== TCMM RELATED ==================
  'tcmm': {
    cn: 'TCMM 知识图谱', en: 'TCMM Knowledge Graph',
    def: 'A research-grade TCM knowledge graph integrating six databases (CPMCP, TCMBANK, SymMap, TCMID, PharMeBINet, PrimeKG).',
    url: 'https://github.com/AI-HPC-Research-Team/TCM_knowledge_graph'
  },

  // ================== ACUPUNCTURE & MERIDIAN KNOWLEDGE ==================
  'acupuncture': {
    cn: '针灸 · Zhēn Jiǔ', en: 'Acupuncture & Moxibustion',
    def: 'The classical TCM modality of stimulating specific points on the body, using fine needles (针 zhēn) or burning mugwort (灸 jiǔ), to regulate qi, blood, and organ function.',
    defCn: '针灸——以毫针刺入或艾火灸熨人体经穴，调和气血、扶正祛邪之疗法。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture',
    page: 'acupuncture.html'
  },
  'guijing': {
    cn: '归经 · Guī Jīng', en: 'Channel Attribution',
    def: 'The principle that each medicinal substance (and each acupoint) has an affinity for specific meridians and so directly affects those organ systems.',
    defCn: '归经——药物或穴位所偏入与作用之经脉。',
    url: 'https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)'
  },
  'jinglu': {
    cn: '经络 · Jīng Luò', en: 'Channels & Collaterals',
    def: 'The complete meridian system: the 12 main channels (正经), the 8 extraordinary vessels (奇经八脉), and the smaller branching collaterals (络脉) and their offshoots.',
    defCn: '经络——内联脏腑、外络肢节，贯通上下表里之气血通路网络。',
    url: 'https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)',
    page: 'acupuncture.html'
  },
  'twelve-meridians': {
    cn: '十二正经 · Shí Èr Zhèng Jīng', en: 'Twelve Main Meridians',
    def: 'The twelve principal channels — six yin (Lung, Pericardium, Heart, Spleen, Liver, Kidney) and six yang (Large Intestine, Triple Burner, Small Intestine, Stomach, Gallbladder, Bladder).',
    defCn: '十二经脉（十二正经）——手足三阴三阳十二条主干经脉，互为表里，循行有序。',
    url: 'https://yibian.hopto.org/'
  },
  'eight-extraordinary': {
    cn: '奇经八脉 · Qí Jīng Bā Mài', en: 'Eight Extraordinary Vessels',
    def: 'Eight non-main vessels — Du, Ren, Chong, Dai, Yin/Yang Wei, Yin/Yang Qiao — that act as reservoirs and regulators for the twelve main meridians.',
    defCn: '奇经八脉——督、任、冲、带、阴维、阳维、阴跷、阳跷八条特殊经脉，调节十二正经气血盈虚。',
    url: 'https://en.wikipedia.org/wiki/Eight_Extraordinary_Channels'
  },
  'du-mai': {
    cn: '督脉 · Dū Mài', en: 'Governor Vessel',
    def: 'The "Sea of Yang Channels" running up the back midline from the perineum to the upper lip; governs all yang qi in the body.',
    defCn: '督脉——阳脉之海。起于会阴，沿背正中上行至唇上龈交。总督一身阳气，共 29 穴。',
    url: 'https://en.wikipedia.org/wiki/Governing_vessel',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006050?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E5%9B%9B%E7%AB%A0+%E7%9D%A3%E8%84%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'ren-mai': {
    cn: '任脉 · Rèn Mài', en: 'Conception Vessel',
    def: 'The "Sea of Yin Channels" running up the front midline from the perineum to the lower lip; governs all yin and is central to gynecology and fertility.',
    defCn: '任脉——阴脉之海。起于会阴，沿腹胸正中上达承浆。任主胞胎，为妇科与孕育之关键，共 24 穴。',
    url: 'https://en.wikipedia.org/wiki/Conception_vessel',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006086?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%BA%94%E7%AB%A0+%E4%BB%BB%E8%84%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },

  // Five-Shu point system
  'wu-shu-points': {
    cn: '五输穴 · Wǔ Shū Xué', en: 'Five-Shu Points',
    def: 'Five points on each of the 12 main channels, distal to the elbow/knee, classically described as the river-flow of qi: 井 jǐng (Well, source), 荥 xíng (Spring), 输 shū (Stream), 经 jīng (River), 合 hé (Sea).',
    defCn: '十二正经各有五穴，皆位肘膝以下，喻气血如流泉：井（出）、荥（溜）、输（注）、经（行）、合（入）——由远端至近端，由浅入深。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'jing-well': {
    cn: '井穴 · Jǐng Xué', en: 'Well Point',
    def: 'Where qi "issues forth" — the most distal point on each channel (fingertip/toe). Used for emergency revival, mental confusion, and 心下满 (epigastric fullness).',
    defCn: '「所出为井」——气之初出处，位手足末端（指尖／趾尖）。古用于急救（神昏、中风初起）与「心下满」（胃脘胀闷、胸中窒塞）。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'ying-spring': {
    cn: '荥穴 · Xíng Xué', en: 'Spring Point',
    def: 'Where qi "glides" — the second point. Classically: "荥主身热 · Xíng zhǔ shēn rè" — chiefly used for febrile diseases and heat patterns.',
    defCn: '「所溜为荥」——气之初行处，第二穴。古传：「荥主身热」——主治热病、身热诸证。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'shu-stream': {
    cn: '输穴 · Shū Xué', en: 'Stream Point',
    def: 'Where qi "pours" — the third point. Classically: "输主体重节痛" — heaviness and joint pain. On yin meridians, the Stream point doubles as the Source (原) point.',
    defCn: '「所注为输」——气之灌注处，第三穴。古用：「输主体重节痛」——身重、关节疼痛、湿邪诸证。阴经则「输」即「原」，兼为原穴。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'jing-river': {
    cn: '经穴 · Jīng Xué', en: 'River Point',
    def: 'Where qi "moves through" — the fourth point. Classically: "经主喘咳寒热" — wheezing, cough, alternating chills and fever.',
    defCn: '「所行为经」——气之畅行处，第四穴。古用：「经主喘咳寒热」——喘息、咳嗽、寒热往来。此层与卫气相接，主半表半里之证。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'he-sea': {
    cn: '合穴 · Hé Xué', en: 'Sea / Uniting Point',
    def: 'Where qi "enters" the deeper body — the fifth point, near elbow or knee. Classically: "合主逆气而泄" — counterflow qi and diarrhea; preferred for 六腑 (yang-organ) disorders.',
    defCn: '「所入为合」——气之归汇处，第五穴，位近肘膝。古用：「合主逆气而泄」——气逆与腹泄；并为六腑诸疾首选（《灵枢》「合治六腑」）。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },

  // Special point categories
  'yuan-source': {
    cn: '原穴 · Yuán Xué', en: 'Source Point',
    def: 'Where the original qi (元气) of the organ surfaces — twelve points, one per channel. Used to diagnose and treat the deepest disorders of the parent organ. (《灵枢》: "五脏有疾，当取之十二原.")',
    defCn: '脏腑元气所注之处——十二穴，每经一穴。诊察与治疗本脏腑深层病变所必取。《灵枢》：「五脏有疾，当取之十二原。」',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'luo-connecting': {
    cn: '络穴 · Luò Xué', en: 'Connecting / Network Point',
    def: 'Fifteen points that bridge a yin-yang meridian pair. Used in 原络配穴 — pairing the source point of the diseased channel with the connecting point of its paired channel for synergy.',
    defCn: '沟通表里两经之要穴，共十五穴。常用「原络配穴」之法：本经取原穴，表里经取络穴，相配以治。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'mu-front': {
    cn: '募穴 · Mù Xué', en: 'Front-Mu / Alarm Point',
    def: 'Twelve points on the chest and abdomen where each organ\'s qi gathers. Tender on palpation when the corresponding organ is in distress; classically paired with the back-shu point.',
    defCn: '分布于胸腹之间，为脏腑之气所聚之处——十二穴。本脏腑有疾，按之多见压痛或结节。古法多与背俞穴相配（俞募配穴），前后并取。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'shu-back': {
    cn: '背俞穴 · Bèi Shù Xué', en: 'Back-Shu / Transport Point',
    def: 'Twelve paired points on the inner Bladder line of the upper-back, each corresponding to a specific organ. Pairs with the front-Mu point for diagnosis and treatment of internal disorders.',
    defCn: '位于背部足太阳膀胱经第一侧线，十二穴，各应一脏腑。与对应募穴相配（俞募配穴），用于内脏诸病之诊治。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'xi-cleft': {
    cn: '郄穴 · Xī Xué', en: 'Cleft / Accumulation Point',
    def: 'Sixteen "deep gathering" points where qi and blood concentrate. Especially used for acute and painful conditions of the related channel.',
    defCn: '气血深聚之所，共十六穴。本经急性疼痛、出血与急症皆首选郄穴。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'xia-he-lower': {
    cn: '下合穴 · Xià Hé Xué', en: 'Lower-Uniting Points',
    def: 'Six points below the knee where each yang-organ\'s qi "comes to ground." Per 《灵枢》: "合治六腑" — these are the points of choice for disorders of the six fu organs.',
    defCn: '六腑之气下合于下肢之六穴。《灵枢》：「合治六腑」——胃、肠、胆、膀胱诸腑之疾，皆当首取下合穴。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'eight-meeting': {
    cn: '八会穴 · Bā Huì Xué', en: 'Eight Influential Points',
    def: 'Eight points where the qi of a class of substance gathers: zang (CV12 中脘), fu (LV13 章门 — note: actually 脏会), qi (CV17 膻中), blood (BL17 膈俞), tendon (GB34 阳陵泉), vessel (LU9 太渊), bone (BL11 大杼), marrow (GB39 悬钟).',
    defCn: '八穴各为一类气血津液之所会：脏会（章门 LV13）、腑会（中脘 CV12）、气会（膻中 CV17）、血会（膈俞 BL17）、筋会（阳陵泉 GB34）、脉会（太渊 LU9）、骨会（大杼 BL11）、髓会（悬钟 GB39）。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'eight-confluence': {
    cn: '八脉交会穴 · Bā Mài Jiāo Huì Xué', en: 'Eight Confluence Points',
    def: 'Eight points on the limbs where the eight extraordinary vessels meet the main channels: SP4-PC6, GB41-TE5, SI3-BL62, LU7-KI6 — used in classical pairs.',
    defCn: '奇经八脉与十二正经交会之处。临床多用古传配穴：公孙-内关、临泣-外关、后溪-申脉、列缺-照海。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'eight-totals': {
    cn: '八总穴 · Bā Zǒng Xué', en: 'Eight Master Points',
    def: 'A clinical mnemonic for the most-used points by region: ST36 for abdomen, BL40 for low back, LU7 for head/neck, LI4 for face/mouth, PC6 for chest/heart, SP6 for lower abdomen, ashi for pain, GV26 for emergencies.',
    defCn: '按部位归类之临床要穴：肚腹三里留（ST36）、腰背委中求（BL40）、头项寻列缺（LU7）、面口合谷收（LI4）、心胸取内关（PC6）、小腹三阴交（SP6）、酸痛阿是穴、急救刺水沟（GV26）。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'ashi-points': {
    cn: '阿是穴 · Ā Shì Xué', en: 'Ashi Points',
    def: 'Tender or "ouch" points — sites of palpable tenderness that are not on a numbered meridian. Used for local pain treatment.',
    defCn: '又称「天应穴」「不定穴」，出自《备急千金要方》。病理状态下身体在体表浮现之敏感反应点（压痛点、皮下结节、条索状物或凹陷）。位不固定，须以「以痛为腧」「按之快然」之标准寻取，绝非随意乱扎。',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },

  // Specific high-frequency points (most used in our acupoint suggestions)
  'st36': {
    cn: '足三里 · Zú Sān Lǐ', en: 'Stomach 36',
    def: 'Master point for tonifying qi and strengthening the Spleen-Stomach. Located four fingers below the kneecap, one finger lateral to the shinbone. Classical line: "肚腹三里留" — for any abdominal disorder, look to ST36.',
    defCn: '胃经合穴。膝盖外侧凹陷向下四横指，胫骨外缘一横指处。「肚腹三里留」——凡胃痛、腹胀、消化不良或身体虚弱皆主之；扶正培元、通经活络之要穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6961',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005760?courseId=245888516&name=%E8%B6%B3%E4%B8%89%E9%87%8C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'cv4': {
    cn: '关元 · Guān Yuán', en: 'Conception Vessel 4',
    def: '"Gate of Origin." 3 cùn below the navel on the midline. The most foundational point for tonifying yang and original qi. Classical indirect-moxa point for 阳虚 (yang deficiency) and cold patterns.',
    defCn: '任脉第 4 穴；" 3 cùn 脐下 on the midline；Classical indirect-moxa point for 阳虚 (yang deficiency) and cold patterns。',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006092?courseId=245888516&name=%E5%85%B3%E5%85%83&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv6': {
    cn: '气海 · Qì Hǎi', en: 'Conception Vessel 6',
    def: '"Sea of Qi." 1.5 cùn below the navel. Replenishes qi throughout the body; classical point for fatigue and qi deficiency.',
    defCn: '任脉第 6 穴；合穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006095?courseId=245888516&name=%E6%B0%94%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv8': {
    cn: '神阙 · Shén Què', en: 'Conception Vessel 8',
    def: 'The center of the navel. Salt-and-ginger moxibustion on this point warms interior cold and lifts collapsed yang. Never needled.',
    defCn: '任脉第 8 穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006097?courseId=245888516&name=%E7%A5%9E%E9%98%99&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'gv4': {
    cn: '命门 · Mìng Mén', en: 'Governor Vessel 4',
    def: '"Gate of Life." Between L2 and L3 spinous processes (level with the navel). Kindles kidney yang and warms the body core; indispensable for chronic cold-deficiency back pain.',
    defCn: '督脉第 4 穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006054?courseId=245888516&name=%E5%91%BD%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'sp6': {
    cn: '三阴交 · Sān Yīn Jiāo', en: 'Spleen 6',
    def: 'Crossing point of the three foot-yin meridians (Spleen, Liver, Kidney). 3 cùn above the inner ankle, behind the tibia. Powerful for nourishing yin, blood, and the lower abdomen. (Avoid in pregnancy.)',
    defCn: '足三阴（脾、肝、肾）交会之要穴。内踝尖上三寸，胫骨内侧缘后方。妇科万用之穴；男科、失眠、高血压亦取——滋补肝肾、调补脾土。妊娠忌针。',
    url: 'https://yibian.hopto.org/shu/?sid=6962',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005780?courseId=245888516&name=%E4%B8%89%E9%98%B4%E4%BA%A4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'sp9': {
    cn: '阴陵泉 · Yīn Líng Quán', en: 'Spleen 9',
    def: 'Master point for resolving dampness — He-Sea point of the Spleen channel. Inner shin, depression below and behind the head of the tibia.',
    defCn: '脾经第 9 穴；合穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6962',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005785?courseId=245888516&name=%E9%98%B4%E9%99%B5%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'sp10': {
    cn: '血海 · Xuè Hǎi', en: 'Spleen 10',
    def: '"Sea of Blood." 2 cùn above the upper border of the kneecap on the inner thigh. Foremost point for any blood disorder — moves and nourishes blood.',
    defCn: '脾经第 10 穴；合穴；" 2 cùn above the upper border of the kneecap 股内侧；Foremost point for any blood disorder — moves and 养血。',
    url: 'https://yibian.hopto.org/shu/?sid=6962',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005786?courseId=245888516&name=%E8%A1%80%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'ki3': {
    cn: '太溪 · Tài Xī', en: 'Kidney 3',
    def: 'Source point of the Kidney channel. In the depression between the inner ankle bone and the Achilles tendon. Replenishes kidney essence, yin, and yang.',
    defCn: '肾经第 3 穴；原穴；凹陷处 之间 inner ankle bone and the Achilles tendon。',
    url: 'https://yibian.hopto.org/shu/?sid=6964',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005919?courseId=245888516&name=%E5%A4%AA%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'ki6': {
    cn: '照海 · Zhào Hǎi', en: 'Kidney 6',
    def: 'Confluence point for the Yin Qiao Vessel. Below the inner ankle bone. Cools yin-deficiency heat, calms the spirit, treats night insomnia and dry throat.',
    defCn: '肾经第 6 穴；八脉交会穴；Cools yin-deficiency heat, 安神, treats night insomnia and dry throat。',
    url: 'https://yibian.hopto.org/shu/?sid=6964',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005922?courseId=245888516&name=%E7%85%A7%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'lv3': {
    cn: '太冲 · Tài Chōng', en: 'Liver 3',
    def: 'Source point of the Liver. In the V where the 1st and 2nd metatarsal bones meet on top of the foot. The foremost point for moving stagnant Liver qi and calming irritability.',
    defCn: '肝经原穴。足背第一、二跖骨结合部前凹陷处。疏肝解郁、平息易怒之首选——与合谷合称「四关」，疏通一身气血。',
    url: 'https://yibian.hopto.org/shu/?sid=6966',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006036?courseId=245888516&name=%E5%A4%AA%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'
  },
  'li4': {
    cn: '合谷 · Hé Gǔ', en: 'Large Intestine 4',
    def: 'Source point of the Large Intestine, master point for the face. Between thumb and index finger. Combined with LV3 forms the "Four Gates" — opens qi flow throughout the body. (Avoid in pregnancy.)',
    defCn: '大肠经原穴（即「虎口」）。手背第一、二掌骨之间。全身止痛之「万能穴」，尤擅治牙痛、面瘫、头痛及五官科诸炎症。与太冲合称「四关」，疏通一身气血。妊娠忌针。',
    url: 'https://yibian.hopto.org/shu/?sid=6967',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005692?courseId=245888516&name=%E5%90%88%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'li11': {
    cn: '曲池 · Qū Chí', en: 'Large Intestine 11',
    def: 'He-Sea point of the Large Intestine. At the outer end of the elbow crease. Powerful heat-clearer for skin, fever, and digestive heat.',
    defCn: '大肠经第 11 穴；合穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6967',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005707?courseId=245888516&name=%E6%9B%B2%E6%B1%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'gv14': {
    cn: '大椎 · Dà Zhuī', en: 'Governor Vessel 14',
    def: '"Great Hammer." Below C7 (the most prominent vertebra at the neck base). Meeting of all six yang channels — releases excess heat and treats all febrile diseases.',
    defCn: '督脉第 14 穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006065?courseId=245888516&name=%E5%A4%A7%E6%A4%8E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'gv26': {
    cn: '水沟 · Shuǐ Gōu', en: 'Governor Vessel 26 (人中 / Rén Zhōng)',
    def: 'Also known as 人中. Upper third of the philtrum (the groove between nose and upper lip). The classical emergency-revival point — open the orifices, restore consciousness, treat fainting, sunstroke, shock, acute lumbar sprain. A firm pinch with thumbnail is the canonical first-aid technique.',
    defCn: '督脉穴（即「人中」）。鼻唇沟之上 1/3 处。最经典之急救穴——昏迷、中暑、休克或精神分裂发作，重掐此穴可开窍醒神、回阳救逆。',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006078?courseId=245888516&name=%E6%B0%B4%E6%B2%9F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'st40': {
    cn: '丰隆 · Fēng Lóng', en: 'Stomach 40',
    def: 'Connecting (Luo) point of the Stomach channel. The classical "phlegm-resolving" point — used whenever phlegm (湿痰) is present.',
    defCn: '胃经第 40 穴；The classical "phlegm-resolving" point — used whenever phlegm (湿痰) is present。',
    url: 'https://yibian.hopto.org/shu/?sid=6961',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005765?courseId=245888516&name=%E4%B8%B0%E9%9A%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'cv12': {
    cn: '中脘 · Zhōng Wǎn', en: 'Conception Vessel 12',
    def: 'Front-Mu of the Stomach AND Influential Point for the Fu organs. Halfway between the breastbone tip and the navel. Warms the middle burner and harmonizes the entire digestive system.',
    defCn: '任脉第 12 穴；募穴；Halfway 之间 breastbone tip and the navel。',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006101?courseId=245888516&name=%E4%B8%AD%E8%84%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv17': {
    cn: '膻中 · Dàn Zhōng', en: 'Conception Vessel 17',
    def: 'Influential Point for Qi AND Front-Mu of the Pericardium. Midpoint of the breastbone, level with the nipples. Releases chest oppression, calms emotional bottling, regulates breath.',
    defCn: '任脉第 17 穴；募穴；Releases chest oppression, calms emotional bottling, 调breath。',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006106?courseId=245888516&name=%E8%86%BB%E4%B8%AD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'bl17': {
    cn: '膈俞 · Gé Shù', en: 'Bladder 17',
    def: 'Influential Point for Blood. On the back, level with the lower edge of the shoulder blade. Used for any blood disorder — stasis, deficiency, or hemorrhage.',
    defCn: '膀胱经第 17 穴；八会穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6963',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005864?courseId=245888516&name=%E8%86%88%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'
  },

  // ============================================================
  // Per-acupoint deep-links to the rhky.com 人卫慕课 course.
  // Card IDs are assigned chronologically by the course publisher
  // and are NOT predictable from each other, so each entry has to
  // be manually added as the URL is supplied.
  // ============================================================

  // Migraine special points (added for migraine.html)
  'gb20': { cn: '风池 · Fēng Chí', en: 'Gallbladder 20',
    def: '"Wind Pool." On the back of the head, in the depression between SCM and trapezius, at the base of the skull (≈ level with the earlobe). Disperses wind, clears the head, improves vertebrobasilar circulation — the #1 point for all wind-related and one-sided headaches.',
    defCn: '胆经穴。后脑勺下方，两条大筋（胸锁乳突肌与斜方肌）与枕骨之间凹陷处，大致与耳垂齐平。疏散风邪、清利头目、改善椎-基底动脉供血——几乎是所有偏头痛方案之「必选穴」。深刺有风险，须由执业医师施。',
    url: 'https://yibian.hopto.org/shu/?sid=6965',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005998?courseId=245888516&name=%E9%A3%8E%E6%B1%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965' },
  'gb8': { cn: '率谷 · Shuài Gǔ', en: 'Gallbladder 8',
    def: '"Leading Valley." Directly above the ear tip, ≈ 1.5 cùn (2 finger-widths) into the hairline, on the temporal region. Classical 偏正头风 specific point — covers the temporalis-fascia / superficial temporal artery zone where one-sided pulsating headache concentrates.',
    defCn: '胆经穴。耳尖直上入发际约 1.5 寸（约两横指），侧头部。临床公认之偏头痛核心穴/特效穴——对搏动性痛、血管性头痛效果突出；古传「丝竹空透率谷治偏正头风」。',
    url: 'https://yibian.hopto.org/shu/?sid=6965',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005986?courseId=245888516&name=%E7%8E%87%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965' },
  'gv20': { cn: '百会 · Bǎi Huì', en: 'Governor Vessel 20',
    def: '"Hundred Meetings." On the very top of the head, at the intersection of the midline and a line drawn between the two ear tips. The meeting of all yang channels — lifts yang, clears the brain, calms the spirit. Used for dull headaches with fatigue and qi-deficiency vertigo.',
    defCn: '督脉穴（诸阳之会）。两耳尖连线与头顶正中线交点。升阳益气、醒脑安神——气血不足型头痛（隐痛、劳累加重、伴头晕）尤宜。',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006071?courseId=245888516&name=%E7%99%BE%E4%BC%9A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944' },
  'gv16': { cn: '风府 · Fēng Fǔ', en: 'Governor Vessel 16',
    def: '"Wind Mansion." In the depression below the external occipital protuberance, 1 cùn above the posterior hairline. Disperses wind, clears the head, treats stiff neck and wind-cold headaches.',
    defCn: '督脉穴。后发际正中上 1 寸，枕外隆凸下凹陷处。疏散风邪、清利头目——风邪束表、颈项僵硬、风寒头痛皆主之。深部为延髓，针刺须谨慎。',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006067?courseId=245888516&name=%E9%A3%8E%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944' },
  'te20': { cn: '角孙 · Jiǎo Sūn', en: 'Triple Burner 20',
    def: 'On the head directly above the ear apex when the ear is folded forward. Triple-Burner channel meets the GB and SI here — works on temporal-region pain, ear-area inflammation, eye pain. Often paired with 率谷 GB8 for side-headache.',
    defCn: '三焦经穴。折耳向前时耳尖所指的发际处（颞部）。靠近耳颞神经分支与颞筋膜——侧头痛、耳病、目疾皆可取；与率谷相配，治偏头痛核心组合之一。',
    url: 'https://yibian.hopto.org/shu/?sid=6971',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005974?courseId=245888516&name=%E8%A7%92%E5%AD%99&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971' },
  'te23': { cn: '丝竹空 · Sī Zhú Kōng', en: 'Triple Burner 23',
    def: 'In the depression at the lateral end of the eyebrow. Classical line: "丝竹空透率谷" — needled through to 率谷 (GB8) for stubborn one-sided headache. Also for eye redness, twitching eyelid.',
    defCn: '三焦经穴。眉梢外侧凹陷处。古传「丝竹空透率谷」——治偏正头风、目赤眼跳之要穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6971',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005977?courseId=245888516&name=%E4%B8%9D%E7%AB%B9%E7%A9%BA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971' },
  'te5': { cn: '外关 · Wài Guān', en: 'Triple Burner 5',
    def: 'Luo-Connecting point of the TE; Confluent point of the Yang Wei Vessel. Outer forearm, 2 cùn (3 finger-widths) above the wrist crease, between the radius and ulna. Specifically opens the Shaoyang channel — paired with GB41 for side-headache, tinnitus, dizziness.',
    defCn: '三焦经络穴；通阳维脉（八脉交会穴）。腕背横纹上 2 寸（约三指宽），尺桡骨之间。专通少阳经气——侧头痛、耳鸣目眩之要穴；与足临泣（GB41）上下呼应。',
    url: 'https://yibian.hopto.org/shu/?sid=6971',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005959?courseId=245888516&name=%E5%A4%96%E5%85%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971' },
  'bl10': { cn: '天柱 · Tiān Zhù', en: 'Bladder 10',
    def: '"Heavenly Pillar." 1.3 cùn lateral to the midline on the posterior hairline, at the lateral border of the trapezius. Treats stiff neck, occipital headache, nasal congestion — major point for cervicogenic side-headache.',
    defCn: '膀胱经穴。后发际正中旁开 1.3 寸，斜方肌外侧缘。主治颈项僵硬、后头痛、鼻塞——颈源性侧头痛之要穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6963',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005857?courseId=245888516&name=%E5%A4%A9%E6%9F%B1&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963' },
  'ex-taiyang': { cn: '太阳 · Tài Yáng', en: 'Extra Point — Tài Yáng',
    def: 'Extraordinary (extra) point, not on any meridian. In the depression about one finger-width posterior to the midpoint of the line connecting the lateral end of the eyebrow and the outer canthus. The canonical local point for any side-head / temporal pain — quick relief by light circular pressure.',
    defCn: '经外奇穴。眉梢与目外眦连线中点，向后约一横指凹陷处。痛点所在区域——通络止痛快，发作期按揉常能较快「降温」。',
    url: 'https://yibian.hopto.org/shu/?sid=4949',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006118?courseId=245888516&name=%E5%A4%AA%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=4949' },

  'lu1': {
    cn: '中府 · Zhōng Fǔ', en: 'Lung 1',
    def: 'Front-Mu of the Lung. On the upper chest, 6 cùn lateral to the midline at the 1st intercostal space. Tonifies Lung qi; treats cough and chest oppression.',
    defCn: '肺经第 1 穴；募穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6968',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005652?courseId=245888516&name=%E4%B8%AD%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  'lu2': {
    cn: '云门 · Yún Mén', en: 'Lung 2',
    def: 'On the upper chest in the depression below the lateral end of the clavicle, 6 cùn lateral to the midline. Disperses Lung qi; treats chest fullness and shoulder pain.',
    defCn: '肺经第 2 穴。',
    url: 'https://yibian.hopto.org/shu/?sid=6968',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005656?courseId=245888516&name=%E4%BA%91%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  'li1': {
    cn: '商阳 · Shāng Yáng', en: 'Large Intestine 1',
    def: 'Jǐng-Well point of the Large Intestine. On the radial side of the index fingertip, 0.1 cùn proximal to the corner of the nail. Clears heat from the head and face; classical first-aid bleeding point for wind-heat sore throat.',
    defCn: '大肠经第 1 穴；井穴；On the radial side of the index 指尖, 0。',
    url: 'https://yibian.hopto.org/shu/?sid=6967',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005685?courseId=245888516&name=%E5%95%86%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },

  // ============================================================
  // Acupoints discovered via probing the rhky course (May 2026).
  // All card IDs verified by direct page fetch.
  // ============================================================
  // ---- Lung 肺经 (sid=6968) ----
  'lu3': { cn: '天府 · Tiān Fǔ', en: 'Lung 3', def: 'On the anterior arm, 3 cun below the anterior axillary fold, on the radial border of the biceps brachii. Regulates Lung qi; treats cough, asthma, and nosebleed.',
    defCn: '肺经第 3 穴。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005658?courseId=245888516&name=%E5%A4%A9%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu4': { cn: '侠白 · Xiá Bái', en: 'Lung 4', def: 'On the anterior arm, 4 cun below the anterior axillary fold, on the radial border of the biceps. Diffuses Lung qi; treats chest pain and arm pain.',
    defCn: '肺经第 4 穴。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005660?courseId=245888516&name=%E4%BE%A0%E7%99%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu5': { cn: '尺泽 · Chǐ Zé', en: 'Lung 5', def: 'He-Sea point of the Lung. In the cubital crease on the radial side of the biceps tendon. Clears Lung heat, descends Lung qi.',
    defCn: '肺经第 5 穴；合穴；Clears 肺 heat, descends 肺 qi。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005662?courseId=245888516&name=%E5%B0%BA%E6%B3%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu6': { cn: '孔最 · Kǒng Zuì', en: 'Lung 6', def: 'Xi-Cleft point of the Lung. On the forearm, 7 cun above the wrist crease on the line connecting LU5 and LU9. Clears Lung heat, stops bleeding (especially nosebleed and hemoptysis).',
    defCn: '肺经第 6 穴；郄穴；前臂, 7 cun 腕横纹上 on the line connecting LU5 and LU9；Clears 肺 heat, stops bleeding (especially nosebleed and hemoptysis)。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005664?courseId=245888516&name=%E5%AD%94%E6%9C%80&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu7': { cn: '列缺 · Liè Quē', en: 'Lung 7', def: 'Luo-Connecting point of the Lung; one of the Four Command Points (head and neck). On the radial wrist, 1.5 cun above the crease. Diffuses Lung qi, expels exterior wind.',
    defCn: '肺经络穴；八总穴之一（头项寻列缺）。两手虎口交叉，食指落点处（腕横纹桡侧上 1.5 寸）。治偏头痛、颈项强痛（落枕）、感冒咳嗽之特效穴——宣通肺气、疏散风邪。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005666?courseId=245888516&name=%E5%88%97%E7%BC%BA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  // ---- Large Intestine 大肠经 (sid=6967) ----
  'li2': { cn: '二间 · Èr Jiān', en: 'Large Intestine 2', def: 'Ying-Spring point of the Large Intestine. On the radial side of the 2nd metacarpophalangeal joint at the red-white skin border. Clears heat from the head, face, and throat.',
    defCn: '大肠经第 2 穴；荥穴；清热 from the head, face, and throat。', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005687?courseId=245888516&name=%E4%BA%8C%E9%97%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967' },
  'li10': { cn: '手三里 · Shǒu Sān Lǐ', en: 'Large Intestine 10', def: 'On the forearm, 2 cun below the elbow crease on the LI4–LI11 line. Opens channels, regulates qi, treats arm and shoulder pain.',
    defCn: '大肠经第 10 穴。', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005705?courseId=245888516&name=%E6%89%8B%E4%B8%89%E9%87%8C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967' },
  // ---- Stomach 胃经 (sid=6961) ----
  'st37': { cn: '上巨虚 · Shàng Jù Xū', en: 'Stomach 37', def: 'Lower-He-Sea point of the Large Intestine. On the lower leg, 6 cun below ST35. Harmonizes the intestines; treats abdominal pain, diarrhea, dysentery.',
    defCn: '胃经第 37 穴；合穴。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005762?courseId=245888516&name=%E4%B8%8A%E5%B7%A8%E8%99%9A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961' },
  'st41': { cn: '解溪 · Xiè Xī', en: 'Stomach 41', def: 'Jing-River point of the Stomach. In the central ankle depression in front of the joint, between the two tendons. Clears heat, calms the spirit; treats headache, dizziness, ankle pain.',
    defCn: '胃经第 41 穴；经穴；In the central ankle depression in front of the joint, 之间 two tendons。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005766?courseId=245888516&name=%E8%A7%A3%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961' },
  // ---- Spleen 脾经 (sid=6962) ----
  'sp1': { cn: '隐白 · Yǐn Bái', en: 'Spleen 1', def: 'Jing-Well point of the Spleen. On the medial side of the great toe, 0.1 cun proximal to the corner of the nail. Strengthens the Spleen, restores yang; treats excessive menstruation and bleeding disorders.',
    defCn: '脾经第 1 穴；井穴；内侧 great 趾, 0。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005775?courseId=245888516&name=%E9%9A%90%E7%99%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp2': { cn: '大都 · Dà Dū', en: 'Spleen 2', def: 'Ying-Spring point of the Spleen. On the foot, in the depression at the red-white skin border distal to the 1st metatarsophalangeal joint. Strengthens the Spleen, drains heat.',
    defCn: '脾经第 2 穴；荥穴；On the foot, 凹陷处 at the red-white skin border distal to the 1st metatarsophalangeal joint；强the 脾, drains heat。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005776?courseId=245888516&name=%E5%A4%A7%E9%83%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp7': { cn: '漏谷 · Lòu Gǔ', en: 'Spleen 7', def: 'On the inner leg, 6 cun above the medial malleolus, on the posterior border of the medial tibia. Strengthens the Spleen, drains dampness.',
    defCn: '脾经第 7 穴。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005783?courseId=245888516&name=%E6%BC%8F%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp8': { cn: '地机 · Dì Jī', en: 'Spleen 8', def: 'Xi-Cleft point of the Spleen. On the inner leg, 3 cun below SP9, on the medial tibia border. Regulates menstruation, drains dampness.',
    defCn: '脾经第 8 穴；郄穴；On the inner leg, 3 cun below SP9, 胫骨内侧 border；调menstruation, 利湿。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005784?courseId=245888516&name=%E5%9C%B0%E6%9C%BA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp12': { cn: '冲门 · Chōng Mén', en: 'Spleen 12', def: 'In the inguinal region along the inguinal crease, lateral to the femoral artery. Regulates qi, treats hernia and abdominal pain.',
    defCn: '脾经第 12 穴。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005788?courseId=245888516&name=%E5%86%B2%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  // ---- Bladder 膀胱经 (sid=6963) ----
  'bl1': { cn: '睛明 · Jīng Míng', en: 'Bladder 1', def: 'On the face, in the depression medial to the inner canthus of the eye. Clears heat, brightens the eyes; the principal point for eye disease.',
    defCn: '膀胱经第 1 穴。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005846?courseId=245888516&name=%E7%9D%9B%E6%98%8E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963' },
  'bl13': { cn: '肺俞 · Fèi Shù', en: 'Bladder 13', def: 'Back-Shu of the Lung. 1.5 cun lateral to the spine, level with the lower border of T3. Nourishes Lung yin, clears heat, regulates Lung qi.',
    defCn: '膀胱经第 13 穴；背俞穴；Nourishes 肺 yin, 清热, 调Lung qi。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005860?courseId=245888516&name=%E8%82%BA%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963' },
  // ---- Kidney 肾经 (sid=6964) ----
  'ki1': { cn: '涌泉 · Yǒng Quán', en: 'Kidney 1', def: 'Jing-Well point of the Kidney. On the sole of the foot, in the depression appearing when the foot is flexed. Nourishes yin, calms wind, awakens consciousness, opens the orifices.',
    defCn: '肾经第 1 穴；井穴；On the sole of the foot, 凹陷处 appearing when the foot is flexed；养阴, calms wind, awakens consciousness, 开窍。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005917?courseId=245888516&name=%E6%B6%8C%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964' },
  'ki2': { cn: '然谷 · Rán Gǔ', en: 'Kidney 2', def: 'Ying-Spring point of the Kidney. On the medial foot, in the depression below the navicular tuberosity. Nourishes yin, supplements the kidneys, clears heat.',
    defCn: '肾经第 2 穴；荥穴；On the medial foot, 凹陷处 below the navicular tuberosity；养阴, supplements the kidneys, 清热。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005918?courseId=245888516&name=%E7%84%B6%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964' },
  // ---- Liver 肝经 (sid=6966) ----
  'lv1': { cn: '大敦 · Dà Dūn', en: 'Liver 1', def: 'Jing-Well point of the Liver. On the dorsum of the great toe, 0.1 cun proximal to the corner of the nail. Soothes the Liver, calms wind, settles the spirit.',
    defCn: '肝经第 1 穴；井穴；On the dorsum of the great 趾, 0；Soothes the 肝, calms wind, settles the spirit。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006032?courseId=245888516&name=%E5%A4%A7%E6%95%A6&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966' },
  'lv2': { cn: '行间 · Xíng Jiān', en: 'Liver 2', def: 'Ying-Spring point of the Liver. On the foot, between the 1st and 2nd toes at the proximal end of the web margin. Soothes Liver fire, calms wind.',
    defCn: '肝经第 2 穴；荥穴；On the foot, 之间 1st and 2nd 趾 at the proximal end of the web margin；Soothes 肝 fire, calms wind。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006034?courseId=245888516&name=%E8%A1%8C%E9%97%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966' },
  // ---- Du Mai 督脉 (sid=6944) ----
  'gv2': { cn: '腰俞 · Yāo Shù', en: 'Governor Vessel 2', def: 'On the lower back, in the depression of the sacral hiatus. Tonifies the kidneys, strengthens the lower back, regulates menstruation.',
    defCn: '督脉第 2 穴。', url: 'https://yibian.hopto.org/shu/?sid=6944', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006052?courseId=245888516&name=%E8%85%B0%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944' },
  'gv15': { cn: '哑门 · Yǎ Mén', en: 'Governor Vessel 15', def: 'On the back of the neck, in the depression above the spinous process of C2 on the posterior midline. Opens consciousness, awakens the spirit, dispels wind.',
    defCn: '督脉第 15 穴。', url: 'https://yibian.hopto.org/shu/?sid=6944', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006066?courseId=245888516&name=%E5%93%91%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944' },
  // ---- Ren Mai 任脉 (sid=6943) ----
  'cv1': { cn: '会阴 · Huì Yīn', en: 'Conception Vessel 1', def: 'In the perineum, between the anus and the genitals. Regulates menstruation, tonifies the kidneys, clears damp-heat.',
    defCn: '任脉第 1 穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006088?courseId=245888516&name=%E4%BC%9A%E9%98%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv3': { cn: '中极 · Zhōng Jí', en: 'Conception Vessel 3', def: 'On the lower abdomen, 4 cun below the navel on the anterior midline. Front-Mu of the Bladder. Benefits the kidneys, opens channels.',
    defCn: '任脉第 3 穴；募穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006091?courseId=245888516&name=%E4%B8%AD%E6%9E%81&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv7': { cn: '阴交 · Yīn Jiāo', en: 'Conception Vessel 7', def: 'On the lower abdomen, 1 cun below the navel on the anterior midline. Treats abdominal pain, edema, menstrual irregularities.',
    defCn: '任脉第 7 穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006096?courseId=245888516&name=%E9%98%B4%E4%BA%A4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv9': { cn: '水分 · Shuǐ Fèn', en: 'Conception Vessel 9', def: 'On the upper abdomen, 1 cun above the navel on the anterior midline. Drains dampness, regulates water passages.',
    defCn: '任脉第 9 穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006098?courseId=245888516&name=%E6%B0%B4%E5%88%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv11': { cn: '建里 · Jiàn Lǐ', en: 'Conception Vessel 11', def: 'On the upper abdomen, 3 cun above the navel on the anterior midline. Harmonizes the Stomach, regulates qi.',
    defCn: '任脉第 11 穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006100?courseId=245888516&name=%E5%BB%BA%E9%87%8C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv13': { cn: '上脘 · Shàng Wǎn', en: 'Conception Vessel 13', def: 'On the upper abdomen, 5 cun above the navel on the anterior midline. Strengthens the Spleen-Stomach, regulates qi, treats vomiting and indigestion.',
    defCn: '任脉第 13 穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006102?courseId=245888516&name=%E4%B8%8A%E8%84%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv24': { cn: '承浆 · Chéng Jiāng', en: 'Conception Vessel 24', def: 'On the face, in the depression in the centre of the mentolabial groove. Calms wind, clears heat, treats facial paralysis and toothache.',
    defCn: '任脉第 24 穴。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006113?courseId=245888516&name=%E6%89%BF%E6%B5%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  // ---- Extra (奇穴) ----
  'ba-feng': { cn: '八风 · Bā Fēng', en: 'EX-LE10 (Eight Winds)', def: 'Eight extra-meridian points on the dorsum of each foot, in the depressions at the proximal margin of each web between adjacent toes. Treats foot swelling, toe numbness, and headaches.',
    defCn: 'Treats foot swelling, 趾 numbness, and headaches。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006159?courseId=245888516&name=%E5%85%AB%E9%A3%8E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },

  // ============================================================
  // Compact acupoint entries — every point referenced in the
  // 十六郄穴歌, 十二募穴, 十二经脉流注表, and 妇科调经 sections.
  // No rhky deep-link yet (would require per-card probing); the
  // tooltip routes to yibian as primary and auto-derives a Baidu
  // Baike backup via pickBackupUrl().
  // ============================================================
  // Lung (LU8-LU11)
  'lu8': { cn: '经渠 · Jīng Qú', en: 'Lung 8', def: 'Jing-River point of the Lung. On the wrist, 1 cùn proximal to the radial pulse.',
    defCn: '肺经第 8 穴；经穴。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005668?courseId=245888516&name=%E7%BB%8F%E6%B8%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  'lu9': { cn: '太渊 · Tài Yuān', en: 'Lung 9', def: 'Yuan-Source and Stream point of the Lung; Eight-Influential Point for vessels (脉会). On the radial wrist crease.',
    defCn: '肺经第 9 穴；原穴；vessels (脉会)。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005670?courseId=245888516&name=%E5%A4%AA%E6%B8%8A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  'lu10': { cn: '鱼际 · Yú Jì', en: 'Lung 10', def: 'Ying-Spring point of the Lung. On the palm, midpoint of the 1st metacarpal at the red-white skin border.',
    defCn: '肺经第 10 穴；荥穴。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005672?courseId=245888516&name=%E9%B1%BC%E9%99%85&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  'lu11': { cn: '少商 · Shào Shāng', en: 'Lung 11', def: 'Jing-Well point of the Lung. On the radial side of the thumb. Emergency revival; acute throat heat.',
    defCn: '肺经第 11 穴；井穴。', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005674?courseId=245888516&name=%E5%B0%91%E5%95%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  // Large Intestine (LI3, LI5, LI7)
  'li3': { cn: '三间 · Sān Jiān', en: 'Large Intestine 3', def: 'Stream point of the LI. On the dorsum of the hand, in the depression on the radial side of the 2nd metacarpophalangeal joint.',
    defCn: '大肠经第 3 穴；输穴；手背, 凹陷处 on the radial side of the 2nd metacarpophalangeal joint。', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005690?courseId=245888516&name=%E4%B8%89%E9%97%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'  },
  'li5': { cn: '阳溪 · Yáng Xī', en: 'Large Intestine 5', def: 'Jing-River point of the LI. In the anatomical snuffbox on the radial wrist.',
    defCn: '大肠经第 5 穴；经穴；In the anatomical snuffbox 腕桡侧。', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005694?courseId=245888516&name=%E9%98%B3%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'  },
  'li7': { cn: '温溜 · Wēn Liū', en: 'Large Intestine 7', def: 'Cleft point of the LI channel. On the back forearm, 5 cùn above the wrist crease.',
    defCn: '大肠经第 7 穴；郄穴；前臂背侧, 5 cùn 腕横纹上。', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005698?courseId=245888516&name=%E6%B8%A9%E6%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'  },
  // Stomach (ST25, ST34, ST42, ST43, ST44, ST45)
  'st25': { cn: '天枢 · Tiān Shū', en: 'Stomach 25', def: 'Front-Mu of the Large Intestine. 2 cùn lateral to the navel. Treats abdominal pain, constipation, diarrhea.',
    defCn: '胃经第 25 穴；募穴。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005748?courseId=245888516&name=%E5%A4%A9%E6%9E%A2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st34': { cn: '梁丘 · Liáng Qiū', en: 'Stomach 34', def: 'Cleft point of the Stomach. On the front thigh, 2 cùn above the upper lateral border of the patella. Acute stomach pain.',
    defCn: '胃经第 34 穴；郄穴；股前, 2 cùn above the upper lateral border of the patella。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005758?courseId=245888516&name=%E6%A2%81%E4%B8%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st42': { cn: '冲阳 · Chōng Yáng', en: 'Stomach 42', def: 'Yuan-Source of the Stomach. On the dorsum of the foot, on the highest point of the dorsum.',
    defCn: '胃经第 42 穴；原穴；足背, on the highest point of the dorsum。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005767?courseId=245888516&name=%E5%86%B2%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st43': { cn: '陷谷 · Xiàn Gǔ', en: 'Stomach 43', def: 'Stream point of the Stomach. On the foot dorsum, in the depression distal to the 2nd-3rd metatarsal junction.',
    defCn: '胃经第 43 穴；输穴；On the foot dorsum, 凹陷处 distal to the 2nd-3rd metatarsal junction。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005769?courseId=245888516&name=%E9%99%B7%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st44': { cn: '内庭 · Nèi Tíng', en: 'Stomach 44', def: 'Ying-Spring of the Stomach. Between the 2nd and 3rd toes at the proximal end of the web. Clears stomach heat.',
    defCn: '胃经第 44 穴；荥穴；之间 2nd and 3rd 趾 at the proximal end of the web。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005771?courseId=245888516&name=%E5%86%85%E5%BA%AD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st45': { cn: '厉兑 · Lì Duì', en: 'Stomach 45', def: 'Jing-Well of the Stomach. On the lateral side of the 2nd toe.',
    defCn: '胃经第 45 穴；井穴；外侧 2nd 趾。', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005772?courseId=245888516&name=%E5%8E%89%E5%85%91&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  // Spleen (SP3, SP5)
  'sp3': { cn: '太白 · Tài Bái', en: 'Spleen 3', def: 'Yuan-Source and Stream of the Spleen. On the medial foot, proximal to the 1st metatarsophalangeal joint at the red-white skin border.',
    defCn: '脾经第 3 穴；原穴。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005777?courseId=245888516&name=%E5%A4%AA%E7%99%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'  },
  'sp5': { cn: '商丘 · Shāng Qiū', en: 'Spleen 5', def: 'Jing-River of the Spleen. On the medial foot, in the depression anterior and inferior to the medial malleolus.',
    defCn: '脾经第 5 穴；经穴；On the medial foot, 凹陷处 anterior and inferior to the medial malleolus。', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005779?courseId=245888516&name=%E5%95%86%E4%B8%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'  },
  // Heart (HT3, HT4, HT6, HT7, HT8, HT9)
  'ht3': { cn: '少海 · Shào Hǎi', en: 'Heart 3', def: 'He-Sea point of the Heart. On the medial elbow crease, just anterior to the medial epicondyle.',
    defCn: '心经第 3 穴；合穴。', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005804?courseId=245888516&name=%E5%B0%91%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht4': { cn: '灵道 · Líng Dào', en: 'Heart 4', def: 'Jing-River of the Heart. On the inner forearm, 1.5 cùn proximal to the wrist crease.',
    defCn: '心经第 4 穴；经穴；前臂内侧, 1。', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005805?courseId=245888516&name=%E7%81%B5%E9%81%93&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht6': { cn: '阴郄 · Yīn Xī', en: 'Heart 6', def: 'Cleft point of the Heart. On the inner forearm, 0.5 cùn proximal to the wrist crease, on the radial side of the FCU tendon.',
    defCn: '心经第 6 穴；郄穴；前臂内侧, 0。', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005807?courseId=245888516&name=%E9%98%B4%E9%83%84&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht7': { cn: '神门 · Shén Mén', en: 'Heart 7', def: 'Yuan-Source and Stream of the Heart. On the inner wrist crease. Calms the spirit; treats insomnia and palpitations.',
    defCn: '心经第 7 穴；原穴；腕横纹内侧。', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005809?courseId=245888516&name=%E7%A5%9E%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht8': { cn: '少府 · Shào Fǔ', en: 'Heart 8', def: 'Ying-Spring of the Heart. On the palm, between the 4th and 5th metacarpals.',
    defCn: '心经第 8 穴；荥穴；On the palm, 之间 4th and 5th metacarpals。', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005810?courseId=245888516&name=%E5%B0%91%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht9': { cn: '少冲 · Shào Chōng', en: 'Heart 9', def: 'Jing-Well of the Heart. On the radial side of the little fingertip. Emergency revival.',
    defCn: '心经第 9 穴；井穴；On the radial side of the little 指尖。', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005811?courseId=245888516&name=%E5%B0%91%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  // Small Intestine (SI1-SI6, SI8)
  'si1': { cn: '少泽 · Shào Zé', en: 'Small Intestine 1', def: 'Jing-Well of the SI. On the ulnar side of the little fingertip. Postpartum lactation insufficiency.',
    defCn: '小肠经第 1 穴；井穴；On the ulnar side of the little 指尖。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005814?courseId=245888516&name=%E5%B0%91%E6%B3%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si2': { cn: '前谷 · Qián Gǔ', en: 'Small Intestine 2', def: 'Ying-Spring of the SI. On the ulnar side of the 5th MCP joint at the red-white skin border.',
    defCn: '小肠经第 2 穴；荥穴。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005815?courseId=245888516&name=%E5%89%8D%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si3': { cn: '后溪 · Hòu Xī', en: 'Small Intestine 3', def: 'Stream point of the SI; Confluent point of the Du Mai. On the ulnar side of the 5th metacarpal head when fist is loosely clenched.',
    defCn: '小肠经第 3 穴；输穴。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005816?courseId=245888516&name=%E5%90%8E%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si4': { cn: '腕骨 · Wàn Gǔ', en: 'Small Intestine 4', def: 'Yuan-Source of the SI. On the ulnar wrist, between the 5th metacarpal base and the triquetral.',
    defCn: '小肠经第 4 穴；原穴；腕尺侧, 之间 5th metacarpal base and the triquetral。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005817?courseId=245888516&name=%E8%85%95%E9%AA%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si5': { cn: '阳谷 · Yáng Gǔ', en: 'Small Intestine 5', def: 'Jing-River of the SI. On the ulnar wrist, between the styloid process of the ulna and the triquetral.',
    defCn: '小肠经第 5 穴；经穴；腕尺侧, 之间 styloid process of the ulna and the triquetral。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005818?courseId=245888516&name=%E9%98%B3%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si6': { cn: '养老 · Yǎng Lǎo', en: 'Small Intestine 6', def: 'Cleft point of the SI. On the ulnar wrist, in the bony cleft on the radial side of the styloid process of the ulna.',
    defCn: '小肠经第 6 穴；郄穴；腕尺侧, in the bony cleft on the radial side of the styloid process of the ulna。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005820?courseId=245888516&name=%E5%85%BB%E8%80%81&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si8': { cn: '小海 · Xiǎo Hǎi', en: 'Small Intestine 8', def: 'He-Sea of the SI. In the depression between the medial epicondyle of the humerus and the olecranon.',
    defCn: '小肠经第 8 穴；合穴；凹陷处 之间 medial epicondyle of the humerus and the olecranon。', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005822?courseId=245888516&name=%E5%B0%8F%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  // Bladder (BL23, 八髎, BL40, BL59, BL60, BL63, BL64, BL65, BL66, BL67)
  'bl23': { cn: '肾俞 · Shèn Shù', en: 'Bladder 23', def: 'Back-Shu of the Kidney. 1.5 cùn lateral to the spine, level with L2. Tonifies kidney essence and yang.',
    defCn: '膀胱经第 23 穴；背俞穴；补kidney essence and yang。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005870?courseId=245888516&name=%E8%82%BE%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'baliao': { cn: '八髎 · Bā Liáo', en: 'BL31-34 group', def: 'Eight points over the four pairs of sacral foramina (BL31-34). Used for menstrual regulation, infertility, retroverted uterus, dysmenorrhea.', url: 'https://yibian.hopto.org/shu/?sid=6963' },
  'bl40': { cn: '委中 · Wěi Zhōng', en: 'Bladder 40', def: 'He-Sea of the Bladder; Four Command Point for low back. In the centre of the popliteal fossa.',
    defCn: '膀胱经合穴；八总穴之一（腰背委中求）。膝后腘窝横纹中点。腰背为膀胱经主行之地——急性腰扭伤、长期腰背酸痛皆主之，舒筋活络、理气和血。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005888?courseId=245888516&name=%E5%A7%94%E4%B8%AD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl59': { cn: '跗阳 · Fū Yáng', en: 'Bladder 59', def: 'Cleft point of the Yang Qiao Vessel. On the back of the lower leg, 3 cùn above BL60.',
    defCn: '膀胱经第 59 穴；郄穴；小腿后侧, 3 cùn above BL60。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005907?courseId=245888516&name=%E8%B7%97%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl60': { cn: '昆仑 · Kūn Lún', en: 'Bladder 60', def: 'Jing-River of the Bladder. In the depression between the lateral malleolus and the Achilles tendon. Treats headache, neck stiffness, low back pain.',
    defCn: '膀胱经第 60 穴；经穴；凹陷处 之间 lateral malleolus and the Achilles tendon。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005908?courseId=245888516&name=%E6%98%86%E4%BB%91&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl63': { cn: '金门 · Jīn Mén', en: 'Bladder 63', def: 'Cleft point of the Bladder. On the lateral foot, posterior to the tuberosity of the 5th metatarsal base.',
    defCn: '膀胱经第 63 穴；郄穴。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005911?courseId=245888516&name=%E9%87%91%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl64': { cn: '京骨 · Jīng Gǔ', en: 'Bladder 64', def: 'Yuan-Source of the Bladder. On the lateral foot, at the proximal-inferior corner of the 5th metatarsal base.',
    defCn: '膀胱经第 64 穴；原穴。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005912?courseId=245888516&name=%E4%BA%AC%E9%AA%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl65': { cn: '束骨 · Shù Gǔ', en: 'Bladder 65', def: 'Stream point of the Bladder. On the lateral foot, posterior to the 5th MTP joint at the red-white skin border.',
    defCn: '膀胱经第 65 穴；输穴。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005913?courseId=245888516&name=%E6%9D%9F%E9%AA%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl66': { cn: '足通谷 · Zú Tōng Gǔ', en: 'Bladder 66', def: 'Ying-Spring of the Bladder. On the lateral foot, anterior to the 5th MTP joint.',
    defCn: '膀胱经第 66 穴；荥穴。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005914?courseId=245888516&name=%E8%B6%B3%E9%80%9A%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl67': { cn: '至阴 · Zhì Yīn', en: 'Bladder 67', def: 'Jing-Well of the Bladder. On the lateral side of the little toe. Classical malposition-of-fetus moxa point.',
    defCn: '膀胱经第 67 穴；井穴；外侧 little 趾。', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005915?courseId=245888516&name=%E8%87%B3%E9%98%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  // Kidney (KI5, KI7, KI8, KI9, KI10)
  'ki5': { cn: '水泉 · Shuǐ Quán', en: 'Kidney 5', def: 'Cleft point of the Kidney. 1 cùn directly below KI3.',
    defCn: '肾经第 5 穴；郄穴。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005921?courseId=245888516&name=%E6%B0%B4%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki7': { cn: '复溜 · Fù Liū', en: 'Kidney 7', def: 'Jing-River of the Kidney. 2 cùn above KI3, anterior to the Achilles tendon. Tonifies kidney yin and yang.',
    defCn: '肾经第 7 穴；经穴；补kidney yin and yang。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005923?courseId=245888516&name=%E5%A4%8D%E6%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki8': { cn: '交信 · Jiāo Xìn', en: 'Kidney 8', def: 'Cleft point of the Yin Qiao Vessel. 2 cùn above KI3, 0.5 cùn anterior to KI7.',
    defCn: '肾经第 8 穴；郄穴。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005924?courseId=245888516&name=%E4%BA%A4%E4%BF%A1&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki9': { cn: '筑宾 · Zhù Bīn', en: 'Kidney 9', def: 'Cleft point of the Yin Wei Vessel. 5 cùn above KI3 on the line connecting KI3 and KI10.',
    defCn: '肾经第 9 穴；郄穴。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005925?courseId=245888516&name=%E7%AD%91%E5%AE%BE&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki10': { cn: '阴谷 · Yīn Gǔ', en: 'Kidney 10', def: 'He-Sea of the Kidney. On the medial knee, in the depression between the tendons of semitendinosus and semimembranosus.',
    defCn: '肾经第 10 穴；合穴；膝内侧, 凹陷处 之间 tendons of semitendinosus and semimembranosus。', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005926?courseId=245888516&name=%E9%98%B4%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  // Pericardium (PC3, PC4, PC5, PC7, PC8, PC9)
  'pc3': { cn: '曲泽 · Qū Zé', en: 'Pericardium 3', def: 'He-Sea of the Pericardium. On the elbow crease, on the ulnar side of the biceps tendon. Cools heart and stomach heat.',
    defCn: '心包经第 3 穴；合穴。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005947?courseId=245888516&name=%E6%9B%B2%E6%B3%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc4': { cn: '郄门 · Xī Mén', en: 'Pericardium 4', def: 'Cleft point of the Pericardium. On the inner forearm, 5 cùn proximal to the wrist crease. Acute heart pain.',
    defCn: '心包经第 4 穴；郄穴；前臂内侧, 5 cùn proximal to the wrist crease。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005948?courseId=245888516&name=%E9%83%84%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc5': { cn: '间使 · Jiān Shǐ', en: 'Pericardium 5', def: 'Jing-River of the Pericardium. On the inner forearm, 3 cùn proximal to the wrist crease.',
    defCn: '心包经第 5 穴；经穴；前臂内侧, 3 cùn proximal to the wrist crease。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005949?courseId=245888516&name=%E9%97%B4%E4%BD%BF&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc6': { cn: '内关 · Nèi Guān', en: 'Pericardium 6', def: 'Luo-Connecting point of the Pericardium; Confluent point of the Yin Wei Vessel. Inner forearm, 2 cùn (3 finger-widths) above the wrist crease, between PL and FCR tendons. Settles the heart, calms the spirit, harmonizes the stomach, stops nausea — chief point for chest oppression, palpitations, motion sickness, gastric pain.',
    defCn: '心包经络穴；通阴维脉（八脉交会穴）。手腕横纹上三横指（二寸）处。主治胸闷、心悸、胃痛、晕车呕吐——调心律、止胃肠痉挛之要穴。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005950?courseId=245888516&name=%E5%86%85%E5%85%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972' },
  'pc7': { cn: '大陵 · Dà Líng', en: 'Pericardium 7', def: 'Yuan-Source and Stream of the Pericardium. On the wrist crease between the FCR and PL tendons. Calms the spirit; treats heart-fire.',
    defCn: '心包经第 7 穴；原穴；腕横纹 之间 FCR and PL tendons。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005951?courseId=245888516&name=%E5%A4%A7%E9%99%B5&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc8': { cn: '劳宫 · Láo Gōng', en: 'Pericardium 8', def: 'Ying-Spring of the Pericardium. In the centre of the palm, where the tip of the middle finger touches when the fist is clenched.',
    defCn: '心包经第 8 穴；荥穴。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005952?courseId=245888516&name=%E5%8A%B3%E5%AE%AB&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc9': { cn: '中冲 · Zhōng Chōng', en: 'Pericardium 9', def: 'Jing-Well of the Pericardium. On the tip of the middle finger. Emergency revival.',
    defCn: '心包经第 9 穴；井穴；尖部 middle finger。', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005953?courseId=245888516&name=%E4%B8%AD%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  // Triple Burner (TE1-TE4, TE6, TE7, TE10)
  'te1': { cn: '关冲 · Guān Chōng', en: 'Triple Burner 1', def: 'Jing-Well of the TE. On the ulnar side of the ring fingertip.',
    defCn: '三焦经第 1 穴；井穴；On the ulnar side of the ring 指尖。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005955?courseId=245888516&name=%E5%85%B3%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te2': { cn: '液门 · Yè Mén', en: 'Triple Burner 2', def: 'Ying-Spring of the TE. On the dorsum of the hand, between the 4th and 5th MCP joints when the fist is clenched.',
    defCn: '三焦经第 2 穴；荥穴；手背, 之间 4th and 5th MCP joints when the fist is clenched。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005956?courseId=245888516&name=%E6%B6%B2%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te3': { cn: '中渚 · Zhōng Zhǔ', en: 'Triple Burner 3', def: 'Stream point of the TE. On the dorsum of the hand, in the depression proximal to the 4th-5th MCP junction.',
    defCn: '三焦经第 3 穴；输穴；手背, 凹陷处 proximal to the 4th-5th MCP junction。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005957?courseId=245888516&name=%E4%B8%AD%E6%B8%9A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te4': { cn: '阳池 · Yáng Chí', en: 'Triple Burner 4', def: 'Yuan-Source of the TE. On the dorsum of the wrist, on the ulnar side of the EDC tendon.',
    defCn: '三焦经第 4 穴；原穴。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005958?courseId=245888516&name=%E9%98%B3%E6%B1%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te6': { cn: '支沟 · Zhī Gōu', en: 'Triple Burner 6', def: 'Jing-River of the TE. On the back forearm, 3 cùn proximal to the wrist crease, between the radius and ulna. Treats constipation and intercostal neuralgia.',
    defCn: '三焦经第 6 穴；经穴；前臂背侧, 3 cùn proximal to the wrist crease, 之间 radius and ulna。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005960?courseId=245888516&name=%E6%94%AF%E6%B2%9F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te7': { cn: '会宗 · Huì Zōng', en: 'Triple Burner 7', def: 'Cleft point of the TE. On the back forearm, 3 cùn above the wrist crease, 1 finger ulnar to TE6.',
    defCn: '三焦经第 7 穴；郄穴；前臂背侧, 3 cùn 腕横纹上, 1 finger ulnar to TE6。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005961?courseId=245888516&name=%E4%BC%9A%E5%AE%97&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te10': { cn: '天井 · Tiān Jǐng', en: 'Triple Burner 10', def: 'He-Sea of the TE. On the back of the elbow, 1 cùn proximal to the olecranon.',
    defCn: '三焦经第 10 穴；合穴。', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005964?courseId=245888516&name=%E5%A4%A9%E4%BA%95&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  // Gallbladder (GB24, GB25, GB34, GB35, GB36, GB38, GB40, GB41, GB43, GB44)
  'gb24': { cn: '日月 · Rì Yuè', en: 'Gallbladder 24', def: 'Front-Mu of the Gallbladder. In the 7th intercostal space, 4 cùn lateral to the midline.',
    defCn: '胆经第 24 穴；募穴。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006003?courseId=245888516&name=%E6%97%A5%E6%9C%88&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb25': { cn: '京门 · Jīng Mén', en: 'Gallbladder 25', def: 'Front-Mu of the Kidney. On the side waist, below the free end of the 12th rib.',
    defCn: '胆经第 25 穴；募穴；侧腰, below the free end of the 12th rib。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006004?courseId=245888516&name=%E4%BA%AC%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb34': { cn: '阳陵泉 · Yáng Líng Quán', en: 'Gallbladder 34', def: 'He-Sea of the GB; Eight-Influential Point for sinews (筋会). Below and anterior to the head of the fibula.',
    defCn: '胆经第 34 穴；合穴；sinews (筋会)。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006015?courseId=245888516&name=%E9%98%B3%E9%99%B5%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb35': { cn: '阳交 · Yáng Jiāo', en: 'Gallbladder 35', def: 'Cleft point of the Yang Wei Vessel. 7 cùn above the lateral malleolus on the posterior border of the fibula.',
    defCn: '胆经第 35 穴；郄穴。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006016?courseId=245888516&name=%E9%98%B3%E4%BA%A4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb36': { cn: '外丘 · Wài Qiū', en: 'Gallbladder 36', def: 'Cleft point of the GB. 7 cùn above the lateral malleolus on the anterior border of the fibula.',
    defCn: '胆经第 36 穴；郄穴。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006017?courseId=245888516&name=%E5%A4%96%E4%B8%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb38': { cn: '阳辅 · Yáng Fǔ', en: 'Gallbladder 38', def: 'Jing-River of the GB. 4 cùn above the lateral malleolus on the anterior border of the fibula.',
    defCn: '胆经第 38 穴；经穴。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006021?courseId=245888516&name=%E9%98%B3%E8%BE%85&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb40': { cn: '丘墟 · Qiū Xū', en: 'Gallbladder 40', def: 'Yuan-Source of the GB. In the depression in front and below the lateral malleolus, on the lateral side of EDL.',
    defCn: '胆经第 40 穴；原穴；凹陷处 in front and below the lateral malleolus, on the lateral side of EDL。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006023?courseId=245888516&name=%E4%B8%98%E5%A2%9F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb41': { cn: '足临泣 · Zú Lín Qì', en: 'Gallbladder 41', def: 'Stream point of the GB; Confluent point of the Dài Mài (Belt Vessel). On the dorsum of the foot, distal to the 4th-5th metatarsal junction.',
    defCn: '胆经第 41 穴；输穴。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006024?courseId=245888516&name=%E8%B6%B3%E4%B8%B4%E6%B3%A3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb43': { cn: '侠溪 · Xiá Xī', en: 'Gallbladder 43', def: 'Ying-Spring of the GB. On the dorsum of the foot, between the 4th and 5th toes at the proximal end of the web.',
    defCn: '胆经第 43 穴；荥穴；足背, 之间 4th and 5th 趾 at the proximal end of the web。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006026?courseId=245888516&name=%E4%BE%A0%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb44': { cn: '足窍阴 · Zú Qiào Yīn', en: 'Gallbladder 44', def: 'Jing-Well of the GB. On the lateral side of the 4th toe.',
    defCn: '胆经第 44 穴；井穴；外侧 4th 趾。', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006028?courseId=245888516&name=%E8%B6%B3%E7%AA%8D%E9%98%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  // Liver (LV4, LV6, LV8, LV9, LV13, LV14)
  'lv4': { cn: '中封 · Zhōng Fēng', en: 'Liver 4', def: 'Jing-River of the Liver. On the dorsum of the foot, in front of the medial malleolus on the medial side of the tibialis anterior tendon.',
    defCn: '肝经第 4 穴；经穴；足背, in front of the medial malleolus 内侧 tibialis anterior tendon。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006038?courseId=245888516&name=%E4%B8%AD%E5%B0%81&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv6': { cn: '中都 · Zhōng Dū', en: 'Liver 6', def: 'Cleft point of the Liver. 7 cùn above the medial malleolus on the medial tibia border.',
    defCn: '肝经第 6 穴；郄穴；7 cùn above the medial malleolus 胫骨内侧 border。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006041?courseId=245888516&name=%E4%B8%AD%E9%83%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv8': { cn: '曲泉 · Qū Quán', en: 'Liver 8', def: 'He-Sea of the Liver. On the medial knee crease, in the depression at the medial end when the knee is flexed.',
    defCn: '肝经第 8 穴；合穴；膝内侧 crease, 凹陷处 at the medial end when the knee is flexed。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006043?courseId=245888516&name=%E6%9B%B2%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv9': { cn: '阴包 · Yīn Bāo', en: 'Liver 9', def: 'On the inner thigh, 4 cùn above the medial epicondyle of the femur, between sartorius and vastus medialis. 郭氏 lineage point for menstrual regulation, endometriosis, retroverted uterus.',
    defCn: '肝经第 9 穴；郭氏 lineage point for menstrual regulation, endometriosis, retroverted uterus。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006044?courseId=245888516&name=%E9%98%B4%E5%8C%85&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv13': { cn: '章门 · Zhāng Mén', en: 'Liver 13', def: 'Front-Mu of the Spleen; Eight-Influential Point for zang organs (脏会). Below the free end of the 11th rib.',
    defCn: '肝经第 13 穴；募穴；zang organs (脏会)。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006048?courseId=245888516&name=%E7%AB%A0%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv14': { cn: '期门 · Qī Mén', en: 'Liver 14', def: 'Front-Mu of the Liver. In the 6th intercostal space, 4 cùn lateral to the midline (directly below the nipple).',
    defCn: '肝经第 14 穴；募穴。', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006049?courseId=245888516&name=%E6%9C%9F%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  // Conception Vessel (CV5, CV14)
  'cv5': { cn: '石门 · Shí Mén', en: 'Conception Vessel 5', def: 'Front-Mu of the Triple Burner. On the lower abdomen midline, 2 cùn below the navel.',
    defCn: '任脉第 5 穴；募穴；下腹正中, 2 cùn 脐下。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006093?courseId=245888516&name=%E7%9F%B3%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'  },
  'cv14': { cn: '巨阙 · Jù Què', en: 'Conception Vessel 14', def: 'Front-Mu of the Heart. On the upper abdomen midline, 6 cùn above the navel.',
    defCn: '任脉第 14 穴；募穴；上腹正中, 6 cùn 脐上。', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006103?courseId=245888516&name=%E5%B7%A8%E9%98%99&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'  }
};

/* ---------- Lookup aliases (case-insensitive) ----------
   These let you write data-term="liver" or data-term="肝" or
   data-term="dang gui" and have it resolve to the right entry. */
const TERM_ALIASES = {
  // Organs
  'liver': 'liver-tcm',     '肝': 'liver-tcm',
  'heart': 'heart-tcm',     '心': 'heart-tcm',
  'spleen': 'spleen-tcm',   '脾': 'spleen-tcm',
  'lung': 'lung-tcm',       '肺': 'lung-tcm',
  'lungs': 'lung-tcm',
  'kidney': 'kidney-tcm',   '肾': 'kidney-tcm',  '腎': 'kidney-tcm',
  'gallbladder': 'gallbladder-tcm', '胆': 'gallbladder-tcm', '膽': 'gallbladder-tcm',
  'stomach': 'stomach-tcm', '胃': 'stomach-tcm',
  'small intestine': 'small-intestine-tcm', '小肠': 'small-intestine-tcm', '小腸': 'small-intestine-tcm',
  'large intestine': 'large-intestine-tcm', '大肠': 'large-intestine-tcm', '大腸': 'large-intestine-tcm',
  'bladder': 'bladder-tcm', '膀胱': 'bladder-tcm',
  'pericardium': 'pericardium-tcm', '心包': 'pericardium-tcm',
  'triple burner': 'sanjiao', 'san jiao': 'sanjiao', 'sanjiao': 'sanjiao', '三焦': 'sanjiao',

  // Concepts
  '气': 'qi', '氣': 'qi',
  '阴阳': 'yin-yang', '陰陽': 'yin-yang',
  '五行': 'wuxing',
  '精': 'jing',
  '神': 'shen',
  '经络': 'meridian', '經絡': 'meridian',
  '子午流注': 'ziwu-liuzhu',
  '黄帝内经': 'huangdi-neijing', '黃帝內經': 'huangdi-neijing',
  '地支': 'dizhi',
  '生肖': 'shengxiao',

  // Five elements
  '木': 'wood', '火': 'fire', '土': 'earth', '金': 'metal', '水': 'water',
  '相生': 'sheng-cycle', '相克': 'ke-cycle',

  // Five tones
  '角': 'jue-tone', '徵': 'zhi-tone', '宫': 'gong-tone', '宮': 'gong-tone',
  '商': 'shang-tone', '羽': 'yu-tone',

  // Spirits
  '魂': 'hun', '魄': 'po', '意': 'yi', '志': 'zhi',

  // Herbs
  '黄芪': 'huang-qi', '黃芪': 'huang-qi',
  '当归': 'dang-gui', '當歸': 'dang-gui',
  '枸杞': 'gou-qi',
  '柴胡': 'chai-hu',
  '生姜': 'sheng-jiang', '生薑': 'sheng-jiang',
  '大枣': 'da-zao', '大棗': 'da-zao',
  '茯苓': 'fu-ling',
  '人参': 'ren-shen', '人參': 'ren-shen',
  '甘草': 'gan-cao',
  '黄芩': 'huang-qin', '黃芩': 'huang-qin',
  '白芍': 'bai-shao',
  '百合': 'bai-he',
  '杏仁': 'xing-ren',
  '麦冬': 'mai-dong', '麥冬': 'mai-dong',
  '火麻仁': 'huo-ma-ren',
  '决明子': 'jue-ming-zi',
  '小米': 'xiao-mi',
  '白术': 'bai-zhu',
  '山药': 'shan-yao', '山藥': 'shan-yao',
  '丹参': 'dan-shen', '丹參': 'dan-shen',
  '酸枣仁': 'suan-zao-ren', '酸棗仁': 'suan-zao-ren',
  '柏子仁': 'bai-zi-ren',
  '泽泻': 'ze-xie', '澤瀉': 'ze-xie',
  '金钱草': 'jin-qian-cao', '金錢草': 'jin-qian-cao',
  '车前子': 'che-qian-zi', '車前子': 'che-qian-zi',
  '熟地黄': 'shu-di-huang', '熟地黃': 'shu-di-huang',
  '杜仲': 'du-zhong',
  '黑芝麻': 'hei-zhi-ma',
  '远志': 'yuan-zhi', '遠志': 'yuan-zhi',
  '合欢花': 'he-huan-hua', '合歡花': 'he-huan-hua',
  '陈皮': 'chen-pi', '陳皮': 'chen-pi',

  // Four-soups herbs
  '芡实': 'qian-shi', '芡實': 'qian-shi',
  '莲子': 'lian-zi', '蓮子': 'lian-zi',
  '薏苡仁': 'yi-yi-ren', '薏仁': 'yi-yi-ren', '薏米': 'yi-yi-ren',
  '附子': 'fu-zi', '附片': 'fu-zi',
  '干姜': 'gan-jiang', '乾薑': 'gan-jiang',
  '炙甘草': 'gan-cao',                              // honey-fried form → same monograph
  '川芎': 'chuan-xiong', '川弓': 'chuan-xiong',
  '党参': 'dang-shen', '黨參': 'dang-shen',
  '熟地': 'shu-di-huang',                            // common short form

  // Patterns
  '气虚': 'qi-deficiency', '氣虛': 'qi-deficiency',
  '阳虚': 'yang-deficiency', '陽虛': 'yang-deficiency',
  '阴虚': 'yin-deficiency', '陰虛': 'yin-deficiency',
  '血虚': 'blood-deficiency', '血虛': 'blood-deficiency',
  '湿热': 'damp-heat', '濕熱': 'damp-heat',
  '气滞': 'qi-stagnation', '氣滯': 'qi-stagnation',
  '血瘀': 'blood-stasis',

  // Diagnosis
  '舌诊': 'tongue-diagnosis', '舌診': 'tongue-diagnosis',
  '四诊': 'four-examinations', '四診': 'four-examinations',

  // Acupuncture vocabulary
  '针灸': 'acupuncture', '針灸': 'acupuncture',
  '归经': 'guijing', '歸經': 'guijing',
  '经络': 'jinglu', '經絡': 'jinglu',
  '十二经脉': 'twelve-meridians', '十二經脈': 'twelve-meridians', '十二正经': 'twelve-meridians',
  '奇经八脉': 'eight-extraordinary', '奇經八脈': 'eight-extraordinary',
  '督脉': 'du-mai', '督脈': 'du-mai',
  '任脉': 'ren-mai', '任脈': 'ren-mai',
  '五输穴': 'wu-shu-points', '五輸穴': 'wu-shu-points', '五腧穴': 'wu-shu-points',
  '井穴': 'jing-well',
  '荥穴': 'ying-spring', '滎穴': 'ying-spring',
  '输穴': 'shu-stream', '輸穴': 'shu-stream',
  '经穴': 'jing-river', '經穴': 'jing-river',
  '合穴': 'he-sea',
  '原穴': 'yuan-source',
  '络穴': 'luo-connecting', '絡穴': 'luo-connecting',
  '募穴': 'mu-front',
  '背俞穴': 'shu-back', '背腧穴': 'shu-back',
  '郄穴': 'xi-cleft',
  '下合穴': 'xia-he-lower',
  '八会穴': 'eight-meeting', '八會穴': 'eight-meeting',
  '八脉交会穴': 'eight-confluence', '八脈交會穴': 'eight-confluence',
  '八总穴': 'eight-totals', '八總穴': 'eight-totals',
  '阿是穴': 'ashi-points', '阿是': 'ashi-points',

  // Specific points (codes + Chinese)
  '足三里': 'st36', 'st36': 'st36', 'ST36': 'st36',
  '关元': 'cv4', '關元': 'cv4', 'cv4': 'cv4', 'CV4': 'cv4',
  '气海': 'cv6', '氣海': 'cv6', 'cv6': 'cv6', 'CV6': 'cv6',
  '神阙': 'cv8', '神闕': 'cv8', 'cv8': 'cv8', 'CV8': 'cv8',
  '命门': 'gv4', '命門': 'gv4', 'gv4': 'gv4', 'GV4': 'gv4',
  '内关': 'pc6', '內關': 'pc6', 'pc6': 'pc6', 'PC6': 'pc6',
  '水沟': 'gv26', '水溝': 'gv26', '人中': 'gv26', 'gv26': 'gv26', 'GV26': 'gv26', 'DU26': 'gv26',
  '三阴交': 'sp6', '三陰交': 'sp6', 'sp6': 'sp6', 'SP6': 'sp6',
  '阴陵泉': 'sp9', '陰陵泉': 'sp9', 'sp9': 'sp9', 'SP9': 'sp9',
  '血海': 'sp10', 'sp10': 'sp10', 'SP10': 'sp10',
  '太溪': 'ki3', '太谿': 'ki3', 'ki3': 'ki3', 'KI3': 'ki3',
  '照海': 'ki6', 'ki6': 'ki6', 'KI6': 'ki6',
  '太冲': 'lv3', '太衝': 'lv3', 'lv3': 'lv3', 'LV3': 'lv3', 'LR3': 'lv3',
  '合谷': 'li4', 'li4': 'li4', 'LI4': 'li4',
  '曲池': 'li11', 'li11': 'li11', 'LI11': 'li11',
  '大椎': 'gv14', 'gv14': 'gv14', 'GV14': 'gv14',
  '丰隆': 'st40', '豐隆': 'st40', 'st40': 'st40', 'ST40': 'st40',
  '中脘': 'cv12', 'cv12': 'cv12', 'CV12': 'cv12',
  '膻中': 'cv17', 'cv17': 'cv17', 'CV17': 'cv17',
  '膈俞': 'bl17', '膈腧': 'bl17', 'bl17': 'bl17', 'BL17': 'bl17',
  // ============================================================
  // rhky-deeplinked acupoints (probed and verified against the live
  // course at special.rhky.com).
  // ============================================================
  // Lung
  '中府': 'lu1', 'lu1': 'lu1', 'LU1': 'lu1',
  '云门': 'lu2', '雲門': 'lu2', 'lu2': 'lu2', 'LU2': 'lu2',
  '天府': 'lu3', 'lu3': 'lu3', 'LU3': 'lu3',
  '侠白': 'lu4', '俠白': 'lu4', 'lu4': 'lu4', 'LU4': 'lu4',
  '尺泽': 'lu5', '尺澤': 'lu5', 'lu5': 'lu5', 'LU5': 'lu5',
  '孔最': 'lu6', 'lu6': 'lu6', 'LU6': 'lu6',
  '列缺': 'lu7', 'lu7': 'lu7', 'LU7': 'lu7',
  // Large Intestine
  '商阳': 'li1', '商陽': 'li1', 'li1': 'li1', 'LI1': 'li1',
  '二间': 'li2', '二間': 'li2', 'li2': 'li2', 'LI2': 'li2',
  '手三里': 'li10', 'li10': 'li10', 'LI10': 'li10',
  // Stomach
  '上巨虚': 'st37', '上巨虛': 'st37', 'st37': 'st37', 'ST37': 'st37',
  '解溪': 'st41', '解谿': 'st41', 'st41': 'st41', 'ST41': 'st41',
  // Spleen
  '隐白': 'sp1', '隱白': 'sp1', 'sp1': 'sp1', 'SP1': 'sp1',
  '大都': 'sp2', 'sp2': 'sp2', 'SP2': 'sp2',
  '漏谷': 'sp7', 'sp7': 'sp7', 'SP7': 'sp7',
  '地机': 'sp8', '地機': 'sp8', 'sp8': 'sp8', 'SP8': 'sp8',
  '冲门': 'sp12', '衝門': 'sp12', 'sp12': 'sp12', 'SP12': 'sp12',
  // Bladder
  '睛明': 'bl1', 'bl1': 'bl1', 'BL1': 'bl1',
  '肺俞': 'bl13', '肺腧': 'bl13', 'bl13': 'bl13', 'BL13': 'bl13',
  // Kidney
  '涌泉': 'ki1', '湧泉': 'ki1', 'ki1': 'ki1', 'KI1': 'ki1',
  '然谷': 'ki2', 'ki2': 'ki2', 'KI2': 'ki2',
  // Liver
  '大敦': 'lv1', 'lv1': 'lv1', 'LV1': 'lv1', 'LR1': 'lv1',
  '行间': 'lv2', '行間': 'lv2', 'lv2': 'lv2', 'LV2': 'lv2', 'LR2': 'lv2',
  // Du Mai
  '腰俞': 'gv2', '腰腧': 'gv2', 'gv2': 'gv2', 'GV2': 'gv2',
  '哑门': 'gv15', '啞門': 'gv15', 'gv15': 'gv15', 'GV15': 'gv15',
  // Ren Mai
  '会阴': 'cv1', '會陰': 'cv1', 'cv1': 'cv1', 'CV1': 'cv1',
  '中极': 'cv3', '中極': 'cv3', 'cv3': 'cv3', 'CV3': 'cv3',
  '阴交': 'cv7', '陰交': 'cv7', 'cv7': 'cv7', 'CV7': 'cv7',
  '水分': 'cv9', 'cv9': 'cv9', 'CV9': 'cv9',
  '建里': 'cv11', 'cv11': 'cv11', 'CV11': 'cv11',
  '上脘': 'cv13', 'cv13': 'cv13', 'CV13': 'cv13',
  '承浆': 'cv24', '承漿': 'cv24', 'cv24': 'cv24', 'CV24': 'cv24',
  // Extra
  '八风': 'ba-feng', '八風': 'ba-feng',

  // ============================================================
  // Bulk acupoints (yibian-primary, baike-backup auto-derived)
  // covering 十六郄穴歌, 十二募穴, 十二经脉流注表, 妇科调经.
  // ============================================================
  // Lung
  '经渠': 'lu8', '經渠': 'lu8', 'lu8': 'lu8', 'LU8': 'lu8',
  '太渊': 'lu9', '太淵': 'lu9', 'lu9': 'lu9', 'LU9': 'lu9',
  '鱼际': 'lu10', '魚際': 'lu10', 'lu10': 'lu10', 'LU10': 'lu10',
  '少商': 'lu11', 'lu11': 'lu11', 'LU11': 'lu11',
  // Large Intestine
  '三间': 'li3', '三間': 'li3', 'li3': 'li3', 'LI3': 'li3',
  '阳溪': 'li5', '陽溪': 'li5', '陽谿': 'li5', 'li5': 'li5', 'LI5': 'li5',
  '温溜': 'li7', '溫溜': 'li7', 'li7': 'li7', 'LI7': 'li7',
  // Stomach
  '天枢': 'st25', '天樞': 'st25', 'st25': 'st25', 'ST25': 'st25',
  '梁丘': 'st34', 'st34': 'st34', 'ST34': 'st34',
  '冲阳': 'st42', '衝陽': 'st42', 'st42': 'st42', 'ST42': 'st42',
  '陷谷': 'st43', 'st43': 'st43', 'ST43': 'st43',
  '内庭': 'st44', '內庭': 'st44', 'st44': 'st44', 'ST44': 'st44',
  '厉兑': 'st45', '厲兌': 'st45', 'st45': 'st45', 'ST45': 'st45',
  // Spleen
  '太白': 'sp3', 'sp3': 'sp3', 'SP3': 'sp3',
  '商丘': 'sp5', 'sp5': 'sp5', 'SP5': 'sp5',
  // Heart
  '少海': 'ht3', 'ht3': 'ht3', 'HT3': 'ht3',
  '灵道': 'ht4', '靈道': 'ht4', 'ht4': 'ht4', 'HT4': 'ht4',
  '阴郄': 'ht6', '陰郄': 'ht6', 'ht6': 'ht6', 'HT6': 'ht6',
  '神门': 'ht7', '神門': 'ht7', 'ht7': 'ht7', 'HT7': 'ht7',
  '少府': 'ht8', 'ht8': 'ht8', 'HT8': 'ht8',
  '少冲': 'ht9', '少衝': 'ht9', 'ht9': 'ht9', 'HT9': 'ht9',
  // Small Intestine
  '少泽': 'si1', '少澤': 'si1', 'si1': 'si1', 'SI1': 'si1',
  '前谷': 'si2', 'si2': 'si2', 'SI2': 'si2',
  '后溪': 'si3', '後溪': 'si3', '後谿': 'si3', 'si3': 'si3', 'SI3': 'si3',
  '腕骨': 'si4', 'si4': 'si4', 'SI4': 'si4',
  '阳谷': 'si5', '陽谷': 'si5', 'si5': 'si5', 'SI5': 'si5',
  '养老': 'si6', '養老': 'si6', 'si6': 'si6', 'SI6': 'si6',
  '小海': 'si8', 'si8': 'si8', 'SI8': 'si8',
  // Bladder
  '肾俞': 'bl23', '腎俞': 'bl23', '腎腧': 'bl23', '肾腧': 'bl23', 'bl23': 'bl23', 'BL23': 'bl23',
  '八髎': 'baliao', 'baliao': 'baliao', 'BALIAO': 'baliao',
  // Migraine points
  '风池': 'gb20', '風池': 'gb20', 'gb20': 'gb20', 'GB20': 'gb20',
  '率谷': 'gb8', 'gb8': 'gb8', 'GB8': 'gb8',
  '百会': 'gv20', '百會': 'gv20', 'gv20': 'gv20', 'GV20': 'gv20', 'DU20': 'gv20',
  '风府': 'gv16', '風府': 'gv16', 'gv16': 'gv16', 'GV16': 'gv16', 'DU16': 'gv16',
  '角孙': 'te20', '角孫': 'te20', 'te20': 'te20', 'TE20': 'te20', 'SJ20': 'te20', 'TH20': 'te20',
  '丝竹空': 'te23', '絲竹空': 'te23', 'te23': 'te23', 'TE23': 'te23', 'SJ23': 'te23', 'TH23': 'te23',
  '外关': 'te5', '外關': 'te5', 'te5': 'te5', 'TE5': 'te5', 'SJ5': 'te5', 'TH5': 'te5',
  '天柱': 'bl10', 'bl10': 'bl10', 'BL10': 'bl10',
  '太阳': 'ex-taiyang', '太阳穴': 'ex-taiyang', '太陽': 'ex-taiyang', '太陽穴': 'ex-taiyang', 'EX-HN5': 'ex-taiyang',
  '委中': 'bl40', 'bl40': 'bl40', 'BL40': 'bl40',
  '跗阳': 'bl59', '跗陽': 'bl59', 'bl59': 'bl59', 'BL59': 'bl59',
  '昆仑': 'bl60', '崑崙': 'bl60', '崑仑': 'bl60', 'bl60': 'bl60', 'BL60': 'bl60',
  '金门': 'bl63', '金門': 'bl63', 'bl63': 'bl63', 'BL63': 'bl63',
  '京骨': 'bl64', 'bl64': 'bl64', 'BL64': 'bl64',
  '束骨': 'bl65', 'bl65': 'bl65', 'BL65': 'bl65',
  '足通谷': 'bl66', 'bl66': 'bl66', 'BL66': 'bl66',
  '至阴': 'bl67', '至陰': 'bl67', 'bl67': 'bl67', 'BL67': 'bl67',
  // Kidney
  '水泉': 'ki5', 'ki5': 'ki5', 'KI5': 'ki5',
  '复溜': 'ki7', '復溜': 'ki7', 'ki7': 'ki7', 'KI7': 'ki7',
  '交信': 'ki8', 'ki8': 'ki8', 'KI8': 'ki8',
  '筑宾': 'ki9', '築賓': 'ki9', 'ki9': 'ki9', 'KI9': 'ki9',
  '阴谷': 'ki10', '陰谷': 'ki10', 'ki10': 'ki10', 'KI10': 'ki10',
  // Pericardium
  '曲泽': 'pc3', '曲澤': 'pc3', 'pc3': 'pc3', 'PC3': 'pc3',
  '郄门': 'pc4', '郄門': 'pc4', 'pc4': 'pc4', 'PC4': 'pc4',
  '间使': 'pc5', '間使': 'pc5', 'pc5': 'pc5', 'PC5': 'pc5',
  '大陵': 'pc7', 'pc7': 'pc7', 'PC7': 'pc7',
  '劳宫': 'pc8', '勞宮': 'pc8', 'pc8': 'pc8', 'PC8': 'pc8',
  '中冲': 'pc9', '中衝': 'pc9', 'pc9': 'pc9', 'PC9': 'pc9',
  // Triple Burner
  '关冲': 'te1', '關衝': 'te1', 'te1': 'te1', 'TE1': 'te1', 'TH1': 'te1', 'SJ1': 'te1',
  '液门': 'te2', '液門': 'te2', 'te2': 'te2', 'TE2': 'te2', 'TH2': 'te2', 'SJ2': 'te2',
  '中渚': 'te3', 'te3': 'te3', 'TE3': 'te3', 'TH3': 'te3', 'SJ3': 'te3',
  '阳池': 'te4', '陽池': 'te4', 'te4': 'te4', 'TE4': 'te4', 'TH4': 'te4', 'SJ4': 'te4',
  '支沟': 'te6', '支溝': 'te6', 'te6': 'te6', 'TE6': 'te6', 'TH6': 'te6', 'SJ6': 'te6',
  '会宗': 'te7', '會宗': 'te7', 'te7': 'te7', 'TE7': 'te7', 'TH7': 'te7', 'SJ7': 'te7',
  '天井': 'te10', 'te10': 'te10', 'TE10': 'te10', 'TH10': 'te10', 'SJ10': 'te10',
  // Gallbladder
  '日月': 'gb24', 'gb24': 'gb24', 'GB24': 'gb24',
  '京门': 'gb25', '京門': 'gb25', 'gb25': 'gb25', 'GB25': 'gb25',
  '阳陵泉': 'gb34', '陽陵泉': 'gb34', 'gb34': 'gb34', 'GB34': 'gb34',
  '阳交': 'gb35', '陽交': 'gb35', 'gb35': 'gb35', 'GB35': 'gb35',
  '外丘': 'gb36', 'gb36': 'gb36', 'GB36': 'gb36',
  '阳辅': 'gb38', '陽輔': 'gb38', 'gb38': 'gb38', 'GB38': 'gb38',
  '丘墟': 'gb40', 'gb40': 'gb40', 'GB40': 'gb40',
  '足临泣': 'gb41', '足臨泣': 'gb41', 'gb41': 'gb41', 'GB41': 'gb41',
  '侠溪': 'gb43', '俠溪': 'gb43', '俠谿': 'gb43', 'gb43': 'gb43', 'GB43': 'gb43',
  '足窍阴': 'gb44', '足竅陰': 'gb44', 'gb44': 'gb44', 'GB44': 'gb44',
  // Liver
  '中封': 'lv4', 'lv4': 'lv4', 'LV4': 'lv4', 'LR4': 'lv4',
  '中都': 'lv6', 'lv6': 'lv6', 'LV6': 'lv6', 'LR6': 'lv6',
  '曲泉': 'lv8', 'lv8': 'lv8', 'LV8': 'lv8', 'LR8': 'lv8',
  '阴包': 'lv9', '陰包': 'lv9', 'lv9': 'lv9', 'LV9': 'lv9', 'LR9': 'lv9',
  '章门': 'lv13', '章門': 'lv13', 'lv13': 'lv13', 'LV13': 'lv13', 'LR13': 'lv13',
  '期门': 'lv14', '期門': 'lv14', 'lv14': 'lv14', 'LV14': 'lv14', 'LR14': 'lv14',
  // Conception Vessel
  '石门': 'cv5', '石門': 'cv5', 'cv5': 'cv5', 'CV5': 'cv5',
  '巨阙': 'cv14', '巨闕': 'cv14', 'cv14': 'cv14', 'CV14': 'cv14'
};

function lookupTerm(key) {
  if (!key) return null;
  const normalized = String(key).trim().toLowerCase();
  if (TERMS[normalized]) return TERMS[normalized];
  if (TERM_ALIASES[normalized]) return TERMS[TERM_ALIASES[normalized]];
  // Try the un-lowercased form for Chinese
  const raw = String(key).trim();
  if (TERMS[raw]) return TERMS[raw];
  if (TERM_ALIASES[raw]) return TERMS[TERM_ALIASES[raw]];
  return null;
}
