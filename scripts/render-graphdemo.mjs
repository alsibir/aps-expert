/** Rebuild the tracked SVG illustrations and downloadable PlantUML sources. */
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const jar = process.env.PLANTUML_JAR;
if (!jar) throw new Error('Set PLANTUML_JAR to the absolute path of plantuml-1.2025.10.jar.');
const source = join(root, 'src/diagrams/graphdemo/plantuml');
const output = join(root, 'public/images/graphdemo');
const catalog = JSON.parse(readFileSync(join(root, 'src/diagrams/graphdemo/catalog.json'), 'utf8'));
mkdirSync(output, { recursive: true });
execFileSync('java', ['-Djava.awt.headless=true', '-jar', resolve(jar), '-charset', 'UTF-8', '-tsvg', '-failfast2', '-o', output,
  ...catalog.map(item => join(source, item.slug + '.puml'))], { cwd: root, stdio: 'inherit' });
const publishedSources = join(output, 'plantuml');
mkdirSync(publishedSources, { recursive: true });
for (const name of ['theme.puml', ...catalog.map(item => item.slug + '.puml')]) {
  copyFileSync(join(source, name), join(publishedSources, name));
}
for (const item of catalog) {
  const svg = readFileSync(join(output, item.slug + '.svg'), 'utf8');
  if (!svg.trimStart().startsWith('<') || !svg.includes('<svg') || /Syntax Error|An error has|Error line/.test(svg)) throw new Error('Invalid diagram: ' + item.slug);
}
console.log(`Graphdemo: ${catalog.length} SVG diagrams and their downloadable sources are ready.`);
