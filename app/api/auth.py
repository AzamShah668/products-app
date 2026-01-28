# app/api/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from typing import Annotated

from app.db.session import get_session
from app.models.user import User
from app.schemas.user import UserCreate, UserPublic
from app.core.security import verify_access_token, hash_password, verify_password, create_access_token

# -----------------------------
# Create router
# -----------------------------
router = APIRouter()

# -----------------------------
# OAuth2 scheme for FastAPI
# -----------------------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# -----------------------------
# Dependency to get current user
# -----------------------------
def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session)
) -> User:
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

# -----------------------------
# Auth endpoints
# -----------------------------
@router.post("/register", response_model=UserPublic)
def register_user(
    user_data: UserCreate,
    session: Session = Depends(get_session)
):
    """Register a new user"""
    # Check if user already exists
    existing_user = session.exec(
        select(User).where(
            (User.username == user_data.username) | (User.email == user_data.email)
        )
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )

    # Create new user
    hashed_password = hash_password(user_data.password)
    user = User(
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name,
        hashed_password=hashed_password
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return UserPublic(
        id=user.id,
        username=user.username,
        email=user.email,
        full_name=user.full_name
    )

@router.post("/login")
def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session)
):
    """Login user and return access token"""
    # Find user by username
    user = session.exec(
        select(User).where(User.username == form_data.username)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    # Verify password
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    # Create access token
    access_token = create_access_token(data={"user_id": user.id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserPublic(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.full_name
        )
    }

@router.get("/me", response_model=UserPublic)
def get_current_user_info(current_user: Annotated[User, Depends(get_current_user)]):
    """Get current user information"""
    return UserPublic(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        full_name=current_user.full_name
    )
