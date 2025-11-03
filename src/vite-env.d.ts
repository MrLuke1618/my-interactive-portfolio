

// FIX: This augments the existing NodeJS namespace, which is the standard
// way to add type definitions for environment variables in a Node-like environment
// (which Vite can be configured to support for process.env).
// This avoids redeclaring 'process' and fixes the error.
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY?: string;
  }
}
