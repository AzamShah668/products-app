# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.db.base import create_db_and_tables
from app.db.session import engine


# -----------------------------
# Seed sample products if the catalog is empty.
# Free-tier hosts (e.g. Render) use an ephemeral filesystem, so the SQLite
# database resets on every cold start. Seeding on startup keeps the demo
# catalog populated without manual intervention.
# -----------------------------
def seed_products_if_empty():
    from sqlmodel import Session, select
    from app.models.product import Product

    sample_products = [
        {"name": "Classic White T-Shirt", "description": "A comfortable, versatile white tee in high-quality cotton with a classic fit.", "price": 29.99, "category": "men", "image_url": "/images/products/men/mens-shirt-1.jpg", "in_stock": True},
        {"name": "Blue Denim Jacket", "description": "A timeless blue denim jacket with durable construction and a classic button-up design.", "price": 89.99, "category": "men", "image_url": "/images/products/men/mens-shirt-2.jpg", "in_stock": True},
        {"name": "Casual Polo Shirt", "description": "A stylish polo with a comfortable fit and breathable fabric for casual or semi-formal wear.", "price": 45.99, "category": "men", "image_url": "/images/products/men/mens-shirt-3.jpg", "in_stock": True},
        {"name": "Floral Summer Dress", "description": "A light, flowing floral dress perfect for warm days and easy summer styling.", "price": 64.99, "category": "women", "image_url": "/images/products/women/womens-dress-1.jpg", "in_stock": True},
        {"name": "Elegant Black Blouse", "description": "A refined black blouse that pairs effortlessly with both formal and casual outfits.", "price": 52.99, "category": "women", "image_url": "/images/products/women/womens-top-1.jpg", "in_stock": True},
        {"name": "Knitted Wool Sweater", "description": "A cozy knitted wool sweater that keeps you warm without sacrificing style.", "price": 74.99, "category": "women", "image_url": "/images/products/women/womens-sweater-1.jpg", "in_stock": True},
    ]

    with Session(engine) as session:
        if session.exec(select(Product)).first():
            return  # catalog already has data; do nothing
        for data in sample_products:
            session.add(Product(**data))
        session.commit()


# -----------------------------
# Lifespan event for database initialization
# -----------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables, then seed the catalog if it is empty
    create_db_and_tables(engine)
    seed_products_if_empty()
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
