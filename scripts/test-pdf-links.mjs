import test from 'node:test';
import assert from 'node:assert/strict';
import { rewritePdfLinks } from './pdf-links.mjs';
const page = 'https://alsibir.github.io/alsibir-expert/wiki/pages/portfolio/';
function href(html) { return new URL(html.match(/href="([^"]+)"/)[1].replaceAll('&amp;', '&'), page); }
test('viewer retains document path, Cyrillic filename, query and page fragment', () => {
  const result = href(rewritePdfLinks('<a href="/alsibir-expert/examples/ТЗ.pdf?v=2&amp;mode=read#page=7">PDF</a>', page));
  assert.equal(result.pathname, '/alsibir-expert/pdf-viewer/');
  assert.equal(decodeURI(result.searchParams.get('file')), '/alsibir-expert/examples/ТЗ.pdf?v=2&mode=read#page=7');
  assert.equal(result.searchParams.get('return'), '/alsibir-expert/wiki/pages/portfolio/');
});
test('explicit downloads retain URL, filename and existing confirmation', () => {
  const original = '<a href="/alsibir-expert/examples/api.pdf" download="api.pdf" onclick="return confirm(\'Скачать?\')">Скачать</a>';
  assert.equal(rewritePdfLinks(original, page), original);
});
test('absolute same-site and relative PDFs both use viewer', () => {
  for (const file of ['https://alsibir.github.io/alsibir-expert/examples/api.pdf', '../../../examples/api.pdf']) {
    assert.equal(href(rewritePdfLinks(`<a href="${file}">PDF</a>`, page)).pathname, '/alsibir-expert/pdf-viewer/');
  }
});
test('external PDFs, non-PDF files and viewer URLs stay unchanged', () => {
  for (const file of ['https://example.org/manual.pdf', '/alsibir-expert/examples/archive.zip', '/alsibir-expert/pdf-viewer/?file=manual.pdf']) {
    const original = `<a href="${file}">Открыть</a>`;
    assert.equal(rewritePdfLinks(original, page), original);
  }
});
test('linked images use viewer without modifying image URLs or target', () => {
  const result = rewritePdfLinks('<a target="_blank" href="/alsibir-expert/examples/api.pdf"><img src="/alsibir-expert/images/api.png" alt="API"></a>', page);
  assert.match(result, /target="_blank"/);
  assert.match(result, /src="\/alsibir-expert\/images\/api.png"/);
  assert.equal(href(result).pathname, '/alsibir-expert/pdf-viewer/');
});
