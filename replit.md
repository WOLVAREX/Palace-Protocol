# Palace Protocol Academy

A full-stack etiquette and protocol academy website for youth in Kenya. Admin-managed content, session scheduling, enrollment requests, book library, and member roster — all backed by a real PostgreSQL database.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, path `/api`)
- `pnpm --filter @workspace/palace-protocol run dev` — run the frontend (path `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS (dark theme default, light/dark toggle)
- API: Express 5, session auth (express-session + connect-pg-simple + bcryptjs)
- DB: PostgreSQL (Replit) + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/palace-protocol/` — React/Vite frontend
- `artifacts/api-server/` — Express 5 API backend
- `lib/db/src/schema/index.ts` — source-of-truth DB schema (Drizzle)
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for codegen)
- `lib/api-client-react/src/generated/` — generated React Query hooks + API functions
- `lib/api-zod/src/generated/` — generated Zod schemas
- `artifacts/api-server/src/lib/seed.ts` — admin user seeding on startup

## Architecture decisions

- Session-based auth (not JWT): cookies via connect-pg-simple + user_sessions table
- `customFetch` in `lib/api-client-react/src/custom-fetch.ts` sends `credentials: "include"` for cookie-based auth
- Site settings (contact info, CEO name/title) stored in `site_data` key-value table
- Site content (hero copy, about copy, pillars, CEO photo, terms, policies) also in `site_data`
- Pillar data stored as flat keys (`pillar1Numeral`, `pillar1Title`, etc.) rather than nested JSON
- Admin creds are seeded on every server startup: `admin / Palace2026!`

## Product

- **Public pages**: Home (hero + about + pillars + books + CTA), About, Books library, Contact/Enrollment form, Terms, Privacy Policy
- **Admin panel** (`/admin`): Dashboard overview, Enrollment requests (approve/reject), Sessions (create/edit), Members roster, Books (create/edit/delete with cover upload), Site Settings (contact info, CEO), Site Content (hero, about, pillars, CEO photo), Terms, Privacy Policy
- **Theme**: Dark by default, persistent light/dark toggle in navbar

## User preferences

- Admin credentials: `admin / Palace2026!`
- No card/checkout — book orders via WhatsApp only
- Target audience: youth in Kenya

## Gotchas

- Do NOT use `console.log` in server code — use `req.log` in route handlers and `logger` for non-request code
- After changing `lib/api-spec/openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen` before typechecking leaf packages
- Run `pnpm run typecheck:libs` before leaf artifact checks after changing any `lib/*` package
- `pnpm run typecheck` (not `build`) for verification — `build` requires `PORT`/`BASE_PATH` env vars

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
