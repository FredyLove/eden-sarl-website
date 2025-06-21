# app/schemas.py
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

# User

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        orm_mode = True

# Token

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Products

class ProductBase(BaseModel):
    id: int
    name: str
    description: str | None = None
    image: Optional[str] = None
    category: Optional[str] = None
    isPopular: Optional[bool] = False
    rating: Optional[float] = 0.0
    price: float

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    image: Optional[str] = None
    category: Optional[str] = None
    isPopular: Optional[bool] = False
    rating: Optional[float] = 0.0
    quantity: int | None = None
    price: float | None = None

class ProductOut(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
