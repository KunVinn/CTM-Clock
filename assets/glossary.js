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
    url: 'https://en.wikipedia.org/wiki/Qi'
  },
  'yin-yang': {
    cn: '陰陽 / 阴阳 · Yīn Yáng', en: 'Yin–Yang',
    def: 'Two complementary, opposing forces whose dynamic balance underlies all natural phenomena.',
    url: 'https://en.wikipedia.org/wiki/Yin_and_yang'
  },
  'wuxing': {
    cn: '五行 · Wǔ Xíng', en: 'Five Phases / Five Elements',
    def: 'Wood, Fire, Earth, Metal, Water — five interrelated phases that mutually generate (相生) and control (相克).',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)'
  },
  'jing': {
    cn: '精 · Jīng', en: 'Essence',
    def: 'The deep, inherited substance stored chiefly in the Kidneys; foundation of growth, reproduction, and longevity.',
    url: 'https://en.wikipedia.org/wiki/Jing_(Chinese_medicine)'
  },
  'shen': {
    cn: '神 · Shén', en: 'Spirit / Mind',
    def: 'The luminous spirit-mind housed in the Heart; consciousness, presence, and emotional clarity.',
    url: 'https://en.wikipedia.org/wiki/Shen_(Chinese_religion)'
  },
  'meridian': {
    cn: '經絡 · Jīng Luò', en: 'Meridian / Channel',
    def: 'Networks through which qi and blood circulate, connecting organs to the surface of the body.',
    url: 'https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)'
  },
  'ziwu-liuzhu': {
    cn: '子午流注 · Zǐ Wǔ Liú Zhù', en: 'Midnight–Noon Ebb-and-Flow',
    def: 'The TCM theory that qi flows through the twelve organ meridians on a 24-hour cycle, with each meridian peaking in a specific two-hour window.',
    url: 'https://en.wikipedia.org/wiki/Chinese_clock'
  },
  'huangdi-neijing': {
    cn: '黃帝內經 · Huáng Dì Nèi Jīng', en: "Yellow Emperor's Inner Canon",
    def: 'The foundational classic of Chinese medicine, compiled c. 100 BCE; source of most TCM theory.',
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
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Wood',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'fire': {
    cn: '火 · Huǒ', en: 'Fire',
    def: 'The phase of summer and peak yang. Associated with Heart, Small Intestine, Pericardium, and Triple Burner.',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Fire',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'earth': {
    cn: '土 · Tǔ', en: 'Earth',
    def: 'The pivot phase of late summer, transformation, and nourishment. Associated with Spleen and Stomach.',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Earth',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'metal': {
    cn: '金 · Jīn', en: 'Metal',
    def: 'The phase of autumn, gathering, and letting go. Associated with Lung and Large Intestine.',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Metal',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'water': {
    cn: '水 · Shuǐ', en: 'Water',
    def: 'The phase of winter, storage, and depth. Associated with Kidney and Bladder.',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Water',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C'
  },
  'sheng-cycle': {
    cn: '相生 · Xiāng Shēng', en: 'Generation Cycle',
    def: 'The nourishing cycle: Wood→Fire→Earth→Metal→Water→Wood. Each phase generates the next.',
    url: 'https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)#Generating',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E8%A1%8C%E7%9B%B8%E7%94%9F%E7%9B%B8%E5%85%8B'
  },
  'ke-cycle': {
    cn: '相克 · Xiāng Kè', en: 'Control Cycle',
    def: 'The restraining cycle: Wood↔Earth, Fire↔Metal, Earth↔Water, Metal↔Wood, Water↔Fire. Each phase controls another.',
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
    url: 'https://en.wikipedia.org/wiki/Liver_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006030?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0+%E8%B6%B3%E5%8E%A5%E9%98%B4%E8%82%9D%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'
  },
  'heart-tcm': {
    cn: '心 · Xīn', en: 'Heart',
    def: 'The "emperor" organ; governs blood, houses the shén (spirit), and opens to the tongue.',
    url: 'https://en.wikipedia.org/wiki/Heart_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005800?courseId=245888516&name=%E7%AC%AC%E5%85%AD%E7%AB%A0+%E6%89%8B%E5%B0%91%E9%98%B4%E5%BF%83%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'
  },
  'spleen-tcm': {
    cn: '脾 · Pí', en: 'Spleen',
    def: 'Governs transformation of food into qi and blood; controls muscles, the four limbs, and houses yì (intent).',
    url: 'https://en.wikipedia.org/wiki/Spleen_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005774?courseId=245888516&name=%E7%AC%AC%E4%BA%94%E7%AB%A0+%E8%B6%B3%E5%A4%AA%E9%98%B4%E8%84%BE%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'lung-tcm': {
    cn: '肺 · Fèi', en: 'Lung',
    def: 'Governs qi and breathing, regulates the water passages, controls the skin, houses pò (corporeal soul).',
    url: 'https://en.wikipedia.org/wiki/Lung_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005650?courseId=245888516&name=%E7%AC%AC%E4%BA%8C%E7%AB%A0+%E6%89%8B%E5%A4%AA%E9%98%B4%E8%82%BA%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  'kidney-tcm': {
    cn: '腎 / 肾 · Shèn', en: 'Kidney',
    def: 'Stores essence (jīng), governs water, fills the bones and marrow, houses zhì (will).',
    url: 'https://en.wikipedia.org/wiki/Kidney_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005916?courseId=245888516&name=%E7%AC%AC%E4%B9%9D%E7%AB%A0+%E8%B6%B3%E5%B0%91%E9%98%B4%E8%82%BE%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'gallbladder-tcm': {
    cn: '膽 / 胆 · Dǎn', en: 'Gallbladder',
    def: 'Stores and secretes bile; governs decisiveness; paired with the Liver in the Wood phase.',
    url: 'https://en.wikipedia.org/wiki/Gallbladder_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005978?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%BA%8C%E7%AB%A0+%E8%B6%B3%E5%B0%91%E9%98%B3%E8%83%86%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'
  },
  'stomach-tcm': {
    cn: '胃 · Wèi', en: 'Stomach',
    def: 'The "sea of grain and water"; rots and ripens food. Paired with the Spleen in the Earth phase.',
    url: 'https://en.wikipedia.org/wiki/Stomach_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005718?courseId=245888516&name=%E7%AC%AC%E5%9B%9B%E7%AB%A0+%E8%B6%B3%E9%98%B3%E6%98%8E%E8%83%83%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'small-intestine-tcm': {
    cn: '小腸 / 小肠 · Xiǎo Cháng', en: 'Small Intestine',
    def: 'Separates the clear from the turbid in food. Paired with the Heart in the Fire phase.',
    url: 'https://en.wikipedia.org/wiki/Small_intestine_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005813?courseId=245888516&name=%E7%AC%AC%E4%B8%83%E7%AB%A0+%E6%89%8B%E5%A4%AA%E9%98%B3%E5%B0%8F%E8%82%A0%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'
  },
  'large-intestine-tcm': {
    cn: '大腸 / 大肠 · Dà Cháng', en: 'Large Intestine',
    def: 'Receives waste and conducts elimination. Paired with the Lung in the Metal phase.',
    url: 'https://en.wikipedia.org/wiki/Large_intestine_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005678?courseId=245888516&name=%E7%AC%AC%E4%B8%89%E7%AB%A0+%E6%89%8B%E9%98%B3%E6%98%8E%E5%A4%A7%E8%82%A0%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'bladder-tcm': {
    cn: '膀胱 · Páng Guāng', en: 'Bladder',
    def: 'Stores and excretes urine; its meridian runs the entire spine. Paired with the Kidney in the Water phase.',
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
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'zhi-tone': {
    cn: '徵音 · Zhǐ', en: 'Zhǐ (G)',
    def: 'Fire-element musical tone; warm, joyful; supports the Heart.',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'gong-tone': {
    cn: '宮音 / 宫音 · Gōng', en: 'Gōng (C)',
    def: 'Earth-element musical tone; centering, grounding; supports the Spleen.',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'shang-tone': {
    cn: '商音 · Shāng', en: 'Shāng (D)',
    def: 'Metal-element musical tone; crisp, clear; supports the Lung.',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },
  'yu-tone': {
    cn: '羽音 · Yǔ', en: 'Yǔ (A)',
    def: 'Water-element musical tone; deep, anchoring; supports the Kidney.',
    url: 'https://en.wikipedia.org/wiki/Pentatonic_scale#Chinese_Pentatonic',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E9%9F%B3'
  },

  // ================== FIVE SPIRITS (五神) ==================
  'hun': {
    cn: '魂 · Hún', en: 'Ethereal Soul',
    def: 'The "yang soul" housed in the Liver; governs imagination, dreams, plans, and life-vision.',
    url: 'https://en.wikipedia.org/wiki/Hun_and_po',
    urlCn: 'https://baike.baidu.com/item/%E4%B8%89%E9%AD%82%E4%B8%83%E9%AD%84'
  },
  'po': {
    cn: '魄 · Pò', en: 'Corporeal Soul',
    def: 'The "yin soul" housed in the Lung; governs reflexes, sensations, and bodily instinct.',
    url: 'https://en.wikipedia.org/wiki/Hun_and_po',
    urlCn: 'https://baike.baidu.com/item/%E4%B8%89%E9%AD%82%E4%B8%83%E9%AD%84'
  },
  'yi': {
    cn: '意 · Yì', en: 'Intent',
    def: 'The aspect of mind housed in the Spleen; thought, focused attention, intention.',
    url: 'https://en.wikipedia.org/wiki/Spleen_(Chinese_medicine)',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E5%BF%97'
  },
  'zhi': {
    cn: '志 · Zhì', en: 'Will',
    def: 'The aspect of mind housed in the Kidney; willpower, memory, determination.',
    url: 'https://en.wikipedia.org/wiki/Kidney_(Chinese_medicine)',
    urlCn: 'https://baike.baidu.com/item/%E4%BA%94%E5%BF%97'
  },

  // ================== HERBS ==================
  'huang-qi': {
    cn: '黃芪 / 黄芪 · Huáng Qí', en: 'Astragalus root',
    def: 'A primary qi tonic; strengthens the Spleen and Lung, raises sinking qi, secures the exterior.',
    url: 'https://en.wikipedia.org/wiki/Astragalus_propinquus'
  },
  'dang-gui': {
    cn: '當歸 / 当归 · Dāng Guī', en: 'Angelica sinensis root',
    def: 'A premier blood tonic; nourishes the Liver, invigorates blood circulation, regulates menstruation.',
    url: 'https://en.wikipedia.org/wiki/Angelica_sinensis'
  },
  'gou-qi': {
    cn: '枸杞 · Gǒu Qǐ', en: 'Goji berry / Wolfberry',
    def: 'Sweet, neutral; tonifies Liver and Kidney essence, brightens the eyes, nourishes blood.',
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
    url: 'https://en.wikipedia.org/wiki/Ginger'
  },
  'da-zao': {
    cn: '大棗 / 大枣 · Dà Zǎo', en: 'Chinese date / Jujube',
    def: 'Sweet, warm; tonifies Spleen qi, nourishes blood, calms the spirit.',
    url: 'https://en.wikipedia.org/wiki/Jujube'
  },
  'fu-ling': {
    cn: '茯苓 · Fú Líng', en: 'Poria mushroom',
    def: 'Sweet, bland, neutral; drains dampness, strengthens the Spleen, calms the spirit.',
    url: 'https://en.wikipedia.org/wiki/Wolfiporia_extensa'
  },
  'qian-shi': {
    cn: '芡实 · Qiàn Shí', en: 'Euryale seed (Fox-nut)',
    def: 'Sweet, astringent, neutral; tonifies the Spleen and Kidney, stops diarrhea, secures essence (jīng), restrains turbid leucorrhoea.',
    url: 'https://en.wikipedia.org/wiki/Euryale_ferox'
  },
  'lian-zi': {
    cn: '莲子 · Lián Zǐ', en: 'Lotus seed',
    def: 'Sweet, astringent, neutral; tonifies Spleen and Kidney, calms the Heart spirit, restrains seminal/leucorrheal discharge. The plumule (莲子心) is bitter and clears Heart fire.',
    url: 'https://en.wikipedia.org/wiki/Nelumbo_nucifera'
  },
  'yi-yi-ren': {
    cn: '薏苡仁 · Yì Yǐ Rén', en: 'Job\'s tears / Coix seed',
    def: 'Sweet, bland, slightly cool; drains dampness, strengthens Spleen, expels pus, eases joint pain (痹). Often shortened to 薏仁 / 薏米.',
    url: 'https://en.wikipedia.org/wiki/Coix_lacryma-jobi'
  },
  'fu-zi': {
    cn: '附子 · Fù Zǐ', en: 'Aconite (prepared)',
    def: 'Acrid, very hot, TOXIC raw — must be processed (paozhi) and decocted long. Restores devastated yang, warms the Kidneys, expels cold from the channels. Cardinal herb of 四逆汤.',
    url: 'https://en.wikipedia.org/wiki/Aconitum_carmichaelii'
  },
  'gan-jiang': {
    cn: '干姜 · Gān Jiāng', en: 'Dried ginger',
    def: 'Acrid, hot; warms the middle burner, restores yang, warms the Lung and transforms phlegm. Distinct from fresh ginger 生姜 — drier and more deeply warming.',
    url: 'https://en.wikipedia.org/wiki/Ginger'
  },
  'chuan-xiong': {
    cn: '川芎 · Chuān Xiōng', en: 'Szechuan lovage rhizome',
    def: 'Acrid, warm; the chief blood-mover that also moves qi, expels wind, stops pain — particularly headaches. Pairs with 当归 to circulate while nourishing.',
    url: 'https://en.wikipedia.org/wiki/Ligusticum_striatum'
  },
  'dang-shen': {
    cn: '党参 · Dǎng Shēn', en: 'Codonopsis root',
    def: 'Sweet, neutral; tonifies the middle-burner qi, generates fluids, supports Lung qi. Often substituted for the more expensive 人参 in everyday formulas.',
    url: 'https://en.wikipedia.org/wiki/Codonopsis_pilosula'
  },
  'ren-shen': {
    cn: '人參 / 人参 · Rén Shēn', en: 'Ginseng',
    def: 'A powerful tonic for original qi (yuán qì); supports Lung and Spleen, generates fluids, calms the spirit.',
    url: 'https://en.wikipedia.org/wiki/Panax_ginseng'
  },
  'gan-cao': {
    cn: '甘草 · Gān Cǎo', en: 'Licorice root',
    def: 'Harmonises herbs in formulas; tonifies Spleen qi, moistens the Lungs, resolves toxicity.',
    url: 'https://en.wikipedia.org/wiki/Glycyrrhiza_uralensis'
  },
  'huang-qin': {
    cn: '黃芩 / 黄芩 · Huáng Qín', en: 'Scutellaria root',
    def: 'Bitter, cold; clears heat and damp-heat, particularly in the upper burner.',
    url: 'https://en.wikipedia.org/wiki/Scutellaria_baicalensis'
  },
  'bai-shao': {
    cn: '白芍 · Bái Sháo', en: 'White Peony root',
    def: 'Sour, bitter; nourishes Liver blood, calms the Liver, softens cramping.',
    url: 'https://en.wikipedia.org/wiki/Paeonia_lactiflora'
  },
  'bai-he': {
    cn: '百合 · Bǎi Hé', en: 'Lily bulb',
    def: 'Sweet, slightly cold; moistens the Lung, calms the spirit, gently nourishes yin.',
    url: 'https://en.wikipedia.org/wiki/Lilium_brownii'
  },
  'xing-ren': {
    cn: '杏仁 · Xìng Rén', en: 'Bitter apricot kernel',
    def: 'Bitter; descends and disperses Lung qi, stops cough, moistens the intestines.',
    url: 'https://en.wikipedia.org/wiki/Apricot_kernel'
  },
  'mai-dong': {
    cn: '麥冬 / 麦冬 · Mài Dōng', en: 'Ophiopogon root',
    def: 'Sweet, slightly cold; moistens Lung yin, generates fluids, calms the heart.',
    url: 'https://en.wikipedia.org/wiki/Ophiopogon_japonicus'
  },
  'huo-ma-ren': {
    cn: '火麻仁 · Huǒ Má Rén', en: 'Hemp seed',
    def: 'Sweet, neutral; moistens the intestines, gently relieves dryness-type constipation.',
    url: 'https://en.wikipedia.org/wiki/Cannabis_seed'
  },
  'jue-ming-zi': {
    cn: '决明子 · Jué Míng Zǐ', en: 'Cassia seed',
    def: 'Bitter, sweet; clears Liver heat, brightens the eyes, moistens the intestines.',
    url: 'https://en.wikipedia.org/wiki/Senna_obtusifolia'
  },
  'xiao-mi': {
    cn: '小米 · Xiǎo Mǐ', en: 'Foxtail millet',
    def: 'Sweet, salty, slightly cool; nourishes the Spleen-Stomach, generates fluids.',
    url: 'https://en.wikipedia.org/wiki/Foxtail_millet'
  },
  'bai-zhu': {
    cn: '白术 · Bái Zhú', en: 'Atractylodes rhizome',
    def: 'Bitter, sweet, warm; tonifies Spleen qi, dries dampness, stops sweating.',
    url: 'https://en.wikipedia.org/wiki/Atractylodes_macrocephala'
  },
  'shan-yao': {
    cn: '山藥 / 山药 · Shān Yào', en: 'Chinese yam',
    def: 'Sweet, neutral; tonifies Spleen, Lung, and Kidney; nourishes yin without dampness.',
    url: 'https://en.wikipedia.org/wiki/Dioscorea_polystachya'
  },
  'dan-shen': {
    cn: '丹參 / 丹参 · Dān Shēn', en: 'Salvia root',
    def: 'Bitter, slightly cold; invigorates blood, removes stasis, calms the spirit.',
    url: 'https://en.wikipedia.org/wiki/Salvia_miltiorrhiza'
  },
  'suan-zao-ren': {
    cn: '酸棗仁 / 酸枣仁 · Suān Zǎo Rén', en: 'Sour jujube seed',
    def: 'Sweet, sour, neutral; calms the spirit, treats insomnia and night sweats.',
    url: 'https://en.wikipedia.org/wiki/Ziziphus_jujuba'
  },
  'bai-zi-ren': {
    cn: '柏子仁 · Bǎi Zǐ Rén', en: 'Biota seed',
    def: 'Sweet, neutral; calms the spirit, nourishes the Heart, moistens the intestines.',
    url: 'https://en.wikipedia.org/wiki/Platycladus'
  },
  'ze-xie': {
    cn: '澤瀉 / 泽泻 · Zé Xiè', en: 'Alisma rhizome',
    def: 'Sweet, bland, cold; promotes urination, drains damp-heat from the lower burner.',
    url: 'https://en.wikipedia.org/wiki/Alisma'
  },
  'jin-qian-cao': {
    cn: '金錢草 / 金钱草 · Jīn Qián Cǎo', en: 'Lysimachia',
    def: 'Sweet, salty, cool; clears damp-heat, treats stones in the urinary tract.',
    url: 'https://en.wikipedia.org/wiki/Lysimachia_christinae'
  },
  'che-qian-zi': {
    cn: '車前子 / 车前子 · Chē Qián Zǐ', en: 'Plantago seed',
    def: 'Sweet, cold; promotes urination, clears heat from the eyes and lungs.',
    url: 'https://en.wikipedia.org/wiki/Plantago_asiatica'
  },
  'shu-di-huang': {
    cn: '熟地黃 / 熟地黄 · Shú Dì Huáng', en: 'Prepared rehmannia',
    def: 'Sweet, slightly warm; nourishes Liver and Kidney yin and blood; rich and cloying.',
    url: 'https://en.wikipedia.org/wiki/Rehmannia_glutinosa'
  },
  'du-zhong': {
    cn: '杜仲 · Dù Zhòng', en: 'Eucommia bark',
    def: 'Sweet, slightly warm; tonifies Liver and Kidney yang; strengthens the lower back and knees.',
    url: 'https://en.wikipedia.org/wiki/Eucommia_ulmoides'
  },
  'hei-zhi-ma': {
    cn: '黑芝麻 · Hēi Zhī Má', en: 'Black sesame',
    def: 'Sweet, neutral; tonifies Liver and Kidney; nourishes blood and essence; moistens the intestines.',
    url: 'https://en.wikipedia.org/wiki/Sesame'
  },
  'yuan-zhi': {
    cn: '遠志 / 远志 · Yuǎn Zhì', en: 'Polygala root',
    def: 'Bitter, pungent, slightly warm; calms the spirit, opens the heart-mind, expels phlegm.',
    url: 'https://en.wikipedia.org/wiki/Polygala_tenuifolia'
  },
  'he-huan-hua': {
    cn: '合歡花 / 合欢花 · Hé Huān Huā', en: 'Albizia flower',
    def: 'Sweet, neutral; calms the spirit, relieves emotional stagnation, lifts depression.',
    url: 'https://en.wikipedia.org/wiki/Albizia_julibrissin'
  },
  'chen-pi': {
    cn: '陳皮 / 陈皮 · Chén Pí', en: 'Aged tangerine peel',
    def: 'Pungent, bitter, warm; regulates qi, harmonises the Stomach, transforms damp phlegm.',
    url: 'https://en.wikipedia.org/wiki/Citrus_reticulata'
  },

  // ================== TONGUE & DIAGNOSIS ==================
  'tongue-diagnosis': {
    cn: '舌診 / 舌诊 · Shé Zhěn', en: 'Tongue Diagnosis',
    def: 'A core TCM diagnostic method evaluating tongue body color, shape, coating, and moisture.',
    page: 'tongue.html'
  },
  'four-examinations': {
    cn: '四診 / 四诊 · Sì Zhěn', en: 'Four Examinations',
    def: 'The four diagnostic methods of TCM: 望 (looking), 聞 (listening/smelling), 問 (asking), 切 (pulse-taking).',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Diagnostic_principles'
  },

  // ================== TCM PATTERNS ==================
  'qi-deficiency': {
    cn: '氣虛 / 气虚 · Qì Xū', en: 'Qi Deficiency',
    def: 'Fatigue, shortness of breath, weak voice, pale tongue; the root weakness pattern in TCM.',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'yang-deficiency': {
    cn: '陽虛 / 阳虚 · Yáng Xū', en: 'Yang Deficiency',
    def: 'Coldness, fatigue, low libido, pale-and-puffy tongue; insufficient warming, activating energy.',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'yin-deficiency': {
    cn: '陰虛 / 阴虚 · Yīn Xū', en: 'Yin Deficiency',
    def: 'Heat sensations, night sweats, dry mouth, red tongue with little coating; insufficient cooling, moistening substance.',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'blood-deficiency': {
    cn: '血虛 / 血虚 · Xuè Xū', en: 'Blood Deficiency',
    def: 'Pale complexion, dizziness, brittle nails, scant menstruation, pale tongue.',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'damp-heat': {
    cn: '濕熱 / 湿热 · Shī Rè', en: 'Damp-Heat',
    def: 'Heaviness with heat signs; thick yellow tongue coating, foul-smelling discharges, irritability.',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'qi-stagnation': {
    cn: '氣滯 / 气滞 · Qì Zhì', en: 'Qi Stagnation',
    def: 'Distension, irritability, irregular cycles; qi flow is blocked. Often a Liver-qi pattern.',
    url: 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine#Disharmony'
  },
  'blood-stasis': {
    cn: '血瘀 · Xuè Yū', en: 'Blood Stasis',
    def: 'Fixed, sharp pains; purple tongue or sublingual veins; blood circulation is impeded.',
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
    url: 'https://en.wikipedia.org/wiki/Acupuncture',
    page: 'acupuncture.html'
  },
  'guijing': {
    cn: '归经 · Guī Jīng', en: 'Channel Attribution',
    def: 'The principle that each medicinal substance (and each acupoint) has an affinity for specific meridians and so directly affects those organ systems.',
    url: 'https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)'
  },
  'jinglu': {
    cn: '经络 · Jīng Luò', en: 'Channels & Collaterals',
    def: 'The complete meridian system: the 12 main channels (正经), the 8 extraordinary vessels (奇经八脉), and the smaller branching collaterals (络脉) and their offshoots.',
    url: 'https://en.wikipedia.org/wiki/Meridian_(Chinese_medicine)',
    page: 'acupuncture.html'
  },
  'twelve-meridians': {
    cn: '十二正经 · Shí Èr Zhèng Jīng', en: 'Twelve Main Meridians',
    def: 'The twelve principal channels — six yin (Lung, Pericardium, Heart, Spleen, Liver, Kidney) and six yang (Large Intestine, Triple Burner, Small Intestine, Stomach, Gallbladder, Bladder).',
    url: 'https://yibian.hopto.org/'
  },
  'eight-extraordinary': {
    cn: '奇经八脉 · Qí Jīng Bā Mài', en: 'Eight Extraordinary Vessels',
    def: 'Eight non-main vessels — Du, Ren, Chong, Dai, Yin/Yang Wei, Yin/Yang Qiao — that act as reservoirs and regulators for the twelve main meridians.',
    url: 'https://en.wikipedia.org/wiki/Eight_Extraordinary_Channels'
  },
  'du-mai': {
    cn: '督脉 · Dū Mài', en: 'Governor Vessel',
    def: 'The "Sea of Yang Channels" running up the back midline from the perineum to the upper lip; governs all yang qi in the body.',
    url: 'https://en.wikipedia.org/wiki/Governing_vessel',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006050?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E5%9B%9B%E7%AB%A0+%E7%9D%A3%E8%84%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'ren-mai': {
    cn: '任脉 · Rèn Mài', en: 'Conception Vessel',
    def: 'The "Sea of Yin Channels" running up the front midline from the perineum to the lower lip; governs all yin and is central to gynecology and fertility.',
    url: 'https://en.wikipedia.org/wiki/Conception_vessel',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006086?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%BA%94%E7%AB%A0+%E4%BB%BB%E8%84%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },

  // Five-Shu point system
  'wu-shu-points': {
    cn: '五输穴 · Wǔ Shū Xué', en: 'Five-Shu Points',
    def: 'Five points on each of the 12 main channels, distal to the elbow/knee, classically described as the river-flow of qi: 井 jǐng (Well, source), 荥 xíng (Spring), 输 shū (Stream), 经 jīng (River), 合 hé (Sea).',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'jing-well': {
    cn: '井穴 · Jǐng Xué', en: 'Well Point',
    def: 'Where qi "issues forth" — the most distal point on each channel (fingertip/toe). Used for emergency revival, mental confusion, and 心下满 (epigastric fullness).',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'ying-spring': {
    cn: '荥穴 · Xíng Xué', en: 'Spring Point',
    def: 'Where qi "glides" — the second point. Classically: "荥主身热 · Xíng zhǔ shēn rè" — chiefly used for febrile diseases and heat patterns.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'shu-stream': {
    cn: '输穴 · Shū Xué', en: 'Stream Point',
    def: 'Where qi "pours" — the third point. Classically: "输主体重节痛" — heaviness and joint pain. On yin meridians, the Stream point doubles as the Source (原) point.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'jing-river': {
    cn: '经穴 · Jīng Xué', en: 'River Point',
    def: 'Where qi "moves through" — the fourth point. Classically: "经主喘咳寒热" — wheezing, cough, alternating chills and fever.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'he-sea': {
    cn: '合穴 · Hé Xué', en: 'Sea / Uniting Point',
    def: 'Where qi "enters" the deeper body — the fifth point, near elbow or knee. Classically: "合主逆气而泄" — counterflow qi and diarrhea; preferred for 六腑 (yang-organ) disorders.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },

  // Special point categories
  'yuan-source': {
    cn: '原穴 · Yuán Xué', en: 'Source Point',
    def: 'Where the original qi (元气) of the organ surfaces — twelve points, one per channel. Used to diagnose and treat the deepest disorders of the parent organ. (《灵枢》: "五脏有疾，当取之十二原.")',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'luo-connecting': {
    cn: '络穴 · Luò Xué', en: 'Connecting / Network Point',
    def: 'Fifteen points that bridge a yin-yang meridian pair. Used in 原络配穴 — pairing the source point of the diseased channel with the connecting point of its paired channel for synergy.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'mu-front': {
    cn: '募穴 · Mù Xué', en: 'Front-Mu / Alarm Point',
    def: 'Twelve points on the chest and abdomen where each organ\'s qi gathers. Tender on palpation when the corresponding organ is in distress; classically paired with the back-shu point.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'shu-back': {
    cn: '背俞穴 · Bèi Shù Xué', en: 'Back-Shu / Transport Point',
    def: 'Twelve paired points on the inner Bladder line of the upper-back, each corresponding to a specific organ. Pairs with the front-Mu point for diagnosis and treatment of internal disorders.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'xi-cleft': {
    cn: '郄穴 · Xī Xué', en: 'Cleft / Accumulation Point',
    def: 'Sixteen "deep gathering" points where qi and blood concentrate. Especially used for acute and painful conditions of the related channel.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'xia-he-lower': {
    cn: '下合穴 · Xià Hé Xué', en: 'Lower-Uniting Points',
    def: 'Six points below the knee where each yang-organ\'s qi "comes to ground." Per 《灵枢》: "合治六腑" — these are the points of choice for disorders of the six fu organs.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'eight-meeting': {
    cn: '八会穴 · Bā Huì Xué', en: 'Eight Influential Points',
    def: 'Eight points where the qi of a class of substance gathers: zang (CV12 中脘), fu (LV13 章门 — note: actually 脏会), qi (CV17 膻中), blood (BL17 膈俞), tendon (GB34 阳陵泉), vessel (LU9 太渊), bone (BL11 大杼), marrow (GB39 悬钟).',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'eight-confluence': {
    cn: '八脉交会穴 · Bā Mài Jiāo Huì Xué', en: 'Eight Confluence Points',
    def: 'Eight points on the limbs where the eight extraordinary vessels meet the main channels: SP4-PC6, GB41-TE5, SI3-BL62, LU7-KI6 — used in classical pairs.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'eight-totals': {
    cn: '八总穴 · Bā Zǒng Xué', en: 'Eight Master Points',
    def: 'A clinical mnemonic for the most-used points by region: ST36 for abdomen, BL40 for low back, LU7 for head/neck, LI4 for face/mouth, PC6 for chest/heart, SP6 for lower abdomen, ashi for pain, GV26 for emergencies.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },
  'ashi-points': {
    cn: '阿是穴 · Ā Shì Xué', en: 'Ashi Points',
    def: 'Tender or "ouch" points — sites of palpable tenderness that are not on a numbered meridian. Used for local pain treatment.',
    url: 'https://en.wikipedia.org/wiki/Acupuncture_point'
  },

  // Specific high-frequency points (most used in our acupoint suggestions)
  'st36': {
    cn: '足三里 · Zú Sān Lǐ', en: 'Stomach 36',
    def: 'Master point for tonifying qi and strengthening the Spleen-Stomach. Located four fingers below the kneecap, one finger lateral to the shinbone. Classical line: "肚腹三里留" — for any abdominal disorder, look to ST36.',
    url: 'https://yibian.hopto.org/shu/?sid=6961',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005760?courseId=245888516&name=%E8%B6%B3%E4%B8%89%E9%87%8C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'cv4': {
    cn: '关元 · Guān Yuán', en: 'Conception Vessel 4',
    def: '"Gate of Origin." 3 cùn below the navel on the midline. The most foundational point for tonifying yang and original qi. Classical indirect-moxa point for 阳虚 (yang deficiency) and cold patterns.',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006092?courseId=245888516&name=%E5%85%B3%E5%85%83&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv6': {
    cn: '气海 · Qì Hǎi', en: 'Conception Vessel 6',
    def: '"Sea of Qi." 1.5 cùn below the navel. Replenishes qi throughout the body; classical point for fatigue and qi deficiency.',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006095?courseId=245888516&name=%E6%B0%94%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv8': {
    cn: '神阙 · Shén Què', en: 'Conception Vessel 8',
    def: 'The center of the navel. Salt-and-ginger moxibustion on this point warms interior cold and lifts collapsed yang. Never needled.',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006097?courseId=245888516&name=%E7%A5%9E%E9%98%99&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'gv4': {
    cn: '命门 · Mìng Mén', en: 'Governor Vessel 4',
    def: '"Gate of Life." Between L2 and L3 spinous processes (level with the navel). Kindles kidney yang and warms the body core; indispensable for chronic cold-deficiency back pain.',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006054?courseId=245888516&name=%E5%91%BD%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'sp6': {
    cn: '三阴交 · Sān Yīn Jiāo', en: 'Spleen 6',
    def: 'Crossing point of the three foot-yin meridians (Spleen, Liver, Kidney). 3 cùn above the inner ankle, behind the tibia. Powerful for nourishing yin, blood, and the lower abdomen. (Avoid in pregnancy.)',
    url: 'https://yibian.hopto.org/shu/?sid=6962',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005780?courseId=245888516&name=%E4%B8%89%E9%98%B4%E4%BA%A4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'sp9': {
    cn: '阴陵泉 · Yīn Líng Quán', en: 'Spleen 9',
    def: 'Master point for resolving dampness — He-Sea point of the Spleen channel. Inner shin, depression below and behind the head of the tibia.',
    url: 'https://yibian.hopto.org/shu/?sid=6962',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005785?courseId=245888516&name=%E9%98%B4%E9%99%B5%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'sp10': {
    cn: '血海 · Xuè Hǎi', en: 'Spleen 10',
    def: '"Sea of Blood." 2 cùn above the upper border of the kneecap on the inner thigh. Foremost point for any blood disorder — moves and nourishes blood.',
    url: 'https://yibian.hopto.org/shu/?sid=6962',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005786?courseId=245888516&name=%E8%A1%80%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'ki3': {
    cn: '太溪 · Tài Xī', en: 'Kidney 3',
    def: 'Source point of the Kidney channel. In the depression between the inner ankle bone and the Achilles tendon. Replenishes kidney essence, yin, and yang.',
    url: 'https://yibian.hopto.org/shu/?sid=6964',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005919?courseId=245888516&name=%E5%A4%AA%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'ki6': {
    cn: '照海 · Zhào Hǎi', en: 'Kidney 6',
    def: 'Confluence point for the Yin Qiao Vessel. Below the inner ankle bone. Cools yin-deficiency heat, calms the spirit, treats night insomnia and dry throat.',
    url: 'https://yibian.hopto.org/shu/?sid=6964',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005922?courseId=245888516&name=%E7%85%A7%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'lv3': {
    cn: '太冲 · Tài Chōng', en: 'Liver 3',
    def: 'Source point of the Liver. In the V where the 1st and 2nd metatarsal bones meet on top of the foot. The foremost point for moving stagnant Liver qi and calming irritability.',
    url: 'https://yibian.hopto.org/shu/?sid=6966',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006036?courseId=245888516&name=%E5%A4%AA%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'
  },
  'li4': {
    cn: '合谷 · Hé Gǔ', en: 'Large Intestine 4',
    def: 'Source point of the Large Intestine, master point for the face. Between thumb and index finger. Combined with LV3 forms the "Four Gates" — opens qi flow throughout the body. (Avoid in pregnancy.)',
    url: 'https://yibian.hopto.org/shu/?sid=6967',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005692?courseId=245888516&name=%E5%90%88%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'li11': {
    cn: '曲池 · Qū Chí', en: 'Large Intestine 11',
    def: 'He-Sea point of the Large Intestine. At the outer end of the elbow crease. Powerful heat-clearer for skin, fever, and digestive heat.',
    url: 'https://yibian.hopto.org/shu/?sid=6967',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005707?courseId=245888516&name=%E6%9B%B2%E6%B1%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'gv14': {
    cn: '大椎 · Dà Zhuī', en: 'Governor Vessel 14',
    def: '"Great Hammer." Below C7 (the most prominent vertebra at the neck base). Meeting of all six yang channels — releases excess heat and treats all febrile diseases.',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006065?courseId=245888516&name=%E5%A4%A7%E6%A4%8E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'gv26': {
    cn: '水沟 · Shuǐ Gōu', en: 'Governor Vessel 26 (人中 / Rén Zhōng)',
    def: 'Also known as 人中. Upper third of the philtrum (the groove between nose and upper lip). The classical emergency-revival point — open the orifices, restore consciousness, treat fainting, sunstroke, shock, acute lumbar sprain. A firm pinch with thumbnail is the canonical first-aid technique.',
    url: 'https://yibian.hopto.org/shu/?sid=6944',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006078?courseId=245888516&name=%E6%B0%B4%E6%B2%9F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'st40': {
    cn: '丰隆 · Fēng Lóng', en: 'Stomach 40',
    def: 'Connecting (Luo) point of the Stomach channel. The classical "phlegm-resolving" point — used whenever phlegm (湿痰) is present.',
    url: 'https://yibian.hopto.org/shu/?sid=6961',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005765?courseId=245888516&name=%E4%B8%B0%E9%9A%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'cv12': {
    cn: '中脘 · Zhōng Wǎn', en: 'Conception Vessel 12',
    def: 'Front-Mu of the Stomach AND Influential Point for the Fu organs. Halfway between the breastbone tip and the navel. Warms the middle burner and harmonizes the entire digestive system.',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006101?courseId=245888516&name=%E4%B8%AD%E8%84%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv17': {
    cn: '膻中 · Dàn Zhōng', en: 'Conception Vessel 17',
    def: 'Influential Point for Qi AND Front-Mu of the Pericardium. Midpoint of the breastbone, level with the nipples. Releases chest oppression, calms emotional bottling, regulates breath.',
    url: 'https://yibian.hopto.org/shu/?sid=6943',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006106?courseId=245888516&name=%E8%86%BB%E4%B8%AD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'bl17': {
    cn: '膈俞 · Gé Shù', en: 'Bladder 17',
    def: 'Influential Point for Blood. On the back, level with the lower edge of the shoulder blade. Used for any blood disorder — stasis, deficiency, or hemorrhage.',
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
  'lu1': {
    cn: '中府 · Zhōng Fǔ', en: 'Lung 1',
    def: 'Front-Mu of the Lung. On the upper chest, 6 cùn lateral to the midline at the 1st intercostal space. Tonifies Lung qi; treats cough and chest oppression.',
    url: 'https://yibian.hopto.org/shu/?sid=6968',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005652?courseId=245888516&name=%E4%B8%AD%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  'lu2': {
    cn: '云门 · Yún Mén', en: 'Lung 2',
    def: 'On the upper chest in the depression below the lateral end of the clavicle, 6 cùn lateral to the midline. Disperses Lung qi; treats chest fullness and shoulder pain.',
    url: 'https://yibian.hopto.org/shu/?sid=6968',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005656?courseId=245888516&name=%E4%BA%91%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'
  },
  'li1': {
    cn: '商阳 · Shāng Yáng', en: 'Large Intestine 1',
    def: 'Jǐng-Well point of the Large Intestine. On the radial side of the index fingertip, 0.1 cùn proximal to the corner of the nail. Clears heat from the head and face; classical first-aid bleeding point for wind-heat sore throat.',
    url: 'https://yibian.hopto.org/shu/?sid=6967',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005685?courseId=245888516&name=%E5%95%86%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=',
    urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'
  },

  // ============================================================
  // Acupoints discovered via probing the rhky course (May 2026).
  // All card IDs verified by direct page fetch.
  // ============================================================
  // ---- Lung 肺经 (sid=6968) ----
  'lu3': { cn: '天府 · Tiān Fǔ', en: 'Lung 3', def: 'On the anterior arm, 3 cun below the anterior axillary fold, on the radial border of the biceps brachii. Regulates Lung qi; treats cough, asthma, and nosebleed.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005658?courseId=245888516&name=%E5%A4%A9%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu4': { cn: '侠白 · Xiá Bái', en: 'Lung 4', def: 'On the anterior arm, 4 cun below the anterior axillary fold, on the radial border of the biceps. Diffuses Lung qi; treats chest pain and arm pain.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005660?courseId=245888516&name=%E4%BE%A0%E7%99%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu5': { cn: '尺泽 · Chǐ Zé', en: 'Lung 5', def: 'He-Sea point of the Lung. In the cubital crease on the radial side of the biceps tendon. Clears Lung heat, descends Lung qi.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005662?courseId=245888516&name=%E5%B0%BA%E6%B3%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu6': { cn: '孔最 · Kǒng Zuì', en: 'Lung 6', def: 'Xi-Cleft point of the Lung. On the forearm, 7 cun above the wrist crease on the line connecting LU5 and LU9. Clears Lung heat, stops bleeding (especially nosebleed and hemoptysis).', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005664?courseId=245888516&name=%E5%AD%94%E6%9C%80&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  'lu7': { cn: '列缺 · Liè Quē', en: 'Lung 7', def: 'Luo-Connecting point of the Lung; one of the Four Command Points (head and neck). On the radial wrist, 1.5 cun above the crease. Diffuses Lung qi, expels exterior wind.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005666?courseId=245888516&name=%E5%88%97%E7%BC%BA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968' },
  // ---- Large Intestine 大肠经 (sid=6967) ----
  'li2': { cn: '二间 · Èr Jiān', en: 'Large Intestine 2', def: 'Ying-Spring point of the Large Intestine. On the radial side of the 2nd metacarpophalangeal joint at the red-white skin border. Clears heat from the head, face, and throat.', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005687?courseId=245888516&name=%E4%BA%8C%E9%97%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967' },
  'li10': { cn: '手三里 · Shǒu Sān Lǐ', en: 'Large Intestine 10', def: 'On the forearm, 2 cun below the elbow crease on the LI4–LI11 line. Opens channels, regulates qi, treats arm and shoulder pain.', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005705?courseId=245888516&name=%E6%89%8B%E4%B8%89%E9%87%8C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967' },
  // ---- Stomach 胃经 (sid=6961) ----
  'st37': { cn: '上巨虚 · Shàng Jù Xū', en: 'Stomach 37', def: 'Lower-He-Sea point of the Large Intestine. On the lower leg, 6 cun below ST35. Harmonizes the intestines; treats abdominal pain, diarrhea, dysentery.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005762?courseId=245888516&name=%E4%B8%8A%E5%B7%A8%E8%99%9A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961' },
  'st41': { cn: '解溪 · Xiè Xī', en: 'Stomach 41', def: 'Jing-River point of the Stomach. In the central ankle depression in front of the joint, between the two tendons. Clears heat, calms the spirit; treats headache, dizziness, ankle pain.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005766?courseId=245888516&name=%E8%A7%A3%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961' },
  // ---- Spleen 脾经 (sid=6962) ----
  'sp1': { cn: '隐白 · Yǐn Bái', en: 'Spleen 1', def: 'Jing-Well point of the Spleen. On the medial side of the great toe, 0.1 cun proximal to the corner of the nail. Strengthens the Spleen, restores yang; treats excessive menstruation and bleeding disorders.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005775?courseId=245888516&name=%E9%9A%90%E7%99%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp2': { cn: '大都 · Dà Dū', en: 'Spleen 2', def: 'Ying-Spring point of the Spleen. On the foot, in the depression at the red-white skin border distal to the 1st metatarsophalangeal joint. Strengthens the Spleen, drains heat.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005776?courseId=245888516&name=%E5%A4%A7%E9%83%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp7': { cn: '漏谷 · Lòu Gǔ', en: 'Spleen 7', def: 'On the inner leg, 6 cun above the medial malleolus, on the posterior border of the medial tibia. Strengthens the Spleen, drains dampness.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005783?courseId=245888516&name=%E6%BC%8F%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp8': { cn: '地机 · Dì Jī', en: 'Spleen 8', def: 'Xi-Cleft point of the Spleen. On the inner leg, 3 cun below SP9, on the medial tibia border. Regulates menstruation, drains dampness.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005784?courseId=245888516&name=%E5%9C%B0%E6%9C%BA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  'sp12': { cn: '冲门 · Chōng Mén', en: 'Spleen 12', def: 'In the inguinal region along the inguinal crease, lateral to the femoral artery. Regulates qi, treats hernia and abdominal pain.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005788?courseId=245888516&name=%E5%86%B2%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962' },
  // ---- Bladder 膀胱经 (sid=6963) ----
  'bl1': { cn: '睛明 · Jīng Míng', en: 'Bladder 1', def: 'On the face, in the depression medial to the inner canthus of the eye. Clears heat, brightens the eyes; the principal point for eye disease.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005846?courseId=245888516&name=%E7%9D%9B%E6%98%8E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963' },
  'bl13': { cn: '肺俞 · Fèi Shù', en: 'Bladder 13', def: 'Back-Shu of the Lung. 1.5 cun lateral to the spine, level with the lower border of T3. Nourishes Lung yin, clears heat, regulates Lung qi.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005860?courseId=245888516&name=%E8%82%BA%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963' },
  // ---- Kidney 肾经 (sid=6964) ----
  'ki1': { cn: '涌泉 · Yǒng Quán', en: 'Kidney 1', def: 'Jing-Well point of the Kidney. On the sole of the foot, in the depression appearing when the foot is flexed. Nourishes yin, calms wind, awakens consciousness, opens the orifices.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005917?courseId=245888516&name=%E6%B6%8C%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964' },
  'ki2': { cn: '然谷 · Rán Gǔ', en: 'Kidney 2', def: 'Ying-Spring point of the Kidney. On the medial foot, in the depression below the navicular tuberosity. Nourishes yin, supplements the kidneys, clears heat.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005918?courseId=245888516&name=%E7%84%B6%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964' },
  // ---- Liver 肝经 (sid=6966) ----
  'lv1': { cn: '大敦 · Dà Dūn', en: 'Liver 1', def: 'Jing-Well point of the Liver. On the dorsum of the great toe, 0.1 cun proximal to the corner of the nail. Soothes the Liver, calms wind, settles the spirit.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006032?courseId=245888516&name=%E5%A4%A7%E6%95%A6&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966' },
  'lv2': { cn: '行间 · Xíng Jiān', en: 'Liver 2', def: 'Ying-Spring point of the Liver. On the foot, between the 1st and 2nd toes at the proximal end of the web margin. Soothes Liver fire, calms wind.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006034?courseId=245888516&name=%E8%A1%8C%E9%97%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966' },
  // ---- Du Mai 督脉 (sid=6944) ----
  'gv2': { cn: '腰俞 · Yāo Shù', en: 'Governor Vessel 2', def: 'On the lower back, in the depression of the sacral hiatus. Tonifies the kidneys, strengthens the lower back, regulates menstruation.', url: 'https://yibian.hopto.org/shu/?sid=6944', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006052?courseId=245888516&name=%E8%85%B0%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944' },
  'gv15': { cn: '哑门 · Yǎ Mén', en: 'Governor Vessel 15', def: 'On the back of the neck, in the depression above the spinous process of C2 on the posterior midline. Opens consciousness, awakens the spirit, dispels wind.', url: 'https://yibian.hopto.org/shu/?sid=6944', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006066?courseId=245888516&name=%E5%93%91%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6944' },
  // ---- Ren Mai 任脉 (sid=6943) ----
  'cv1': { cn: '会阴 · Huì Yīn', en: 'Conception Vessel 1', def: 'In the perineum, between the anus and the genitals. Regulates menstruation, tonifies the kidneys, clears damp-heat.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006088?courseId=245888516&name=%E4%BC%9A%E9%98%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv3': { cn: '中极 · Zhōng Jí', en: 'Conception Vessel 3', def: 'On the lower abdomen, 4 cun below the navel on the anterior midline. Front-Mu of the Bladder. Benefits the kidneys, opens channels.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006091?courseId=245888516&name=%E4%B8%AD%E6%9E%81&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv7': { cn: '阴交 · Yīn Jiāo', en: 'Conception Vessel 7', def: 'On the lower abdomen, 1 cun below the navel on the anterior midline. Treats abdominal pain, edema, menstrual irregularities.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006096?courseId=245888516&name=%E9%98%B4%E4%BA%A4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv9': { cn: '水分 · Shuǐ Fèn', en: 'Conception Vessel 9', def: 'On the upper abdomen, 1 cun above the navel on the anterior midline. Drains dampness, regulates water passages.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006098?courseId=245888516&name=%E6%B0%B4%E5%88%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv11': { cn: '建里 · Jiàn Lǐ', en: 'Conception Vessel 11', def: 'On the upper abdomen, 3 cun above the navel on the anterior midline. Harmonizes the Stomach, regulates qi.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006100?courseId=245888516&name=%E5%BB%BA%E9%87%8C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv13': { cn: '上脘 · Shàng Wǎn', en: 'Conception Vessel 13', def: 'On the upper abdomen, 5 cun above the navel on the anterior midline. Strengthens the Spleen-Stomach, regulates qi, treats vomiting and indigestion.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006102?courseId=245888516&name=%E4%B8%8A%E8%84%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  'cv24': { cn: '承浆 · Chéng Jiāng', en: 'Conception Vessel 24', def: 'On the face, in the depression in the centre of the mentolabial groove. Calms wind, clears heat, treats facial paralysis and toothache.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006113?courseId=245888516&name=%E6%89%BF%E6%B5%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },
  // ---- Extra (奇穴) ----
  'ba-feng': { cn: '八风 · Bā Fēng', en: 'EX-LE10 (Eight Winds)', def: 'Eight extra-meridian points on the dorsum of each foot, in the depressions at the proximal margin of each web between adjacent toes. Treats foot swelling, toe numbness, and headaches.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006159?courseId=245888516&name=%E5%85%AB%E9%A3%8E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943' },

  // ============================================================
  // Compact acupoint entries — every point referenced in the
  // 十六郄穴歌, 十二募穴, 十二经脉流注表, and 妇科调经 sections.
  // No rhky deep-link yet (would require per-card probing); the
  // tooltip routes to yibian as primary and auto-derives a Baidu
  // Baike backup via pickBackupUrl().
  // ============================================================
  // Lung (LU8-LU11)
  'lu8': { cn: '经渠 · Jīng Qú', en: 'Lung 8', def: 'Jing-River point of the Lung. On the wrist, 1 cùn proximal to the radial pulse.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005668?courseId=245888516&name=%E7%BB%8F%E6%B8%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  'lu9': { cn: '太渊 · Tài Yuān', en: 'Lung 9', def: 'Yuan-Source and Stream point of the Lung; Eight-Influential Point for vessels (脉会). On the radial wrist crease.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005670?courseId=245888516&name=%E5%A4%AA%E6%B8%8A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  'lu10': { cn: '鱼际 · Yú Jì', en: 'Lung 10', def: 'Ying-Spring point of the Lung. On the palm, midpoint of the 1st metacarpal at the red-white skin border.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005672?courseId=245888516&name=%E9%B1%BC%E9%99%85&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  'lu11': { cn: '少商 · Shào Shāng', en: 'Lung 11', def: 'Jing-Well point of the Lung. On the radial side of the thumb. Emergency revival; acute throat heat.', url: 'https://yibian.hopto.org/shu/?sid=6968', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005674?courseId=245888516&name=%E5%B0%91%E5%95%86&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6968'  },
  // Large Intestine (LI3, LI5, LI7)
  'li3': { cn: '三间 · Sān Jiān', en: 'Large Intestine 3', def: 'Stream point of the LI. On the dorsum of the hand, in the depression on the radial side of the 2nd metacarpophalangeal joint.', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005690?courseId=245888516&name=%E4%B8%89%E9%97%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'  },
  'li5': { cn: '阳溪 · Yáng Xī', en: 'Large Intestine 5', def: 'Jing-River point of the LI. In the anatomical snuffbox on the radial wrist.', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005694?courseId=245888516&name=%E9%98%B3%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'  },
  'li7': { cn: '温溜 · Wēn Liū', en: 'Large Intestine 7', def: 'Cleft point of the LI channel. On the back forearm, 5 cùn above the wrist crease.', url: 'https://yibian.hopto.org/shu/?sid=6967', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005698?courseId=245888516&name=%E6%B8%A9%E6%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6967'  },
  // Stomach (ST25, ST34, ST42, ST43, ST44, ST45)
  'st25': { cn: '天枢 · Tiān Shū', en: 'Stomach 25', def: 'Front-Mu of the Large Intestine. 2 cùn lateral to the navel. Treats abdominal pain, constipation, diarrhea.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005748?courseId=245888516&name=%E5%A4%A9%E6%9E%A2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st34': { cn: '梁丘 · Liáng Qiū', en: 'Stomach 34', def: 'Cleft point of the Stomach. On the front thigh, 2 cùn above the upper lateral border of the patella. Acute stomach pain.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005758?courseId=245888516&name=%E6%A2%81%E4%B8%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st42': { cn: '冲阳 · Chōng Yáng', en: 'Stomach 42', def: 'Yuan-Source of the Stomach. On the dorsum of the foot, on the highest point of the dorsum.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005767?courseId=245888516&name=%E5%86%B2%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st43': { cn: '陷谷 · Xiàn Gǔ', en: 'Stomach 43', def: 'Stream point of the Stomach. On the foot dorsum, in the depression distal to the 2nd-3rd metatarsal junction.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005769?courseId=245888516&name=%E9%99%B7%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st44': { cn: '内庭 · Nèi Tíng', en: 'Stomach 44', def: 'Ying-Spring of the Stomach. Between the 2nd and 3rd toes at the proximal end of the web. Clears stomach heat.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005771?courseId=245888516&name=%E5%86%85%E5%BA%AD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  'st45': { cn: '厉兑 · Lì Duì', en: 'Stomach 45', def: 'Jing-Well of the Stomach. On the lateral side of the 2nd toe.', url: 'https://yibian.hopto.org/shu/?sid=6961', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005772?courseId=245888516&name=%E5%8E%89%E5%85%91&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6961'  },
  // Spleen (SP3, SP5)
  'sp3': { cn: '太白 · Tài Bái', en: 'Spleen 3', def: 'Yuan-Source and Stream of the Spleen. On the medial foot, proximal to the 1st metatarsophalangeal joint at the red-white skin border.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005777?courseId=245888516&name=%E5%A4%AA%E7%99%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'  },
  'sp5': { cn: '商丘 · Shāng Qiū', en: 'Spleen 5', def: 'Jing-River of the Spleen. On the medial foot, in the depression anterior and inferior to the medial malleolus.', url: 'https://yibian.hopto.org/shu/?sid=6962', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005779?courseId=245888516&name=%E5%95%86%E4%B8%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6962'  },
  // Heart (HT3, HT4, HT6, HT7, HT8, HT9)
  'ht3': { cn: '少海 · Shào Hǎi', en: 'Heart 3', def: 'He-Sea point of the Heart. On the medial elbow crease, just anterior to the medial epicondyle.', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005804?courseId=245888516&name=%E5%B0%91%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht4': { cn: '灵道 · Líng Dào', en: 'Heart 4', def: 'Jing-River of the Heart. On the inner forearm, 1.5 cùn proximal to the wrist crease.', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005805?courseId=245888516&name=%E7%81%B5%E9%81%93&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht6': { cn: '阴郄 · Yīn Xī', en: 'Heart 6', def: 'Cleft point of the Heart. On the inner forearm, 0.5 cùn proximal to the wrist crease, on the radial side of the FCU tendon.', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005807?courseId=245888516&name=%E9%98%B4%E9%83%84&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht7': { cn: '神门 · Shén Mén', en: 'Heart 7', def: 'Yuan-Source and Stream of the Heart. On the inner wrist crease. Calms the spirit; treats insomnia and palpitations.', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005809?courseId=245888516&name=%E7%A5%9E%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht8': { cn: '少府 · Shào Fǔ', en: 'Heart 8', def: 'Ying-Spring of the Heart. On the palm, between the 4th and 5th metacarpals.', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005810?courseId=245888516&name=%E5%B0%91%E5%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  'ht9': { cn: '少冲 · Shào Chōng', en: 'Heart 9', def: 'Jing-Well of the Heart. On the radial side of the little fingertip. Emergency revival.', url: 'https://yibian.hopto.org/shu/?sid=6970', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005811?courseId=245888516&name=%E5%B0%91%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6970'  },
  // Small Intestine (SI1-SI6, SI8)
  'si1': { cn: '少泽 · Shào Zé', en: 'Small Intestine 1', def: 'Jing-Well of the SI. On the ulnar side of the little fingertip. Postpartum lactation insufficiency.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005814?courseId=245888516&name=%E5%B0%91%E6%B3%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si2': { cn: '前谷 · Qián Gǔ', en: 'Small Intestine 2', def: 'Ying-Spring of the SI. On the ulnar side of the 5th MCP joint at the red-white skin border.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005815?courseId=245888516&name=%E5%89%8D%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si3': { cn: '后溪 · Hòu Xī', en: 'Small Intestine 3', def: 'Stream point of the SI; Confluent point of the Du Mai. On the ulnar side of the 5th metacarpal head when fist is loosely clenched.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005816?courseId=245888516&name=%E5%90%8E%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si4': { cn: '腕骨 · Wàn Gǔ', en: 'Small Intestine 4', def: 'Yuan-Source of the SI. On the ulnar wrist, between the 5th metacarpal base and the triquetral.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005817?courseId=245888516&name=%E8%85%95%E9%AA%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si5': { cn: '阳谷 · Yáng Gǔ', en: 'Small Intestine 5', def: 'Jing-River of the SI. On the ulnar wrist, between the styloid process of the ulna and the triquetral.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005818?courseId=245888516&name=%E9%98%B3%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si6': { cn: '养老 · Yǎng Lǎo', en: 'Small Intestine 6', def: 'Cleft point of the SI. On the ulnar wrist, in the bony cleft on the radial side of the styloid process of the ulna.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005820?courseId=245888516&name=%E5%85%BB%E8%80%81&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  'si8': { cn: '小海 · Xiǎo Hǎi', en: 'Small Intestine 8', def: 'He-Sea of the SI. In the depression between the medial epicondyle of the humerus and the olecranon.', url: 'https://yibian.hopto.org/shu/?sid=6969', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005822?courseId=245888516&name=%E5%B0%8F%E6%B5%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6969'  },
  // Bladder (BL23, 八髎, BL40, BL59, BL60, BL63, BL64, BL65, BL66, BL67)
  'bl23': { cn: '肾俞 · Shèn Shù', en: 'Bladder 23', def: 'Back-Shu of the Kidney. 1.5 cùn lateral to the spine, level with L2. Tonifies kidney essence and yang.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005870?courseId=245888516&name=%E8%82%BE%E4%BF%9E&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'baliao': { cn: '八髎 · Bā Liáo', en: 'BL31-34 group', def: 'Eight points over the four pairs of sacral foramina (BL31-34). Used for menstrual regulation, infertility, retroverted uterus, dysmenorrhea.', url: 'https://yibian.hopto.org/shu/?sid=6963' },
  'bl40': { cn: '委中 · Wěi Zhōng', en: 'Bladder 40', def: 'He-Sea of the Bladder; Four Command Point for low back. In the centre of the popliteal fossa.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005888?courseId=245888516&name=%E5%A7%94%E4%B8%AD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl59': { cn: '跗阳 · Fū Yáng', en: 'Bladder 59', def: 'Cleft point of the Yang Qiao Vessel. On the back of the lower leg, 3 cùn above BL60.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005907?courseId=245888516&name=%E8%B7%97%E9%98%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl60': { cn: '昆仑 · Kūn Lún', en: 'Bladder 60', def: 'Jing-River of the Bladder. In the depression between the lateral malleolus and the Achilles tendon. Treats headache, neck stiffness, low back pain.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005908?courseId=245888516&name=%E6%98%86%E4%BB%91&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl63': { cn: '金门 · Jīn Mén', en: 'Bladder 63', def: 'Cleft point of the Bladder. On the lateral foot, posterior to the tuberosity of the 5th metatarsal base.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005911?courseId=245888516&name=%E9%87%91%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl64': { cn: '京骨 · Jīng Gǔ', en: 'Bladder 64', def: 'Yuan-Source of the Bladder. On the lateral foot, at the proximal-inferior corner of the 5th metatarsal base.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005912?courseId=245888516&name=%E4%BA%AC%E9%AA%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl65': { cn: '束骨 · Shù Gǔ', en: 'Bladder 65', def: 'Stream point of the Bladder. On the lateral foot, posterior to the 5th MTP joint at the red-white skin border.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005913?courseId=245888516&name=%E6%9D%9F%E9%AA%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl66': { cn: '足通谷 · Zú Tōng Gǔ', en: 'Bladder 66', def: 'Ying-Spring of the Bladder. On the lateral foot, anterior to the 5th MTP joint.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005914?courseId=245888516&name=%E8%B6%B3%E9%80%9A%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  'bl67': { cn: '至阴 · Zhì Yīn', en: 'Bladder 67', def: 'Jing-Well of the Bladder. On the lateral side of the little toe. Classical malposition-of-fetus moxa point.', url: 'https://yibian.hopto.org/shu/?sid=6963', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005915?courseId=245888516&name=%E8%87%B3%E9%98%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6963'  },
  // Kidney (KI5, KI7, KI8, KI9, KI10)
  'ki5': { cn: '水泉 · Shuǐ Quán', en: 'Kidney 5', def: 'Cleft point of the Kidney. 1 cùn directly below KI3.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005921?courseId=245888516&name=%E6%B0%B4%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki7': { cn: '复溜 · Fù Liū', en: 'Kidney 7', def: 'Jing-River of the Kidney. 2 cùn above KI3, anterior to the Achilles tendon. Tonifies kidney yin and yang.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005923?courseId=245888516&name=%E5%A4%8D%E6%BA%9C&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki8': { cn: '交信 · Jiāo Xìn', en: 'Kidney 8', def: 'Cleft point of the Yin Qiao Vessel. 2 cùn above KI3, 0.5 cùn anterior to KI7.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005924?courseId=245888516&name=%E4%BA%A4%E4%BF%A1&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki9': { cn: '筑宾 · Zhù Bīn', en: 'Kidney 9', def: 'Cleft point of the Yin Wei Vessel. 5 cùn above KI3 on the line connecting KI3 and KI10.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005925?courseId=245888516&name=%E7%AD%91%E5%AE%BE&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  'ki10': { cn: '阴谷 · Yīn Gǔ', en: 'Kidney 10', def: 'He-Sea of the Kidney. On the medial knee, in the depression between the tendons of semitendinosus and semimembranosus.', url: 'https://yibian.hopto.org/shu/?sid=6964', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005926?courseId=245888516&name=%E9%98%B4%E8%B0%B7&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6964'  },
  // Pericardium (PC3, PC4, PC5, PC7, PC8, PC9)
  'pc3': { cn: '曲泽 · Qū Zé', en: 'Pericardium 3', def: 'He-Sea of the Pericardium. On the elbow crease, on the ulnar side of the biceps tendon. Cools heart and stomach heat.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005947?courseId=245888516&name=%E6%9B%B2%E6%B3%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc4': { cn: '郄门 · Xī Mén', en: 'Pericardium 4', def: 'Cleft point of the Pericardium. On the inner forearm, 5 cùn proximal to the wrist crease. Acute heart pain.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005948?courseId=245888516&name=%E9%83%84%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc5': { cn: '间使 · Jiān Shǐ', en: 'Pericardium 5', def: 'Jing-River of the Pericardium. On the inner forearm, 3 cùn proximal to the wrist crease.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005949?courseId=245888516&name=%E9%97%B4%E4%BD%BF&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc6': { cn: '内关 · Nèi Guān', en: 'Pericardium 6', def: 'Luo-Connecting point of the Pericardium; Confluent point of the Yin Wei Vessel. Inner forearm, 2 cùn (3 finger-widths) above the wrist crease, between PL and FCR tendons. Settles the heart, calms the spirit, harmonizes the stomach, stops nausea — chief point for chest oppression, palpitations, motion sickness, gastric pain.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005950?courseId=245888516&name=%E5%86%85%E5%85%B3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972' },
  'pc7': { cn: '大陵 · Dà Líng', en: 'Pericardium 7', def: 'Yuan-Source and Stream of the Pericardium. On the wrist crease between the FCR and PL tendons. Calms the spirit; treats heart-fire.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005951?courseId=245888516&name=%E5%A4%A7%E9%99%B5&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc8': { cn: '劳宫 · Láo Gōng', en: 'Pericardium 8', def: 'Ying-Spring of the Pericardium. In the centre of the palm, where the tip of the middle finger touches when the fist is clenched.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005952?courseId=245888516&name=%E5%8A%B3%E5%AE%AB&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  'pc9': { cn: '中冲 · Zhōng Chōng', en: 'Pericardium 9', def: 'Jing-Well of the Pericardium. On the tip of the middle finger. Emergency revival.', url: 'https://yibian.hopto.org/shu/?sid=6972', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005953?courseId=245888516&name=%E4%B8%AD%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6972'  },
  // Triple Burner (TE1-TE4, TE6, TE7, TE10)
  'te1': { cn: '关冲 · Guān Chōng', en: 'Triple Burner 1', def: 'Jing-Well of the TE. On the ulnar side of the ring fingertip.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005955?courseId=245888516&name=%E5%85%B3%E5%86%B2&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te2': { cn: '液门 · Yè Mén', en: 'Triple Burner 2', def: 'Ying-Spring of the TE. On the dorsum of the hand, between the 4th and 5th MCP joints when the fist is clenched.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005956?courseId=245888516&name=%E6%B6%B2%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te3': { cn: '中渚 · Zhōng Zhǔ', en: 'Triple Burner 3', def: 'Stream point of the TE. On the dorsum of the hand, in the depression proximal to the 4th-5th MCP junction.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005957?courseId=245888516&name=%E4%B8%AD%E6%B8%9A&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te4': { cn: '阳池 · Yáng Chí', en: 'Triple Burner 4', def: 'Yuan-Source of the TE. On the dorsum of the wrist, on the ulnar side of the EDC tendon.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005958?courseId=245888516&name=%E9%98%B3%E6%B1%A0&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te6': { cn: '支沟 · Zhī Gōu', en: 'Triple Burner 6', def: 'Jing-River of the TE. On the back forearm, 3 cùn proximal to the wrist crease, between the radius and ulna. Treats constipation and intercostal neuralgia.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005960?courseId=245888516&name=%E6%94%AF%E6%B2%9F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te7': { cn: '会宗 · Huì Zōng', en: 'Triple Burner 7', def: 'Cleft point of the TE. On the back forearm, 3 cùn above the wrist crease, 1 finger ulnar to TE6.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005961?courseId=245888516&name=%E4%BC%9A%E5%AE%97&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  'te10': { cn: '天井 · Tiān Jǐng', en: 'Triple Burner 10', def: 'He-Sea of the TE. On the back of the elbow, 1 cùn proximal to the olecranon.', url: 'https://yibian.hopto.org/shu/?sid=6971', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005964?courseId=245888516&name=%E5%A4%A9%E4%BA%95&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6971'  },
  // Gallbladder (GB24, GB25, GB34, GB35, GB36, GB38, GB40, GB41, GB43, GB44)
  'gb24': { cn: '日月 · Rì Yuè', en: 'Gallbladder 24', def: 'Front-Mu of the Gallbladder. In the 7th intercostal space, 4 cùn lateral to the midline.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006003?courseId=245888516&name=%E6%97%A5%E6%9C%88&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb25': { cn: '京门 · Jīng Mén', en: 'Gallbladder 25', def: 'Front-Mu of the Kidney. On the side waist, below the free end of the 12th rib.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006004?courseId=245888516&name=%E4%BA%AC%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb34': { cn: '阳陵泉 · Yáng Líng Quán', en: 'Gallbladder 34', def: 'He-Sea of the GB; Eight-Influential Point for sinews (筋会). Below and anterior to the head of the fibula.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006015?courseId=245888516&name=%E9%98%B3%E9%99%B5%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb35': { cn: '阳交 · Yáng Jiāo', en: 'Gallbladder 35', def: 'Cleft point of the Yang Wei Vessel. 7 cùn above the lateral malleolus on the posterior border of the fibula.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006016?courseId=245888516&name=%E9%98%B3%E4%BA%A4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb36': { cn: '外丘 · Wài Qiū', en: 'Gallbladder 36', def: 'Cleft point of the GB. 7 cùn above the lateral malleolus on the anterior border of the fibula.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006017?courseId=245888516&name=%E5%A4%96%E4%B8%98&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb38': { cn: '阳辅 · Yáng Fǔ', en: 'Gallbladder 38', def: 'Jing-River of the GB. 4 cùn above the lateral malleolus on the anterior border of the fibula.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006021?courseId=245888516&name=%E9%98%B3%E8%BE%85&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb40': { cn: '丘墟 · Qiū Xū', en: 'Gallbladder 40', def: 'Yuan-Source of the GB. In the depression in front and below the lateral malleolus, on the lateral side of EDL.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006023?courseId=245888516&name=%E4%B8%98%E5%A2%9F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb41': { cn: '足临泣 · Zú Lín Qì', en: 'Gallbladder 41', def: 'Stream point of the GB; Confluent point of the Dài Mài (Belt Vessel). On the dorsum of the foot, distal to the 4th-5th metatarsal junction.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006024?courseId=245888516&name=%E8%B6%B3%E4%B8%B4%E6%B3%A3&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb43': { cn: '侠溪 · Xiá Xī', en: 'Gallbladder 43', def: 'Ying-Spring of the GB. On the dorsum of the foot, between the 4th and 5th toes at the proximal end of the web.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006026?courseId=245888516&name=%E4%BE%A0%E6%BA%AA&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  'gb44': { cn: '足窍阴 · Zú Qiào Yīn', en: 'Gallbladder 44', def: 'Jing-Well of the GB. On the lateral side of the 4th toe.', url: 'https://yibian.hopto.org/shu/?sid=6965', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006028?courseId=245888516&name=%E8%B6%B3%E7%AA%8D%E9%98%B4&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6965'  },
  // Liver (LV4, LV6, LV8, LV9, LV13, LV14)
  'lv4': { cn: '中封 · Zhōng Fēng', en: 'Liver 4', def: 'Jing-River of the Liver. On the dorsum of the foot, in front of the medial malleolus on the medial side of the tibialis anterior tendon.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006038?courseId=245888516&name=%E4%B8%AD%E5%B0%81&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv6': { cn: '中都 · Zhōng Dū', en: 'Liver 6', def: 'Cleft point of the Liver. 7 cùn above the medial malleolus on the medial tibia border.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006041?courseId=245888516&name=%E4%B8%AD%E9%83%BD&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv8': { cn: '曲泉 · Qū Quán', en: 'Liver 8', def: 'He-Sea of the Liver. On the medial knee crease, in the depression at the medial end when the knee is flexed.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006043?courseId=245888516&name=%E6%9B%B2%E6%B3%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv9': { cn: '阴包 · Yīn Bāo', en: 'Liver 9', def: 'On the inner thigh, 4 cùn above the medial epicondyle of the femur, between sartorius and vastus medialis. 郭氏 lineage point for menstrual regulation, endometriosis, retroverted uterus.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006044?courseId=245888516&name=%E9%98%B4%E5%8C%85&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv13': { cn: '章门 · Zhāng Mén', en: 'Liver 13', def: 'Front-Mu of the Spleen; Eight-Influential Point for zang organs (脏会). Below the free end of the 11th rib.', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006048?courseId=245888516&name=%E7%AB%A0%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  'lv14': { cn: '期门 · Qī Mén', en: 'Liver 14', def: 'Front-Mu of the Liver. In the 6th intercostal space, 4 cùn lateral to the midline (directly below the nipple).', url: 'https://yibian.hopto.org/shu/?sid=6966', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006049?courseId=245888516&name=%E6%9C%9F%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6966'  },
  // Conception Vessel (CV5, CV14)
  'cv5': { cn: '石门 · Shí Mén', en: 'Conception Vessel 5', def: 'Front-Mu of the Triple Burner. On the lower abdomen midline, 2 cùn below the navel.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006093?courseId=245888516&name=%E7%9F%B3%E9%97%A8&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'  },
  'cv14': { cn: '巨阙 · Jù Què', en: 'Conception Vessel 14', def: 'Front-Mu of the Heart. On the upper abdomen midline, 6 cùn above the navel.', url: 'https://yibian.hopto.org/shu/?sid=6943', urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006103?courseId=245888516&name=%E5%B7%A8%E9%98%99&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry=', urlCnBackup: 'https://yibian.hopto.org/shu/?sid=6943'  }
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
