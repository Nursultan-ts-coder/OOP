// The portal's code (src/portal) is written for Vite: webpack sets these
// `import.meta.env` values at build time (the key in webpack.config.ts, BASE_URL itself).
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** An SVG's markup as a string (Vite's `?raw`; webpack.config.ts loads it as source). */
declare module '*.svg?raw' {
  const markup: string;
  export default markup;
}
