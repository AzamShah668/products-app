# app/core/config.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database URL (from .env) - Force SQLite for development
    DATABASE_URL: str = "sqlite:///./myazam_db.db"

    # Secret key for JWT tokens
    SECRET_KEY: str = "supersecretkey1234567890"  # CHANGE for production

    # Token expiry in minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    class Config:
        # Tell Pydantic to load from .env if it exists
        env_file = ".env"
        env_ignore_empty = True

# Create a global settings object
settings = Settings()