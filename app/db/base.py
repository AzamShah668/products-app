# app/db/base.py
from sqlmodel import SQLModel
from app.models.user import User
from app.models.product import Product

def create_db_and_tables(engine):
    SQLModel.metadata.create_all(engine)
