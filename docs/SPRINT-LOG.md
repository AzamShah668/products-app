---
project: "AXM Enterprises — Products Management Platform"
type: sprint-log
last_updated: 2026-06-20
status: active
---

# Products Platform — Sprint Log

Chronological record of how the platform was built and shipped. Newest milestones are summarised at the top of each sprint.

---

## Sprint 1 — Build the full-stack platform (DONE)
**Goal:** Stand up a complete, secure full-stack product-management application — a FastAPI backend with JWT auth and a polished React/TypeScript frontend — runnable locally with one command.
**Outcome:** A working, containerised app with end-to-end auth and CRUD, ready to deploy.

### Delivered
- [x] **Backend API (FastAPI)** — layered structure: `api/` routes, `core/` config + security, `db/` engine/session, `models/` (User, Product), `schemas/`.
- [x] **JWT authentication** — register, login, `/auth/me`; password hashing; protected endpoints via dependency injection.
- [x] **Products CRUD** — list / get / create / update / delete with SQLModel over SQLite.
- [x] **Config management** — env-driven settings via `pydantic-settings` (`DATABASE_URL`, `SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES`).
- [x] **Auto API docs** — Swagger UI at `/docs`, `/health` endpoint.
- [x] **Frontend (React + TS + Vite + Tailwind)** — "AXM Enterprises" branded storefront: landing page, login/register, protected catalog, dashboard, responsive + animated UI.
- [x] **API client + auth context** — token storage, protected routes, auth state.
- [x] **Containerisation** — `Dockerfile.backend`, `docker-compose.yml` (+ staging/prod variants) for one-command local spin-up.
- [x] **CI scaffolding** — `Jenkinsfile` pipeline.
- [x] **Deployment guide** — `DEPLOYMENT.md` describing the intended Vercel + Render/Railway split.

### Open (carried into Sprint 2)
- [ ] Actually deploy the app to public URLs.
- [ ] Handle the ephemeral-DB problem on free hosts.
- [ ] Verify CORS + the full auth chain in a real browser.

---

## Sprint 2 — Ship it live (Vercel + Render) (DONE)
**Goal:** Take the app from "runs locally" to a **public, shareable, working demo** with the frontend on Vercel and the backend on Render — at zero hosting cost.
**Outcome:** Live at **https://products-app-rouge.vercel.app** with a working `demo / demo12345` account; full register → login → catalog flow verified end-to-end.

### Delivered
- [x] **Deploy ordering resolved** — recognised Vite bakes `VITE_API_URL` at build time, so the **backend was deployed first** to obtain its URL.
- [x] **Seed-on-startup** (PR #1) — `app/main.py` now seeds the sample catalog when the products table is empty, so the **ephemeral free-tier database is never blank** for visitors.
- [x] **Backend → Render** — web service from the public repo: build `pip install -r requirements.txt`, start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`, free instance, env (`SECRET_KEY`, `ACCESS_TOKEN_EXPIRE_MINUTES`).
- [x] **Python pinned to 3.11.9** (`PYTHON_VERSION`) — Render defaulted to 3.14, which has no wheels for the pinned 2023-era dependencies; the pin fixed the build.
- [x] **Frontend → Vercel** — imported the same repo with root directory `frontend/`, Vite preset auto-detected, `VITE_API_URL` wired to the Render backend.
- [x] **CORS verified** — backend reflects the Vercel origin and allows credentials (confirmed via preflight).
- [x] **End-to-end verification** — registered a user and logged in against the live stack; confirmed the authenticated session and live product count.
- [x] **Demo account + docs** — `demo / demo12345` seeded for reviewers; added `docs/ARCHITECTURE.md`, this sprint log, and `docs/ROADMAP.md`.

### Open (next)
- [ ] Replace ephemeral SQLite with a managed Postgres so user data persists.
- [ ] Add automated tests + a CI/CD pipeline that deploys on merge to `main`.
- [ ] Tighten CORS from `*` to the known frontend origin(s).

### Notes / decisions
- The free Render instance sleeps after ~15 min idle (≈50s cold start) — acceptable for a portfolio demo; upgrade to a paid instance for always-on.
- Repo is one source of truth feeding two build targets (`frontend/` → Vercel, `app/` → Render).

---

## Sprint 3 — Production hardening (PLANNED)
**Goal:** Move from "live demo" to "production-grade": durable data, automated quality gates, and operational visibility.
See **[ROADMAP.md](ROADMAP.md)** for the full backlog. Headline items:
- [ ] Managed Postgres + Alembic migrations (persistent data).
- [ ] Test suites (pytest backend, Vitest/RTL frontend) + coverage gate.
- [ ] GitHub Actions CI/CD (lint → test → deploy).
- [ ] Refresh tokens + hardened auth; rate limiting; security headers.
- [ ] Image storage (S3/Cloudinary), product search/pagination, RBAC.
- [ ] Observability: structured logging, error tracking, uptime monitoring.

#products-app #sprint #full-stack #deployment
