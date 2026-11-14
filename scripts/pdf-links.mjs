// Keep PDF source URLs in content; publish preview links through the site viewer.
export const siteOrigin = 'https://alsibir.github.io';
export const siteBase = '/aps-expert/';
const decodeHtml = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;').replaceAll('<', '&lt;');

export function rewritePdfLinks(html, pageUrl) {
  return html.replace(/<a\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi, tag => {
    // Explicit downloads must retain the original file URL and confirmation.
    if (/\sdownload(?:\s|=|>)/i.test(tag)) return tag;
    const href = tag.match(/\shref\s*=\s*(["'])(.*?)\1/i);
    if (!href) return tag;
    let url;
    try { url = new URL(decodeHtml(href[2]), pageUrl); } catch { return tag; }
    if (url.origin !== siteOrigin || !url.pathname.startsWith(siteBase) || !/\.pdf$/i.test(url.pathname)) return tag;
    const source = new URL(pageUrl);
    const params = new URLSearchParams({ file: url.pathname + url.search + url.hash, return: source.pathname + source.search + source.hash });
    const target = siteBase + 'pdf-viewer/?' + params.toString();
    return tag.replace(href[0], ' href=' + href[1] + escapeHtml(target) + href[1]);
  });
}
