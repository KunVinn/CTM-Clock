"""
TCM Diagnosis MCP Server — tongue-based patient screening, journaling and reporting.

Provides tools for:
- Looking up tongue signs (body colour, shape, coating) and TCM patterns
- Matching signs plus a free-text symptom description to ranked patterns
- Ingesting a photo, Live Photo or short video and giving it a sortable ID
- Estimating body colour and coating from the image, locally
- Keeping a per-patient journal so change can be tracked over time
- Rendering a practitioner-facing report and recording the practitioner's feedback
- Answering patient questions from a transparent local TCM knowledge base

Data is ported from ``tongue.html`` so the server and the web page agree on keys.
Nothing here is a medical diagnosis.

Run with:
    cd mcp
    python server.py
"""

from __future__ import annotations

import re
from collections import Counter
from datetime import datetime
from typing import Any

from mcp.server.fastmcp import FastMCP

import journal as jr
import knowledge as kb
import media as md
from tcm_data import (
    DISCLAIMER,
    METHOD_LABELS,
    SIGN_CATEGORIES,
    TONGUE_COATINGS,
    TONGUE_COLORS,
    TONGUE_PATTERNS,
    TONGUE_SHAPES,
    TONGUE_ZONES,
    find_sign,
)

mcp = FastMCP("TCM Diagnosis MCP Server")

SIGN_SCORE = 1.0
SYMPTOM_SCORE = 0.5
MAX_SYMPTOM_HITS = 3


# =============================================================================
# TOOLS — REFERENCE LOOKUP
# =============================================================================


@mcp.tool()
def list_tongue_signs(category: str = "") -> dict[str, Any]:
    """List the selectable tongue signs and the patterns each one points to.

    Args:
        category: ``color``, ``shape`` or ``coating``. Empty returns all three.

    Returns the sign keys the other tools accept, with bilingual labels.
    """
    wanted = [category] if category else list(SIGN_CATEGORIES)
    unknown = [c for c in wanted if c not in SIGN_CATEGORIES]
    if unknown:
        return {"error": f"Unknown category {unknown}", "categories": list(SIGN_CATEGORIES)}
    return {
        cat: [
            {
                "key": item["key"],
                "cn": item["cn"],
                "en": item["en"],
                "swatch": item.get("swatch"),
                "meaning": item["meaning"],
                "patterns": item["patterns"],
            }
            for item in SIGN_CATEGORIES[cat]
        ]
        for cat in wanted
    }


@mcp.tool()
def get_tongue_sign(category: str, key: str) -> dict[str, Any]:
    """Look up one tongue sign in full, including its Chinese explanation.

    Args:
        category: ``color``, ``shape`` or ``coating``.
        key: Sign key, e.g. ``pale``, ``tooth-marked``, ``greasy``.
    """
    item = find_sign(category, key)
    if not item:
        available = [i["key"] for i in SIGN_CATEGORIES.get(category, [])]
        return {"error": f"'{key}' not found in '{category}'.", "available_keys": available}
    return item


@mcp.tool()
def get_pattern(key: str) -> dict[str, Any]:
    """Return one TCM pattern: symptoms, lifestyle advice and acupoint suggestions.

    Args:
        key: Pattern key, e.g. ``qi-deficiency``, ``damp-heat``, ``blood-stasis``.
    """
    info = TONGUE_PATTERNS.get(key)
    if not info:
        return {"error": f"Unknown pattern '{key}'.", "available_keys": sorted(TONGUE_PATTERNS)}
    return {"key": key, **info}


@mcp.tool()
def suggest_acupoints(pattern_keys: list[str], method: str = "") -> dict[str, Any]:
    """Collect acupoint suggestions for one or more patterns, de-duplicated.

    Args:
        pattern_keys: Pattern keys, e.g. ``["qi-deficiency", "damp"]``.
        method: Optional filter — ``acupuncture``, ``moxibustion`` or ``massage``.

    Points shared by several patterns are listed once, with every pattern that
    called for them, so overlapping points surface as the priority ones.
    """
    collected: dict[str, dict[str, Any]] = {}
    unknown = []
    for key in pattern_keys:
        info = TONGUE_PATTERNS.get(key)
        if not info:
            unknown.append(key)
            continue
        for point in info.get("acupoints", []):
            if method and point["method"] != method:
                continue
            entry = collected.setdefault(
                point["code"],
                {**point, "method_label": METHOD_LABELS.get(point["method"]), "for_patterns": []},
            )
            entry["for_patterns"].append(key)

    points = sorted(collected.values(), key=lambda p: (-len(p["for_patterns"]), p["code"]))
    return {
        "requested_patterns": pattern_keys,
        "unknown_patterns": unknown,
        "num_points": len(points),
        "points": points,
        "safety": (
            "Acupuncture must be performed by a licensed practitioner. Moxibustion can be "
            "self-applied with care. Acupressure is the safest self-care option. LI4 and "
            "SP6 are contraindicated in pregnancy."
        ),
    }


@mcp.tool()
def search_tcm_knowledge(query: str, limit: int = 5) -> dict[str, Any]:
    """Search the local bilingual TCM knowledge base and return cited entries.

    Args:
        query: Patient question or keywords in English or Chinese.
        limit: Maximum number of matching entries, from 1 to 10.

    Results are assembled from the server's reviewable reference data rather
    than an unbounded web search.
    """
    matches = kb.search(query, limit)
    return {
        "source": kb.SOURCE,
        "query": query,
        "num_matches": len(matches),
        "matches": [
            {
                "id": entry["id"],
                "title": entry["title"],
                "title_cn": entry["title_cn"],
                "text": entry["text"],
                "text_cn": entry["text_cn"],
                "matched_terms": entry["matched_terms"],
                "score": entry["score"],
            }
            for entry in matches
        ],
        "web_links": kb.web_links(query) if not matches else [],
        "disclaimer": DISCLAIMER,
    }


@mcp.tool()
def ask_tcm_question(
    question: str,
    language: str = "auto",
    context: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Answer a patient's TCM question from grounded local reference entries.

    Args:
        question: The patient's question, in English or Chinese.
        language: ``en``, ``zh`` or ``auto``. ``auto`` returns both language fields.
        context: Optional page context with ``signs``, ``symptoms``, ``ai_result`` or
            ``practitioner_feedback``. These are organizing context only, not diagnoses.

    The response includes entry IDs and matched terms for auditability. It does
    not diagnose, prescribe, replace emergency care, or invent an answer when
    the local base has no relevant evidence.
    """
    if language not in {"auto", "en", "zh"}:
        return {"error": "language must be 'auto', 'en' or 'zh'."}
    result = kb.answer(question, context=context)
    if language == "en":
        result.pop("answer_cn", None)
    elif language == "zh":
        result["answer"] = result.pop("answer_cn")
    return result


# =============================================================================
# TOOLS — PATTERN MATCHING
# =============================================================================


def _symptom_hits(text: str, keywords: list[str]) -> list[str]:
    lowered = (text or "").lower()
    hits = []
    for word in keywords:
        token = word.lower()
        if not token:
            continue
        # ASCII keywords need word boundaries; CJK keywords are matched directly.
        found = (
            re.search(rf"\b{re.escape(token)}\b", lowered)
            if token.isascii()
            else token in lowered
        )
        if found:
            hits.append(word)
    return hits


def _rank_patterns(
    color: str = "", shape: str = "", coating: str = "", symptoms: str = ""
) -> tuple[list[dict[str, Any]], list[str]]:
    scores: dict[str, float] = {}
    evidence: dict[str, list[str]] = {}
    warnings: list[str] = []

    for category, key in (("color", color), ("shape", shape), ("coating", coating)):
        if not key:
            continue
        item = find_sign(category, key)
        if not item:
            warnings.append(f"Unknown {category} sign '{key}' — ignored.")
            continue
        for pattern in item["patterns"]:
            scores[pattern] = scores.get(pattern, 0.0) + SIGN_SCORE
            evidence.setdefault(pattern, []).append(f"{category}: {item['cn']} {item['en']}")

    if symptoms:
        for key, info in TONGUE_PATTERNS.items():
            hits = _symptom_hits(symptoms, info.get("keywords", []))
            if not hits:
                continue
            scores[key] = scores.get(key, 0.0) + min(len(hits), MAX_SYMPTOM_HITS) * SYMPTOM_SCORE
            evidence.setdefault(key, []).append("symptoms: " + ", ".join(hits[:6]))

    ranked = [
        {
            "key": key,
            "cn": TONGUE_PATTERNS[key]["cn"],
            "en": TONGUE_PATTERNS[key]["en"],
            "score": round(score, 2),
            "evidence": evidence.get(key, []),
        }
        for key, score in sorted(scores.items(), key=lambda kv: -kv[1])
        if key in TONGUE_PATTERNS
    ]
    return ranked, warnings


@mcp.tool()
def match_patterns(
    color: str = "",
    shape: str = "",
    coating: str = "",
    symptoms: str = "",
) -> dict[str, Any]:
    """Rank TCM patterns from observed tongue signs plus a symptom description.

    Each matching sign scores 1.0; symptom keyword hits add 0.5 each (capped at
    three hits per pattern), so a pattern backed by both the tongue and the
    patient's own words outranks one backed by the tongue alone.

    Args:
        color: Body colour key, e.g. ``pale``.
        shape: Shape key, e.g. ``tooth-marked``.
        coating: Coating key, e.g. ``greasy``.
        symptoms: Free text in English or Chinese, e.g. "口苦、易怒、睡不好".

    Returns the ranked patterns with the evidence behind each score.
    """
    ranked, warnings = _rank_patterns(color, shape, coating, symptoms)
    return {
        "signs": {"color": color or None, "shape": shape or None, "coating": coating or None},
        "symptoms": symptoms or None,
        "num_patterns": len(ranked),
        "patterns": ranked,
        "warnings": warnings,
        "disclaimer": DISCLAIMER,
    }


# =============================================================================
# TOOLS — MEDIA INTAKE AND IMAGE ANALYSIS
# =============================================================================


@mcp.tool()
def ingest_tongue_media(
    filepath: str,
    patient_id: str,
    captured_at: str = "",
    frame_second: float = 0.0,
    tags: list[str] | None = None,
    note: str = "",
    store: bool = True,
    analyze: bool = True,
) -> dict[str, Any]:
    """Identify a tongue photo, Live Photo or video clip and analyse its colour.

    Accepts JPEG/PNG/WEBP/HEIC stills, Apple Live Photos (the still plus its
    sibling ``.mov``, which is detected automatically) and MOV/MP4 clips, from
    which one frame is extracted for analysis.

    Every item gets ``photo_id`` = ``<patient>-<YYYYMMDD>-<HHMMSS>-<sha8>``:
    chronologically sortable per patient, stable across re-imports, and its own
    dedupe key. Capture time comes from EXIF when present, else the file's
    modification time; ``captured_source`` records which was used.

    Args:
        filepath: Path to the photo or video.
        patient_id: Patient identifier; slugified into the ID.
        captured_at: ISO timestamp overriding EXIF, e.g. ``2026-09-30T07:15:00``.
        frame_second: For video, which second to extract the still from.
        tags: Free labels for later filtering, e.g. ``["morning", "before-tea"]``.
        note: Short capture note.
        store: Copy the media into the journal so the record stays reproducible.
        analyze: Run the local colour heuristic on the still.

    Nothing is uploaded — the image is read on this machine only.
    """
    try:
        record = md.build_media_record(
            source=filepath,
            patient_id=patient_id,
            captured_at=captured_at or None,
            store_dir=jr.journal_root() if store else None,
            frame_second=frame_second,
            tags=tags or [],
            note=note,
        )
    except (FileNotFoundError, ValueError, RuntimeError) as exc:
        return {"error": str(exc)}

    out: dict[str, Any] = {"media": record}
    if analyze:
        try:
            out["analysis"] = md.analyze_still(record["still_path"])
        except (RuntimeError, OSError) as exc:
            out["analysis_error"] = str(exc)
    return out


@mcp.tool()
def analyze_tongue_photo(filepath: str) -> dict[str, Any]:
    """Estimate tongue body colour and coating from an image, without journaling it.

    Args:
        filepath: Path to a still image (or an already-extracted video frame).

    Averages the reddish pixels of the centre crop for body colour and the upper
    band for coating, then matches each against the reference swatches. Colour
    only — shape signs still need a human or vision-model reading.
    """
    try:
        return md.analyze_still(filepath)
    except (RuntimeError, OSError) as exc:
        return {"error": str(exc)}


# =============================================================================
# TOOLS — PATIENT JOURNAL
# =============================================================================


@mcp.tool()
def record_observation(
    patient_id: str,
    symptoms: str = "",
    color: str = "",
    shape: str = "",
    coating: str = "",
    photo_path: str = "",
    captured_at: str = "",
    frame_second: float = 0.0,
    tags: list[str] | None = None,
    ai_notes: str = "",
    use_photo_colors: bool = True,
) -> dict[str, Any]:
    """Save one dated observation to the patient journal and rank its patterns.

    Args:
        patient_id: Patient identifier.
        symptoms: The patient's own description of what they feel.
        color: Body colour key; omit to let the photo heuristic fill it in.
        shape: Shape key — cannot be derived from colour, so supply it if known.
        coating: Coating key; omit to let the photo heuristic fill it in.
        photo_path: Optional photo, Live Photo or video to attach.
        captured_at: ISO timestamp overriding EXIF.
        frame_second: For video, which second to extract the still from.
        tags: Free labels, e.g. ``["morning", "flare-up"]``.
        ai_notes: Any external AI first-pass text, stored verbatim as unverified.
        use_photo_colors: Fill missing colour/coating from the image estimate.

    Returns the stored record, including its ``record_id`` and ranked patterns.
    """
    now = datetime.now()
    patient = md.slugify(patient_id)
    media_record: dict[str, Any] | None = None
    analysis: dict[str, Any] | None = None

    if photo_path:
        try:
            media_record = md.build_media_record(
                source=photo_path,
                patient_id=patient,
                captured_at=captured_at or None,
                store_dir=jr.journal_root(),
                frame_second=frame_second,
                tags=tags or [],
            )
            analysis = md.analyze_still(media_record["still_path"])
        except (FileNotFoundError, ValueError, RuntimeError, OSError) as exc:
            return {"error": str(exc)}

    if use_photo_colors and analysis:
        if not color and analysis.get("body_color", {}).get("key"):
            color = analysis["body_color"]["key"]
        if not coating and analysis.get("coating", {}).get("key"):
            coating = analysis["coating"]["key"]

    ranked, warnings = _rank_patterns(color, shape, coating, symptoms)
    recorded_at = (media_record or {}).get("captured_at") or now.isoformat(timespec="seconds")
    record = {
        "record_id": (media_record or {}).get("photo_id") or jr.new_record_id(patient, now),
        "patient_id": patient,
        "recorded_at": recorded_at,
        "created_at": now.isoformat(timespec="seconds"),
        "signs": {"color": color or None, "shape": shape or None, "coating": coating or None},
        "sign_source": "photo-assisted" if analysis else "manual",
        "symptoms": symptoms.strip(),
        "patterns": ranked,
        "media": media_record,
        "analysis": analysis,
        "ai_notes": ai_notes.strip(),
        "tags": [md.slugify(t) for t in (tags or []) if t.strip()],
        "feedback": [],
    }
    jr.upsert_record(record)
    return {
        "record": record,
        "warnings": warnings,
        "journal_dir": str(jr.journal_root()),
        "next_step": "Call build_patient_report, then send it to a practitioner for review.",
        "disclaimer": DISCLAIMER,
    }


@mcp.tool()
def list_observations(patient_id: str = "", limit: int = 50) -> dict[str, Any]:
    """List journal entries as a compact timeline for tracking change over time.

    Args:
        patient_id: Restrict to one patient. Empty lists every patient.
        limit: Maximum number of rows, most recent last.

    Also returns how often each pattern has appeared, which is the signal that
    matters across a series — a single day's tongue means little.
    """
    records = jr.search_records(patient_id=md.slugify(patient_id) if patient_id else None)
    timeline = jr.build_timeline(records)[-max(1, limit):]
    frequency = Counter(key for row in timeline for key in row["top_patterns"])
    return {
        "journal_dir": str(jr.journal_root()),
        "patient_id": patient_id or "all",
        "num_records": len(records),
        "timeline": timeline,
        "pattern_frequency": [
            {"key": key, "cn": TONGUE_PATTERNS[key]["cn"], "count": count}
            for key, count in frequency.most_common()
            if key in TONGUE_PATTERNS
        ],
        "unreviewed": [row["record_id"] for row in timeline if not row["reviewed"]],
    }


@mcp.tool()
def search_observations(
    patient_id: str = "",
    text: str = "",
    pattern: str = "",
    date_from: str = "",
    date_to: str = "",
    tag: str = "",
) -> dict[str, Any]:
    """Search the journal by patient, free text, pattern, date range or tag.

    Args:
        patient_id: Patient identifier.
        text: Substring searched across symptoms, notes, feedback and IDs.
        pattern: Pattern key that must be present, e.g. ``damp-heat``.
        date_from: Inclusive lower bound, ``YYYY-MM-DD``.
        date_to: Inclusive upper bound, ``YYYY-MM-DD``.
        tag: Tag that must be present.

    All arguments are optional and combined with AND.
    """
    records = jr.search_records(
        patient_id=md.slugify(patient_id) if patient_id else None,
        text=text or None,
        pattern=pattern or None,
        date_from=date_from or None,
        date_to=date_to or None,
        tag=tag or None,
    )
    return {
        "num_matches": len(records),
        "matches": jr.build_timeline(records),
    }


@mcp.tool()
def get_observation(record_id: str) -> dict[str, Any]:
    """Return one complete journal record, including media metadata and feedback.

    Args:
        record_id: The ``record_id`` returned by ``record_observation``.
    """
    record = jr.get_record(record_id)
    if not record:
        return {"error": f"No record '{record_id}'.", "hint": "Use list_observations."}
    return record


@mcp.tool()
def build_patient_report(record_id: str, include_acupoints: bool = True) -> dict[str, Any]:
    """Render a journal record as a practitioner-facing markdown report.

    Args:
        record_id: The record to render.
        include_acupoints: Include acupoint suggestions per pattern.

    The report carries the photo ID, checksum and capture provenance so the
    practitioner can tie their feedback to the exact image that was reviewed.
    """
    record = jr.get_record(record_id)
    if not record:
        return {"error": f"No record '{record_id}'.", "hint": "Use list_observations."}
    return {
        "record_id": record_id,
        "photo_id": (record.get("media") or {}).get("photo_id"),
        "markdown": jr.build_markdown_report(record, include_acupoints),
    }


@mcp.tool()
def add_practitioner_feedback(
    record_id: str,
    practitioner: str,
    impression: str,
    plan: str = "",
    agrees: str = "",
    corrected_color: str = "",
    corrected_shape: str = "",
    corrected_coating: str = "",
) -> dict[str, Any]:
    """Attach a practitioner's review to a record, correcting the signs if needed.

    Args:
        record_id: The record being reviewed.
        practitioner: Name or identifier of the reviewing practitioner.
        impression: The practitioner's clinical impression.
        plan: Treatment or follow-up plan.
        agrees: ``yes``, ``partly`` or ``no`` — agreement with the screening.
        corrected_color: Corrected body colour key, if the screening was wrong.
        corrected_shape: Corrected shape key.
        corrected_coating: Corrected coating key.

    Corrections re-run the pattern ranking and keep the original screening under
    ``screening_before_review`` so the two can be compared later.
    """
    record = jr.get_record(record_id)
    if not record:
        return {"error": f"No record '{record_id}'.", "hint": "Use list_observations."}

    corrections = {
        "color": corrected_color,
        "shape": corrected_shape,
        "coating": corrected_coating,
    }
    applied = {k: v for k, v in corrections.items() if v}
    warnings: list[str] = []
    if applied:
        record.setdefault("screening_before_review", {
            "signs": dict(record.get("signs", {})),
            "patterns": list(record.get("patterns", [])),
        })
        record["signs"] = {**record.get("signs", {}), **applied}
        record["sign_source"] = "practitioner-corrected"
        ranked, warnings = _rank_patterns(
            record["signs"].get("color") or "",
            record["signs"].get("shape") or "",
            record["signs"].get("coating") or "",
            record.get("symptoms", ""),
        )
        record["patterns"] = ranked

    record.setdefault("feedback", []).append(
        {
            "at": datetime.now().isoformat(timespec="seconds"),
            "practitioner": practitioner,
            "impression": impression,
            "plan": plan,
            "agrees": agrees or "not stated",
            "corrections": applied,
        }
    )
    jr.upsert_record(record)
    return {"record": record, "corrections_applied": applied, "warnings": warnings}


# =============================================================================
# RESOURCES
# =============================================================================


@mcp.resource("tcm://tongue-zones")
def get_tongue_zones() -> str:
    """Tongue regions and the organ systems they reflect."""
    rows = "\n".join(
        f"| `{z['key']}` | {z['cn']} {z['en']} | {z['organ_cn']} · {z['organ']} | {z['desc']} |"
        for z in TONGUE_ZONES
    )
    return f"""# Tongue Zone-Organ Map

| Key | Zone | Reflects | Notes |
| --- | --- | --- | --- |
{rows}

Read the zone the change appears in together with the sign itself: a yellow
coat at the root points at the lower burner, the same coat in the centre at the
Spleen-Stomach.
"""


@mcp.resource("tcm://sign-reference")
def get_sign_reference() -> str:
    """Every selectable tongue sign with its key, meaning and pattern links."""
    def table(title: str, items: list[dict[str, Any]]) -> str:
        rows = "\n".join(
            f"| `{i['key']}` | {i['cn']} {i['en']} | {i['meaning']} | "
            f"{', '.join(i['patterns']) or '—'} |"
            for i in items
        )
        return f"## {title}\n\n| Key | Sign | Meaning | Points to |\n| --- | --- | --- | --- |\n{rows}\n"

    return "# Tongue Sign Reference\n\n" + "\n".join(
        [
            table("舌色 Body colour", TONGUE_COLORS),
            table("舌形 Shape", TONGUE_SHAPES),
            table("舌苔 Coating", TONGUE_COATINGS),
        ]
    )


@mcp.resource("tcm://pattern-reference")
def get_pattern_reference() -> str:
    """The TCM patterns this server can rank, with symptoms and advice."""
    blocks = []
    for key, info in TONGUE_PATTERNS.items():
        points = ", ".join(
            f"{p['cn']} {p['code']} ({p['method']})" for p in info.get("acupoints", [])
        )
        blocks.append(
            f"""## {info['cn']} · {info['en']} — `{key}`

- **Symptoms:** {info['symptoms']}
- **症候:** {info['symptoms_cn']}
- **Lifestyle:** {info['advice']}
- **Acupoints:** {points}
"""
        )
    return "# TCM Pattern Reference\n\n" + "\n".join(blocks)


@mcp.resource("tcm://photo-protocol")
def get_photo_protocol() -> str:
    """How to capture a tongue photo that is worth comparing over time."""
    return """# Tongue Photo Protocol

Comparability across a series matters more than any single shot. Keep the
capture conditions constant, or the colour drift will swamp the clinical signal.

1. **Time** — first thing in the morning, before brushing, eating or drinking.
2. **Light** — natural daylight, no direct sun, no coloured indoor bulbs, no
   flash. Same spot each time.
3. **Pose** — mouth open, tongue extended naturally, held 10-15 seconds at most.
   Straining or long extension makes the body look redder than it is.
4. **Framing** — the tongue fills the centre of the frame. The colour heuristic
   samples the central 60 percent and the upper band of it for coating.
5. **Avoid** — coffee, tea, beetroot, sweets and coloured medicines beforehand;
   they stain the coating.

## Accepted media

| Kind | Extensions | Notes |
| --- | --- | --- |
| Still | `.jpg` `.jpeg` `.png` `.webp` `.bmp` `.tif` | Analysed directly |
| HEIC still | `.heic` `.heif` | Needs the `pillow-heif` extra |
| Live Photo | `.heic`/`.jpg` plus sibling `.mov` | Still analysed, motion file linked |
| Video | `.mov` `.mp4` `.m4v` `.avi` `.mkv` | One frame extracted; needs `imageio-ffmpeg` |

Video is useful when a single still keeps catching a blink or a shadow: record
two seconds and pick the frame with `frame_second`.

## Identity

Each item is keyed `<patient>-<YYYYMMDD>-<HHMMSS>-<sha8>`, so records sort
chronologically per patient, re-importing the same file yields the same ID, and
the SHA-256 in the record proves the reviewed image was not swapped.
"""


@mcp.resource("tcm://record-schema")
def get_record_schema() -> str:
    """Fields stored per journal record."""
    return f"""# Journal Record Schema

Journal root: `TCM_JOURNAL_DIR` env var, default `~/.tcm-journal`.
Records live in `records.json`; media is copied to `media/<patient>/`.
The default root is outside the site repository because these are patient records.

| Field | Meaning |
| --- | --- |
| `record_id` | Equals `media.photo_id` when a photo is attached |
| `patient_id` | Slugified patient identifier |
| `recorded_at` | Capture time, EXIF-derived when available |
| `signs` | `color`, `shape`, `coating` keys |
| `sign_source` | `manual`, `photo-assisted` or `practitioner-corrected` |
| `symptoms` | The patient's own words |
| `patterns` | Ranked patterns with score and evidence |
| `media` | Photo ID, checksum, camera, dimensions, live/video links |
| `analysis` | Local colour estimate and its confidence |
| `ai_notes` | External AI first pass, stored verbatim and unverified |
| `tags` | Free labels for filtering |
| `feedback` | Practitioner reviews, appended over time |
| `screening_before_review` | Original screening, kept when a practitioner corrects it |

{DISCLAIMER}
"""


@mcp.resource("tcm://patient-knowledge")
def get_patient_knowledge() -> str:
    """Reviewable catalogue of the entries used to answer patient questions."""
    return kb.reference_markdown()


# =============================================================================
# PROMPTS
# =============================================================================


@mcp.prompt()
def diagnose_patient(patient_id: str = "", photo_path: str = "") -> str:
    """Guide a first-pass tongue screening for one patient."""
    return f"""Run a tongue screening.

Patient: {patient_id or '<patient id>'}
Photo / Live Photo / video: {photo_path or '<path, optional>'}

Steps:
1. Ask the patient to describe what they feel, in their own words, before
   looking at the tongue. Do not lead them with pattern names.
2. If media was supplied, call ingest_tongue_media to get its ID and the local
   colour estimate. Treat the estimate as a hint, not a reading.
3. Confirm or correct body colour and coating against list_tongue_signs, and
   ask for the shape signs the image cannot show: swollen, tooth-marked,
   cracked, red dots.
4. Call record_observation with the signs, the symptom text and the media path.
5. Read the ranked patterns and say plainly which evidence drove each one.
6. Call build_patient_report and tell the patient to have a practitioner review
   it. Never present the result as a diagnosis.

{DISCLAIMER}
"""


@mcp.prompt()
def answer_patient_question(question: str = "") -> str:
    """Guide a safe, cited answer to a patient's TCM question."""
    return f"""Answer this patient question using the local TCM knowledge base:

Question: {question or '<patient question>'}

Steps:
1. Call ask_tcm_question with the patient's exact words and `language=auto`.
2. Explain the matching reference entries in plain language; do not turn a
   pattern description into a diagnosis.
3. Include the returned reference IDs when handing the answer to a practitioner.
4. If `urgent` is true, put the emergency-care instruction first.
5. If `needs_practitioner` is true, invite the patient to share their symptoms,
   photo ID and report with a qualified practitioner.
6. Never recommend starting, stopping or changing medication from this answer.

{DISCLAIMER}
"""


@mcp.prompt()
def review_journal(patient_id: str = "", weeks: int = 4) -> str:
    """Guide a practitioner through reviewing a patient's recent records."""
    return f"""Review the tongue journal for {patient_id or '<patient id>'} over the last {weeks} weeks.

Steps:
1. Call list_observations for the patient and read the timeline plus
   pattern_frequency. A pattern appearing once is noise; one appearing across
   most records is the signal.
2. Check `unreviewed` and open each with build_patient_report.
3. For each record, confirm the capture conditions look comparable
   (see the tcm://photo-protocol resource) before reading anything into a
   colour change.
4. Record your conclusion with add_practitioner_feedback, correcting any sign
   the screening got wrong so the ranking is recomputed.
5. Summarise the direction of travel: improving, static, or worsening, and what
   would change your mind.
"""


def main() -> None:
    mcp.run()


if __name__ == "__main__":
    main()
