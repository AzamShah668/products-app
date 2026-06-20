# Architecture

This document describes how the AXM Enterprises Products platform is structured and how the deployed pieces fit together.

## Overview

The system is a classic **decoupled SPA + API** architecture, deployed as two independently hosted services that share a single Git repository.

```
        ┌──────────────────────────────────────────────────────────┐
        │   GitHub:  AzamShah668/products-app   (one repo)          │
        │     ├── frontend/   ──build──►  Vercel                    │
        │     └── app/        ──build──►  Render                    │
        └──────────────────────────────────────────────────────────┘

                         ┌───────────────────────┐
                         │       VISITOR          │
                         │     (web browser)      │
                         └───────────┬────────────┘
              1. GET page (HTML/JS)  │
                                     ▼
        ┌──────────────────────────────────────────────┐
        │              VERCEL  (static CDN)              │
        │   Frontend: React + Vite                       │
        │   https://products-app-rouge.vercel.app        │
        │   • VITE_API_URL baked in at BUILD time  ──────┼───┐ tells the browser
        └──────────────────────────────────────────────┘   │ where the API lives
                                     ▲                       │
              2. browser calls the   │   ◄───────────────────┘
                 API directly        │
                 (fetch + JWT, CORS) │
                                     ▼
        ┌──────────────────────────────────────────────┐
        │              RENDER  (server)                  │
        │   Backend: FastAPI (uvicorn)                   │
        │   https://products-app-4odu.onrender.com       │
        │   routes: /auth/*  /products/  /health  /docs  │
        │                                                │
        │     ┌────────────────────────────────────┐    │
        │     │   SQLite  (file on the same box)    │    │
        │     │   ⚠ ephemeral — resets on restart   │    │
        │     │   auto-seeds 6 products on startup  │    │
        │     └────────────────────────────────────┘    │
        └──────────────────────────────────────────────┘
```

## Components

### Frontend (Vercel)
- **What:** A React + TypeScript single-page app built with Vite and styled with Tailwind.
- **Where:** Served as static assets from Vercel's global CDN.
- **API wiring:** Vite inlines `VITE_API_URL` **at build time**, so the bundle ships already pointing at the backend. Changing the API URL requires a rebuild.
- **Routing:** Client-side via React Router; protected routes gate the catalog behind authentication.

### Backend (Render)
- **What:** A FastAPI application run by Uvicorn.
- **Layers:**
  - `app/api/` — route handlers (`auth`, `products`)
  - `app/core/` — `config.py` (env-driven settings) and security (JWT, password hashing)
  - `app/db/` — engine, session, and table creation
  - `app/models/` — SQLModel tables (`User`, `Product`)
  - `app/schemas/` — Pydantic request/response models
  - `app/main.py` — app factory, CORS middleware, and a `lifespan` hook that creates tables and seeds sample products
- **Auth:** Stateless JWT. The client stores the token and sends it as a `Bearer` header; protected endpoints validate it.

### Database (SQLite, co-located with the backend)
- A **SQLite file lives on the Render instance's filesystem** — there is no separate database server.
- Render's free tier uses an **ephemeral filesystem**, so the database **resets on every cold start / redeploy**.
- To keep the demo usable, `app/main.py` **seeds the sample catalog on startup when the products table is empty**. User-created accounts are therefore transient by design on the free tier.

## Request flow

1. The browser loads the static frontend from **Vercel**.
2. The frontend reads its baked-in `VITE_API_URL` and makes API calls **directly to Render** (not proxied through Vercel).
3. The backend authenticates requests via JWT, reads/writes the SQLite database, and returns JSON.
4. CORS on the backend explicitly allows the frontend origin (the middleware reflects the request origin and permits credentials).

## Key design decisions

| Decision | Why |
|----------|-----|
| **Decoupled frontend/backend** | Independent scaling, deployment, and hosting; frontend on a CDN, backend on a server runtime. |
| **Backend deployed before frontend** | Vite bakes `VITE_API_URL` at build time, so the backend URL must exist first. |
| **Seed-on-startup** | Free-tier filesystems are ephemeral; seeding guarantees the catalog is never empty for visitors. |
| **Pinned Python 3.11.9 on Render** | The pinned 2023-era dependencies have no wheels for the host's default Python 3.14. |
| **SQLite (Postgres-ready)** | Zero-config for a demo; `DATABASE_URL` + the bundled `psycopg2` make a managed Postgres a drop-in upgrade. |

## Production topology vs. local

| Concern | Local | Production |
|---------|-------|-----------|
| Frontend | Vite dev server (`:5173`) | Vercel static CDN |
| Backend | Uvicorn (`:8000`) | Render web service |
| Database | SQLite file | SQLite file (ephemeral) — see [ROADMAP](ROADMAP.md) for managed Postgres |
| API URL | `http://localhost:8000` | `https://products-app-4odu.onrender.com` |
