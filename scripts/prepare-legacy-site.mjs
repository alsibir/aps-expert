// Build a standalone GitHub Pages site retaining the former public URLs.
import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import path from 'node:path';

const source = path.resolve('dist');
const output = path.resolve('out/legacy-site');
const origin = 'https://alsibir.github.io';
const oldBase = '/alsibir-expert';
const newBase = '/aps-expert';
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
async function walk(dir) {
  const files = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    files.push(...(item.isDirectory() ? await walk(file) : [file]));
  }
  return files;
}
const escape = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
let pages = 0, assets = 0;
for (const file of await walk(source)) {
  const relative = path.relative(source, file);
  const destination = path.join(output, relative);
  if (file.endsWith('.html')) {
    const html = await readFile(file, 'utf8');
    const route = relative.split(path.sep).join('/').replace(/index\.html$/, '');
    const refresh = html.match(/http-equiv=["']refresh["'][^>]*content=["']\d+;\s*url=([^"']+)["']/i);
    const fallback = new URL(refresh ? refresh[1].replaceAll('&amp;', '&') : newBase + '/' + route, origin);
    if (fallback.origin !== origin || !fallback.pathname.startsWith(newBase + '/')) throw new Error('Unexpected destination: ' + fallback);
    const script = `const oldBase=${JSON.stringify(oldBase)},newBase=${JSON.stringify(newBase)};
const target=new URL(${JSON.stringify(fallback.href)});
if(location.pathname.endsWith('/404.html')||!${JSON.stringify(route !== '404.html')}) target.pathname=location.pathname.replace(/^\\/alsibir-expert(?=\\/|$)/,newBase);
const params=new URLSearchParams(location.search);
for(const [key,value] of params) params.set(key,value.replaceAll(oldBase+'/',newBase+'/'));
target.search=params.toString();target.hash=location.hash;
document.getElementById('destination').href=target.href;location.replace(target.href);`;
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${escape(fallback.href)}"><title>Сайт АПС — новый адрес</title></head><body><p>Сайт АПС переехал. <a id="destination" href="${escape(fallback.href)}">Открыть страницу по новому адресу</a>.</p><script>${script}</script></body></html>`);
    pages++;
  } else if (/\.(pdf|docx?|xlsx?|pptx?|zip|gz|7z|png|jpe?g|webp|svg|ico|puml|txt)$/i.test(file) && !relative.startsWith('pdfjs' + path.sep) && relative !== 'robots.txt') {
    await mkdir(path.dirname(destination), { recursive: true });
    await copyFile(file, destination);
    assets++;
  }
}
await writeFile(path.join(output, '.nojekyll'), '');
console.log(JSON.stringify({ output, pages, retainedAssets: assets }));
