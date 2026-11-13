import { cp, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

// Serve all rendering dependencies from the same site, with a locked version.
export async function preparePdfViewer(root) {
  const source = path.resolve('node_modules/pdfjs-dist');
  const target = path.join(root, 'pdfjs');
  await mkdir(target, { recursive: true });
  await copyFile(path.join(source, 'legacy/build/pdf.worker.min.mjs'), path.join(target, 'pdf.worker.min.mjs'));
  await copyFile(path.join(source, 'LICENSE'), path.join(target, 'LICENSE'));
  for (const directory of ['cmaps', 'standard_fonts', 'wasm', 'iccs']) {
    await cp(path.join(source, directory), path.join(target, directory), { recursive: true });
  }
}
