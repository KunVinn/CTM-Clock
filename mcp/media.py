"""
Media intake for tongue records.

Handles three source kinds and gives every one of them a stable, sortable ID:

- ``photo``      — JPEG/PNG/WEBP/HEIC still
- ``live_photo`` — HEIC/JPEG still with a sibling ``.mov`` motion file
- ``video``      — MOV/MP4 clip; a representative frame is extracted for analysis

Optional extras, imported lazily so the server still starts without them:
``pillow-heif`` (HEIC/Live Photo stills) and ``imageio-ffmpeg`` (video frames).
"""

from __future__ import annotations

import hashlib
import mimetypes
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image, ImageOps

from tcm_data import TONGUE_COATINGS, TONGUE_COLORS

STILL_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tif", ".tiff"}
HEIC_EXTS = {".heic", ".heif"}
VIDEO_EXTS = {".mov", ".mp4", ".m4v", ".avi", ".mkv"}

_EXIF_DATETIME_ORIGINAL = 36867
_EXIF_DATETIME_DIGITIZED = 36868
_EXIF_DATETIME = 306
_EXIF_MAKE = 271
_EXIF_MODEL = 272
_EXIF_ORIENTATION = 274
_EXIF_LENS = 42036

_heif_registered = False


def clean_path(filepath: str) -> str:
    """Windows 'Copy as path' wraps paths in quotes, which open() rejects."""
    return filepath.strip().strip('"').strip("'").strip()


def slugify(text: str, fallback: str = "anon") -> str:
    """Lower-case, filesystem- and ID-safe token; also blocks path traversal."""
    slug = re.sub(r"[^a-z0-9]+", "-", (text or "").strip().lower()).strip("-")
    return slug[:40] or fallback


def _register_heif() -> bool:
    global _heif_registered
    if _heif_registered:
        return True
    try:
        import pillow_heif  # type: ignore

        pillow_heif.register_heif_opener()
        _heif_registered = True
    except ImportError:
        return False
    return True


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for chunk in iter(lambda: handle.read(1 << 20), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _parse_exif_datetime(value: Any) -> datetime | None:
    if not isinstance(value, str):
        return None
    for fmt in ("%Y:%m:%d %H:%M:%S", "%Y-%m-%d %H:%M:%S"):
        try:
            return datetime.strptime(value.strip(), fmt)
        except ValueError:
            continue
    return None


def _read_exif(path: Path) -> dict[str, Any]:
    """Pull capture time, camera and orientation out of a still, if present."""
    info: dict[str, Any] = {}
    try:
        with Image.open(path) as img:
            info["width"], info["height"] = img.size
            exif = img.getexif()
    except Exception:
        return info

    if not exif:
        return info
    for tag in (_EXIF_DATETIME_ORIGINAL, _EXIF_DATETIME_DIGITIZED, _EXIF_DATETIME):
        taken = _parse_exif_datetime(exif.get(tag))
        if taken:
            info["captured_at"] = taken
            break
    camera = {
        "make": exif.get(_EXIF_MAKE),
        "model": exif.get(_EXIF_MODEL),
        "lens": exif.get(_EXIF_LENS),
    }
    camera = {k: str(v).strip() for k, v in camera.items() if v}
    if camera:
        info["camera"] = camera
    if exif.get(_EXIF_ORIENTATION):
        info["orientation"] = int(exif[_EXIF_ORIENTATION])
    return info


def _find_motion_sibling(path: Path) -> Path | None:
    """An Apple Live Photo is a still plus a same-stem video next to it."""
    for ext in (".mov", ".MOV", ".mp4", ".MP4"):
        candidate = path.with_suffix(ext)
        if candidate.exists() and candidate != path:
            return candidate
    return None


def _video_metadata(path: Path) -> dict[str, Any]:
    try:
        import imageio.v3 as iio  # type: ignore

        meta = iio.immeta(path, plugin="FFMPEG")
    except Exception:
        return {}
    out: dict[str, Any] = {}
    if meta.get("duration"):
        out["duration_s"] = round(float(meta["duration"]), 3)
    if meta.get("fps"):
        out["fps"] = round(float(meta["fps"]), 3)
    if meta.get("size"):
        out["width"], out["height"] = (int(v) for v in meta["size"])
    return out


def extract_video_frame(path: Path, out_path: Path, at_second: float = 0.0) -> Path:
    """Write one representative frame of a video to ``out_path`` as JPEG."""
    try:
        import imageio.v3 as iio  # type: ignore
    except ImportError as exc:
        raise RuntimeError(
            "Video frame extraction needs the 'imageio-ffmpeg' extra: "
            "pip install imageio imageio-ffmpeg — or pass a still image instead."
        ) from exc

    fps = _video_metadata(path).get("fps") or 30.0
    index = max(0, int(round(at_second * float(fps))))
    try:
        frame = iio.imread(path, index=index, plugin="FFMPEG")
    except Exception:
        frame = iio.imread(path, index=0, plugin="FFMPEG")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(np.asarray(frame)).convert("RGB").save(out_path, quality=92)
    return out_path


def open_still(path: Path) -> Image.Image:
    """Open a still as upright RGB, registering the HEIC opener when needed."""
    if path.suffix.lower() in HEIC_EXTS and not _register_heif():
        raise RuntimeError(
            "HEIC/Live Photo stills need the 'pillow-heif' extra: pip install pillow-heif "
            "— or export the photo as JPEG first."
        )
    with Image.open(path) as img:
        return ImageOps.exif_transpose(img).convert("RGB")


# =============================================================================
# INTAKE — identity, provenance and storage
# =============================================================================


def build_media_record(
    source: str,
    patient_id: str,
    captured_at: str | None = None,
    store_dir: Path | None = None,
    frame_second: float = 0.0,
    tags: list[str] | None = None,
    note: str = "",
) -> dict[str, Any]:
    """Identify a photo/live photo/video and produce its record metadata.

    The returned ``photo_id`` is ``<patient>-<YYYYMMDD>-<HHMMSS>-<hash8>``, which
    sorts chronologically per patient, stays stable across re-imports of the same
    file, and carries its own dedupe key.
    """
    path = Path(clean_path(source)).expanduser().resolve(strict=True)
    ext = path.suffix.lower()
    patient = slugify(patient_id)

    if ext in VIDEO_EXTS:
        kind = "video"
    elif ext in STILL_EXTS or ext in HEIC_EXTS:
        kind = "photo"
    else:
        raise ValueError(
            f"Unsupported media type '{ext}'. Stills: {sorted(STILL_EXTS | HEIC_EXTS)}; "
            f"video: {sorted(VIDEO_EXTS)}."
        )

    record: dict[str, Any] = {
        "kind": kind,
        "source_path": str(path),
        "file_name": path.name,
        "file_size_bytes": path.stat().st_size,
        "mime": mimetypes.guess_type(path.name)[0],
        "sha256": _sha256(path),
    }

    motion_path: Path | None = None
    if kind == "photo":
        record.update(_read_exif(path))
        motion_path = _find_motion_sibling(path)
        if motion_path:
            record["kind"] = kind = "live_photo"
            record["motion_path"] = str(motion_path)
            record["motion_metadata"] = _video_metadata(motion_path)
    else:
        record.update(_video_metadata(path))
        record["frame_second"] = frame_second

    taken = None
    if captured_at:
        taken = _parse_exif_datetime(captured_at) or datetime.fromisoformat(captured_at)
        record["captured_source"] = "argument"
    elif isinstance(record.get("captured_at"), datetime):
        taken = record["captured_at"]
        record["captured_source"] = "exif"
    if taken is None:
        taken = datetime.fromtimestamp(path.stat().st_mtime)
        record["captured_source"] = "file-mtime"

    record["captured_at"] = taken.isoformat(timespec="seconds")
    record["sequence_key"] = taken.strftime("%Y%m%dT%H%M%S")
    record["captured_date"] = taken.strftime("%Y-%m-%d")
    record["captured_time_of_day"] = taken.strftime("%H:%M")
    record["patient_id"] = patient
    record["photo_id"] = (
        f"{patient}-{taken.strftime('%Y%m%d-%H%M%S')}-{record['sha256'][:8]}"
    )
    record["tags"] = [slugify(t) for t in (tags or []) if t.strip()]
    if note.strip():
        record["note"] = note.strip()
    record["ingested_at"] = datetime.now(timezone.utc).isoformat(timespec="seconds")

    still_path = path
    if store_dir is not None:
        media_dir = Path(store_dir) / "media" / patient
        media_dir.mkdir(parents=True, exist_ok=True)
        stored = media_dir / f"{record['photo_id']}{ext}"
        if not stored.exists():
            shutil.copy2(path, stored)
        record["stored_path"] = str(stored)
        still_path = stored
        if motion_path:
            stored_motion = media_dir / f"{record['photo_id']}{motion_path.suffix.lower()}"
            if not stored_motion.exists():
                shutil.copy2(motion_path, stored_motion)
            record["stored_motion_path"] = str(stored_motion)

    if kind == "video":
        frame_dir = Path(store_dir) / "media" / patient if store_dir else path.parent
        frame_out = frame_dir / f"{record['photo_id']}-frame.jpg"
        record["still_path"] = str(extract_video_frame(path, frame_out, frame_second))
    else:
        record["still_path"] = str(still_path)

    if not record.get("width"):
        try:
            with open_still(Path(record["still_path"])) as img:
                record["width"], record["height"] = img.size
        except Exception:
            pass
    return record


# =============================================================================
# PIXEL HEURISTIC — nearest-swatch body colour and coating
# =============================================================================


def _hex_to_rgb(value: str) -> tuple[int, int, int]:
    raw = value.lstrip("#")
    return int(raw[0:2], 16), int(raw[2:4], 16), int(raw[4:6], 16)


def _color_distance(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    """Weighted RGB distance — the same approximation the web page uses."""
    r_mean = (a[0] + b[0]) / 2
    dr, dg, db = a[0] - b[0], a[1] - b[1], a[2] - b[2]
    return float(
        np.sqrt(
            (2 + r_mean / 256) * dr * dr
            + 4 * dg * dg
            + (2 + (255 - r_mean) / 256) * db * db
        )
    )


def _nearest_swatch(rgb: tuple[int, int, int], palette: list[dict[str, Any]]):
    best, best_distance = None, float("inf")
    for item in palette:
        if not item.get("swatch"):
            continue
        distance = _color_distance(rgb, _hex_to_rgb(item["swatch"]))
        if distance < best_distance:
            best, best_distance = item, distance
    return best, best_distance


def _mean_rgb(pixels: np.ndarray, reddish_only: bool = False):
    """Average the usable pixels, dropping shadow, glare and (optionally) non-red."""
    flat = pixels.reshape(-1, 3).astype(np.int16)
    luminance = flat.mean(axis=1)
    keep = (luminance >= 50) & (luminance <= 240)
    if reddish_only:
        keep &= (flat[:, 0] > flat[:, 1] - 5) & (flat[:, 0] > flat[:, 2] - 5)
    usable = flat[keep]
    if usable.size == 0:
        return None, 0
    mean = usable.mean(axis=0).round().astype(int)
    return (int(mean[0]), int(mean[1]), int(mean[2])), int(usable.shape[0])


def analyze_still(still_path: str) -> dict[str, Any]:
    """Estimate tongue body colour and coating from the centre of a still."""
    img = open_still(Path(clean_path(still_path)))
    max_dim = 400
    scale = min(1.0, max_dim / max(img.size))
    if scale < 1.0:
        img = img.resize((round(img.width * scale), round(img.height * scale)))
    arr = np.asarray(img)
    height, width = arr.shape[:2]

    # The capture guide asks the user to fill the centre of the frame.
    y0, x0 = round(height * 0.20), round(width * 0.20)
    y1, x1 = y0 + round(height * 0.60), x0 + round(width * 0.60)
    crop = arr[y0:y1, x0:x1]
    coating_band = crop[: max(1, round(crop.shape[0] * 0.40))]

    body_rgb, body_n = _mean_rgb(crop, reddish_only=True)
    coat_rgb, coat_n = _mean_rgb(coating_band)

    result: dict[str, Any] = {
        "still_path": str(Path(clean_path(still_path))),
        "analyzed_size": [width, height],
        "sampled_pixels": {"body": body_n, "coating": coat_n},
        "method": "centre-crop nearest-swatch colour match (runs locally, no upload)",
        "limits": (
            "Colour only. Shape signs (swollen, tooth-marked, cracked, red dots) and "
            "coating thickness still need a human or vision-model reading."
        ),
    }

    if body_rgb:
        match, distance = _nearest_swatch(body_rgb, TONGUE_COLORS)
        result["body_color"] = {
            "mean_rgb": list(body_rgb),
            "key": match["key"] if match else None,
            "cn": match["cn"] if match else None,
            "en": match["en"] if match else None,
            "match_distance": round(distance, 1),
            "confidence": "medium" if distance < 60 else "low",
        }
    if coat_rgb:
        match, distance = _nearest_swatch(coat_rgb, TONGUE_COATINGS)
        result["coating"] = {
            "mean_rgb": list(coat_rgb),
            "key": match["key"] if match else None,
            "cn": match["cn"] if match else None,
            "en": match["en"] if match else None,
            "match_distance": round(distance, 1),
            "confidence": "medium" if distance < 60 else "low",
        }
    if not body_rgb and not coat_rgb:
        result["error"] = (
            "No usable pixels — the frame is too dark, too bright, or the tongue is "
            "not centred. Retake in daylight with the tongue filling the middle."
        )
    return result
