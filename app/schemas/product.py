# app/schemas/product.py
from typing import Optional
from pydantic import BaseModel

# Used when sending product data to clients
class ProductPublic(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    in_stock: bool
    image_url: Optional[str] = None
    category: str

# Used when creating a new product
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    in_stock: Optional[bool] = True
    image_url: Optional[str] = None
    category: str = "general"
