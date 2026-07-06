---
name: connect-pg-simple esbuild bundling
description: connect-pg-simple's session-table auto-creation breaks silently when bundled by esbuild
---

When an Express API server is bundled with esbuild (single-file output), `connect-pg-simple`
(used as an `express-session` store with `createTableIfMissing: true`) fails at runtime with
`ENOENT: no such file or directory, open '.../dist/table.sql'`. This happens because esbuild
inlines `connect-pg-simple`'s code but the package reads its `table.sql` template via a
`__dirname`-relative `fs.readFile` at runtime — the asset never gets copied into the bundle
output directory.

The failure is easy to miss: login/session endpoints still return 200 with a `set-cookie`
header, but the session is never actually persisted (no `session`/`user_sessions` table gets
created), so subsequent requests with that cookie come back unauthenticated.

**Why:** esbuild bundling only handles JS imports, not non-JS assets referenced via relative
file-system paths at runtime.

**How to apply:** add `connect-pg-simple` (and similarly any store/lib that loads adjacent
non-JS files at runtime, e.g. `.sql`, `.node`, `.wasm`) to the esbuild `external` list so it's
required from `node_modules` at runtime instead of being inlined.
