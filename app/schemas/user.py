# app/schemas/user.py
from typing import Optional
from pydantic import BaseModel

# Used when sending user data to clients
class UserPublic(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str] = None

# Used when creating a new user (input)
class UserCreate(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    password: str
