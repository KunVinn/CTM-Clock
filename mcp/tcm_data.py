"""
TCM tongue-diagnosis reference data.

Ported from the browser dataset in ``tongue.html`` so the MCP server and the
web page stay in agreement on sign keys, pattern keys and swatch colours.
Keys here are the authoritative ones — the web page uses the same strings.
"""

from __future__ import annotations

from typing import Any

# =============================================================================
# ZONE MAP — tongue regions and their organ correspondences
# =============================================================================

TONGUE_ZONES: list[dict[str, Any]] = [
    {
        "key": "tip",
        "cn": "舌尖",
        "en": "Tip",
        "organ": "Heart · Lung",
        "organ_cn": "心 · 肺",
        "desc": (
            "The very front of the tongue reflects the upper burner — the Heart and "
            "Lung. A red, dotted, or sore tip often points to Heart fire (anxiety, "
            "stress, insomnia) or Lung heat."
        ),
    },
    {
        "key": "front",
        "cn": "舌前",
        "en": "Front-Center",
        "organ": "Lung",
        "organ_cn": "肺",
        "desc": (
            "Just behind the tip is the Lung area. A coating change here may relate "
            "to respiration, the chest, or the immune surface (wei qi)."
        ),
    },
    {
        "key": "center",
        "cn": "舌中",
        "en": "Center",
        "organ": "Spleen · Stomach",
        "organ_cn": "脾 · 胃",
        "desc": (
            "The middle of the tongue is Spleen-Stomach territory. Cracks here are "
            "common and usually indicate Stomach yin deficiency. A thick central "
            "coat suggests undigested damp or food stagnation."
        ),
    },
    {
        "key": "sides",
        "cn": "舌边",
        "en": "Sides",
        "organ": "Liver · Gallbladder",
        "organ_cn": "肝 · 胆",
        "desc": (
            "The sides reflect Liver and Gallbladder. Redness, swelling, or purple "
            "discoloration commonly indicates Liver qi stagnation, Liver heat, or "
            "Liver blood stasis."
        ),
    },
    {
        "key": "root",
        "cn": "舌根",
        "en": "Root (Back)",
        "organ": "Kidney · Bladder · Intestines",
        "organ_cn": "肾 · 膀胱 · 肠",
        "desc": (
            "The back/root reflects Kidneys, Bladder and Intestines. A thick root "
            "coat often indicates damp or heat in the lower burner; a peeled root "
            "suggests Kidney yin deficiency."
        ),
    },
]

# =============================================================================
# SIGNS — body colour, shape, coating
# =============================================================================

TONGUE_COLORS: list[dict[str, Any]] = [
    {
        "key": "pink",
        "cn": "淡红",
        "en": "Pale-Red / Pink",
        "swatch": "#e8a094",
        "meaning": "A normal, healthy tongue body — well-balanced qi, blood, yin and yang.",
        "meaning_cn": "正常健康之舌——气血阴阳俱平。",
        "patterns": [],
    },
    {
        "key": "pale",
        "cn": "淡白",
        "en": "Pale",
        "swatch": "#eecdc1",
        "meaning": (
            "Lacking the rosy hue of a normal tongue. Indicates qi or blood "
            "deficiency, or yang deficiency (especially when wet/swollen)."
        ),
        "meaning_cn": "舌色淡而少红润。主气虚、血虚或阳虚（尤胖嫩湿润者）。",
        "patterns": ["qi-deficiency", "blood-deficiency", "yang-deficiency"],
    },
    {
        "key": "red",
        "cn": "红",
        "en": "Red",
        "swatch": "#cc3a2c",
        "meaning": (
            "Brighter than normal — indicates heat. The brighter the red, the "
            "stronger the heat. With dryness/cracks: yin-deficient empty heat."
        ),
        "meaning_cn": "舌色较常人为红——主热。色愈红则热愈甚。兼干燥裂纹者属阴虚虚热。",
        "patterns": ["heat-excess", "yin-deficiency"],
    },
    {
        "key": "crimson",
        "cn": "绛",
        "en": "Crimson / Scarlet",
        "swatch": "#a01a18",
        "meaning": (
            "A deep, dark red. Indicates extreme heat that has entered the blood "
            "layer (ying/xue aspect) — a serious sign."
        ),
        "meaning_cn": "深暗之红色。主热入营血——病势已重。",
        "patterns": ["heat-excess"],
    },
    {
        "key": "purple",
        "cn": "紫",
        "en": "Purple / Dusky",
        "swatch": "#6e3a55",
        "meaning": (
            "Stagnation of qi or blood. Reddish-purple = heat-related stasis. "
            "Bluish-purple = cold-related stasis."
        ),
        "meaning_cn": "气滞或血瘀之象。偏红紫者属热瘀，偏青紫者属寒瘀。",
        "patterns": ["blood-stasis", "qi-stagnation"],
    },
    {
        "key": "blue-purple",
        "cn": "青紫",
        "en": "Bluish-Purple",
        "swatch": "#3e4467",
        "meaning": (
            "Pronounced cold and blood stasis. Often seen with chronic poor "
            "circulation or severe internal cold."
        ),
        "meaning_cn": "寒甚血瘀。多见于久病气血不畅或重寒在里之人。",
        "patterns": ["blood-stasis", "yang-deficiency"],
    },
]

TONGUE_SHAPES: list[dict[str, Any]] = [
    {
        "key": "normal",
        "cn": "正常",
        "en": "Normal",
        "meaning": "Supple, neither swollen nor thin; smooth edges; good motility.",
        "meaning_cn": "舌体柔润，不胖不瘦；边缘光整；伸缩自如。",
        "patterns": [],
    },
    {
        "key": "swollen",
        "cn": "胖大",
        "en": "Swollen / Enlarged",
        "meaning": (
            "Larger than the mouth seems to allow. Often indicates qi or yang "
            "deficiency leading to fluid retention (dampness)."
        ),
        "meaning_cn": "舌体胖大充盈口腔。多主气虚或阳虚水停（生湿）。",
        "patterns": ["yang-deficiency", "damp"],
    },
    {
        "key": "thin",
        "cn": "瘦薄",
        "en": "Thin",
        "meaning": "Smaller, more shrunken than normal. Indicates blood or yin deficiency.",
        "meaning_cn": "舌体瘦薄缩小。主血虚或阴虚——津血不足。",
        "patterns": ["blood-deficiency", "yin-deficiency"],
    },
    {
        "key": "tooth-marked",
        "cn": "齿痕",
        "en": "Scalloped / Tooth-marked",
        "meaning": (
            "Indentations along the sides where the teeth press. A classic sign of "
            "Spleen qi deficiency, often with dampness."
        ),
        "meaning_cn": "舌边见齿印。脾气虚之典型征象，多兼湿。",
        "patterns": ["qi-deficiency", "damp"],
    },
    {
        "key": "cracked",
        "cn": "裂纹",
        "en": "Cracked / Fissured",
        "meaning": (
            "Cracks running along the tongue. Long, deep cracks usually indicate "
            "yin deficiency or heat damage to fluids."
        ),
        "meaning_cn": "舌面裂纹纵横。长而深之裂多主阴虚或热伤津液。",
        "patterns": ["yin-deficiency", "heat-excess"],
    },
    {
        "key": "stiff",
        "cn": "强硬",
        "en": "Stiff",
        "meaning": (
            "Reduced motility, hard to extend or move. Can indicate internal wind, "
            "severe heat, or phlegm obstruction."
        ),
        "meaning_cn": "舌强难伸，活动不利。主内风、热极或痰阻经络。",
        "patterns": ["heat-excess"],
    },
    {
        "key": "flaccid",
        "cn": "痿软",
        "en": "Flaccid / Limp",
        "meaning": (
            "Weak, lacking tone. Indicates extreme deficiency of qi, blood, or yin "
            "— body fluids no longer nourish the tongue."
        ),
        "meaning_cn": "舌软无力。主气、血、阴极虚——津液不足以养舌。",
        "patterns": ["qi-deficiency", "yin-deficiency"],
    },
    {
        "key": "red-dots",
        "cn": "红点 / 芒刺",
        "en": "Red Spots / Prickles",
        "meaning": (
            "Raised red dots, often on the tip or sides. Indicate heat in the "
            "corresponding organ system. On the tip: Heart fire."
        ),
        "meaning_cn": "舌面起红点或芒刺，多见于舌尖、舌边。主对应脏腑有热。舌尖红点为心火上炎。",
        "patterns": ["heat-excess"],
    },
]

TONGUE_COATINGS: list[dict[str, Any]] = [
    {
        "key": "thin-white",
        "cn": "薄白苔",
        "en": "Thin White (normal)",
        "swatch": "#f5ede0",
        "meaning": "Clear, thin, slightly moist white coating. Normal — Stomach qi is healthy.",
        "meaning_cn": "薄白微润之苔。属正常——胃气和顺。",
        "patterns": [],
    },
    {
        "key": "thick-white",
        "cn": "厚白苔",
        "en": "Thick White",
        "swatch": "#dad0bc",
        "meaning": "A heavy white film. Indicates cold or dampness — often digestive.",
        "meaning_cn": "苔厚而白。主寒或湿——多在脾胃。",
        "patterns": ["cold", "damp"],
    },
    {
        "key": "yellow",
        "cn": "黄苔",
        "en": "Yellow",
        "swatch": "#c9a64b",
        "meaning": (
            "Indicates interior heat. Pale yellow = mild heat; deep yellow or burnt "
            "= severe heat or fire."
        ),
        "meaning_cn": "主里热。淡黄为微热，深黄或焦黄为重热或火盛。",
        "patterns": ["heat-excess", "damp-heat"],
    },
    {
        "key": "greasy",
        "cn": "腻苔",
        "en": "Greasy / Sticky",
        "swatch": "#bca576",
        "meaning": (
            "A thick, oily film hard to scrape off. A clear sign of dampness or "
            "phlegm. With yellow: damp-heat. With white: damp-cold."
        ),
        "meaning_cn": "苔厚腻油润，难以刮除。湿邪或痰浊之明征。兼黄者为湿热，兼白者为寒湿。",
        "patterns": ["damp", "damp-heat"],
    },
    {
        "key": "dry",
        "cn": "燥苔",
        "en": "Dry",
        "swatch": "#d8c69d",
        "meaning": (
            "Lacks normal moisture, looks parched or sandy. Body fluids are damaged "
            "— usually by heat or yin deficiency."
        ),
        "meaning_cn": "苔燥少津，似砂似纸。津液已伤——多属热或阴虚。",
        "patterns": ["heat-excess", "yin-deficiency"],
    },
    {
        "key": "peeled",
        "cn": "剥苔 / 无苔",
        "en": "Peeled / No Coating",
        "swatch": "#3a2818",
        "meaning": (
            "Areas (or all) of the tongue have lost their coating, looking like a "
            "polished mirror. Indicates Stomach or Kidney yin deficiency."
        ),
        "meaning_cn": "部分或全舌苔剥脱，光如镜面（俗称镜面舌）。主胃阴或肾阴虚。",
        "patterns": ["yin-deficiency"],
    },
    {
        "key": "gray-black",
        "cn": "灰黑苔",
        "en": "Gray / Black",
        "swatch": "#3c3a36",
        "meaning": (
            "Severe pattern. Wet and black: extreme cold. Dry and black: extreme "
            "heat scorching fluids. May also follow antibiotics."
        ),
        "meaning_cn": "病势深重。润而黑者为极寒，燥而黑者为极热伤津。亦可见于久服抗生素之类。",
        "patterns": ["heat-excess", "cold"],
    },
]

# =============================================================================
# PATTERNS — symptoms, lifestyle advice, acupoints, symptom-text keywords
# =============================================================================

TONGUE_PATTERNS: dict[str, dict[str, Any]] = {
    "qi-deficiency": {
        "cn": "气虚",
        "en": "Qi Deficiency",
        "symptoms": (
            "Fatigue, shortness of breath, weak voice, low immunity, frequent "
            "sighing, reluctance to speak."
        ),
        "symptoms_cn": "倦怠乏力，气短懒言，声低，易感冒，常欲叹息。",
        "advice": (
            "Strengthen Spleen and Lung qi: warm cooked breakfasts (congee, oats), "
            "gentle activity (qigong, walking), early sleep. Avoid raw cold foods, "
            "overwork, skipping meals."
        ),
        "advice_cn": "健脾肺之气：早食温粥燕麦，行气功散步，早眠。忌生冷、过劳、饥饱失调。",
        "keywords": [
            "fatigue", "tired", "exhaust", "weak", "breathless", "short of breath",
            "no energy", "low energy", "catch cold", "sweating easily", "sighing",
            "乏力", "疲倦", "疲劳", "气短", "懒言", "易感冒", "自汗", "声低", "倦怠",
        ],
        "acupoints": [
            {
                "cn": "足三里", "py": "Zú Sān Lǐ", "code": "ST36", "method": "moxibustion",
                "loc": "Below the kneecap, four fingers down, one finger lateral to the shinbone",
                "loc_cn": "膝盖骨下方四指处，距胫骨外缘一指。",
                "why": "Master point for tonifying qi and strengthening the Spleen-Stomach",
                "why_cn": "补气要穴，健脾和胃之主穴。",
            },
            {
                "cn": "气海", "py": "Qì Hǎi", "code": "CV6", "method": "moxibustion",
                "loc": "Lower abdomen, 1.5 cùn below the navel",
                "loc_cn": "下腹部，脐下一寸五分（约两指宽）。",
                "why": "The Sea of Qi — gathers and replenishes qi throughout the body",
                "why_cn": "「气之海」——汇聚而补养周身之气。",
            },
            {
                "cn": "关元", "py": "Guān Yuán", "code": "CV4", "method": "moxibustion",
                "loc": "3 cùn below the navel on the midline",
                "loc_cn": "腹中线，脐下三寸（约四指宽）。",
                "why": "Tonifies original qi and yang, foundational restorative point",
                "why_cn": "补元气养元阳，培本固元之要穴。",
            },
        ],
    },
    "yang-deficiency": {
        "cn": "阳虚",
        "en": "Yang Deficiency",
        "symptoms": (
            "Cold hands and feet, low back ache, frequent urination, low libido, "
            "lethargy, prefers warm drinks, pale puffy face."
        ),
        "symptoms_cn": "畏寒肢冷，腰酸尿频，性欲低下，神疲，喜温饮，面色晄白虚浮。",
        "advice": (
            "Warm and tonify: ginger tea, lamb stew, walnuts, black sesame, cinnamon. "
            "Keep the lower back warm. Avoid iced drinks, raw salads, late nights."
        ),
        "advice_cn": "温阳补虚：姜茶、羊肉炖、核桃、黑芝麻、桂皮。腰部保暖。忌冰饮、生冷、熬夜。",
        "keywords": [
            "cold hands", "cold feet", "always cold", "chilly", "aversion to cold",
            "low back", "frequent urination", "night urination", "libido", "puffy",
            "畏寒", "怕冷", "肢冷", "手脚冰", "腰酸", "尿频", "夜尿", "喜温", "神疲",
        ],
        "acupoints": [
            {
                "cn": "命门", "py": "Mìng Mén", "code": "GV4", "method": "moxibustion",
                "loc": "Lower back, between the spinous processes of L2 and L3 (level with the navel)",
                "loc_cn": "腰部，第二、三腰椎棘突之间（与脐相平）。",
                "why": "The Gate of Life — kindles kidney yang and warms the body core",
                "why_cn": "「命门」——温肾阳，暖躯干之根本。",
            },
            {
                "cn": "关元", "py": "Guān Yuán", "code": "CV4", "method": "moxibustion",
                "loc": "3 cùn below the navel on the midline",
                "loc_cn": "腹中线，脐下三寸。",
                "why": "Powerful yang-tonifier; classical indirect-moxa point for cold deficiency",
                "why_cn": "大补元阳之穴；古法「隔姜灸」治寒虚之要穴。",
            },
            {
                "cn": "神阙", "py": "Shén Què", "code": "CV8", "method": "moxibustion",
                "loc": "The center of the navel",
                "loc_cn": "脐之正中。",
                "why": "Salt-and-ginger moxa on the navel warms the interior and lifts yang (never needled)",
                "why_cn": "盐姜灸脐温里升阳（此穴禁针）。",
            },
        ],
    },
    "yin-deficiency": {
        "cn": "阴虚",
        "en": "Yin Deficiency",
        "symptoms": (
            "Night sweats, hot palms and soles, dry mouth, insomnia (waking 1–3 AM), "
            "restlessness, low-grade afternoon heat."
        ),
        "symptoms_cn": "盗汗，五心烦热，口干，失眠（凌晨一至三时易醒），心烦，午后潮热。",
        "advice": (
            "Nourish yin: pears, lily bulb, black sesame, eggs, tofu. Sleep before "
            "23:00. Avoid coffee, alcohol, spicy foods, overwork, late-night screens."
        ),
        "advice_cn": "滋阴：梨、百合、黑芝麻、鸡蛋、豆腐。亥时（二十三时）前入眠。忌咖啡、酒、辛辣、过劳、夜深观屏。",
        "keywords": [
            "night sweat", "hot palms", "hot flush", "dry mouth", "dry throat",
            "insomnia", "wake at night", "restless", "afternoon heat", "thirsty",
            "盗汗", "五心烦热", "口干", "咽干", "失眠", "心烦", "潮热", "手足心热",
        ],
        "acupoints": [
            {
                "cn": "三阴交", "py": "Sān Yīn Jiāo", "code": "SP6", "method": "acupuncture",
                "loc": "Inner leg, 3 cùn above the inner ankle bone, just behind the tibia",
                "loc_cn": "小腿内侧，内踝上三寸，胫骨内侧后缘。",
                "why": "Crossing point of three yin meridians — nourishes yin and blood",
                "why_cn": "三阴（脾、肝、肾）经交会之穴——滋阴养血。",
            },
            {
                "cn": "太溪", "py": "Tài Xī", "code": "KI3", "method": "acupuncture",
                "loc": "In the depression between the inner ankle bone and the Achilles tendon",
                "loc_cn": "内踝与跟腱之间凹陷处。",
                "why": "Source point of the Kidney channel — replenishes kidney yin and essence",
                "why_cn": "肾经原穴——补肾阴养肾精。",
            },
            {
                "cn": "照海", "py": "Zhào Hǎi", "code": "KI6", "method": "acupuncture",
                "loc": "Below the inner ankle bone, in the depression",
                "loc_cn": "内踝下方凹陷处。",
                "why": "Cools yin-deficiency heat, calms the spirit, classically used for night insomnia",
                "why_cn": "清虚热而安心神，古治夜不能眠之要穴。",
            },
        ],
    },
    "blood-deficiency": {
        "cn": "血虚",
        "en": "Blood Deficiency",
        "symptoms": (
            "Pale complexion, dizziness, blurred vision, brittle nails, scant or pale "
            "menstruation, easily anxious, poor sleep."
        ),
        "symptoms_cn": "面色苍白，眩晕，目眩，爪甲脆，月经量少色淡，易焦虑，睡眠不佳。",
        "advice": (
            "Build blood: red dates, goji, beetroot, dark leafy greens, properly "
            "cooked red meat or beans. Get adequate sleep. Avoid excessive screen time."
        ),
        "advice_cn": "补血：红枣、枸杞、甜菜根、深绿叶菜、熟红肉或豆类。眠足。忌久视屏（视则伤血）。",
        "keywords": [
            "pale", "dizzy", "dizziness", "blurred vision", "floaters", "brittle nails",
            "hair loss", "scanty period", "light period", "anxious", "palpitation",
            "面色苍白", "头晕", "眩晕", "视物模糊", "爪甲", "脱发", "月经量少", "心悸", "健忘",
        ],
        "acupoints": [
            {
                "cn": "血海", "py": "Xuè Hǎi", "code": "SP10", "method": "acupuncture",
                "loc": "Inner thigh, 2 cùn above the upper border of the kneecap",
                "loc_cn": "大腿内侧，膑骨上缘上二寸。",
                "why": "Sea of Blood — moves and nourishes blood, classical menstrual point",
                "why_cn": "「血海」——活血养血，古治经血诸疾之要穴。",
            },
            {
                "cn": "足三里", "py": "Zú Sān Lǐ", "code": "ST36", "method": "moxibustion",
                "loc": "Four fingers below the kneecap, one finger lateral to the shinbone",
                "loc_cn": "膝盖骨下方四指处，距胫骨外缘一指。",
                "why": "Spleen makes blood; ST36 strengthens its ability to generate blood",
                "why_cn": "脾主生血；本穴健运脾胃以化生气血。",
            },
            {
                "cn": "膈俞", "py": "Gé Shù", "code": "BL17", "method": "acupuncture",
                "loc": "Back, level with the lower edge of the shoulder blade, 1.5 cùn lateral to the spine (T7)",
                "loc_cn": "背部，肩胛骨下缘平齐，脊柱旁开一寸五分（第七胸椎）。",
                "why": "Influential point for blood — used in all blood disorders",
                "why_cn": "血会膈俞——治诸血之疾。",
            },
        ],
    },
    "heat-excess": {
        "cn": "实热",
        "en": "Excess Heat",
        "symptoms": (
            "Red face, thirst for cold drinks, irritability, constipation, dark "
            "scanty urine, mouth ulcers, strong body odor."
        ),
        "symptoms_cn": "面赤，喜冷饮，烦躁，便秘，溺黄量少，口疮，体味重。",
        "advice": (
            "Cool and clear: cucumber, watermelon, mung beans, chrysanthemum tea, "
            "leafy greens. Avoid spicy food, alcohol, fried foods, excess red meat."
        ),
        "advice_cn": "清热降火：黄瓜、西瓜、绿豆、菊花茶、叶菜。忌辛辣、酒、煎炸、过食红肉。",
        "keywords": [
            "fever", "hot", "red face", "thirst", "cold drinks", "irritable",
            "constipation", "dark urine", "mouth ulcer", "sore throat", "acne",
            "面赤", "口渴", "喜冷饮", "烦躁", "便秘", "尿黄", "口疮", "咽痛", "发热",
        ],
        "acupoints": [
            {
                "cn": "合谷", "py": "Hé Gǔ", "code": "LI4", "method": "acupuncture",
                "loc": "Back of the hand, in the web between thumb and index finger",
                "loc_cn": "手背，拇指与食指之间虎口处。",
                "why": "Master point for clearing heat from the head and face (avoid in pregnancy)",
                "why_cn": "清头面之热之要穴；解热毒（孕妇慎用）。",
            },
            {
                "cn": "曲池", "py": "Qū Chí", "code": "LI11", "method": "acupuncture",
                "loc": "At the outer end of the elbow crease when the elbow is bent",
                "loc_cn": "屈肘时肘横纹外端凹陷中。",
                "why": "Powerful heat-clearer for skin, fever, and digestive heat",
                "why_cn": "清皮肤、发热与肠胃之热。",
            },
            {
                "cn": "大椎", "py": "Dà Zhuī", "code": "GV14", "method": "acupuncture",
                "loc": "Back midline, in the depression below C7",
                "loc_cn": "后正中线，第七颈椎下凹陷中。",
                "why": "Meeting of all yang channels — releases excess heat from the body",
                "why_cn": "「诸阳之会」——清解周身实热。",
            },
        ],
    },
    "cold": {
        "cn": "寒证",
        "en": "Cold Pattern",
        "symptoms": (
            "Aversion to cold, prefers warmth, pale appearance, watery stools, clear "
            "copious urine, abdominal cramps relieved by warmth."
        ),
        "symptoms_cn": "畏寒喜暖，面色苍白，便溏，溺清而多，腹部冷痛，得温则减。",
        "advice": (
            "Warm the interior: ginger, cinnamon, cooked grains, soups and stews. "
            "Keep abdomen and feet warm. Avoid raw cold foods and cold floors."
        ),
        "advice_cn": "温里散寒：姜、桂皮、熟谷、汤煲。腹足保暖。忌生冷、冷水游泳、赤足凉地。",
        "keywords": [
            "cold", "chills", "watery stool", "diarrhea", "clear urine",
            "cramp", "abdominal pain", "relieved by warmth", "prefer warm",
            "畏寒", "喜暖", "便溏", "腹泻", "溺清", "腹冷痛", "得温则减",
        ],
        "acupoints": [
            {
                "cn": "中脘", "py": "Zhōng Wǎn", "code": "CV12", "method": "moxibustion",
                "loc": "Midline, halfway between the lower breastbone and the navel",
                "loc_cn": "腹中线，胸骨下缘与脐之中点。",
                "why": "Warms the middle burner — classic point for cold cramping in the stomach",
                "why_cn": "温中焦——古治胃寒挛痛之要穴。",
            },
            {
                "cn": "神阙", "py": "Shén Què", "code": "CV8", "method": "moxibustion",
                "loc": "The center of the navel",
                "loc_cn": "脐之正中。",
                "why": "Salt-moxa on the navel warms interior cold (never needle this point)",
                "why_cn": "盐灸神阙以温里散寒（此穴禁针）。",
            },
            {
                "cn": "足三里", "py": "Zú Sān Lǐ", "code": "ST36", "method": "moxibustion",
                "loc": "Four fingers below the kneecap, one finger lateral to the shinbone",
                "loc_cn": "膝盖骨下方四指处，距胫骨外缘一指。",
                "why": "Strengthens Spleen-Stomach to dispel internal cold",
                "why_cn": "健脾胃以散内寒。",
            },
        ],
    },
    "damp": {
        "cn": "湿",
        "en": "Dampness",
        "symptoms": (
            "Heaviness, sluggishness, foggy head, bloating, loose or sticky stools, "
            "edema, excess phlegm, slow weight loss."
        ),
        "symptoms_cn": "身重，倦怠，头昏蒙，腹胀，便溏黏腻，浮肿，痰多，难减重。",
        "advice": (
            "Resolve damp: barley, mung beans, adzuki beans, ginger, light cooked "
            "vegetables. Move daily. Avoid dairy, sugar, fried and raw cold foods."
        ),
        "advice_cn": "化湿：薏米、绿豆、赤小豆、姜、清炒蔬菜。每日散步以行气。忌奶制、糖、煎炸、过食生冷。",
        "keywords": [
            "heavy", "heaviness", "sluggish", "foggy", "brain fog", "bloating",
            "loose stool", "sticky stool", "edema", "swelling", "phlegm", "mucus",
            "身重", "头昏", "头重", "腹胀", "便黏", "浮肿", "痰多", "困重",
        ],
        "acupoints": [
            {
                "cn": "阴陵泉", "py": "Yīn Líng Quán", "code": "SP9", "method": "acupuncture",
                "loc": "Inner shin, in the depression below and behind the head of the tibia",
                "loc_cn": "小腿内侧，胫骨内侧髁后下方凹陷处。",
                "why": "Master point for resolving dampness — promotes fluid transformation",
                "why_cn": "化湿之主穴——助脾运化水液。",
            },
            {
                "cn": "丰隆", "py": "Fēng Lóng", "code": "ST40", "method": "acupuncture",
                "loc": "Outer shin, halfway between kneecap and outer ankle, two fingers lateral to the crest",
                "loc_cn": "小腿外侧，膑骨与外踝之中点，胫骨前缘外开二指。",
                "why": "The classical phlegm-resolving point for damp-phlegm",
                "why_cn": "古传「化痰之要穴」——主治湿痰。",
            },
            {
                "cn": "足三里", "py": "Zú Sān Lǐ", "code": "ST36", "method": "massage",
                "loc": "Four fingers below the kneecap, one finger lateral to the shinbone",
                "loc_cn": "膝盖骨下方四指处，距胫骨外缘一指。",
                "why": "Strengthens Spleen so it can transport fluids properly",
                "why_cn": "健脾以运化水湿；每日轻按可助运化。",
            },
        ],
    },
    "damp-heat": {
        "cn": "湿热",
        "en": "Damp-Heat",
        "symptoms": (
            "Heaviness with heat: bitter mouth, foul breath, yellow discharge, sticky "
            "perspiration, irritability, dark scanty urine."
        ),
        "symptoms_cn": "湿与热并：口苦，口臭，黄带，汗黏，烦躁，溺黄量少。",
        "advice": (
            "Clear damp-heat: green tea, mung beans, dandelion, lotus leaf, plenty of "
            "plain water. Avoid alcohol, greasy foods, sugar, dairy, spicy hot foods."
        ),
        "advice_cn": "清利湿热：绿茶、绿豆、蒲公英、荷叶、多饮淡水。忌酒、肥甘、糖、奶制、辛辣。",
        "keywords": [
            "bitter taste", "bitter mouth", "bad breath", "foul breath", "yellow discharge",
            "sticky sweat", "greasy skin", "urgent urination", "burning urine",
            "口苦", "口臭", "黄带", "汗黏", "尿黄", "灼热", "湿热", "阴痒",
        ],
        "acupoints": [
            {
                "cn": "阴陵泉", "py": "Yīn Líng Quán", "code": "SP9", "method": "acupuncture",
                "loc": "Inner shin, depression below and behind the head of the tibia",
                "loc_cn": "小腿内侧，胫骨内侧髁后下方凹陷处。",
                "why": "Drains dampness through urination — primary lower-body damp-heat point",
                "why_cn": "渗湿利水——下焦湿热之主穴。",
            },
            {
                "cn": "曲池", "py": "Qū Chí", "code": "LI11", "method": "acupuncture",
                "loc": "Outer end of the elbow crease when the elbow is bent",
                "loc_cn": "屈肘时肘横纹外端凹陷中。",
                "why": "Clears the heat aspect of damp-heat, especially skin and digestive",
                "why_cn": "清湿热之热邪，尤治皮肤与肠胃之湿热。",
            },
            {
                "cn": "太冲", "py": "Tài Chōng", "code": "LV3", "method": "acupuncture",
                "loc": "Top of the foot, in the V where the 1st and 2nd metatarsals meet",
                "loc_cn": "足背，第一、二跖骨结合部之凹陷中。",
                "why": "Soothes Liver-Gallbladder damp-heat (yellow tongue, bitter mouth)",
                "why_cn": "疏泄肝胆湿热（治舌黄、口苦）。",
            },
        ],
    },
    "qi-stagnation": {
        "cn": "气滞",
        "en": "Qi Stagnation",
        "symptoms": (
            "Distension and pressure (chest, sides, abdomen), irritability, mood "
            "swings, sighing, irregular cycles, symptoms worse with stress."
        ),
        "symptoms_cn": "胸胁腹胀闷，烦躁，情绪波动，喜叹息，月经不调，遇压力则甚。",
        "advice": (
            "Move qi: regular movement, breathing exercises, time outdoors, citrus "
            "peel tea, mint, rose tea. Address the stress, not just the symptom."
        ),
        "advice_cn": "行气解郁：常运动，习吐纳，亲近自然，陈皮茶、薄荷、玫瑰花茶。当解其压，非仅治标。忌抑郁不舒。",
        "keywords": [
            "stress", "stressed", "irritable", "angry", "mood swing", "depressed",
            "distension", "chest tightness", "rib pain", "sighing", "pms",
            "irregular period", "worse with stress",
            "压力", "烦躁", "易怒", "郁闷", "胸闷", "胁胀", "叹息", "月经不调", "情志",
        ],
        "acupoints": [
            {
                "cn": "太冲", "py": "Tài Chōng", "code": "LV3", "method": "acupuncture",
                "loc": "Top of the foot, in the V where the 1st and 2nd metatarsals meet",
                "loc_cn": "足背，第一、二跖骨结合部凹陷处。",
                "why": "Source point of the Liver — foremost point for moving stagnant Liver qi",
                "why_cn": "肝经原穴——疏泄肝郁气滞之首选。",
            },
            {
                "cn": "合谷", "py": "Hé Gǔ", "code": "LI4", "method": "massage",
                "loc": "Back of the hand, in the web between thumb and index finger",
                "loc_cn": "手背，拇指与食指之间虎口处。",
                "why": "With LV3 forms the Four Gates — opens qi flow (avoid in pregnancy)",
                "why_cn": "配太冲为「四关穴」——通行全身气机（孕妇慎用）。",
            },
            {
                "cn": "膻中", "py": "Dàn Zhōng", "code": "CV17", "method": "massage",
                "loc": "On the breastbone midline, level with the nipples",
                "loc_cn": "胸骨正中，两乳头连线之中点。",
                "why": "Influential point for qi — releases chest oppression",
                "why_cn": "气会膻中——宽胸理气，解情志郁结。",
            },
        ],
    },
    "blood-stasis": {
        "cn": "血瘀",
        "en": "Blood Stasis",
        "symptoms": (
            "Sharp fixed pains, dark or clotted menstruation, dark veins under the "
            "tongue, rough complexion, varicose veins."
        ),
        "symptoms_cn": "刺痛固定不移，经血色暗或夹块，舌下络脉青紫，肤色晦暗，静脉曲张。",
        "advice": (
            "Move blood: gentle aerobic activity, turmeric, saffron, hawthorn berry, "
            "vinegar. Stay hydrated. Avoid prolonged sitting and cold environments."
        ),
        "advice_cn": "活血化瘀：缓和有氧运动，姜黄、藏红花、山楂、醋。多饮水。忌久坐、寒凉之处。",
        "keywords": [
            "stabbing pain", "sharp pain", "fixed pain", "clots", "dark blood",
            "bruise", "varicose", "dull complexion", "numbness",
            "刺痛", "痛处固定", "血块", "经色暗", "瘀斑", "静脉曲张", "面色晦暗", "麻木",
        ],
        "acupoints": [
            {
                "cn": "血海", "py": "Xuè Hǎi", "code": "SP10", "method": "acupuncture",
                "loc": "Inner thigh, 2 cùn above the upper border of the kneecap",
                "loc_cn": "大腿内侧，膑骨上缘上二寸。",
                "why": "Sea of Blood — invigorates and moves blood, especially menstrual stasis",
                "why_cn": "「血海」——活血化瘀，尤治经血瘀阻。",
            },
            {
                "cn": "膈俞", "py": "Gé Shù", "code": "BL17", "method": "acupuncture",
                "loc": "Back, level with the lower edge of the shoulder blade, 1.5 cùn lateral to the spine (T7)",
                "loc_cn": "背部，肩胛骨下缘平齐，脊柱旁开一寸五分（第七胸椎）。",
                "why": "Influential point for blood — for any blood-stasis pattern",
                "why_cn": "血会膈俞——主治诸血瘀之证。",
            },
            {
                "cn": "三阴交", "py": "Sān Yīn Jiāo", "code": "SP6", "method": "acupuncture",
                "loc": "Inner leg, 3 cùn above the inner ankle bone, just behind the tibia",
                "loc_cn": "小腿内侧，内踝上三寸，胫骨内侧后缘。",
                "why": "Crosses three yin channels — effective for lower-abdominal blood stasis",
                "why_cn": "足三阴经交会之穴——治下腹与盆腔之血瘀甚效。",
            },
        ],
    },
}

SIGN_CATEGORIES: dict[str, list[dict[str, Any]]] = {
    "color": TONGUE_COLORS,
    "shape": TONGUE_SHAPES,
    "coating": TONGUE_COATINGS,
}

METHOD_LABELS = {
    "acupuncture": "Acupuncture · 针刺",
    "moxibustion": "Moxibustion · 艾灸",
    "massage": "Acupressure · 按摩",
}

DISCLAIMER = (
    "Educational self-observation, not a medical diagnosis. Tongue inspection is "
    "one of the four examinations (望闻问切); it cannot replace assessment by a "
    "qualified practitioner."
)


def find_sign(category: str, key: str) -> dict[str, Any] | None:
    """Look up one sign by category ('color' | 'shape' | 'coating') and key."""
    for item in SIGN_CATEGORIES.get(category, []):
        if item["key"] == key:
            return item
    return None
