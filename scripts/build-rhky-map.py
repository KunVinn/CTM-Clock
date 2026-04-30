"""
Walk every *_<acupoint>.html in downloaded_course_pages/, extract
the knowledgeId, and emit a name -> knowledgeId mapping plus a
glossary-upgrade plan for entries that currently use yibian as the
primary URL.
"""
import re
import sys
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
PAGES = ROOT / 'downloaded_course_pages'
GLOSSARY = ROOT / 'CTM-Clock' / 'assets' / 'glossary.js'

# -- 1. Walk pages, extract knowledgeId per page ---------------------
KID_RE   = re.compile(r'var\s+knowledgeId\s*=\s*"(\d+)"')
KNAME_RE = re.compile(r'var\s+_knowledgeName\s*=\s*"([^"]+)"')
TITLE_RE = re.compile(r'<title>([^<]+)</title>')

name_to_kid = {}
for f in sorted(PAGES.glob('*.html')):
    txt = f.read_text(encoding='utf-8', errors='replace')
    kid = KID_RE.search(txt)
    name = KNAME_RE.search(txt) or TITLE_RE.search(txt)
    if not (kid and name):
        continue
    nm = name.group(1).strip()
    name_to_kid[nm] = kid.group(1)

# -- 2. Read glossary.js, find yibian-only acupoint entries ----------
src = GLOSSARY.read_text(encoding='utf-8')

# Match: 'lu8': { cn: '...', en: '...', def: '...', url: 'https://yibian...' }
# Only entries whose key looks like an acupoint code AND that have
# url=yibian AND no urlCn yet.
ENTRY_RE = re.compile(
    r"^(?P<indent>\s*)'(?P<key>[a-z]{1,3}\d+|baliao|ba-feng)'\s*:\s*\{(?P<body>[^{}]*?)\}"
    r"(?P<trail>,?)\s*$",
    re.DOTALL | re.MULTILINE,
)

upgrades = []   # (key, name, kid, old_line_start, old_line_end, new_block)
no_match = []   # (key, name) — couldn't find a knowledgeId in pages

for m in ENTRY_RE.finditer(src):
    body = m.group('body')
    if 'urlCn' in body:
        continue
    if "url: 'https://yibian.hopto.org" not in body:
        continue
    cn_m = re.search(r"cn:\s*'([^']+)'", body)
    if not cn_m:
        continue
    cn = cn_m.group(1)
    # Pull the head — '巨阙 · Jù Què' -> '巨阙'
    head = cn.split('·')[0].strip()
    pieces = [p.strip() for p in head.split('/') if p.strip()]
    name = pieces[1] if len(pieces) > 1 else (pieces[0] if pieces else '')
    if not name:
        continue
    kid = name_to_kid.get(name)
    if not kid:
        no_match.append((m.group('key'), name))
        continue
    upgrades.append((m.group('key'), name, kid))

# -- 3. Report -------------------------------------------------------
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

print(f"Pages scanned: {len(name_to_kid)} acupoints with knowledgeId\n")
print(f"Upgradable entries (yibian-primary, no urlCn): {len(upgrades)}")
print(f"Missing-from-pages: {len(no_match)}\n")

print("=" * 70)
print(" UPGRADES (key  CN  knowledgeId)")
print("=" * 70)
for key, name, kid in upgrades:
    print(f"  {key:<8}  {name:<6}  {kid}")

if no_match:
    print("\n" + "=" * 70)
    print(" NOT FOUND (likely 八髎 / 妇科 group-points)")
    print("=" * 70)
    for key, name in no_match:
        print(f"  {key:<8}  {name}")

# Emit JSON for the next script.
out = ROOT / 'CTM-Clock' / 'scripts' / 'rhky-upgrades.json'
out.write_text(
    json.dumps(
        {'upgrades': upgrades, 'missing': no_match, 'name_to_kid': name_to_kid},
        ensure_ascii=False, indent=2
    ),
    encoding='utf-8'
)
print(f"\nWrote {out}")
