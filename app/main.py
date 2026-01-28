# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.db.base import create_db_and_tables
from app.db.session import engine


# -----------------------------
# Lifespan event for database initialization
# -----------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create database tables
    create_db_and_tables(engine)
    yield
    # Shutdown: Add cleanup logic here if needed


# -----------------------------
# Create FastAPI app
# -----------------------------
app = FastAPI(
    title="Products API",
    description="A REST API for managing products with user authentication",
    version="1.0.0",
    lifespan=lifespan
)

# -----------------------------
# CORS middleware
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Include API routers
# -----------------------------
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(products_router, prefix="/products", tags=["products"])


# -----------------------------
# Root endpoint
# -----------------------------
@app.get("/")
def read_root():
    return {"message": "Welcome to the Products API!"}


# -----------------------------
# Health check endpoint
# -----------------------------
@app.get("/health")
def health_check():
    return {"status": "healthy"}
