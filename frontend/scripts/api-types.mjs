// Preserve the initial package commands without connecting the frontend to a backend.
console.error("API type generation is deferred. The current MVP uses src/types/demo.ts and has no backend. See docs/scope-map.md. No request or file change was made.");
process.exitCode = 1;
