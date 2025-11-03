// This file provides type definitions for Vite's client-side environment variables.
// It resolves TypeScript errors for `import.meta.env`.

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
