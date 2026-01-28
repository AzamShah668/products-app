# app/models/product.py
from sqlmodel import SQLModel, Field
from typing import Optional

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    price: float
    in_stock: bool = True
    image_url: Optional[str] = None
    category: str = Field(default="general")  # men, women, general
