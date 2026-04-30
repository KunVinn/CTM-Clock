"""
python scripts/dump-dual-links.py

Walks assets/glossary.js and prints the CN-mode dual link
(primary + backup) for every acupoint in the four target sections.

No Wikipedia anywhere — primary is rhky urlCn (when present) or
yibian url; backup is yibian urlCnBackup or auto-derived baike.
"""

import re
import sys
import urllib.parse
from pathlib import Path

GLOSSARY = Path(__file__).resolve().parent.parent / 'assets' / 'glossary.js'
src = GLOSSARY.read_text(encoding='utf-8')

# Extract per-acupoint entry fields without running JS.
# Match `'<key>': { ... }` where keys look like acupoint codes
# (lu1..lv14, baliao, ba-feng, etc.).
ENTRY_RE = re.compile(
    r"'(?P<key>[a-z]{1,3}\d+|baliao|ba-feng)'\s*:\s*\{(?P<body>[^{}]*?)\}",
    re.DOTALL,
)
FIELD_RE = re.compile(r"(?P<name>cn|en|url|urlCn|urlCnBackup)\s*:\s*'(?P<val>(?:\\.|[^'\\])*)'")

TERMS = {}
for m in ENTRY_RE.finditer(src):
    key = m.group('key')
    body = m.group('body')
    entry = {}
    for fm in FIELD_RE.finditer(body):
        entry[fm.group('name')] = fm.group('val').replace("\\'", "'")
    TERMS[key] = entry

# Alias map (alias -> target key) for resolving Chinese names.
ALIAS_RE = re.compile(r"'(?P<alias>[^']+)'\s*:\s*'(?P<target>[a-z]{1,3}\d+|baliao|ba-feng)'")
# Slice the TERM_ALIASES block.
alias_block = src[src.find('const TERM_ALIASES'):]
ALIASES = {}
for m in ALIAS_RE.finditer(alias_block):
    ALIASES.setdefault(m.group('alias'), m.group('target'))

def pick_primary(e):
    return e.get('urlCn') or e.get('url') or '-'

def pick_backup(e):
    if e.get('urlCnBackup'): return e['urlCnBackup']
    cn = e.get('cn') or ''
    head = cn.split('·')[0]
    pieces = [p.strip() for p in head.split('/') if p.strip()]
    term = pieces[1] if len(pieces) > 1 else (pieces[0] if pieces else '')
    if not term: return '-'
    url = e.get('url') or ''
    if 'yibian.hopto.org' in url:
        return 'https://baike.baidu.com/item/' + urllib.parse.quote(term)
    if 'wikipedia.org' in url:
        return 'https://zh.wikipedia.org/wiki/' + urllib.parse.quote(term)
    return '-'

SECTIONS = {
    '十六郄穴歌 (16 cleft points)': [
        'lu6', 'li7', 'st34', 'sp8', 'ht6', 'si6', 'bl63', 'ki5',
        'pc4', 'te7', 'gb36', 'lv6', 'bl59', 'ki8', 'gb35', 'ki9',
    ],
    '十二募穴 (12 front-mu)': [
        'lu1', 'cv14', 'lv14', 'gb24', 'lv13', 'cv12',
        'st25', 'cv4', 'cv5', 'cv3', 'cv17', 'gb25',
    ],
    '十二经脉流注表 (5-shu flow, 67 points)': [
        # Lung — Well/Spring/Stream(=Source)/River/Sea
        'lu11', 'lu10', 'lu9', 'lu8', 'lu5',
        # Large Intestine
        'li1', 'li2', 'li3', 'li4', 'li5', 'li11',
        # Stomach
        'st45', 'st44', 'st43', 'st42', 'st41', 'st36',
        # Spleen
        'sp1', 'sp2', 'sp3', 'sp5', 'sp9',
        # Heart
        'ht9', 'ht8', 'ht7', 'ht4', 'ht3',
        # Small Intestine
        'si1', 'si2', 'si3', 'si4', 'si5', 'si8',
        # Bladder
        'bl67', 'bl66', 'bl65', 'bl64', 'bl60', 'bl40',
        # Kidney
        'ki1', 'ki2', 'ki3', 'ki7', 'ki10',
        # Pericardium
        'pc9', 'pc8', 'pc7', 'pc5', 'pc3',
        # Triple Burner
        'te1', 'te2', 'te3', 'te4', 'te6', 'te10',
        # Gallbladder
        'gb44', 'gb43', 'gb41', 'gb40', 'gb38', 'gb34',
        # Liver
        'lv1', 'lv2', 'lv3', 'lv4', 'lv8',
    ],
    '妇科调经 (women\'s menstrual)': [
        'sp6', 'sp8', 'sp10', 'cv4', 'lv3',     # 痛经
        'cv6', 'baliao', 'lv9',                  # 月事不下
        'bl23',                                  # 月事不调
        'st36', 'cv8', 'gv4', 'ki3',             # 一般调经常配
    ],
}

def fmt(key):
    e = TERMS.get(key)
    if not e:
        return f"{key.upper():<8}  (not found)"
    cn = e.get('cn', '').split('·')[0].strip()
    return (
        f"{key.upper():<8}  {cn:<10}\n"
        f"   primary : {pick_primary(e)}\n"
        f"   backup  : {pick_backup(e)}\n"
    )

# Set stdout to utf-8 for Windows console.
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

for section, keys in SECTIONS.items():
    print('\n' + '=' * 70)
    print(' ', section)
    print('=' * 70)
    for k in keys:
        print(fmt(k))
