# 🛍️ AXM Enterprises — Products Management Platform

A production-deployed, full-stack product catalog with JWT authentication. **FastAPI** backend, **React + TypeScript** frontend, deployed live across **Vercel** (frontend) and **Render** (backend).

<p align="left">
  <img alt="Backend" src="https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white">
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=black">
  <img alt="Language" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Auth" src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white">
  <img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-000000?logo=vercel&logoColor=white">
</p>

## 🔴 Live Demo

| | URL |
|---|---|
| **App (frontend)** | **https://products-app-rouge.vercel.app** |
| **API (backend)** | https://products-app-4odu.onrender.com |
| **Interactive API docs** | https://products-app-4odu.onrender.com/docs |

**Demo login** — username `demo` · password `demo12345`

> ⏱️ The backend runs on a free Render instance that **sleeps after ~15 min idle**, so the first request after a nap can take ~50s to wake. Subsequent requests are fast.

## ✨ What it does

A storefront-style catalog where visitors can browse products, register an account, sign in, and (when authenticated) manage the catalog. It demonstrates a clean, layered full-stack architecture with secure auth — built to be read, deployed, and extended.

### Features
- 🔐 **JWT authentication** — register, login, protected routes, token-based session
- 📦 **Product catalog** — list, view, create, update, delete (CRUD)
- 🌱 **Self-seeding catalog** — sample products auto-load on startup (great for ephemeral hosts)
- 🎨 **Polished UI** — React + TypeScript + Tailwind, responsive, animated
- 📚 **Auto-generated API docs** — Swagger UI at `/docs`
- 🐳 **Containerised** — Docker Compose for one-command local spin-up
- ☁️ **Live deployment** — Vercel + Render with build-time API wiring and CORS

## 🧱 Tech stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, React Router |
| **Backend** | FastAPI, Uvicorn, SQLModel, Pydantic v2, pydantic-settings |
| **Auth** | JWT (python-jose), password hashing (passlib) |
| **Database** | SQLite (default) · Postgres-ready (psycopg2) |
| **Infra** | Docker, Docker Compose, Jenkins (CI), Vercel, Render |

## 🏗️ Architecture

```
   GitHub: AzamShah668/products-app  (one repo, two deploy targets)
     ├── frontend/  ──build──►  Vercel (static CDN)
     └── app/       ──build──►  Render (FastAPI server + SQLite)

   Browser ──1. load static site──► Vercel (frontend)
           ──2. API calls (JWT, CORS)──► Render (backend) ──► SQLite
```

The browser talks to the backend **directly** — Vercel only serves the static frontend, which is wired to the API via the build-time `VITE_API_URL`. Full details, data flow, and design decisions: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

## 📁 Project structure

```
products-app/
├── app/                      # FastAPI backend
│   ├── api/                  #   route handlers (auth, products)
│   ├── core/                 #   config + security (JWT, hashing)
│   ├── db/                   #   engine, session, table creation
│   ├── models/               #   SQLModel tables (User, Product)
│   ├── schemas/              #   Pydantic request/response models
│   └── main.py               #   app factory, CORS, lifespan + seeding
├── frontend/                 # React + Vite app
│   └── src/                  #   api client, components, contexts, pages
├── docs/                     # 📚 architecture, sprint log, roadmap
├── docker-compose.yml        # local orchestration
├── Dockerfile.backend        # backend image
├── Jenkinsfile               # CI pipeline
├── DEPLOYMENT.md             # deployment guide
└── requirements.txt
```

## 🚀 Getting started

### Option A — Docker (recommended)
```bash
cp .env.example .env                 # backend config
cp frontend/.env.example frontend/.env
docker-compose up --build
# Frontend → http://localhost:3000   API → http://localhost:8000/docs
```

### Option B — Manual
```bash
# Backend
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload        # http://localhost:8000

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev                          # http://localhost:5173
```

## 🔧 Configuration

Backend (`.env`) and frontend (`frontend/.env`) are documented in **[.env.example](.env.example)** and **[frontend/.env.example](frontend/.env.example)**. Generate a strong secret with `openssl rand -hex 32`.

## 🔐 API reference

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/auth/register` | — | Create a user |
| `POST` | `/auth/login` | — | Get a JWT access token |
| `GET`  | `/auth/me` | ✅ | Current user |
| `GET`  | `/products/` | — | List products |
| `GET`  | `/products/{id}` | — | Get one product |
| `POST` | `/products/` | ✅ | Create product |
| `PUT`  | `/products/{id}` | ✅ | Update product |
| `DELETE` | `/products/{id}` | ✅ | Delete product |
| `GET`  | `/health` | — | Health check |

Full interactive docs at **`/docs`**.

## ☁️ Deployment

The live stack: **frontend → Vercel** (root dir `frontend/`, `VITE_API_URL` → backend) and **backend → Render** (`uvicorn app.main:app`, Python pinned to 3.11.9). Step-by-step guide: **[DEPLOYMENT.md](DEPLOYMENT.md)**. The exact production rollout is logged in **[docs/SPRINT-LOG.md](docs/SPRINT-LOG.md)** (Sprint 2).

## 🗺️ Roadmap

This is a working demo with a clear path to production hardening (managed DB, CI/CD, tests, observability, refresh tokens, image storage, RBAC). See **[docs/ROADMAP.md](docs/ROADMAP.md)**.

## 📓 Project history

Development is tracked as sprints in **[docs/SPRINT-LOG.md](docs/SPRINT-LOG.md)** — Sprint 1 (build the platform) and Sprint 2 (ship it live).

## 📄 License

MIT — see `LICENSE`.
