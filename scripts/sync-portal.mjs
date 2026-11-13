// Copies the portal's React code from the standalone app into src/portal, so the plugin ships
// its latest pages. Usage: npm run sync:portal [-- <path to operator-portal/src>]
// The default path is where the Asset-Manager monorepo sits next to this repo on the Mac.
import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const DEFAULT_SOURCE = '../../../Projects/OOP/Asset-Manager/artifacts/operator-portal/src';
const source = path.resolve(process.argv[2] ?? process.env.PORTAL_SRC ?? DEFAULT_SOURCE);
const target = path.resolve('src/portal');

// Only in the standalone app: its entry, router, top bar, providers, Vite types and tests.
const STANDALONE_ONLY = [
  'main.tsx',
  'App.tsx',
  'vite-env.d.ts',
  'test',
  'app/routes',
  'app/layout',
  'app/providers',
].map((entry) => path.join(source, entry));

if (!existsSync(path.join(source, 'features/operator-portal'))) {
  console.error(`No operator portal at ${source}. Pass its src folder: npm run sync:portal -- <path>`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, {
  recursive: true,
  filter: (file) => !STANDALONE_ONLY.includes(file) && !/\.test\.tsx?$/.test(file),
});
console.log(`Copied ${source} → src/portal`);
