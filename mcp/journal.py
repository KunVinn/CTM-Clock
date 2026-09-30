"""
Patient journal storage.

One JSON file per journal root, so records can be diffed, backed up or synced
without a database. Default root is ``~/.tcm-journal`` — deliberately outside
the site repository, because these records are patient data.
Override with the ``TCM_JOURNAL_DIR`` environment variable.
"""

from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any

from tcm_data import DISCLAIMER, METHOD_LABELS, TONGUE_PATTERNS, find_sign

RECORDS_FILE = "records.json"


def journal_root() -> Path:
    root = Path(os.environ.get("TCM_JOURNAL_DIR") or (Path.home() / ".tcm-journal"))
    root.mkdir(parents=True, exist_ok=True)
    return root


def _records_path() -> Path:
    return journal_root() / RECORDS_FILE


def load_records() -> list[dict[str, Any]]:
    path = _records_path()
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as handle:
        data = json.load(handle)
    return data if isinstance(data, list) else []


def save_records(records: list[dict[str, Any]]) -> None:
    path = _records_path()
    tmp = path.with_suffix(".json.tmp")
    with open(tmp, "w", encoding="utf-8") as handle:
        json.dump(records, handle, ensure_ascii=False, indent=2)
    tmp.replace(path)


def get_record(record_id: str) -> dict[str, Any] | None:
    for record in load_records():
        if record.get("record_id") == record_id:
            return record
    return None


def upsert_record(record: dict[str, Any]) -> dict[str, Any]:
    records = load_records()
    for index, existing in enumerate(records):
        if existing.get("record_id") == record["record_id"]:
            records[index] = record
            break
    else:
        records.append(record)
    records.sort(key=lambda r: (r.get("patient_id", ""), r.get("recorded_at", "")))
    save_records(records)
    return record


def search_records(
    patient_id: str | None = None,
    text: str | None = None,
    pattern: str | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
    tag: str | None = None,
) -> list[dict[str, Any]]:
    """Filter the journal; every argument is optional and ANDed together."""
    needle = (text or "").strip().lower()
    results = []
    for record in load_records():
        if patient_id and record.get("patient_id") != patient_id:
            continue
        stamp = (record.get("recorded_at") or "")[:10]
        if date_from and stamp < date_from:
            continue
        if date_to and stamp > date_to:
            continue
        if pattern and pattern not in [p["key"] for p in record.get("patterns", [])]:
            continue
        if tag and tag not in record.get("tags", []):
            continue
        if needle:
            haystack = json.dumps(record, ensure_ascii=False).lower()
            if needle not in haystack:
                continue
        results.append(record)
    return results


# =============================================================================
# REPORT RENDERING
# =============================================================================


def _sign_line(category: str, key: str | None) -> str:
    if not key:
        return "— not recorded —"
    item = find_sign(category, key)
    return f"{item['cn']} · {item['en']} (`{key}`)" if item else f"`{key}`"


def build_markdown_report(record: dict[str, Any], include_acupoints: bool = True) -> str:
    """Render one journal record as a practitioner-facing markdown report."""
    media = record.get("media") or {}
    lines: list[str] = [
        "# 舌诊报告 · Tongue Observation Report",
        "",
        f"- **Record ID:** `{record.get('record_id')}`",
        f"- **Patient:** `{record.get('patient_id')}`",
        f"- **Recorded:** {record.get('recorded_at')}",
    ]
    if media:
        lines += [
            f"- **Photo ID:** `{media.get('photo_id')}`",
            f"- **Source:** {media.get('kind')} · {media.get('file_name')} "
            f"({media.get('width')}×{media.get('height')})",
            f"- **Captured:** {media.get('captured_at')} "
            f"(from {media.get('captured_source')})",
            f"- **Checksum:** `sha256:{(media.get('sha256') or '')[:16]}…`",
        ]
        if media.get("camera"):
            camera = media["camera"]
            lines.append(
                f"- **Camera:** {camera.get('make', '')} {camera.get('model', '')}".rstrip()
            )
        if media.get("motion_path") or media.get("stored_motion_path"):
            lines.append("- **Live Photo:** motion file attached")
    if record.get("tags"):
        lines.append(f"- **Tags:** {', '.join(record['tags'])}")

    lines += [
        "",
        "## 观察 · Observed signs",
        "",
        f"| | |",
        f"| --- | --- |",
        f"| 舌色 Body colour | {_sign_line('color', record.get('signs', {}).get('color'))} |",
        f"| 舌形 Shape | {_sign_line('shape', record.get('signs', {}).get('shape'))} |",
        f"| 舌苔 Coating | {_sign_line('coating', record.get('signs', {}).get('coating'))} |",
    ]

    if record.get("symptoms"):
        lines += ["", "## 病症描述 · Symptoms in the patient's words", "", record["symptoms"]]

    patterns = record.get("patterns", [])
    lines += ["", "## 辨证 · Patterns that may apply", ""]
    if not patterns:
        lines.append("No pattern stood out from the recorded signs.")
    for entry in patterns:
        info = TONGUE_PATTERNS.get(entry["key"], {})
        lines += [
            f"### {info.get('cn', '')} · {info.get('en', entry['key'])}  "
            f"— score {entry.get('score')}",
            "",
            f"- **Evidence:** {', '.join(entry.get('evidence', [])) or '—'}",
            f"- **Common symptoms:** {info.get('symptoms', '')}",
            f"- **Lifestyle support:** {info.get('advice', '')}",
        ]
        if include_acupoints and info.get("acupoints"):
            lines.append("- **Acupoints:**")
            for point in info["acupoints"]:
                lines.append(
                    f"  - {point['cn']} {point['py']} ({point['code']}) — "
                    f"{METHOD_LABELS.get(point['method'], point['method'])}; "
                    f"{point['loc']}"
                )
        lines.append("")

    if record.get("ai_notes"):
        lines += ["## 人工智能初判 · AI first pass (unverified)", "", record["ai_notes"], ""]

    lines += ["## 医师反馈 · Practitioner feedback", ""]
    feedback = record.get("feedback", [])
    if feedback:
        for item in feedback:
            lines += [
                f"**{item.get('practitioner', 'practitioner')}** — {item.get('at')}",
                "",
                f"- *Impression:* {item.get('impression', '')}",
                f"- *Plan:* {item.get('plan', '')}",
                f"- *Agrees with screening:* {item.get('agrees', 'not stated')}",
                "",
            ]
    else:
        lines += [
            "_Awaiting review._ The practitioner can confirm or correct each sign,",
            "then record their impression and plan via `add_practitioner_feedback`.",
            "",
        ]

    lines += ["---", "", f"> {DISCLAIMER}"]
    return "\n".join(lines)


def build_timeline(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Condense records into one row each, for tracking change over time."""
    rows = []
    for record in sorted(records, key=lambda r: r.get("recorded_at", "")):
        media = record.get("media") or {}
        rows.append(
            {
                "recorded_at": record.get("recorded_at"),
                "record_id": record.get("record_id"),
                "photo_id": media.get("photo_id"),
                "kind": media.get("kind"),
                "color": record.get("signs", {}).get("color"),
                "shape": record.get("signs", {}).get("shape"),
                "coating": record.get("signs", {}).get("coating"),
                "top_patterns": [p["key"] for p in record.get("patterns", [])[:3]],
                "reviewed": bool(record.get("feedback")),
                "tags": record.get("tags", []),
            }
        )
    return rows


def new_record_id(patient_id: str, when: datetime) -> str:
    return f"{patient_id}-{when.strftime('%Y%m%d-%H%M%S')}"
