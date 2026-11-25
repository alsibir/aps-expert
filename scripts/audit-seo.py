"""Check generated HTML and sitemap; report legacy SEO/accessibility warnings."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlsplit, unquote
import json, xml.etree.ElementTree as ET, sys

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
errors, warnings = [], []
base = 'https://alsibir.github.io/aps-expert/'
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.meta = {}
        self.canonical = []
        self.h1 = 0
        self.main = 0
        self.title = ''
        self.in_title = False
        self.ld = []
        self.in_ld = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag == 'meta':
            k = a.get('name') or a.get('property')
            if k: self.meta.setdefault(k.lower(), []).append(a.get('content', ''))
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href', ''))
        if tag == 'h1': self.h1 += 1
        if tag == 'main': self.main += 1
        if tag == 'title': self.in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.in_ld = True
            self.ld.append('')
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script': self.in_ld = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_ld: self.ld[-1] += data
def read_page(file):
    text = file.read_text(encoding='utf-8')
    p = Page()
    p.feed(text)
    return p, text
sitemap = ET.parse(dist / 'sitemap.xml')
urls = [x.text for x in sitemap.findall('.//{*}loc')]
titles, descriptions = {}, {}
for url in urls:
    if not url or not url.startswith(base):
        errors.append(['sitemap', url, 'unexpected origin or base'])
        continue
    local = unquote(urlsplit(url).path.removeprefix('/aps-expert/'))
    file = dist / local
    if file.is_dir(): file /= 'index.html'
    if not file.is_file():
        errors.append(['sitemap',url,'missing page'])
        continue
    p, html = read_page(file)
    if any('noindex' in x.lower() for x in p.meta.get('robots', [])):
        errors.append([url,'noindex in sitemap'])
    if 'mc.yandex.ru/metrika/tag.js' in html or 'mc.yandex.ru/watch/113951982' in html:
        errors.append([url,'analytics tracking enabled'])
    if p.h1 != 1: warnings.append([url,'H1 count',p.h1])
    if p.main != 1: warnings.append([url,'main count',p.main])
    for id_, n in Counter(p.ids).items():
        if n > 1: warnings.append([url,'duplicate id',id_])
    if p.canonical != [url]: warnings.append([url,'canonical',p.canonical])
    desc = p.meta.get('description', [])
    if len(desc) != 1 or not desc[0]: warnings.append([url,'description missing or duplicated'])
    if not p.title.strip(): warnings.append([url,'empty title'])
    else: titles.setdefault(p.title.strip(), []).append(url)
    if desc and desc[0]: descriptions.setdefault(desc[0], []).append(url)
    for data in p.ld:
        try: json.loads(data)
        except ValueError: errors.append([url,'invalid JSON-LD'])
    if not p.ld: warnings.append([url,'missing JSON-LD'])
    if url == base:
        if p.h1 != 1: errors.append([url,'home must have exactly one H1'])
        if not p.ld: errors.append([url,'home missing JSON-LD'])
for values, label in [(titles,'duplicate title'),(descriptions,'duplicate description')]:
    for value, pages in values.items():
        if len(pages)>1: warnings.append([label,value,pages])
if len(set(urls)) != len(urls): errors.append(['sitemap','duplicate URLs'])
if base not in urls: errors.append(['sitemap','home missing'])
report = {'checked_pages':len(urls),'errors':errors,'warnings':warnings}
(root/'audit').mkdir(exist_ok=True)
(root/'audit/seo-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'checked_pages':len(urls),'errors':errors,'warning_count':len(warnings)},ensure_ascii=False,indent=2))
sys.exit(bool(errors))
