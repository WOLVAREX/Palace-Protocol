---
name: Express trust proxy for Replit production
description: Without app.set("trust proxy", 1), express-session silently skips setting session cookies in production behind Replit's HTTPS proxy.
---

## The Rule

Always add `app.set("trust proxy", 1)` near the top of the Express app setup — before session middleware.

## Why

Replit terminates TLS at a reverse proxy. Express sees the internal connection as HTTP, so `req.secure` is `false`. When `express-session` is configured with `cookie.secure: true` (correct for production), it checks `req.secure` and silently skips setting the `Set-Cookie` header. Result: login appears to succeed on the client, but no session cookie is ever sent. All subsequent authenticated requests (PATCH, DELETE, etc.) have no session → 403 Forbidden, but those requests never even reach the route handler because the browser sends no cookie.

**How to apply:** In `app.ts`, right after `const app = express()` and before any middleware:
```ts
app.set("trust proxy", 1);
```

This makes Express trust the `X-Forwarded-Proto` header from Replit's proxy, so `req.secure` correctly becomes `true` for HTTPS requests.
