import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function buildSite() {
  const output = path.join(root, 'dist/site');
  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });
  await fs.cp(path.join(root, 'site'), output, { recursive: true, errorOnExist: true });
  await fs.writeFile(path.join(output, '.nojekyll'), '');
  for (const file of [
    'index.html',
    'organization.css',
    'organization.js',
    'favicon.svg',
    'CNAME',
    'sitemap.xml',
    'llms.txt',
  ]) {
    if (!(await fs.stat(path.join(output, file))).isFile()) throw Error(`Missing site artifact: ${file}`);
  }
  return output;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(await buildSite());
