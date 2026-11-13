"""Ensure every published PDF preview resolves to a real local document."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, parse_qs, unquote

root = Path(__file__).resolve().parents[1] / 'dist'
base = '/alsibir-expert/'
errors = []
previews = downloads = 0
documents = set()

class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        global previews, downloads
        if tag != 'a':
            return
        attrs = dict(attrs)
        href = attrs.get('href', '')
        url = urlsplit(href)
        local = not url.netloc or url.netloc == 'alsibir.github.io'
        if not local:
            return
        if url.path.startswith(base) and url.path.lower().endswith('.pdf'):
            if 'download' not in attrs:
                errors.append((str(self.file.relative_to(root)), 'PDF bypasses viewer', href))
            else:
                downloads += 1
        if url.path != base + 'pdf-viewer/':
            return
        previews += 1
        query = parse_qs(url.query)
        file = urlsplit(query.get('file', [''])[0])
        if file.netloc or not file.path.startswith(base) or not file.path.lower().endswith('.pdf'):
            errors.append((str(self.file.relative_to(root)), 'invalid viewer target', href))
            return
        target = root / unquote(file.path[len(base):])
        if not target.is_file():
            errors.append((str(self.file.relative_to(root)), 'missing PDF', str(target)))
        documents.add(file.path)

for file in root.rglob('*.html'):
    parser = Links()
    parser.file = file
    parser.feed(file.read_text())
for asset in ['pdfjs/pdf.worker.min.mjs', 'pdfjs/LICENSE', 'pdfjs/cmaps', 'pdfjs/standard_fonts', 'pdfjs/wasm', 'pdfjs/iccs', 'pdf-viewer/index.html']:
    if not (root / asset).exists():
        errors.append(('viewer', 'missing asset', asset))
print(f'PDF previews: {previews}; unique documents: {len(documents)}; explicit PDF downloads: {downloads}')
for error in errors:
    print(error)
raise SystemExit(bool(errors))
