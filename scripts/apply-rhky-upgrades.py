"""
Read scripts/rhky-upgrades.json and rewrite each matching glossary
entry from {url:'…yibian…'} to {url:'…yibian…', urlCn:'…rhky…',
urlCnBackup:'…yibian…'}.

Single-line entries only — does not touch multi-line entries.
"""
import json
import re
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
GLOSSARY = ROOT / 'CTM-Clock' / 'assets' / 'glossary.js'
PLAN = ROOT / 'CTM-Clock' / 'scripts' / 'rhky-upgrades.json'

plan = json.loads(PLAN.read_text(encoding='utf-8'))
upgrades = {key: (name, kid) for key, name, kid in plan['upgrades']}

src = GLOSSARY.read_text(encoding='utf-8')
lines = src.split('\n')

EDIT_RE = re.compile(
    r"^(?P<lead>\s*'(?P<key>[a-z]{1,3}\d+|baliao|ba-feng)'\s*:\s*\{[^{}]*?url:\s*')"
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

upgraded_count = 0
for i, line in enumerate(lines):
    m = EDIT_RE.match(line)
    if not m:
        continue
    key = m.group('key')
    if key not in upgrades:
        continue
    name, kid = upgrades[key]
    yibian = m.group('url')
    rhky = build_rhky_url(name, kid)
    # Original line ended with: ...'url': '<yibian>' }
    # New line: ...'url': '<yibian>', urlCn: '<rhky>', urlCnBackup: '<yibian>' }
    new_line = (
        f"{m.group('lead')}{yibian}',"
        f" urlCn: '{rhky}',"
        f" urlCnBackup: '{yibian}'"
        f" {m.group('rest').lstrip(chr(39)).rstrip().rstrip(',')}"
    )
    # Reattach trailing comma if original had one.
    if line.rstrip().endswith(','):
        new_line += ','
    lines[i] = new_line
    upgraded_count += 1
    print(f"  upgraded {key:<8} {name}  ({kid})")

GLOSSARY.write_text('\n'.join(lines), encoding='utf-8')
print(f"\nApplied {upgraded_count} upgrades.")
