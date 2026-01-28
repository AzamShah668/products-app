# app/api/security.py
# Re-export functions from core.security for backward compatibility
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_access_token
)
