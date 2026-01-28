# app/db/session.py
from sqlmodel import create_engine, Session, SQLModel
from app.core.config import settings

# Create the SQLModel engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=True,  # Shows SQL statements in console (useful for development)
    connect_args={"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}
)

# Dependency to get DB session
def get_session():
    with Session(engine) as session:
        yield session
