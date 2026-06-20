# Roadmap — Path to Production

The app is a fully working, deployed demo. This roadmap captures what would take it from **"live demo"** to **"production-grade"**, grouped by theme and roughly prioritised.

## 1. Data & persistence  🔴 highest impact
- [ ] **Managed Postgres** (Render Postgres / Neon / Supabase) — replace ephemeral SQLite so users and products persist across restarts. The codebase is already Postgres-ready (`psycopg2` bundled, `DATABASE_URL` honoured, `migrate_sqlite_to_postgres.py` present).
- [ ] **Alembic migrations** — version the schema instead of `create_all` on startup.
- [ ] **Backups** — automated DB snapshots.

## 2. Authentication & security
- [ ] **Refresh tokens** + short-lived access tokens; rotation on use.
- [ ] **httpOnly cookie option** for tokens (mitigate XSS token theft).
- [ ] **Tighten CORS** — replace `allow_origins=["*"]` with an explicit allow-list of known frontend origins.
- [ ] **Rate limiting** on auth and write endpoints (e.g. slowapi).
- [ ] **Security headers** (HSTS, CSP, X-Content-Type-Options) via middleware.
- [ ] **Account hardening** — email verification, password reset, lockout on repeated failures.

## 3. Testing & quality
- [ ] **Backend tests** — pytest + httpx (auth flows, CRUD, permissions); target 80%+ coverage.
- [ ] **Frontend tests** — Vitest + React Testing Library for components and auth flows.
- [ ] **E2E tests** — Playwright for the critical register → login → catalog journey.
- [ ] **Linting/formatting gates** — ruff/black (Python), ESLint/Prettier (TS).

## 4. CI/CD
- [ ] **GitHub Actions** pipeline: lint → test → build → deploy on merge to `main`.
- [ ] **Preview deployments** for pull requests (Vercel previews + a Render PR environment).
- [ ] Modernise/retire the legacy `Jenkinsfile` in favour of GitHub Actions.

## 5. Observability & ops
- [ ] **Structured logging** with request IDs.
- [ ] **Error tracking** (Sentry) on both frontend and backend.
- [ ] **Uptime + health monitoring** and alerting.
- [ ] **Keep-warm ping** (or paid instance) to avoid free-tier cold starts.

## 6. Product features
- [ ] **Pagination, search, filtering, sorting** on the catalog.
- [ ] **Role-based access control** (admin vs. user) for product mutations.
- [ ] **Image uploads** to object storage (S3 / Cloudinary) instead of static `/images` paths.
- [ ] **Cart & checkout** flow (the cart UI already exists in the frontend).
- [ ] **Optimistic UI** updates with proper error rollback.

## 7. Infrastructure & performance
- [ ] **Custom domain** + managed TLS.
- [ ] **CDN caching** headers for product images and static assets.
- [ ] **Containerised production deploy** with horizontal scaling.
- [ ] **Environment separation** — dev / staging / prod (compose variants already scaffolded).

---

### Suggested next step
The single highest-value change is **#1 (managed Postgres)** — it turns the demo into something with durable data, after which **#3 (tests)** and **#4 (CI/CD)** make it safe to evolve.
