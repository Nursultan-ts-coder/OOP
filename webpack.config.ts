import fs from 'fs';
import path from 'path';
import webpack, { type Configuration, type RuleSetRule } from 'webpack';
import { merge } from 'webpack-merge';

import grafanaConfig, { type Env } from './.config/webpack/webpack.config';

/** The portal's React code (its `@/` imports), copied from the standalone app by `npm run sync:portal`. */
const PORTAL_SRC = path.resolve(process.cwd(), 'src/portal');

/** Env files read for the build, later ones winning (keep them out of git: .gitignore). */
const ENV_FILES = ['.env', '.env.production', '.env.local'];

/** One variable from the env files (`KEY=value` lines), or '' when none sets it. */
const readEnvVariable = (name: string) =>
  ENV_FILES.reduce((value, file) => {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      return value;
    }
    const line = fs
      .readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .find((entry) => entry.trim().startsWith(`${name}=`));
    return line
      ? line
          .slice(line.indexOf('=') + 1)
          .trim()
          .replace(/^['"]|['"]$/g, '')
      : value;
  }, process.env[name] ?? '');

/**
 * Where the portal's read of Vite's `import.meta.env` key gets its value in Grafana (webpack itself
 * sets `import.meta.env.BASE_URL` to the plugin's public path): the key saved on the app's
 * configuration page (src/portal-config.ts) wins. Development builds fall back to
 * `VITE_GOOGLE_MAPS_API_KEY` from the env files; production builds (the released plugin, public in
 * the catalog) never bundle a key, even one exported in the shell.
 */
const portalEnv = (production: boolean) => ({
  'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': `((window.__OPERATOR_PORTAL_CONFIG__ && window.__OPERATOR_PORTAL_CONFIG__.googleMapsApiKey) || ${JSON.stringify(
    production ? '' : readEnvVariable('VITE_GOOGLE_MAPS_API_KEY')
  )})`,
});

const isSwcRule = (rule: unknown): rule is RuleSetRule =>
  typeof rule === 'object' && rule !== null && String((rule as RuleSetRule).test) === String(/\.[tj]sx?$/);

const isSvgAssetRule = (rule: unknown): rule is RuleSetRule =>
  typeof rule === 'object' && rule !== null && String((rule as RuleSetRule).test).includes('svg');

/**
 * Grafana's plugin build (.config/, kept as create-plugin wrote it) plus what the portal's code
 * (src/portal, written for Vite) needs: its `@/` alias, the automatic JSX runtime, `*.svg?react`
 * and `?raw` imports, and the `import.meta.env` value above.
 */
const config = async (env: Env): Promise<Configuration> => {
  const baseConfig = await grafanaConfig(env);

  // Plain `.svg` imports stay files; `?react` makes a React component (svgr) and `?raw` the
  // markup as a string, as in Vite.
  baseConfig.module?.rules?.filter(isSvgAssetRule).forEach((rule) => {
    rule.resourceQuery = { not: [/react/, /raw/] };
  });

  // The portal's files use the automatic JSX runtime (no `import React`), as Vite compiles them.
  // Always the production `react/jsx-runtime`: Grafana's React has no `jsxDEV`, so a development
  // build (`npm run dev`) using `react/jsx-dev-runtime` would fail with "jsxDEV is not a function".
  baseConfig.module?.rules?.filter(isSwcRule).forEach((rule) => {
    const use = rule.use as { options: { jsc: Record<string, unknown> } };
    use.options.jsc.transform = { react: { runtime: 'automatic', development: false } };
  });

  const config = merge(baseConfig, {
    resolve: { alias: { '@': PORTAL_SRC } },
    module: {
      rules: [
        {
          test: /\.svg$/i,
          resourceQuery: /react/,
          use: [{ loader: '@svgr/webpack', options: { titleProp: true, icon: true } }],
        },
        { test: /\.svg$/i, resourceQuery: /raw/, type: 'asset/source' },
      ],
    },
    plugins: [new webpack.DefinePlugin(portalEnv(Boolean(env.production)))],
  });

  return config;
};

export default config;
