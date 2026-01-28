#!/usr/bin/env python3
"""
Script to add sample products to the database
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import get_session
from app.models.product import Product
from sqlmodel import Session

def add_sample_products():
    # Sample product data with local image URLs
    sample_products = [
        {
            "name": "Classic White T-Shirt",
            "description": "A comfortable and versatile white t-shirt perfect for everyday wear. Made from high-quality cotton with a classic fit.",
            "price": 29.99,
            "category": "men",
            "image_url": "/images/products/men/mens-shirt-1.jpg",
            "in_stock": True
        },
        {
            "name": "Blue Denim Jacket",
            "description": "A timeless blue denim jacket that adds style to any outfit. Durable construction with classic button-up design.",
            "price": 89.99,
            "category": "men",
            "image_url": "/images/products/men/mens-shirt-2.jpg",
            "in_stock": True
        },
        {
            "name": "Casual Polo Shirt",
            "description": "A stylish polo shirt with a comfortable fit and breathable fabric. Perfect for casual outings or semi-formal occasions.",
            "price": 45.99,
            "category": "men",
            "image_url": "/images/products/men/mens-shirt-3.jpg",
            "in_stock": True
        },
        {
            "name": "Striped Button-Up",
            "description": "A classic striped button-up shirt that brings sophistication to your wardrobe. Made from premium cotton blend.",
            "price": 59.99,
            "category": "men",
            "image_url": "/images/products/men/mens-shirt-4.jpg",
            "in_stock": False
        },
        {
            "name": "Summer Dress",
            "description": "A beautiful floral summer dress with a flowing silhouette. Perfect for warm weather and special occasions.",
            "price": 79.99,
            "category": "women",
            "image_url": "/images/products/women/womens-dress-1.jpg",
            "in_stock": True
        },
        {
            "name": "Evening Gown",
            "description": "An elegant evening gown with sophisticated detailing. Ideal for formal events and special celebrations.",
            "price": 149.99,
            "category": "women",
            "image_url": "/images/products/women/womens-dress-2.jpg",
            "in_stock": True
        },
        {
            "name": "Casual Maxi Dress",
            "description": "A comfortable maxi dress perfect for everyday wear. Features a relaxed fit and beautiful print design.",
            "price": 69.99,
            "category": "women",
            "image_url": "/images/products/women/womens-dress-3.jpg",
            "in_stock": True
        },
        {
            "name": "Cocktail Dress",
            "description": "A stunning cocktail dress with modern styling. Perfect for parties and evening events.",
            "price": 119.99,
            "category": "women",
            "image_url": "/images/products/women/womens-dress-4.jpg",
            "in_stock": True
        }
    ]

    session: Session = next(get_session())

    try:
        # Check if products already exist
        existing_count = session.query(Product).count()
        if existing_count > 0:
            print(f"Database already has {existing_count} products. Skipping sample data insertion.")
            return

        # Add sample products
        for product_data in sample_products:
            product = Product(**product_data)
            session.add(product)

        session.commit()
        print(f"Successfully added {len(sample_products)} sample products to the database!")

    except Exception as e:
        session.rollback()
        print(f"Error adding sample products: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    add_sample_products()