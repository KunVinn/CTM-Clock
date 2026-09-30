"""Small local TCM knowledge base used by patient-facing MCP tools.

The base is deliberately transparent: entries are assembled from the same
reference data used by pattern matching, and question answers return entry IDs
so a practitioner can inspect exactly what informed the response.
"""

from __future__ import annotations

import re
from typing import Any
from urllib.parse import quote_plus

from remote_knowledge import search as search_remote
from tcm_data import DISCLAIMER, SIGN_CATEGORIES, TONGUE_PATTERNS, TONGUE_ZONES

SOURCE = "CTM-Clock local TCM tongue reference (educational; practitioner review required)"
TCMKD_URL = "https://cbcb.cdutcm.edu.cn/TCMKD/"

GENERAL_LINKS = [
    {
        "title": "NCCIH: Traditional Chinese Medicine",
        "url": "https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know",
        "why": "Evidence and safety information about common TCM approaches.",
    },
    {
        "title": "NCCIH: Acupuncture",
        "url": "https://www.nccih.nih.gov/health/acupuncture",
        "why": "Safety, evidence and questions to discuss with a clinician.",
    },
    {
        "title": "MedlinePlus: Health Information",
        "url": "https://medlineplus.gov/",
        "why": "Patient-friendly medical information from the U.S. National Library of Medicine.",
    },
    {
        "title": "TCMKD: TCM Knowledge Discovery",
        "url": TCMKD_URL,
        "why": "Research knowledge-discovery portal from Chengdu University of Traditional Chinese Medicine.",
    },
    {
        "title": "TCMKD publication",
        "url": "https://doi.org/10.1016/j.jpha.2025.101297",
        "why": "Publication describing the TCMKD platform and its research basis.",
    },
]

STOPWORDS = {
    "a", "an", "and", "are", "can", "do", "for", "from", "how", "i", "in",
    "is", "it", "me", "my", "of", "on", "or", "should", "the", "tell", "that",
    "this", "to", "what", "when", "with", "you", "your",
}

SIGN_ALIASES = {
    "thick-white": ["舌苔厚", "舌苔厚白", "厚白苔", "很厚", "厚苔", "thick coat", "thick coating"],
    "thin-white": ["舌苔薄", "舌苔白", "白苔", "薄苔", "normal coat", "normal coating"],
    "greasy": ["舌苔腻", "腻苔", "sticky coat", "sticky coating"],
    "yellow": ["舌苔黄", "黄苔", "yellow coat", "yellow coating"],
    "peeled": ["舌苔少", "无苔", "peeled coat", "no coating"],
    "pale": ["舌色淡", "舌淡", "pale tongue"],
    "red": ["舌色红", "舌红", "red tongue"],
    "tooth-marked": ["齿痕舌", "舌边齿痕", "scalloped tongue"],
    "cracked": ["裂纹舌", "舌裂", "cracked tongue"],
}

FAQS: list[dict[str, Any]] = [
    {
        "id": "faq-what-tongue-shows",
        "title": "What can tongue observation tell me?",
        "title_cn": "舌诊能看出什么？",
        "topics": ["tongue", "observation", "diagnosis", "舌诊", "舌象"],
        "text": (
            "Tongue observation is one part of the traditional four examinations. "
            "Body colour, shape and coating may provide clues about patterns, but a "
            "tongue photo cannot establish a diagnosis by itself. A practitioner also "
            "needs symptoms, history, pulse and direct observation."
        ),
        "text_cn": "舌诊属于望闻问切四诊之一。舌色、舌形、舌苔可提示证候线索，但单凭舌照不能确诊；还需结合症状、病史、脉诊与面诊。",
    },
    {
        "id": "faq-photo-quality",
        "title": "How should I take a tongue photo?",
        "title_cn": "怎样拍舌照？",
        "topics": ["photo", "camera", "light", "舌照", "拍照"],
        "text": (
            "Take the photo in natural daylight, before brushing, eating or drinking. "
            "Keep the camera and background consistent, extend the tongue naturally for "
            "10–15 seconds, and keep it centred. Avoid flash and coloured indoor light."
        ),
        "text_cn": "晨起未刷牙、未进食饮前，在自然光下拍摄；每次保持相同位置与背景。舌头自然伸出，不要用力或久伸，避免闪光灯和彩色室内灯。",
    },
    {
        "id": "faq-ai-limit",
        "title": "Can AI diagnose me from a photo?",
        "title_cn": "人工智能能凭舌照诊断吗？",
        "topics": ["ai", "image", "diagnosis", "人工智能", "诊断"],
        "text": (
            "No. AI can organise observations and suggest questions for a practitioner, "
            "but it can be wrong because lighting, camera processing, food, medicine and "
            "framing change a photo. Treat every AI result as an unverified first pass."
        ),
        "text_cn": "不能。人工智能只能整理观察结果、帮助准备向医师咨询的问题；光线、相机处理、食物、药物与构图都可能造成误判。所有 AI 结果均须视为未经验证的初判。",
    },
    {
        "id": "faq-practitioner-feedback",
        "title": "What should I ask my practitioner to review?",
        "title_cn": "请医师重点复核什么？",
        "topics": ["doctor", "feedback", "review", "practitioner", "医师", "复核"],
        "text": (
            "Ask the practitioner to confirm or correct the body colour, shape, coating, "
            "symptoms and likely pattern. They can then record an impression and follow-up "
            "plan. Keeping the original screening alongside the correction makes the journal useful."
        ),
        "text_cn": "请医师复核并更正舌色、舌形、舌苔、症状与可能证型，再记录判断和后续计划。将初判与医师修正一并保留，日后追踪更有价值。",
    },
    {
        "id": "faq-urgent-care",
        "title": "When should I seek medical care urgently?",
        "title_cn": "什么时候应尽快就医？",
        "topics": ["urgent", "emergency", "red flag", "急诊", "就医", "危险"],
        "text": (
            "Do not wait for a tongue analysis if you have trouble breathing, chest pain, "
            "new weakness or confusion, fainting, severe allergic swelling, uncontrolled "
            "bleeding, sudden severe pain, or thoughts of harming yourself. Use local emergency services."
        ),
        "text_cn": "如有呼吸困难、胸痛、新发肢体无力或意识混乱、晕厥、严重过敏肿胀、无法控制的出血、突发剧烈疼痛或自伤念头，不要等待舌诊结果，请立即使用当地急救服务。",
    },
    {
        "id": "faq-recurrent-mouth-ulcers",
        "title": "What should I know about recurrent mouth ulcers?",
        "title_cn": "反复口腔溃疡应注意什么？",
        "topics": ["mouth ulcer", "mouth ulcers", "oral ulcer", "canker sore", "口腔溃疡", "溃疡", "口疮"],
        "text": (
            "Recurrent mouth ulcers have many possible causes and are not proof of a single TCM pattern. "
            "Avoid foods that clearly trigger pain, keep the mouth clean, and ask a dentist or clinician for review if an ulcer lasts longer than two weeks, returns often, is unusually large or painful, or comes with fever, weight loss or difficulty swallowing."
        ),
        "text_cn": "反复口腔溃疡有多种可能原因，不能仅凭此认定某一种中医证型。可避开明显诱发疼痛的食物并保持口腔清洁；若单个溃疡超过两周不愈、经常复发、范围大或疼痛明显，或伴发热、体重下降、吞咽困难，应请牙医或临床医师评估。",
    },
    {
        "id": "faq-medication",
        "title": "Can I change medicine from a tongue result?",
        "title_cn": "能否根据舌象自行换药？",
        "topics": ["medicine", "medication", "treatment", "药物", "用药", "治疗"],
        "text": (
            "No. Do not start, stop or change prescribed medicine based on a tongue result. "
            "Ask the prescribing clinician or a qualified practitioner, especially during "
            "pregnancy, for children, or with chronic disease."
        ),
        "text_cn": "不能。不要根据舌象自行开始、停用或更改处方药；孕期、儿童或有慢性病时更应先咨询开药医师或合格中医师。",
    },
]


def _norm(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip().lower())


def _tokens(value: str) -> list[str]:
    text = _norm(value)
    words = re.findall(r"[a-z0-9][a-z0-9'-]*|[\u3400-\u9fff]", text)
    # Include short CJK n-grams so questions like "舌苔很厚" match "舌苔".
    cjk = re.findall(r"[\u3400-\u9fff]+", text)
    for group in cjk:
        words.extend(group[i : i + 2] for i in range(len(group) - 1))
    return list(dict.fromkeys(words))


def _build_entries() -> list[dict[str, Any]]:
    entries = list(FAQS)
    for category, signs in SIGN_CATEGORIES.items():
        for sign in signs:
            entries.append(
                {
                    "id": f"sign-{category}-{sign['key']}",
                    "title": f"{category.title()}: {sign['en']}",
                    "title_cn": f"{category}：{sign['cn']}",
                    "topics": [
                        category,
                        sign["key"],
                        sign["cn"],
                        sign["en"],
                        *SIGN_ALIASES.get(sign["key"], []),
                    ],
                    "text": sign["meaning"],
                    "text_cn": sign["meaning_cn"],
                    "sign_category": category,
                    "sign_key": sign["key"],
                }
            )
    for zone in TONGUE_ZONES:
        entries.append(
            {
                "id": f"zone-{zone['key']}",
                "title": f"Tongue zone: {zone['en']}",
                "title_cn": f"舌区：{zone['cn']}",
                "topics": [zone["key"], zone["cn"], zone["en"], zone["organ"], zone["organ_cn"]],
                "text": zone["desc"],
                "text_cn": zone["desc"],
            }
        )
    for key, pattern in TONGUE_PATTERNS.items():
        entries.append(
            {
                "id": f"pattern-{key}",
                "title": f"Pattern: {pattern['en']}",
                "title_cn": f"证型：{pattern['cn']}",
                "topics": [key, pattern["en"], pattern["cn"], *pattern.get("keywords", [])],
                "text": (
                    f"Common associated experiences: {pattern['symptoms']} "
                    f"Educational lifestyle support: {pattern['advice']}"
                ),
                "text_cn": (
                    f"常见相关表现：{pattern['symptoms_cn']} "
                    f"调护参考：{pattern['advice_cn']}"
                ),
                "pattern_key": key,
                "acupoints": [
                    {
                        "name": point["cn"],
                        "code": point["code"],
                        "method": point["method"],
                        "location": point["loc"],
                    }
                    for point in pattern.get("acupoints", [])
                ],
            }
        )
    return entries


ENTRIES = _build_entries()


def search(query: str, limit: int = 5) -> list[dict[str, Any]]:
    """Return transparent lexical matches from the local knowledge base."""
    remote_matches = search_remote(query, limit)
    tokens = [token for token in _tokens(query) if token not in STOPWORDS]
    tokens = [token for token in tokens if not (len(token) == 1 and not token.isascii())]
    if not tokens:
        return remote_matches
    ranked: list[tuple[float, dict[str, Any]]] = []
    for entry in ENTRIES:
        searchable = [
            entry["id"],
            entry["title"],
            entry["title_cn"],
            " ".join(str(topic) for topic in entry.get("topics", [])),
        ]
        if not entry["id"].startswith("faq-"):
            searchable.extend((entry["text"], entry["text_cn"]))
        haystack = _norm(" ".join(searchable))
        hits = [token for token in tokens if token in haystack]
        if not hits:
            continue
        exact_topic_hits = sum(token in [_norm(str(t)) for t in entry.get("topics", [])] for token in tokens)
        score = len(set(hits)) + (exact_topic_hits * 1.5)
        ranked.append((score, {**entry, "matched_terms": sorted(set(hits)), "score": round(score, 2)}))
    ranked.sort(key=lambda pair: (-pair[0], pair[1]["id"]))
    local_matches = [entry for _, entry in ranked[: max(1, min(limit, 10))]]
    return (remote_matches + local_matches)[: max(1, min(limit, 10))]


def web_links(query: str) -> list[dict[str, str]]:
    """Return a query-specific search link plus stable public-health references."""
    return [
        {
            "title": "Search reputable medical sources",
            "url": "https://www.google.com/search?q=" + quote_plus(
                query + " site:nih.gov OR site:medlineplus.gov OR site:nhs.uk"
            ),
            "why": "A query-specific starting point limited to major public-health sources.",
        },
        *GENERAL_LINKS,
    ]


def answer(question: str, limit: int = 3, context: dict[str, Any] | None = None) -> dict[str, Any]:
    """Create a bounded patient answer from the highest-scoring local entries."""
    context = context or {}
    matches = search(question, limit)
    normalized_question = _norm(question)
    unspecified_white_coating = (
        ("舌苔白" in normalized_question or "白苔" in normalized_question)
        and not any(term in normalized_question for term in ("薄", "厚", "腻", "腻苔", "薄苔", "厚苔"))
    )
    if unspecified_white_coating:
        matches = [entry for entry in matches if entry.get("sign_category") != "coating"]
    urgent_terms = {"呼吸困难", "胸痛", "晕厥", "急诊", "emergency", "trouble breathing", "chest pain", "fainting"}
    urgent = any(term in _norm(question) for term in urgent_terms)
    if not matches:
        return {
            "question": question,
            "answer": (
                "I could not find a grounded answer in this local TCM reference. "
                "Please describe the symptom to a qualified clinician rather than "
                "using an unverified pattern guess."
            ),
            "answer_cn": "本地中医参考库中没有找到足够依据。请将症状直接告诉合格医师，不要依据未经验证的证型猜测自行处理。",
            "references": [],
            "web_links": web_links(question),
            "needs_practitioner": True,
            "urgent": urgent,
            "disclaimer": DISCLAIMER,
        }

    bullets_en = [f"**{entry['title']}**: {entry['text']}" for entry in matches]
    bullets_cn = [f"**{entry['title_cn']}**：{entry['text_cn']}" for entry in matches]
    answer_en = "\n\n".join(bullets_en)
    answer_cn = "\n\n".join(bullets_cn)
    context_items = []
    context_items_cn = []
    signs = context.get("signs") or {}
    if isinstance(signs, dict):
        selected = [str(value) for value in signs.values() if value]
        if selected:
            context_items.append("selected tongue signs: " + ", ".join(selected[:3]))
            context_items_cn.append("已选舌象：" + "、".join(selected[:3]))
    symptoms = str(context.get("symptoms", "")).strip()
    if symptoms:
        context_items.append("patient-described symptoms: " + symptoms[:500])
        context_items_cn.append("患者自述症状：" + symptoms[:500])
    notes = str(context.get("notes", "")).strip()
    if notes:
        context_items.append("patient context notes: " + notes[:500])
        context_items_cn.append("患者补充备注：" + notes[:500])
    ai_result = context.get("ai_result")
    if isinstance(ai_result, dict):
        ai_signs = [str(ai_result.get(key)) for key in ("body_color", "shape", "coating") if ai_result.get(key)]
        if ai_signs:
            ai_detail = ", ".join(ai_signs)
            if ai_result.get("patterns"):
                ai_detail += "; patterns: " + ", ".join(str(item) for item in ai_result["patterns"][:3])
            if ai_result.get("confidence"):
                ai_detail += "; confidence: " + str(ai_result["confidence"])
            if ai_result.get("body_color_note") or ai_result.get("coating_note") or ai_result.get("shape_note"):
                ai_detail += "; notes: " + "; ".join(
                    str(ai_result[key]) for key in ("body_color_note", "shape_note", "coating_note") if ai_result.get(key)
                )
            context_items.append("optional photo-AI observations: " + ai_detail)
            context_items_cn.append("可选照片 AI 观察：" + ai_detail)
    practitioner_feedback = str(context.get("practitioner_feedback", "")).strip()
    if practitioner_feedback:
        context_items.append("practitioner feedback supplied: " + practitioner_feedback[:500])
        context_items_cn.append("已提供医师反馈：" + practitioner_feedback[:500])
    if context_items:
        answer_en = (
            "**Context included**: " + "; ".join(context_items) + ". This context helps organize questions; it does not establish a diagnosis."
            + ("\n\n" + answer_en if answer_en else "")
        )
        answer_cn = (
            "**已纳入的背景**：" + "；".join(context_items_cn) + "。背景资料只用于整理问题，不能据此确诊。"
            + ("\n\n" + answer_cn if answer_cn else "")
        )
    if unspecified_white_coating:
        clarification_en = (
            "**White coating needs more detail**: White alone cannot show whether the coating is thin, thick, greasy/sticky, or partly peeled. "
            "Please note its thickness, whether it is greasy or easy to scrape off, and any symptoms; a photo and practitioner assessment are needed for interpretation."
        )
        clarification_cn = (
            "**白苔需要进一步描述**：只说“白”不能判断是薄白苔、厚白苔、腻白苔，还是剥苔。请补充厚薄、是否油腻、能否轻易刮去及伴随症状；舌照仍需结合医师辨证。"
        )
        answer_en = clarification_en + ("\n\n" + answer_en if answer_en else "")
        answer_cn = clarification_cn + ("\n\n" + answer_cn if answer_cn else "")
    if urgent:
        answer_en = "**Urgent safety note:** use local emergency services now if this is happening.\n\n" + answer_en
        answer_cn = "**紧急提示：**如正在发生这些危险症状，请立即使用当地急救服务。\n\n" + answer_cn
    return {
        "question": question,
        "answer": answer_en,
        "answer_cn": answer_cn,
        "references": [
            {
                "id": entry["id"],
                "title": entry["title"],
                "title_cn": entry["title_cn"],
                "matched_terms": entry["matched_terms"],
                "source": entry.get("source", SOURCE),
                "source_url": entry.get("source_url", ""),
            }
            for entry in matches
        ],
        "knowledge_sources": sorted({entry.get("source", SOURCE) for entry in matches}),
        "needs_practitioner": True,
        "urgent": urgent,
        "context_included": bool(context_items),
        "disclaimer": DISCLAIMER,
    }


def reference_markdown() -> str:
    """Expose the knowledge-base catalogue as a reviewable MCP resource."""
    lines = [f"# TCM Patient Knowledge Base\n\nSource: {SOURCE}\n"]
    for entry in ENTRIES:
        lines += [
            f"## `{entry['id']}` · {entry['title_cn']} / {entry['title']}",
            "",
            entry["text_cn"],
            "",
            entry["text"],
            "",
        ]
    lines += [f"---\n\n{DISCLAIMER}"]
    return "\n".join(lines)
