/// <reference types="vite/client" />

// FIX: Replaced `declare var process` with a namespace augmentation.
// This prevents redeclaration errors with Node's global `process` object
// and fixes type errors in `vite.config.ts` while still providing
// type information for `process.env.API_KEY` in the client-side code.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_KEY?: string;
  }
}
