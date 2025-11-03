/// <reference types="vite/client" />

/**
 * Declares the `process` global for TypeScript in a client-side (browser) environment.
 * Vite's `define` config option will replace `process.env.API_KEY` with a string literal during the build,
 * but TypeScript needs this declaration to understand the code before the replacement happens.
 */
// FIX: Augment the NodeJS namespace to add custom env variables.
// This avoids the "Cannot redeclare block-scoped variable 'process'" error
// that occurs when @types/node is present in the project.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY?: string;
  }
}
