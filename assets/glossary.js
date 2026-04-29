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
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006030?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0+%E8%B6%B3%E5%8E%A5%E9%98%B4%E8%82%9D%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'heart-tcm': {
    cn: '心 · Xīn', en: 'Heart',
    def: 'The "emperor" organ; governs blood, houses the shén (spirit), and opens to the tongue.',
    url: 'https://en.wikipedia.org/wiki/Heart_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005800?courseId=245888516&name=%E7%AC%AC%E5%85%AD%E7%AB%A0+%E6%89%8B%E5%B0%91%E9%98%B4%E5%BF%83%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'spleen-tcm': {
    cn: '脾 · Pí', en: 'Spleen',
    def: 'Governs transformation of food into qi and blood; controls muscles, the four limbs, and houses yì (intent).',
    url: 'https://en.wikipedia.org/wiki/Spleen_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005774?courseId=245888516&name=%E7%AC%AC%E4%BA%94%E7%AB%A0+%E8%B6%B3%E5%A4%AA%E9%98%B4%E8%84%BE%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'lung-tcm': {
    cn: '肺 · Fèi', en: 'Lung',
    def: 'Governs qi and breathing, regulates the water passages, controls the skin, houses pò (corporeal soul).',
    url: 'https://en.wikipedia.org/wiki/Lung_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005650?courseId=245888516&name=%E7%AC%AC%E4%BA%8C%E7%AB%A0+%E6%89%8B%E5%A4%AA%E9%98%B4%E8%82%BA%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'kidney-tcm': {
    cn: '腎 / 肾 · Shèn', en: 'Kidney',
    def: 'Stores essence (jīng), governs water, fills the bones and marrow, houses zhì (will).',
    url: 'https://en.wikipedia.org/wiki/Kidney_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005916?courseId=245888516&name=%E7%AC%AC%E4%B9%9D%E7%AB%A0+%E8%B6%B3%E5%B0%91%E9%98%B4%E8%82%BE%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'gallbladder-tcm': {
    cn: '膽 / 胆 · Dǎn', en: 'Gallbladder',
    def: 'Stores and secretes bile; governs decisiveness; paired with the Liver in the Wood phase.',
    url: 'https://en.wikipedia.org/wiki/Gallbladder_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005978?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%BA%8C%E7%AB%A0+%E8%B6%B3%E5%B0%91%E9%98%B3%E8%83%86%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'stomach-tcm': {
    cn: '胃 · Wèi', en: 'Stomach',
    def: 'The "sea of grain and water"; rots and ripens food. Paired with the Spleen in the Earth phase.',
    url: 'https://en.wikipedia.org/wiki/Stomach_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005718?courseId=245888516&name=%E7%AC%AC%E5%9B%9B%E7%AB%A0+%E8%B6%B3%E9%98%B3%E6%98%8E%E8%83%83%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'small-intestine-tcm': {
    cn: '小腸 / 小肠 · Xiǎo Cháng', en: 'Small Intestine',
    def: 'Separates the clear from the turbid in food. Paired with the Heart in the Fire phase.',
    url: 'https://en.wikipedia.org/wiki/Small_intestine_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005813?courseId=245888516&name=%E7%AC%AC%E4%B8%83%E7%AB%A0+%E6%89%8B%E5%A4%AA%E9%98%B3%E5%B0%8F%E8%82%A0%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'large-intestine-tcm': {
    cn: '大腸 / 大肠 · Dà Cháng', en: 'Large Intestine',
    def: 'Receives waste and conducts elimination. Paired with the Lung in the Metal phase.',
    url: 'https://en.wikipedia.org/wiki/Large_intestine_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005678?courseId=245888516&name=%E7%AC%AC%E4%B8%89%E7%AB%A0+%E6%89%8B%E9%98%B3%E6%98%8E%E5%A4%A7%E8%82%A0%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'bladder-tcm': {
    cn: '膀胱 · Páng Guāng', en: 'Bladder',
    def: 'Stores and excretes urine; its meridian runs the entire spine. Paired with the Kidney in the Water phase.',
    url: 'https://en.wikipedia.org/wiki/Urinary_bladder_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005844?courseId=245888516&name=%E7%AC%AC%E5%85%AB%E7%AB%A0+%E8%B6%B3%E5%A4%AA%E9%98%B3%E8%86%80%E8%83%B1%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'pericardium-tcm': {
    cn: '心包 · Xīn Bāo', en: 'Pericardium',
    def: "The Heart's protector; first line of defense against external pathogens reaching the heart.",
    url: 'https://en.wikipedia.org/wiki/Pericardium_(Chinese_medicine)',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005944?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E7%AB%A0+%E6%89%8B%E5%8E%A5%E9%98%B4%E5%BF%83%E5%8C%85%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'sanjiao': {
    cn: '三焦 · Sān Jiāo', en: 'Triple Burner',
    def: "Coordinates qi and fluid metabolism through the body's three cavities (chest, abdomen, pelvis).",
    url: 'https://en.wikipedia.org/wiki/San_Jiao',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903005954?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%B8%80%E7%AB%A0+%E6%89%8B%E5%B0%91%E9%98%B3%E4%B8%89%E7%84%A6%E7%BB%8F&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
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
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006050?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E5%9B%9B%E7%AB%A0+%E7%9D%A3%E8%84%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
  },
  'ren-mai': {
    cn: '任脉 · Rèn Mài', en: 'Conception Vessel',
    def: 'The "Sea of Yin Channels" running up the front midline from the perineum to the lower lip; governs all yin and is central to gynecology and fertility.',
    url: 'https://en.wikipedia.org/wiki/Conception_vessel',
    urlCn: 'https://special.rhky.com/mobile/mooc/tocard/903006086?courseId=245888516&name=%E7%AC%AC%E5%8D%81%E4%BA%94%E7%AB%A0+%E4%BB%BB%E8%84%89&code=&btype=tushu&user_token=123&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
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
    url: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'cv4': {
    cn: '关元 · Guān Yuán', en: 'Conception Vessel 4',
    def: '"Gate of Origin." 3 cùn below the navel on the midline. The most foundational point for tonifying yang and original qi. Classical indirect-moxa point for 阳虚 (yang deficiency) and cold patterns.',
    url: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv6': {
    cn: '气海 · Qì Hǎi', en: 'Conception Vessel 6',
    def: '"Sea of Qi." 1.5 cùn below the navel. Replenishes qi throughout the body; classical point for fatigue and qi deficiency.',
    url: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv8': {
    cn: '神阙 · Shén Què', en: 'Conception Vessel 8',
    def: 'The center of the navel. Salt-and-ginger moxibustion on this point warms interior cold and lifts collapsed yang. Never needled.',
    url: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'gv4': {
    cn: '命门 · Mìng Mén', en: 'Governor Vessel 4',
    def: '"Gate of Life." Between L2 and L3 spinous processes (level with the navel). Kindles kidney yang and warms the body core; indispensable for chronic cold-deficiency back pain.',
    url: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'sp6': {
    cn: '三阴交 · Sān Yīn Jiāo', en: 'Spleen 6',
    def: 'Crossing point of the three foot-yin meridians (Spleen, Liver, Kidney). 3 cùn above the inner ankle, behind the tibia. Powerful for nourishing yin, blood, and the lower abdomen. (Avoid in pregnancy.)',
    url: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'sp9': {
    cn: '阴陵泉 · Yīn Líng Quán', en: 'Spleen 9',
    def: 'Master point for resolving dampness — He-Sea point of the Spleen channel. Inner shin, depression below and behind the head of the tibia.',
    url: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'sp10': {
    cn: '血海 · Xuè Hǎi', en: 'Spleen 10',
    def: '"Sea of Blood." 2 cùn above the upper border of the kneecap on the inner thigh. Foremost point for any blood disorder — moves and nourishes blood.',
    url: 'https://yibian.hopto.org/shu/?sid=6962'
  },
  'ki3': {
    cn: '太溪 · Tài Xī', en: 'Kidney 3',
    def: 'Source point of the Kidney channel. In the depression between the inner ankle bone and the Achilles tendon. Replenishes kidney essence, yin, and yang.',
    url: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'ki6': {
    cn: '照海 · Zhào Hǎi', en: 'Kidney 6',
    def: 'Confluence point for the Yin Qiao Vessel. Below the inner ankle bone. Cools yin-deficiency heat, calms the spirit, treats night insomnia and dry throat.',
    url: 'https://yibian.hopto.org/shu/?sid=6964'
  },
  'lv3': {
    cn: '太冲 · Tài Chōng', en: 'Liver 3',
    def: 'Source point of the Liver. In the V where the 1st and 2nd metatarsal bones meet on top of the foot. The foremost point for moving stagnant Liver qi and calming irritability.',
    url: 'https://yibian.hopto.org/shu/?sid=6966'
  },
  'li4': {
    cn: '合谷 · Hé Gǔ', en: 'Large Intestine 4',
    def: 'Source point of the Large Intestine, master point for the face. Between thumb and index finger. Combined with LV3 forms the "Four Gates" — opens qi flow throughout the body. (Avoid in pregnancy.)',
    url: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'li11': {
    cn: '曲池 · Qū Chí', en: 'Large Intestine 11',
    def: 'He-Sea point of the Large Intestine. At the outer end of the elbow crease. Powerful heat-clearer for skin, fever, and digestive heat.',
    url: 'https://yibian.hopto.org/shu/?sid=6967'
  },
  'gv14': {
    cn: '大椎 · Dà Zhuī', en: 'Governor Vessel 14',
    def: '"Great Hammer." Below C7 (the most prominent vertebra at the neck base). Meeting of all six yang channels — releases excess heat and treats all febrile diseases.',
    url: 'https://yibian.hopto.org/shu/?sid=6944'
  },
  'st40': {
    cn: '丰隆 · Fēng Lóng', en: 'Stomach 40',
    def: 'Connecting (Luo) point of the Stomach channel. The classical "phlegm-resolving" point — used whenever phlegm (湿痰) is present.',
    url: 'https://yibian.hopto.org/shu/?sid=6961'
  },
  'cv12': {
    cn: '中脘 · Zhōng Wǎn', en: 'Conception Vessel 12',
    def: 'Front-Mu of the Stomach AND Influential Point for the Fu organs. Halfway between the breastbone tip and the navel. Warms the middle burner and harmonizes the entire digestive system.',
    url: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'cv17': {
    cn: '膻中 · Dàn Zhōng', en: 'Conception Vessel 17',
    def: 'Influential Point for Qi AND Front-Mu of the Pericardium. Midpoint of the breastbone, level with the nipples. Releases chest oppression, calms emotional bottling, regulates breath.',
    url: 'https://yibian.hopto.org/shu/?sid=6943'
  },
  'bl17': {
    cn: '膈俞 · Gé Shù', en: 'Bladder 17',
    def: 'Influential Point for Blood. On the back, level with the lower edge of the shoulder blade. Used for any blood disorder — stasis, deficiency, or hemorrhage.',
    url: 'https://yibian.hopto.org/shu/?sid=6963'
  }
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
  '膈俞': 'bl17', '膈腧': 'bl17', 'bl17': 'bl17', 'BL17': 'bl17'
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
