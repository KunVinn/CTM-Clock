"""
For each stub file (no knowledgeId extractable), predict the kid by
linear interpolation from the nearest non-stub neighbors.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
PAGES = ROOT / 'downloaded_course_pages'

KID_RE = re.compile(r'var\s+knowledgeId\s*=\s*"(\d+)"')

# Map file_index -> (filename, name, kid_or_None)
files = []
for f in sorted(PAGES.glob('[0-9][0-9][0-9]_*.html')):
    idx = int(f.name[:3])
    name = f.stem.split('_', 1)[1] if '_' in f.stem else ''
    txt = f.read_text(encoding='utf-8', errors='replace')
    m = KID_RE.search(txt)
    kid = int(m.group(1)) if m else None
    files.append((idx, name, kid))

# Stub files we want to predict.
STUBS = {
    '梁丘': 'st34',
    '冲阳': 'st42',
    '陷谷': 'st43',
    '内庭': 'st44',
    '厉兑': 'st45',
    '太白': 'sp3',
    '商丘': 'sp5',
    '阴郄': 'ht6',
    '神门': 'ht7',
    '跗阳': 'bl59',
    '日月': 'gb24',
    '阳辅': 'gb38',
    '中封': 'lv4',
    '石门': 'cv5',
}

predictions = []
for i, (idx, name, kid) in enumerate(files):
    if kid is not None:
        continue
    if name not in STUBS:
        continue
    # Find nearest predecessor + successor with kid.
    pred = None
    for j in range(i - 1, -1, -1):
        if files[j][2] is not None:
            pred = files[j]
            break
    succ = None
    for j in range(i + 1, len(files)):
        if files[j][2] is not None:
            succ = files[j]
            break
    # Linear interpolation between (pred_idx, pred_kid) and (succ_idx, succ_kid).
    if pred and succ:
        pi, pn, pk = pred
        si, sn, sk = succ
        gap = si - pi
        step = (sk - pk) / gap if gap else 1
        guess = round(pk + step * (idx - pi))
        predictions.append((STUBS[name], name, idx, guess, pn, pk, sn, sk))

print(f"Predictions ({len(predictions)}):")
print(f"{'KEY':<8}{'NAME':<8}{'FILE':<5}{'GUESS':<12}NEIGHBORS")
for key, name, idx, guess, pn, pk, sn, sk in predictions:
    print(f"  {key:<8}{name:<8}{idx:<5}{guess:<12}({pn}={pk} → {sn}={sk})")

out = ROOT / 'CTM-Clock' / 'scripts' / 'rhky-predictions.json'
out.write_text(
    json.dumps([{'key': k, 'name': n, 'kid': g} for k, n, _, g, *_ in predictions],
               ensure_ascii=False, indent=2),
    encoding='utf-8'
)
import sys
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass
print(f"\nWrote {out}")
