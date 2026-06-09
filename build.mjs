import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, 'dist');

const files = [
  { src: 'data.jsx', out: 'data.js', header: '' },
  { src: 'tweaks-panel.jsx', out: 'tweaks-panel.js', header: '' },
  { src: 'window.jsx', out: 'window.js', header: 'const { NURIA, STR, PROJECTS, PROJECT_TAGS, SKILL_CATALOG } = window;\n' },
  { src: 'windows.jsx', out: 'windows.js', header: 'const { NURIA, STR, PROJECTS, PROJECT_TAGS, SKILL_CATALOG, Placeholder, MediaGallery, Tabs } = window;\n' },
  { src: 'chat.jsx', out: 'chat.js', header: 'const { NURIA, STR } = window;\n' },
  { src: 'app.jsx', out: 'app.js', header: 'const { NURIA, STR, PROJECTS, PROJECT_TAGS, SKILL_CATALOG, Placeholder, MediaGallery, Tabs, ProjectsOverview, DashboardContent, ChatContent, WIPLoadingModal } = window;\n' },
];

await fs.promises.mkdir(distDir, { recursive: true });

for (const file of files) {
  const source = await fs.promises.readFile(path.join(rootDir, file.src), 'utf8');
  const { code } = await esbuild.transform(source, {
    loader: 'jsx',
    target: 'es2019',
    format: 'esm',
  });

  const wrapped = `(function(){\n${file.header}${code}\n})();\n`;
  await fs.promises.writeFile(path.join(distDir, file.out), wrapped, 'utf8');
}

console.log(`Built ${files.length} files into ${path.relative(rootDir, distDir)}/`);
