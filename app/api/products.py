from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, text
from typing import List, Annotated

from app.db.session import get_session
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductPublic
from app.api.auth import get_current_user
from app.models.user import User

# -----------------------------
# Create router
# -----------------------------
router = APIRouter()

# -----------------------------
# Product endpoints
# -----------------------------
@router.get("/", response_model=List[ProductPublic])
def get_products(
    session: Session = Depends(get_session),
    skip: int = 0,
    limit: int = 100
):
    """Get all products with pagination"""
    products = session.exec(select(Product).offset(skip).limit(limit)).all()
    return products

@router.get("/{product_id}", response_model=ProductPublic)
def get_product(
    product_id: int,
    session: Session = Depends(get_session)
):
    """Get a specific product by ID"""
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    return product

@router.post("/", response_model=ProductPublic)
def create_product(
    product_data: ProductCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session)
):
    """Create a new product (requires authentication)"""
    
    # FIX: Sync the PostgreSQL sequence to prevent "duplicate key" errors
    # This ensures the next ID generated matches the current table state.
    session.exec(text(
        "SELECT setval(pg_get_serial_sequence('product', 'id'), coalesce(max(id), 0) + 1, false) FROM product"
    ))
    
    # Use model_dump() instead of dict() for Pydantic v2 compatibility
    product = Product(**product_data.model_dump())
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@router.put("/{product_id}", response_model=ProductPublic)
def update_product(
    product_id: int,
    product_data: ProductCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session)
):
    """Update an existing product (requires authentication)"""
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    # Update product fields using modern model_dump()
    product_dict = product_data.model_dump()
    for field, value in product_dict.items():
        setattr(product, field, value)

    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session)
):
    """Delete a product (requires authentication)"""
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )

    session.delete(product)
    session.commit()
    return {"message": "Product deleted successfully"}