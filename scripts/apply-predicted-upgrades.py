"""
Apply predicted rhky knowledgeIds to glossary entries that were
not found in downloaded_course_pages (because the file was a stub).

Reads scripts/rhky-predictions.json (output of predict-stub-ids.py)
and rewrites the matching single-line entries the same way
apply-rhky-upgrades.py does.
"""
import json
import re
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
GLOSSARY = ROOT / 'CTM-Clock' / 'assets' / 'glossary.js'
PRED = ROOT / 'CTM-Clock' / 'scripts' / 'rhky-predictions.json'

predictions = json.loads(PRED.read_text(encoding='utf-8'))
by_key = {p['key']: (p['name'], str(p['kid'])) for p in predictions}

src = GLOSSARY.read_text(encoding='utf-8')
lines = src.split('\n')

EDIT_RE = re.compile(
    r"^(?P<lead>\s*'(?P<key>[a-z]{1,3}\d+)'\s*:\s*\{[^{}]*?url:\s*')"
    r"(?P<url>https://yibian\.hopto\.org/shu/\?sid=\d+)"
    r"(?P<rest>'\s*\}),?\s*$"
)

def build_rhky_url(name, kid):
    return (
        f'https://special.rhky.com/mobile/mooc/tocard/{kid}'
        f'?courseId=245888516'
        f'&name={urllib.parse.quote(name)}'
        f'&code=&btype=tushu&user_token=123'
        f'&DSSTASH_LOG=&UID=&_uid=&fid=&vc3=&_d=&uf=&_industry='
    )

n = 0
for i, line in enumerate(lines):
    m = EDIT_RE.match(line)
    if not m:
        continue
    key = m.group('key')
    if key not in by_key:
        continue
    # Skip if entry already has urlCn (already upgraded).
    if 'urlCn:' in line:
        continue
    name, kid = by_key[key]
    yibian = m.group('url')
    rhky = build_rhky_url(name, kid)
    new_line = (
        f"{m.group('lead')}{yibian}',"
        f" urlCn: '{rhky}',"
        f" urlCnBackup: '{yibian}'"
        f" {m.group('rest').lstrip(chr(39)).rstrip().rstrip(',')}"
    )
    if line.rstrip().endswith(','):
        new_line += ','
    lines[i] = new_line
    n += 1
    print(f"  predicted {key:<6}  {name}  ({kid})")

GLOSSARY.write_text('\n'.join(lines), encoding='utf-8')
print(f"\nApplied {n} predicted upgrades.")
